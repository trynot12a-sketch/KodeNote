const express = require('express'), router = express.Router(), { body } = require('express-validator')
const { registerUser, loginUser } = require('../controllers/authController'), { validate } = require('../middleware/validationMiddleware')

const authValid = [body('email').isEmail().withMessage('Valid email required'), body('password').isString().notEmpty(), validate]

router.post('/register', [body('username').isString().notEmpty(), ...authValid], registerUser)
router.post('/login', authValid, loginUser)

module.exports = router
