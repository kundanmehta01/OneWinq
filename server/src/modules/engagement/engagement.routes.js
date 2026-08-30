import { Router } from 'express';
import { EngagementController } from './engagement.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import {
  createThoughtSchema,
  createCommentSchema,
  createReviewSchema,
  updateReviewStatusSchema,
  idParamSchema,
} from './engagement.validation.js';

const router = Router();

// Feed (Public / Optional Auth)
router.get('/thoughts/feed', EngagementController.getFeed);

// Thoughts (Protected)
router.post('/thoughts', authenticate, validate(createThoughtSchema), EngagementController.createThought);
router.delete('/thoughts/:id', authenticate, validate(idParamSchema), EngagementController.deleteThought);

// Likes (Protected)
router.post('/thoughts/:id/like', authenticate, validate(idParamSchema), EngagementController.toggleLikeThought);

// Comments
router.post('/thoughts/:thoughtId/comments', authenticate, validate(createCommentSchema), EngagementController.addComment);
router.get('/thoughts/:thoughtId/comments', EngagementController.getComments);

// Recommendations / Reviews
router.post('/reviews/profiles/:profileId', authenticate, validate(createReviewSchema), EngagementController.createReview);
router.get('/reviews/profiles/:profileId', EngagementController.getProfileReviews);
router.patch('/reviews/:id/status', authenticate, validate(updateReviewStatusSchema), EngagementController.updateReviewStatus);

export const engagementRoutes = router;
