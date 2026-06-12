# Baxrom uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `SellerCard.jsx`
- `ContactForm.jsx`

## UI/UX Yo'riqnomasi:

### SellerCard.jsx
**Referans:** `assets/02_catalog.jpg`, `assets/02_catalog_768.jpg`

Sotuvchi ma'lumot kartasi. Tarkibi:
- Avatar: `w-12 h-12`, `bg-gray-200`, `rounded-full`, ichida "AV" bosh harflar
- Sotuvchi ismi: "Aleksandr V." (`text-sm`, `font-bold`)
- "Sayohat: 2020" (`text-[11px]`, `text-slate-400`)
- Yulduzcha reyting: 5 tadan 4 ta to'ldirilgan yulduz (`text-yellow-400`), 1 ta bo'sh (`text-gray-200`)
- Tugma: "Barcha e'lonlarni ko'rish" (`w-full`, `bg-gray-50`, `border`, `rounded-lg`, `py-2`, `hover:bg-gray-100`)
- Karta: `bg-white`, `border`, `rounded-xl`, `p-4`
- `flex items-center gap-3` (avatar va ism qismi)

### ContactForm.jsx
Sotuvchiga xabar yuborish formasi. Tarkibi:
- Sarlavha: "Sotuvchiga xabar" (`text-sm`, `font-bold`, `mb-3`)
- Input maydonlari:
  - Ismingiz (`text-xs`, `border`, `rounded-lg`, `px-3 py-2.5`)
  - Telefon raqamingiz
  - Xabar matni (textarea, `h-20`, `resize-none`)
- Tugmalar:
  - "Yuborish" — qizil fon (`bg-red-600`), oq matn, `w-full`
  - "WhatsApp" — yashil fon (`bg-green-500`), oq matn, WhatsApp ikonkasi bilan
- `space-y-2.5`
- Karta: `bg-white`, `border`, `rounded-xl`, `p-4`, `mt-3`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Catalog | **Каталог** |
| SellerCard | **Карточка продавца** |
| ContactForm | **Форма связи с продавцом** |

SellerCard va ContactForm komponentlaringiz Catalog (Каталог) sahifasidagi avtomobil detail kartasidagi sotuvchi blokiga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
