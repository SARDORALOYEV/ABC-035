const ImageUploadZone = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-bold text-sm text-slate-900 mb-4">Rasmlarni yuklash</h3>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition">
        <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm font-medium text-slate-600">Rasmlarni bu yerga tashlang</p>
        <p className="text-xs text-slate-400 mt-1">yoki kompyuterdan tanlang</p>
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400">Rasm {i}</div>
            <button className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        <div className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-300 cursor-pointer hover:border-red-400 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ImageUploadZone
