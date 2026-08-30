import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    targetType: {
      type: String,
      enum: ['THOUGHT', 'COMMENT', 'PROFILE'],
      default: 'THOUGHT',
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔒 Unique compound index: A user can only like a target ONCE
likeSchema.index({ userId: 1, targetType: 1, targetId: 1 }, { unique: true });

export const Like = mongoose.model('Like', likeSchema);
