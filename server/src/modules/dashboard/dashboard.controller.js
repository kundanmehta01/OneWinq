import { DashboardService } from './dashboard.service.js';
import { sendSuccess } from '../../lib/response.js';

export class DashboardController {
  static async getMyDashboard(req, res, next) {
    try {
      const data = await DashboardService.getUserDashboard(req.userId);
      return sendSuccess(res, data, 'Dashboard metrics retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
