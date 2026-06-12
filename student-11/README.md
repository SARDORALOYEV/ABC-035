# Student 11 - Modal oynalar (Auth, Callback, Booking va h.k.)

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `modal_book_car_online.jpg` | Avtomobilni bron qilish oynasi |
| `modal_calculate_credit.jpg` | Kredit hisoblash oynasi |
| `modal_callback.jpg` | Qayta qo'ng'iroq so'rovi oynasi |
| `modal_express_credit.jpg` | Ekspress kredit oynasi |
| `modal_fix_discount.jpg` | Ruxsat etilgan chegirma oynasi |
| `modal_get_offer.jpg` | Taklif olish oynasi |
| `modal_how_to_find_us.jpg` | Bizni qanday topish mumkin oynasi |
| `modal_installment.jpg` | Bo'lib to'lash oynasi |
| `modal_thank_you.jpg` | Rahmat sahifasi oynasi |
| `modal_trade_in.jpg` | Trade-in so'rovi oynasi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<AuthModal />` — kirish/ro'yxatdan o'tish oynasi
- `<AuthTabToggle />` — Kirish / Ro'yxatdan o'tish yorliqlari
- `<SocialAuthGrid />` — ijtimoiy tarmoqlar auth tugmalari
- `<PasswordInput />` — parol inputi (ko'rsatish/yashirish)
- `<CallbackModal />` — qayta qo'ng'iroq oynasi
- `<BookCarModal />` — avtomobil bron qilish oynasi
- `<CalculateCreditModal />` — kredit hisoblash oynasi
- `<ExpressCreditModal />` — ekspress kredit oynasi
- `<FixDiscountModal />` — chegirma oynasi
- `<GetOfferModal />` — taklif olish oynasi
- `<HowToFindUsModal />` — manzil oynasi
- `<InstallmentModal />` — bo'lib to'lash oynasi
- `<ThankYouModal />` — rahmat oynasi
- `<TradeInModal />` — trade-in oynasi

## Layout ko'rsatmalari

- Modal qoplamasi: `fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`
- Modal karta: `bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 space-y-6`
- Yorliqlar: `flex bg-gray-100 rounded-xl p-1 w-full`
- Inputlar: `input input-bordered w-full rounded-xl`
- Yopish tugmasi: `absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
