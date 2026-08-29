import { z } from 'zod';
import { CardTheme } from './card.model.js';

// Update Digital Card theme, layout & sharing
export const updateCardSchema = z.object({
  body: z.object({
    theme: z.enum(Object.values(CardTheme)).optional(),
    layout: z
      .object({
        showPhoto: z.boolean().optional(),
        showHeadline: z.boolean().optional(),
        showSocialLinks: z.boolean().optional(),
        showServices: z.boolean().optional(),
        showQRCode: z.boolean().optional(),
        customColor: z.string().optional(),
      })
      .optional(),
    sharingEnabled: z.boolean().optional(),
  }),
});
