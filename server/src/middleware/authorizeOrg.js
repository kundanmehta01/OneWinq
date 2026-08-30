import { Membership } from '../modules/organizations/membership.model.js';
import { AuthorizationError, NotFoundError } from '../lib/errors/appError.js';

export const requireOrgRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const orgId = req.params.orgId || req.params.id;
      if (!orgId) {
        throw new AuthorizationError('Organization ID is required');
      }

      const membership = await Membership.findOne({
        organizationId: orgId,
        userId: req.userId,
        status: 'ACTIVE',
      });

      if (!membership) {
        throw new AuthorizationError('You are not an active member of this organization');
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(membership.role)) {
        throw new AuthorizationError(
          `Action requires one of the following organization roles: ${allowedRoles.join(', ')}`
        );
      }

      // Attach membership for downstream handlers
      req.orgMembership = membership;
      next();
    } catch (error) {
      next(error);
    }
  };
};
