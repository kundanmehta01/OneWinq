import { EngagementService } from './engagement.service.js';
import { sendSuccess, sendCreated, sendPaginated } from '../../lib/response.js';

export class EngagementController {
  // Thoughts
  static async createThought(req, res, next) {
    try {
      const thought = await EngagementService.createThought(req.userId, req.body);
      return sendCreated(res, thought, 'Thought published successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getFeed(req, res, next) {
    try {
      const currentUserId = req.userId || null;
      const { items, pagination } = await EngagementService.getFeed(req.query, currentUserId);
      return sendPaginated(res, items, pagination, 'Feed retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteThought(req, res, next) {
    try {
      const result = await EngagementService.deleteThought(req.userId, req.params.id);
      return sendSuccess(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  // Like Toggle
  static async toggleLikeThought(req, res, next) {
    try {
      const result = await EngagementService.toggleLike(req.userId, 'THOUGHT', req.params.id);
      return sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  // Comments
  static async addComment(req, res, next) {
    try {
      const comment = await EngagementService.addComment(req.userId, req.params.thoughtId, req.body);
      return sendCreated(res, comment, 'Comment added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getComments(req, res, next) {
    try {
      const { items, pagination } = await EngagementService.getComments(req.params.thoughtId, req.query);
      return sendPaginated(res, items, pagination, 'Comments retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  // Reviews
  static async createReview(req, res, next) {
    try {
      const review = await EngagementService.createReview(req.userId, req.params.profileId, req.body);
      return sendCreated(res, review, 'Recommendation submitted for approval');
    } catch (error) {
      next(error);
    }
  }

  static async getProfileReviews(req, res, next) {
    try {
      const { items, pagination } = await EngagementService.getProfileReviews(req.params.profileId, req.query);
      return sendPaginated(res, items, pagination, 'Reviews retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateReviewStatus(req, res, next) {
    try {
      const review = await EngagementService.updateReviewStatus(req.userId, req.params.id, req.body.status);
      return sendSuccess(res, review, `Recommendation ${req.body.status.toLowerCase()}`);
    } catch (error) {
      next(error);
    }
  }
}
