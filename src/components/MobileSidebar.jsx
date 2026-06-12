import { Link } from 'react-router-dom'

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-50 bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Close button + Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
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
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Navigation Links */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
          <nav className="px-4 py-4 space-y-1">
            <Link
              to="/catalog"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors"
            >
              Подбор авто
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              О компании
            </Link>
            <Link
              to="/service-center"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Техцентр
            </Link>
            <Link
              to="/reviews"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Отзывы
            </Link>
            <Link
              to="/contacts"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Контакты
            </Link>

            <hr className="my-3 border-gray-200" />

            <Link
              to="/catalog"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              КАТАЛОГ АВТО
            </Link>
            <Link
              to="/used-cars"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              АВТО С ПРОБЕГОМ
            </Link>
            <Link
              to="/credit-installment"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              КРЕДИТ И РАССРОЧКА
            </Link>
            <Link
              to="/special-offers"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              СПЕЦПРЕДЛОЖЕНИЯ
            </Link>
            <Link
              to="/taxi-credit"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg text-slate-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              ТАКСИ В КРЕДИТ
            </Link>
          </nav>
        </div>

        {/* Bottom Footer Segment */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-slate-50 px-4 py-4 space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="bg-red-600 text-white p-1.5 rounded-full flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">+7 (800) 551-94-31</div>
              <div className="text-[11px] text-slate-500">+7 (495) 292-18-67</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Россия, Москва, 38КМ МКАД, 6Бс1</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Время работы: с 08:00 до 21:00</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileSidebar
