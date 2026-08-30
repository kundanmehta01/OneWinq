import { OrganizationService } from './organization.service.js';
import { sendSuccess, sendCreated, sendPaginated } from '../../lib/response.js';

export class OrganizationController {
  // Create Org
  static async createOrg(req, res, next) {
    try {
      const org = await OrganizationService.createOrganization(req.userId, req.body);
      return sendCreated(res, org, 'Organization created successfully');
    } catch (error) {
      next(error);
    }
  }

  // Get My Orgs
  static async getMyOrgs(req, res, next) {
    try {
      const orgs = await OrganizationService.getMyOrganizations(req.userId);
      return sendSuccess(res, orgs, 'Organizations retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  // Get Org by ID
  static async getOrgById(req, res, next) {
    try {
      const data = await OrganizationService.getOrganizationById(req.params.id);
      return sendSuccess(res, data, 'Organization details retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Update Org
  static async updateOrg(req, res, next) {
    try {
      const org = await OrganizationService.updateOrganization(req.params.id, req.body);
      return sendSuccess(res, org, 'Organization updated successfully');
    } catch (error) {
      next(error);
    }
  }

  // Departments
  static async createDepartment(req, res, next) {
    try {
      const dept = await OrganizationService.createDepartment(req.params.id, req.body);
      return sendCreated(res, dept, 'Department created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getDepartments(req, res, next) {
    try {
      const depts = await OrganizationService.getDepartments(req.params.id);
      return sendSuccess(res, depts, 'Departments retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Teams
  static async createTeam(req, res, next) {
    try {
      const team = await OrganizationService.createTeam(req.params.id, req.body);
      return sendCreated(res, team, 'Team created successfully');
    } catch (error) {
      next(error);
    }
  }

  // Members
  static async addMember(req, res, next) {
    try {
      const member = await OrganizationService.addMember(req.params.id, req.body);
      return sendCreated(res, member, 'Member added to organization successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getMembers(req, res, next) {
    try {
      const { items, pagination } = await OrganizationService.getMembers(req.params.id, req.query);
      return sendPaginated(res, items, pagination, 'Organization members retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async updateMemberRole(req, res, next) {
    try {
      const member = await OrganizationService.updateMemberRole(req.params.id, req.params.memberId, req.body.role);
      return sendSuccess(res, member, 'Member role updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async removeMember(req, res, next) {
    try {
      const result = await OrganizationService.removeMember(req.params.id, req.params.memberId);
      return sendSuccess(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }
}
