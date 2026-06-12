# Asadbek uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `ImageUploadZone.jsx`
- `PricingAndSubmitForm.jsx`

## UI/UX Yo'riqnomasi:

### ImageUploadZone.jsx
**Referans:** `assets/06_insurance.jpg`, `assets/06_insurance_768.jpg`, `assets/19_about.jpg`, `assets/20_service_center.jpg`, `assets/23_contacts.jpg`

Rasm yuklash zonasi. Tarkibi:
- Sarlavha: "Rasmlarni yuklash" (`font-bold`, `text-sm`, `mb-4`)
- Yuklash zonasi:
  - Punktir chegara (`border-2 border-dashed border-gray-300`, `rounded-xl`, `p-8`)
  - Markazda yuklash ikonkasi (`w-10 h-10`, `text-gray-300`)
  - Matn: "Rasmlarni bu yerga tashlang" (`text-sm`, `font-medium`)
  - "yoki kompyuterdan tanlang" (`text-xs`, `text-slate-400`)
  - `hover:border-red-400`, `cursor-pointer`
  - `flex flex-col items-center justify-center`
- Yuklangan rasmlar preview:
  - 3 ta thumbnail (`w-20 h-20`, `bg-gray-100`, `rounded-lg`, `overflow-hidden`)
  - Har birida "X" o'chirish tugmasi (`top-0.5 right-0.5`, `w-5 h-5`, `bg-black/50`, `rounded-full`)
  - `opacity-0 group-hover:opacity-100`
- Qo'shimcha yuklash "+" kartasi (`border-2 border-dashed`, `w-20 h-20`, `flex items-center justify-center`)
- `flex gap-2 flex-wrap`, `mt-3`
- Karta: `bg-white`, `border`, `rounded-xl`, `p-5`

### PricingAndSubmitForm.jsx
Narx va joylash formasi. Tarkibi:
- Sarlavha: "Narx va joylash"
- Forma maydonlari:
  - **Narx**: input + valyuta select (So'm/$/€) — `flex items-center gap-2`
  - **Shahar**: select (Moskva, Sant Peterburg, Toshkent)
  - **Telefon raqam**: input (placeholder: "+7 (---) --- -- --")
  - **Qo'shimcha ma'lumot**: textarea (`h-20`, `resize-none`)
- Tugma: "E'lonni joylash" — `w-full`, `bg-red-600`, `text-white`, `text-sm`, `font-bold`, `py-3`, `rounded-lg`
- `space-y-3`
- Karta: `bg-white`, `border`, `rounded-xl`, `p-5`, `mt-3`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Insurance | **Страхование** |
| About | **О компании** |
| ServiceCenter | **Сервисный центр** |
| Contacts | **Контакты** |
| ImageUploadZone | **Зона загрузки изображений** |
| PricingAndSubmitForm | **Форма цены и публикации** |

ImageUploadZone va PricingAndSubmitForm komponentlaringiz Страхование (Insurance), О компании (About), Сервисный центр (ServiceCenter) va Контакты (Contacts) sahifalaridagi forma elementlariga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
