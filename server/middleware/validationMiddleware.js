const { body, validationResult } = require('express-validator');

// Reusable middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for registration
const registerValidation = [
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .escape(),
  body('email')
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),
    // Note: .normalizeEmail() is avoided to prevent potential login issues
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validate
];

// Validation rules for login
const loginValidation = [
  body('email')
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password is required'),
  validate
];

module.exports = {
  registerValidation,
  loginValidation
};
