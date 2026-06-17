import { useState } from 'react'
import { ordersAPI } from '../api'

const Contacts = () => {
  const [form, setForm] = useState({ fullName: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.phone) {
      setError('Ism va telefon raqam majburiy')
      return
    }
    setLoading(true)
    setError('')
    try {
      await ordersAPI.create({
        car: '000000000000000000000000',
        fullName: form.fullName,
        phone: form.phone,
        message: `Kontakt: ${form.message}`,
      })
      setSuccess(true)
      setForm({ fullName: '', phone: '', message: '' })
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Kontaktlar</h1>
      <p className="text-sm text-slate-500 mb-8">Biz bilan bog'lanish uchun quyidagi ma'lumotlardan foydalaning</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Manzil</h3>
            <p className="text-sm text-slate-600">Toshkent shahri, Mirzo Ulug'bek tumani,</p>
            <p className="text-sm text-slate-600">Amir Temur shoh ko'chasi, 100</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Telefon</h3>
            <p className="text-sm text-slate-600">+998 90 000 00 00</p>
            <p className="text-sm text-slate-600">+998 71 200 00 00</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Ish vaqti</h3>
            <p className="text-sm text-slate-600">Dushanba - Shanba: 09:00 - 20:00</p>
            <p className="text-sm text-slate-600">Yakshanba: 10:00 - 17:00</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Xabar yuborish</h3>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-600 font-medium">Xabaringiz yuborildi!</p>
              <button onClick={() => setSuccess(false)} className="mt-2 text-xs text-red-600 hover:underline">
                Yana xabar yuborish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ismingiz</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Xabar</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition h-28 resize-none"
                  placeholder="Xabaringizni yozing..."
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? 'Yuborilmoqda...' : 'Yuborish'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contacts
