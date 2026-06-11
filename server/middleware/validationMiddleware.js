const { body, validationResult } = require('express-validator')

/**
 * Sentinel: Input validation middleware to prevent NoSQL injection
 * and ensure data integrity.
 */
const handleErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

exports.validateRegister = [
  body('username').trim().notEmpty().isString(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  handleErrors
]

exports.validateLogin = [
  // Sentinel: Ensure input is a valid string/format to block NoSQL injection objects
  body('email').isEmail(),
  body('password').isString().notEmpty(),
  handleErrors
]
