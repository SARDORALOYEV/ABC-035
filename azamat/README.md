# Azamat uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `AuthModal.jsx`
- `DashboardSidebar.jsx`

## UI/UX Yo'riqnomasi:

### AuthModal.jsx
**Referans:** `assets/10_credit_installment.jpg`, `assets/11_express_credit.jpg`, `assets/11_express_credit_768.jpg`, `assets/16_installment.jpg`, `assets/18_taxi_credit.jpg`, `assets/18_taxi_credit_detail.jpg`, `assets/31_model_credit.jpg`

Kirish/ro'yxatdan o'tish modali. Tarkibi:
- Modal ustiga qora fon (`fixed inset-0`, `z-50`, `bg-black/40`)
- Modal oyna: `bg-white`, `rounded-2xl`, `w-full max-w-md`, `p-6`, `mx-4`
- Yopish tugmasi: yuqori o'ng burchakda, `w-8 h-8`, `bg-gray-100`, `rounded-full`, X ikonkasi
- Tablar:
  - "Kirish" — faol, `text-red-600`, `border-b-2 border-red-600`
  - "Ro'yxatdan o'tish" — nofaol, `text-slate-500`
- Forma maydonlari:
  - Email inputi
  - Parol inputi (`type="password"`)
  - "Kirish" tugmasi (`bg-red-600`, `text-white`, `w-full`)
- "yoki" divider (`flex items-center gap-3`, `h-px bg-gray-200`)
- Ijtimoiy tarmoq tugmalari:
  - Google (ikonka + matn, `border`, `rounded-lg`)
  - Apple (ikonka + matn, `border`, `rounded-lg`)
- `space-y-3`, `grid grid-cols-2 gap-2`

### DashboardSidebar.jsx
Foydalanuvchi paneli sidebar. Tarkibi:
- 4 ta link:
  1. "Mening e'lonlarim" — faol (`bg-red-600`, `text-white`)
  2. "Sevimlilar" — `text-slate-600`, `hover:bg-gray-50`
  3. "Sozlamalar"
  4. "Chiqish"
- Har bir link: ikonka (svg, `w-4 h-4`) + label
- `flex items-center gap-2.5`, `px-3 py-2.5`, `rounded-lg`, `text-xs`, `font-medium`
- Sidebar: `w-56`, `bg-white`, `border`, `rounded-xl`, `p-3`, `shrink-0`
- `space-y-1`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| CreditInstallment | **Кредит и рассрочка** |
| ExpressCredit | **Экспресс-кредит** |
| Installment | **Рассрочка** |
| TaxiCredit | **Кредит на такси** |
| TaxiCreditDetail | **Детальная страница кредита на такси** |
| ModelCredit | **Кредит на модель** |
| AuthModal | **Модальное окно авторизации** |
| DashboardSidebar | **Боковая панель личного кабинета** |

AuthModal va DashboardSidebar komponentlaringiz kredit sahifalaridagi modal oyna va shaxsiy kabinet paneliga mos keladi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
