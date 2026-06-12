import { useState } from 'react'

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

const DEFAULT_ICON = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='5' width='18' height='14' rx='3'/%3E%3Ccircle cx='8' cy='14' r='2'/%3E%3Ccircle cx='16' cy='14' r='2'/%3E%3C/svg%3E`

const priceMarks = ['0', '500т', '800т', '1.1м', '1.4м', '1.7м', '2м', '2.3м', '2.7м', '3м']

const QuickCarFilter = () => {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [price, setPrice] = useState(50)

  const handleBrandClick = (slug) => {
    setSelectedBrand((prev) => (prev === slug ? null : slug))
  }

  return (
    <section className="mx-auto max-w-[1870px] px-[25px] pt-6">
      <div className="bg-[#f8f9fa] rounded-[32px] p-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="grid grid-cols-5 gap-2">
              {brands.map(({ name, slug }) => {
                const isActive = selectedBrand === slug
                const logoUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${slug}.svg`
                return (
                  <button
                    key={slug}
                    onClick={() => handleBrandClick(slug)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
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
                      className={`text-sm leading-none ${
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

          <div className="col-span-4 flex flex-col justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900">Быстрый подбор авто</h3>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">Цена</span>
                <span className="text-sm font-medium text-gray-900">0 - 500т</span>
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
              <div className="grid grid-cols-10 gap-0 mt-1.5">
                {priceMarks.map((mark) => (
                  <span key={mark} className="text-[10px] text-gray-400 text-center leading-none">
                    {mark}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 font-medium pr-8 cursor-pointer outline-none focus:border-[#cc0000] transition-colors">
                  <option>Тип кузова</option>
                  <option>Седан</option>
                  <option>Хэтчбек</option>
                  <option>Кроссовер</option>
                  <option>Внедорожник</option>
                  <option>Универсал</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 font-medium pr-8 cursor-pointer outline-none focus:border-[#cc0000] transition-colors">
                  <option>Коробка</option>
                  <option>Механика</option>
                  <option>Автомат</option>
                  <option>Робот</option>
                  <option>Вариатор</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button className="w-full bg-[#cc0000] hover:bg-[#b30000] active:scale-[0.97] text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-200 cursor-pointer">
              ПОКАЗАТЬ 73
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickCarFilter
