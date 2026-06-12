# Bahodir uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `MediaGallery.jsx`
- `DetailHeader.jsx`

## UI/UX Yo'riqnomasi:

### MediaGallery.jsx
**Referans:** `assets/08_used_cars.jpg`, `assets/08_used_cars_768.jpg`, `assets/09_used_car_detail.jpg`, `assets/09_used_car_detail_768.jpg`

Avtomobil rasmlar galereyasi. Tarkibi:
- Katta asosiy rasm (`aspect-video`, `bg-gray-100`, `rounded-xl`)
- Asosiy rasm ustida: markazda "Asosiy rasm" matni, pastki o'ng burchakda "Rasmlarni ko'rish" tugmasi (`bg-white/90`, `text-xs`, `rounded-lg`)
- Pastda 5 ta kichik thumbnail (`w-24 h-16`, `bg-gray-100`, `rounded-lg`, `shrink-0`)
- Thumbnallar gorizontal skroll (`overflow-x-auto`, `flex gap-2`)
- `space-y-2` vertikal bo'shliq

### DetailHeader.jsx
Avtomobil detail sahifasining sarlavha qismi. Tarkibi:
- Chap tomonda:
  - Model nomi: "BMW X5 xDrive40i 2023" (`text-2xl`, `font-bold`)
  - VIN raqami va shahar: "VIN: WBA1234567890 · Москва" (`text-xs`, `text-slate-500`)
- O'ng tomonda:
  - Narx: "8 500 000 ₽" (`text-2xl`, `font-extrabold`)
  - Eski narx: "9 200 000 ₽" (`line-through`, `text-slate-400`)
- Status: "В наличии" (`bg-green-100`, `text-green-700`, badge)
- Tugmalar:
  - Sevimlilar (heart iconka + matn)
  - Ulashish (share iconka + matn)
- `flex items-start justify-between`, `mb-4`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| UsedCars | **Автомобили с пробегом (Б/У)** |
| UsedCarDetail | **Карточка Б/У автомобиля** |
| MediaGallery | **Галерея изображений** |
| DetailHeader | **Шапка детальной страницы** |

MediaGallery va DetailHeader komponentlaringiz Used Cars (Б/У) sahifalari va Used Car Detail (Карточка Б/У) sahifasidagi yuqori qismga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
