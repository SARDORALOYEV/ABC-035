# Ayub uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `MyListingsTable.jsx`
- `SavedCarsGrid.jsx`

## UI/UX Yo'riqnomasi:

### MyListingsTable.jsx
**Referans:** `assets/07_favorites_new.jpg`, `assets/07_favorites_new_768.jpg`, `assets/07_favorites_used.jpg`, `assets/07_favorites_used_768.jpg`, `assets/07_favorites_taxi.jpg`, `assets/25_our_collections.jpg`, `assets/26_collection_detail.jpg`

Foydalanuvchi e'lonlari jadvali. Tarkibi:
- Jadval ustunlari: #, Rasm, Model, Narx, Status, Amallar
- Sarlavha qatori: `bg-gray-50`, `text-xs`, `font-semibold`, `text-slate-500`, `uppercase`
- Har bir qator:
  - #: tartib raqami
  - Rasm: `w-10 h-8`, `bg-gray-100`, `rounded`
  - Model: "BMW X5 2023", `font-medium`
  - Narx: "8 500 000 ₽", `font-bold`
  - Status: "Faol" — `bg-green-100`, `text-green-700`, badge
  - Amallar: tahrirlash (qalam ikonkasi) va o'chirish (trash ikonkasi) tugmalari
- `hover:bg-gray-50` har bir qatorda
- `divide-y divide-gray-100`
- Jadval: `w-full`, `text-left`
- Karta: `bg-white`, `border`, `rounded-xl`, `overflow-hidden`

### SavedCarsGrid.jsx
Saqlangan avtomobillar gridi. Tarkibi:
- Grid kartochkalar (grid-cols-3 yoki mos)
- Har bir karta:
  - Rasm (aspect-[4/3], bg-gray-100)
  - Model nomi (text-sm, font-bold)
  - Narx (text-base, font-extrabold)
  - Saqlash tugmasi (heart ikonkasi)
  - O'chirish tugmasi (X ikonkasi)
- Karta: `bg-white`, `border`, `rounded-xl`, `overflow-hidden`, hover: `shadow-md`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Favorites | **Избранное** |
| Collections | **Подборки** |
| CollectionDetail | **Детальная страница подборки** |
| MyListingsTable | **Таблица моих объявлений** |
| SavedCarsGrid | **Сетка сохранённых автомобилей** |

MyListingsTable va SavedCarsGrid komponentlaringiz Избранное (Favorites) va Подборки (Collections) sahifalaridagi ro'yxat va grid ko'rinishiga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
