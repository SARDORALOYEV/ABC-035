const Insurance = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sug'urta</h1>
      <p className="text-sm text-slate-500 mb-8">Avtomobilingizni ishonchli sug'urta bilan himoya qiling</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">KASKO sug'urta</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Avtomobilingizni har qanday zararlardan to'liq himoya qiladi. O'g'irlik, tabiiy ofatlar va boshqa holatlardan sug'urta.
          </p>
          <ul className="space-y-1.5 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              To'liq qoplash
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Tez rasmiylashtirish
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">OSAGO sug'urta</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Majburiy avtomobil sug'urtasi. Uchinchi shaxslarga yetkazilgan zararni qoplaydi.
          </p>
          <ul className="space-y-1.5 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Eng yaxshi narxlar
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Onlayn rasmiylashtirish
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Insurance
