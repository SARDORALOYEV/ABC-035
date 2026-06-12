const CompareMatrix = () => {
  const cars = [
    { name: 'BMW X5 2023', price: '8 500 000 ₽', engine: '3.0L Benz', transmission: 'Avtomat', fuel: 'Benzin', color: 'Qora', year: '2023' },
    { name: 'Mercedes GLE 2023', price: '9 200 000 ₽', engine: '3.0L Dizel', transmission: 'Avtomat', fuel: 'Dizel', color: 'Oq', year: '2023' },
    { name: 'Audi Q7 2022', price: '7 800 000 ₽', engine: '3.0L Benz', transmission: 'Avtomat', fuel: 'Benzin', color: 'Ko\'k', year: '2022' },
  ]
  const rows = [
    { label: 'Narx', key: 'price' },
    { label: 'Dvigatel', key: 'engine' },
    { label: 'Uzatma qutisi', key: 'transmission' },
    { label: 'Yoqilg\'i', key: 'fuel' },
    { label: 'Rangi', key: 'color' },
    { label: 'Yili', key: 'year' },
  ]
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-3 w-32" />
            {cars.map((car, i) => (
              <th key={i} className="p-3 text-center">
                <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-[10px] text-gray-400">Rasm</div>
                <p className="text-xs font-bold text-slate-900">{car.name}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.key}>
              <td className="p-3 text-xs font-semibold text-slate-700">{row.label}</td>
              {cars.map((car, i) => (
                <td key={i} className="p-3 text-xs text-slate-600 text-center">{car[row.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompareMatrix
