import rateLimit from 'express-rate-limit';

/**
 * General rate limiting - 100 requests per minute per IP
 */
export const generalRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    success: false,
    message: 'Muitas requisições. Tente novamente em 1 minuto.',
    retryAfter: 60,
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas requisições. Tente novamente em 1 minuto.',
      retryAfter: 60,
    });
  },
});

/**
 * Authentication rate limiting - 10 requests per minute per IP
 */
export const authRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    success: false,
    message: 'Muitas tentativas de autenticação. Tente novamente em 1 minuto.',
    retryAfter: 60,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas tentativas de autenticação. Tente novamente em 1 minuto.',
      retryAfter: 60,
    });
  },
  skip: (req) => {
    // Skip rate limiting for successful authentications (status < 400)
    return req.res ? req.res.statusCode < 400 : false;
  },
});

/**
 * Strict rate limiting for sensitive operations - 5 requests per minute per IP
 */
export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: {
    success: false,
    message: 'Muitas tentativas para operação sensível. Tente novamente em 1 minuto.',
    retryAfter: 60,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Strict rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas tentativas para operação sensível. Tente novamente em 1 minuto.',
      retryAfter: 60,
    });
  },
});

/**
 * Password reset rate limiting - 3 requests per hour per IP
 */
export const passwordResetRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 requests per hour
  message: {
    success: false,
    message: 'Muitas solicitações de redefinição de senha. Tente novamente em 1 hora.',
    retryAfter: 3600,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Password reset rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas solicitações de redefinição de senha. Tente novamente em 1 hora.',
      retryAfter: 3600,
    });
  },
});

/**
 * Account creation rate limiting - 3 accounts per hour per IP
 */
export const accountCreationRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 accounts per hour
  message: {
    success: false,
    message: 'Muitas criações de conta. Tente novamente em 1 hora.',
    retryAfter: 3600,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Account creation rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas criações de conta. Tente novamente em 1 hora.',
      retryAfter: 3600,
    });
  },
});

/**
 * Email verification rate limiting - 5 requests per hour per IP
 */
export const emailVerificationRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: {
    success: false,
    message: 'Muitas solicitações de verificação de email. Tente novamente em 1 hora.',
    retryAfter: 3600,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Email verification rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas solicitações de verificação de email. Tente novamente em 1 hora.',
      retryAfter: 3600,
    });
  },
});