# Sohiba uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `CompareMatrix.jsx`
- `StaticInfo.jsx`

## UI/UX Yo'riqnomasi:

### CompareMatrix.jsx
**Referans:** `assets/27_404.jpg`, `assets/28_comparison_new.jpg`, `assets/28_comparison_taxi.jpg`

Avtomobillarni solishtirish jadvali. Tarkibi:
- 3 ta mashina: BMW X5 2023, Mercedes GLE 2023, Audi Q7 2022
- Sarlavha qatori: har bir ustunda rasm (`h-24`, `bg-gray-100`, `rounded-lg`) va model nomi (`text-xs`, `font-bold`)
- Ma'lumot qatorlari:
  1. Narx — "8 500 000 ₽", "9 200 000 ₽", "7 800 000 ₽"
  2. Dvigatel — "3.0L Benz", "3.0L Dizel", "3.0L Benz"
  3. Uzatma qutisi — "Avtomat"
  4. Yoqilg'i — "Benzin", "Dizel", "Benzin"
  5. Rangi — "Qora", "Oq", "Ko'k"
  6. Yili — "2023", "2023", "2022"
- Label ustuni: `w-32`, `text-xs`, `font-semibold`, `text-slate-700`
- Ma'lumotlar: `text-xs`, `text-slate-600`, `text-center`
- `divide-y divide-gray-100`, `border-b border-gray-200`
- Jadval: `w-full`, `text-left`
- Karta: `bg-white`, `border`, `rounded-xl`, `overflow-hidden`

### StaticInfo.jsx
Statik ma'lumot sahifasi. Tarkibi:
- **"Biz haqimizda"** bo'limi:
  - Sarlavha: "Biz haqimizda" (`text-2xl`, `font-bold`, `mb-3`)
  - Matn: ABC Auto haqida 3-4 qatorlik tavsif (`text-sm`, `text-slate-500`, `leading-relaxed`)
  - Karta: `bg-white`, `border`, `rounded-xl`, `p-8`, `mb-4`
- **"Yordam markazi"** bo'limi:
  - Sarlavha: "Yordam markazi"
  - Matn: yordam haqida 2 qatorlik tavsif
  - Kontakt ma'lumotlari:
    1. 📞 +7 (800) 551-94-31
    2. 📧 info@abc-auto.ru
    3. 📍 Москва, 38КМ МКАД, 6Бс1
  - Karta: `bg-white`, `border`, `rounded-xl`, `p-8`
- `max-w-2xl mx-auto text-center`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Error404 | **Ошибка 404** |
| ComparisonNew | **Сравнение новых авто** |
| ComparisonTaxi | **Сравнение такси** |
| CompareMatrix | **Таблица сравнения** |
| StaticInfo | **Статическая информация (О нас / Контакты)** |

CompareMatrix va StaticInfo komponentlaringiz Ошибка 404 (Error404), Сравнение новых (ComparisonNew) va Сравнение такси (ComparisonTaxi) sahifalaridagi solishtirish jadvali va statik ma'lumot bloklariga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
