# Student 4 - Ishlatilgan avtomobillar ro'yxati va tafsilot

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `08_used_cars.jpg` / `08_used_cars_768.jpg` | Ishlatilgan avtomobillar katalogi |
| `09_used_car_detail.jpg` / `09_used_car_detail_768.jpg` | Avtomobil tafsilot sahifasi |

## Vazifa: Quyidagi React komponentlarini yarating

**Used Cars ro'yxati:**
- `<UsedCarsPage />` — ishlatilgan avtomobillar sahifasi
- `<UsedCarCard />` — ishlatilgan avtomobil kartasi (yil, km, narx)

**Avtomobil tafsiloti:**
- `<CarDetailPage />` — to'liq tafsilot sahifasi
- `<ImageGallery />` — rasm galereyasi (katta + kichik rasmlar)
- `<PreviewPanel />` — asosiy rasm ko'rinishi
- `<ThumbnailStrip />` — kichik rasm tasmasi
- `<PriceRibbon />` — narx qoplamasi
- `<ActionIconBar />` — amallar paneli (ulashish, solishtirish, sevimlilar)
- `<VehicleSummaryCard />` — avtomobil xulosa kartasi
- `<SpecTabs />` — texnik xususiyatlar yorliqlari
- `<SpecTable />` — xususiyatlar jadvali
- `<RecommendedCarousel />` — tavsiya etilgan avtomobillar

## Layout ko'rsatmalari

- Katalog grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Tafsilot layout: `grid grid-cols-1 lg:grid-cols-12 gap-8`
- Galereya: `lg:col-span-7`, ma'lumot: `lg:col-span-5`
- Rasm nisbati: `aspect-[16/9]`
- Kichik rasm: `w-20 h-16 rounded-lg overflow-hidden`
- Xulosa kartasi: `sticky top-24`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
