import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { config } from '../config/environment.js';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { Technology } from '../models/Technology.js';
import { Achievement } from '../models/Achievement.js';
import { Profile } from '../models/Profile.js';
import { hashPassword } from '../services/authService.js';
import { logger } from '../utils/logger.js';

const seed = async () => {
  try {
    logger.info(`Connecting to MongoDB: ${config.mongodbUri}`);
    await mongoose.connect(config.mongodbUri);

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ email: config.adminEmail.toLowerCase() });
    if (!existingAdmin) {
      const passwordHash = await hashPassword(config.adminPassword);
      await User.create({
        email: config.adminEmail.toLowerCase(),
        passwordHash,
        role: 'admin'
      });
      logger.info(`Admin user created: ${config.adminEmail}`);
    } else {
      logger.info(`Admin user already exists: ${config.adminEmail}`);
    }

    // 2. Seed Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: 'Alex Morgan',
        headline: 'Full-Stack Software Engineer & Distributed Systems Architect',
        bio: 'Passionate engineer with 6+ years of experience engineering high-performance web applications, robust cloud microservices, and elegant developer platforms. Dedicated to writing clean, maintainable code and building delightful user experiences.',
        email: 'alex.morgan@example.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        resumeUrl: 'https://example.com/resume.pdf'
      });
      logger.info('Default profile seeded.');
    }

    // 3. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'CloudScale Analytics Engine',
          slug: 'cloudscale-analytics-engine',
          description: 'A real-time telemetry and streaming analytics platform capable of processing over 100,000 events/sec with sub-second dashboard visualization.',
          technologies: ['React', 'TypeScript', 'Node.js', 'Kafka', 'ClickHouse', 'Tailwind CSS'],
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          githubUrl: 'https://github.com/example/cloudscale',
          liveUrl: 'https://example.com/demo',
          featured: true,
          order: 1,
          published: true
        },
        {
          title: 'DevPulse - Workflow Orchestrator',
          slug: 'devpulse-workflow-orchestrator',
          description: 'An open-source developer tool for automated CI/CD pipeline orchestration, canary deployments, and zero-downtime microservice rollouts.',
          technologies: ['React', 'Express.js', 'Docker', 'Kubernetes', 'MongoDB', 'Redis'],
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
          githubUrl: 'https://github.com/example/devpulse',
          liveUrl: 'https://example.com/devpulse',
          featured: true,
          order: 2,
          published: true
        },
        {
          title: 'CryptoVault Institutional Gateway',
          slug: 'cryptovault-gateway',
          description: 'High-security multi-party computation (MPC) cryptocurrency custodial wallet portal with biometric authentication and audit tracing.',
          technologies: ['React', 'Node.js', 'Web3', 'PostgreSQL', 'Tailwind CSS'],
          image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
          githubUrl: 'https://github.com/example/cryptovault',
          liveUrl: 'https://example.com/vault',
          featured: true,
          order: 3,
          published: true
        },
        {
          title: 'Internal Admin Engine (Draft)',
          slug: 'internal-admin-engine-draft',
          description: 'Draft internal tooling project not yet visible to the public.',
          technologies: ['Express', 'MongoDB'],
          featured: false,
          order: 4,
          published: false
        }
      ]);
      logger.info('Initial projects seeded (including 1 draft).');
    }

    // 4. Seed Technologies
    const techCount = await Technology.countDocuments();
    if (techCount === 0) {
      await Technology.insertMany([
        { name: 'JavaScript (ES2024+)', category: 'Languages', icon: 'Code2', order: 1, visible: true },
        { name: 'TypeScript', category: 'Languages', icon: 'FileCode', order: 2, visible: true },
        { name: 'Python', category: 'Languages', icon: 'Terminal', order: 3, visible: true },
        { name: 'SQL & Go', category: 'Languages', icon: 'Cpu', order: 4, visible: true },
        { name: 'React.js', category: 'Frontend', icon: 'Atom', order: 5, visible: true },
        { name: 'Vite & Next.js', category: 'Frontend', icon: 'Layers', order: 6, visible: true },
        { name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', order: 7, visible: true },
        { name: 'Framer Motion', category: 'Frontend', icon: 'Sparkles', order: 8, visible: true },
        { name: 'Node.js & Express', category: 'Backend', icon: 'Server', order: 9, visible: true },
        { name: 'MongoDB & Mongoose', category: 'Backend', icon: 'Database', order: 10, visible: true },
        { name: 'PostgreSQL & Prisma', category: 'Backend', icon: 'Boxes', order: 11, visible: true },
        { name: 'REST & GraphQL APIs', category: 'Backend', icon: 'Network', order: 12, visible: true },
        { name: 'Docker & Kubernetes', category: 'Tools', icon: 'Box', order: 13, visible: true },
        { name: 'AWS Cloud & Cloudflare', category: 'Tools', icon: 'Cloud', order: 14, visible: true },
        { name: 'Git & GitHub Actions', category: 'Tools', icon: 'GitBranch', order: 15, visible: true },
        { name: 'Jest, Vitest & Cypress', category: 'Tools', icon: 'CheckCircle', order: 16, visible: true }
      ]);
      logger.info('Initial technologies seeded.');
    }

    // 5. Seed Achievements
    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      await Achievement.insertMany([
        {
          title: 'AWS Certified Solutions Architect – Associate',
          organization: 'Amazon Web Services',
          description: 'Demonstrated advanced knowledge in architecting secure, resilient, high-performing, and cost-optimized cloud architectures on AWS.',
          date: '2024-03',
          certificateUrl: 'https://aws.amazon.com/certification/',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
          order: 1,
          visible: true
        },
        {
          title: '1st Place Winner - Global FinTech Hackathon',
          organization: 'FinTech Disrupt Summit',
          description: 'Built an autonomous real-time fraud detection gateway leveraging streaming graph neural networks across 50,000 simulated accounts.',
          date: '2023-09',
          certificateUrl: 'https://example.com/certificate/fintech',
          image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
          order: 2,
          visible: true
        }
      ]);
      logger.info('Initial achievements seeded.');
    }

    logger.info('Database seeding completed successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error('Error during seeding:', error);
    process.exit(1);
  }
};

seed();
