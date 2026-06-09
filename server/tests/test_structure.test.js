const request = require('supertest')
const app = require('../app')
const User = require('../models/User')
const Snippet = require('../models/Snippet')

// Mocking models and services
jest.mock('../models/User')
jest.mock('../models/Snippet')
jest.mock('../config/db', () => jest.fn())

describe('Snippet API Structure', () => {
  it('should export the app', () => {
    expect(app).toBeDefined()
  })
})
