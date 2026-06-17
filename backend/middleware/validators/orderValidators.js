const { body, validationResult } = require('express-validator');

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

const orderRules = [
  body('car').notEmpty().withMessage('Avtomobil ID si kiritilishi shart'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('To\'liq ism kiritilishi shart')
    .isLength({ max: 100 })
    .withMessage('Ism 100 belgidan oshmasligi kerak'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Telefon raqam kiritilishi shart')
    .matches(/^\+?[0-9]{9,15}$/)
    .withMessage('Telefon raqam formati noto\'g\'ri (masalan: +998901234567)'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Xabar 500 belgidan oshmasligi kerak'),
];

const statusRules = [
  body('status')
    .isIn(['yangi', 'korib_chiqilmoqda', 'yakunlangan', 'bekor_qilingan'])
    .withMessage('Status noto\'g\'ri'),
];

module.exports = { validate, orderRules, statusRules };
