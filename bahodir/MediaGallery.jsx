const MediaGallery = () => {
  return (
    <div className="space-y-2">
      <div className="aspect-video bg-gray-100 rounded-xl relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Asosiy rasm</div>
        <button className="absolute bottom-3 right-3 bg-white/90 text-xs font-medium text-slate-700 px-3 py-1.5 rounded-lg shadow">Rasmlarni ko'rish</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-24 h-16 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-gray-400">
            {i}-rasm
          </div>
        ))}
      </div>
    </div>
  )
}

export default MediaGallery
