const FormStepper = () => {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {[
        { step: 1, label: 'Avtomobil', active: true, done: true },
        { step: 2, label: "Ma'lumotlar", active: true, done: false },
        { step: 3, label: 'Rasmlar va narx', active: false, done: false },
      ].map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${
                s.done
                  ? 'bg-green-500 border-green-500 text-white'
                  : s.active
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'border-gray-300 text-slate-400'
              }`}
            >
              {s.done ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s.step
              )}
            </div>
            <span className={`text-[10px] mt-1 ${s.active ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>{s.label}</span>
          </div>
          {i < 2 && (
            <div className={`w-16 h-0.5 mx-2 mb-4 ${s.done ? 'bg-green-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default FormStepper
