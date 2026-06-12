const FilterSidebar = () => {
  return (
    <aside className="w-72 bg-white border border-gray-200 rounded-xl p-5 shrink-0">
      <h3 className="font-bold text-sm text-slate-900 mb-4">FILTR</h3>
      {/* Brand filter group */}
      <div className="mb-5">
        <button className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 mb-2">
          Brend
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> BMW</label>
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Mercedes-Benz</label>
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Audi</label>
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Toyota</label>
        </div>
      </div>
      {/* Price range slider */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-700 mb-2">Narx</p>
        <div className="flex items-center gap-2 mb-2">
          <input className="w-full h-1 bg-gray-200 rounded appearance-none" type="range" min="0" max="100" disabled />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>0 so'm</span>
          <span>100 000 so'm</span>
        </div>
      </div>
      {/* Engine type */}
      <div className="mb-5">
        <button className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 mb-2">
          Dvigatel
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Benz</label>
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Dizel</label>
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Elektro</label>
          <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Gibrid</label>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-2 mt-6">
        <button className="flex-1 bg-red-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-red-700 transition">Natijalarni ko'rish</button>
        <button className="px-3 py-2.5 text-xs text-slate-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Tozalash</button>
      </div>
    </aside>
  )
}

export default FilterSidebar
