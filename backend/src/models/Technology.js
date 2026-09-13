import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Technology name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Languages', 'Frontend', 'Backend', 'Tools'],
      default: 'Languages'
    },
    icon: {
      type: String,
      default: 'Code2',
      trim: true
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

technologySchema.index({ visible: 1, category: 1, order: 1 });

export const Technology = mongoose.model('Technology', technologySchema);
