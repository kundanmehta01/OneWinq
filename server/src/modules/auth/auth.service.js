import crypto from 'crypto';
import { User, UserStatus } from '../users/user.model.js';
import { Session } from './session.model.js';
import { VerificationCode, VerificationType } from './verificationCode.model.js';
import { hashPassword, verifyPassword, hashToken } from '../../utils/crypto.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../lib/jwt.js';
import {
  BadRequestError,
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from '../../lib/errors/appError.js';
import { logger } from '../../config/logger.js';
import { Profile } from '../profiles/profile.model.js';
import { DigitalCard } from '../cards/card.model.js';
import { generateSlug } from '../../utils/slug.js';


export class AuthService {
  // 1. Register User (Requires verified OTP for Email or Phone)
  static async register({ email, phone, password, verificationCode, userAgent, ipAddress }) {
    const target = email ? email.toLowerCase().trim() : phone.trim();
    const type = email ? VerificationType.EMAIL_VERIFY : VerificationType.PHONE_VERIFY;

    // Check if email or phone is already registered
    if (email) {
      const existingEmail = await User.findOne({ email: target });
      if (existingEmail) {
        throw new ConflictError('User with this email already exists');
      }
    }

    if (phone) {
      const existingPhone = await User.findOne({ phone: target });
      if (existingPhone) {
        throw new ConflictError('User with this phone number already exists');
      }
    }

    // 🔒 Enforce OTP verification before allowing registration
    const codeHash = hashToken(verificationCode.trim());
    const validCode = await VerificationCode.findOne({
      target,
      type,
      codeHash,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new BadRequestError('Invalid or expired verification code. Please request a new OTP first.');
    }

    // Mark the verification code as used
    validCode.usedAt = new Date();
    await validCode.save();

    // Hash password with Argon2
    const passwordHash = await hashPassword(password);

    // Create verified user account
    const user = await User.create({
      email: email ? target : undefined,
      phone: phone ? target : undefined,
      passwordHash,
      emailVerified: !!email,
      phoneVerified: !!phone,
      status: UserStatus.ACTIVE,
    });

     //Auto-provision Digital Identity Profile & Digital Card
    const baseSlug = email ? email.split('@')[0] : `user-${user._id.toString().slice(-6)}`;
    const slug = generateSlug(baseSlug);
    const profile = await Profile.create({
      userId: user._id,
      slug,
      contact: {
        email: user.email,
        phone: user.phone,
      },
    });
    await DigitalCard.create({
      profileId: profile._id,
      userId: user._id,
      slug: profile.slug,
    });


    // Generate JWT access & refresh tokens
    const tokens = await this._createSessionAndTokens(user._id, userAgent, ipAddress);

    return { user, tokens };
  }

  // 2. Login User (accepts identifier: email OR phone — Password based, NO OTP)
  static async login({ identifier, password, userAgent, ipAddress }) {
    const trimmed = identifier.trim();
    const query = {
      $or: [{ email: trimmed.toLowerCase() }, { phone: trimmed }],
    };

    // Explicitly select passwordHash which is select: false by default
    const user = await User.findOne(query).select('+passwordHash');

    if (!user) {
      throw new AuthenticationError('Invalid email/phone or password');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new AuthenticationError('Account is not active or has been suspended');
    }

    // Verify password with Argon2
    const isPasswordValid = await verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email/phone or password');
    }

    // Update last login timestamp
    user.lastLoginAt = new Date();
    await user.save();

    // Create new session & generate tokens
    const tokens = await this._createSessionAndTokens(user._id, userAgent, ipAddress);

    return { user, tokens };
  }

  // 3. Refresh Tokens (Rotation & Revocation)
  static async refreshTokens({ refreshToken, userAgent, ipAddress }) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AuthenticationError('Invalid or expired refresh token');
    }

    const hashed = hashToken(refreshToken);
    const session = await Session.findOne({ tokenHash: hashed });

    if (!session) {
      throw new AuthenticationError('Session not found or expired');
    }

    // Detect Token Reuse (Theft / Replay Attack)
    if (session.revokedAt) {
      logger.warn(
        { userId: payload.userId, ipAddress },
        '🚨 Revoked token reuse detected! Invalidating all user sessions.'
      );
      await Session.updateMany({ userId: payload.userId }, { revokedAt: new Date() });
      throw new AuthenticationError('Invalid token. Please log in again.');
    }

    // Revoke old session (Rotation)
    session.revokedAt = new Date();
    await session.save();

    // Issue new pair
    return await this._createSessionAndTokens(payload.userId, userAgent, ipAddress);
  }

  // 4. Logout (Revoke specific session)
  static async logout({ refreshToken }) {
    if (!refreshToken) return;
    const hashed = hashToken(refreshToken);
    await Session.updateOne({ tokenHash: hashed }, { revokedAt: new Date() });
  }

  // 5. Send Verification OTP (Email or Phone)
  static async sendVerificationCode({ target, type }) {
    const trimmedTarget = target.trim();
    
    // Find user associated with this email or phone (if exists)
    const user = await User.findOne({
      $or: [{ email: trimmedTarget.toLowerCase() }, { phone: trimmedTarget }],
    });

    if (type === VerificationType.PASSWORD_RESET && !user) {
      return { message: 'If an account exists, a verification code has been sent.' };
    }

    // Cryptographically secure 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 1000000).toString();
    const codeHash = hashToken(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await VerificationCode.create({
      userId: user ? user._id : undefined,
      target: trimmedTarget,
      type,
      codeHash,
      expiresAt,
    });

    // In development, log the OTP in terminal
    logger.info({ target: trimmedTarget, type, otp }, '🔑 Verification Code Generated');

    return {
      message: `Verification code sent to ${trimmedTarget}`,
      // 👇 In Development mode, return the OTP directly in the JSON response for easy Postman testing
      ...(process.env.NODE_ENV !== 'production' && { devOtp: otp }),
    };
  }


  // 6. Verify Code / OTP (Generic standalone verify endpoint)
  static async verifyCode({ target, code, type }) {
    const trimmedTarget = target.trim();
    const codeHash = hashToken(code.trim());

    const record = await VerificationCode.findOne({
      target: trimmedTarget,
      type,
      codeHash,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!record) {
      throw new BadRequestError('Invalid or expired verification code');
    }

    record.usedAt = new Date();
    await record.save();

    // Update user verified flags if user already exists
    if (type === VerificationType.EMAIL_VERIFY) {
      await User.updateOne({ email: trimmedTarget.toLowerCase() }, { emailVerified: true });
    } else if (type === VerificationType.PHONE_VERIFY) {
      await User.updateOne({ phone: trimmedTarget }, { phoneVerified: true });
    }

    return { verified: true, message: 'Verification successful' };
  }

  // 7. Reset Password (Requires valid OTP)
  static async resetPassword({ target, code, newPassword }) {
    const trimmedTarget = target.trim();
    const codeHash = hashToken(code.trim());

    const record = await VerificationCode.findOne({
      target: trimmedTarget,
      type: VerificationType.PASSWORD_RESET,
      codeHash,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!record) {
      throw new BadRequestError('Invalid or expired password reset code');
    }

    const user = await User.findOne({
      $or: [{ email: trimmedTarget.toLowerCase() }, { phone: trimmedTarget }],
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Update password
    user.passwordHash = await hashPassword(newPassword);
    await user.save();

    record.usedAt = new Date();
    await record.save();

    // Revoke all existing sessions for security
    await Session.updateMany({ userId: user._id }, { revokedAt: new Date() });

    return { message: 'Password reset successfully. Please log in with your new password.' };
  }

  // Helper: Create Session & Tokens
  static async _createSessionAndTokens(userId, userAgent, ipAddress) {
    const accessToken = generateAccessToken({ userId: userId.toString() });
    const refreshToken = generateRefreshToken({ userId: userId.toString() });

    // Store hashed refresh token
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await Session.create({
      userId,
      tokenHash,
      deviceInfo: { userAgent, ipAddress },
      expiresAt,
    });

    return { accessToken, refreshToken };
  }
}
