# Qobiljon uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `TechnicalSpecs.jsx`
- `RecommendedCarousel.jsx`

## UI/UX Yo'riqnomasi:

### TechnicalSpecs.jsx
**Referans:** `assets/01_home.jpg`, `assets/01_home_768.jpg`

Texnik xarakteristikalar jadvali. Tarkibi:
- Sarlavha: "Texnik xarakteristikalar" (`font-bold`, `text-sm`)
- 8 qator ma'lumot (label-value juftligi):
  1. Dvigatel — "3.0L, Benz, 340 ot kuchi"
  2. Yurgan masofasi — "15 000 km"
  3. Rangi — "Qora (metallik)"
  4. Uzatma qutisi — "Avtomat, 8-step"
  5. Yoqilg'i turi — "Benzin AI-95"
  6. Privod — "To'liq (AWD)"
  7. Yoqilg'i sarfi — "8.5L / 100 km"
  8. Holati — "Ideal"
- Label: `w-1/2`, `text-xs`, `text-slate-500`
- Value: `w-1/2`, `text-xs`, `font-medium`, `text-slate-800`
- Qatorlar `divide-y divide-gray-100` bilan ajratilgan
- Har bir qator `py-2.5`, `flex items-center`
- Karta: `bg-white`, `border`, `rounded-xl`, `p-5`

### RecommendedCarousel.jsx
O'xshash avtomobillar karuseli. Tarkibi:
- Sarlavha: "O'xshash avtomobillar" (`font-bold`, `text-sm`, `mb-3`)
- 4 ta gorizontal skroll kartochkasi (`flex gap-3 overflow-x-auto`)
- Har bir karta: `min-w-[200px]`, `bg-white`, `border`, `rounded-xl`, `shrink-0`
- Karta ichida:
  - Rasm (`aspect-[4/3]`, `bg-gray-100`)
  - Model nomi: "BMW X5 2023"
  - Narx: "8 500 000 ₽"
- `pb-2` (scrollbar uchun bo'shliq)

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Home | **Главная** |
| TechnicalSpecs | **Технические характеристики** |
| RecommendedCarousel | **Похожие автомобили (карусель)** |

TechnicalSpecs va RecommendedCarousel komponentlaringiz Home (Главная) sahifasidagi avtomobil detail qismiga mos keladi (texnik xarakteristikalar va o'xshash avtomobillar bloki).

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
