import { Router } from 'express';
import { DashboardController } from './dashboard.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = Router();

router.get('/me', authenticate, DashboardController.getMyDashboard);

export const dashboardRoutes = router;
