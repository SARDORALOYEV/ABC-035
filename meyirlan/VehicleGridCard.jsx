import { getFirstCarImage } from '../src/utils/imageHelper'

const CarPlaceholder = () => (
  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h10a2 2 0 002-2M9 14a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const VehicleGridCard = ({ car }) => {
  const imageUrl = getFirstCarImage(car)
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-gray-100 relative flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
        ) : (
          <CarPlaceholder />
        )}
      </div>
      <div className="p-3">
        <h4 className="font-bold text-sm text-slate-900 mb-1 truncate">{car?.brand} {car?.model} {car?.year}</h4>
        <p className="text-base font-extrabold text-slate-900 mb-2">{Number(car?.price || 0).toLocaleString('ru-RU')} {car?.currency || 'USD'}</p>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {car?.year}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {car?.mileage || 0} km
          </span>
          <span className="flex items-center gap-1">{car?.engineVolume ? `${car.engineVolume}L` : ''}</span>
          <span className="flex items-center gap-1">{car?.transmission}</span>
        </div>
      </div>
    </div>
  )
}

export default VehicleGridCard
