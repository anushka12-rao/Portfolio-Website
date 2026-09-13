import request from 'supertest';
import app from '../app.js';
import { connectDB, disconnectDB, isDBConnected } from '../config/database.js';
import { config } from '../config/environment.js';

let adminCookie = null;

const tests = [
  {
    name: 'GET /api/health returns 200 and healthy status',
    fn: async () => {
      const res = await request(app).get('/api/health');
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.status !== 'healthy') throw new Error(`Expected healthy status`);
    }
  },
  {
    name: 'GET /api/profile returns 200 with location property',
    fn: async () => {
      const res = await request(app).get('/api/profile');
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!res.body.data || typeof res.body.data.location === 'undefined') {
        throw new Error(`Expected profile to have location property`);
      }
    }
  },
  {
    name: 'GET /api/projects returns 200 with published project array',
    fn: async () => {
      const res = await request(app).get('/api/projects');
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!Array.isArray(res.body.data)) throw new Error('Expected data to be an array of projects');
    }
  },
  {
    name: 'GET /api/technologies returns 200 with technology items',
    fn: async () => {
      const res = await request(app).get('/api/technologies');
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!Array.isArray(res.body.data)) throw new Error('Expected data to be an array of technologies');
    }
  },
  {
    name: 'GET /api/achievements returns 200 with achievement items',
    fn: async () => {
      const res = await request(app).get('/api/achievements');
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!Array.isArray(res.body.data)) throw new Error('Expected data to be an array of achievements');
    }
  },
  {
    name: 'Security: GET /api/admin/projects without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/projects');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'Security: GET /api/admin/messages without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/messages');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'Security: GET /api/admin/technologies without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/technologies');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'Security: GET /api/admin/achievements without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/achievements');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'Security: PATCH /api/admin/profile without auth returns 401',
    fn: async () => {
      const res = await request(app).patch('/api/admin/profile').send({ name: 'Hacker' });
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'Validation: POST /api/messages with invalid email/message returns 400 with Zod details',
    fn: async () => {
      const res = await request(app).post('/api/messages').send({
        name: '',
        email: 'invalid-email',
        message: 'short'
      });
      if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
      if (!Array.isArray(res.body.details)) throw new Error('Expected details array');
    }
  },
  {
    name: 'Validation: POST /api/auth/login with missing password returns 400 validation error',
    fn: async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'admin@portfolio.local'
      });
      if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    }
  },
  {
    name: 'Auth & Session: POST /api/auth/login with valid admin credentials returns 200 and session cookie',
    fn: async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: config.adminEmail,
        password: config.adminPassword
      });
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
      if (!res.body.user || res.body.user.email !== config.adminEmail) {
        throw new Error(`Expected user email to match ${config.adminEmail}`);
      }
      adminCookie = res.headers['set-cookie'];
      if (!adminCookie) throw new Error('Expected session cookie in set-cookie header');
    }
  },
  {
    name: 'Authorized Admin Access: GET /api/admin/projects with session cookie returns 200',
    fn: async () => {
      if (!adminCookie) throw new Error('Admin cookie not available from login test');
      const res = await request(app).get('/api/admin/projects').set('Cookie', adminCookie);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (!Array.isArray(res.body.data)) throw new Error('Expected data array of projects');
    }
  },
  {
    name: 'Database Operations: POST /api/messages persists message and allows admin deletion',
    fn: async () => {
      const postRes = await request(app).post('/api/messages').send({
        name: 'Automated Test Runner',
        email: 'runner@example.com',
        message: 'This is an end-to-end integration test message.'
      });
      if (postRes.status !== 201) throw new Error(`Expected 201, got ${postRes.status}`);
      const createdId = postRes.body.id;
      if (!createdId) throw new Error('Expected created message ID in response');

      if (adminCookie) {
        const delRes = await request(app).delete(`/api/admin/messages/${createdId}`).set('Cookie', adminCookie);
        if (delRes.status !== 200) throw new Error(`Expected 200 on cleanup, got ${delRes.status}`);
      }
    }
  },
  {
    name: '404 Handler: GET /api/nonexistent-route returns 404',
    fn: async () => {
      const res = await request(app).get('/api/nonexistent-route');
      if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
    }
  }
];

async function run() {
  console.log('\n======================================================');
  console.log('   Portfolio CMS End-to-End API & Database Test Suite');
  console.log('======================================================\n');

  try {
    await connectDB();
  } catch (err) {
    console.warn('MongoDB connection attempt error:', err.message);
  }

  const dbState = isDBConnected() ? 'Connected to MongoDB' : 'DevStore Fallback Mode';
  console.log(`Database Status: [${dbState}]\n`);

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      await test.fn();
      console.log(`  [PASS] ${test.name}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${test.name}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${tests.length} tests\n`);

  try {
    await disconnectDB();
  } catch (err) {
    // Ignore disconnect errors
  }

  if (failed > 0) process.exit(1);
  process.exit(0);
}

run();
