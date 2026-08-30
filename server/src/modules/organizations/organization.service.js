import { Organization } from './organization.model.js';
import { Department } from './department.model.js';
import { Team } from './team.model.js';
import { Membership, OrgRole } from './membership.model.js';
import { User } from '../users/user.model.js';
import { Profile } from '../profiles/profile.model.js';
import { generateSlug } from '../../utils/slug.js';
import { NotFoundError, ConflictError, BadRequestError } from '../../lib/errors/appError.js';
import { parsePagination, getPaginationMeta } from '../../utils/pagination.js';

export class OrganizationService {
  // 1. Create Organization (Creator becomes OWNER)
  static async createOrganization(ownerId, data) {
    const slug = generateSlug(data.name);

    // Check slug uniqueness
    const existing = await Organization.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const organization = await Organization.create({
      name: data.name,
      slug: finalSlug,
      logo: data.logo || '',
      domain: data.domain || '',
      ownerId,
    });

    // Auto-create OWNER membership for the creator
    await Membership.create({
      organizationId: organization._id,
      userId: ownerId,
      role: OrgRole.OWNER,
      title: 'Founder / Organization Owner',
      status: 'ACTIVE',
    });

    return organization;
  }

  // 2. Get My Organizations
  static async getMyOrganizations(userId) {
    const memberships = await Membership.find({ userId, status: 'ACTIVE' })
      .populate('organizationId')
      .lean();

    return memberships.map((m) => ({
      membershipId: m._id,
      role: m.role,
      title: m.title,
      joinedAt: m.joinedAt,
      organization: m.organizationId,
    }));
  }

  // 3. Get Organization by ID
  static async getOrganizationById(orgId) {
    const organization = await Organization.findById(orgId);
    if (!organization) throw new NotFoundError('Organization not found');

    const [departmentsCount, membersCount] = await Promise.all([
      Department.countDocuments({ organizationId: orgId }),
      Membership.countDocuments({ organizationId: orgId, status: 'ACTIVE' }),
    ]);

    return {
      organization,
      metrics: {
        totalDepartments: departmentsCount,
        totalMembers: membersCount,
      },
    };
  }

  // 4. Update Organization
  static async updateOrganization(orgId, updateData) {
    const organization = await Organization.findByIdAndUpdate(
      orgId,
      { $set: updateData },
      { new: true }
    );
    if (!organization) throw new NotFoundError('Organization not found');
    return organization;
  }

  // 5. Create Department
  static async createDepartment(organizationId, data) {
    const existing = await Department.findOne({ organizationId, name: data.name.trim() });
    if (existing) {
      throw new ConflictError('A department with this name already exists in this organization');
    }

    return await Department.create({
      organizationId,
      name: data.name.trim(),
      headUserId: data.headUserId || null,
    });
  }

  // 6. Get Departments
  static async getDepartments(organizationId) {
    return await Department.find({ organizationId }).sort({ name: 1 });
  }

  // 7. Create Team
  static async createTeam(organizationId, data) {
    return await Team.create({
      organizationId,
      departmentId: data.departmentId || null,
      name: data.name.trim(),
      leadUserId: data.leadUserId || null,
    });
  }

  // 8. Add / Invite Member
  static async addMember(organizationId, data) {
    const user = await User.findById(data.userId);
    if (!user) throw new NotFoundError('User not found');

    const existing = await Membership.findOne({ organizationId, userId: data.userId });
    if (existing) {
      throw new ConflictError('User is already a member of this organization');
    }

    const membership = await Membership.create({
      organizationId,
      userId: data.userId,
      role: data.role || OrgRole.MEMBER,
      departmentId: data.departmentId || null,
      teamId: data.teamId || null,
      title: data.title || '',
      status: 'ACTIVE',
    });

    return membership;
  }

  // 9. Get Organization Members (Paginated with Profile data)
  static async getMembers(organizationId, query) {
    const { page, limit, skip } = parsePagination(query);

    const filter = { organizationId, status: 'ACTIVE' };
    const total = await Membership.countDocuments(filter);

    const memberships = await Membership.find(filter)
      .sort({ role: 1, createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'email phone')
      .populate('departmentId', 'name')
      .lean();

    const userIds = memberships.map((m) => m.userId?._id || m.userId);
    const profiles = await Profile.find({ userId: { $in: userIds } }).lean();
    const profileMap = new Map(profiles.map((p) => [p.userId.toString(), p]));

    const items = memberships.map((m) => {
      const uId = m.userId?._id?.toString() || m.userId?.toString();
      return {
        membershipId: m._id,
        role: m.role,
        title: m.title,
        joinedAt: m.joinedAt,
        department: m.departmentId?.name || null,
        user: profileMap.get(uId) || m.userId,
      };
    });

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 10. Update Member Role
  static async updateMemberRole(organizationId, memberId, newRole) {
    const membership = await Membership.findOne({ _id: memberId, organizationId });
    if (!membership) throw new NotFoundError('Membership not found');

    if (membership.role === OrgRole.OWNER && newRole !== OrgRole.OWNER) {
      throw new BadRequestError('Cannot demote the organization Owner');
    }

    membership.role = newRole;
    await membership.save();

    return membership;
  }

  // 11. Remove Member
  static async removeMember(organizationId, memberId) {
    const membership = await Membership.findOne({ _id: memberId, organizationId });
    if (!membership) throw new NotFoundError('Membership not found');

    if (membership.role === OrgRole.OWNER) {
      throw new BadRequestError('Cannot remove the organization Owner');
    }

    await Membership.findByIdAndDelete(memberId);
    return { message: 'Member removed from organization successfully' };
  }
}
