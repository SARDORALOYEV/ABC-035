# Mansur uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 2 ta komponent tayyor holda ochilgan:
- `FormStepper.jsx`
- `VehicleBasicInfoForm.jsx`

## UI/UX Yo'riqnomasi:

### FormStepper.jsx
**Referans:** `assets/modal_book_car_online.jpg`, `assets/modal_calculate_credit.jpg`, `assets/modal_callback.jpg`, `assets/modal_express_credit.jpg`, `assets/modal_fix_discount.jpg`, `assets/modal_get_offer.jpg`, `assets/modal_how_to_find_us.jpg`, `assets/modal_installment.jpg`, `assets/modal_thank_you.jpg`, `assets/modal_trade_in.jpg`

Ko'p bosqichli forma stepperi. Tarkibi:
- 3 qadam:
  1. "Avtomobil" — tugallangan (done): `bg-green-500`, `border-green-500`, ichida check belgisi
  2. "Ma'lumotlar" — faol (active): `bg-red-600`, `border-red-600`, ichida "2" raqami
  3. "Rasmlar va narx" — kutilayotgan (pending): `border-gray-300`, `text-slate-400`, ichida "3" raqami
- Har bir qadam: doira (`w-9 h-9`, `rounded-full`, `flex items-center justify-center`, `text-xs`, `font-bold`, `border-2`)
- Pastda label: `text-[10px]`, `mt-1`, faol bo'lsa `text-slate-900`, aks holda `text-slate-400`
- Qadamlar orasida chiziqcha: `w-16 h-0.5`, `mx-2`, `mb-4`, tugallangan bo'lsa `bg-green-500`
- `flex items-center justify-center`

### VehicleBasicInfoForm.jsx
Avtomobil ma'lumot formasi. Tarkibi:
- Sarlavha: "Avtomobil haqida ma'lumot"
- Grid layout (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3`)
- 6 ta maydon:
  1. Yil (select: 2024, 2023, 2022, 2021)
  2. Marka (select: BMW, Mercedes-Benz, Audi, Toyota)
  3. Model (select: X5, X3, 5 Series, 3 Series)
  4. Yurgan masofasi (input, placeholder: "Masalan: 15000")
  5. Dvigatel (select: 3.0L Benz, 2.0L Dizel, Elektro)
  6. Uzatma qutisi (select: Avtomat, Mexanik, Robot)
- Har bir maydonda label (`text-xs`, `font-medium`, `text-slate-600`, `mb-1 block`)
- Input/select: `w-full`, `text-xs`, `border`, `rounded-lg`, `px-3 py-2.5`, `focus:border-red-400`
- Pastki qism: "Ortga" tugmasi (chap) va "Keyingi qadam" tugmasi (o'ng, qizil fon)
- `border-t`, `pt-4`, `flex items-center justify-between`
- Karta: `bg-white`, `border`, `rounded-xl`, `p-5`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Modal (Book Car Online) | **Забронировать онлайн** |
| Modal (Calculate Credit) | **Рассчитать кредит** |
| Modal (Callback) | **Заказать звонок** |
| Modal (Express Credit) | **Экспресс-кредит** |
| Modal (Fix Discount) | **Фиксированная скидка** |
| Modal (Get Offer) | **Получить предложение** |
| Modal (How to Find Us) | **Как к нам проехать** |
| Modal (Installment) | **Рассрочка** |
| Modal (Thank You) | **Спасибо** |
| Modal (Trade-In) | **Трейд-ин** |
| FormStepper | **Степер формы (шаги)** |
| VehicleBasicInfoForm | **Форма основной информации об авто** |

FormStepper va VehicleBasicInfoForm komponentlaringiz Figmadagi modal oynalar ichidagi forma elementlariga mos keladi. FormStepper — qadamlarni ko'rsatuvchi steper, VehicleBasicInfoForm — avtomobil ma'lumotlarini kiritish formasi.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
