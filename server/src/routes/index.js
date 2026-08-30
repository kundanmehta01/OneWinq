import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { profileRoutes } from '../modules/profiles/profile.routes.js';
import { cardRoutes } from '../modules/cards/card.routes.js';
import { connectionRoutes } from '../modules/connections/connection.routes.js';
import { discoveryRoutes } from '../modules/discovery/discovery.routes.js';
import { messageRoutes } from '../modules/messages/message.routes.js';
import { engagementRoutes } from '../modules/engagement/engagement.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profiles', profileRoutes);
router.use('/cards', cardRoutes);
router.use('/connections', connectionRoutes);
router.use('/discovery', discoveryRoutes);
router.use('/messages', messageRoutes);
router.use('/engagement', engagementRoutes);

export const apiRoutes = router;
