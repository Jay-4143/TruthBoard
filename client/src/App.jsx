import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import WriteReview from './pages/WriteReview';
import Login from './pages/Login';
import Register from './pages/Register';
import ForBusinesses from './pages/ForBusinesses';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import RequestDemo from './pages/RequestDemo';
import BusinessSignup from './pages/BusinessSignup';
import BusinessLogin from './pages/BusinessLogin';
import DashboardAnalytics from './pages/DashboardAnalytics';
import SocialMediaTools from './pages/SocialMediaTools';
import TrustBoxWidgets from './pages/TrustBoxWidgets';
import ReviewInsights from './pages/ReviewInsights';
import VisitorInsights from './pages/VisitorInsights';
import DataSolutionsPage from './pages/DataSolutions';
import AboutTruthBoard from './pages/AboutTruthboard';
import ContactTruthBoard from './pages/ContactTruthboard';
import MyReviews from './pages/MyReviews';
import EditReview from './pages/EditReview';
import SalesforceIntegration from './pages/SalesforceIntegration';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Settings from './pages/Settings';
import ReviewDetail from './pages/ReviewDetail';
import ForgotPassword from './pages/auth/ForgotPassword';
import Page404 from './pages/Page404';

// Admin Pages
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ReviewModeration from './pages/admin/ReviewModeration';
import CompanyManagement from './pages/admin/CompanyManagement';
import AdminRoute from './components/auth/AdminRoute';

import { AuthProvider } from './context/AuthContext';
import { Navigation, Footer } from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import BusinessRoute from './components/auth/BusinessRoute';
import ScrollToTop from './components/ScrollToTop';

import BusinessLayout from './components/layout/BusinessLayout';
import BusinessDashboard from './pages/business/BusinessDashboard';
import BusinessReviews from './pages/business/BusinessReviews';
import BusinessAnalytics from './pages/business/BusinessAnalytics';
import BusinessCollectReviews from './pages/business/BusinessCollectReviews';
import BusinessProfile from './pages/business/BusinessProfile';
import BusinessSettings from './pages/business/BusinessSettings';
import BusinessOnboarding from './pages/business/BusinessOnboarding';

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
                         location.pathname.startsWith('/features/') ||
                         location.pathname.startsWith('/admin');

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
          <Route path="/categories/:slug" element={<CategoryDetail />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/request demo" element={<RequestDemo />} />
          <Route path="/business/signup" element={<BusinessSignup />} />
          <Route path="/business/login" element={<BusinessLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot password" element={<ForgotPassword />} />
          <Route path="/features/dashboard-analytics" element={<DashboardAnalytics />} />
          <Route path="/features/social-media-tools" element={<SocialMediaTools />} />
          <Route path="/features/trustbox-widgets" element={<TrustBoxWidgets />} />
          <Route path="/features/review-insights" element={<ReviewInsights />} />
          <Route path="/features/visitor-insights" element={<VisitorInsights />} />
          <Route path="/datasolutions" element={<DataSolutionsPage />} />
          <Route path="/about" element={<AboutTruthBoard />} />
          <Route path="/contact" element={<ContactTruthBoard />} />
          <Route path="/features/salesforce-integration" element={<SalesforceIntegration />} />
          <Route path="/features/salesforce_integration" element={<SalesforceIntegration />} />
          <Route path="/features/salesforce integration" element={<SalesforceIntegration />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/business/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/write_review" element={<WriteReview />} />
          <Route path="/company/:companyId/review" element={<WriteReview />} />
          
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/reviews/:id" element={<ReviewDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/edit-review/:reviewId" element={<EditReview />} />
            <Route path="/edit review/:reviewId" element={<EditReview />} />
            <Route path="/users/settings" element={<Settings />} />
          </Route>

          {/* Business Dashboard Routes */}
          <Route element={<BusinessRoute />}>
            <Route path="/business/onboarding" element={<BusinessOnboarding />} />
            <Route element={<BusinessLayout />}>
              <Route path="/business/dashboard" element={<BusinessDashboard />} />
              <Route path="/business/reviews" element={<BusinessReviews />} />
              <Route path="/business/analytics" element={<BusinessAnalytics />} />
              <Route path="/business/collect-reviews" element={<BusinessCollectReviews />} />
              <Route path="/business/profile" element={<BusinessProfile />} />
              <Route path="/business/settings" element={<BusinessSettings />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/moderation" element={<ReviewModeration />} />
              <Route path="/admin/companies" element={<CompanyManagement />} />
              <Route path="/admin/settings" element={<BusinessSettings />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Page404 />} />
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
