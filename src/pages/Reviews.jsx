import { Star, MessageSquare, ThumbsUp, User, Quote } from 'lucide-react'

const reviewData = [
  {
    name: 'Александр Козлов',
    date: '15 мая 2026',
    rating: 5,
    text: 'Отличный автосалон! Покупал здесь свой первый автомобиль. Менеджеры профессионалы своего дела, все доходчиво объяснили и помогли с выбором. Оформление документов прошло быстро и без лишней суеты. Рекомендую!',
    likes: 12,
    tag: 'Покупка авто'
  },
  {
    name: 'Мария Иванова',
    date: '28 апреля 2026',
    rating: 5,
    text: 'Обращалась в техцентр для проведения планового ТО. Качеством обслуживания довольна: все сделали в срок, цена соответствовала заявленной. Очень удобная зона ожидания с вкусным кофе.',
    likes: 8,
    tag: 'Сервис'
  },
  {
    name: 'Дмитрий Петров',
    date: '10 апреля 2026',
    rating: 4,
    text: 'Хороший выбор автомобилей в наличии. Немного затянулось оформление страховки, но в целом впечатление положительное. Персонал вежливый и внимательный.',
    likes: 5,
    tag: 'Страхование'
  },
  {
    name: 'Елена Соколова',
    date: '22 марта 2026',
    rating: 5,
    text: 'Воспользовалась услугой trade-in. Оценили мой старый автомобиль по адекватной цене. Новую машину получила в тот же день. Огромное спасибо команде Азимут Варшавка!',
    likes: 15,
    tag: 'Trade-in'
  }
]

const Reviews = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 pt-2">
        <span>Главная</span>
        <span>/</span>
        <span className="text-gray-600">Отзывы</span>
      </div>

      {/* PAGE TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h1>
            <p className="text-gray-500">Мы ценим каждое мнение и постоянно работаем над улучшением качества нашего сервиса.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition shadow-lg shadow-red-600/20 flex items-center gap-3 w-fit">
          <MessageSquare className="w-5 h-5" />
          Оставить отзыв
        </button>
      </div>

      {/* RATING SUMMARY */}
      <section className="bg-slate-900 rounded-[3rem] p-8 md:p-12 mb-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Star className="w-64 h-64 rotate-12" />
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="md:border-r border-white/10 pr-4">
            <div className="text-7xl font-bold mb-4">4.9</div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-400 text-sm">Средняя оценка на основе 1,240 отзывов в Яндекс и Google</p>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-4">
            {[
              { label: 'Отлично', width: '92%', color: 'bg-green-500' },
              { label: 'Хорошо', width: '6%', color: 'bg-yellow-400' },
              { label: 'Нормально', width: '1%', color: 'bg-orange-400' },
              { label: 'Плохо', width: '0%', color: 'bg-red-400' },
              { label: 'Ужасно', width: '1%', color: 'bg-red-600' },
            ].map((row, index) => (
              <div key={index} className="flex items-center gap-6">
                <span className="text-sm font-medium text-gray-300 w-20 shrink-0">{row.label}</span>
                <div className="flex-grow h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${row.color} rounded-full transition-all duration-1000`} style={{ width: row.width }}></div>
                </div>
                <span className="text-sm font-bold text-gray-400 w-10 text-right">{row.width}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {reviewData.map((review, index) => (
          <div key={index} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group relative">
            <div className="absolute top-8 right-8 text-gray-50 group-hover:text-red-50 transition-colors">
                <Quote className="w-12 h-12" />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                <User className="w-7 h-7 text-gray-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{review.date}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{review.tag}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-100'}`} 
                  />
                ))}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 italic">
              "{review.text}"
            </p>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wider">
                <ThumbsUp className="w-4 h-4" />
                Полезно ({review.likes})
              </button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Проверено</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ACTION SECTION */}
      <section className="bg-red-600 rounded-[3rem] p-10 md:p-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Помогите нам стать лучше</h2>
          <p className="text-red-100 max-w-2xl mx-auto mb-10 text-lg">
              Ваш отзыв помогает другим пользователям сделать правильный выбор, 
              а нам — улучшить качество обслуживания.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-red-600 font-bold py-4 px-10 rounded-xl hover:bg-red-50 transition shadow-xl">
                  Написать отзыв
              </button>
              <button className="bg-transparent border-2 border-white/30 text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition">
                  Все площадки
              </button>
          </div>
      </section>
    </div>
  )
}

export default Reviews
