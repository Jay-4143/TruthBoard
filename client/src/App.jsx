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

import { AuthProvider } from './context/AuthContext';
import { Navigation, Footer } from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isBusinessPage = location.pathname === '/business' || 
                         location.pathname === '/request-demo' || 
                         location.pathname === '/request demo' ||
                         location.pathname === '/request%20demo' ||
                         location.pathname === '/business/signup' ||
                         location.pathname === '/features/dashboard-analytics';

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
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/write_review" element={<WriteReview />} />
          <Route path="/company/:companyId/review" element={<WriteReview />} />
          
          <Route element={<ProtectedRoute />}>
            {/* Future protected routes */}
          </Route>
        </Routes>
      </main>
      {!isBusinessPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
