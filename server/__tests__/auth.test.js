const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Create a mock app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', require('../routes/authRoutes'));

// Mocking the database connection since we don't need it for validation tests
jest.mock('../config/db', () => jest.fn());
jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

describe('Auth Validation & NoSQL Injection Protection', () => {
  describe('POST /api/auth/login', () => {
    it('should block NoSQL injection in email field', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: { "$gt": "" },
          password: "password123"
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      const emailError = response.body.errors.find(err => err.param === 'email');
      expect(emailError.msg).toBe('Email must be a string');
    });

    it('should block NoSQL injection in password field', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: "test@example.com",
          password: { "$ne": null }
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      const passwordError = response.body.errors.find(err => err.param === 'password');
      expect(passwordError.msg).toBe('Password must be a string');
    });

    it('should block invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: "not-an-email",
          password: "password123"
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      const emailError = response.body.errors.find(err => err.param === 'email');
      expect(emailError.msg).toBe('Please provide a valid email address');
    });
  });

  describe('POST /api/auth/register', () => {
    it('should block NoSQL injection in username field', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: { "$ne": null },
          email: "new@example.com",
          password: "password123"
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      const usernameError = response.body.errors.find(err => err.param === 'username');
      expect(usernameError.msg).toBe('Username must be a string');
    });
  });
});
