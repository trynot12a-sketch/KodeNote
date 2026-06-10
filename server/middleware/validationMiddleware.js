const { check, validationResult } = require('express-validator')

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const validateRegister = [
  check('username', 'Username is required').trim().notEmpty().isString(),
  check('email', 'Please include a valid email').trim().isEmail().normalizeEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  handleValidationErrors
]

const validateLogin = [
  check('email', 'Please include a valid email').trim().isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
  handleValidationErrors
]

module.exports = {
  validateRegister,
  validateLogin
}
