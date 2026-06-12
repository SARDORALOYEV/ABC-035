const TechnicalSpecs = () => {
  const specs = [
    { label: 'Dvigatel', value: '3.0L, Benz, 340 ot kuchi' },
    { label: 'Yurgan masofasi', value: '15 000 km' },
    { label: 'Rangi', value: 'Qora (metallik)' },
    { label: 'Uzatma qutisi', value: 'Avtomat, 8-step' },
    { label: 'Yoqilg\'i turi', value: 'Benzin AI-95' },
    { label: 'Privod', value: 'To\'liq (AWD)' },
    { label: 'Yoqilg\'i sarfi', value: '8.5L / 100 km' },
    { label: 'Holati', value: 'Ideal' },
  ]
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-bold text-sm text-slate-900 mb-4">Texnik xarakteristikalar</h3>
      <div className="divide-y divide-gray-100">
        {specs.map((s, i) => (
          <div key={i} className="flex items-center py-2.5">
            <span className="w-1/2 text-xs text-slate-500">{s.label}</span>
            <span className="w-1/2 text-xs font-medium text-slate-800">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechnicalSpecs
