# Student 9 - Avtomobil tanlash ustasi (Car Selection Wizard)

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `24_car_selection_new.jpg` | Yangi avtomobil tanlash bosqichi |
| `24_car_selection_used.jpg` | Ishlatilgan avtomobil tanlash bosqichi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<CarSelectionNewPage />` — yangi avtomobil tanlash
- `<CarSelectionUsedPage />` — ishlatilgan avtomobil tanlash
- `<ProgressStepper />` — bosqich ko'rsatkichi (1-2-3-4)
- `<StepContainer />` — bosqich o'rami
- `<ConditionToggle />` — Yangi/Ishlatilgan almashtirish
- `<BrandGrid />` — brendlar tarmog'i
- `<ModelCard />` — model kartasi
- `<TrimSelector />` — komplektatsiya tanlash
- `<FormSection />` — forma qismi

## Layout ko'rsatmalari

- Stepper: `flex items-center justify-center gap-0 mb-10`
- Bosqich doirasi: `w-10 h-10 rounded-full flex items-center justify-center`
- Brend grid: `grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`
- Model grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Toggle: `flex bg-gray-100 rounded-xl p-1 w-fit`
- Navigatsiya: `flex items-center justify-between mt-8`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
