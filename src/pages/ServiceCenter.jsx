import { Wrench, Settings, ShieldCheck, CheckCircle2, Phone, Calendar, PenTool, ClipboardList, Gauge } from 'lucide-react'

const services = [
  {
    icon: <Gauge className="w-8 h-8 text-red-600" />,
    title: 'Компьютерная диагностика',
    description: 'Полная проверка всех электронных систем автомобиля на современном оборудовании для выявления скрытых неисправностей.'
  },
  {
    icon: <Settings className="w-8 h-8 text-red-600" />,
    title: 'Техническое обслуживание',
    description: 'Плановое ТО, замена масла, фильтров и всех необходимых расходных материалов согласно регламенту производителя.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
    title: 'Ремонт двигателя',
    description: 'Капитальный и текущий ремонт бензиновых и дизельных двигателей любой сложности с гарантией на выполненные работы.'
  },
  {
    icon: <PenTool className="w-8 h-8 text-red-600" />,
    title: 'Ремонт ходовой части',
    description: 'Диагностика и ремонт подвески, замена амортизаторов, сайлентблоков и рычагов для вашей безопасности на дороге.'
  },
  {
    icon: <Wrench className="w-8 h-8 text-red-600" />,
    title: 'Ремонт трансмиссии',
    description: 'Обслуживание и ремонт МКПП, АКПП, вариаторов и роботизированных коробок передач любой конфигурации.'
  },
  {
    icon: <ClipboardList className="w-8 h-8 text-red-600" />,
    title: 'Тормозная система',
    description: 'Замена колодок, дисков, тормозной жидкости и ремонт суппортов. Мы заботимся о вашей безопасности.'
  }
]

const ServiceCenter = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 pt-2">
        <span>Главная</span>
        <span>/</span>
        <span className="text-gray-600">Техцентр</span>
      </div>

      {/* PAGE TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Техцентр</h1>

      {/* HERO SECTION - REFACTORED (No design image) */}
      <section className="mb-16 rounded-[2.5rem] overflow-hidden bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center min-h-[400px]">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 w-fit uppercase tracking-wider">
            Официальный сервис
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-2xl text-white leading-tight">
            Профессиональный сервис <br /> 
            <span className="text-red-500">с гарантией качества</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
            Наш технический центр оснащен новейшим диагностическим и ремонтным оборудованием. 
            Мы обслуживаем автомобили всех марок, соблюдая мировые стандарты качества.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#appointment" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition shadow-lg shadow-red-600/20"
            >
              Записаться на сервис
            </a>
            <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-xl border border-white/10 text-white">
              <Phone className="w-5 h-5 text-red-500" />
              <span className="font-semibold">+7 (800) 551-94-31</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements instead of image */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:flex items-center justify-center">
            <div className="w-64 h-64 border-8 border-red-600/10 rounded-full animate-pulse"></div>
            <div className="absolute w-48 h-48 border-8 border-red-600/20 rounded-full"></div>
            <Wrench className="absolute w-32 h-32 text-red-600/10 rotate-12" />
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-gray-600 leading-relaxed">
              Мы предлагаем полный цикл обслуживания вашего автомобиля: от быстрой диагностики 
              до капитального ремонта агрегатов.
            </p>
          </div>
          <div className="flex items-center gap-2 text-red-600 font-bold cursor-pointer hover:gap-3 transition-all">
            <span>Все услуги</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-red-100 hover:shadow-2xl hover:shadow-red-900/5 transition-all group duration-300">
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* APPOINTMENT FORM SECTION */}
      <section id="appointment" className="bg-red-600 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Settings className="w-64 h-64 animate-spin-slow" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Запишитесь онлайн</h2>
            <p className="text-red-50 text-lg mb-8 leading-relaxed max-w-md">
              Оставьте заявку на обслуживание, и мы свяжемся с вами в течение 10 минут, 
              чтобы подобрать удобное время.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <CheckCircle2 />, text: 'Бесплатная диагностика при ремонте' },
                { icon: <CheckCircle2 />, text: 'Собственный склад запчастей' },
                { icon: <CheckCircle2 />, text: 'Гарантия на все работы 1 год' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-red-50">
                  <span className="text-white">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Ваше имя</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-red-500 focus:bg-white text-gray-900 transition" 
                  placeholder="Введите имя"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Телефон</label>
                <input 
                  type="tel" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-red-500 focus:bg-white text-gray-900 transition" 
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Марка автомобиля</label>
                <select className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-red-500 focus:bg-white text-gray-900 transition appearance-none cursor-pointer">
                  <option>Выберите марку</option>
                  <option>Toyota</option>
                  <option>Kia</option>
                  <option>Hyundai</option>
                  <option>Mercedes-Benz</option>
                  <option>BMW</option>
                </select>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-xl transition shadow-lg shadow-red-600/20 text-lg mt-4">
                Отправить заявку
              </button>
              <p className="text-[10px] text-gray-400 text-center leading-tight mt-4">
                Нажимая кнопку, вы подтверждаете согласие на обработку <br /> 
                персональных данных
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: '10+', label: 'Лет работы' },
          { value: '15k', label: 'Запчастей' },
          { value: '25', label: 'Мастеров' },
          { value: '100%', label: 'Качество' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ServiceCenter
