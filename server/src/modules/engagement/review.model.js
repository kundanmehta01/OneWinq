import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    authorProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    targetProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
      index: true,
    },
    relationship: {
      type: String,
      enum: ['COLLEAGUE', 'CLIENT', 'MANAGER', 'MENTOR', 'PARTNER'],
      default: 'COLLEAGUE',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1500,
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
      default: 'PENDING',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ targetProfileId: 1, status: 1, createdAt: -1 });

export const Review = mongoose.model('Review', reviewSchema);
