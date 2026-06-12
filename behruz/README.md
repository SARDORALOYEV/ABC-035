# Behruz uchun React UI Topshirig'i

## Tayyor Komponentlar:
Sizning papkangizda 1 ta komponent tayyor holda ochilgan:
- `FilterSidebar.jsx`

## UI/UX Yo'riqnomasi:

### FilterSidebar.jsx
**Referans:** `assets/03_brand.jpg`, `assets/03_brand_768.jpg`, `assets/04_model.jpg`, `assets/04_model_768.jpg`, `assets/05_trim.jpg`, `assets/05_trim_768.jpg`

Katalog/Brend/Model/Trim sahifalari uchun filtr paneli. Tarkibi:
- Sarlavha: **FILTR** (font-bold, text-sm)
- **Brend** bo'limi: checkbox + label (BMW, Mercedes-Benz, Audi, Toyota). Pastga ochiladigan iconka.
- **Narx** bo'limi: range slider (input range), pastda minimal va maksimal narx ("0 so'm" — "100 000 so'm")
- **Dvigatel** bo'limi: checkbox (Benz, Dizel, Elektro, Gibrid)
- Pastki tugmalar:
  - "Natijalarni ko'rish" — qizil fon (`bg-red-600`), oq matn, `flex-1`
  - "Tozalash" — border, `text-slate-500`
- Panel `w-72`, oq fon, `border`, `rounded-xl`, `p-5`, `shrink-0`
- Har bir bo'lim `mb-5` bo'shliq bilan
- Checkboxlar: `w-4 h-4 rounded border-gray-300`

## Figma'dan Topish (Русский):

Figma dizaynida quyidagi sahifalarni qidiring:

| Sahifa | Figma nomi (Русский) |
|---|---|
| Brand | **Марка** |
| Model | **Модель** |
| Trim | **Комплектация** |
| FilterSidebar | **Фильтр (боковая панель фильтрации)** |

FilterSidebar komponentingiz Brand (Марка), Model (Модель) va Trim (Комплектация) sahifalaridagi chap filtr paneliga mos keladi. Figmada ushbu 3 sahifadagi bir xil filtr panelini ko'rasiz.

**MUHIM OGOHLANTIRISH:** Hech qanday JavaScript kodi, `useState` hooklari yoki dynamic funksiyalar yozilmasin. Faqat Tailwind CSS klasslari orqali UI dizaynni 1:1 chiqaring.
