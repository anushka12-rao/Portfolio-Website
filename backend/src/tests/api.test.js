import request from 'supertest';
import app from '../app.js';

describe('Portfolio CMS API Test Suite', () => {
  // 1. Health check
  it('GET /api/health returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (res.body.status !== 'healthy') throw new Error(`Expected healthy status`);
  });

  // 2. Security: Unauthenticated access to admin routes must return 401
  it('GET /api/admin/projects without auth returns 401', async () => {
    const res = await request(app).get('/api/admin/projects');
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  it('GET /api/admin/messages without auth returns 401', async () => {
    const res = await request(app).get('/api/admin/messages');
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  it('GET /api/admin/technologies without auth returns 401', async () => {
    const res = await request(app).get('/api/admin/technologies');
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  it('GET /api/admin/achievements without auth returns 401', async () => {
    const res = await request(app).get('/api/admin/achievements');
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  it('PATCH /api/admin/profile without auth returns 401', async () => {
    const res = await request(app).patch('/api/admin/profile').send({ name: 'Hacker' });
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  // 3. Validation: Zod validation on POST /api/messages
  it('POST /api/messages with invalid payload returns 400 with details', async () => {
    const res = await request(app).post('/api/messages').send({
      name: '',
      email: 'not-an-email',
      message: 'short'
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (!res.body.details) throw new Error(`Expected details array in error response`);
  });

  // 4. Auth validation: Zod validation on POST /api/auth/login
  it('POST /api/auth/login with missing fields returns 400', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'not-an-email'
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
  });

  // 5. 404 Route handling
  it('GET /api/nonexistent-route returns 404 with error message', async () => {
    const res = await request(app).get('/api/nonexistent-route');
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
  });
});

console.log('Test definitions loaded successfully.');
