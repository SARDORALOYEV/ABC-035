import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { carsAPI } from '../api'
import VehicleGridCard from '../../meyirlan/VehicleGridCard'
import { getFavorites } from '../utils/favorites'

const Favorites = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const ids = getFavorites()
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
    const ids = getFavorites()
    const next = ids.filter((f) => f !== id)
    localStorage.setItem('favorites', JSON.stringify(next))
    setCars((prev) => prev.filter((c) => c.id !== id))
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
