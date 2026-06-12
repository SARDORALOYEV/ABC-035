const MyListingsTable = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="py-3 px-3">#</th>
            <th className="py-3 px-3">Rasm</th>
            <th className="py-3 px-3">Model</th>
            <th className="py-3 px-3">Narx</th>
            <th className="py-3 px-3">Status</th>
            <th className="py-3 px-3">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-xs text-slate-700">
          {[1, 2, 3].map((i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="py-3 px-3">{i}</td>
              <td className="py-3 px-3"><div className="w-10 h-8 bg-gray-100 rounded" /></td>
              <td className="py-3 px-3 font-medium">BMW X5 2023</td>
              <td className="py-3 px-3 font-bold">8 500 000 ₽</td>
              <td className="py-3 px-3"><span className="bg-green-100 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded">Faol</span></td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <button className="text-slate-400 hover:text-blue-500 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  <button className="text-slate-400 hover:text-red-500 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyListingsTable
