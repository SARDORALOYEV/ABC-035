const AuthModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative mx-4">
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Tabs */}
        <div className="flex items-center border-b border-gray-200 mb-5">
          <button className="pb-2.5 text-sm font-bold text-red-600 border-b-2 border-red-600 mr-6">Kirish</button>
          <button className="pb-2.5 text-sm text-slate-500">Ro'yxatdan o'tish</button>
        </div>
        {/* Form */}
        <div className="space-y-3">
          <input className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-3 outline-none focus:border-red-400 transition" placeholder="Email" />
          <input className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-3 outline-none focus:border-red-400 transition" placeholder="Parol" type="password" />
          <button className="w-full bg-red-600 text-white text-sm font-bold py-3 rounded-lg hover:bg-red-700 transition">Kirish</button>
          <div className="flex items-center gap-3 my-3">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-slate-400">yoki</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-xs text-slate-600 hover:bg-gray-50 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-xs text-slate-600 hover:bg-gray-50 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
