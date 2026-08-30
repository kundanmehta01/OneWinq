import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    thoughtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
      required: true,
      index: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'DELETED'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ thoughtId: 1, createdAt: -1 });

export const Comment = mongoose.model('Comment', commentSchema);
