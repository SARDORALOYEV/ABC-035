import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { carsAPI } from '../api'
import VehicleGridCard from '../../meyirlan/VehicleGridCard'
import Pagination from '../../meyirlan/Pagination'

const UsedCars = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)

  const page = Number(searchParams.get('page')) || 1

  const fetchCars = useCallback(async () => {
    setLoading(true)
    try {
      const params = Object.fromEntries(searchParams.entries())
      const res = await carsAPI.getAll({ ...params, condition: 'ishlatilgan', limit: 12 })
      setCars(res.data)
      setTotal(res.total)
      setPages(res.pages)
    } catch (err) {
      console.error('Xatolik:', err)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => { fetchCars() }, [fetchCars])

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Avtomobil s probegom</h1>

      {loading ? (
        <div className="text-center py-20 text-slate-500">Yuklanmoqda...</div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-slate-500">Ishlatilgan avtomobillar topilmadi</div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-4">{total} ta avtomobil</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <Link key={car.id} to={`/used-cars/${car.id}`}>
                <VehicleGridCard car={car} />
              </Link>
            ))}
          </div>
          <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default UsedCars
