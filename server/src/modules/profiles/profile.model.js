import mongoose from 'mongoose';

export const ProfileType = {
  PERSONAL: 'PERSONAL',
  PROFESSIONAL: 'PROFESSIONAL',
};

export const ProfileTemplate = {
  DEFAULT: 'DEFAULT',
  CEO: 'CEO',
  FOUNDER: 'FOUNDER',
  TEAM_MEMBER: 'TEAM_MEMBER',
};

export const ProfileVisibility = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  CONNECTIONS_ONLY: 'CONNECTIONS_ONLY',
};

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  description: { type: String, trim: true },
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true, trim: true },
  degree: { type: String, required: true, trim: true },
  fieldOfStudy: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  grade: { type: String, trim: true },
});

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, trim: true },
  date: { type: Date },
  description: { type: String, trim: true },
  url: { type: String, trim: true },
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: String, trim: true },
});

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true, trim: true }, // e.g. linkedin, github, twitter
  url: { type: String, required: true, trim: true },
});

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
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
    profileType: {
      type: String,
      enum: Object.values(ProfileType),
      default: ProfileType.PROFESSIONAL,
      index: true,
    },
    template: {
      type: String,
      enum: Object.values(ProfileTemplate),
      default: ProfileTemplate.DEFAULT,
    },
    visibility: {
      type: String,
      enum: Object.values(ProfileVisibility),
      default: ProfileVisibility.PUBLIC,
      index: true,
    },
    firstName: { type: String, trim: true, default: '' },
    lastName: { type: String, trim: true, default: '' },
    displayName: { type: String, trim: true, default: '' },
    profilePhoto: {
      url: { type: String, default: '' },
      storageKey: { type: String },
      provider: { type: String, default: 'local' },
    },
    coverPhoto: {
      url: { type: String, default: '' },
      storageKey: { type: String },
      provider: { type: String, default: 'local' },
    },
    introduction: { type: String, maxLength: 300, trim: true, default: '' },
    about: { type: String, maxLength: 3000, trim: true, default: '' },
    designation: { type: String, trim: true, default: '' },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      index: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    contact: {
      email: { type: String, lowercase: true, trim: true },
      phone: { type: String, trim: true },
      location: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    experience: [experienceSchema],
    skills: [{ type: String, trim: true }],
    education: [educationSchema],
    achievements: [achievementSchema],
    services: [serviceSchema],
    socialLinks: [socialLinkSchema],
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ARCHIVED', 'DELETED'],
      default: 'ACTIVE',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for public profile discovery queries
profileSchema.index({ visibility: 1, status: 1, createdAt: -1 });

export const Profile = mongoose.model('Profile', profileSchema);
