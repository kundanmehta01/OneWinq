import { verifyAccessToken } from '../lib/jwt.js';
import { AuthenticationError, AuthorizationError } from '../lib/errors/appError.js';
import { User, UserStatus } from '../modules/users/user.model.js';

export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    let payload;

    try {
      payload = verifyAccessToken(token);
    } catch {
      throw new AuthenticationError('Invalid or expired access token');
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      throw new AuthenticationError('User account no longer exists');
    }

    if (user.status === UserStatus.SUSPENDED || user.status === UserStatus.DELETED) {
      throw new AuthorizationError('User account is suspended or deleted');
    }

    req.user = user;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    next(error);
  }
};
