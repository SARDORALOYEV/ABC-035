import { useState, useEffect } from 'react'
import { carsAPI } from '../src/api'
import { getFirstCarImage } from '../src/utils/imageHelper'
import { toggleFavorite, isFavorite } from '../src/utils/favorites'

const specRows = [
  { label: 'Narx', key: 'price', render: (v, car) => `${Number(v || 0).toLocaleString('ru-RU')} ${car?.currency || 'USD'}` },
  { label: 'Yil', key: 'year' },
  { label: 'Yoqilg\'i', key: 'fuelType' },
  { label: 'Uzatma qutisi', key: 'transmission' },
  { label: 'Kuzov', key: 'bodyType' },
  { label: 'Probeg', key: 'mileage', render: (v) => v ? `${v} km` : '—' },
  { label: 'Rang', key: 'color', render: (v) => v || '—' },
  { label: 'Dvigatel', key: 'engineVolume', render: (v) => v ? `${v}L` : '—' },
  { label: 'Kuch', key: 'horsePower', render: (v) => v ? `${v} ot.kuch` : '—' },
]

const CarSelector = ({ cars, selected, onSelect, onRemove }) => {
  const [search, setSearch] = useState('')
  const filtered = cars.filter(c =>
    !selected.find(s => s.id === c.id) &&
    `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  )

  if (selected.length >= 3) return null

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Avtomobil qidirish..."
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 transition"
      />
      {search && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
          {filtered.map((car) => (
            <button
              key={car.id}
              onClick={() => { onSelect(car); setSearch('') }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden shrink-0">
                {getFirstCarImage(car) ? (
                  <img src={getFirstCarImage(car)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400">Rasm</div>
                )}
              </div>
              <div>
                <p className="font-medium text-slate-900">{car.brand} {car.model}</p>
                <p className="text-[11px] text-slate-400">{car.year} | {Number(car.price || 0).toLocaleString('ru-RU')} {car.currency || 'USD'}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const CompareMatrix = () => {
  const [allCars, setAllCars] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'))

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await carsAPI.getAll({ limit: 50 })
        setAllCars(res.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const addCar = (car) => {
    if (selected.length < 3) setSelected(prev => [...prev, car])
  }

  const removeCar = (id) => {
    setSelected(prev => prev.filter(c => c.id !== id))
  }

  const handleToggleFav = (id) => {
    toggleFavorite(id)
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'))
  }

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Avtomobillar yuklanmoqda...</div>
  }

  return (
    <div className="space-y-6">
      <CarSelector cars={allCars} selected={selected} onSelect={addCar} onRemove={removeCar} />

      {selected.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm font-medium">Solishtirish uchun avtomobillarni qidiring va tanlang (maks 3 ta)</p>
        </div>
      )}

      {selected.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="p-3 w-36 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Parametr</th>
                {selected.map((car) => (
                  <th key={car.id} className="p-3 text-center relative">
                    <button onClick={() => removeCar(car.id)} className="absolute top-1 right-2 text-gray-300 hover:text-red-500 text-lg leading-none">&times;</button>
                    <div className="w-full h-28 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                      {getFirstCarImage(car) ? (
                        <img src={getFirstCarImage(car)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">Rasm</div>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-900">{car.brand} {car.model}</p>
                    <p className="text-[10px] text-slate-400">{car.year}</p>
                    <button
                      onClick={() => handleToggleFav(car.id)}
                      className={`mt-1 text-xs flex items-center gap-1 mx-auto px-2 py-0.5 rounded-full transition ${isFavorite(car.id) ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-400 hover:bg-red-50'}`}
                    >
                      <svg className="w-3.5 h-3.5" fill={isFavorite(car.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {isFavorite(car.id) ? 'Saqlangan' : 'Saqlash'}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {specRows.map((row) => (
                <tr key={row.key} className="hover:bg-gray-50/50">
                  <td className="p-3 text-xs font-semibold text-slate-700">{row.label}</td>
                  {selected.map((car) => (
                    <td key={car.id} className="p-3 text-xs text-slate-600 text-center">
                      {row.render ? row.render(car[row.key], car) : car[row.key] || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CompareMatrix
