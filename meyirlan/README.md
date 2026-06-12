# Meyirlan uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 3 ta komponent tayyor holda ochilgan:
- `VehicleGridCard.jsx`
- `VehicleListCard.jsx`
- `Pagination.jsx`

## UI/UX Yo'riqnomasi:

### VehicleGridCard.jsx
**Referans:** `assets/24_car_selection_new.jpg`, `assets/24_car_selection_used.jpg`

Avtomobil grid kartochkasi. Tarkibi:
- Rasm maydoni (`aspect-[4/3]`, `bg-gray-100`)
- Model nomi: "BMW X5 2023" (`font-bold`, `text-sm`)
- Narxi: "45 000 $" (`text-base`, `font-extrabold`)
- Texnik ma'lumotlar: yil (2023), km (15 000 km), dvigatel (3.0L), uzatma qutisi (Avtomat) — `text-[11px]`, `text-slate-500`
- Har bir ma'lumot oldida ikonka (`svg`, `w-3.5 h-3.5`)
- Karta: `bg-white`, `border`, `rounded-xl`, hover: `shadow-md`
- `p-3` padding

### VehicleListCard.jsx
Avtomobil list kartochkasi (gorizontal). Tarkibi:
- Chapda rasm (`w-56`, `bg-gray-100`)
- O'ng tomonda:
  - Model nomi va narxi (yuqori qator)
  - Texnik ma'lumotlar: 2022, 20 000 km, 2.0L, Avtomat, Benz
  - Qisqa tavsif matni (`line-clamp-2`, `text-slate-400`)
  - Status: "В наличии" (yashil badge) va shahar
- Karta: `flex`, `bg-white`, `border`, `rounded-xl`, hover: `shadow-md`
- `p-4` padding

### Pagination.jsx
Sahifalash komponenti. Tarkibi:
- Oldingi sahifa tugmasi (`<` iconka)
- Raqamli tugmalar: 1 (faol — qizil fon `bg-red-600`), 2, 3
- Ellipsis: `...`
- 12 (oxirgi sahifa)
- Keyingi sahifa tugmasi (`>` iconka)
- Har bir tugma `w-9 h-9`, `rounded-lg`, `border`
- `flex items-center justify-center gap-1`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| CarSelectionNew | **Подбор нового авто** |
| CarSelectionUsed | **Подбор Б/У авто** |
| VehicleGridCard | **Карточка автомобиля (сетка)** |
| VehicleListCard | **Карточка автомобиля (список)** |
| Pagination | **Пагинация** |

VehicleGridCard, VehicleListCard va Pagination komponentlaringiz Podbor (Подбор) sahifalaridagi avtomobil ro'yxati va kartochkalariga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
