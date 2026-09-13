import { Project } from '../models/Project.js';
import { generateSlug } from '../services/projectService.js';
import { uploadImage } from '../services/imageService.js';
import { isDBConnected } from '../config/database.js';
import { devStore } from '../utils/devStore.js';

export const getPublicProjects = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const projects = await Project.find({ published: true })
        .sort({ order: 1, createdAt: -1 })
        .lean();
      return res.json({ data: projects });
    }
    const publicList = devStore.projects
      .filter((p) => p.published)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ data: publicList });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (isDBConnected()) {
      const project = await Project.findOne({ slug, published: true }).lean();
      if (!project) return res.status(404).json({ error: 'Project not found.' });
      return res.json({ data: project });
    }
    const project = devStore.projects.find((p) => p.slug === slug && p.published);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json({ data: project });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminProjects = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const projects = await Project.find()
        .sort({ order: 1, createdAt: -1 })
        .lean();
      return res.json({ data: projects });
    }
    const all = [...devStore.projects].sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ data: all });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }

    if (isDBConnected()) {
      const existing = await Project.findOne({ slug: data.slug });
      if (existing) {
        data.slug = `${data.slug}-${Date.now()}`;
      }
      const project = await Project.create(data);
      return res.status(201).json({ message: 'Project created successfully', data: project });
    }

    // DevStore
    const newProj = {
      _id: `proj_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    devStore.projects.push(newProj);
    res.status(201).json({ message: 'Project created successfully', data: newProj });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (isDBConnected()) {
      const project = await Project.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      });
      if (!project) return res.status(404).json({ error: 'Project not found.' });
      return res.json({ message: 'Project updated successfully', data: project });
    }

    // DevStore
    const index = devStore.projects.findIndex((p) => p._id === id);
    if (index === -1) return res.status(404).json({ error: 'Project not found.' });
    devStore.projects[index] = { ...devStore.projects[index], ...data };
    res.json({ message: 'Project updated successfully', data: devStore.projects[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const project = await Project.findByIdAndDelete(id);
      if (!project) return res.status(404).json({ error: 'Project not found.' });
      return res.json({ message: 'Project deleted successfully' });
    }

    const index = devStore.projects.findIndex((p) => p._id === id);
    if (index === -1) return res.status(404).json({ error: 'Project not found.' });
    devStore.projects.splice(index, 1);
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
