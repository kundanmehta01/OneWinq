import { User } from '../users/user.model.js';
import { Profile } from '../profiles/profile.model.js';
import { DigitalCard } from '../cards/card.model.js';
import { Connection, ConnectionStatus } from '../connections/connection.model.js';
import { Conversation } from '../messages/conversation.model.js';
import { ProfileView } from '../discovery/profileView.model.js';
import { Thought } from '../engagement/thought.model.js';
import { Membership } from '../organizations/membership.model.js';
import { NotFoundError } from '../../lib/errors/appError.js';

export class DashboardService {
  static async getUserDashboard(userId) {
    const user = await User.findById(userId).select('email phone platformRole status');
    if (!user) throw new NotFoundError('User not found');

    // Run parallel aggregation queries for sub-50ms response time
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      profile,
      digitalCard,
      acceptedConnectionsCount,
      pendingRequestsCount,
      conversations,
      totalViews,
      recentViewsCount,
      thoughtsCount,
      memberships,
    ] = await Promise.all([
      Profile.findOne({ userId }),
      DigitalCard.findOne({ userId }),
      Connection.countDocuments({
        $or: [{ requesterId: userId }, { recipientId: userId }],
        status: ConnectionStatus.ACCEPTED,
      }),
      Connection.countDocuments({
        recipientId: userId,
        status: ConnectionStatus.PENDING,
      }),
      Conversation.find({ participants: userId }).lean(),
      ProfileView.countDocuments({ profileId: profile?._id }),
      ProfileView.countDocuments({ profileId: profile?._id, viewedAt: { $gt: sevenDaysAgo } }),
      Thought.countDocuments({ authorId: userId, status: 'PUBLISHED' }),
      Membership.find({ userId, status: 'ACTIVE' }).populate('organizationId', 'name slug logo plan').lean(),
    ]);

    // Calculate total unread messages across all user conversations
    const totalUnreadMessages = conversations.reduce((sum, conv) => {
      return sum + (conv.unreadCounts?.[userId.toString()] || 0);
    }, 0);

    return {
      user,
      profile: profile || null,
      digitalCard: digitalCard || null,
      metrics: {
        profileCompletion: profile?.completionPercentage || 0,
        connectionsCount: acceptedConnectionsCount,
        pendingIncomingRequests: pendingRequestsCount,
        totalUnreadMessages,
        totalProfileViews: totalViews,
        viewsLast7Days: recentViewsCount,
        publishedThoughtsCount: thoughtsCount,
      },
      organizations: memberships.map((m) => ({
        membershipId: m._id,
        role: m.role,
        title: m.title,
        organization: m.organizationId,
      })),
    };
  }
}
