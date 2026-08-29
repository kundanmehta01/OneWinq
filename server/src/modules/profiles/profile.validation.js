import { z } from 'zod';
import { ProfileTemplate, ProfileVisibility } from './profile.model.js';

// Update basic profile details
export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
    displayName: z.string().max(100).optional(),
    introduction: z.string().max(300).optional(),
    about: z.string().max(3000).optional(),
    designation: z.string().max(100).optional(),
    profilePhoto: z
      .object({
        url: z.string(),
        storageKey: z.string().optional(),
        provider: z.string().optional(),
      })
      .optional(),
    coverPhoto: z
      .object({
        url: z.string(),
        storageKey: z.string().optional(),
        provider: z.string().optional(),
      })
      .optional(),
    contact: z
      .object({
        email: z.string().email().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        website: z.string().url().optional().or(z.literal('')),
      })
      .optional(),
  }),
});

// Update visibility
export const updateVisibilitySchema = z.object({
  body: z.object({
    visibility: z.enum(Object.values(ProfileVisibility)),
  }),
});

// Update presentation template
export const updateTemplateSchema = z.object({
  body: z.object({
    template: z.enum(Object.values(ProfileTemplate)),
  }),
});

// Sub-section: Experience
export const experienceSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

// Sub-section: Education
export const educationSchema = z.object({
  body: z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree is required'),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    grade: z.string().optional(),
  }),
});

// Sub-section: Skills
export const skillsSchema = z.object({
  body: z.object({
    skills: z.array(z.string().min(1)).min(1, 'At least one skill is required'),
  }),
});

// Sub-section: Achievements
export const achievementSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    issuer: z.string().optional(),
    date: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url().optional().or(z.literal('')),
  }),
});

// Sub-section: Services
export const serviceSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Service name is required'),
    description: z.string().optional(),
    price: z.string().optional(),
  }),
});

// Sub-section: Social Links
export const socialLinkSchema = z.object({
  body: z.object({
    platform: z.string().min(1, 'Platform is required (e.g. linkedin, github, twitter)'),
    url: z.string().url('Must be a valid URL'),
  }),
});
