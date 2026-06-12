const DetailHeader = () => {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">BMW X5 xDrive40i 2023</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            <span>VIN: WBA1234567890</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Москва</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-slate-900">8 500 000 ₽</p>
          <p className="text-xs text-slate-400 line-through">9 200 000 ₽</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="bg-green-100 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded">В наличии</span>
        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Sevimlilar
        </button>
        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-500 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Ulashish
        </button>
      </div>
    </div>
  )
}

export default DetailHeader
