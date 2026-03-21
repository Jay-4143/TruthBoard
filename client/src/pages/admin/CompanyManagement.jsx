import { useState, useEffect } from 'react';
import { Building2, Search, ExternalLink, Globe, Star, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    category: '',
    description: '',
    logo: ''
  });

  const fetchCompanies = async () => {
    try {
      const { data } = await api.get('/companies?limit=100');
      setCompanies(data.companies || []);
    } catch (err) {
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/companies/${editingId}`, formData);
      } else {
        await api.post('/admin/companies', formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', website: '', category: '', description: '', logo: '' });
      fetchCompanies();
    } catch (err) {
      console.error('Error saving company:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company and all its reviews?')) {
      try {
        await api.delete(`/admin/companies/${id}`);
        fetchCompanies();
      } catch (err) {
        console.error('Error deleting company:', err);
      }
    }
  };

  const handleEdit = (company) => {
    setEditingId(company._id);
    setFormData({
      name: company.name,
      website: company.website,
      category: typeof company.category === 'object' ? company.category._id || company.category.name : company.category,
      description: company.description || '',
      logo: company.logo || ''
    });
    setShowForm(true);
  };

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center animate-pulse">Loading companies...</div>;

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Company Management</h1>
        <div className="flex items-center gap-4">
           <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 font-semibold text-sm focus:border-[#00b67a] outline-none transition-all"
              />
           </div>
           <button 
             onClick={() => { setShowForm(true); setEditingId(null); setFormData({name:'', website:'', category:'', description:'', logo:''}); }}
             className="bg-[#00b67a] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#009966] transition-all shadow-lg shadow-[#00b67a]/20"
           >
              Add New
           </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Company' : 'Add New Company'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                placeholder="Company Name" 
                className="w-full bg-gray-50 border-none rounded-xl p-4 font-semibold"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input 
                placeholder="Website (e.g. apple.com)" 
                className="w-full bg-gray-50 border-none rounded-xl p-4 font-semibold"
                value={formData.website}
                onChange={e => setFormData({...formData, website: e.target.value})}
                required
              />
              <input 
                placeholder="Category ID or Name" 
                className="w-full bg-gray-50 border-none rounded-xl p-4 font-semibold"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              />
              <textarea 
                placeholder="Description" 
                className="w-full bg-gray-50 border-none rounded-xl p-4 font-semibold h-32"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <input 
                placeholder="Logo URL" 
                className="w-full bg-gray-50 border-none rounded-xl p-4 font-semibold"
                value={formData.logo}
                onChange={e => setFormData({...formData, logo: e.target.value})}
              />
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-[#00b67a] text-white py-4 rounded-xl font-bold">Save Company</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company._id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-8">
               <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-3 shrink-0 overflow-hidden shadow-inner group-hover:scale-110 transition-transform">
                  {company.logo ? (
                     <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                  ) : (
                     <div className="w-full h-full bg-[#002e21] flex items-center justify-center text-white text-2xl font-bold uppercase">
                        {company.name[0]}
                     </div>
                  )}
               </div>
               <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(company)}
                    className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(company._id)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
               </div>
            </div>

            <div className="flex-1 mb-8">
               <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#00b67a] transition-colors">{company.name}</h3>
               <div className="flex items-center gap-2 text-gray-400 mb-4 transition-colors">
                  <Globe size={14} />
                  <span className="text-sm font-semibold truncate">{company.website}</span>
                  <ExternalLink size={12} className="shrink-0" />
               </div>

               <div className="flex items-center gap-4 py-4 px-5 bg-gray-50 rounded-2xl">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                       <Star size={14} className="text-[#00b67a] fill-current" />
                       <span className="text-lg font-bold text-gray-900">{company.trustScore?.toFixed(1) || '0.0'}</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TrustScore</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 leading-none mb-1">{company.totalReviews || 0}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reviews</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
               <span className={`
                  px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[2px]
                  ${company.isClaimed ? 'bg-[#ebfaf5] text-[#00b67a]' : 'bg-gray-100 text-gray-400'}
               `}>
                  {company.isClaimed ? 'Claimed' : 'Unclaimed'}
               </span>
               <button className="text-[13px] font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 group/link">
                  View Detail <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyManagement;
