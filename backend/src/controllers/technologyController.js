import { Technology } from '../models/Technology.js';

export const getPublicTechnologies = async (req, res, next) => {
  try {
    const technologies = await Technology.find({ visible: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    res.json({ data: technologies });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminTechnologies = async (req, res, next) => {
  try {
    const technologies = await Technology.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();
    res.json({ data: technologies });
  } catch (error) {
    next(error);
  }
};

export const createTechnology = async (req, res, next) => {
  try {
    const technology = await Technology.create(req.body);
    res.status(201).json({ message: 'Technology created successfully', data: technology });
  } catch (error) {
    next(error);
  }
};

export const updateTechnology = async (req, res, next) => {
  try {
    const { id } = req.params;
    const technology = await Technology.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!technology) {
      return res.status(404).json({ error: 'Technology not found.' });
    }

    res.json({ message: 'Technology updated successfully', data: technology });
  } catch (error) {
    next(error);
  }
};

export const deleteTechnology = async (req, res, next) => {
  try {
    const { id } = req.params;
    const technology = await Technology.findByIdAndDelete(id);

    if (!technology) {
      return res.status(404).json({ error: 'Technology not found.' });
    }

    res.json({ message: 'Technology deleted successfully' });
  } catch (error) {
    next(error);
  }
};
