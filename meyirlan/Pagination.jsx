const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-xs text-slate-500 hover:bg-gray-50 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="w-9 h-9 rounded-lg bg-red-600 text-white text-xs font-bold flex items-center justify-center">1</button>
      <button className="w-9 h-9 rounded-lg border border-gray-200 text-xs text-slate-600 flex items-center justify-center hover:bg-gray-50 transition">2</button>
      <button className="w-9 h-9 rounded-lg border border-gray-200 text-xs text-slate-600 flex items-center justify-center hover:bg-gray-50 transition">3</button>
      <span className="w-9 h-9 flex items-center justify-center text-xs text-slate-400">...</span>
      <button className="w-9 h-9 rounded-lg border border-gray-200 text-xs text-slate-600 flex items-center justify-center hover:bg-gray-50 transition">12</button>
      <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-xs text-slate-500 hover:bg-gray-50 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
