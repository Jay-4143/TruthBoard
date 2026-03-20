import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const BusinessLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (user.role === 'companyOwner' || user.role === 'admin')) {
      navigate('/business/dashboard');
    }
  }, [user, navigate]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      console.log('Logged in user role:', loggedInUser.role);
      
      if (loggedInUser.role === 'companyOwner' || loggedInUser.role === 'admin') {
        console.log('Redirecting to business dashboard...');
        navigate('/business/dashboard');
      } else {
        console.log('Not a business user, redirecting to home...');
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 relative selection:bg-[#00b67a] selection:text-white overflow-hidden">
      {/* Background Shapes (Matching BusinessSignup) */}
      <div className="fixed top-[-40%] right-[-10%] w-[60%] h-[120%] bg-[#00b67a] rounded-full opacity-90 hidden lg:block -z-0 pointer-events-none" />
      <div className="fixed bottom-0 left-[-10%] w-[40%] h-[40%] bg-[#00b67a]/20 rounded-tr-[100%] rounded-tl-full hidden lg:block -z-0 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[40%] h-[40%] bg-[#00b67a] hidden lg:block -z-0 pointer-events-none" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 40%)' }} />
      
      <div className="relative z-10 w-full max-w-[1300px] mx-auto min-h-screen flex flex-col lg:flex-row items-center py-12 px-6 sm:px-12 lg:px-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[45%] lg:pr-16 mb-12 lg:mb-0">
          <button onClick={() => navigate('/business')} className="inline-flex items-center text-[13px] font-bold text-gray-600 hover:text-black transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Business Home
          </button>

          <Link to="/" className="flex items-center gap-2 w-fit group mb-12">
            <span className="text-[#00b67a] text-[36px] leading-none group-hover:scale-105 transition-transform">★</span>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-[24px] tracking-tight leading-none text-gray-900">TruthBoard</span>
              <span className="font-semibold text-[10px] text-gray-500 uppercase tracking-widest mt-1">For Business</span>
            </div>
          </Link>

          <h2 className="text-[40px] font-black text-gray-900 leading-[1.1] mb-6">
            Log in to manage your business reputation.
          </h2>
          <p className="text-[17px] text-gray-600 font-medium leading-relaxed max-w-md">
            Access your dashboard, respond to reviews, and see how your business is performing in real-time.
          </p>
        </div>

        {/* Right Column (Login Card) */}
        <div className="w-full lg:w-[55%] flex justify-end">
          <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgb(0,0,0,0.12)] p-8 sm:p-12 w-full max-w-[540px] border border-gray-100/50">
            <h1 className="text-[28px] font-bold text-gray-900 mb-8 mt-2">
              Business Log in
            </h1>
            
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@company.com" 
                  className="w-full border border-gray-300 rounded-[8px] p-3.5 text-[15px] focus:ring-2 focus:ring-[#00b67a] focus:border-[#00b67a] outline-none placeholder:text-gray-400 shadow-sm transition-all"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-700">Password</label>
                  <a href="#" className="text-sm font-bold text-[#00b67a] hover:underline">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••" 
                  className="w-full border border-gray-300 rounded-[8px] p-3.5 text-[15px] focus:ring-2 focus:ring-[#00b67a] focus:border-[#00b67a] outline-none placeholder:text-gray-400 shadow-sm transition-all"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1c55fd] text-white font-bold py-4 rounded-[8px] hover:bg-[#1541c4] transition-all mt-4 text-base shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Logging in...' : 'Log in to TruthBoard'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
              <p className="text-center text-gray-600 font-medium">
                New to TruthBoard for Business?{' '}
                <Link to="/business/signup" className="text-[#00b67a] font-bold hover:underline">
                  Create a free account
                </Link>
              </p>
              <p className="text-center text-[13px] text-gray-400 font-medium">
                Looking for the consumer login?{' '}
                <Link to="/login" className="text-[#00b67a] font-bold hover:underline">
                  Go there instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;
