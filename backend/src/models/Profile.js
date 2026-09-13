import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    headline: {
      type: String,
      default: '',
      trim: true
    },
    bio: {
      type: String,
      default: '',
      trim: true
    },
    location: {
      type: String,
      default: 'San Francisco, CA / Remote',
      trim: true
    },
    email: {
      type: String,
      default: '',
      trim: true
    },
    github: {
      type: String,
      default: '',
      trim: true
    },
    linkedin: {
      type: String,
      default: '',
      trim: true
    },
    resumeUrl: {
      type: String,
      default: '',
      trim: true
    }
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);
