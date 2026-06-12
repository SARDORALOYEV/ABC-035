import { Heart, GitCompare, Gift, Zap, Fuel, Gauge, Timer } from 'lucide-react'

import cardPhoto from '../../assets/cardphoto.svg'

const iconMap = { Zap, Fuel, Gauge, Timer }

const perkParts = (text) => {
  const idx = text.indexOf('в подарок')
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx).trim()}
      <br />
      <span className="text-[#cc0000] font-semibold">в подарок</span>
    </>
  )
}

const CarCard = ({ car }) => {
  return (
    <div
      className="bg-white rounded-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-6 flex flex-col justify-between mx-auto"
      style={{ width: '446px', height: '449px', fontFamily: "'Roboto', sans-serif" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3
            className="font-bold capitalize text-[#111827]"
            style={{ fontSize: '27px', lineHeight: '100%' }}
          >
            {car.brand} {car.model}
          </h3>
          <p className="font-bold text-[15px] text-[#6b7280] mt-1">
            {car.modification}
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <Heart size={20} className="text-gray-400 hover:text-red-500 transition-colors" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <GitCompare size={20} className="text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="bg-[#cc0000] text-white text-[11px] font-bold leading-none inline-flex items-center">
          <span className="px-3 py-1">Предложение дня</span>
          <span className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[8px] border-l-[#cc0000]" />
        </span>
        <span className="text-[#cc0000] text-[11px] font-bold leading-none">Выгода до 300 000 ₽</span>
      </div>

      <div className="relative" style={{ height: '160px' }}>
        <div className="flex flex-col gap-2.5">
          {car.perks.map((perk, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#333] flex items-center justify-center shrink-0 mt-0.5">
                <Gift size={12} className="text-white" />
              </div>
              <span className="text-[12px] text-gray-700 leading-tight">{perkParts(perk)}</span>
            </div>
          ))}
        </div>

        <img
          src={cardPhoto}
          alt={`${car.brand} ${car.model}`}
          className="absolute object-contain"
          style={{ width: '273px', height: '152px', top: '5px', left: '148px' }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[25px] font-black text-gray-900 tracking-tight leading-none">{car.price}</p>
        <p className="text-[13px] text-gray-700 leading-tight">{car.creditPrice}</p>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {car.techSpecs.map((spec, i) => {
          const Icon = iconMap[spec.icon]
          return (
            <div
              key={i}
              className="flex items-center justify-center gap-1 border border-gray-200 rounded-full py-1.5 px-1 bg-white text-[11px] font-bold text-gray-700"
            >
              {Icon && <Icon size={12} className="shrink-0 text-gray-400" />}
              <span className="leading-none">{spec.label}</span>
            </div>
          )
        })}
      </div>

      <div className="w-full h-[48px] rounded-xl overflow-hidden relative bg-transparent select-none isolation-isolate">
        <button
          className="absolute left-0 top-0 h-full bg-[#cc0000] hover:bg-[#b30000] cursor-pointer active:scale-[0.98] transition-all outline-none border-none flex items-center justify-center"
          style={{ width: '40%', zIndex: 30, clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)', paddingRight: '4px' }}
        >
          <span className="w-full text-center text-[13px] font-bold truncate block px-3">Резерв онлайн</span>
        </button>
        <button
          className="absolute top-0 h-full bg-[#1e2229] hover:bg-[#2d333b] cursor-pointer active:scale-[0.98] transition-all outline-none border-none flex items-center justify-center"
          style={{ left: '30%', width: '36%', zIndex: 20, clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%)' }}
        >
          <span className="w-full text-center text-[13px] font-bold truncate block" style={{ padding: '0 10px 0 22px' }}>Купить</span>
        </button>
        <button
          className="absolute top-0 h-full bg-[#7a7e85] hover:bg-[#8a8e95] cursor-pointer active:scale-[0.98] transition-all outline-none border-none flex items-center justify-center"
          style={{ left: '57%', right: 0, zIndex: 10, clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%)', padding: '0 8px' }}
        >
          <span className="w-full text-center text-[13px] font-bold truncate block" style={{ padding: '0 18px' }}>Подробнее</span>
        </button>
      </div>
    </div>
  )
}

export default CarCard
