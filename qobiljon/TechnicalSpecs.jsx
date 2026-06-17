const fuelLabels = { benzin: 'Benzin', dizel: 'Dizel', gaz: 'Gaz', elektr: 'Elektro', gibrid: 'Gibrid' }
const transLabels = { mexanika: 'Mexanika', avtomat: 'Avtomat', 'yarim-avtomat': 'Yarim-avtomat' }
const driveLabels = { old: 'Old', orqa: 'Orqa', tolaali: "To'liq (AWD)" }
const bodyLabels = { sedan: 'Sedan', suv: 'SUV', hatchback: 'Hatchback', minivan: 'Minivan', pikap: 'Pikap', kupe: 'Kupe', kabriolet: 'Kabriolet', universal: 'Universal', boshqa: 'Boshqa' }
const conditionLabels = { yangi: 'Yangi', ishlatilgan: "Ishlatilgan" }

const TechnicalSpecs = ({ car }) => {
  const specs = [
    ...(car?.engineVolume ? [{ label: 'Dvigatel', value: `${car.engineVolume}L, ${fuelLabels[car.fuelType] || car.fuelType}, ${car.horsePower || '?'} ot kuchi` }] : []),
    ...(car?.mileage !== undefined ? [{ label: 'Yurgan masofasi', value: `${car.mileage.toLocaleString('ru-RU')} km` }] : []),
    ...(car?.color ? [{ label: 'Rangi', value: car.color }] : []),
    ...(car?.transmission ? [{ label: 'Uzatma qutisi', value: transLabels[car.transmission] || car.transmission }] : []),
    ...(car?.fuelType ? [{ label: 'Yoqilg\'i turi', value: fuelLabels[car.fuelType] || car.fuelType }] : []),
    ...(car?.driveType ? [{ label: 'Privod', value: driveLabels[car.driveType] || car.driveType }] : []),
    ...(car?.bodyType ? [{ label: 'Kuzov', value: bodyLabels[car.bodyType] || car.bodyType }] : []),
    ...(car?.condition ? [{ label: 'Holati', value: conditionLabels[car.condition] || car.condition }] : []),
    ...(car?.year ? [{ label: 'Yil', value: car.year }] : []),
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
