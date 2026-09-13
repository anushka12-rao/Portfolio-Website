import { Profile } from '../models/Profile.js';
import { Project } from '../models/Project.js';
import { Technology } from '../models/Technology.js';
import { Achievement } from '../models/Achievement.js';
import { Message } from '../models/Message.js';
import { isDBConnected } from '../config/database.js';
import { devStore } from '../utils/devStore.js';

export const getPublicProfile = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      let profile = await Profile.findOne().lean();
      if (!profile) profile = devStore.profile;
      return res.json({ data: profile });
    }
    res.json({ data: devStore.profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      let profile = await Profile.findOne();
      if (profile) {
        Object.assign(profile, req.body);
        await profile.save();
      } else {
        profile = await Profile.create(req.body);
      }
      return res.json({ message: 'Profile updated successfully', data: profile });
    }

    devStore.profile = { ...devStore.profile, ...req.body };
    res.json({ message: 'Profile updated successfully', data: devStore.profile });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    if (isDBConnected()) {
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

      return res.json({
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
    }

    // DevStore stats
    const totalProjects = devStore.projects.length;
    const publishedProjects = devStore.projects.filter((p) => p.published).length;
    const totalTechnologies = devStore.technologies.length;
    const totalAchievements = devStore.achievements.length;
    const totalMessages = devStore.messages.length;
    const unreadMessages = devStore.messages.filter((m) => !m.read).length;

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
