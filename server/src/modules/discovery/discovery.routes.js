import { Router } from 'express';
import { DiscoveryController } from './discovery.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import { searchLimiter } from '../../middleware/rateLimiter.js';
import { searchQuerySchema, recordViewParamSchema } from './discovery.validation.js';

const router = Router();

// Public Discovery & Search (Protected by searchLimiter)
router.get('/', searchLimiter, validate(searchQuerySchema), DiscoveryController.discover);
router.get('/search', searchLimiter, validate(searchQuerySchema), DiscoveryController.search);

// Profile Views (Public or Authenticated)
router.post('/views/:profileId', validate(recordViewParamSchema), DiscoveryController.recordView);

// Authenticated View History & Analytics
router.get('/views/recent', authenticate, DiscoveryController.getRecentlyViewed);
router.get('/views/analytics', authenticate, DiscoveryController.getAnalytics);

export const discoveryRoutes = router;
