const SellerCard = ({ seller }) => {
  const name = seller?.name || "ABC Auto"
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-400 shrink-0 font-bold">{initials}</div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-[11px] text-slate-400">{seller?.since || 'ABC Auto kompaniyasi'}</p>
        </div>
      </div>
      <button className="w-full text-xs text-slate-600 bg-gray-50 border border-gray-200 rounded-lg py-2 hover:bg-gray-100 transition">Barcha e'lonlarni ko'rish</button>
    </div>
  )
}

export default SellerCard
