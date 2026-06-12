const StaticInfo = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Biz haqimizda</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          ABC Auto — Rossiyaning yetakchi avtomobil dileri. Biz 10 yildan ortiq vaqt davomida mijozlarimizga
          eng yaxshi avtomobillarni taklif etib kelmoqdamiz. Bizning maqsadimiz — har bir mijozga individual
          yondashish va avtomobil tanlashda to'liq qo'llab-quvvatlash.
        </p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Yordam markazi</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Agar sizda savollar bo'lsa, pastdagi kontaktlar orqali biz bilan bog'lanishingiz mumkin.
          Bizning mutaxassislar sizning barcha savollaringizga javob berishga tayyor.
        </p>
        <div className="mt-4 text-sm text-slate-600 space-y-1">
          <p>📞 +7 (800) 551-94-31</p>
          <p>📧 info@abc-auto.ru</p>
          <p>📍 Москва, 38КМ МКАД, 6Бс1</p>
        </div>
      </div>
    </div>
  )
}

export default StaticInfo
