import { Profile, ProfileVisibility } from '../profiles/profile.model.js';
import { ProfileView } from './profileView.model.js';
import { NotFoundError } from '../../lib/errors/appError.js';
import { parsePagination, getPaginationMeta } from '../../utils/pagination.js';

export class DiscoveryService {
  // 1. Discover Profiles (Feed with basic filters & visibility guard)
  static async discoverProfiles(query, excludeUserId = null) {
    const { page, limit, skip } = parsePagination(query);

    const filter = {
      visibility: ProfileVisibility.PUBLIC,
      status: 'ACTIVE',
    };

    // Don't show current logged-in user in their own discovery feed
    if (excludeUserId) {
      filter.userId = { $ne: excludeUserId };
    }

    if (query.profileType) {
      filter.profileType = query.profileType;
    }

    const total = await Profile.countDocuments(filter);
    const items = await Profile.find(filter)
      .sort({ completionPercentage: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 2. Search Profiles (Text query + multi-filters)
  static async searchProfiles(query, excludeUserId = null) {
    const { page, limit, skip } = parsePagination(query);

    const filter = {
      visibility: ProfileVisibility.PUBLIC,
      status: 'ACTIVE',
    };

    if (excludeUserId) {
      filter.userId = { $ne: excludeUserId };
    }

    // Keyword Search (across displayName, designation, introduction, skills)
    if (query.q && query.q.trim()) {
      const regex = new RegExp(query.q.trim(), 'i');
      filter.$or = [
        { displayName: regex },
        { designation: regex },
        { introduction: regex },
        { skills: { $in: [regex] } },
        { 'experience.company': regex },
      ];
    }

    // Filter by specific Skills (comma-separated list)
    if (query.skills) {
      const skillsArray = query.skills.split(',').map((s) => new RegExp(`^${s.trim()}$`, 'i'));
      filter.skills = { $all: skillsArray };
    }

    // Filter by Designation
    if (query.designation) {
      filter.designation = new RegExp(query.designation.trim(), 'i');
    }

    // Filter by Location
    if (query.location) {
      filter['contact.location'] = new RegExp(query.location.trim(), 'i');
    }

    const total = await Profile.countDocuments(filter);
    const items = await Profile.find(filter)
      .sort({ completionPercentage: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 3. Record Profile View (With 1-hour deduplication and self-view exclusion)
  static async recordView(profileId, viewerId = null) {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      throw new NotFoundError('Profile not found');
    }

    // Don't record self-views
    if (viewerId && profile.userId.toString() === viewerId.toString()) {
      return { recorded: false, reason: 'Self view ignored' };
    }

    // Deduplicate: Check if the same viewer viewed this profile in the last 1 hour
    if (viewerId) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentView = await ProfileView.findOne({
        profileId,
        viewerId,
        viewedAt: { $gt: oneHourAgo },
      });

      if (recentView) {
        return { recorded: false, reason: 'Duplicate view within 1 hour ignored' };
      }
    }

    await ProfileView.create({
      profileId,
      viewerId: viewerId || null,
      viewedAt: new Date(),
    });

    return { recorded: true, message: 'Profile view recorded' };
  }

  // 4. Get Recently Viewed Profiles by Me (Viewer History)
  static async getRecentlyViewed(viewerId, query) {
    const { page, limit, skip } = parsePagination(query, 10, 50);

    const filter = { viewerId };
    const total = await ProfileView.countDocuments(filter);

    const views = await ProfileView.find(filter)
      .sort({ viewedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('profileId')
      .lean();

    const items = views
      .filter((v) => v.profileId) // Ensure profile wasn't deleted
      .map((v) => ({
        viewedAt: v.viewedAt,
        profile: v.profileId,
      }));

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 5. Get Analytics: Who Viewed My Profile
  static async getProfileViewAnalytics(userId) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    const totalViews = await ProfileView.countDocuments({ profileId: profile._id });

    // Views in the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentViewsCount = await ProfileView.countDocuments({
      profileId: profile._id,
      viewedAt: { $gt: sevenDaysAgo },
    });

    // Recent 10 viewers with profile population
    const recentViewers = await ProfileView.find({
      profileId: profile._id,
      viewerId: { $ne: null },
    })
      .sort({ viewedAt: -1 })
      .limit(10)
      .populate({
        path: 'viewerId',
        select: 'email phone',
      })
      .lean();

    return {
      totalViews,
      viewsLast7Days: recentViewsCount,
      recentViewers,
    };
  }
}
