const RecommendedCarousel = () => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-sm text-slate-900 mb-3">O'xshash avtomobillar</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[200px] bg-white border border-gray-200 rounded-xl overflow-hidden shrink-0">
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">Rasm {i}</div>
            <div className="p-2.5">
              <p className="text-xs font-bold text-slate-900">BMW X5 2023</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">8 500 000 ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendedCarousel
