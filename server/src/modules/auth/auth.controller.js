import { AuthService } from './auth.service.js';
import { sendSuccess, sendCreated } from '../../lib/response.js';

export class AuthController {
  // 1. Register
  static async register(req, res, next) {
    try {
      const { email, phone, password, verificationCode } = req.body;
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip;

      const data = await AuthService.register({
        email,
        phone,
        password,
        verificationCode,
        userAgent,
        ipAddress,
      });

      return sendCreated(res, data, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  // 2. Login
  static async login(req, res, next) {
    try {
      const { identifier, password } = req.body;
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip;

      const data = await AuthService.login({
        identifier,
        password,
        userAgent,
        ipAddress,
      });

      return sendSuccess(res, data, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  // 3. Refresh Tokens
  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip;

      const tokens = await AuthService.refreshTokens({
        refreshToken,
        userAgent,
        ipAddress,
      });

      return sendSuccess(res, tokens, 'Tokens refreshed successfully');
    } catch (error) {
      next(error);
    }
  }

  // 4. Logout
  static async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await AuthService.logout({ refreshToken });
      return sendSuccess(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  // 5. Send Verification OTP (Email / Phone / Reset)
  static async sendVerification(req, res, next) {
    try {
      const { target, type } = req.body;
      const result = await AuthService.sendVerificationCode({ target, type });
      return sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  // 6. Verify Code / OTP
  static async verifyCode(req, res, next) {
    try {
      const { target, code, type } = req.body;
      const result = await AuthService.verifyCode({ target, code, type });
      return sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  // 7. Reset Password
  static async resetPassword(req, res, next) {
    try {
      const { target, code, newPassword } = req.body;
      const result = await AuthService.resetPassword({ target, code, newPassword });
      return sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  // 8. Get Authenticated User
  static async getMe(req, res, next) {
    try {
      return sendSuccess(res, { user: req.user }, 'Current user profile retrieved');
    } catch (error) {
      next(error);
    }
  }
}
