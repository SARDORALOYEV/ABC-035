import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      {/* TOP UTILITY BAR */}
      <div className="bg-slate-100 px-4 md:px-8">
        <div className="flex items-center justify-between h-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[13px] text-gray-400">Россия, Москва, 38КМ МКАД, 6Бс1</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[13px] text-gray-400">Время работы: с 08:00 до 21:00</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-[13px] text-slate-700 underline">Whatsapp</span>
          </div>
        </div>
      </div>

      {/* MAIN BRAND BAR */}
      <div className="bg-white px-4 md:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-3">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center">
            <button className="mr-3">
              <svg className="w-6 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2.5">
              {/* Logo emblem */}
              <div className="relative w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4L4 20h16L12 4z" fill="white" />
                  <path d="M12 4L4 20h6l2-8 2 8h6L12 4z" fill="#dc2626" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-slate-900 tracking-tight leading-none">ABC AUTO</span>
                <span className="text-[10px] text-gray-400 leading-tight">Официальный дилер</span>
              </div>
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="hidden lg:flex items-center">
            <div className="h-8 border-l border-gray-300 mx-4" />
            <div className="flex items-start gap-2">
              <span className="bg-red-600 px-2 py-0.5 rounded text-white font-bold text-xs leading-none mt-0.5">10 лет</span>
              <div className="text-[11px] font-semibold text-slate-700 leading-tight">
                превосходим<br />ваши ожидания
              </div>
            </div>
          </div>

          {/* Middle Links */}
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/catalog" className="text-red-500 font-medium text-xs">Подбор авто</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 text-xs">О компании</Link>
            <Link to="/service-center" className="text-slate-600 hover:text-slate-900 text-xs">Техцентр</Link>
            <Link to="/reviews" className="text-slate-600 hover:text-slate-900 text-xs">Отзывы</Link>
            <Link to="/contacts" className="text-slate-600 hover:text-slate-900 text-xs">Контакты</Link>
          </div>

          {/* Right: Phone + CTA */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white p-2 rounded-full flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 leading-none">+7 (800) 551-94-31</span>
                <span className="text-xs text-slate-500 mt-0.5">+7 (495) 292-18-67</span>
              </div>
            </div>
            <button className="bg-[#c40000] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-lg hover:bg-red-800 transition-colors whitespace-nowrap">
              ОБРАТНЫЙ ЗВОНОК
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="bg-white px-4 md:px-8 border-t border-gray-100">
        <div className="flex items-center justify-between max-w-7xl mx-auto h-11">
          <nav className="flex items-center gap-6">
            <Link to="/catalog" className="flex items-center gap-1 text-slate-950 font-bold text-xs tracking-wide">
              КАТАЛОГ АВТО
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link to="/used-cars" className="flex items-center gap-1 text-slate-950 font-bold text-xs tracking-wide">
              АВТО С ПРОБЕГОМ
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link to="/credit-installment" className="flex items-center gap-1 text-slate-950 font-bold text-xs tracking-wide">
              КРЕДИТ И РАССРОЧКА
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link to="/special-offers" className="flex items-center gap-1 text-slate-950 font-bold text-xs tracking-wide">
              СПЕЦПРЕДЛОЖЕНИЯ
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link to="/taxi-credit" className="text-slate-950 font-bold text-xs tracking-wide">
              ТАКСИ В КРЕДИТ
            </Link>
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center gap-4">
            <Link to="/favorites" className="relative">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">10</span>
            </Link>
            <Link to="/comparison-new" className="relative">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">12</span>
            </Link>
            <button>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
