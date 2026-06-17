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

const carRules = [
  body('title').trim().notEmpty().withMessage('Avtomobil nomi kiritilishi shart'),
  body('brand').trim().notEmpty().withMessage('Brend kiritilishi shart'),
  body('model').trim().notEmpty().withMessage('Model kiritilishi shart'),
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Noto\'g\'ri yil kiritildi'),
  body('price').isFloat({ min: 0 }).withMessage('Narx to\'g\'ri kiritilishi shart'),
  body('fuelType')
    .isIn(['benzin', 'dizel', 'gaz', 'elektr', 'gibrid'])
    .withMessage('Yoqilg\'i turi noto\'g\'ri'),
  body('transmission')
    .isIn(['mexanika', 'avtomat', 'yarim-avtomat'])
    .withMessage('Uzatmalar qutisi turi noto\'g\'ri'),
  body('bodyType')
    .isIn(['sedan', 'suv', 'hatchback', 'minivan', 'pikap', 'kupe', 'kabriolet', 'universal', 'boshqa'])
    .withMessage('Kuzov turi noto\'g\'ri'),
  body('category').notEmpty().withMessage('Kategoriya tanlanishi shart'),
];

module.exports = { validate, carRules };
