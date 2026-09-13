import request from 'supertest';
import app from '../app.js';

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
    name: 'GET /api/admin/projects without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/projects');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'GET /api/admin/messages without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/messages');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'GET /api/admin/technologies without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/technologies');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'GET /api/admin/achievements without auth returns 401',
    fn: async () => {
      const res = await request(app).get('/api/admin/achievements');
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'PATCH /api/admin/profile without auth returns 401',
    fn: async () => {
      const res = await request(app).patch('/api/admin/profile').send({ name: 'Hacker' });
      if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    }
  },
  {
    name: 'POST /api/messages with invalid email/message returns 400 with Zod details',
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
    name: 'POST /api/auth/login with missing password returns 400 validation error',
    fn: async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'admin@portfolio.local'
      });
      if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    }
  },
  {
    name: 'GET /api/nonexistent-route returns 404',
    fn: async () => {
      const res = await request(app).get('/api/nonexistent-route');
      if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
    }
  }
];

async function run() {
  console.log('\n--- Running Portfolio CMS Security & API Tests ---\n');
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
  if (failed > 0) process.exit(1);
  process.exit(0);
}

run();
