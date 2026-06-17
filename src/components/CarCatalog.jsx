import { useState, useEffect } from 'react'

import { carsAPI } from '../api'
import CarCard from './CarCard'

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 3

const CarCatalog = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await carsAPI.getAll({ limit: 50 })
        setCars(res.data)
      } catch (err) {
        console.error('Avtomobillarni yuklashda xatolik:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const visibleCars = cars.slice(0, visibleCount)
  const hasMore = visibleCount < cars.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, cars.length))
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-[1870px] px-4 sm:px-[25px] pt-12 pb-16">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-8">
          Автомобили в наличии с ПТС
        </h2>
        <div className="text-center text-gray-500">Загрузка...</div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-[1870px] px-4 sm:px-[25px] pt-12 pb-16">
      <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-8">
        Автомобили в наличии с ПТС
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-[#cc0000] hover:bg-[#b30000] active:scale-[0.97] text-white font-bold text-sm py-3.5 px-12 rounded-xl transition-all duration-200 cursor-pointer"
          >
            ПОКАЗАТЬ ЕЩЕ
          </button>
        </div>
      )}
    </section>
  )
}

export default CarCatalog
