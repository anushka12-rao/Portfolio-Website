import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Message body is required'],
      trim: true
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

messageSchema.index({ read: 1, createdAt: -1 });

export const Message = mongoose.model('Message', messageSchema);
