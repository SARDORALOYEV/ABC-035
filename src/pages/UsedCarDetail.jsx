import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { carsAPI } from '../api'
import DetailHeader from '../../bahodir/DetailHeader'
import MediaGallery from '../../bahodir/MediaGallery'
import TechnicalSpecs from '../../qobiljon/TechnicalSpecs'
import SellerCard from '../../baxrom/SellerCard'
import ContactForm from '../../baxrom/ContactForm'
import RecommendedCarousel from '../../qobiljon/RecommendedCarousel'

const getFavorites = () => {
  try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
}

const UsedCarDetail = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState(getFavorites)

  const toggleFavorite = useCallback((c) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f === c._id)
      const next = exists ? prev.filter((f) => f !== c._id) : [...prev, c._id]
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }, [])

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true)
      try {
        const res = await carsAPI.getById(id)
        setCar(res.data)

        const similarRes = await carsAPI.getAll({
          brand: res.data.brand,
          limit: 5,
          page: 1,
        })
        setSimilar(similarRes.data.filter((c) => c._id !== id).slice(0, 4))
      } catch (err) {
        setError(err.message || 'Avtomobil topilmadi')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchCar()
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-20 text-center text-slate-500">
        Yuklanmoqda...
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-20 text-center">
        <p className="text-red-500 mb-4">{error || 'Avtomobil topilmadi'}</p>
        <Link to="/catalog" className="text-red-600 hover:underline text-sm">Katalogga qaytish</Link>
      </div>
    )
  }

  const isFavorite = favorites.includes(car.id)

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-8">
      <DetailHeader car={car} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <MediaGallery images={car.images || []} />
          <TechnicalSpecs car={car} />
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-sm text-slate-900 mb-3">Tavsif</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{car.description || 'Tavsif mavjud emas'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <SellerCard seller={{ name: 'ABC Auto', since: 'ABC Auto rasmiy dileri' }} />
          <ContactForm carId={car.id} />
        </div>
      </div>

      <RecommendedCarousel cars={similar} />
    </div>
  )
}

export default UsedCarDetail
