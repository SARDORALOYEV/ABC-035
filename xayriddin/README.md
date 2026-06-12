# Xayriddin uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `Navbar.jsx`
- `HeroBanner.jsx`

Ushbu fayllarni hech qanday o'zgartirmasdan, faqat ichidagi JSX va Tailwind CSS klasslarini dizayn asosida yozishingiz kerak.

## UI/UX Yo'riqnomasi:

### Navbar.jsx
**Referans:** `assets/12_family_car.jpg`, `assets/13_first_car.jpg`, `assets/14_trade_in.jpg`, `assets/15_medical_workers.jpg`, `assets/17_recycling.jpg`

Loyihaning yuqori navigatsiya paneli. Tarkibi:
- Chap tomonda **ABC Auto** logotipi (qizil rang, `text-red-600`, `font-extrabold`)
- Markazda sahifa linklari: Katalog, Ishlatilgan, Kredit, Sharhlar, Blog (`text-xs`, `text-slate-600`, hover: qizil)
- O'ng tomonda: Sevimlilar tugmasi (ikonka + matn), Kirish tugmasi (qizil fon, `bg-red-600`, `rounded-lg`)
- Mobil versiya uchun hamburger menyu ikonkasi (`lg:hidden`)
- Panel `fixed` holatda, `top-0`, `z-40`, oq fon, pastki chegarasi `border-b`

### HeroBanner.jsx
**Referans:** yuqoridagi barcha rasmlar

Bosh sahifadagi katta hero blok. Tarkibi:
- Gradient fon (`bg-gradient-to-br from-slate-900 to-slate-800`), `rounded-2xl`
- Katta sarlavha: "O'zingizning **ideal avtomobilingizni** toping" (ikkinchi qator qizil rang `text-red-500`)
- Ta'rif matni: "Yangi va ishlatilgan avtomobillar katalogi..."
- Ikkita CTA tugma:
  - "Katalog" — qizil fon (`bg-red-600`), oq matn
  - "Ishlatilgan" — shaffof fon (`bg-white/10`)
- O'ng tomonda (faqat `lg:` ekranlarda) avtomobil rasmi uchun gradient joy
- `mt-20` (navbar ostida qolmasligi uchun)

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| FamilyCar | **Семейный автомобиль** |
| FirstCar | **Первый автомобиль** |
| TradeIn | **Трейд-ин** |
| MedicalWorkers | **Медицинским работникам** |
| Recycling | **Утилизация** |
| Navbar + HeroBanner | **Главная (хедер и верхняя часть)** |

Figma layout'ida yuqori qismdan (Header/Navbar) va FamilyCar/FirstCar kabi sahifalardan dizaynni topishingiz mumkin.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
