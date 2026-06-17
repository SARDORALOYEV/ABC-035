import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota']
const fuelTypes = ['benzin', 'dizel', 'elektr', 'gibrid']
const fuelLabels = { benzin: 'Benz', dizel: 'Dizel', elektr: 'Elektro', gibrid: 'Gibrid' }

const FilterSidebar = () => {
  const navigate = useNavigate()
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedFuels, setSelectedFuels] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const toggleFuel = (fuel) => {
    setSelectedFuels((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    )
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedBrands.length > 0) params.set('brand', selectedBrands.join('|'))
    if (selectedFuels.length > 0) params.set('fuelType', selectedFuels.join('|'))
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    navigate(`/catalog?${params.toString()}`)
  }

  const handleClear = () => {
    setSelectedBrands([])
    setSelectedFuels([])
    setMinPrice('')
    setMaxPrice('')
    navigate('/catalog')
  }

  return (
    <aside className="w-72 bg-white border border-gray-200 rounded-xl p-5 shrink-0">
      <h3 className="font-bold text-sm text-slate-900 mb-4">FILTR</h3>
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-700 mb-2">Brend</p>
        <div className="space-y-1.5">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 rounded border-gray-300"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-700 mb-2">Narx</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-red-400"
          />
          <span className="text-xs text-slate-400">-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-red-400"
          />
        </div>
      </div>
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-700 mb-2">Dvigatel</p>
        <div className="space-y-1.5">
          {fuelTypes.map((fuel) => (
            <label key={fuel} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFuels.includes(fuel)}
                onChange={() => toggleFuel(fuel)}
                className="w-4 h-4 rounded border-gray-300"
              />
              {fuelLabels[fuel]}
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <button onClick={handleSearch} className="flex-1 bg-red-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-red-700 transition">Natijalarni ko'rish</button>
        <button onClick={handleClear} className="px-3 py-2.5 text-xs text-slate-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Tozalash</button>
      </div>
    </aside>
  )
}

export default FilterSidebar
