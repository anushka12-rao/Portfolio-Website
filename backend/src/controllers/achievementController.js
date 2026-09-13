import { Achievement } from '../models/Achievement.js';
import { uploadImage } from '../services/imageService.js';

export const getPublicAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find({ visible: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json({ data: achievements });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json({ data: achievements });
  } catch (error) {
    next(error);
  }
};

export const createAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json({ message: 'Achievement created successfully', data: achievement });
  } catch (error) {
    next(error);
  }
};

export const updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found.' });
    }

    res.json({ message: 'Achievement updated successfully', data: achievement });
  } catch (error) {
    next(error);
  }
};

export const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByIdAndDelete(id);

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found.' });
    }

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
