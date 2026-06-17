import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { carsAPI } from '../api'
import VehicleGridCard from '../../meyirlan/VehicleGridCard'

const Favorites = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const ids = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (ids.length === 0) {
          setCars([])
          return
        }
        const res = await carsAPI.getAll({ limit: 50 })
        setCars(res.data.filter((car) => ids.includes(car.id)))
      } catch (err) {
        console.error('Sevimlilarni yuklashda xatolik:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFavorites()
  }, [])

  const removeFavorite = (id) => {
    const ids = JSON.parse(localStorage.getItem('favorites') || '[]')
    const next = ids.filter((f) => f !== id)
    localStorage.setItem('favorites', JSON.stringify(next))
    setCars((prev) => prev.filter((c) => c._id !== id))
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sevimlilar</h1>

      {loading ? (
        <div className="text-center py-20 text-slate-500">Yuklanmoqda...</div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 mb-4">Sevimli avtomobillar yo'q</p>
          <Link to="/catalog" className="text-red-600 hover:underline text-sm">Katalogga o'tish</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <div key={car.id} className="relative">
              <Link to={`/used-cars/${car.id}`}>
                <VehicleGridCard car={car} />
              </Link>
              <button
                onClick={() => removeFavorite(car.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-red-50 transition z-10"
              >
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
