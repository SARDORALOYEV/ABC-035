const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-extrabold text-red-600">ABC Auto</a>
            <div className="hidden lg:flex items-center gap-6">
              <a href="/catalog" className="text-xs font-medium text-slate-600 hover:text-red-600 transition">Katalog</a>
              <a href="/used-cars" className="text-xs font-medium text-slate-600 hover:text-red-600 transition">Ishlatilgan</a>
              <a href="/credit" className="text-xs font-medium text-slate-600 hover:text-red-600 transition">Kredit</a>
              <a href="/reviews" className="text-xs font-medium text-slate-600 hover:text-red-600 transition">Sharhlar</a>
              <a href="/blog" className="text-xs font-medium text-slate-600 hover:text-red-600 transition">Blog</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 hover:text-red-600 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Sevimlilar
            </button>
            <button className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition">Kirish</button>
            <button className="lg:hidden p-2 text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
