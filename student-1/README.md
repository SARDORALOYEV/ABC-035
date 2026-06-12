# Student 1 - Bosh sahifa (Homepage)

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `01_home.jpg` / `01_home_768.jpg` | To'liq bosh sahifa — hero banner, xizmatlar bo'limi |

**Navigatsiya paneli (Navbar) allaqachon tayyor.** Siz faqat bosh sahifa kontenti bilan ishlaysiz.

## Vazifa: Quyidagi React komponentlarini yarating

- `<HeroBanner />` — bosh sahifadagi katta banner (sarlavha, matn, CTA tugmalari)
- `<ServicesSection />` — xizmatlar bo'limi (kartalar tarmog'i)
- `<HomePage />` — bosh sahifani yig'uvchi asosiy komponent

## Layout ko'rsatmalari

- Hero: `relative min-h-[600px] flex items-center justify-center` gradient fon bilan
- Sarlavha: `text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center`
- Xizmatlar: `grid grid-cols-1 md:grid-cols-3 gap-8`
- Karta: `bg-white rounded-2xl shadow-sm border border-gray-100 p-6`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
