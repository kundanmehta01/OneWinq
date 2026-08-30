import { Router } from 'express';
import { OrganizationController } from './organization.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { requireOrgRole } from '../../middleware/authorizeOrg.js';
import { validate } from '../../middleware/validate.js';
import {
  createOrgSchema,
  updateOrgSchema,
  createDepartmentSchema,
  createTeamSchema,
  addMemberSchema,
  updateMemberRoleSchema,
} from './organization.validation.js';

const router = Router();

// All organization routes require authentication
router.use(authenticate);

// User Orgs & Creation
router.post('/', validate(createOrgSchema), OrganizationController.createOrg);
router.get('/my', OrganizationController.getMyOrgs);
router.get('/:id', OrganizationController.getOrgById);

// Admin / Owner Actions (RBAC Guarded)
router.patch('/:id', requireOrgRole('OWNER', 'ADMIN'), validate(updateOrgSchema), OrganizationController.updateOrg);

// Departments
router.post('/:id/departments', requireOrgRole('OWNER', 'ADMIN', 'MANAGER'), validate(createDepartmentSchema), OrganizationController.createDepartment);
router.get('/:id/departments', OrganizationController.getDepartments);

// Teams
router.post('/:id/teams', requireOrgRole('OWNER', 'ADMIN', 'MANAGER'), validate(createTeamSchema), OrganizationController.createTeam);

// Members
router.post('/:id/members', requireOrgRole('OWNER', 'ADMIN'), validate(addMemberSchema), OrganizationController.addMember);
router.get('/:id/members', OrganizationController.getMembers);
router.patch('/:id/members/:memberId/role', requireOrgRole('OWNER', 'ADMIN'), validate(updateMemberRoleSchema), OrganizationController.updateMemberRole);
router.delete('/:id/members/:memberId', requireOrgRole('OWNER', 'ADMIN'), OrganizationController.removeMember);

export const organizationRoutes = router;
