  import { Router } from 'express';
  import { AuthController } from './auth.controller.js';
  import { validate } from '../../middleware/validate.js';
  import { authLimiter } from '../../middleware/rateLimiter.js';
  import { authenticate } from '../../middleware/authenticate.js';
  import {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    sendVerificationSchema,
    verifyCodeSchema,
    resetPasswordSchema,
  } from './auth.validation.js';

  const router = Router();

  // Public auth routes
  router.post('/register', authLimiter, validate(registerSchema), AuthController.register);
  router.post('/login', authLimiter, validate(loginSchema), AuthController.login);
  router.post('/refresh', validate(refreshTokenSchema), AuthController.refresh);
  router.post('/logout', AuthController.logout);

  // OTP & Verification routes
  router.post('/send-verification',authLimiter,validate(sendVerificationSchema),AuthController.sendVerification);
  router.post('/verify-code',authLimiter,validate(verifyCodeSchema),AuthController.verifyCode);
  router.post('/reset-password',authLimiter,validate(resetPasswordSchema),AuthController.resetPassword);

  // Protected user route
  router.get('/me', authenticate, AuthController.getMe);

  export const authRoutes = router;
