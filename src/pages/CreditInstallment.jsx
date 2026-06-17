const CreditInstallment = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Kredit va bo'lib to'lash</h1>
      <p className="text-sm text-slate-500 mb-8">Qulay shartlarda avtomobil krediti</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <div className="text-3xl font-extrabold text-red-600 mb-2">0%</div>
          <h3 className="font-bold text-gray-900 mb-2">Bo'lib to'lash</h3>
          <p className="text-xs text-slate-500">12 oygacha foizsiz bo'lib to'lash</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <div className="text-3xl font-extrabold text-red-600 mb-2">3%</div>
          <h3 className="font-bold text-gray-900 mb-2">Kredit</h3>
          <p className="text-xs text-slate-500">Yillik 3% dan boshlab kredit</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <div className="text-3xl font-extrabold text-red-600 mb-2">5 yil</div>
          <h3 className="font-bold text-gray-900 mb-2">Muddat</h3>
          <p className="text-xs text-slate-500">60 oygacha bo'lgan muddat</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">Kredit olish uchun talablar</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            O'zbekiston pasporti
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            23 yoshdan 65 yoshgacha
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Doimiy daromad manbai
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CreditInstallment
