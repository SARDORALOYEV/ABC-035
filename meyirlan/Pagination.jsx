const Pagination = ({ page, pages, onPageChange }) => {
  const getPages = () => {
    const delta = 2
    const range = []
    for (let i = Math.max(1, page - delta); i <= Math.min(pages, page + delta); i++) {
      range.push(i)
    }
    if (range[0] > 1) {
      if (range[0] > 2) range.unshift('...')
      range.unshift(1)
    }
    if (range[range.length - 1] < pages) {
      if (range[range.length - 1] < pages - 1) range.push('...')
      range.push(pages)
    }
    return range
  }

  if (pages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-xs text-slate-500 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`dot-${i}`} className="w-9 h-9 flex items-center justify-center text-xs text-slate-400">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center transition ${
              p === page
                ? 'bg-red-600 text-white'
                : 'border border-gray-200 text-slate-600 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-xs text-slate-500 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
