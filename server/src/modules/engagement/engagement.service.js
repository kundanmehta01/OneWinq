import { Thought } from './thought.model.js';
import { Like } from './like.model.js';
import { Comment } from './comment.model.js';
import { Review } from './review.model.js';
import { Profile } from '../profiles/profile.model.js';
import { NotFoundError, AuthorizationError, BadRequestError } from '../../lib/errors/appError.js';
import { parsePagination, getPaginationMeta } from '../../utils/pagination.js';

export class EngagementService {
  // --- 1. THOUGHTS & FEED ---
  static async createThought(userId, data) {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    const thought = await Thought.create({
      authorId: userId,
      profileId: profile._id,
      content: data.content,
      tags: data.tags || [],
      visibility: data.visibility || 'PUBLIC',
    });

    return thought;
  }

  static async getFeed(query, currentUserId = null) {
    const { page, limit, skip } = parsePagination(query);

    const filter = {
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
    };

    if (query.tag) {
      filter.tags = query.tag.toLowerCase();
    }

    const total = await Thought.countDocuments(filter);
    const thoughts = await Thought.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('profileId', 'displayName designation profilePhoto slug')
      .lean();

    // Check if current user liked each thought
    let likedSet = new Set();
    if (currentUserId) {
      const thoughtIds = thoughts.map((t) => t._id);
      const likes = await Like.find({
        userId: currentUserId,
        targetType: 'THOUGHT',
        targetId: { $in: thoughtIds },
      }).lean();
      likedSet = new Set(likes.map((l) => l.targetId.toString()));
    }

    const items = thoughts.map((t) => ({
      ...t,
      isLiked: likedSet.has(t._id.toString()),
    }));

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  static async deleteThought(userId, thoughtId) {
    const thought = await Thought.findById(thoughtId);
    if (!thought) throw new NotFoundError('Thought not found');

    if (thought.authorId.toString() !== userId.toString()) {
      throw new AuthorizationError('You are not authorized to delete this post');
    }

    thought.status = 'DELETED';
    await thought.save();

    return { message: 'Thought deleted successfully' };
  }

  // --- 2. LIKES (Atomic Toggle) ---
  static async toggleLike(userId, targetType, targetId) {
    const existing = await Like.findOne({ userId, targetType, targetId });

    if (existing) {
      // Unlike
      await Like.findByIdAndDelete(existing._id);
      if (targetType === 'THOUGHT') {
        await Thought.findByIdAndUpdate(targetId, { $inc: { likeCount: -1 } });
      }
      return { liked: false, message: 'Unliked successfully' };
    } else {
      // Like
      await Like.create({ userId, targetType, targetId });
      if (targetType === 'THOUGHT') {
        await Thought.findByIdAndUpdate(targetId, { $inc: { likeCount: 1 } });
      }
      return { liked: true, message: 'Liked successfully' };
    }
  }

  // --- 3. COMMENTS ---
  static async addComment(userId, thoughtId, data) {
    const thought = await Thought.findOne({ _id: thoughtId, status: 'PUBLISHED' });
    if (!thought) throw new NotFoundError('Thought not found');

    const profile = await Profile.findOne({ userId });
    if (!profile) throw new NotFoundError('Profile not found');

    const comment = await Comment.create({
      thoughtId,
      authorId: userId,
      profileId: profile._id,
      content: data.content,
      parentId: data.parentId || null,
    });

    // Increment thought comment count
    await Thought.findByIdAndUpdate(thoughtId, { $inc: { commentCount: 1 } });

    return comment;
  }

  static async getComments(thoughtId, query) {
    const { page, limit, skip } = parsePagination(query, 20, 100);

    const filter = { thoughtId, status: 'ACTIVE' };
    const total = await Comment.countDocuments(filter);

    const items = await Comment.find(filter)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate('profileId', 'displayName designation profilePhoto slug')
      .lean();

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // --- 4. REVIEWS & RECOMMENDATIONS ---
  static async createReview(userId, targetProfileId, data) {
    const authorProfile = await Profile.findOne({ userId });
    if (!authorProfile) throw new NotFoundError('Author profile not found');

    if (authorProfile._id.toString() === targetProfileId.toString()) {
      throw new BadRequestError('You cannot write a recommendation for yourself');
    }

    const targetProfile = await Profile.findById(targetProfileId);
    if (!targetProfile) throw new NotFoundError('Target profile not found');

    const review = await Review.create({
      authorId: userId,
      authorProfileId: authorProfile._id,
      targetProfileId,
      relationship: data.relationship,
      rating: data.rating || 5,
      text: data.text,
      status: 'PENDING',
    });

    return review;
  }

  static async getProfileReviews(profileId, query) {
    const { page, limit, skip } = parsePagination(query);

    const filter = { targetProfileId: profileId, status: 'ACCEPTED' };
    const total = await Review.countDocuments(filter);

    const items = await Review.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('authorProfileId', 'displayName designation profilePhoto slug')
      .lean();

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  static async updateReviewStatus(userId, reviewId, status) {
    const review = await Review.findById(reviewId);
    if (!review) throw new NotFoundError('Review not found');

    const userProfile = await Profile.findOne({ userId });
    if (!userProfile || review.targetProfileId.toString() !== userProfile._id.toString()) {
      throw new AuthorizationError('You can only accept or reject reviews written for your profile');
    }

    review.status = status;
    await review.save();

    return review;
  }
}
