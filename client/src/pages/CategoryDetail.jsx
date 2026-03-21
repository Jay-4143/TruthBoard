import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  MapPin, 
  Star, 
  Globe, 
  ChevronRight,
  Filter,
  ArrowRight,
  Info,
  X,
  Check,
  ChevronUp
} from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const countriesList = [
  "United States", "United Kingdom", "France", "Italy", "Spain", "Germany", "Denmark", "Sweden", "Norway", "Finland",
  "Netherlands", "Belgium", "Austria", "Switzerland", "Poland", "Greece", "Portugal", "Czech Republic", "Hungary", "Ireland",
  "Canada", "Australia", "New Zealand", "Japan", "South Korea", "Singapore", "Hong Kong", "Brazil", "Mexico", "United Arab Emirates"
];

const CategoryDetail = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  
  // New Filter States
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isRatingPopoverOpen, setIsRatingPopoverOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    minRating: null,
    country: "United States",
    cityZip: "",
    isClaimed: false,
    hasResponse: false,
    sortBy: 'relevance'
  });
  const [activeFilters, setActiveFilters] = useState({
    minRating: null,
    country: "United States",
    cityZip: "",
    isClaimed: false,
    hasResponse: false,
    sortBy: 'relevance'
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await api.get(`/categories/slug/${slug}`);
        setCategory(data);
      } catch (err) {
        console.error('Error fetching category:', err);
      }
    };
    fetchCategory();
  }, [slug]);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const params = {
          category: slug,
          page,
          limit: 10,
          minRating: activeFilters.minRating || undefined,
          location: activeFilters.country,
          cityZip: activeFilters.cityZip || undefined,
          claimed: activeFilters.isClaimed || undefined,
          hasResponse: activeFilters.hasResponse || undefined,
          sortBy: activeFilters.sortBy
        };
        const { data } = await api.get('/companies', { params });
        setCompanies(data.companies || []);
        setTotalPages(data.pages || 1);
        setTotalCompanies(data.total || 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to load companies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [slug, page, activeFilters]);

  if (loading && page === 1 && !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffcf8]">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="flex items-center gap-2">
          <Star className="w-8 h-8 text-[#00b67a] fill-current" />
          <span className="text-2xl font-bold text-[#002e21]">TruthBoard</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbf3] text-gray-900 font-sans selection:bg-[#00b67a] selection:text-white">
      
      {/* ─── HERO / HEADER SECTION ─── */}
      <section className="bg-white pt-24 pb-12 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-400 mb-8 uppercase tracking-widest leading-none">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <span>›</span>
            <Link to="/categories" className="hover:text-gray-600">Categories</Link>
            <span>›</span>
            <span className="text-gray-800 uppercase">{category?.name || slug}</span>
          </div>

          <div className="flex flex-col md:flex-row items-baseline gap-4 mb-4 relative">
             <h1 className="text-[48px] font-semibold tracking-tight text-[#1c1c1c] leading-none">
                Best in {category?.name || slug}
             </h1>
             
             {/* Country Selector */}
             <div className="relative">
                <div 
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all group shadow-sm border ${showCountryDropdown ? 'bg-white border-[#00b67a] ring-2 ring-[#00b67a]/10' : 'bg-gray-50 border-gray-200 hover:bg-white'}`}
                >
                   <span className="text-[18px] font-bold text-gray-700">{activeFilters.country}</span>
                   <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-transform duration-300 ${showCountryDropdown ? 'rotate-180 text-[#00b67a]' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                {showCountryDropdown && (
                  <>
                    <div className="fixed inset-0 z-[100]" onClick={() => setShowCountryDropdown(false)} />
                    <div className="absolute top-full left-0 mt-2 w-[280px] bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                       <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                          {countriesList.map((country) => (
                             <div 
                                key={country}
                                onClick={() => {
                                   setActiveFilters(prev => ({ ...prev, country }));
                                   setTempFilters(prev => ({ ...prev, country }));
                                   setPage(1);
                                   setShowCountryDropdown(false);
                                }}
                                className={`px-4 py-3 rounded-xl text-[15px] font-bold cursor-pointer transition-all ${activeFilters.country === country ? 'bg-[#f0f9f6] text-[#00b67a]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                             >
                                {country}
                             </div>
                          ))}
                       </div>
                    </div>
                  </>
                )}
             </div>
          </div>

          <button className="flex items-center gap-2 text-[14px] font-bold text-gray-500 hover:text-gray-900 transition-colors group mt-2">
            How categories work <Info className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
          </button>
        </div>
      </section>

      {/* ─── FILTERS BAR ─── */}
      <section className="sticky top-[80px] z-[80] bg-white border-b border-gray-100 py-4 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setTempFilters(activeFilters);
                setIsFilterSidebarOpen(true);
              }}
              className={`flex items-center gap-2 border px-5 py-2.5 rounded-full font-semibold text-[14px] active:scale-95 transition-all ${isFilterSidebarOpen ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
            >
                <Filter className="w-4 h-4" /> All filters
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsRatingPopoverOpen(!isRatingPopoverOpen)}
                className={`flex items-center gap-2 border px-5 py-2.5 rounded-full font-bold text-[14px] active:scale-95 transition-all ${activeFilters.minRating || isRatingPopoverOpen ? 'bg-[#002e21] text-white border-[#002e21]' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                  <Star className={`w-4 h-4 ${activeFilters.minRating ? 'fill-current' : ''}`} /> Rating
              </button>

              {/* Rating Popover */}
              <AnimatePresence>
                {isRatingPopoverOpen && (
                  <>
                    <div className="fixed inset-0 z-[90]" onClick={() => setIsRatingPopoverOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-[320px] bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-[100] p-4 overflow-hidden"
                    >
                       <h3 className="text-[13px] font-bold text-gray-500 mb-3 ml-1 uppercase tracking-wider">Rating</h3>
                       <div className="grid grid-cols-4 border border-gray-200 rounded-lg overflow-hidden">
                          {[null, 3, 4, 4.5].map((val) => (
                             <button
                                key={val || 'all'}
                                onClick={() => {
                                   setActiveFilters(prev => ({ ...prev, minRating: val }));
                                   setTempFilters(prev => ({ ...prev, minRating: val }));
                                   setPage(1);
                                   setIsRatingPopoverOpen(false);
                                }}
                                className={`py-4 text-center font-bold text-[13px] transition-all ${activeFilters.minRating === val ? 'bg-[#ebfaf5] text-[#00b67a] border-r border-gray-200' : 'bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-200 last:border-r-0'}`}
                             >
                                {val === null ? 'All' : `★ ${val}+`}
                             </button>
                          ))}
                       </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
             <span className="text-[13px] font-bold text-gray-400">Sort by:</span>
             <button className="flex items-center gap-2 font-bold text-[14px] text-gray-700 hover:text-black">
                Most relevant <ChevronDown className="w-4 h-4" />
             </button>
          </div>
        </div>
      </section>

      {/* ─── MAIN LIST SECTION ─── */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          
          {/* LEFT: COMPANIES LIST */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-[18px] font-semibold">Companies ({totalCompanies.toLocaleString()})</h2>
            </div>

            {loading && page > 1 ? (
               <div className="py-12 flex justify-center"><div className="w-8 h-8 border-4 border-[#00b67a] border-t-transparent rounded-full animate-spin"></div></div>
            ) : error ? (
               <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center">
                  <p className="text-red-600 font-bold mb-4">{error}</p>
                  <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-full font-bold">Try again</button>
               </div>
            ) : companies.length === 0 ? (
               <div className="bg-white p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
                  <Search className="w-12 h-12 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-[20px] font-bold mb-2">No companies found</h3>
                  <p className="text-gray-400 font-medium">Try choosing a different category or clearing filters.</p>
               </div>
            ) : (
               <div className="space-y-4">
                  {companies.map((company) => (
                     <div key={company._id} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group flex flex-col md:flex-row gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 py-1.5 px-4 bg-gray-50 border-l border-b border-gray-100 text-[10px] font-bold uppercase tracking-[2px] opacity-40 group-hover:opacity-100 transition-opacity">
                           Most Relevant
                        </div>

                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-4 shrink-0 shadow-inner group-hover:scale-105 transition-transform overflow-hidden relative">
                           {company.logo ? (
                              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                           ) : (
                              <div className="w-full h-full bg-[#002e21] flex items-center justify-center text-white text-3xl font-bold uppercase">
                                 {company.name[0]}
                              </div>
                           )}
                        </div>

                        <div className="flex-1 flex flex-col justify-center min-w-0">
                           <div className="flex flex-col mb-1 pr-12">
                              <Link to={`/company/${company.slug}`} className="text-[22px] font-bold text-gray-900 leading-tight hover:text-blue-600 hover:underline transition-all truncate pr-4">
                                 {company.name}
                              </Link>
                              <p className="text-[14px] text-gray-400 font-medium truncate mb-2">{company.website}</p>
                           </div>

                           <div className="flex flex-wrap items-center gap-4 mb-6">
                              <div className="flex gap-0.5">
                                 {[1,2,3,4,5].map(s => (
                                    <div key={s} className={`w-6 h-6 rounded-sm ${s <= Math.floor(company.trustScore) ? 'bg-emerald-500':'bg-gray-200'} flex items-center justify-center`}>
                                       <Star className={`w-3.5 h-3.5 ${s <= Math.floor(company.trustScore) ? 'text-white fill-current':'text-gray-300'}`} />
                                    </div>
                                 ))}
                              </div>
                              <div className="flex items-center gap-2">
                                 <span className="text-[15px] font-bold">{company.trustScore?.toFixed(1) || '0.0'}</span>
                                 <span className="text-gray-300">•</span>
                                 <Link to={`/company/${company.slug}`} className="text-[15px] font-bold text-gray-900 border-b border-gray-900 hover:text-emerald-600 hover:border-emerald-600 transition-colors">
                                    {company.totalReviews?.toLocaleString() || 0} reviews
                                 </Link>
                              </div>
                           </div>

                           <div className="flex flex-wrap items-center gap-2 mt-auto">
                              <span className="px-3 py-1 bg-gray-100 rounded text-[11px] font-bold text-gray-500 uppercase tracking-wider">{category?.name || slug}</span>
                           </div>
                        </div>

                        <div className="flex flex-col justify-center items-end hidden xl:flex text-right max-w-[300px]">
                           <div className="flex items-center gap-2 text-[14px] font-medium text-gray-500 mb-2">
                              <MapPin className="w-4 h-4" /> {company.location || 'United States'}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
               <div className="flex items-center justify-center gap-1 pt-12">
                  <button 
                     disabled={page === 1}
                     onClick={() => setPage(prev => Math.max(1, prev - 1))}
                     className={`px-4 py-2 rounded-lg font-bold text-[14px] ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200 transitions-all'}`}
                  >
                     Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                     <button 
                        key={i+1}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-bold text-[14px] transition-all ${page === i + 1 ? 'bg-[#2563eb] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                     >
                        {i + 1}
                     </button>
                  ))}
                  <button 
                     disabled={page === totalPages}
                     onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                     className={`px-4 py-2 rounded-lg font-bold text-[14px] ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200 transitions-all'}`}
                  >
                     Next
                  </button>
               </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="space-y-8 lg:sticky lg:top-[160px] h-fit">
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-[16px] font-bold">Related categories</h3>
                   <button className="text-[12px] font-bold text-blue-600 hover:underline">Show all</button>
                </div>
                <div className="space-y-6">
                   {[
                     { name: 'ATM', color: 'bg-emerald-50' },
                     { name: 'Cashback Provider', color: 'bg-blue-50' },
                     { name: 'Central Bank', color: 'bg-orange-50' },
                     { name: 'Check Cashing Service', color: 'bg-purple-50' },
                     { name: 'Cryptocurrency Service', color: 'bg-indigo-50' }
                   ].map((rel, i) => (
                     <div key={i} className="flex items-center gap-4 group cursor-pointer">
                        <div className={`w-12 h-12 rounded-lg ${rel.color} flex items-center justify-center shrink-0 border border-gray-50 group-hover:scale-110 transition-transform`}>
                           <Globe className="w-5 h-5 opacity-40" />
                        </div>
                        <div className="min-w-0">
                           <h4 className="text-[14px] font-bold leading-none mb-1.5 truncate group-hover:text-blue-600 transition-colors">{rel.name}</h4>
                           <span className="text-[11px] font-bold text-[#00b67a] leading-none flex items-center gap-1 uppercase tracking-wider">
                              Money & Insurance
                           </span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-[#002e21] p-10 rounded-2xl text-white relative overflow-hidden group">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                <h3 className="text-[20px] font-bold mb-4 relative z-10">TruthBoard for businesses</h3>
                <p className="text-white/70 text-[14px] font-medium leading-relaxed mb-8 relative z-10">
                   Collect reviews, build trust, and boost your sales with the world's most trusted review platform.
                </p>
                <Link to="/business" className="bg-[#a8c6ff] text-[#002e21] w-full py-4 rounded-full font-bold text-[15px] hover:bg-white transition-all inline-flex items-center justify-center gap-2 relative z-10">
                   Get started <ArrowRight className="w-5 h-5" />
                </Link>
             </div>
          </aside>
        </div>
      </main>

      {/* ─── BOTTOM SECTIONS (Recently reviewed) ─── */}
      {companies.length > 0 && (
         <section className="bg-white py-24 border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6">
               <div className="flex items-center justify-between mb-12">
                  <h3 className="text-[24px] font-bold">Recently reviewed in {category?.name || slug}</h3>
                  <div className="flex gap-4">
                     <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all"><ChevronDown className="w-5 h-5 rotate-90" /></button>
                     <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-gray-50 shadow-md transition-all"><ChevronDown className="w-5 h-5 -rotate-90" /></button>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {companies.slice(0, 3).map((comp, i) => (
                     <div key={i} className="p-8 rounded-2xl border border-gray-100 bg-[#fcfbf3]/50 hover:bg-white hover:shadow-xl transition-all group cursor-pointer">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-2">
                              {comp.logo ? (
                                 <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain" />
                              ) : (
                                 <div className="w-full h-full bg-blue-500 rounded flex items-center justify-center text-white font-bold">{comp.name[0]}</div>
                              )}
                           </div>
                           <div>
                              <h4 className="font-bold text-[15px] group-hover:text-blue-600 transition-colors">{comp.name}</h4>
                              <p className="text-[12px] text-gray-400 font-medium truncate max-w-[150px]">{comp.website}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(s => (
                                 <div key={s} className={`w-4 h-4 rounded-[1px] ${s <= Math.floor(comp.trustScore) ? 'bg-emerald-500':'bg-gray-200'} flex items-center justify-center`}>
                                    <Star className={`w-2.5 h-2.5 ${s <= Math.floor(comp.trustScore) ? 'text-white fill-current':'text-gray-300'}`} />
                                 </div>
                              ))}
                           </div>
                           <span className="text-[13px] font-bold text-gray-400">{comp.trustScore?.toFixed(1)} TruthScore</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* ─── ALL FILTERS SIDEBAR ─── */}
      <AnimatePresence>
         {isFilterSidebarOpen && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterSidebarOpen(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[1000]"
               />
               <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 w-full sm:w-[480px] h-full bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-[1001] flex flex-col"
               >
                  <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
                     <h2 className="text-[24px] font-bold text-[#111] tracking-tight">All filters</h2>
                     <button 
                        onClick={() => setIsFilterSidebarOpen(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors group"
                     >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 custom-scrollbar pb-32">
                     {/* Rating Section */}
                     <div className="space-y-4">
                        <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-[2px]">Rating</h3>
                        <div className="grid grid-cols-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                           {[null, 3, 4, 4.5].map((val) => (
                              <button
                                 key={val || 'all'}
                                 onClick={() => setTempFilters(prev => ({ ...prev, minRating: val }))}
                                 className={`py-5 text-center font-bold text-[13px] transition-all border-r border-gray-200 last:border-r-0 ${tempFilters.minRating === val ? 'bg-[#002e21] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                              >
                                 {val === null ? 'All' : `★ ${val}+`}
                              </button>
                           ))}
                        </div>
                     </div>

                      {/* Sort Section */}
                      <div className="space-y-4">
                        <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-[2px]">Sort By</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'relevance', label: 'Relevance' },
                            { id: 'highest_rated', label: 'Highest Rated' },
                            { id: 'most_reviewed', label: 'Most Reviewed' },
                            { id: 'newest', label: 'Newest' }
                          ].map((sort) => (
                            <button
                              key={sort.id}
                              onClick={() => setTempFilters(prev => ({ ...prev, sortBy: sort.id }))}
                              className={`py-4 px-4 rounded-xl font-bold text-[13px] border transition-all ${tempFilters.sortBy === sort.id ? 'bg-[#002e21] text-white border-[#002e21]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                            >
                              {sort.label}
                            </button>
                          ))}
                        </div>
                      </div>

                     {/* Location Section */}
                     <div className="space-y-4">
                        <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-[2px]">Location</h3>
                        <div className="space-y-3">
                           <div className="relative">
                              <select 
                                 value={tempFilters.country}
                                 onChange={(e) => setTempFilters(prev => ({ ...prev, country: e.target.value }))}
                                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 font-bold text-[15px] appearance-none focus:bg-white focus:border-[#00b67a] focus:ring-4 focus:ring-[#00b67a]/10 transition-all outline-none"
                              >
                                 {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                           </div>
                           <div className="relative">
                              <Search className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
                              <input 
                                 type="text"
                                 placeholder="City or ZIP code"
                                 value={tempFilters.cityZip}
                                 onChange={(e) => setTempFilters(prev => ({ ...prev, cityZip: e.target.value }))}
                                 className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-5 py-4 font-bold text-[15px] focus:bg-white focus:border-[#00b67a] focus:ring-4 focus:ring-[#00b67a]/10 transition-all outline-none"
                              />
                           </div>
                        </div>
                     </div>

                     {/* Company Status */}
                     <div className="space-y-4">
                        <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-[2px]">Company status</h3>
                        <label className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all group">
                           <div className="relative mt-1">
                              <input 
                                 type="checkbox"
                                 checked={tempFilters.isClaimed}
                                 onChange={() => setTempFilters(prev => ({ ...prev, isClaimed: !prev.isClaimed }))}
                                 className="peer hidden"
                              />
                              <div className="w-6 h-6 rounded-md border-2 border-gray-200 flex items-center justify-center transition-all peer-checked:bg-[#002e21] peer-checked:border-[#002e21] group-hover:border-gray-400">
                                 <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                              </div>
                           </div>
                           <div className="flex-1">
                              <div className="text-[15px] font-bold text-gray-900 mb-1">Claimed</div>
                              <p className="text-[13px] font-medium text-gray-400 leading-relaxed">
                                 Companies that have claimed their TruthBoard profile. <span className="text-[#00b67a] hover:underline">Learn more</span>
                              </p>
                           </div>
                        </label>
                     </div>
                  </div>

                  {/* Sidebar Footer */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 pt-6 bg-white border-t border-gray-100 flex items-center justify-between gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                     <button                         onClick={() => {
                            const reset = { minRating: null, country: "United States", cityZip: "", isClaimed: false, hasResponse: false, sortBy: 'relevance' };
                            setTempFilters(reset);
                         }}
                        className="text-[15px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                     >
                        Reset
                     </button>
                     <button 
                        onClick={() => {
                           setActiveFilters(tempFilters);
                           setPage(1);
                           setIsFilterSidebarOpen(false);
                        }}
                        className="flex-1 bg-[#4b66df] text-white py-4 rounded-full font-bold text-[16px] hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
                     >
                        Show Results
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

    </div>
  );
};

export default CategoryDetail;
