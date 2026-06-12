import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Brand from './pages/Brand'
import Model from './pages/Model'
import Trim from './pages/Trim'
import UsedCars from './pages/UsedCars'
import UsedCarDetail from './pages/UsedCarDetail'
import Favorites from './pages/Favorites'
import Collections from './pages/Collections'
import CollectionDetail from './pages/CollectionDetail'
import FamilyCar from './pages/FamilyCar'
import FirstCar from './pages/FirstCar'
import TradeIn from './pages/TradeIn'
import MedicalWorkers from './pages/MedicalWorkers'
import Recycling from './pages/Recycling'
import CreditInstallment from './pages/CreditInstallment'
import ExpressCredit from './pages/ExpressCredit'
import Installment from './pages/Installment'
import TaxiCredit from './pages/TaxiCredit'
import TaxiCreditDetail from './pages/TaxiCreditDetail'
import ModelCredit from './pages/ModelCredit'
import Insurance from './pages/Insurance'
import About from './pages/About'
import ServiceCenter from './pages/ServiceCenter'
import Contacts from './pages/Contacts'
import CarSelectionNew from './pages/CarSelectionNew'
import CarSelectionUsed from './pages/CarSelectionUsed'
import Reviews from './pages/Reviews'
import ReviewDetail from './pages/ReviewDetail'
import Blog from './pages/Blog'
import Article from './pages/Article'
import ComparisonNew from './pages/ComparisonNew'
import ComparisonTaxi from './pages/ComparisonTaxi'
import Error404 from './pages/Error404'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-[140px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/model" element={<Model />} />
          <Route path="/trim" element={<Trim />} />
          <Route path="/used-cars" element={<UsedCars />} />
          <Route path="/used-cars/:id" element={<UsedCarDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />
          <Route path="/family-car" element={<FamilyCar />} />
          <Route path="/first-car" element={<FirstCar />} />
          <Route path="/trade-in" element={<TradeIn />} />
          <Route path="/medical-workers" element={<MedicalWorkers />} />
          <Route path="/recycling" element={<Recycling />} />
          <Route path="/credit-installment" element={<CreditInstallment />} />
          <Route path="/express-credit" element={<ExpressCredit />} />
          <Route path="/installment" element={<Installment />} />
          <Route path="/taxi-credit" element={<TaxiCredit />} />
          <Route path="/taxi-credit/:id" element={<TaxiCreditDetail />} />
          <Route path="/model-credit" element={<ModelCredit />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/about" element={<About />} />
          <Route path="/service-center" element={<ServiceCenter />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/car-selection-new" element={<CarSelectionNew />} />
          <Route path="/car-selection-used" element={<CarSelectionUsed />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:id" element={<ReviewDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Article />} />
          <Route path="/comparison-new" element={<ComparisonNew />} />
          <Route path="/comparison-taxi" element={<ComparisonTaxi />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
