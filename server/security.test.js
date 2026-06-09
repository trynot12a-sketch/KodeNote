
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = 'testsecret';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Security', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword
    });
  });

  it('should not allow login with NoSQL injection (Auth Bypass)', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: { '$ne': 'wrong@example.com' },
        password: 'password123'
      });

    // Now blocked by express-validator, which returns 400
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Please include a valid email');
  });

  it('should allow legitimate login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('testuser');
    expect(response.body.token).toBeDefined();
  });
});
