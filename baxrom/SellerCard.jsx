const SellerCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-400 shrink-0">AV</div>
        <div>
          <p className="text-sm font-bold text-slate-900">Aleksandr V.</p>
          <p className="text-[11px] text-slate-400">Sayohat: 2020</p>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className={`w-3 h-3 ${i <= 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <button className="w-full text-xs text-slate-600 bg-gray-50 border border-gray-200 rounded-lg py-2 hover:bg-gray-100 transition">Barcha e'lonlarni ko'rish</button>
    </div>
  )
}

export default SellerCard
