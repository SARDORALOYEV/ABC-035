import { useState } from 'react'
import { getCarImageUrl } from '../src/utils/imageHelper'

const CarPlaceholder = () => (
  <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h10a2 2 0 002-2M9 14a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const MediaGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const allImages = images.length > 0 ? images : []
  const current = allImages[selectedIndex] || null

  return (
    <div className="space-y-2">
      <div className="aspect-video bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center">
        {getCarImageUrl(current) ? (
          <img src={getCarImageUrl(current)} alt="Car" className="w-full h-full object-cover" />
        ) : (
          <CarPlaceholder />
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`w-24 h-16 rounded-lg shrink-0 overflow-hidden border-2 transition flex items-center justify-center ${
                i === selectedIndex ? 'border-red-500' : 'border-transparent'
              }`}
            >
              {getCarImageUrl(img) ? (
                <img src={getCarImageUrl(img)} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h10a2 2 0 002-2M9 14a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default MediaGallery
