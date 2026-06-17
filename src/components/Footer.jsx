const Footer = () => {
  const brandLinks = [
    'Kia', 'Hyundai', 'Skoda', 'Volkswagen', 'Toyota',
    'Brilliance', 'Changan', 'Chery', 'Citroen', 'Datsun',
    'Derways', 'Exeed', 'FAW', 'Ford', 'Foton', 'Geely',
    'Great Wall', 'Haval', 'Honda', 'Infiniti', 'Jaguar',
    'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lifan', 'Mazda',
    'Mercedes-Benz', 'MINI', 'Mitsubishi', 'Nissan', 'Opel',
    'Peugeot', 'Porsche', 'Renault', 'Skoda', 'SsangYong',
  ]

  const sitemapLinks = [
    'Ravon', 'Renault', 'SsangYong', 'Suzuki', 'UAZ', 'Zotye',
  ]

  const creditLinks = [
    'Экспресс-кредит',
    'Семейный автомобиль',
    'Первый автомобиль',
    'Работникам медицины',
    'Рассрочка',
  ]

  const seoModels = [
    {
      brand: 'KIA',
      models: ['Picanto', 'Sorento', 'Rio X-Line', 'Optima'],
    },
    {
      brand: 'HYUNDAI',
      models: ['i30', 'Solaris', 'Santa Fe', 'Tucson'],
    },
    {
      brand: 'SKODA',
      models: ['Octavia', 'Kodiaq', 'Rapid', 'Karoq'],
    },
    {
      brand: 'VOLKSWAGEN',
      models: ['Golf', 'Polo', 'Passat', 'Tiguan'],
    },
    {
      brand: 'АВТО ПОД ТАКСИ',
      models: ['Kia Rio', 'Hyundai Solaris', 'Skoda Rapid', 'Volkswagen Polo'],
    },
  ]

  return (
    <footer className="bg-[#151515] text-white">
      {/* TOP ROW LINKS */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-start lg:justify-between h-auto lg:h-14 py-3 lg:py-0 overflow-x-auto gap-4 lg:gap-6 text-[13px] font-semibold tracking-wider text-white/80">
            <a href="#" className="hover:text-red-500 whitespace-nowrap transition">КАТАЛОГ АВТО</a>
            <a href="#" className="hover:text-red-500 whitespace-nowrap transition">АВТО С ПРОБЕГОМ</a>
            <a href="#" className="hover:text-red-500 whitespace-nowrap transition">КРЕДИТ И РАССРОЧКА</a>
            <a href="#" className="hover:text-red-500 whitespace-nowrap transition">СПЕЦПРЕДЛОЖЕНИЯ</a>
            <a href="#" className="hover:text-red-500 whitespace-nowrap transition">ТАКСИ В КРЕДИТ</a>
          </div>
        </div>
      </div>

      {/* MAIN MULTI-COLUMN GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 — Каталог авто */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white/50 mb-4">КАТАЛОГ АВТО</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {brandLinks.map((link, i) => (
                <a key={i} href="#" className="text-[13px] text-slate-400 hover:text-white transition">{link}</a>
              ))}
            </div>
          </div>

          {/* Column 2 — Карта сайта */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white/50 mb-4">КАРТА САЙТА</h4>
            <div className="space-y-2">
              {sitemapLinks.map((link, i) => (
                <a key={i} href="#" className="block text-[13px] text-slate-400 hover:text-white transition">{link}</a>
              ))}
            </div>
          </div>

          {/* Column 3 — Кредит и рассрочка */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white/50 mb-4">КРЕДИТ И РАССРОЧКА</h4>
            <div className="space-y-2">
              {creditLinks.map((link, i) => (
                <a key={i} href="#" className="block text-[13px] text-red-400 hover:text-red-300 transition">{link}</a>
              ))}
              <a href="#" className="block text-[13px] text-red-400 font-semibold hover:text-red-300 transition mt-3">Trade-in</a>
            </div>
          </div>

          {/* Column 4 — Контакты */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white/50 mb-4">КОНТАКТЫ</h4>
            <div className="space-y-3">
              <a href="tel:+78005519431" className="flex items-start gap-2.5 text-[13px] text-slate-300 hover:text-white transition">
                <svg className="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+7 (800) 551-94-31</span>
              </a>
              <a href="tel:+74952921867" className="flex items-start gap-2.5 text-[13px] text-slate-300 hover:text-white transition">
                <svg className="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+7 (495) 292-18-67</span>
              </a>
              <div className="flex items-start gap-2.5 text-[13px] text-slate-300">
                <svg className="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Россия, Москва, 38КМ МКАД, блд. 61с1</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] text-slate-300">
                <svg className="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ежедневно с 08:00 до 21:30</span>
              </div>
            </div>

            {/* City dropdown */}
            <div className="mt-5">
              <div className="flex items-center gap-2 border border-white/20 rounded-lg px-3 py-2 w-fit">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[13px] text-slate-300">Москва</span>
                <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT & LEGAL MID-BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left — Copyright */}
            <div>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                &copy; 2021 Автосалон &laquo;ABC AUTO&raquo;. Официальный дилер
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-2 text-[12px] text-slate-500">
                <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
                <span className="hidden sm:block w-px h-3 bg-white/10" />
                <a href="#" className="hover:text-white transition">Карта сайта</a>
              </div>
            </div>

            {/* Middle — Disclaimer */}
            <div className="lg:col-span-1">
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Обращаем Ваше внимание на то, что данный интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Для получения подробной информации о стоимости автомобилей, пожалуйста, обращайтесь к менеджерам отдела продаж.
              </p>
            </div>

            {/* Right — Yandex Badge */}
            <div className="lg:justify-self-end">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2.5">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] font-bold text-black">Я</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">&#9733;</span>
                    <span className="text-yellow-400 text-sm">&#9733;</span>
                    <span className="text-yellow-400 text-sm">&#9733;</span>
                    <span className="text-yellow-400 text-sm">&#9733;</span>
                    <span className="text-yellow-400 text-sm">&#9733;</span>
                    <span className="text-[13px] font-bold text-white ml-1">5,0</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">Репутация организации в Яндексе</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM AUTO SEO MATRIX GRID */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {seoModels.map((group, i) => (
              <div key={i}>
                <h5 className="text-[11px] font-bold tracking-wider text-white/60 mb-3">{group.brand}</h5>
                <ul className="space-y-1.5">
                  {group.models.map((model, j) => (
                    <li key={j}>
                      <a href="#" className="text-[12px] text-slate-500 hover:text-white transition">{group.brand === 'АВТО ПОД ТАКСИ' ? model : `${group.brand} ${model}`}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
