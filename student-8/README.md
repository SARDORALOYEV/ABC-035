# Student 8 - Sug'urta, Servis, Kontakt va Biz haqimizda

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `06_insurance.jpg` / `06_insurance_768.jpg` | Sug'urta sahifasi (OSAGO/KASKO) |
| `19_about.jpg` | Biz haqimizda sahifasi |
| `20_service_center.jpg` | Servis markazi sahifasi |
| `23_contacts.jpg` | Kontakt sahifasi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<InsurancePage />` — sug'urta sahifasi
- `<AboutPage />` — biz haqimizda sahifasi
- `<ServiceCenterPage />` — servis markazi sahifasi
- `<ContactsPage />` — kontakt sahifasi (forma bilan)
- `<AboutHero />` — "Biz haqimizda" hero bo'limi
- `<ValueCard />` — kompaniya qiymatlari kartasi
- `<StatCounter />` — statistika ko'rsatkichi
- `<SellerCard />` — sotuvchi kartasi (agar kontakda bo'lsa)
- `<WhatsAppLink />` — WhatsApp havola tugmasi
- `<InputField />` — forma inputi
- `<TextArea />` — matn maydoni

## Layout ko'rsatmalari

- Sug'urta: `grid grid-cols-1 md:grid-cols-2 gap-8`
- About hero: `bg-gradient-to-br from-primary/10 py-16 md:py-24`
- Statistika: `grid grid-cols-2 md:grid-cols-4 gap-6`
- Servis: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Kontakt: `grid grid-cols-1 lg:grid-cols-2 gap-10`
- Xarita: `aspect-[16/9] bg-gray-100 rounded-2xl`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
