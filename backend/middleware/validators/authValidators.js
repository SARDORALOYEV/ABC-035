const { body, validationResult } = require('express-validator');

// Validatsiya xatolarini tekshirish
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

const registerRules = [
  body('name').trim().notEmpty().withMessage('Ism kiritilishi shart'),
  body('email').isEmail().withMessage('Email formati noto\'g\'ri'),
  body('password').isLength({ min: 6 }).withMessage('Parol kamida 6 belgi bo\'lishi kerak'),
];

const loginRules = [
  body('email').isEmail().withMessage('Email formati noto\'g\'ri'),
  body('password').notEmpty().withMessage('Parol kiritilishi shart'),
];

module.exports = { validate, registerRules, loginRules };
