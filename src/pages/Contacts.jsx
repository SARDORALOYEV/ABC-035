import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react'

const Contacts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 pt-2">
        <span>Главная</span>
        <span>/</span>
        <span className="text-gray-600">Контакты</span>
      </div>

      {/* PAGE TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Контакты</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* CONTACT INFO CARDS */}
        <div className="lg:col-span-1 space-y-4">
          {[
            { 
              icon: <MapPin className="w-6 h-6 text-red-600" />, 
              title: 'Адрес', 
              text: 'г. Москва, 38-й км МКАД, д. 6Б, стр. 1' 
            },
            { 
              icon: <Phone className="w-6 h-6 text-red-600" />, 
              title: 'Телефон', 
              text: '+7 (800) 551-94-31\n+7 (495) 123-45-67' 
            },
            { 
              icon: <Mail className="w-6 h-6 text-red-600" />, 
              title: 'E-mail', 
              text: 'info@azimut-v.ru\nsale@azimut-v.ru' 
            },
            { 
              icon: <Clock className="w-6 h-6 text-red-600" />, 
              title: 'Режим работы', 
              text: 'Ежедневно: с 09:00 до 21:00' 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-red-100 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 rounded-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAP & INFO */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-[2rem] overflow-hidden h-[450px] shadow-xl border border-gray-100 bg-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2255.485586616421!2d37.525586!3d55.584742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDM1JzA1LjEiTiAzN8KwMzEnMzIuMSJF!5e0!3m2!1sru!2sru!4v1625567890123!5m2!1sru!2sru" 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                allowFullScreen="" 
                loading="lazy"
                title="Google Map"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white p-6 rounded-2xl shadow-2xl border border-gray-50">
                <h4 className="font-bold text-gray-900 mb-2">Как добраться?</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Бесплатный трансфер от метро Аннино каждые 15 минут. Или 10 минут пешком от остановки "38-й км МКАД".
                </p>
                <button className="w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-black transition">
                  Проложить маршрут
                </button>
              </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-[2rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Ждем вас в нашем автосалоне!</h2>
                <p className="text-red-100 text-sm">Приезжайте на тест-драйв в любой удобный день.</p>
            </div>
            <button className="bg-white text-red-600 font-bold py-4 px-8 rounded-xl hover:bg-red-50 transition shrink-0">
                Показать на карте
            </button>
          </div>
        </div>
      </div>

      {/* FEEDBACK FORM */}
      <section className="bg-gray-50 rounded-[3rem] p-8 md:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex p-3 bg-red-600 rounded-2xl mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Есть вопросы? <br />
              <span className="text-red-600">Напишите нам</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">
              Наши специалисты всегда на связи и готовы проконсультировать вас по любым вопросам выбора и покупки авто.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">WA</div>
                <span className="font-bold text-gray-900 text-sm">WhatsApp</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">TG</div>
                <span className="font-bold text-gray-900 text-sm">Telegram</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-50">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 px-1">Имя</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-red-500 focus:bg-white transition" 
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 px-1">Телефон</label>
                  <input 
                    type="tel" 
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-red-500 focus:bg-white transition" 
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 px-1">Сообщение</label>
                <textarea 
                  className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-red-500 focus:bg-white transition h-32 resize-none" 
                  placeholder="Ваш вопрос..."
                ></textarea>
              </div>
              <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-xl transition flex items-center justify-center gap-3 text-lg">
                <Send className="w-5 h-5" />
                Отправить запрос
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contacts
