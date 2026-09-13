import { Project } from '../models/Project.js';
import { generateSlug } from '../services/projectService.js';
import { uploadImage } from '../services/imageService.js';

export const getPublicProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug, published: true }).lean();

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json({ data: project });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug) {
      let slug = generateSlug(data.title);
      // Ensure unique slug
      const existing = await Project.findOne({ slug });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
      data.slug = slug;
    }

    const project = await Project.create(data);
    res.status(201).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.title && !data.slug) {
      // Don't auto mutate slug on title edit unless specifically provided
    }

    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json({ message: 'Project updated successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const uploadProjectImage = async (req, res, next) => {
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
