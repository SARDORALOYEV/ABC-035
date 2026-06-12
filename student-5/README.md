# Student 5 - Sevimlilar va kolleksiyalar

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `07_favorites_new.jpg` / `07_favorites_new_768.jpg` | Yangi avtomobillar sevimlilar sahifasi |
| `07_favorites_used.jpg` / `07_favorites_used_768.jpg` | Ishlatilgan avtomobillar sevimlilar sahifasi |
| `07_favorites_taxi.jpg` | Taksi avtomobillari sevimlilar sahifasi |
| `25_our_collections.jpg` | Kolleksiyalar sahifasi |
| `26_collection_detail.jpg` | Kolleksiya tafsilot sahifasi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<FavoritesPage />` — sevimlilar sahifasi
- `<FavCard />` — sevimli avtomobil kartasi (o'chirish tugmasi bilan)
- `<FavoritesGrid />` — sevimlilar tarmog'i
- `<CollectionsPage />` — kolleksiyalar sahifasi
- `<CollectionCard />` — kolleksiya kartasi
- `<CollectionDetailPage />` — kolleksiya tafsilot sahifasi
- `<DashboardStats />` — statistika kartalari (agar dashboardda bo'lsa)

## Layout ko'rsatmalari

- Sevimlilar grid: `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6`
- Karta: `bg-white rounded-2xl border border-gray-100 overflow-hidden`
- Rasm nisbati: `aspect-[4/3]`
- O'chirish tugmasi: `btn btn-ghost btn-sm text-red-500`
- Kolleksiyalar grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
