import { Profile } from '../models/Profile.js';
import { Project } from '../models/Project.js';
import { Technology } from '../models/Technology.js';
import { Achievement } from '../models/Achievement.js';
import { Message } from '../models/Message.js';

export const getPublicProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne().lean();
    if (!profile) {
      profile = {
        name: 'Alex Morgan',
        headline: 'Full-Stack Software Engineer & Distributed Systems Architect',
        bio: 'Passionate engineer experienced in building robust distributed systems and modern web applications.',
        email: 'alex.morgan@example.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        resumeUrl: '#'
      };
    }
    res.json({ data: profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, req.body);
      await profile.save();
    } else {
      profile = await Profile.create(req.body);
    }
    res.json({ message: 'Profile updated successfully', data: profile });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      totalTechnologies,
      totalAchievements,
      totalMessages,
      unreadMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Technology.countDocuments(),
      Achievement.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false })
    ]);

    res.json({
      stats: {
        totalProjects,
        publishedProjects,
        draftProjects: totalProjects - publishedProjects,
        totalTechnologies,
        totalAchievements,
        totalMessages,
        unreadMessages
      }
    });
  } catch (error) {
    next(error);
  }
};
