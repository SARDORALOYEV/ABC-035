const PricingAndSubmitForm = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-3">
      <h3 className="font-bold text-sm text-slate-900 mb-4">Narx va joylash</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Narx</label>
          <div className="flex items-center gap-2">
            <input className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400" placeholder="Masalan: 8500000" />
            <select className="w-24 text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 bg-white">
              <option>So'm</option><option>$</option><option>€</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Shahar</label>
          <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 bg-white">
            <option>Moskva</option><option>Sant Peterburg</option><option>Toshkent</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Telefon raqam</label>
          <input className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400" placeholder="+7 (---) --- -- --" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Qo'shimcha ma'lumot</label>
          <textarea className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 h-20 resize-none" placeholder="Avtomobil haqida qo'shimcha ma'lumot..." />
        </div>
        <button className="w-full bg-red-600 text-white text-sm font-bold py-3 rounded-lg hover:bg-red-700 transition mt-2">
          E'lonni joylash
        </button>
      </div>
    </div>
  )
}

export default PricingAndSubmitForm
