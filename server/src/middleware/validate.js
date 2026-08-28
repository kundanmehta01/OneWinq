import { ZodError } from 'zod';
import { ValidationError } from '../lib/errors/appError.js';

export const validate = (schema) => {
  return async (req, _res, next) => {
    const errors = [];

    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          const field = issue.path.join('.') || 'unknown';
          errors.push({
            field,
            message: issue.message,
          });
        });
        return next(new ValidationError('Validation failed', errors));
      }
      return next(error);
    }
  };
};
