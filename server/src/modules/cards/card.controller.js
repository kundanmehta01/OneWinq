import { CardService } from './card.service.js';
import { sendSuccess } from '../../lib/response.js';

export class CardController {
  static async getMe(req, res, next) {
    try {
      const card = await CardService.getCardByUserId(req.userId);
      return sendSuccess(res, card, 'Digital card retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async updateMe(req, res, next) {
    try {
      const card = await CardService.updateCard(req.userId, req.body);
      return sendSuccess(res, card, 'Digital card updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const card = await CardService.getCardBySlug(req.params.slug);
      return sendSuccess(res, card, 'Public digital card retrieved');
    } catch (error) {
      next(error);
    }
  }
}
