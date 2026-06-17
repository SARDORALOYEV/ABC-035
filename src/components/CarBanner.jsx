import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import oq3 from '../../assets/oq3.svg'
import oq2 from '../../assets/oq2.svg'
import qizil1 from '../../assets/qizil1.svg'
import bgSwiper from '../../assets/bgswiper.svg'

const slides = [
  {
    badge: 'Осталось всего 10 авто!',
    title: 'Грандиозная распродажа тестового парка!',
    subtitle: 'Узнай свою цену!',
  },
]

const CarBanner = () => {
  return (
    <section className="mx-auto max-w-[1870px] px-4 sm:px-[25px] pt-[20px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="overflow-hidden !h-[300px] sm:!h-[400px] md:!h-[500px] lg:!h-[600px]"
        style={{
          borderRadius: '25px',
          opacity: 1,
          background: '#f3f4f6',
          backgroundImage: `url(${bgSwiper})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="!h-full">
            <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12 h-full">
              <div className="w-full md:w-1/2 z-10">
                <span className="inline-block bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded mb-3 sm:mb-4">
                  {slide.badge}
                </span>
                <h1 className="font-['Roboto'] font-bold text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] leading-[100%] text-gray-900 mb-2 sm:mb-3">
                  {slide.title}
                </h1>
                <p className="font-['Roboto'] font-normal text-[18px] sm:text-[22px] md:text-[29px] leading-[100%] text-gray-500">
                  {slide.subtitle}
                </p>
              </div>

              <div className="w-full md:w-1/2 relative h-[140px] sm:h-[180px] md:h-[250px] lg:h-[300px] mt-4 sm:mt-6 md:mt-0">
                <img
                  src={oq3}
                  alt=""
                  className="absolute bottom-0 right-0 h-[65%] md:h-[70%] object-contain z-[1] opacity-40"
                />
                <img
                  src={oq2}
                  alt=""
                  className="absolute bottom-0 right-[15%] md:right-[18%] h-[80%] md:h-[85%] object-contain z-[2]"
                />
                <img
                  src={qizil1}
                  alt="Kia Rio"
                  className="absolute bottom-0 right-[30%] md:right-[35%] h-[95%] md:h-full object-contain z-[3] drop-shadow-[-4px_8px_12px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default CarBanner
