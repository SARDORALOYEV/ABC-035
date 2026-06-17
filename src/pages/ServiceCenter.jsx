const ServiceCenter = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-[25px] py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Texnik xizmat ko'rsatish markazi</h1>
      <p className="text-sm text-slate-500 mb-8">Avtomobilingiz uchun professional xizmat</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Diagnostika</h3>
          <p className="text-xs text-slate-500">Kompyuter diagnostikasi va nosozliklarni aniqlash</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Ta'mirlash</h3>
          <p className="text-xs text-slate-500">Har qanday murakkablikdagi ta'mirlash ishlari</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Xizmat</h3>
          <p className="text-xs text-slate-500">Muntazam texnik xizmat ko'rsatish</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">Biz bilan bog'laning</h3>
        <p className="text-sm text-slate-600">Telefon: +998 90 000 00 00</p>
        <p className="text-sm text-slate-600">Manzil: Toshkent shahri, Amir Temur shoh ko'chasi, 100</p>
        <p className="text-sm text-slate-600">Ish vaqti: Dushanba - Shanba 09:00 - 20:00</p>
      </div>
    </div>
  )
}

export default ServiceCenter
