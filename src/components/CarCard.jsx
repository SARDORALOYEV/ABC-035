import { useState, useEffect } from 'react'
import { Heart, GitCompare, Gift, Zap, Fuel, Gauge, Timer } from 'lucide-react'
import { getFirstCarImage } from '../utils/imageHelper'
import { toggleFavorite, isFavorite } from '../utils/favorites'

const formatPrice = (price, currency) => {
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return `${formatted} ${currency || 'USD'}`
}

const transmissionLabel = (t) => (t === 'avtomat' ? 'Автомат' : 'Механика')

const conditionLabel = (c, mileage) =>
  c === 'yangi' ? 'Новый автомобиль' : `${mileage} км`

const IconCircle = ({ icon: Icon }) => (
  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
    <Icon size={12} className="text-gray-800" />
  </div>
)

const InfoRow = ({ icon, label }) => (
  <div className="flex items-center gap-2">
    <IconCircle icon={icon} />
    <span className="text-[12px] text-gray-700 font-medium truncate min-w-0">{label}</span>
  </div>
)

const CarCard = ({ car }) => {
  const [fav, setFav] = useState(false)

  useEffect(() => {
    setFav(isFavorite(car.id))
  }, [car.id])

  const specs = [
    ...(car.horsePower ? [{ label: `${car.horsePower} л.с.`, Icon }] : []),
    ...(car.engineVolume ? [{ label: `${car.engineVolume}L`, Icon: Fuel }] : []),
    { label: `${car.mileage || 0} км`, Icon: Gauge },
    { label: `${car.year}`, Icon: Timer },
  ]

  const imageUrl = getFirstCarImage(car)

  return (
    <div
      className="bg-white rounded-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-5 sm:p-7 flex flex-col justify-between w-full max-w-[446px] mx-auto hover:border-gray-200 transition-all duration-300"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold capitalize text-[#111827] text-xl sm:text-[27px] leading-[100%] truncate">
            {car.brand} {car.model}
          </h3>
          <p className="font-bold text-[13px] sm:text-[15px] text-[#6b7280] mt-1.5 truncate">
            {car.year} · {transmissionLabel(car.transmission)} · {car.fuelType}
          </p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={() => { toggleFavorite(car.id); setFav(isFavorite(car.id)) }} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <Heart size={20} className={`transition-colors ${fav ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
          </button>
        </div>
      </div>

      {car.isFeatured && (
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#cc0000] text-white text-[11px] font-bold inline-flex items-center">
            <span className="px-3 py-1">Рекомендуем</span>
            <span className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[8px] border-l-[#cc0000]" />
          </span>
          <span className="text-[#cc0000] text-[11px] font-bold">
            {car.condition === 'yangi' ? 'Новый' : 'С пробегом'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 my-2">
        <div className="flex flex-col gap-2.5 min-w-0 justify-center">
          {car.color && <InfoRow icon={Gift} label={car.color} />}
          <InfoRow icon={Gift} label={conditionLabel(car.condition, car.mileage)} />
        </div>

        {imageUrl && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
            <img src={imageUrl} alt={car.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <p className="text-xl sm:text-[25px] font-black text-gray-900 tracking-tight my-4 truncate">
        {formatPrice(car.price, car.currency)}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {specs.map(({ label, Icon }, i) => (
          <div key={i} className="flex items-center justify-center gap-1 border border-gray-100 rounded-full py-1.5 px-2 bg-gray-50 text-[10px] sm:text-[11px] font-bold text-gray-700 hover:border-gray-300 transition-all min-w-0">
            <Icon size={12} className="shrink-0 text-gray-400" />
            <span className="truncate min-w-0">{label}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-[48px] rounded-xl overflow-hidden relative text-white bg-transparent">
        <button className="absolute left-0 top-0 h-full bg-[#cc0000] hover:bg-[#b30000] cursor-pointer z-30" style={{ width: '33%', clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)' }}>
          <span className="text-[12px] font-bold">Резерв онлайн</span>
        </button>
        <button className="absolute top-0 h-full bg-[#1e2229] hover:bg-[#2d333b] cursor-pointer z-20" style={{ left: '25%', width: '36%', clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%)' }}>
          <span className="text-[12px] font-bold pl-4">Купить</span>
        </button>
        <button className="absolute top-0 h-full bg-[#7a7e85] hover:bg-[#8a8e95] cursor-pointer z-10" style={{ left: '47%', right: 20, clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%)' }}>
          <span className="text-[12px] font-bold pl-8">Подробнее</span>
        </button>
      </div>
    </div>
  )
}

export default CarCard