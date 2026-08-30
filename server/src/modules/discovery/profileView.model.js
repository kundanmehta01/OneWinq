import mongoose from 'mongoose';

const profileViewSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
      index: true,
    },
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      default: null, // Null for anonymous/unauthenticated viewers
    },
    viewedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for profile analytics (who viewed this profile)
profileViewSchema.index({ profileId: 1, viewedAt: -1 });
// Compound index for viewer history (profiles recently viewed by this user)
profileViewSchema.index({ viewerId: 1, viewedAt: -1 });

export const ProfileView = mongoose.model('ProfileView', profileViewSchema);
