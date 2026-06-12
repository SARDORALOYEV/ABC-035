# Student 10 - Sharhlar, Blog va Maqolalar

## Sizga berilgan sahifalar

| Fayl | Tavsifi |
|------|---------|
| `21_reviews.jpg` | Sharhlar sahifasi |
| `22_review_detail.jpg` | Sharh tafsilot sahifasi |
| `29_blog.jpg` | Blog/Jurnal feed sahifasi |
| `30_article.jpg` / `30_article_768.jpg` | Maqola tafsilot sahifasi |

## Vazifa: Quyidagi React komponentlarini yarating

- `<ReviewsPage />` — sharhlar sahifasi
- `<ReviewDetailPage />` — sharh tafsilot
- `<BlogPage />` — blog feed sahifasi
- `<ArticlePage />` — maqola tafsilot sahifasi
- `<BlogHero />` — tanlangan maqola hero
- `<ArticleCard />` — maqola kartasi
- `<CategoryBadge />` — kategoriya badge'i
- `<AuthorRow />` — muallif qatori
- `<ArticleBody />` — maqola matni (prose uslubida)
- `<ShareButtons />` — ijtimoiy tarmoqlarda ulashish
- `<RelatedArticles />` — tegishli maqolalar
- `<ReviewCard />` — sharh kartasi
- `<StarRating />` — yulduz bahosi

## Layout ko'rsatmalari

- Blog feed: `max-w-7xl mx-auto px-4 py-8 space-y-10`
- Blog hero: `relative h-[400px] md:h-[480px] rounded-3xl overflow-hidden`
- Maqola grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Maqola tanasi: `max-w-3xl mx-auto prose prose-gray`
- Sharh kartasi: `bg-white rounded-2xl border border-gray-100 p-6`
- Yulduzlar: `flex gap-0.5 text-yellow-400`

**MUHIM: Faqat JSX va Tailwind CSS. Hech qanday JavaScript mantiqi, useState, useEffect, onClick, API yozmang.**
