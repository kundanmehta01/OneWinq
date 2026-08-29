import { DigitalCard } from './card.model.js';
import { NotFoundError, AuthorizationError } from '../../lib/errors/appError.js';

export class CardService {
  // 1. Get My Digital Card (Populates Profile data)
  static async getCardByUserId(userId) {
    const card = await DigitalCard.findOne({ userId }).populate('profileId');
    if (!card) {
      throw new NotFoundError('Digital card not found');
    }
    return card;
  }

  // 2. Get Public Digital Card by Slug (Sharing Link)
  static async getCardBySlug(slug) {
    const card = await DigitalCard.findOne({
      slug: slug.toLowerCase(),
      status: 'ACTIVE',
    }).populate('profileId');

    if (!card) {
      throw new NotFoundError('Digital card not found');
    }

    if (!card.sharingEnabled) {
      throw new AuthorizationError('Sharing is disabled for this digital card');
    }

    return card;
  }

  // 3. Customize Card Theme & Layout
  static async updateCard(userId, updateData) {
    const card = await DigitalCard.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true }
    ).populate('profileId');

    if (!card) {
      throw new NotFoundError('Digital card not found');
    }

    return card;
  }
}
