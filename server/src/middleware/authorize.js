import { AuthorizationError } from '../lib/errors/appError.js';

// Restrict route access to specific Platform Roles (e.g. 'ADMIN', 'SUPER_ADMIN')
export const requirePlatformRole = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AuthorizationError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.platformRole)) {
      return next(new AuthorizationError('You do not have administrative access for this resource'));
    }

    next();
  };
};
