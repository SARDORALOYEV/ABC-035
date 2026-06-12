# Aziz uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `BlogHome.jsx`
- `ArticleCard.jsx`

## UI/UX Yo'riqnomasi:

### BlogHome.jsx
**Referans:** `assets/21_reviews.jpg`, `assets/22_review_detail.jpg`, `assets/29_blog.jpg`, `assets/30_article.jpg`, `assets/30_article_768.jpg`

Blog bosh sahifasi. Tarkibi:
- **Hero article** (asosiy yangilik):
  - Keng rasm (`aspect-[21/9]`, `bg-gray-100`)
  - Pastki qismida gradient overlay (`bg-gradient-to-t from-black/60 to-transparent`)
  - "Yangilik" badge (`bg-red-600`, `text-white`, `text-[10px]`, `font-bold`, `px-2 py-0.5`, `rounded`)
  - Sarlavha: "Yangi BMW X5 2024 rasmiy taqdimoti" (`text-white`, `text-xl`, `font-bold`)
  - Qisqacha matn (`text-white/80`, `text-xs`)
  - `relative`, `rounded-xl`, `overflow-hidden`, `mb-5`
- **Article grid** (6 ta maqola):
  - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
  - Har bir karta:
    - 16:9 rasm (`aspect-[16/9]`, `bg-gray-100`)
    - Sana: "15.05.2024" (`text-xs`, `text-slate-400`)
    - Sarlavha: "Avtomobil sanoatidagi eng so'nggi yangiliklar"
    - Qisqa tavsif: `text-xs`, `text-slate-500`, `line-clamp-2`
  - Karta: `bg-white`, `border`, `rounded-xl`, `overflow-hidden`, `p-3`, hover: `shadow-md`

### ArticleCard.jsx
Maqola kartochkasi (alohida komponent — yuqoridagi grid uchun). Tarkibi:
- 16:9 rasm (`aspect-[16/9]`, `bg-gray-100`)
- Sana (`text-xs`, `text-slate-400`, `mb-1`)
- Sarlavha (`text-sm`, `font-bold`, `text-slate-900`, `mb-1`)
- Qisqa tavsif (`text-xs`, `text-slate-500`, `line-clamp-2`)
- Karta: `bg-white`, `border`, `rounded-xl`, `overflow-hidden`, `p-3`, hover: `shadow-md`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Reviews | **Отзывы** |
| ReviewDetail | **Детальная страница отзыва** |
| Blog | **Блог** |
| Article | **Статья** |
| BlogHome | **Главная блога** |
| ArticleCard | **Карточка статьи** |

BlogHome va ArticleCard komponentlaringiz Отзывы (Reviews), Блог (Blog) va Статья (Article) sahifalaridagi blog kartochkalari va ro'yxatiga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
