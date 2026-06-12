# Student 3 - Brend / Model / Komplektatsiya sahifalari

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `03_brand.jpg` / `03_brand_768.jpg` | Brend tanlash sahifasi |
| `04_model.jpg` / `04_model_768.jpg` | Model tanlash sahifasi |
| `05_trim.jpg` / `05_trim_768.jpg` | Komplektatsiya tanlash sahifasi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<BrandPage />` — brendlar tarmog'i sahifasi
- `<BrandCard />` — brend logotipi + nom kartasi
- `<ModelPage />` — modellar tarmog'i sahifasi
- `<ModelCard />` — model rasmi + nom kartasi
- `<TrimPage />` — komplektatsiyalar sahifasi
- `<TrimCard />` — komplektatsiya kartasi (xususiyatlar ro'yxati bilan)
- `<FeatureList />` — belgi/chaplar bilan xususiyatlar ro'yxati

## Layout ko'rsatmalari

- Brend tarmog'i: `grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`
- Model tarmog'i: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Trim kartasi: `bg-white rounded-2xl border border-gray-100 p-5 space-y-3`
- Karta hover: `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
