import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    date: {
      type: String,
      default: '',
      trim: true
    },
    certificateUrl: {
      type: String,
      default: '',
      trim: true
    },
    image: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

achievementSchema.index({ visible: 1, order: 1 });

export const Achievement = mongoose.model('Achievement', achievementSchema);
