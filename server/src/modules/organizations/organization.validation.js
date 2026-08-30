import { z } from 'zod';
import { OrgRole } from './membership.model.js';
import { OrgPlan } from './organization.model.js';


export const createOrgSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Organization name must be at least 2 characters'),
    domain: z.string().optional(),
    logo: z.string().url().optional().or(z.literal('')),
  }),
});

export const updateOrgSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    domain: z.string().optional(),
    logo: z.string().url().optional().or(z.literal('')),
    settings: z
      .object({
        allowSelfJoin: z.boolean().optional(),
        customBranding: z.boolean().optional(),
        defaultCardTheme: z.string().optional(),
      })
      .optional(),
  }),
});

export const createDepartmentSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Department name must be at least 2 characters'),
    headUserId: z.string().optional(),
  }),
});

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Team name must be at least 2 characters'),
    departmentId: z.string().optional(),
    leadUserId: z.string().optional(),
  }),
});

export const addMemberSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'Target user ID is required'),
    role: z.enum(['ADMIN', 'MANAGER', 'MEMBER', 'GUEST']).default('MEMBER'),
    departmentId: z.string().optional(),
    teamId: z.string().optional(),
    title: z.string().optional(),
  }),
});

export const updateMemberRoleSchema = z.object({
  params: z.object({
    id: z.string().min(1),
    memberId: z.string().min(1, 'Member ID is required'),
  }),
  body: z.object({
    role: z.enum(['ADMIN', 'MANAGER', 'MEMBER', 'GUEST']),
  }),
});

export const orgIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Organization ID is required'),
  }),
});
