import { getFirstCarImage } from '../src/utils/imageHelper'

const CarPlaceholder = () => (
  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h10a2 2 0 002-2M9 14a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const VehicleListCard = ({ car }) => {
  const imageUrl = getFirstCarImage(car)
  const fuelTypes = { benzin: 'Benz', dizel: 'Dizel', gaz: 'Gaz', elektr: 'Elektro', gibrid: 'Gibrid' }
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex hover:shadow-md transition-shadow">
      <div className="w-56 bg-gray-100 shrink-0 relative flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
        ) : (
          <CarPlaceholder />
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-bold text-sm text-slate-900">{car?.brand} {car?.model} {car?.year}</h4>
            <p className="text-base font-extrabold text-slate-900">{Number(car?.price || 0).toLocaleString('ru-RU')} {car?.currency || 'USD'}</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 mb-2">
            <span>{car?.year}</span>
            <span>{car?.mileage || 0} km</span>
            <span>{car?.engineVolume ? `${car.engineVolume}L` : ''}</span>
            <span>{car?.transmission}</span>
            <span>{fuelTypes[car?.fuelType] || car?.fuelType}</span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">{car?.description || ''}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-100 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded">{car?.isAvailable ? 'В наличии' : 'Нет в наличии'}</span>
          <span className="text-[10px] text-slate-400">{car?.color || ''}</span>
        </div>
      </div>
    </div>
  )
}

export default VehicleListCard
