# Student 7 - Kredit va moliya sahifalari

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `10_credit_installment.jpg` | Kredit va to'lov sahifasi (asosiy) |
| `11_express_credit.jpg` / `11_express_credit_768.jpg` | Ekspress kredit sahifasi |
| `16_installment.jpg` | Bo'lib to'lash shartlari sahifasi |
| `18_taxi_credit.jpg` | Taksi krediti sahifasi |
| `18_taxi_credit_detail.jpg` | Taksi krediti tafsilot sahifasi |
| `31_model_credit.jpg` | Model uchun kredit kalkulyator sahifasi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<CreditInstallmentPage />` — kredit va to'lov sahifasi
- `<ExpressCreditPage />` — ekspress kredit sahifasi (forma bilan)
- `<InstallmentPage />` — bo'lib to'lash shartlari
- `<TaxiCreditPage />` — taksi krediti sahifasi
- `<TaxiCreditDetailPage />` — taksi krediti tafsilot
- `<ModelCreditPage />` — model kredit kalkulyatori
- `<CreditCard />` — kredit taklifi kartasi
- `<InputField />` — forma inputi
- `<SelectField />` — ochiladigan menyu
- `<SubmitButton />` — yuborish tugmasi

## Layout ko'rsatmalari

- Kredit kartalari: `grid grid-cols-1 md:grid-cols-3 gap-8`
- Karta: `bg-white rounded-2xl shadow-sm border border-gray-100 p-6`
- Narx: `text-3xl font-bold text-primary`
- Forma: `max-w-2xl mx-auto` bilan `space-y-4`
- Tafsilot jadvali: `flex justify-between py-3 border-b border-gray-100`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
