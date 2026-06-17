import { useState, useEffect } from 'react'
import { carsAPI, ordersAPI } from '../api'

const TradeIn = () => {
  const [cars, setCars] = useState([])
  const [form, setForm] = useState({ car: '', fullName: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      try {
        const res = await carsAPI.getAll({ limit: 50 })
        setCars(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.car || !form.fullName || !form.phone) {
      setError('Avtomobil, ism va telefon raqam majburiy')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await ordersAPI.create({
        car: form.car,
        fullName: form.fullName,
        phone: form.phone,
        message: `Trade-In: ${form.message}`,
      })
      setSuccess(true)
      setForm({ car: '', fullName: '', phone: '', message: '' })
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-[25px] py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade-In</h1>
      <p className="text-sm text-slate-500 mb-8">Eski avtomobilingizni baholaymiz va yangisiga almashtiramiz</p>

      {success ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">So'rovingiz qabul qilindi!</h2>
          <p className="text-sm text-slate-500 mb-6">Tez orada siz bilan bog'lanamiz.</p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition"
          >
            Yana so'rov yuborish
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avtomobil</label>
            {loading ? (
              <div className="text-xs text-slate-400">Yuklanmoqda...</div>
            ) : (
              <select
                name="car"
                value={form.car}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition"
                required
              >
                <option value="">Avtomobilni tanlang</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.brand} {car.model} ({car.year}) - {Number(car.price).toLocaleString('ru-RU')} {car.currency}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To'liq ismingiz</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition"
              placeholder="Ism Familiya"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition"
              placeholder="+998 90 000 00 00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qo'shimcha ma'lumot</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition h-24 resize-none"
              placeholder="Avtomobilingiz haqida ma'lumot..."
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {submitting ? 'Yuborilmoqda...' : 'So\'rov yuborish'}
          </button>
        </form>
      )}
    </div>
  )
}

export default TradeIn
