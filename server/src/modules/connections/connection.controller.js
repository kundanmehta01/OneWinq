import { ConnectionService } from './connection.service.js';
import { sendSuccess, sendCreated, sendPaginated } from '../../lib/response.js';

export class ConnectionController {
  // Send Request
  static async sendRequest(req, res, next) {
    try {
      const connection = await ConnectionService.sendRequest(req.userId, req.params.userId);
      return sendCreated(res, connection, 'Connection request sent successfully');
    } catch (error) {
      next(error);
    }
  }

  // Accept Request
  static async acceptRequest(req, res, next) {
    try {
      const connection = await ConnectionService.acceptRequest(req.userId, req.params.id);
      return sendSuccess(res, connection, 'Connection request accepted');
    } catch (error) {
      next(error);
    }
  }

  // Reject Request
  static async rejectRequest(req, res, next) {
    try {
      const connection = await ConnectionService.rejectRequest(req.userId, req.params.id);
      return sendSuccess(res, connection, 'Connection request rejected');
    } catch (error) {
      next(error);
    }
  }

  // Delete / Cancel Connection
  static async removeConnection(req, res, next) {
    try {
      const result = await ConnectionService.removeConnection(req.userId, req.params.id);
      return sendSuccess(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  // Get My Accepted Connections
  static async getConnections(req, res, next) {
    try {
      const { items, pagination } = await ConnectionService.getAcceptedConnections(req.userId, req.query);
      return sendPaginated(res, items, pagination, 'Connections retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  // Get Incoming Requests
  static async getIncomingRequests(req, res, next) {
    try {
      const { items, pagination } = await ConnectionService.getIncomingRequests(req.userId, req.query);
      return sendPaginated(res, items, pagination, 'Incoming connection requests retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Get Sent Requests
  static async getSentRequests(req, res, next) {
    try {
      const { items, pagination } = await ConnectionService.getSentRequests(req.userId, req.query);
      return sendPaginated(res, items, pagination, 'Sent connection requests retrieved');
    } catch (error) {
      next(error);
    }
  }
}
