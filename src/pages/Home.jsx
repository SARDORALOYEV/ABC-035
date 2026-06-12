import CarBanner from '../components/CarBanner'
import QuickCarFilter from '../components/QuickCarFilter'
import CarCatalog from '../components/CarCatalog'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <CarBanner />
      <QuickCarFilter />
      <CarCatalog />
    </div>
  )
}

export default Home
