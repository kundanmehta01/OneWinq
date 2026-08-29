import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes.js';

const router = Router();

// Mount Domain Modules
router.use('/auth', authRoutes);

export const apiRoutes = router;
