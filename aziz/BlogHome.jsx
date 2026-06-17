const BlogHome = () => {
  return (
    <div>
      {/* Hero article */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-5 min-h-[200px]">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block">Yangilik</span>
          <h2 className="text-white text-xl font-bold">Yangi BMW X5 2024 rasmiy taqdimoti</h2>
          <p className="text-white/80 text-xs mt-1">Yangi dizayn, gibrid dvigatel va eng so'nggi texnologiyalar</p>
        </div>
      </div>
      {/* Grid articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[16/9] bg-gray-100" />
            <div className="p-3">
              <p className="text-xs text-slate-400 mb-1">15.05.2024</p>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Avtomobil sanoatidagi eng so'nggi yangiliklar</h4>
              <p className="text-xs text-slate-500 line-clamp-2">Qisqacha tavsif matni bu yerda joylashadi va ikki qatordan oshsa kesiladi.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogHome
