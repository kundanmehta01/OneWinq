import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema(
  {
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
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 3000,
    },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ['IMAGE', 'VIDEO', 'DOCUMENT'], default: 'IMAGE' },
        storageKey: { type: String },
      },
    ],
    tags: [{ type: String, trim: true, lowercase: true }],
    visibility: {
      type: String,
      enum: ['PUBLIC', 'CONNECTIONS_ONLY'],
      default: 'PUBLIC',
      index: true,
    },
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['PUBLISHED', 'ARCHIVED', 'DELETED'],
      default: 'PUBLISHED',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for feed discovery
thoughtSchema.index({ status: 1, visibility: 1, createdAt: -1 });
thoughtSchema.index({ tags: 1 });

export const Thought = mongoose.model('Thought', thoughtSchema);
