const VehicleBasicInfoForm = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-bold text-sm text-slate-900 mb-4">Avtomobil haqida ma'lumot</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Yil</label>
          <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 bg-white">
            <option>2024</option><option>2023</option><option>2022</option><option>2021</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Marka</label>
          <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 bg-white">
            <option>BMW</option><option>Mercedes-Benz</option><option>Audi</option><option>Toyota</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Model</label>
          <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 bg-white">
            <option>X5</option><option>X3</option><option>5 Series</option><option>3 Series</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Yurgan masofasi (km)</label>
          <input className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400" placeholder="Masalan: 15000" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Dvigatel</label>
          <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 bg-white">
            <option>3.0L Benz</option><option>2.0L Dizel</option><option>Elektro</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Uzatma qutisi</label>
          <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400 bg-white">
            <option>Avtomat</option><option>Mexanik</option><option>Robot</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <button className="text-xs text-slate-500 hover:text-slate-700 transition">Ortga</button>
        <button className="bg-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-red-700 transition">Keyingi qadam</button>
      </div>
    </div>
  )
}

export default VehicleBasicInfoForm
