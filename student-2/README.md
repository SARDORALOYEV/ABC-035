# Student 2 - Katalog sahifasi (Catalog)

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `02_catalog.jpg` / `02_catalog_768.jpg` | To'liq katalog sahifasi — filtr paneli + avtomobillar tarmog'i |

## Vazifa: Quyidagi React komponentlarini yarating

- `<CatalogPage />` — asosiy katalog sahifasi (filtr + grid)
- `<FilterSidebar />` — chap tomondagi filtr paneli
- `<FilterGroup />` — akkordeon uslubidagi filtr guruhi
- `<CheckboxFilter />` — maxsus checkbox input
- `<RangeSlider />` — narx oralig'i vizuali (soxta, JS yo'q)
- `<BadgeTag />` — son ko'rsatkichli pill
- `<VehicleGrid />` — avtomobillar tarmog'i
- `<VehicleCard />` — bitta avtomobil kartasi
- `<SpecIcon />` — xususiyat ikonkasi
- `<PriceTag />` — narx ko'rinishi
- `<ConditionBadge />` — holat badge'i
- `<FavButton />` — sevimlilar yurak tugmasi
- `<Pagination />` — sahifalar navigatsiyasi

## Layout ko'rsatmalari

- Asosiy layout: `<div className="flex gap-8">` — sidebar `w-72 shrink-0` + grid `flex-1`
- Sidebar: `sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto`
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`
- Karta: `bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
