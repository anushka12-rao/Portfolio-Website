import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    technologies: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    published: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Index for fast public queries
projectSchema.index({ published: 1, order: 1, createdAt: -1 });

export const Project = mongoose.model('Project', projectSchema);
