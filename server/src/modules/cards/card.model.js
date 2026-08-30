import mongoose from 'mongoose';

export const CardTheme = {
  CLASSIC: 'CLASSIC',
  MODERN: 'MODERN',
  MINIMAL: 'MINIMAL',
  DARK_LUXURY: 'DARK_LUXURY',
  NEON_VIBRANT: 'NEON_VIBRANT',
};

const cardSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    theme: {
      type: String,
      enum: Object.values(CardTheme),
      default: CardTheme.MODERN,
    },
    layout: {
      showPhoto: { type: Boolean, default: true },
      showHeadline: { type: Boolean, default: true },
      showSocialLinks: { type: Boolean, default: true },
      showServices: { type: Boolean, default: true },
      showQRCode: { type: Boolean, default: true },
      customColor: { type: String, default: '#6366F1' },
    },
    sharingEnabled: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  }
);

export const DigitalCard = mongoose.model('DigitalCard', cardSchema);
