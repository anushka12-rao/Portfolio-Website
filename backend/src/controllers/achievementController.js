import { Achievement } from '../models/Achievement.js';
import { uploadImage } from '../services/imageService.js';
import { isDBConnected } from '../config/database.js';
import { devStore } from '../utils/devStore.js';

export const getPublicAchievements = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const achievements = await Achievement.find({ visible: true })
        .sort({ order: 1, createdAt: -1 })
        .lean();
      return res.json({ data: achievements });
    }
    const publicList = devStore.achievements
      .filter((a) => a.visible)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ data: publicList });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminAchievements = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const achievements = await Achievement.find()
        .sort({ order: 1, createdAt: -1 })
        .lean();
      return res.json({ data: achievements });
    }
    const all = [...devStore.achievements].sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ data: all });
  } catch (error) {
    next(error);
  }
};

export const createAchievement = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const achievement = await Achievement.create(req.body);
      return res.status(201).json({ message: 'Achievement created successfully', data: achievement });
    }
    const newAch = {
      _id: `ach_${Date.now()}`,
      ...req.body
    };
    devStore.achievements.push(newAch);
    res.status(201).json({ message: 'Achievement created successfully', data: newAch });
  } catch (error) {
    next(error);
  }
};

export const updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const achievement = await Achievement.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      if (!achievement) return res.status(404).json({ error: 'Achievement not found.' });
      return res.json({ message: 'Achievement updated successfully', data: achievement });
    }

    const index = devStore.achievements.findIndex((a) => a._id === id);
    if (index === -1) return res.status(404).json({ error: 'Achievement not found.' });
    devStore.achievements[index] = { ...devStore.achievements[index], ...req.body };
    res.json({ message: 'Achievement updated successfully', data: devStore.achievements[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const achievement = await Achievement.findByIdAndDelete(id);
      if (!achievement) return res.status(404).json({ error: 'Achievement not found.' });
      return res.json({ message: 'Achievement deleted successfully' });
    }

    const index = devStore.achievements.findIndex((a) => a._id === id);
    if (index === -1) return res.status(404).json({ error: 'Achievement not found.' });
    devStore.achievements.splice(index, 1);
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const uploadAchievementImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded.' });
    }
    const imageUrl = await uploadImage(req.file, req);
    res.json({ message: 'Image uploaded successfully', url: imageUrl });
  } catch (error) {
    next(error);
  }
};
