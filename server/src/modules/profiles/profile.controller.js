import { ProfileService } from './profile.service.js';
import { sendSuccess } from '../../lib/response.js';

export class ProfileController {
  // My Profile
  static async getMe(req, res, next) {
    try {
      const profile = await ProfileService.getProfileByUserId(req.userId);
      return sendSuccess(res, profile, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateMe(req, res, next) {
    try {
      const profile = await ProfileService.updateProfile(req.userId, req.body);
      return sendSuccess(res, profile, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateVisibility(req, res, next) {
    try {
      const profile = await ProfileService.updateVisibility(req.userId, req.body.visibility);
      return sendSuccess(res, profile, 'Visibility updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateTemplate(req, res, next) {
    try {
      const profile = await ProfileService.updateTemplate(req.userId, req.body.template);
      return sendSuccess(res, profile, 'Template updated successfully');
    } catch (error) {
      next(error);
    }
  }

  // Public Profile
  static async getBySlug(req, res, next) {
    try {
      const requesterId = req.userId || null;
      const profile = await ProfileService.getProfileBySlug(req.params.slug, requesterId);
      return sendSuccess(res, profile, 'Public profile retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Experience
  static async addExperience(req, res, next) {
    try {
      const profile = await ProfileService.addExperience(req.userId, req.body);
      return sendSuccess(res, profile, 'Experience added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteExperience(req, res, next) {
    try {
      const profile = await ProfileService.deleteExperience(req.userId, req.params.id);
      return sendSuccess(res, profile, 'Experience deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Education
  static async addEducation(req, res, next) {
    try {
      const profile = await ProfileService.addEducation(req.userId, req.body);
      return sendSuccess(res, profile, 'Education added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteEducation(req, res, next) {
    try {
      const profile = await ProfileService.deleteEducation(req.userId, req.params.id);
      return sendSuccess(res, profile, 'Education deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Skills
  static async updateSkills(req, res, next) {
    try {
      const profile = await ProfileService.updateSkills(req.userId, req.body.skills);
      return sendSuccess(res, profile, 'Skills updated successfully');
    } catch (error) {
      next(error);
    }
  }

  // Achievements
  static async addAchievement(req, res, next) {
    try {
      const profile = await ProfileService.addAchievement(req.userId, req.body);
      return sendSuccess(res, profile, 'Achievement added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteAchievement(req, res, next) {
    try {
      const profile = await ProfileService.deleteAchievement(req.userId, req.params.id);
      return sendSuccess(res, profile, 'Achievement deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Services
  static async addService(req, res, next) {
    try {
      const profile = await ProfileService.addService(req.userId, req.body);
      return sendSuccess(res, profile, 'Service added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    try {
      const profile = await ProfileService.deleteService(req.userId, req.params.id);
      return sendSuccess(res, profile, 'Service deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Social Links
  static async addSocialLink(req, res, next) {
    try {
      const profile = await ProfileService.addSocialLink(req.userId, req.body);
      return sendSuccess(res, profile, 'Social link added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteSocialLink(req, res, next) {
    try {
      const profile = await ProfileService.deleteSocialLink(req.userId, req.params.id);
      return sendSuccess(res, profile, 'Social link deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
