import { useState, useEffect } from 'react';
import { 
  Building2, 
  Globe, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  MapPin, 
  Mail,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';

const BusinessProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    category: '',
    description: '',
    logo: '',
    location: '',
    contactEmail: ''
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, catRes] = await Promise.all([
          api.get('/business/profile'),
          api.get('/categories')
        ]);
        
        const company = profileRes.data;
        setFormData({
          name: company.name || '',
          website: company.website || '',
          category: company.category?._id || company.category || '',
          description: company.description || '',
          logo: company.logo || '',
          location: company.location || '',
          contactEmail: company.contactEmail || ''
        });
        
        setCategories(catRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setMessage({ type: 'error', text: 'Failed to load profile data.' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      await api.put('/business/profile', formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="w-10 h-10 text-[#00b67a] animate-spin" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your public company information.</p>
        </div>
      </div>

      {message.text && (
        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-bold">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#00b67a]" />
              Basic Information
            </h2>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Industry Category</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] font-bold transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] font-bold transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#00b67a]" />
              Branding & Details
            </h2>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Company Logo URL</label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-contain" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-200" />
                  )}
                </div>
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input 
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] font-bold transition-all"
                  />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 ml-1">Direct link to an image (PNG, JPG, SVG)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Short Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What does your company do?"
                rows="5"
                className="w-full p-6 bg-gray-50 rounded-[24px] border-none focus:ring-2 focus:ring-[#00b67a] font-medium transition-all"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Public Contact Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="support@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] font-bold transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            className="px-8 py-4 rounded-full font-black text-gray-400 uppercase tracking-widest text-sm hover:bg-gray-50 transition-all"
          >
            Reset
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 bg-[#1a1c21] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-black/10 flex items-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfile;
