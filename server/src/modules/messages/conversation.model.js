import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    lastMessage: {
      content: { type: String, default: '' },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      sentAt: { type: Date, default: Date.now },
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying conversations for a user
conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });

export const Conversation = mongoose.model('Conversation', conversationSchema);
