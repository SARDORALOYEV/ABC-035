import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { carsAPI } from '../api'
import FilterSidebar from '../../behruz/FilterSidebar'
import VehicleGridCard from '../../meyirlan/VehicleGridCard'
import VehicleListCard from '../../meyirlan/VehicleListCard'
import Pagination from '../../meyirlan/Pagination'

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [viewMode, setViewMode] = useState('grid')

  const page = Number(searchParams.get('page')) || 1

  const fetchCars = useCallback(async () => {
    setLoading(true)
    try {
      const params = Object.fromEntries(searchParams.entries())
      const res = await carsAPI.getAll({ ...params, limit: 12 })
      setCars(res.data)
      setTotal(res.total)
      setPages(res.pages)
    } catch (err) {
      console.error('Avtomobillarni yuklashda xatolik:', err)
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
    <div className="mx-auto max-w-[1870px] px-4 sm:px-[25px] py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Katalog</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{total} ta avtomobil</span>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-gray-100'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zM2.5 2a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm6 0A1.5 1.5 0 0110 1h3A1.5 1.5 0 0114.5 2.5v3A1.5 1.5 0 0113 7h-3A1.5 1.5 0 018.5 5.5v-3zm1.5.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zM1 10.5A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm1.5-.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm6 0A1.5 1.5 0 0110 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zm1.5.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-gray-100'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="text-center py-20 text-slate-500">Yuklanmoqda...</div>
            ) : cars.length === 0 ? (
              <div className="text-center py-20 text-slate-500">Avtomobillar topilmadi</div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {cars.map((car) => (
                  <Link key={car.id} to={`/used-cars/${car.id}`}>
                    <VehicleGridCard car={car} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {cars.map((car) => (
                  <Link key={car.id} to={`/used-cars/${car.id}`}>
                    <VehicleListCard car={car} />
                  </Link>
                ))}
              </div>
            )}

          <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
}

export default Catalog
