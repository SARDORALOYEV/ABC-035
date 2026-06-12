const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden mt-20 mx-4 md:mx-8">
      <div className="relative z-10 px-8 py-16 md:py-24 md:px-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          O'zingizning <br />
          <span className="text-red-500">ideal avtomobilingizni</span> toping
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-xl mb-8">
          Yangi va ishlatilgan avtomobillar katalogi. Kredit, trade-in va boshqa xizmatlar.
        </p>
        <div className="flex items-center gap-3">
          <a href="/catalog" className="bg-red-600 text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition">Katalog</a>
          <a href="/used-cars" className="bg-white/10 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition">Ishlatilgan</a>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
        <div className="w-full h-full bg-gradient-to-l from-transparent to-slate-900" />
      </div>
    </section>
  )
}

export default HeroBanner
