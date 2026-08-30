import mongoose from 'mongoose';

export const OrgPlan = {
  FREE: 'FREE',
  STARTER: 'STARTER',
  PROFESSIONAL: 'PROFESSIONAL',
  ENTERPRISE: 'ENTERPRISE',
};

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    logo: {
      type: String,
      default: '',
    },
    domain: {
      type: String,
      lowercase: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    plan: {
      type: String,
      enum: Object.values(OrgPlan),
      default: OrgPlan.FREE,
    },
    settings: {
      allowSelfJoin: { type: Boolean, default: false },
      customBranding: { type: Boolean, default: false },
      defaultCardTheme: { type: String, default: 'MODERN' },
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'SUSPENDED', 'DELETED'],
      default: 'ACTIVE',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Organization = mongoose.model('Organization', organizationSchema);
