import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const brands = [
  { name: 'Toyota', slug: 'toyota' },
  { name: 'Honda', slug: 'honda' },
  { name: 'BMW', slug: 'bmw' },
  { name: 'Mercedes', slug: 'mercedes-benz' },
  { name: 'Audi', slug: 'audi' },
  { name: 'Volkswagen', slug: 'volkswagen' },
  { name: 'Ford', slug: 'ford' },
  { name: 'Chevrolet', slug: 'chevrolet' },
  { name: 'Nissan', slug: 'nissan' },
  { name: 'Hyundai', slug: 'hyundai' },
  { name: 'Kia', slug: 'kia' },
  { name: 'Mazda', slug: 'mazda' },
  { name: 'Lexus', slug: 'lexus' },
  { name: 'Mitsubishi', slug: 'mitsubishi' },
  { name: 'Subaru', slug: 'subaru' },
  { name: 'Volvo', slug: 'volvo' },
  { name: 'Lada', slug: 'lada' },
  { name: 'Renault', slug: 'renault' },
  { name: 'Chery', slug: 'chery' },
  { name: 'Geely', slug: 'geely' },
]

const bodyMap = { 'sedan': 'sedan', 'suv': 'suv', 'hatchback': 'hatchback', 'cross': 'suv', 'universal': 'universal' }
const transMap = { 'mexanika': 'mexanika', 'avtomat': 'avtomat', 'robot': 'yarim-avtomat' }

const DEFAULT_ICON = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='5' width='18' height='14' rx='3'/%3E%3Ccircle cx='8' cy='14' r='2'/%3E%3Ccircle cx='16' cy='14' r='2'/%3E%3C/svg%3E`

const priceMarks = ['0', '500т', '800т', '1.1м', '1.4м', '1.7м', '2м', '2.3м', '2.7м', '3м']
const priceValues = [0, 500000, 800000, 1100000, 1400000, 1700000, 2000000, 2300000, 2700000, 3000000]

const QuickCarFilter = () => {
  const navigate = useNavigate()
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [price, setPrice] = useState(50)
  const [bodyType, setBodyType] = useState('')
  const [transmission, setTransmission] = useState('')

  const handleBrandClick = (slug) => {
    setSelectedBrand((prev) => (prev === slug ? null : slug))
  }

  const handleSubmit = () => {
    const params = new URLSearchParams()
    if (selectedBrand) params.set('brand', selectedBrand)
    if (bodyType) params.set('bodyType', bodyMap[bodyType] || bodyType)
    if (transmission) params.set('transmission', transMap[transmission] || transmission)
    const priceVal = priceValues[Math.floor(price / 10)] || priceValues[priceValues.length - 1]
    if (priceVal > 0) params.set('maxPrice', String(priceVal))
    navigate(`/catalog?${params.toString()}`)
  }

  return (
    <section className="mx-auto max-w-[1870px] px-4 sm:px-[25px] pt-6">
      <div className="bg-[#f8f9fa] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {brands.map(({ name, slug }) => {
                const isActive = selectedBrand === slug
                const logoUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${slug}.svg`
                return (
                  <button
                    key={slug}
                    onClick={() => handleBrandClick(slug)}
                    className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100'
                        : 'bg-transparent hover:bg-white/60'
                    }`}
                  >
                    <img
                      src={logoUrl}
                      alt={name}
                      width={22}
                      height={22}
                      className="shrink-0"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = DEFAULT_ICON
                      }}
                    />
                    <span
                      className={`text-xs sm:text-sm leading-none ${
                        isActive ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'
                      }`}
                    >
                      {name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Быстрый подбор авто</h3>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">Цена</span>
                <span className="text-sm font-medium text-gray-900">0 - {priceValues[Math.floor(price / 10)]?.toLocaleString('ru-RU') || '3 000 000'}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:bg-gray-200
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#cc0000]
                  [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:mt-[-5px]
                  [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-gray-200
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#cc0000] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #cc0000 0%, #cc0000 ${price}%, #e5e7eb ${price}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between mt-1.5">
                {priceMarks.map((mark) => (
                  <span key={mark} className="text-[10px] text-gray-400 text-center leading-none">
                    {mark}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 font-medium pr-8 cursor-pointer outline-none focus:border-[#cc0000] transition-colors"
                >
                  <option value="">Тип кузова</option>
                  <option value="sedan">Седан</option>
                  <option value="hatchback">Хэтчбек</option>
                  <option value="suv">Кроссовер</option>
                  <option value="suv">Внедорожник</option>
                  <option value="universal">Универсал</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="relative">
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 font-medium pr-8 cursor-pointer outline-none focus:border-[#cc0000] transition-colors"
                >
                  <option value="">Коробка</option>
                  <option value="mexanika">Механика</option>
                  <option value="avtomat">Автомат</option>
                  <option value="yarim-avtomat">Робот</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#cc0000] hover:bg-[#b30000] active:scale-[0.97] text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
            >
              ПОКАЗАТЬ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickCarFilter
