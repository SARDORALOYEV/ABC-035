const VehicleListCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex hover:shadow-md transition-shadow">
      <div className="w-56 bg-gray-100 shrink-0 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">Rasm</div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-bold text-sm text-slate-900">Mercedes-Benz E-Class 2022</h4>
            <p className="text-base font-extrabold text-slate-900">52 000 $</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 mb-2">
            <span>2022</span>
            <span>20 000 km</span>
            <span>2.0L</span>
            <span>Avtomat</span>
            <span>Benz</span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">V отличном состоянии, полный привод, кожаный салон, панорамная крыша.</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-100 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded">В наличии</span>
          <span className="text-[10px] text-slate-400">Москва</span>
        </div>
      </div>
    </div>
  )
}

export default VehicleListCard
