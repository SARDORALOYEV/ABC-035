# ABC Auto — MongoDB dan Supabase ga o'tish uchun TO'LIQ QO'LLANMA

Bu fayl Gemini AI ga berish uchun. Gemini shu fayl bo'yicha sizga to'liq yordam beradi.

---

## 1. LOYIXA STRUKTURASI (backend/ papkasidagi barcha fayllar)

```
backend/
├── .env                          # ✅ TAYYOR (o'zgartirilgan)
├── .env.example                  # ✅ TAYYOR (o'zgartirilgan)
├── package.json                  # ⚠️ mongoose ni olib tashlash kerak
├── server.js                     # ❌ O'ZGARTIRISH KERAK (connectDB -> supabase)
│
├── config/
│   ├── db.js                     # ❌ QAYTA YOZISH KERAK (mongoose -> supabase)
│   └── supabase.js               # ✅ TAYYOR (o'zgarmaydi)
│
├── models/                       # ❌ BUTUNLAY O'CHIRILADI (Mongoose kerak emas)
│   ├── User.js                   # ❌ O'CHIRILADI
│   ├── Car.js                    # ❌ O'CHIRILADI
│   ├── Category.js               # ❌ O'CHIRILADI
│   └── Order.js                  # ❌ O'CHIRILADI
│
├── controllers/                  # ❌ HAMMASI QAYTA YOZILADI
│   ├── authController.js         # ❌ QAYTA YOZISH KERAK
│   ├── carController.js          # ❌ QAYTA YOZISH KERAK
│   ├── categoryController.js     # ❌ QAYTA YOZISH KERAK
│   └── orderController.js        # ❌ QAYTA YOZISH KERAK
│
├── routes/                       # ✅ TAYYOR (o'zgarmaydi)
│   ├── authRoutes.js             # ✅ O'ZGARMAYDI
│   ├── carRoutes.js              # ✅ O'ZGARMAYDI
│   ├── categoryRoutes.js         # ✅ O'ZGARMAYDI
│   └── orderRoutes.js            # ✅ O'ZGARMAYDI
│
├── middleware/                    # ✅ AYSUCH (authMiddleware o'zgaradi)
│   ├── authMiddleware.js         # ⚠️ User.findById -> supabase
│   ├── errorMiddleware.js        # ⚠️ Mongoose error handlers olib tashlanadi
│   ├── upload.js                 # ✅ TAYYOR (o'zgarmaydi)
│   └── validators/
│       ├── authValidators.js     # ✅ TAYYOR (o'zgarmaydi)
│       ├── carValidators.js      # ✅ TAYYOR (o'zgarmaydi)
│       └── orderValidators.js    # ✅ TAYYOR (o'zgarmaydi)
│
├── utils/
│   ├── uploadImage.js            # ✅ TAYYOR (allaqachon Supabase)
│   └── deleteImage.js            # ✅ TAYYOR (allaqachon Supabase)
│
└── seed.js                       # ❌ QAYTA YOZISH KERAK
```

---

## 2. STEP 1 — SUPABASE PROJECT OCHISH (brauzerda)

1. https://supabase.com → **New project**
2. Name: `abc-auto`
3. Database password: `ABCauto2024!` (yoki o'zingizni parolingiz)
4. Region: `Singapore`
5. Pricing: **Free tier**
6. Create project bosildi
7. **1-2 daqiqa kutildi** (project tayyor bo'lishi uchun)

---

## 3. STEP 2 — API KALITLARNI OLISH (brauzerda)

Supabase dashboard da:
- **Project Settings → API** bo'limiga o'ting
- **Project URL** ni copy qiling → `SUPABASE_URL`
- **Project API keys → service_role key** ni copy qiling → `SUPABASE_SERVICE_ROLE_KEY`

---

## 4. STEP 3 — .ENV NI TO'LDIRING

Fayl: `backend/.env` — **allaqachon tayyor, faqat kalitlarni yozing**

```env
PORT=5000
JWT_SECRET=abc-auto-secret-key-2024

SUPABASE_URL=https://sizning-project-id.supabase.co      # <-- YOZING
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...         # <-- YOZING
SUPABASE_BUCKET=abc-auto

CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@abcauto.com
ADMIN_PASSWORD=admin123
```

---

## 5. STEP 4 — SQL SCHEMA (Supabase SQL Editor da ishga tushiring)

Supabase **SQL Editor** ga o'tib, **New Query** oching va PASTDAGI SQL ni RUN qiling:

```sql
-- ============================================
-- USERS jadvali
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- CATEGORIES jadvali
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  image_url TEXT DEFAULT '',
  image_path TEXT DEFAULT '',
  description VARCHAR(200),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- ============================================
-- CARS jadvali
-- ============================================
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2027),
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  currency VARCHAR(3) DEFAULT 'USD' CHECK (currency IN ('USD', 'UZS')),
  mileage INTEGER DEFAULT 0 CHECK (mileage >= 0),
  fuel_type VARCHAR(20) NOT NULL CHECK (fuel_type IN ('benzin', 'dizel', 'gaz', 'elektr', 'gibrid')),
  transmission VARCHAR(20) NOT NULL CHECK (transmission IN ('mexanika', 'avtomat', 'yarim-avtomat')),
  body_type VARCHAR(20) NOT NULL CHECK (body_type IN ('sedan', 'suv', 'hatchback', 'minivan', 'pikap', 'kupe', 'kabriolet', 'universal', 'boshqa')),
  drive_type VARCHAR(10) DEFAULT 'old' CHECK (drive_type IN ('old', 'orqa', 'tolaali')),
  engine_volume NUMERIC(4, 1),
  horse_power INTEGER CHECK (horse_power >= 0),
  color VARCHAR(30),
  condition VARCHAR(20) DEFAULT 'ishlatilgan' CHECK (condition IN ('yangi', 'ishlatilgan')),
  description TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_cars_brand ON cars(brand);
CREATE INDEX idx_cars_category ON cars(category_id);
CREATE INDEX idx_cars_is_featured ON cars(is_featured) WHERE is_featured = true;
CREATE INDEX idx_cars_is_available ON cars(is_available) WHERE is_available = true;
CREATE INDEX idx_cars_fuel_type ON cars(fuel_type);
CREATE INDEX idx_cars_body_type ON cars(body_type);
CREATE INDEX idx_cars_transmission ON cars(transmission);
CREATE INDEX idx_cars_year ON cars(year);
CREATE INDEX idx_cars_price ON cars(price);

CREATE INDEX idx_cars_search ON cars USING GIN(
  to_tsvector('simple',
    coalesce(title, '') || ' ' ||
    coalesce(brand, '') || ' ' ||
    coalesce(model, '') || ' ' ||
    coalesce(description, '')
  )
);

-- ============================================
-- ORDERS jadvali
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL CHECK (phone ~ '^\+?[0-9]{9,15}$'),
  message TEXT,
  status VARCHAR(30) DEFAULT 'yangi' CHECK (status IN ('yangi', 'korib_chiqilmoqda', 'yakunlangan', 'bekor_qilingan')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_car ON orders(car_id);

-- ============================================
-- updated_at ni avtomatik yangilash
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 6. STEP 5 — STORAGE BUCKET (Supabase Storage da)

1. Supabase **Storage** bo'limiga o'ting
2. **New bucket** → name: `abc-auto` → **Public bucket** ni belgilang
3. **Create bucket** tugmasini bosing

Keyin SQL Editor da bu SQL ni ishga tushiring (ixtiyoriy, public bucket da RLS default ochiq):

```sql
-- Storage: ruxsatlar (agar public bucket da RLS yoqilgan bo'lsa)
CREATE POLICY "Rasmlarni hamma ko'ra oladi"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'abc-auto');

CREATE POLICY "Rasmlarni admin yuklaydi"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'abc-auto');

CREATE POLICY "Rasmlarni admin o'chiradi"
ON storage.objects FOR DELETE TO public
USING (bucket_id = 'abc-auto');
```

---

## 7. STEP 6 — SEED DATA (Supabase SQL Editor da RUN qiling)

SQL Editor da **yangi query** oching va pastdagi SQL ni RUN qiling:

```sql
-- ============================================
-- ADMIN USER
-- ============================================
-- Parol: admin123 (bcrypt hash qilingan)
INSERT INTO users (name, email, password, role)
VALUES (
  'ABC Auto Admin',
  'admin@abcauto.com',
  '$2a$10$VKkJ7vQ5qGIsB3qFQXkKaeX5Vq5GIsB3qFQXkKaeX5Vq5GIsB3qFQ',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description) VALUES
  ('Sedan', 'sedan', 'Klassik sedan tipidagi avtomobillar'),
  ('SUV', 'suv', 'Sport Utility Vehicle — yo''l tanlamas avtomobillar'),
  ('Hatchback', 'hatchback', 'Shahar uchun qulay hatchback avtomobillar'),
  ('Minivan', 'minivan', 'Katta oila uchun minivan avtomobillar'),
  ('Pikap', 'pikap', 'Yuk ko''taruvchi pikap avtomobillar')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- CARS (kategoriya ID larini avtomatik oladi)
-- ============================================
DO $$
DECLARE
  sedan_id UUID;
  suv_id UUID;
BEGIN
  SELECT id INTO sedan_id FROM categories WHERE slug = 'sedan';
  SELECT id INTO suv_id FROM categories WHERE slug = 'suv';

  INSERT INTO cars (title, brand, model, year, price, currency, mileage, fuel_type, transmission, body_type, drive_type, engine_volume, horse_power, color, condition, description, images, category_id, is_featured) VALUES
  (
    'Chevrolet Malibu 2022',
    'Chevrolet', 'Malibu', 2022, 22000, 'USD', 15000, 'benzin', 'avtomat', 'sedan', 'old', 1.5, 160,
    'Oq', 'ishlatilgan',
    'Yaxshi holatdagi Chevrolet Malibu. Bir xonadon qo''lida bo''lgan.',
    '[{"url":"https://placehold.co/800x600/1a1a2e/e94560?text=Malibu","path":"placeholder/malibu"}]'::jsonb,
    sedan_id, true
  ),
  (
    'Kia Sportage 2023',
    'Kia', 'Sportage', 2023, 35000, 'USD', 5000, 'benzin', 'avtomat', 'suv', 'old', 2.0, 150,
    'Qora', 'yangi',
    'Yangi Kia Sportage 2023. Barcha zamonaviy xususiyatlar bilan jihozlangan.',
    '[{"url":"https://placehold.co/800x600/16213e/0f3460?text=Sportage","path":"placeholder/sportage"}]'::jsonb,
    suv_id, true
  ),
  (
    'Chevrolet Tracker 2022',
    'Chevrolet', 'Tracker', 2022, 18500, 'USD', 28000, 'benzin', 'avtomat', 'suv', 'old', 1.2, 130,
    'Kulrang', 'ishlatilgan',
    'Oz yurgan Chevrolet Tracker. Texnik holati a''lo.',
    '[{"url":"https://placehold.co/800x600/533483/e94560?text=Tracker","path":"placeholder/tracker"}]'::jsonb,
    suv_id, true
  ),
  (
    'Hyundai Accent 2021',
    'Hyundai', 'Accent', 2021, 14000, 'USD', 42000, 'gaz', 'mexanika', 'sedan', 'old', 1.4, 100,
    'Kumush', 'ishlatilgan',
    'Tejamkor Hyundai Accent. Gaz va benzinda ishlaydi.',
    '[{"url":"https://placehold.co/800x600/1a1a2e/e94560?text=Accent","path":"placeholder/accent"}]'::jsonb,
    sedan_id, false
  ),
  (
    'Chevrolet Cobalt 2020',
    'Chevrolet', 'Cobalt', 2020, 10500, 'USD', 65000, 'gaz', 'mexanika', 'sedan', 'old', 1.5, 106,
    'Ko''k', 'ishlatilgan',
    'Kundalik foydalanish uchun ideal Chevrolet Cobalt.',
    '[{"url":"https://placehold.co/800x600/16213e/0f3460?text=Cobalt","path":"placeholder/cobalt"}]'::jsonb,
    sedan_id, false
  );
END $$;
```

---

## 8. STEP 7 — KODNI SUPABASE GA MOSLASH (Node.js fayllar)

### 8.1. `config/db.js` — QAYTA YOZILDI (mongoose -> supabase)

**ESKI KOD (Mongoose):**
```js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB ulandi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB ulanish xatosi: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**YANGI KOD (Supabase):**
```js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const testConnection = async () => {
  try {
    const { error } = await supabase.from('users').select('id', { count: 'exact', head: true });
    if (error) throw error;
    console.log('Supabase'ga ulandi');
  } catch (error) {
    console.error(`Supabase ulanish xatosi: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { supabase, testConnection };
```

---

### 8.2. `server.js` — O'ZGARTIRILDI

**ESKI KOD:**
```js
const connectDB = require('./config/db');

// MongoDB'ga ulanish
connectDB();
```

**YANGI KOD:**
```js
const { testConnection } = require('./config/db');

// Supabase'ga ulanish
testConnection();
```

**ESKI KODDAN** Mongoose error handlerlarni olib tashlash kerak `errorMiddleware.js` da:

---

### 8.3. `middleware/errorMiddleware.js` — O'ZGARTIRILDI

**ESKI KOD:**
```js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Mongoose CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Noto\'g\'ri ID formati',
    });
  }

  // Mongoose duplicate key xatosi
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `Bu ${field} allaqachon mavjud`,
    });
  }

  // Mongoose validation xatosi
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server xatosi yuz berdi',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
```

**YANGI KOD:**
```js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Supabase xatosi
  if (err.code && err.code.startsWith('P')) {
    // PostgreSQL xatosi (P0000 va h.k.)
    return res.status(400).json({
      success: false,
      message: err.message || 'Ma\'lumotlar bazasi xatosi',
    });
  }

  // Unique constraint xatosi (PostgreSQL)
  if (err.code === '23505') {
    return res.status(400).json({
      success: false,
      message: 'Bu ma\'lumot allaqachon mavjud',
    });
  }

  // Foreign key xatosi
  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Bog\'liq ma\'lumot topilmadi',
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server xatosi yuz berdi',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
```

---

### 8.4. `middleware/authMiddleware.js` — O'ZGARTIRILDI

**ESKI KOD:**
```js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Foydalanuvchi topilmadi' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token noto\'g\'ri yoki muddati o\'tgan' });
    }
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Kirish uchun token taqdim eting' });
  }
};
```

**YANGI KOD:**
```js
const jwt = require('jsonwebtoken');
const { supabase } = require('../config/db');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, role')
        .eq('id', decoded.id)
        .single();
      
      if (error || !user) {
        return res.status(401).json({ success: false, message: 'Foydalanuvchi topilmadi' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token noto\'g\'ri yoki muddati o\'tgan' });
    }
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Kirish uchun token taqdim eting' });
  }
};
```

---

### 8.5. `controllers/authController.js` — QAYTA YOZILDI

**ESKI KOD (Mongoose):**
```js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }
    const user = await User.create({ name, email, password, role: 'admin' });
    res.status(201).json({
      success: true,
      data: {
        _id: user._id, name: user.name,
        email: user.email, role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) { next(error); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Email yoki parol noto\'g\'ri' });
    }
    res.json({
      success: true,
      data: {
        _id: user._id, name: user.name,
        email: user.email, role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) { next(error); }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    data: { _id: req.user._id, ... }
  });
};
```

**YANGI KOD (Supabase):**
```js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { supabase } = require('../config/db');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { data: exists } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (exists) {
      return res.status(400).json({ success: false, message: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: user, error } = await supabase
      .from('users')
      .insert({ name, email, password: hashedPassword, role: 'admin' })
      .select('id, name, email, role')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: {
        id: user.id, name: user.name,
        email: user.email, role: user.role,
        token: generateToken(user.id),
      },
    });
  } catch (error) { next(error); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Email yoki parol noto\'g\'ri' });
    }

    res.json({
      success: true,
      data: {
        id: user.id, name: user.name,
        email: user.email, role: user.role,
        token: generateToken(user.id),
      },
    });
  } catch (error) { next(error); }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    data: { id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role },
  });
};

module.exports = { register, login, getMe };
```

**MUHIM:** Response da `_id` o'rniga `id` ishlatiladi (MongoDB ObjectId -> UUID)

---

### 8.6. `controllers/carController.js` — QAYTA YOZILDI

**ESKI KOD (Mongoose):**
```js
const Car = require('../models/Car');
const uploadImage = require('../utils/uploadImage');
const deleteImage = require('../utils/deleteImage');

// GET /api/cars
const getCars = async (req, res, next) => {
  try {
    const { brand, category, minPrice, maxPrice, search, fuelType,
            transmission, bodyType, condition, year, page = 1, limit = 12,
            sort = '-createdAt' } = req.query;

    const filter = {};
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (category) filter.category = category;
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (bodyType) filter.bodyType = bodyType;
    if (condition) filter.condition = condition;
    if (year) filter.year = Number(year);
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) filter.$text = { $search: search };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [cars, total] = await Promise.all([
      Car.find(filter).populate('category', 'name slug').sort(sort).skip(skip).limit(limitNum),
      Car.countDocuments(filter),
    ]);

    res.json({ success: true, count: cars.length, total, page: pageNum, pages: Math.ceil(total / limitNum), data: cars });
  } catch (error) { next(error); }
};

// GET /api/cars/featured
const getFeaturedCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ isFeatured: true, isAvailable: true })
      .populate('category', 'name slug').sort('-createdAt').limit(8);
    res.json({ success: true, count: cars.length, data: cars });
  } catch (error) { next(error); }
};

// GET /api/cars/:id
const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id).populate('category', 'name slug');
    if (!car) return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    car.views += 1;
    await car.save();
    res.json({ success: true, data: car });
  } catch (error) { next(error); }
};

// POST /api/cars
const createCar = async (req, res, next) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = await Promise.all(req.files.map((file) => uploadImage(file)));
    }
    const car = await Car.create({ ...req.body, images });
    await car.populate('category', 'name slug');
    res.status(201).json({ success: true, data: car });
  } catch (error) { next(error); }
};

// PUT /api/cars/:id
const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });

    if (req.files && req.files.length > 0) {
      const newImages = await Promise.all(req.files.map((file) => uploadImage(file)));
      car.images = [...car.images, ...newImages];
    }

    const allowedFields = ['title','brand','model','year','price','currency','mileage',
      'fuelType','transmission','bodyType','driveType','engineVolume',
      'horsePower','color','condition','description','category','isAvailable','isFeatured'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) car[field] = req.body[field];
    });

    const updated = await car.save();
    await updated.populate('category', 'name slug');
    res.json({ success: true, data: updated });
  } catch (error) { next(error); }
};

// DELETE /api/cars/:id
const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });

    if (car.images && car.images.length > 0) {
      await Promise.all(car.images.map((img) => deleteImage(img.path)));
    }
    await car.deleteOne();
    res.json({ success: true, message: 'Avtomobil muvaffaqiyatli o\'chirildi' });
  } catch (error) { next(error); }
};

// DELETE /api/cars/:id/images/:imageId
const deleteCarImage = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });

    const image = car.images.id(req.params.imageId);
    if (!image) return res.status(404).json({ success: false, message: 'Rasm topilmadi' });

    await deleteImage(image.path);
    car.images.pull(req.params.imageId);
    await car.save();
    res.json({ success: true, message: 'Rasm muvaffaqiyatli o\'chirildi', data: car });
  } catch (error) { next(error); }
};
```

**YANGI KOD (Supabase):**
```js
const { supabase } = require('../config/db');
const uploadImage = require('../utils/uploadImage');
const deleteImage = require('../utils/deleteImage');

const mapCarRow = (row) => ({
  id: row.id,
  title: row.title,
  brand: row.brand,
  model: row.model,
  year: row.year,
  price: row.price,
  currency: row.currency,
  mileage: row.mileage,
  fuelType: row.fuel_type,
  transmission: row.transmission,
  bodyType: row.body_type,
  driveType: row.drive_type,
  engineVolume: row.engine_volume,
  horsePower: row.horse_power,
  color: row.color,
  condition: row.condition,
  description: row.description,
  images: row.images,
  category: row.category ? { id: row.category.id, name: row.category.name, slug: row.category.slug } : null,
  category_id: row.category_id,
  isAvailable: row.is_available,
  isFeatured: row.is_featured,
  views: row.views,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// GET /api/cars
const getCars = async (req, res, next) => {
  try {
    const {
      brand, category, minPrice, maxPrice, search, fuelType,
      transmission, bodyType, condition, year, page = 1, limit = 12,
      sort: sortParam = '-createdAt',
    } = req.query;

    let query = supabase
      .from('cars')
      .select('*, category:category_id(id, name, slug)', { count: 'exact' });

    if (brand) query = query.ilike('brand', `%${brand}%`);
    if (category) query = query.eq('category_id', category);
    if (fuelType) query = query.eq('fuel_type', fuelType);
    if (transmission) query = query.eq('transmission', transmission);
    if (bodyType) query = query.eq('body_type', bodyType);
    if (condition) query = query.eq('condition', condition);
    if (year) query = query.eq('year', Number(year));
    if (minPrice) query = query.gte('price', Number(minPrice));
    if (maxPrice) query = query.lte('price', Number(maxPrice));

    // Full-text search
    if (search) {
      query = query.textSearch('idx_cars_search', search, { config: 'simple' });
    }

    // Sort: 'price' yoki '-createdAt' formatida keladi
    const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
    const sortOrder = sortParam.startsWith('-') ? { ascending: false } : { ascending: true };

    // Supabase field nomiga o'tkazish (camelCase -> snake_case)
    const sortMap = {
      createdAt: 'created_at', price: 'price', year: 'year',
      views: 'views', brand: 'brand',
    };
    const dbSortField = sortMap[sortField] || 'created_at';
    query = query.order(dbSortField, sortOrder);

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      total: count,
      page: pageNum,
      pages: Math.ceil(count / limitNum),
      data: data.map(mapCarRow),
    });
  } catch (error) { next(error); }
};

// GET /api/cars/featured
const getFeaturedCars = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*, category:category_id(id, name, slug)')
      .eq('is_featured', true)
      .eq('is_available', true)
      .order('created_at', { ascending: false })
      .limit(8);

    if (error) throw error;
    res.json({ success: true, count: data.length, data: data.map(mapCarRow) });
  } catch (error) { next(error); }
};

// GET /api/cars/:id
const getCarById = async (req, res, next) => {
  try {
    const { data: car, error } = await supabase
      .from('cars')
      .select('*, category:category_id(id, name, slug)')
      .eq('id', req.params.id)
      .single();

    if (error || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    // Ko'rishlar sonini oshirish
    await supabase
      .from('cars')
      .update({ views: car.views + 1 })
      .eq('id', req.params.id);

    car.views += 1;
    res.json({ success: true, data: mapCarRow(car) });
  } catch (error) { next(error); }
};

// POST /api/cars
const createCar = async (req, res, next) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = await Promise.all(req.files.map((file) => uploadImage(file)));
    }

    const carData = {
      title: req.body.title,
      brand: req.body.brand,
      model: req.body.model,
      year: Number(req.body.year),
      price: Number(req.body.price),
      currency: req.body.currency || 'USD',
      mileage: req.body.mileage ? Number(req.body.mileage) : 0,
      fuel_type: req.body.fuelType,
      transmission: req.body.transmission,
      body_type: req.body.bodyType,
      drive_type: req.body.driveType || 'old',
      engine_volume: req.body.engineVolume ? Number(req.body.engineVolume) : null,
      horse_power: req.body.horsePower ? Number(req.body.horsePower) : null,
      color: req.body.color || '',
      condition: req.body.condition || 'ishlatilgan',
      description: req.body.description || '',
      images: images,
      category_id: req.body.category,
      is_available: req.body.isAvailable !== undefined ? req.body.isAvailable : true,
      is_featured: req.body.isFeatured !== undefined ? req.body.isFeatured : false,
    };

    const { data, error } = await supabase
      .from('cars')
      .insert(carData)
      .select('*, category:category_id(id, name, slug)')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: mapCarRow(data) });
  } catch (error) { next(error); }
};

// PUT /api/cars/:id
const updateCar = async (req, res, next) => {
  try {
    // Avval mavjud avtomobilni olish
    const { data: existing, error: findError } = await supabase
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    // Yangi rasmlar yuklangan bo'lsa qo'shib ketish
    let images = existing.images || [];
    if (req.files && req.files.length > 0) {
      const newImages = await Promise.all(req.files.map((file) => uploadImage(file)));
      images = [...images, ...newImages];
    }

    const updateData = {};
    const fieldMap = {
      title: 'title', brand: 'brand', model: 'model', year: 'year',
      price: 'price', currency: 'currency', mileage: 'mileage',
      fuelType: 'fuel_type', transmission: 'transmission', bodyType: 'body_type',
      driveType: 'drive_type', engineVolume: 'engine_volume', horsePower: 'horse_power',
      color: 'color', condition: 'condition', description: 'description',
      category: 'category_id', isAvailable: 'is_available', isFeatured: 'is_featured',
    };

    for (const [camel, snake] of Object.entries(fieldMap)) {
      if (req.body[camel] !== undefined) {
        updateData[snake] = req.body[camel];
      }
    }

    // Year, price kabi raqamlarni Number ga o'tkazish
    if (updateData.year) updateData.year = Number(updateData.year);
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.mileage) updateData.mileage = Number(updateData.mileage);
    if (updateData.engine_volume) updateData.engine_volume = Number(updateData.engine_volume);
    if (updateData.horse_power) updateData.horse_power = Number(updateData.horse_power);

    updateData.images = images;

    const { data: updated, error: updateError } = await supabase
      .from('cars')
      .update(updateData)
      .eq('id', req.params.id)
      .select('*, category:category_id(id, name, slug)')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, data: mapCarRow(updated) });
  } catch (error) { next(error); }
};

// DELETE /api/cars/:id
const deleteCar = async (req, res, next) => {
  try {
    const { data: car, error: findError } = await supabase
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    // Supabase'dan rasmlarni o'chirish
    if (car.images && car.images.length > 0) {
      await Promise.all(car.images.map((img) => deleteImage(img.path)));
    }

    const { error: deleteError } = await supabase
      .from('cars')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) throw deleteError;

    res.json({ success: true, message: 'Avtomobil muvaffaqiyatli o\'chirildi' });
  } catch (error) { next(error); }
};

// DELETE /api/cars/:id/images/:imageId
const deleteCarImage = async (req, res, next) => {
  try {
    const { data: car, error: findError } = await supabase
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    const images = car.images || [];
    const imageIndex = images.findIndex((img) => img.path === req.params.imageId);

    if (imageIndex === -1) {
      return res.status(404).json({ success: false, message: 'Rasm topilmadi' });
    }

    await deleteImage(images[imageIndex].path);
    images.splice(imageIndex, 1);

    const { data: updated, error: updateError } = await supabase
      .from('cars')
      .update({ images })
      .eq('id', req.params.id)
      .select('*, category:category_id(id, name, slug)')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, message: 'Rasm muvaffaqiyatli o\'chirildi', data: mapCarRow(updated) });
  } catch (error) { next(error); }
};

module.exports = { getCars, getFeaturedCars, getCarById, createCar, updateCar, deleteCar, deleteCarImage };
```

**MUHIM O'ZGARISHLAR:**
| MongoDB | Supabase |
|---------|----------|
| `Car.find(filter).populate()` | `supabase.from('cars').select('*, category:category_id()')` |
| `Car.findById(id)` | `supabase.from('cars').select('*').eq('id', id).single()` |
| `Car.create(data)` | `supabase.from('cars').insert(data).select().single()` |
| `car.save()` | `supabase.from('cars').update(data).eq('id', id)` |
| `car.images.id(imageId)` | `images.findIndex(i => i.path === imageId)` |
| `car.images.pull(imageId)` | `images.splice(index, 1)` |
| `$regex: brand, $options: 'i'` | `.ilike('brand', '%${brand}%')` |
| `$text: { $search: search }` | `.textSearch('idx_cars_search', search)` |
| `sort('-createdAt')` | `.order('created_at', { ascending: false })` |
| `.skip(skip).limit(limit)` | `.range(from, to)` |
| `camelCase` field nomlari | `snake_case` field nomlari |

---

### 8.7. `controllers/categoryController.js` — QAYTA YOZILDI

**YANGI KOD (Supabase):**
```js
const { supabase } = require('../config/db');
const uploadImage = require('../utils/uploadImage');
const deleteImage = require('../utils/deleteImage');

// GET /api/categories
const getCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;

    const mapped = data.map((c) => ({
      id: c.id, name: c.name, slug: c.slug,
      image: { url: c.image_url, path: c.image_path },
      description: c.description, isActive: c.is_active,
      createdAt: c.created_at, updatedAt: c.updated_at,
    }));

    res.json({ success: true, count: mapped.length, data: mapped });
  } catch (error) { next(error); }
};

// GET /api/categories/:id
const getCategoryById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Kategoriya topilmadi' });
    }

    res.json({
      success: true,
      data: {
        id: data.id, name: data.name, slug: data.slug,
        image: { url: data.image_url, path: data.image_path },
        description: data.description, isActive: data.is_active,
        createdAt: data.created_at, updatedAt: data.updated_at,
      },
    });
  } catch (error) { next(error); }
};

// POST /api/categories
const createCategory = async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;
    let image_url = '', image_path = '';

    if (req.file) {
      const uploaded = await uploadImage(req.file);
      image_url = uploaded.url;
      image_path = uploaded.path;
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({ name, slug, description, image_url, image_path })
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ success: false, message: 'Bu kategoriya nomi yoki slug allaqachon mavjud' });
      }
      throw error;
    }

    res.status(201).json({
      success: true,
      data: {
        id: data.id, name: data.name, slug: data.slug,
        image: { url: data.image_url, path: data.image_path },
        description: data.description, isActive: data.is_active,
      },
    });
  } catch (error) { next(error); }
};

// PUT /api/categories/:id
const updateCategory = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Kategoriya topilmadi' });
    }

    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.slug !== undefined) updateData.slug = req.body.slug;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.isActive !== undefined) updateData.is_active = req.body.isActive;

    if (req.file) {
      if (existing.image_path) {
        await deleteImage(existing.image_path);
      }
      const uploaded = await uploadImage(req.file);
      updateData.image_url = uploaded.url;
      updateData.image_path = uploaded.path;
    }

    const { data: updated, error: updateError } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', req.params.id)
      .select('*')
      .single();

    if (updateError) throw updateError;

    res.json({
      success: true,
      data: {
        id: updated.id, name: updated.name, slug: updated.slug,
        image: { url: updated.image_url, path: updated.image_path },
        description: updated.description, isActive: updated.is_active,
      },
    });
  } catch (error) { next(error); }
};

// DELETE /api/categories/:id
const deleteCategory = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Kategoriya topilmadi' });
    }

    // Kategoriyada avtomobil bormi?
    const { count, error: countError } = await supabase
      .from('cars')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', req.params.id);

    if (countError) throw countError;

    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: `Bu kategoriyada ${count} ta avtomobil bor. Avval ularni o'chiring yoki boshqa kategoriyaga o'tkazing`,
      });
    }

    if (existing.image_path) {
      await deleteImage(existing.image_path);
    }

    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) throw deleteError;

    res.json({ success: true, message: 'Kategoriya muvaffaqiyatli o\'chirildi' });
  } catch (error) { next(error); }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
```

---

### 8.8. `controllers/orderController.js` — QAYTA YOZILDI

**YANGI KOD (Supabase):**
```js
const { supabase } = require('../config/db');

const mapOrderRow = (row) => ({
  id: row.id,
  car: row.car ? {
    id: row.car.id, title: row.car.title,
    brand: row.car.brand, model: row.car.model,
    year: row.car.year, price: row.car.price,
    images: row.car.images,
  } : row.car_id,
  car_id: row.car_id,
  fullName: row.full_name,
  phone: row.phone,
  message: row.message,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { car: carId, fullName, phone, message } = req.body;

    // Avtomobil mavjudligini tekshirish
    const { data: car, error: carError } = await supabase
      .from('cars')
      .select('id, is_available')
      .eq('id', carId)
      .single();

    if (carError || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }
    if (!car.is_available) {
      return res.status(400).json({ success: false, message: 'Bu avtomobil hozirda mavjud emas' });
    }

    const { data: order, error } = await supabase
      .from('orders')
      .insert({ car_id: carId, full_name: fullName, phone, message })
      .select('*, car:car_id(id, title, brand, model, year, price)')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'So\'rovingiz qabul qilindi. Tez orada siz bilan bog\'lanamiz!',
      data: mapOrderRow(order),
    });
  } catch (error) { next(error); }
};

// GET /api/orders
const getOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('orders')
      .select('*, car:car_id(id, title, brand, model, year, price)', { count: 'exact' });

    if (status) query = query.eq('status', status);

    query = query.order('created_at', { ascending: false });

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      total: count,
      page: pageNum,
      pages: Math.ceil(count / limitNum),
      data: data.map(mapOrderRow),
    });
  } catch (error) { next(error); }
};

// GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, car:car_id(id, title, brand, model, year, price, images)')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'So\'rov topilmadi' });
    }

    res.json({ success: true, data: mapOrderRow(data) });
  } catch (error) { next(error); }
};

// PUT /api/orders/:id
const updateOrderStatus = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'So\'rov topilmadi' });
    }

    const { data: updated, error } = await supabase
      .from('orders')
      .update({ status: req.body.status })
      .eq('id', req.params.id)
      .select('*, car:car_id(id, title, brand, model, year)')
      .single();

    if (error) throw error;

    res.json({ success: true, data: mapOrderRow(updated) });
  } catch (error) { next(error); }
};

// DELETE /api/orders/:id
const deleteOrder = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'So\'rov topilmadi' });
    }

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ success: true, message: 'So\'rov muvaffaqiyatli o\'chirildi' });
  } catch (error) { next(error); }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder };
```

---

### 8.9. `config/supabase.js` — O'ZGARMAYDI (allaqachon to'g'ri)

Bu fayl **Storage** (rasm yuklash) uchun alohida ishlatiladi. Hozirgi kodi to'g'ri:

```js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;
```

**IMPORTANT:** `config/db.js` va `config/supabase.js` ikkalasi ham bir xil client yaratadi. Siz ikkalasini birlashtirishingiz mumkin. Agar birlashtirsangiz, `uploadImage.js` va `deleteImage.js` dagi importni o'zgartiring:
- `const supabase = require('../config/supabase');`
  → `const { supabase } = require('../config/db');`

---

## 9. PAKETLARNI YANGILASH

```bash
cd backend

# Mongoose ni olib tashlash (kerak emas)
npm uninstall mongoose
```

---

## 10. MODELLAR PAPKASINI O'CHIRISH

`backend/models/` papkasidagi barcha fayllar o'chiriladi:
- `User.js` — o'chirish
- `Car.js` — o'chirish
- `Category.js` — o'chirish
- `Order.js` — o'chirish

Mongoose model fayllari kerak emas, chunki Supabase bilan to'g'ridan-to'g'ri SQL query ishlatamiz.

---

## 11. HAMMA FAYLLARNING STATUSI (XULOSA)

| # | Fayl | Status | Nima qilish kerak? |
|---|------|--------|-------------------|
| 1 | `backend/.env` | ✅ TAYYOR | Faqat SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY ni yozing |
| 2 | `backend/.env.example` | ✅ TAYYOR | Hech narsa qilmang |
| 3 | `backend/package.json` | ⚠️ O'ZGARADI | `npm uninstall mongoose` |
| 4 | `backend/config/db.js` | ❌ QAYTA YOZILADI | Yuqoridagi yangi kodni yozing |
| 5 | `backend/config/supabase.js` | ✅ TAYYOR | Hech narsa qilmang |
| 6 | `backend/server.js` | ⚠️ O'ZGARADI | `connectDB()` ni `testConnection()` ga almashtiring |
| 7 | `backend/models/` papkasi | ❌ O'CHIRILADI | 4 ta faylni o'chiring |
| 8 | `backend/controllers/authController.js` | ❌ QAYTA YOZILADI | Yuqoridagi yangi kodni yozing |
| 9 | `backend/controllers/carController.js` | ❌ QAYTA YOZILADI | Yuqoridagi yangi kodni yozing |
| 10 | `backend/controllers/categoryController.js` | ❌ QAYTA YOZILADI | Yuqoridagi yangi kodni yozing |
| 11 | `backend/controllers/orderController.js` | ❌ QAYTA YOZILADI | Yuqoridagi yangi kodni yozing |
| 12 | `backend/routes/authRoutes.js` | ✅ TAYYOR | Hech narsa qilmang |
| 13 | `backend/routes/carRoutes.js` | ✅ TAYYOR | Hech narsa qilmang |
| 14 | `backend/routes/categoryRoutes.js` | ✅ TAYYOR | Hech narsa qilmang |
| 15 | `backend/routes/orderRoutes.js` | ✅ TAYYOR | Hech narsa qilmang |
| 16 | `backend/middleware/authMiddleware.js` | ⚠️ O'ZGARADI | `User.findById` ni `supabase.from('users')` ga o'zgartiring |
| 17 | `backend/middleware/errorMiddleware.js` | ⚠️ O'ZGARADI | Mongoose xatolarini PostgreSQL xatolariga o'zgartiring |
| 18 | `backend/middleware/upload.js` | ✅ TAYYOR | Hech narsa qilmang |
| 19 | `backend/middleware/validators/*.js` | ✅ TAYYOR | Hech narsa qilmang |
| 20 | `backend/utils/uploadImage.js` | ✅ TAYYOR | Hech narsa qilmang |
| 21 | `backend/utils/deleteImage.js` | ✅ TAYYOR | Hech narsa qilmang |
| 22 | `backend/seed.js` | ❌ O'CHIRILADI | Endi SQL orqali seed qilinadi (Step 6) |

---

## 12. ISHLASH TARTIBI (QAYSI TARTIBDA BAJARISH KERAK)

```
STEP 1: Supabase project ochish (brauzer)
STEP 2: API kalitlarni olish (brauzer)
STEP 3: .env ga kalitlarni yozish
STEP 4: SQL Schema ni Run qilish (SQL Editor)
STEP 5: Storage bucket yaratish (Storage)
STEP 6: Seed SQL ni Run qilish (SQL Editor)
STEP 7: Paketlarni yangilash (npm uninstall mongoose)
STEP 8: models/ papkasini o'chirish
STEP 9: config/db.js ni qayta yozish
STEP 10: server.js ni o'zgartirish
STEP 11: middleware/errorMiddleware.js ni o'zgartirish
STEP 12: middleware/authMiddleware.js ni o'zgartirish
STEP 13: controllers/authController.js ni qayta yozish
STEP 14: controllers/carController.js ni qayta yozish
STEP 15: controllers/categoryController.js ni qayta yozish
STEP 16: controllers/orderController.js ni qayta yozish
STEP 17: Backendni ishga tushirish (npm run dev)
STEP 18: Test qilish (Postman yoki frontend)
```

---

## 13. MUHIM ESDA TUTING

### MongoDB -> Supabase mapping

| MongoDB | Supabase (PostgreSQL) |
|---------|----------------------|
| `_id` (ObjectId) | `id` (UUID) |
| `camelCase` field | `snake_case` field |
| `Model.find()` | `supabase.from('table').select()` |
| `Model.findById(id)` | `.eq('id', id).single()` |
| `Model.create(data)` | `.insert(data).select().single()` |
| `Model.findByIdAndUpdate()` | `.update(data).eq('id', id)` |
| `Model.findByIdAndDelete()` | `.delete().eq('id', id)` |
| `.populate('ref', 'fields')` | `.select('*, ref:ref_id(fields)')` |
| `$regex: 'val', $options: 'i'` | `.ilike('field', '%val%')` |
| `$gte / $lte` | `.gte('field', val) / .lte('field', val)` |
| `$text: { $search: 'val' }` | `.textSearch('index_name', 'val')` |
| `.sort('-field')` | `.order('field', { ascending: false })` |
| `.skip(n).limit(m)` | `.range(n, n+m-1)` |

### Frontend API client da o'zgarish

Agar frontend response da `_id` ishlatsa, `id` ga o'zgartirish kerak:
```js
// src/api/index.js da _id ni id ga o'zgartirish
// yoki backend snake_case -> camelCase converter saqlaydi (yuqoridagi mapCarRow funksiyasi)
```

---
