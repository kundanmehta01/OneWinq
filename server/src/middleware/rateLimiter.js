import rateLimit from 'express-rate-limit';

// Standard 429 JSON response matching our API error format
const rateLimitHandler = (_req, res) => {
  res.status(429).json({
    success: false,
    message: 'Too many requests. Please try again later.',
  });
};

// 1. General API Limiter (e.g. 150 requests per 15 minutes)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

// 2. Strict Auth Limiter (e.g. 10 requests per 15 minutes for login/register/forgot-password)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  skipSuccessfulRequests: false,
});

// 3. Search & Discovery Limiter (e.g. 40 requests per minute)
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});
