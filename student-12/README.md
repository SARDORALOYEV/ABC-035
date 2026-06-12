# Student 12 - Solishtirish va 404 sahifalar

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `28_comparison_new.jpg` | Yangi avtomobillarni solishtirish sahifasi |
| `28_comparison_taxi.jpg` | Taksi avtomobillarini solishtirish sahifasi |
| `27_404.jpg` | 404 xato sahifasi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<CompareNewPage />` — yangi avtomobillarni solishtirish
- `<CompareTaxiPage />` — taksi avtomobillarini solishtirish
- `<CompareTable />` — solishtirish jadvali
- `<CompareRow />` — solishtirish qatori
- `<VehicleCompareHeader />` — avtomobil ustun sarlavhasi
- `<FeatureCheck />` — belgi (✓) yoki (✕) ikonkasi
- `<CompareCta />` — avtomobil qo'shish placeholderi
- `<ErrorPage />` — 404 xato sahifasi

## Layout ko'rsatmalari

- Jadval: `overflow-x-auto rounded-2xl bg-white border border-gray-100 shadow-sm`
- Jadval sarlavhasi: `min-w-[150px]` yorliq, `min-w-[200px]` avtomobil
- Rasm: `aspect-[4/3] max-w-[180px] mx-auto`
- Qatorlar: `even:bg-gray-50/50`
- 404: `min-h-screen flex items-center justify-center`
- 404 kod: `text-8xl md:text-9xl font-bold text-gray-200`
- 404 havola: `btn btn-primary mt-6 rounded-xl`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
