import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import WriteReview from './pages/WriteReview';
import Login from './pages/Login';
import Register from './pages/Register';
import ForBusinesses from './pages/ForBusinesses';
import { AuthProvider } from './context/AuthContext';
import { Navigation, Footer } from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company/:slug" element={<CompanyPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/business" element={<ForBusinesses />} />
              <Route path="/write-review" element={<WriteReview />} />
              <Route path="/write_review" element={<WriteReview />} />
              <Route path="/company/:companyId/review" element={<WriteReview />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                {/* Future protected routes like profile/my-reviews will go here */}
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
