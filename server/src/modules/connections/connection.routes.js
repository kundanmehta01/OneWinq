import { Router } from 'express';
import { ConnectionController } from './connection.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import { sendRequestSchema, connectionIdParamSchema } from './connection.validation.js';

const router = Router();

// All connection routes require authentication
router.use(authenticate);

// List endpoints
router.get('/', ConnectionController.getConnections);
router.get('/requests', ConnectionController.getIncomingRequests);
router.get('/sent', ConnectionController.getSentRequests);

// Actions
router.post('/:userId', validate(sendRequestSchema), ConnectionController.sendRequest);
router.patch('/:id/accept', validate(connectionIdParamSchema), ConnectionController.acceptRequest);
router.patch('/:id/reject', validate(connectionIdParamSchema), ConnectionController.rejectRequest);
router.delete('/:id', validate(connectionIdParamSchema), ConnectionController.removeConnection);

export const connectionRoutes = router;
