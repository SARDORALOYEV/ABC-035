import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-8xl font-extrabold text-gray-200 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Sahifa topilmadi</p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}

export default Error404
