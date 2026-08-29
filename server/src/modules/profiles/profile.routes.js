import { Router } from 'express';
import { ProfileController } from './profile.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import {
  updateProfileSchema,
  updateVisibilitySchema,
  updateTemplateSchema,
  experienceSchema,
  educationSchema,
  skillsSchema,
  achievementSchema,
  serviceSchema,
  socialLinkSchema,
} from './profile.validation.js';

const router = Router();

// My Profile Endpoints (Protected)
router.get('/me', authenticate, ProfileController.getMe);
router.patch('/me', authenticate, validate(updateProfileSchema), ProfileController.updateMe);
router.patch('/me/visibility', authenticate, validate(updateVisibilitySchema), ProfileController.updateVisibility);
router.patch('/me/template', authenticate, validate(updateTemplateSchema), ProfileController.updateTemplate);

// Subsections (Protected)
router.post('/me/experience', authenticate, validate(experienceSchema), ProfileController.addExperience);
router.delete('/me/experience/:id', authenticate, ProfileController.deleteExperience);

router.post('/me/education', authenticate, validate(educationSchema), ProfileController.addEducation);
router.delete('/me/education/:id', authenticate, ProfileController.deleteEducation);

router.put('/me/skills', authenticate, validate(skillsSchema), ProfileController.updateSkills);

router.post('/me/achievements', authenticate, validate(achievementSchema), ProfileController.addAchievement);
router.delete('/me/achievements/:id', authenticate, ProfileController.deleteAchievement);

router.post('/me/services', authenticate, validate(serviceSchema), ProfileController.addService);
router.delete('/me/services/:id', authenticate, ProfileController.deleteService);

router.post('/me/social-links', authenticate, validate(socialLinkSchema), ProfileController.addSocialLink);
router.delete('/me/social-links/:id', authenticate, ProfileController.deleteSocialLink);

// Public Profile by Slug
router.get('/:slug', ProfileController.getBySlug);

export const profileRoutes = router;
