import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import WriteReview from './pages/WriteReview';
import Login from './pages/Login';
import Register from './pages/Register';
import ForBusinesses from './pages/ForBusinesses';
import Categories from './pages/Categories';
import RequestDemo from './pages/RequestDemo';
import BusinessSignup from './pages/BusinessSignup';
import DashboardAnalytics from './pages/DashboardAnalytics';
import SocialMediaTools from './pages/SocialMediaTools';
import TrustBoxWidgets from './pages/TrustBoxWidgets';
import ReviewInsights from './pages/ReviewInsights';
import VisitorInsights from './pages/VisitorInsights';
import DataSolutionsPage from './pages/DataSolutions';
import AboutTruthboard from './pages/AboutTruthboard';
import ContactTruthboard from './pages/ContactTruthboard';
import MyReviews from './pages/MyReviews';
import EditReview from './pages/EditReview';
import SalesforceIntegration from './pages/SalesforceIntegration';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';

import { AuthProvider } from './context/AuthContext';
import { Navigation, Footer } from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import GlobalErrorBoundary from './components/GlobalErrorBoundary';

function AppContent() {
  const location = useLocation();
  const isBusinessPage = location.pathname.startsWith('/business') || 
                         location.pathname.startsWith('/request') || 
                         location.pathname === '/datasolutions' ||
                         location.pathname === '/about' ||
                         location.pathname === '/contact' ||
                         location.pathname === '/pricing' ||
                         location.pathname === '/blog' ||
                         location.pathname.includes('/company') ||
                         location.pathname.startsWith('/features/');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isBusinessPage && <Navigation />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:slug" element={<CompanyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/business" element={<ForBusinesses />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/request demo" element={<RequestDemo />} />
          <Route path="/business/signup" element={<BusinessSignup />} />
          <Route path="/features/dashboard-analytics" element={<DashboardAnalytics />} />
          <Route path="/features/social-media-tools" element={<SocialMediaTools />} />
          <Route path="/features/trustbox-widgets" element={<TrustBoxWidgets />} />
          <Route path="/features/review-insights" element={<ReviewInsights />} />
          <Route path="/features/visitor-insights" element={<VisitorInsights />} />
          <Route path="/datasolutions" element={<DataSolutionsPage />} />
          <Route path="/about" element={<AboutTruthboard />} />
          <Route path="/contact" element={<ContactTruthboard />} />
          <Route path="/features/salesforce-integration" element={<SalesforceIntegration />} />
          <Route path="/features/salesforce_integration" element={<SalesforceIntegration />} />
          <Route path="/features/salesforce integration" element={<SalesforceIntegration />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/business/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/write_review" element={<WriteReview />} />
          <Route path="/company/:companyId/review" element={<WriteReview />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/edit-review/:reviewId" element={<EditReview />} />
            <Route path="/edit review/:reviewId" element={<EditReview />} />
          </Route>
        </Routes>
      </main>
      {!isBusinessPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
