# ABC Auto — Backend API

Express.js + MongoDB + Supabase Storage asosida qurilgan avtomobil savdo sayti backend API.

---

## Texnologiyalar

- **Node.js + Express.js** — server
- **MongoDB Atlas** — ma'lumotlar bazasi
- **Mongoose** — ODM
- **JWT + bcryptjs** — autentifikatsiya
- **Multer + Supabase Storage** — rasm yuklash
- **Helmet, CORS, Rate Limit** — xavfsizlik

---

## 1. Lokal ishga tushirish

```bash
# 1. Repozitoriyni klonlash
git clone <repo-url>
cd abc-auto-backend

# 2. Paketlarni o'rnatish
npm install

# 3. .env faylini sozlash
cp .env.example .env
# .env faylini to'ldiring (quyidagi bo'limga qarang)

# 4. Ma'lumotlar bazasini to'ldirish (ixtiyoriy)
npm run seed

# 5. Development rejimida ishga tushirish
npm run dev
```

Server `http://localhost:5000` manzilida ishga tushadi.

---

## 2. .env Sozlash

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/abc-auto
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_BUCKET=abc-auto
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=admin@abcauto.uz
ADMIN_PASSWORD=admin123456
```

---

## 3. MongoDB Atlas

MongoDB Atlas allaqachon sozlangan deb hisoblanadi. Faqat `MONGO_URI` ni `.env` ga qo'shing.

> **Eslatma:** MongoDB Atlas Network Access bo'limida `0.0.0.0/0` IP whitelist qilingan bo'lsin (yoki Render.com IP'si).

---

## 4. Supabase Storage

Supabase Dashboard'da `abc-auto` nomli **public** bucket allaqachon yaratilgan.

`.env` ga quyidagilarni qo'shing:
- `SUPABASE_URL` — Project URL (Settings > API)
- `SUPABASE_SERVICE_ROLE_KEY` — service_role key (Settings > API > Project API keys)
- `SUPABASE_BUCKET=abc-auto`

---

## 5. Render.com'ga Deploy

1. Render.com'da yangi **Web Service** yarating
2. GitHub reponi ulang
3. Sozlamalar:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** `Node`
4. **Environment Variables** bo'limida `.env` dagi barcha o'zgaruvchilarni qo'shing:
   - `MONGO_URI`, `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_BUCKET=abc-auto`, `CLIENT_URL`, `NODE_ENV=production`
5. **Deploy** tugmasini bosing

---

## 6. API Endpointlar

Base URL: `https://your-app.onrender.com/api`

### Sog'liqni tekshirish
| Metod | Manzil | Tavsif |
|-------|--------|--------|
| GET | `/health` | Server ishlayotganini tekshirish |

**Javob:**
```json
{ "success": true, "message": "ABC Auto API ishlayapti", "timestamp": "2024-01-01T00:00:00Z" }
```

---

### Auth Endpointlar

#### POST /auth/register
Admin yaratish (dastlabki sozlash uchun).

**Body:**
```json
{ "name": "Admin", "email": "admin@abcauto.uz", "password": "admin123456" }
```
**Javob:**
```json
{
  "success": true,
  "data": { "_id": "...", "name": "Admin", "email": "admin@abcauto.uz", "role": "admin", "token": "eyJ..." }
}
```

#### POST /auth/login
**Body:**
```json
{ "email": "admin@abcauto.uz", "password": "admin123456" }
```
**Javob:**
```json
{
  "success": true,
  "data": { "_id": "...", "name": "Admin", "email": "admin@abcauto.uz", "role": "admin", "token": "eyJ..." }
}
```

#### GET /auth/me
**Headers:** `Authorization: Bearer <token>`

**Javob:**
```json
{ "success": true, "data": { "_id": "...", "name": "Admin", "email": "admin@abcauto.uz", "role": "admin" } }
```

---

### Kategoriyalar

#### GET /categories
```json
{
  "success": true,
  "count": 5,
  "data": [
    { "_id": "...", "name": "Sedan", "slug": "sedan", "image": { "url": "https://...", "path": "uuid.jpg" } }
  ]
}
```

#### POST /categories *(Admin)*
**Headers:** `Authorization: Bearer <token>`  
**Body (form-data):** `name`, `slug`, `description`, `image` (fayl)

#### PUT /categories/:id *(Admin)*
**Body (form-data):** istalgan maydonlar

#### DELETE /categories/:id *(Admin)*
Agar kategoriyada avtomobil bo'lsa, xatolik qaytaradi.

---

### Avtomobillar

#### GET /cars
**Query parametrlar:**
- `page` (default: 1), `limit` (default: 12, max: 50)
- `brand`, `category` (ObjectId), `fuelType`, `transmission`, `bodyType`, `condition`, `year`
- `minPrice`, `maxPrice`, `search`
- `sort` (default: `-createdAt`)

```json
{
  "success": true,
  "count": 12,
  "total": 45,
  "page": 1,
  "pages": 4,
  "data": [...]
}
```

#### GET /cars/featured
Bosh sahifa uchun `isFeatured: true` avtomobillar (max 8 ta).

#### GET /cars/:id
Ko'rishlar soni avtomatik oshadi.

#### POST /cars *(Admin)*
**Headers:** `Authorization: Bearer <token>`  
**Body (form-data):**
| Maydon | Turi | Majburiy | Qiymatlar |
|--------|------|----------|-----------|
| title | text | ✅ | |
| brand | text | ✅ | |
| model | text | ✅ | |
| year | number | ✅ | 1900-2025 |
| price | number | ✅ | |
| fuelType | text | ✅ | benzin/dizel/gaz/elektr/gibrid |
| transmission | text | ✅ | mexanika/avtomat/yarim-avtomat |
| bodyType | text | ✅ | sedan/suv/hatchback/... |
| category | ObjectId | ✅ | |
| images | file[] | ❌ | max 10 ta, 5MB |
| mileage, color, condition, description, ... | | ❌ | |

#### PUT /cars/:id *(Admin)*
Yangi rasmlar qo'shiladi (mavjudlari o'chmaydi).

#### DELETE /cars/:id *(Admin)*
Supabase bucket'dan barcha rasmlar ham o'chiriladi.

#### DELETE /cars/:id/images/:imageId *(Admin)*
Bitta rasmni o'chirish.

---

### So'rovlar (Orders)

#### POST /orders *(Public)*
**Body:**
```json
{
  "car": "CAR_OBJECT_ID",
  "fullName": "Alisher Karimov",
  "phone": "+998901234567",
  "message": "Bu avtomobil haqida ma'lumot olmoqchiman"
}
```

#### GET /orders *(Admin)*
**Query:** `status` (yangi/korib_chiqilmoqda/yakunlangan/bekor_qilingan), `page`, `limit`

#### PUT /orders/:id *(Admin)*
```json
{ "status": "korib_chiqilmoqda" }
```

---

## 7. Postman Collection

`abc-auto.postman_collection.json` faylini Postman/Thunder Client'ga import qiling.

1. Postman'da **Import** tugmasi
2. `abc-auto.postman_collection.json` faylini tanlang
3. `baseUrl` variable'ini o'zingizning URL'ga o'zgartiring
4. Login so'rovini yuboring — token avtomatik saqlanadi
