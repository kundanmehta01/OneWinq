import { Router } from 'express';
import { CardController } from './card.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import { updateCardSchema } from './card.validation.js';

const router = Router();

// My Card (Protected)
router.get('/me', authenticate, CardController.getMe);
router.patch('/me', authenticate, validate(updateCardSchema), CardController.updateMe);

// Public Card by Slug
router.get('/:slug', CardController.getBySlug);

export const cardRoutes = router;
