import mongoose from 'mongoose';

export const ConnectionStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  BLOCKED: 'BLOCKED',
};

const connectionSchema = new mongoose.Schema(
  {
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(ConnectionStatus),
      default: ConnectionStatus.PENDING,
      index: true,
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for optimal query speeds
connectionSchema.index({ requesterId: 1, recipientId: 1 });
connectionSchema.index({ recipientId: 1, status: 1 });
connectionSchema.index({ requesterId: 1, status: 1 });

export const Connection = mongoose.model('Connection', connectionSchema);
