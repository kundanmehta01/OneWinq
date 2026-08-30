import { DiscoveryService } from './discovery.service.js';
import { sendSuccess, sendPaginated } from '../../lib/response.js';

export class DiscoveryController {
  // Discover Feed
  static async discover(req, res, next) {
    try {
      const currentUserId = req.userId || null;
      const { items, pagination } = await DiscoveryService.discoverProfiles(req.query, currentUserId);
      return sendPaginated(res, items, pagination, 'Profiles discovered successfully');
    } catch (error) {
      next(error);
    }
  }

  // Search
  static async search(req, res, next) {
    try {
      const currentUserId = req.userId || null;
      const { items, pagination } = await DiscoveryService.searchProfiles(req.query, currentUserId);
      return sendPaginated(res, items, pagination, 'Search results retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Record View
  static async recordView(req, res, next) {
    try {
      const viewerId = req.userId || null;
      const result = await DiscoveryService.recordView(req.params.profileId, viewerId);
      return sendSuccess(res, result, 'Profile view processed');
    } catch (error) {
      next(error);
    }
  }

  // Recently Viewed
  static async getRecentlyViewed(req, res, next) {
    try {
      const { items, pagination } = await DiscoveryService.getRecentlyViewed(req.userId, req.query);
      return sendPaginated(res, items, pagination, 'Recently viewed profiles retrieved');
    } catch (error) {
      next(error);
    }
  }

  // View Analytics
  static async getAnalytics(req, res, next) {
    try {
      const stats = await DiscoveryService.getProfileViewAnalytics(req.userId);
      return sendSuccess(res, stats, 'Profile view analytics retrieved');
    } catch (error) {
      next(error);
    }
  }
}
