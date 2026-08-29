import { z } from 'zod';

// Registration schema: requires email OR phone + password + verificationCode
export const registerSchema = z.object({
  body: z
    .object({
      email: z.string().email('Invalid email address').optional(),
      phone: z
        .string()
        .regex(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number format (e.g. +1234567890)')
        .optional(),
      password: z.string().min(8, 'Password must be at least 8 characters long'),
      verificationCode: z.string().min(4, 'Verification code is required to complete registration'),
    })
    .refine((data) => data.email || data.phone, {
      message: 'Either email or phone number is required to register',
      path: ['email'],
    }),
});

// Login schema: identifier (email or phone) + password (NO OTP)
export const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(1, 'Email or phone number is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// Refresh token schema
export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

// Send OTP / Verification code schema
export const sendVerificationSchema = z.object({
  body: z.object({
    target: z.string().min(1, 'Target (email or phone) is required'),
    type: z.enum(['EMAIL_VERIFY', 'PHONE_VERIFY', 'PASSWORD_RESET']),
  }),
});

// Verify OTP / Code schema
export const verifyCodeSchema = z.object({
  body: z.object({
    target: z.string().min(1, 'Target (email or phone) is required'),
    code: z.string().min(4, 'Code is required'),
    type: z.enum(['EMAIL_VERIFY', 'PHONE_VERIFY', 'PASSWORD_RESET']),
  }),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  body: z.object({
    target: z.string().min(1, 'Email or phone is required'),
    code: z.string().min(4, 'Verification code is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  }),
});
