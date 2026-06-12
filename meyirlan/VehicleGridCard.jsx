const VehicleGridCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">Rasm</div>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-sm text-slate-900 mb-1">BMW X5 2023</h4>
        <p className="text-base font-extrabold text-slate-900 mb-2">45 000 $</p>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            2023
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            15 000 km
          </span>
          <span className="flex items-center gap-1">3.0L</span>
          <span className="flex items-center gap-1">Avtomat</span>
        </div>
      </div>
    </div>
  )
}

export default VehicleGridCard
