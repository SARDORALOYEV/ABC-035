require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { testConnection } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route'lar
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const crudRoutes = require('./routes/crudRoutes');

// Supabase'ga ulanish
testConnection();

const app = express();

// ===== MIDDLEWARE TARTIBI =====

// CORS — faqat CLIENT_URL'ga ruxsat
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// HTTP header xavfsizligi
app.use(helmet());

// HTTP so'rovlarni loglash (development rejimida)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// JSON body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting — auth va orders uchun
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 20,
  message: { success: false, message: 'Juda ko\'p urinish. 15 daqiqadan keyin qayta urinib ko\'ring' },
  standardHeaders: true,
  legacyHeaders: false,
});

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 soat
  max: 10,
  message: { success: false, message: 'Juda ko\'p so\'rov. 1 soatdan keyin qayta urinib ko\'ring' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ===== ROUTE'LAR =====
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderLimiter, orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/crud', crudRoutes);
// Sog'liqni tekshirish endpoint'i
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ABC Auto API ishlayapti', timestamp: new Date() });
});

// 404 va xato middleware'lari (eng oxirida bo'lishi shart)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi (${process.env.NODE_ENV || 'development'} rejimida)`);
});
