import { Technology } from '../models/Technology.js';
import { isDBConnected } from '../config/database.js';
import { devStore } from '../utils/devStore.js';

export const getPublicTechnologies = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const technologies = await Technology.find({ visible: true })
        .sort({ order: 1, createdAt: 1 })
        .lean();
      return res.json({ data: technologies });
    }
    const publicList = devStore.technologies
      .filter((t) => t.visible)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ data: publicList });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminTechnologies = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const technologies = await Technology.find()
        .sort({ order: 1, createdAt: 1 })
        .lean();
      return res.json({ data: technologies });
    }
    const all = [...devStore.technologies].sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ data: all });
  } catch (error) {
    next(error);
  }
};

export const createTechnology = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const technology = await Technology.create(req.body);
      return res.status(201).json({ message: 'Technology created successfully', data: technology });
    }
    const newTech = {
      _id: `tech_${Date.now()}`,
      ...req.body
    };
    devStore.technologies.push(newTech);
    res.status(201).json({ message: 'Technology created successfully', data: newTech });
  } catch (error) {
    next(error);
  }
};

export const updateTechnology = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const technology = await Technology.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      if (!technology) return res.status(404).json({ error: 'Technology not found.' });
      return res.json({ message: 'Technology updated successfully', data: technology });
    }

    const index = devStore.technologies.findIndex((t) => t._id === id);
    if (index === -1) return res.status(404).json({ error: 'Technology not found.' });
    devStore.technologies[index] = { ...devStore.technologies[index], ...req.body };
    res.json({ message: 'Technology updated successfully', data: devStore.technologies[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteTechnology = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const technology = await Technology.findByIdAndDelete(id);
      if (!technology) return res.status(404).json({ error: 'Technology not found.' });
      return res.json({ message: 'Technology deleted successfully' });
    }

    const index = devStore.technologies.findIndex((t) => t._id === id);
    if (index === -1) return res.status(404).json({ error: 'Technology not found.' });
    devStore.technologies.splice(index, 1);
    res.json({ message: 'Technology deleted successfully' });
  } catch (error) {
    next(error);
  }
};
