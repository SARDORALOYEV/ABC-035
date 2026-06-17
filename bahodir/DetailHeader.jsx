const DetailHeader = ({ car, onToggleFavorite, isFavorite }) => {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{car?.brand} {car?.model} {car?.year}</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            <span>{car?.title}</span>
            {car?.color && <><span className="w-1 h-1 bg-slate-300 rounded-full" /><span>{car.color}</span></>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-slate-900">{Number(car?.price || 0).toLocaleString('ru-RU')} {car?.currency || 'USD'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${car?.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {car?.isAvailable ? 'В наличии' : 'Нет в наличии'}
        </span>
        {onToggleFavorite && (
          <button onClick={() => onToggleFavorite(car)} className={`flex items-center gap-1 text-xs transition ${isFavorite ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}>
            <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Sevimlilar
          </button>
        )}
        <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-500 transition">
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
