const ArticleCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">Maqola rasmi</div>
        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Yangi</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5">
          <span>15.05.2024</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>3 daqiqa o'qish</span>
        </div>
        <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">Avtomobil bozorida narxlar o'zgarishi</h4>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          Bozor tahlilchilari so'nggi ma'lumotlarga ko'ra, avtomobil narxlari kelgusi oylarda sezilarli darajada o'zgarishi kutilmoqda.
        </p>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          <span className="text-[10px] text-slate-400">Admin</span>
          <button className="text-[10px] text-red-500 font-medium hover:text-red-600 transition">O'qish</button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
