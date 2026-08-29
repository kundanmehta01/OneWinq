import { Profile, ProfileVisibility } from './profile.model.js';
import { calculateProfileCompletion } from '../../utils/profileCompletion.js';
import { NotFoundError, AuthorizationError } from '../../lib/errors/appError.js';

export class ProfileService {
  // 1. Get My Profile
  static async getProfileByUserId(userId) {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      throw new NotFoundError('Profile not found');
    }
    return profile;
  }

  // 2. Get Public Profile by Slug (Enforces Visibility)
  static async getProfileBySlug(slug, requesterUserId = null) {
    const profile = await Profile.findOne({ slug: slug.toLowerCase(), status: 'ACTIVE' });
    if (!profile) {
      throw new NotFoundError('Profile not found');
    }

    const isOwner = requesterUserId && profile.userId.toString() === requesterUserId.toString();

    if (profile.visibility === ProfileVisibility.PRIVATE && !isOwner) {
      throw new AuthorizationError('This profile is private');
    }

    return profile;
  }

  // 3. Update Basic Profile Details
  static async updateProfile(userId, updateData) {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      throw new NotFoundError('Profile not found');
    }

    // Merge basic fields
    Object.assign(profile, updateData);

    // If displayName wasn't provided, build from firstName + lastName
    if (!profile.displayName && (profile.firstName || profile.lastName)) {
      profile.displayName = `${profile.firstName} ${profile.lastName}`.trim();
    }

    // Recalculate completion score
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();

    return profile;
  }

  // 4. Update Visibility
  static async updateVisibility(userId, visibility) {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { visibility },
      { new: true }
    );
    if (!profile) throw new NotFoundError('Profile not found');
    return profile;
  }

  // 5. Update Presentation Template
  static async updateTemplate(userId, template) {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { template },
      { new: true }
    );
    if (!profile) throw new NotFoundError('Profile not found');
    return profile;
  }

  // --- SUBSECTION: EXPERIENCE ---
  static async addExperience(userId, expData) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.experience.push(expData);
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  static async deleteExperience(userId, expId) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.experience.pull({ _id: expId });
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  // --- SUBSECTION: EDUCATION ---
  static async addEducation(userId, eduData) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.education.push(eduData);
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  static async deleteEducation(userId, eduId) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.education.pull({ _id: eduId });
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  // --- SUBSECTION: SKILLS ---
  static async updateSkills(userId, skills) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    // Deduplicate skills
    profile.skills = [...new Set(skills)];
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  // --- SUBSECTION: ACHIEVEMENTS ---
  static async addAchievement(userId, data) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.achievements.push(data);
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  static async deleteAchievement(userId, achievementId) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.achievements.pull({ _id: achievementId });
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  // --- SUBSECTION: SERVICES ---
  static async addService(userId, data) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.services.push(data);
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  static async deleteService(userId, serviceId) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.services.pull({ _id: serviceId });
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  // --- SUBSECTION: SOCIAL LINKS ---
  static async addSocialLink(userId, data) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.socialLinks.push(data);
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }

  static async deleteSocialLink(userId, linkId) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    profile.socialLinks.pull({ _id: linkId });
    profile.completionPercentage = calculateProfileCompletion(profile);
    await profile.save();
    return profile;
  }
}
