import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { profileRoutes } from '../modules/profiles/profile.routes.js';
import { cardRoutes } from '../modules/cards/card.routes.js';

const router = Router();

// Mount Domain Modules
router.use('/auth', authRoutes);
router.use('/profiles', profileRoutes);
router.use('/cards', cardRoutes);

export const apiRoutes = router;
