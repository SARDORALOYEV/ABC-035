import { Link } from 'react-router-dom'

const RecommendedCarousel = ({ cars = [] }) => {
  if (cars.length === 0) return null
  return (
    <div className="mt-6">
      <h3 className="font-bold text-sm text-slate-900 mb-3">O'xshash avtomobillar</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {cars.map((car) => (
          <Link
            key={car.id}
            to={`/used-cars/${car.id}`}
            className="min-w-[200px] bg-white border border-gray-200 rounded-xl overflow-hidden shrink-0 hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] bg-gray-100 relative flex items-center justify-center">
              {car.images?.[0]?.url ? (
                <img src={car.images[0].url} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h10a2 2 0 002-2M9 14a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </div>
            <div className="p-2.5">
              <p className="text-xs font-bold text-slate-900 truncate">{car.brand} {car.model} {car.year}</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">{Number(car.price || 0).toLocaleString('ru-RU')} {car.currency || 'USD'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecommendedCarousel
