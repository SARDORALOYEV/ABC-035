import { useState } from 'react'

const reviewsData = [
  { id: 1, name: 'Alexandr', car: 'BMW X5 2023', rating: 5, text: 'Ajoyib avtomobil! Tez yetkazib berishdi, barcha hujjatlar tartibli. Juda mamnunman.', date: '2024-05-15' },
  { id: 2, name: 'Dmitriy', car: 'Mercedes-Benz E-Class 2022', rating: 4, text: 'Yaxshi tanlov, lekin yetkazib berish biroz kechikdi. Avtomobil sifatli.', date: '2024-04-20' },
  { id: 3, name: 'Jahongir', car: 'Toyota Camry 2023', rating: 5, text: 'Tez va sifatli xizmat. Hammasi yoqdi!', date: '2024-03-10' },
]

const Reviews = () => {
  const [visible, setVisible] = useState(3)

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sharhlar</h1>
      <p className="text-sm text-slate-500 mb-6">Mijozlarimizning fikrlari</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviewsData.slice(0, visible).map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500 font-bold">
                {review.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{review.name}</p>
                <p className="text-[11px] text-slate-400">{review.car}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className={`w-4 h-4 ${i <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{review.text}</p>
            <p className="text-[10px] text-slate-400 mt-2">{review.date}</p>
          </div>
        ))}
      </div>

      {visible < reviewsData.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisible(reviewsData.length)}
            className="bg-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-red-700 transition"
          >
            Barcha sharhlarni ko'rish
          </button>
        </div>
      )}
    </div>
  )
}

export default Reviews
