import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import StudentWorksGallery from './components/StudentWorksGallery'

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

import { AdminAuthProvider } from './contexts/AdminAuthContext'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminAddCar from './pages/admin/AddCar'
import AdminSettings from './pages/admin/Settings'
import AdminLogin from './pages/admin/Login'
import AdminProfile from './pages/admin/Profile'
import AdminCarsList from './pages/admin/CarsList'
import AdminBrands from './pages/admin/Brands'
import AdminModels from './pages/admin/ModelsPage'
import AdminCategories from './pages/admin/CategoriesPage'
import AdminOrders from './pages/admin/Orders'
import AdminUsers from './pages/admin/UsersPage'
import AdminRoles from './pages/admin/RolesPage'
import AdminMessages from './pages/admin/MessagesPage'
import AdminAnalytics from './pages/admin/AnalyticsPage'
import AdminReports from './pages/admin/ReportsPage'

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-car" element={<AdminAddCar />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="cars" element={<AdminCarsList />} />
          <Route path="brands" element={<AdminBrands />} />
          <Route path="models" element={<AdminModels />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/history" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/roles" element={<AdminRoles />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="settings/seo" element={<AdminSettings />} />
          <Route path="settings/storage" element={<AdminSettings />} />
          <Route path="settings/security" element={<AdminSettings />} />
          <Route path="settings/notifications" element={<AdminSettings />} />
          <Route path="settings/appearance" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-[88px] xl:pt-[140px]">
              <Routes>
                <Route path="/students" element={<StudentWorksGallery />} />
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
            <Footer />
          </div>
        } />
      </Routes>
    </AdminAuthProvider>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  )
}

export default App
