import { User, Award } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Uzbekistan from '@react-map/uzbekistan'
import { uzbekistanRegions } from '../../RegionColors'
import 'swiper/css'
import 'swiper/css/navigation'

const partners = ['СБЕР БАНК', 'ВТБ', 'Альфа-Банк', 'СБЕР БАНК', 'Газпромбанк', 'Россельхозбанк']

const About = () => {
  const cityColors = Object.keys(uzbekistanRegions).reduce((acc, key) => {
    acc[key] = uzbekistanRegions[key].defaultFill
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 pt-2">
        <span>Главная</span>
        <span>/</span>
        <span className="text-gray-600">О компании</span>
      </div>

      {/* PAGE TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">О компании</h1>

      {/* DESCRIPTION & BENEFITS */}
      <section className="mb-14">
        <p className="text-gray-600 leading-relaxed mb-5 max-w-4xl">
          Автосалон &laquo;Азимут Варшавка&raquo; &mdash; это современный мультибрендовый дилерский центр,
          расположенный на 38-м километре МКАД. Мы предлагаем широкий выбор новых автомобилей
          и автомобилей с пробегом ведущих мировых брендов, а также полный спектр сопутствующих
          услуг: кредитование, страхование, trade-in, выкуп автомобилей и сервисное обслуживание.
          Наша команда профессионалов помогает каждому клиенту найти идеальный автомобиль
          с учётом всех пожеланий и бюджета.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4 font-medium">
          Выбирая автосалон Азимут Варшавка Вы получаете:
        </p>
        <ul className="space-y-2.5 mb-6 max-w-3xl">
          {[
            'Гарантированное качество и безопасность каждого автомобиля',
            'Индивидуальные условия кредитования от ведущих банков-партнёров',
            'Профессиональную помощь в выборе автомобиля с учётом ваших потребностей',
            'Trade-in вашего старого автомобиля с максимальной выгодой',
            'Полное юридическое сопровождение сделки купли-продажи',
            'Сервисное обслуживание и гарантийный ремонт в собственном техцентре',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
              <span className="w-2 h-2 bg-red-600 rounded-sm mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600 leading-relaxed max-w-4xl">
          Мы ценим каждого клиента и стремимся сделать процесс покупки автомобиля максимально
          комфортным и прозрачным. Наши менеджеры всегда готовы проконсультировать вас по любым
          вопросам, предложить лучшие условия и сопроводить вас на всех этапах &mdash; от выбора
          до полной передачи автомобиля. Азимут Варшавка &mdash; с нами Вам покорятся все направления!
        </p>
      </section>

      {/* SHOWROOM GALLERY */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Фото автосалона</h2>
          <div className="flex items-center gap-2 gallery-nav">
            <button className="gallery-prev w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="gallery-next w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: '.gallery-prev', nextEl: '.gallery-next' }}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <SwiperSlide key={i}>
              <div className="h-56 md:h-64 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 overflow-hidden">
                <span className="text-sm font-medium">Фото {i}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* INFOGRAPHICS & STATISTICS */}
      <section className="mb-14">
        <div className="border border-blue-400 rounded-[2rem] p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT - STATS */}
            <div className="lg:w-2/5 space-y-6">
              <div>
                <span className="text-6xl md:text-7xl font-bold text-red-600 leading-none">12</span>
                <p className="text-gray-600 mt-1 text-lg">Городов присутствия</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-gray-700">1000 работников</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-gray-700">20 лет на рынке</span>
                </div>
              </div>
            </div>

            {/* RIGHT - MAP */}
            <div className="lg:w-3/5">
              <div className="bg-white rounded-xl p-4 md:p-6 flex items-center justify-center min-h-[350px]">
                <div className="w-full max-w-[550px] [&_path]:hover:brightness-90 [&_path]:hover:scale-[1.1] [&_path]:[transform-box:fill-box] [&_path]:origin-center [&_path]:transition-all [&_path]:duration-500 [&_path]:ease-in-out cursor-pointer">
                  <Uzbekistan
                    type="select-single"
                    size={550}
                    mapColor="#E5E7EB"
                    strokeColor="#FFFFFF"
                    strokeWidth={1.5}
                    selectColor="#DC2626"
                    cityColors={cityColors}
                    hints={true}
                    disableHover={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER BANKS */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Банки-партнеры</h2>
          <div className="flex items-center gap-2 partner-nav">
            <button className="partner-prev w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="partner-next w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: '.partner-prev', nextEl: '.partner-next' }}
          spaceBetween={16}
          slidesPerView={2}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {partners.map((name, i) => (
            <SwiperSlide key={i}>
              <div className="bg-gray-50 rounded-xl h-28 flex items-center justify-center px-4">
                <span className="text-sm font-bold text-gray-700 text-center leading-tight">
                  {name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}

export default About
