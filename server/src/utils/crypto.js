import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SALT_ROUNDS = 12;

// Hash password with bcrypt (12 rounds)
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Verify password against bcrypt hash
export const verifyPassword = async (hash, plainPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hash);
  } catch {
    return false;
  }
};

// Generate cryptographically secure random hex string
export const generateRandomToken = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString('hex');
};

// Hash a token using SHA-256 (for storing refresh/reset/OTP tokens safely in DB)
export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
