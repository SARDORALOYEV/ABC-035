const SavedCarsGrid = () => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-sm text-slate-900 mb-3">Sevimlilar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden relative group">
            <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10">
              <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">Rasm {i}</div>
            <div className="p-3">
              <p className="text-xs font-bold text-slate-900">BMW X5 2023</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">8 500 000 ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedCarsGrid
