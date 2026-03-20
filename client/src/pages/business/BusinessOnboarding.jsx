import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Globe, 
  Tag, 
  AlignLeft, 
  Image as ImageIcon, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Star
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const BusinessOnboarding = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: user?.companyName || '',
    website: user?.website || '',
    category: '',
    description: '',
    logo: '',
    location: 'United States',
    contactEmail: user?.email || '',
    phone: user?.phoneNumber || ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/business/create-profile', formData);
      // Update local user state
      if (updateUser) {
        updateUser({ 
          role: 'companyOwner', 
          companyName: formData.name, 
          website: formData.website 
        });
      }
      navigate('/business/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create business profile');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Company Info', icon: Building2 },
    { id: 2, title: 'Branding', icon: ImageIcon },
    { id: 3, title: 'Contact', icon: Mail },
    { id: 4, title: 'Review', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Progress Header */}
      <div className="max-w-3xl w-full mb-12">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#00b67a] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  step >= s.id 
                    ? 'bg-[#00b67a] border-[#00b67a] text-white' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
              </div>
              <span className={`absolute top-14 text-xs font-bold whitespace-nowrap uppercase tracking-wider ${
                step >= s.id ? 'text-[#00b67a]' : 'text-gray-400'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 sm:p-12">
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">Tell us about your business</h2>
                  <p className="text-gray-500 mt-2 font-medium">This information helps customers find you.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1 group-focus-within:text-[#00b67a] transition-colors">
                      Company Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00b67a] transition-colors">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900"
                        placeholder="e.g. Acme Corp"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1 group-focus-within:text-[#00b67a] transition-colors">
                      Website URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00b67a] transition-colors">
                        <Globe className="h-5 w-5" />
                      </div>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900"
                        placeholder="https://www.acme.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1 group-focus-within:text-[#00b67a] transition-colors">
                      Industry Category
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00b67a] transition-colors">
                        <Tag className="h-5 w-5" />
                      </div>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1 group-focus-within:text-[#00b67a] transition-colors">
                      Description
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none text-gray-400 group-focus-within:text-[#00b67a] transition-colors">
                        <AlignLeft className="h-5 w-5" />
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900 resize-none"
                        placeholder="Tell us what your company does..."
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">Make it yours</h2>
                  <p className="text-gray-500 mt-2 font-medium">Add your branding to stand out.</p>
                </div>

                <div className="flex flex-col items-center mb-8">
                  <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center border-4 border-dashed border-gray-200 overflow-hidden relative group cursor-pointer hover:border-[#00b67a] transition-all">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="w-8 h-8 text-gray-300 group-hover:text-[#00b67a]" />
                        <span className="text-[10px] font-black text-gray-400 uppercase mt-1">Logo</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1">
                    Logo Image URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="url"
                      name="logo"
                      value={formData.logo}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900"
                      placeholder="https://your-site.com/logo.png"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-medium">Square images (512x512) work best.</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">Reach out</h2>
                  <p className="text-gray-500 mt-2 font-medium">How should customers contact you?</p>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1">
                      Business Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900"
                        placeholder="contact@acme.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block px-1">
                      Location / Head Office
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#00b67a] outline-none transition-all font-bold text-gray-900"
                        placeholder="New York, USA"
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">Ready to go!</h2>
                  <p className="text-gray-500 mt-2 font-medium">Review your info and launch your dashboard.</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden">
                      {formData.logo ? (
                        <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Star className="w-8 h-8 text-[#00b67a]" fill="currentColor" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{formData.name}</h3>
                      <p className="text-[#00b67a] font-bold text-sm tracking-tight">{formData.website}</p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs font-black text-gray-400 uppercase block mb-1">Location</span>
                      <span className="font-bold text-gray-900">{formData.location}</span>
                    </div>
                    <div>
                      <span className="text-xs font-black text-gray-400 uppercase block mb-1">Email</span>
                      <span className="font-bold text-gray-900">{formData.contactEmail}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-black text-gray-400 uppercase block mb-1">About</span>
                    <p className="text-gray-600 font-medium leading-relaxed italic line-clamp-2">
                      “{formData.description}”
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={prevStep}
                disabled={loading}
                className="h-14 px-6 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2 border-2 border-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex-1 h-14 bg-[#1a1c21] text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 h-14 bg-[#00b67a] text-white rounded-2xl font-bold hover:bg-[#009966] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00b67a]/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-gray-400 text-sm font-bold opacity-50">
        <Star className="w-4 h-4" />
        <span>POWERED BY TRUTHBOARD BUSINESS</span>
      </div>
    </div>
  );
};

export default BusinessOnboarding;
