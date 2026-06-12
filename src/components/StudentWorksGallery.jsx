import FilterSidebar from '../../behruz/FilterSidebar'
import VehicleGridCard from '../../meyirlan/VehicleGridCard'
import VehicleListCard from '../../meyirlan/VehicleListCard'
import Pagination from '../../meyirlan/Pagination'
import MediaGallery from '../../bahodir/MediaGallery'
import DetailHeader from '../../bahodir/DetailHeader'
import TechnicalSpecs from '../../qobiljon/TechnicalSpecs'
import RecommendedCarousel from '../../qobiljon/RecommendedCarousel'
import SellerCard from '../../baxrom/SellerCard'
import ContactForm from '../../baxrom/ContactForm'
import AuthModal from '../../azamat/AuthModal'
import DashboardSidebar from '../../azamat/DashboardSidebar'
import MyListingsTable from '../../ayub/MyListingsTable'
import SavedCarsGrid from '../../ayub/SavedCarsGrid'
import FormStepper from '../../mansur/FormStepper'
import VehicleBasicInfoForm from '../../mansur/VehicleBasicInfoForm'
import ImageUploadZone from '../../asadbek/ImageUploadZone'
import PricingAndSubmitForm from '../../asadbek/PricingAndSubmitForm'
import BlogHome from '../../aziz/BlogHome'
import ArticleCard from '../../aziz/ArticleCard'
import CompareMatrix from '../../sohiba/CompareMatrix'
import StaticInfo from '../../sohiba/StaticInfo'
import HeroBanner from '../../xayriddin/HeroBanner'

const Section = ({ title, student, children }) => (
  <div className="border border-gray-200 rounded-xl p-5 bg-white">
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">{student}</span>
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
    </div>
    {children}
  </div>
)

const StudentWorksGallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Student Works Gallery</h1>
        <p className="text-sm text-slate-500 mt-1">Barcha talaba komponentlari bir sahifada</p>
      </div>

      {/* Asadbek */}
      <Section title="ImageUploadZone + PricingAndSubmitForm" student="Asadbek">
        <ImageUploadZone />
        <PricingAndSubmitForm />
      </Section>

      {/* Mansur */}
      <Section title="FormStepper + VehicleBasicInfoForm" student="Mansur">
        <FormStepper />
        <VehicleBasicInfoForm />
      </Section>

      {/* Behruz */}
      <Section title="FilterSidebar" student="Behruz">
        <div className="flex gap-6">
          <FilterSidebar />
          <div className="flex-1 min-h-[300px] bg-gray-50 rounded-lg flex items-center justify-center text-xs text-slate-400">Katalog kontenti</div>
        </div>
      </Section>

      {/* Bahodir */}
      <Section title="MediaGallery + DetailHeader" student="Bahodir">
        <DetailHeader />
        <MediaGallery />
      </Section>

      {/* Xayriddin - Navbar already rendered globally */}
      <Section title="Navbar + HeroBanner" student="Xayriddin">
        <p className="text-xs text-slate-500 mb-3">Navbar yuqorida global tarzda ishlamoqda. HeroBanner quyida:</p>
        <HeroBanner />
      </Section>

      {/* Meyirlan */}
      <Section title="VehicleGridCard + VehicleListCard + Pagination" student="Meyirlan">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <VehicleGridCard />
          <VehicleGridCard />
          <VehicleGridCard />
        </div>
        <VehicleListCard />
        <Pagination />
      </Section>

      {/* Qobiljon */}
      <Section title="TechnicalSpecs + RecommendedCarousel" student="Qobiljon">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TechnicalSpecs />
          <div>
            <RecommendedCarousel />
          </div>
        </div>
      </Section>

      {/* Ayub */}
      <Section title="MyListingsTable + SavedCarsGrid" student="Ayub">
        <MyListingsTable />
        <SavedCarsGrid />
      </Section>

      {/* Azamat */}
      <Section title="AuthModal + DashboardSidebar" student="Azamat">
        <div className="relative h-[400px] overflow-hidden rounded-xl">
          <AuthModal />
        </div>
        <div className="mt-4">
          <DashboardSidebar />
        </div>
      </Section>

      {/* Baxrom */}
      <Section title="SellerCard + ContactForm" student="Baxrom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SellerCard />
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Aziz */}
      <Section title="BlogHome + ArticleCard" student="Aziz">
        <div className="mb-6">
          <BlogHome />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </Section>

      {/* Sohiba */}
      <Section title="CompareMatrix + StaticInfo" student="Sohiba">
        <div className="mb-6">
          <CompareMatrix />
        </div>
        <StaticInfo />
      </Section>
    </div>
  )
}

export default StudentWorksGallery
