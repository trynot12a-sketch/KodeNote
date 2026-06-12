const request = require('supertest'), express = require('express'), authRoutes = require('./routes/authRoutes')
const app = express()
app.use(express.json()); app.use('/api/auth', authRoutes)

describe('Security', () => {
  it('rejects NoSQL injection in login', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: { "$gt": "" }, password: "123" })
    expect(res.status).toBe(400)
  })
  it('rejects invalid email in register', async () => {
    const res = await request(app).post('/api/auth/register').send({ username: "u", email: "bad", password: "123" })
    expect(res.status).toBe(400)
  })
})
