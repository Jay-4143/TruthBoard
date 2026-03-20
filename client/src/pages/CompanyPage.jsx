import React, { useState, useEffect, useRef, Component } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Search, ChevronDown, CheckCircle, ExternalLink, Globe,
  MessageSquare, Info, ShieldCheck, Sparkles, ThumbsUp, 
  Share2, Flag, ShoppingCart, Truck, UserCheck, HelpCircle,
  MoreHorizontal, ChevronRight, Bell, User, PenTool, BarChart3,
  MapPin, Camera, SlidersHorizontal, ChevronUp, X
} from 'lucide-react';
import StarRating from '../components/StarRating';
import { Footer } from '../components/Navigation';

/* ───── Error Boundary ───── */
class LocalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("CompanyPage Render Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-red-50 text-red-900">
          <h2 className="text-2xl font-bold mb-4">Display Error</h2>
          <pre className="p-4 bg-white/50 rounded text-xs mb-6 overflow-auto max-w-full italic">
            {this.state.error?.message || "Unknown error occurred"}
          </pre>
          <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-8 py-3 rounded-full font-bold">Try to reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const CompanyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Summary');
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [reviewFilter, setReviewFilter] = useState('');

  const searchRef = useRef(null);
  
  // Real or Mock State
  const [company, setCompany] = useState(null);
  const [reviewsData, setReviewsData] = useState({ reviews: [], total: 0, pages: 1, page: 1 });

  const filteredReviews = (reviewsData?.reviews || []).filter(rev => 
    rev.title.toLowerCase().includes(reviewFilter.toLowerCase()) || 
    rev.text.toLowerCase().includes(reviewFilter.toLowerCase()) ||
    rev.user.toLowerCase().includes(reviewFilter.toLowerCase())
  );
  const [loading, setLoading] = useState(true);

  // Scroll handler for sticky header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        try {
          const { data } = await api.get(`/companies/search?q=${searchQuery}&limit=5`);
          setSearchResults(data);
          setShowResults(true);
        } catch (error) {
          console.error('Search failed', error);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  const handleWriteReview = () => {
    if (company?._id) {
      navigate(`/company/${company._id}/review`);
    } else {
      navigate('/write-review');
    }
  };

  const handleVisitWebsite = () => {
    if (company?.website) {
      const url = company.website.startsWith('http') ? company.website : `https://${company.website}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNextCarousel = () => {
    setCarouselIndex(prev => (prev + 1) % 4);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex(prev => (prev - 1 + 4) % 4);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const safeSlug = (slug || "").toLowerCase();
      
      try {
        console.log("Fetching data for slug:", safeSlug);
        
        // Match Apple screenshot data exactly
        if (safeSlug.includes('apple') || safeSlug.includes('amazon')) {
          const isApple = safeSlug.includes('apple');
          setCompany({
            _id: isApple ? "apple_mock_id" : "amazon_mock_id",
            name: isApple ? "Apple" : "Amazon",
            website: isApple ? "www.apple.com" : "www.amazon.com",
            rating: isApple ? 1.8 : 1.7,
            reviewCount: isApple ? 11802 : 44536,
            category: { name: "Electronics Store" },
            breadcrumbs: isApple 
              ? ["Electronics & Technology", "Appliances & Electronics", "Electronics Store", "Apple"]
              : ["Media & Publishing", "Appliances & Electronics", "Electronics Store", "Amazon"],
            description: isApple 
              ? "Apple designs and creates iPod and iTunes, Mac laptop and desktop computers, the OS X operating system, and the revolutionary iPhone."
              : "Online shopping from the earth's biggest selection of books, magazines, music, DVDs, videos, electronics, computers, software, apparel & accessories, shoes, jewelry, tools & hardware, housewares, furniture, sporting goods, beauty & personal care...",
            claimed: false,
            isBad: true,
            stars: isApple ? [
              { label: '5-star', percent: 16, color: 'bg-[#a3a3a3]' },
              { label: '4-star', percent: 4, color: 'bg-[#c5c5c5]' },
              { label: '3-star', percent: 4, color: 'bg-[#e2e2e2]' },
              { label: '2-star', percent: 5, color: 'bg-[#f47321]' },
              { label: '1-star', percent: 71, color: 'bg-[#ff3722]' },
            ] : [
              { label: '5-star', percent: 19, color: 'bg-[#00b67a]' },
              { label: '4-star', percent: 5, color: 'bg-[#73cf11]' },
              { label: '3-star', percent: 4, color: 'bg-[#ffce00]' },
              { label: '2-star', percent: 6, color: 'bg-[#ff8622]' },
              { label: '1-star', percent: 66, color: 'bg-[#ff3722]' },
            ]
          });

          setReviewsData({
            reviews: [
              {
                id: 1,
                user: "Bobby",
                location: "US", // From screenshot
                reviewsCount: 1,
                initials: "BO",
                date: "Mar 11, 2026",
                rating: 1,
                title: "Apple updates? Thanks very much!",
                text: "My contacts all showed up as 'No caller ID', including my wife...!! Apple assistance disappeared up its own backside with solutions. Happily sorted by a human being a...",
                verified: true,
                usefulCount: 0
              },
              {
                id: 2,
                user: "Christian Jerico Ilagan",
                location: "US",
                reviewsCount: 5,
                initials: "CJ",
                date: "Feb 12, 2026",
                rating: 1,
                title: "Very frustrating experience.",
                text: "A subscription was started by my minor child, and getting it canceled was far more difficult than it should have been. It feels like the system is designed to make signing...",
                verified: true,
                usefulCount: 1
              },
              {
                 id: 3,
                 user: "Cornelia Amiri",
                 location: "US",
                 reviewsCount: 5,
                 initials: "CA",
                 date: "2 hours ago",
                 rating: 1,
                 title: "I had the worst customer service...",
                 text: "I had the worst customer service experiences I've ever had with Apple yesterday—twice. Once with a rep and once with a supervisor. I called in with a very basic question about resizing something on a newer device—something that used to be simple—somehow, an additional step I am unaware of was added. The first rep didn't know how to help, so she transferred me. She could only understand cropping, not changing the size of the pixels. Fine. But the next person immediately started talking at me instead of listening. Within minutes, it escalated to them shouting at me and talking over me, so I was not allowed to speak at all. This harassment by the rep had me shaking, and I had to hang up.",
                 verified: false,
                 usefulCount: 0
              }
            ],
            total: isApple ? 11802 : 44536,
            pages: 120,
            page: 1
          });
        } else {
          // Dynamic fetch
          const response = await api.get(`/companies/${slug}`);
          const companyData = response?.data;
          setCompany(companyData);
          if (companyData?._id) {
            const reviewsResponse = await api.get(`/reviews/company/${companyData._id}`);
            setReviewsData(reviewsResponse?.data || { reviews: [], total: 0 });
          }
        }
      } catch (err) {
        console.error("Fetch encounter an error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffcf8]">
       <motion.div animate={{scale:[1, 1.1, 1]}} transition={{repeat:Infinity, duration:1}} className="flex items-center gap-2">
         <Star className="w-8 h-8 text-[#00b67a] fill-current" />
         <span className="text-2xl font-bold text-[#002e21]">TruthBoard</span>
       </motion.div>
    </div>
  );

  if (!company) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 border-t-4 border-[#00b67a]">
      <Star className="w-12 h-12 text-[#00b67a] mb-6 animate-pulse" />
      <h2 className="text-[28px] font-bold mb-4">Company Profile Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md text-center">The requested company profile could not be loaded. Please check the URL or try searching again.</p>
      <Link to="/" className="bg-[#002e21] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">Back to Home</Link>
    </div>
  );

  return (
    <LocalErrorBoundary>
      <div className="min-h-screen bg-[#fffcf8] selection:bg-[#00b67a] selection:text-white font-sans text-[#1a1c21]">
        
        {/* ───── DARK HEADER ───── */}
        <nav className="bg-[#002116] py-3 sticky top-0 z-[100] shadow-md border-b border-white/5">
          <div className="max-w-[1240px] mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <Link to="/" className="flex items-center gap-1.5 group">
                <Star className="w-7 h-7 text-[#00b67a] fill-current" />
                <span className="text-[22px] font-bold text-white tracking-tight">TruthBoard</span>
              </Link>
              
              <div className="relative hidden md:flex items-center flex-1 max-w-[500px]" ref={searchRef}>
                 <div className="absolute left-3.5 z-10">
                    <Search className="w-4 h-4 text-gray-500" />
                 </div>
                <input 
                  type="text" 
                  placeholder="Search for another company..." 
                  className="w-full bg-white rounded-md pl-10 pr-4 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00b67a]/30 font-medium border-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl text-gray-900 overflow-hidden border border-gray-100 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                    {searchResults.map((result) => (
                      <Link
                        key={result._id}
                        to={`/company/${result.slug}`}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none"
                        onClick={() => { setShowResults(false); setSearchQuery(''); }}
                      >
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded flex items-center justify-center font-bold text-sm uppercase shrink-0 overflow-hidden">
                          {result.logo ? (
                            <img 
                              src={result.logo} 
                              alt="" 
                              className="w-full h-full object-contain" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = result.name[0];
                              }}
                            />
                          ) : result.name[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[14px] font-bold truncate">{result.name}</div>
                          <div className="text-[12px] text-gray-400 font-medium truncate">{result.website}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5 text-[14px] font-bold text-white">
              <Link to="/categories" className="hover:text-[#00b67a] transition-colors">Categories</Link>
              <Link to="/blog" className="hover:text-[#00b67a] transition-colors">Blog</Link>
              <div className="flex items-center gap-5 pl-4 ml-2 border-l border-white/20">
                <div 
                   onClick={() => setShowNotifications(true)}
                   className="relative cursor-pointer group"
                >
                   <Bell className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#002116]"></div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-[34px] h-[34px] rounded-full bg-[#1a3a31] flex items-center justify-center text-[12px] font-bold border border-white/10 group-hover:bg-[#254d41] transition-all">JA</div>
                  <span className="text-sm font-medium hidden lg:block">Jay</span>
                  <ChevronDown className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </div>
                <Link to="/business" className="bg-[#a8c6ff] text-[#002116] px-5 py-2.5 rounded-full hover:bg-white transition-all text-[13px] font-bold shadow-sm whitespace-nowrap">
                  For businesses
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* ───── HERO SECTION ───── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1240px] mx-auto px-4 pt-6 pb-12">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[13px] font-medium text-gray-900 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {company?.breadcrumbs?.map((b, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-gray-400 mx-0.5">›</span>}
                  <Link to="#" className={`${i === (company.breadcrumbs.length - 1) ? 'font-bold' : 'hover:underline text-gray-600'}`}>{b}</Link>
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start transition-all">
              
              {/* LEFT COLUMN */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 {/* Product/Company Hero Image */}
                 <div className="w-48 h-32 md:w-52 md:h-36 bg-white border border-gray-200 rounded p-1 flex items-center justify-center shadow-sm shrink-0 overflow-hidden relative">
                    {company?.name === 'Apple' ? (
                       <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
                          alt="Company Logo" 
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                             e.target.onerror = null;
                             e.target.src = "";
                             e.target.parentElement.innerHTML = `<div class="w-full h-full bg-[#00b67a] rounded-sm flex items-center justify-center text-white text-5xl font-bold uppercase">A</div>`;
                          }}
                       />
                    ) : (
                       <div className="w-full h-full bg-[#00b67a] rounded-sm flex items-center justify-center text-white text-5xl font-bold uppercase">
                          {company?.name?.[0]}
                       </div>
                    )}
                 </div>

                 <div className="flex-1 space-y-5">
                    <div className="space-y-1.5">
                       <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded leading-none">
                          <Info className="w-3 h-3" /> Unclaimed profile
                       </div>
                       <h1 className="text-[40px] lg:text-[48px] font-bold leading-tight tracking-tight text-[#111]">{company?.name}</h1>
                       <div className="flex items-center gap-2.5">
                          <span className="text-[14px] font-bold text-[#111]">Reviews {(company?.totalReviews || company?.reviewCount || 0).toLocaleString()}</span>
                          <span className="text-gray-300">·</span>
                          <StarRating rating={company?.averageRating || company?.rating || 0} size="h-5 w-5" />
                          <span className="text-[15px] font-bold text-[#111]">{company?.averageRating?.toFixed(1) || company?.rating || '0.0'}</span>
                          <Info className="w-3.5 h-3.5 text-gray-300 cursor-pointer" />
                       </div>
                       <div className="text-[14px] font-bold text-[#3d68ff] hover:underline cursor-pointer">
                          {typeof company?.category === 'object' ? company.category?.name : (company.category || 'General Store')}
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                       <button 
                          onClick={handleWriteReview}
                          className="bg-[#3e68ff] text-white px-9 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#2c4dbf] transition-all flex items-center gap-2 shadow-sm"
                       >
                          <PenTool className="w-4 h-5 ml-[-6px]" /> Write a review
                       </button>
                       <button 
                          onClick={handleVisitWebsite}
                          className="bg-white border border-gray-300 text-gray-900 px-9 py-3.5 rounded-full font-bold text-[15px] hover:bg-gray-50 transition-all flex items-center gap-2"
                       >
                          Visit website <ExternalLink className="w-4 h-4 ml-1 opacity-60" />
                       </button>
                    </div>
                 </div>
              </div>

              {/* RIGHT COLUMN (TrustScore Preview) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-8 space-y-6">
                 <div className="flex items-start justify-between">
                    <div className="space-y-1">
                       <h2 className="text-[44px] font-bold leading-none text-[#111]">{company?.averageRating?.toFixed(1) || company?.rating || '0.0'}</h2>
                       <p className="text-[18px] font-bold text-[#111] uppercase tracking-wide">
                          {(company?.averageRating || company?.rating) < 2 ? 'Poor' : (company?.averageRating || company?.rating) < 3 ? 'Fair' : (company?.averageRating || company?.rating) < 4 ? 'Great' : 'Excellent'}
                       </p>
                       <div className="pt-1.5">
                          <StarRating rating={company?.averageRating || company?.rating || 0} size="h-6 w-6" />
                       </div>
                       <p className="text-[13px] font-bold text-gray-400 pt-3">{(company?.totalReviews || company?.reviewCount || 0).toLocaleString()} reviews</p>
                    </div>

                    <div className="flex-1 max-w-[150px] space-y-2.5">
                       {/* Map real ratingDistribution if available, otherwise fallback to mock stars */}
                       {(company?.ratingDistribution ? [
                          { label: '5-star', percent: company.totalReviews > 0 ? (company.ratingDistribution[5] / company.totalReviews) * 100 : 0, color: 'bg-[#00b67a]' },
                          { label: '4-star', percent: company.totalReviews > 0 ? (company.ratingDistribution[4] / company.totalReviews) * 100 : 0, color: 'bg-[#73cf11]' },
                          { label: '3-star', percent: company.totalReviews > 0 ? (company.ratingDistribution[3] / company.totalReviews) * 100 : 0, color: 'bg-[#ffce00]' },
                          { label: '2-star', percent: company.totalReviews > 0 ? (company.ratingDistribution[2] / company.totalReviews) * 100 : 0, color: 'bg-[#ff8622]' },
                          { label: '1-star', percent: company.totalReviews > 0 ? (company.ratingDistribution[1] / company.totalReviews) * 100 : 0, color: 'bg-[#ff3722]' },
                       ] : (company?.stars || [])).map((s, i) => (
                          <div key={i} className="flex items-center gap-3 w-full">
                             <span className="text-[11px] font-bold text-gray-400 w-10 shrink-0">{s.label}</span>
                             <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                   initial={{width:0}} animate={{width:`${s.percent}%`}} viewport={{once:true}}
                                   className={`h-full ${s.color}`} 
                                />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="pt-4 border-t border-gray-100">
                    <button className="text-[13px] font-bold text-gray-600 hover:underline flex items-center gap-2 mx-auto">
                       How is the TrustScore calculated?
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───── SECONDARY NAV (TABS) ───── */}
        <div className="bg-white border-b border-gray-200 sticky top-[64px] z-[90]">
           <div className="max-w-[1240px] mx-auto px-4 flex items-center justify-between">
              <div className="flex gap-10">
                 {['Summary', 'About', 'Reviews'].map(tab => (
                    <button 
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`py-5 text-[15px] font-bold border-b-2 transition-all ${activeTab === tab ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                       {tab}
                    </button>
                 ))}
              </div>
              <div className="hidden md:flex items-center gap-3 py-3">
                 <button onClick={handleVisitWebsite} className="bg-white border border-gray-300 text-gray-900 px-5 py-2.5 rounded-full font-bold text-[14px] hover:bg-gray-50 flex items-center gap-2">
                    Visit website <ExternalLink className="w-3.5 h-3.5 opacity-40" />
                 </button>
                 <button onClick={handleWriteReview} className="bg-[#3e68ff] text-white px-5 py-2.5 rounded-full font-bold text-[14px] hover:bg-[#2c4dbf] flex items-center gap-2">
                    <PenTool className="w-3.5 h-3.5" /> Write a review
                 </button>
              </div>
           </div>
        </div>

        {/* ───── MAIN CONTENT ───── */}
        <div className="max-w-[1240px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
           
           {/* LEFT COLUMN */}
           <div className="space-y-10">
              
              {/* Summary Tab Content */}
              {activeTab === 'Summary' && (
                 <div className="space-y-10">
                    {/* Verification Banner */}
                    <div className="bg-[#f0f9ff] border border-[#d2e2e9] p-4 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-[#e6f4ff] transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                             <Star className="w-5 h-5 text-blue-600 fill-current" />
                          </div>
                          <p className="text-[14px] font-bold text-gray-800 leading-tight">We use technology to protect platform integrity, but we don't fact-check reviews</p>
                       </div>
                       <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    </div>

                    {/* Review Summary */}
                    <div className="space-y-5 bg-white p-8 rounded-xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                       <div className="space-y-3">
                          <h2 className="text-[24px] font-bold flex items-center gap-2 text-gray-900">
                             Review summary <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                          </h2>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Based on reviews, created with AI</p>
                       </div>
                       <p className="text-[16px] leading-relaxed text-gray-600 font-medium">
                          {(company?.averageRating || company?.rating) < 3 
                             ? "Most reviewers were unhappy with their experience overall. Many customers expressed dissatisfaction with the company's customer service and the functionality of their applications. People frequently encountered issues with product updates, which some felt negatively impacted older devices and overall user experience." 
                             : "The company has received highly positive feedback overall. Many people found the service to be reliable, with quick responses and high quality results..."}
                          <br /><br />
                          Reviewers also had mixed feelings about the product quality, with some reporting... <span className="text-blue-600 font-bold hover:underline cursor-pointer">See more</span>
                       </p>
                       <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                          <span className="text-[13px] font-bold text-gray-400">Was this summary helpful?</span>
                          <div className="flex gap-2">
                             <button className="hover:bg-gray-100 border border-gray-200 p-2.5 rounded transition-colors"><ThumbsUp className="w-4 h-4 text-gray-400" /></button>
                             <button className="hover:bg-gray-100 border border-gray-200 p-2.5 rounded transition-colors rotate-180"><ThumbsUp className="w-4 h-4 text-gray-400" /></button>
                          </div>
                       </div>
                    </div>

                    {/* What people talk about most */}
                    <div className="space-y-6">
                       <h3 className="text-[20px] font-bold text-gray-900">What people talk about most</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                             { title: 'Product', text: 'Clients share ambiguous opinions on product. Many reviewers express disappointment with Apple products,...', color: 'bg-[#f5f3ff]' },
                             { title: 'Customer service', text: 'People report negative experiences with customer service. Many customers express dissatisfaction, citing...', color: 'bg-[#fdf4ff]' },
                             { title: 'Application', text: 'Consumers found the application to be negative. They report issues following updates and report that...', color: 'bg-[#f0f9ff]' },
                          ].map((card, idx) => (
                             <div key={idx} className={`${card.color} p-6 rounded-xl border border-gray-100/50 shadow-sm relative group cursor-pointer hover:shadow-md transition-all`}>
                                <h4 className="font-bold text-[16px] mb-3 text-gray-900">{card.title}</h4>
                                <p className="text-[13px] leading-relaxed text-gray-600 font-medium">{card.text} <span className="text-blue-600 font-bold hover:underline">See more</span></p>
                                <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              )}

              {/* About Tab Content */}
              {activeTab === 'About' && (
                 <div className="space-y-8 bg-white p-10 rounded-xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="space-y-4">
                       <h2 className="text-[32px] font-bold text-gray-900 leading-tight">About {company?.name}</h2>
                       <div className="flex flex-wrap gap-2">
                          {['Technology', 'Electronics', 'Innovation', 'Hardware', 'Software'].map(tag => (
                             <span key={tag} className="bg-gray-50 border border-gray-100 px-3 py-1 rounded text-[12px] font-bold text-gray-500">{tag}</span>
                          ))}
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                       <div className="space-y-6">
                          <div>
                             <h4 className="font-bold text-gray-900 mb-2">Company description</h4>
                             <p className="text-[15px] leading-relaxed text-gray-600 font-medium">
                                {company?.name} is a global leader in {company?.category?.name || 'technology'}, known for its innovative products and services that redefine the industry standards.
                             </p>
                          </div>
                          <div className="space-y-4">
                             <h4 className="font-bold text-gray-900">Contact</h4>
                             <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                   <Globe className="w-4 h-4" />
                                   <span className="text-[14px] font-medium">{company?.website}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                   <MapPin className="w-4 h-4" />
                                   <span className="text-[14px] font-medium">Cupertino, California, US</span>
                                </div>
                             </div>
                          </div>
                       </div>
                       <div className="bg-[#f8fafd] p-8 rounded-xl space-y-4 border border-blue-50/50">
                          <h4 className="font-bold text-gray-900">Transparency report</h4>
                          <p className="text-[13px] leading-relaxed text-gray-500 font-medium">This company has claimed its profile and is using TruthBoard's business tools to engage with their community.</p>
                          <button className="text-[#3d68ff] font-bold text-[14px] hover:underline">View transparency report</button>
                       </div>
                    </div>
                 </div>
              )}

              {/* Reviews Section Header & Filters (Visible for Summary and Reviews tabs) */}
              {(activeTab === 'Summary' || activeTab === 'Reviews') && (
                 <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="pt-12 space-y-8">
                       <div className="flex items-center gap-2">
                          <h3 className="text-[20px] font-bold text-gray-900">Based on these reviews</h3>
                          <Info className="w-4 h-4 text-gray-300" />
                       </div>

                       {/* Filters Bar */}
                       <div className="flex flex-col md:flex-row gap-4">
                          <div className="relative flex-1">
                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                             <input 
                                type="text" 
                                placeholder="Search by keyword..." 
                                value={reviewFilter}
                                onChange={(e) => setReviewFilter(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-full py-3 px-11 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600/30 transition-all font-medium"
                             />
                             {reviewFilter && (
                                <button 
                                  onClick={() => setReviewFilter('')}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold"
                                >
                                  ×
                                </button>
                             )}
                          </div>
                          <div className="flex gap-2">
                             <button className="bg-white border border-gray-200 px-6 py-3 rounded-full font-bold text-[14px] flex items-center gap-2 hover:bg-gray-50 transition-all">
                                More filters <SlidersHorizontal className="w-4 h-4" />
                             </button>
                             <button className="bg-white border border-gray-200 px-6 py-3 rounded-full font-bold text-[14px] flex items-center gap-2 hover:bg-gray-50 transition-all">
                                Most recent <ChevronDown className="w-4 h-4" />
                             </button>
                          </div>
                       </div>

                       {/* Top Mentions Tags */}
                       <div className="flex flex-wrap gap-2 pt-2">
                          {['Product', 'Customer service', 'Application', 'Mistake', 'Customer communications', 'Solution', 'Upgrade', 'Refund', 'Staff', 'Service'].map(tag => (
                             <button 
                                key={tag} 
                                onClick={() => setReviewFilter(tag)}
                                className={`bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[13px] font-bold transition-all shadow-sm ${reviewFilter === tag ? 'border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-700 hover:border-blue-600 hover:text-blue-600'}`}
                             >
                                {tag}
                             </button>
                          ))}
                       </div>
                    </div>

                    {/* Reviews Feed */}
                    <div className="space-y-6 pt-4">
                       {filteredReviews.length > 0 ? filteredReviews.map(rev => (
                          <div key={rev.id || rev._id} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative">
                             <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm border border-gray-200 uppercase">
                                      {rev.initials}
                                   </div>
                                   <div>
                                      <h5 className="font-bold text-[15px] text-gray-900">{rev.user}</h5>
                                      <p className="text-[11px] font-bold text-gray-400 mt-0.5 uppercase tracking-wide">
                                         {rev.location || 'US'} · {rev.reviewsCount || 1} {rev.reviewsCount === 1 ? 'review' : 'reviews'}
                                      </p>
                                   </div>
                                </div>
                                <div className="text-[13px] font-medium text-gray-400">{rev.date}</div>
                             </div>

                             <div className="flex items-center gap-0.5 mb-4">
                                <StarRating rating={rev.rating} size="h-5 w-5" />
                                {rev.verified && (
                                   <div className="ml-3 flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                      <CheckCircle className="w-3 h-3 text-blue-500 fill-blue-500/10" />
                                      <span className="text-[11px] font-bold text-gray-500 uppercase">Verified</span>
                                   </div>
                                )}
                             </div>

                             <h4 className="text-[18px] font-bold mb-3 text-gray-900 tracking-tight">{rev.title}</h4>
                             <p className="text-[15px] leading-relaxed text-gray-600 font-medium pb-8">
                                {rev.text}
                                <Link to="#" className="text-blue-600 font-bold ml-1 hover:underline">Read more</Link>
                             </p>

                             <div className="flex items-center gap-8 pt-6 border-t border-gray-50">
                                <button className="flex items-center gap-2 text-[12px] font-bold text-gray-500 hover:text-[#3e68ff] transition-colors">
                                   <ThumbsUp className="w-4 h-4" /> Useful {rev.usefulCount > 0 && <span>{rev.usefulCount}</span>}
                                </button>
                                <button className="flex items-center gap-2 text-[12px] font-bold text-gray-500 hover:text-[#3e68ff] transition-colors">
                                   <Share2 className="w-4 h-4" /> Share
                                </button>
                                <button className="ml-auto text-gray-300 hover:text-red-500 transition-colors">
                                   <Flag className="w-4 h-4" />
                                </button>
                             </div>
                          </div>
                       )) : (
                          <div className="bg-white p-12 rounded-xl border border-gray-200 text-center space-y-4">
                             <Search className="w-12 h-12 text-gray-200 mx-auto" />
                             <h4 className="text-[18px] font-bold text-gray-900">No reviews found</h4>
                             <p className="text-gray-500 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                             <button onClick={() => setReviewFilter('')} className="text-[#3d68ff] font-bold hover:underline">Clear all filters</button>
                          </div>
                       )}

                       {/* Pagination Mockup */}
                       <div className="flex items-center justify-center gap-2 pt-12">
                          <button className="bg-white border border-gray-200 px-5 py-2.5 rounded text-[14px] font-bold text-gray-900 hover:bg-gray-50">Previous</button>
                          {[1, 2, 3, 4].map(p => (
                             <button key={p} className={`w-10 h-10 rounded font-bold text-[14px] transition-colors ${p === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}>{p}</button>
                          ))}
                          <span className="px-1 text-gray-400 font-bold">...</span>
                          <button className="bg-white border border-gray-200 px-5 py-2.5 rounded text-[14px] font-bold text-[#3d68ff] hover:bg-gray-50">Next page</button>
                       </div>
                    </div>
                 </div>
              )}

              {/* Company Details Section */}
              <div className="pt-20 space-y-10 border-t border-gray-100">
                 <div className="space-y-6">
                    <h3 className="text-[28px] font-bold text-gray-900">Company details</h3>
                    <div className="flex flex-wrap gap-2 text-[12px] font-bold">
                       {['Electronics Store', 'Cell Phone Accessory Store', 'Cell Phone Store', 'Clothing Store', 'Computer Accessories Store', 'Computer Store', 'Software Company', 'Watch Store'].map(tag => (
                          <div key={tag} className="bg-white border border-gray-200 px-4 py-1.5 rounded text-blue-600 hover:bg-gray-50 cursor-pointer shadow-sm">{tag}</div>
                       ))}
                       <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-300"><Info className="w-4 h-4" /></div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[14px] font-bold text-gray-900">Information provided by various external sources</p>
                    <p className="text-[15px] leading-relaxed text-gray-600 font-medium max-w-2xl">
                       {company?.description}
                    </p>
                 </div>

                 {/* Contact info grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
                    <div className="space-y-6">
                       <h4 className="text-[24px] font-bold text-gray-900">Contact info</h4>
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 text-[14px] font-bold text-gray-700">
                             <MapPin className="w-5 h-5 text-gray-400" /> United Kingdom
                          </div>
                          <div className="flex items-center gap-3 text-[14px] font-bold text-[#3d68ff] hover:underline cursor-pointer">
                             <Globe className="w-5 h-5 text-gray-400" /> {company?.website}
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* People also looked at Carousel */}
                 <div className="pt-16 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-[20px] font-bold text-gray-900 flex items-center gap-2">
                          People also looked at <Info className="w-4 h-4 text-gray-300" />
                       </h3>
                       <div className="flex gap-2">
                          <button 
                             onClick={handlePrevCarousel}
                             className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                          >
                             <ChevronRight className="w-4 h-4 rotate-180" />
                          </button>
                          <button 
                             onClick={handleNextCarousel}
                             className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
                          >
                             <ChevronRight className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">
                       {[
                          { name: 'Amazon', url: 'www.amazon.com', rating: 1.7, reviews: '45K', logo: 'https://logo.clearbit.com/amazon.com' },
                          { name: 'Samsung', url: 'www.samsung.com', rating: 1.3, reviews: '7K', logo: 'https://logo.clearbit.com/samsung.com' },
                          { name: 'Google', url: 'www.google.com', rating: 2.3, reviews: '10K', logo: 'https://logo.clearbit.com/google.com' },
                          { name: 'Microsoft', url: 'www.microsoft.com', rating: 1.2, reviews: '3K', logo: 'https://logo.clearbit.com/microsoft.com' },
                       ].map((comp, idx) => (
                          <div 
                             key={idx} 
                             onClick={() => navigate(`/company/${comp.name.toLowerCase()}`)}
                             className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 hover:shadow-lg transition-all cursor-pointer group shadow-sm"
                          >
                             <div className="w-full h-24 bg-gray-50 rounded flex items-center justify-center border border-gray-100 p-4">
                                <img 
                                   src={comp.logo} 
                                   alt={comp.name} 
                                   className="max-w-full max-h-full object-contain mix-blend-multiply"
                                   onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.style.display = 'none';
                                      e.target.parentElement.innerHTML = `<div class="w-12 h-12 bg-gray-200 rounded-sm flex items-center justify-center font-bold text-gray-400">${comp.name[0]}</div>`;
                                   }}
                                />
                             </div>
                             <div>
                                <h5 className="font-bold text-[15px] group-hover:text-blue-600 transition-colors">{comp.name}</h5>
                                <p className="text-[12px] text-gray-400 font-medium truncate">{comp.url}</p>
                             </div>
                             <div className="flex items-center gap-1.5 border-t border-gray-50 pt-4">
                                <StarRating rating={comp.rating} size="h-3.5 w-3.5" />
                                <span className="text-[13px] font-bold text-gray-900">{comp.rating}</span>
                                <span className="text-[11px] text-gray-400 font-medium">({comp.reviews})</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN (SIDEBAR) */}
           <aside className="space-y-6">
              {/* Transparency box */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5 shadow-sm">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                       <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[14px] font-bold text-gray-800 leading-snug">
                          How this company uses TruthBoard
                       </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                 </div>
                 <p className="text-[13px] text-gray-400 font-medium leading-relaxed">See how their reviews and ratings are sourced, scored, and moderated.</p>
              </div>

              {/* Is this your company? */}
              <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6 shadow-sm">
                 <div className="space-y-4">
                    <h4 className="text-[20px] font-bold text-gray-900">Is this your company?</h4>
                    <p className="text-[13px] leading-relaxed text-gray-600 font-medium">Claim your profile to access TruthBoard's free business tools and connect with customers.</p>
                 </div>
                 <button className="w-full bg-white border-2 border-[#3d68ff] text-[#3d68ff] py-3 rounded-full font-bold text-[15px] hover:bg-blue-50 transition-all">
                    Get free account
                 </button>
              </div>

              {/* The TruthBoard Experience */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                 <div className="p-8 pb-0">
                    <h4 className="text-[20px] font-bold text-gray-900 flex items-center gap-2">
                       The TruthBoard Experience <Star className="w-5 h-5 text-[#00b67a] fill-current" />
                    </h4>
                 </div>
                 <div className="p-4 space-y-1">
                    {[
                       "We're open to all",
                       "We champion verified reviews",
                       "We fight fake reviews",
                       "We show the latest reviews",
                       "We encourage constructive feedback",
                       "We verify reviewers",
                       "We advocate against bias"
                    ].map((item, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 rounded-lg hover:bg-[#ebf5ff] text-[#1e3a8a] bg-[#dbedff]/50 mb-1 cursor-pointer transition-all group">
                          <span className="text-[14px] font-bold">{item}</span>
                          <ChevronDown className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                       </div>
                    ))}
                 </div>
                 <div className="p-6 pt-2">
                    <button className="w-full bg-[#3d68ff] text-white py-3.5 rounded-full font-bold text-[15px] hover:bg-[#2c4dbf] transition-all">
                       Take a closer look
                    </button>
                 </div>
              </div>
           </aside>
        </div>

        {/* ───── SITE FOOTER ───── */}
        <Footer />

        {/* ───── NOTIFICATIONS SIDEBAR ───── */}
        <AnimatePresence>
           {showNotifications && (
              <>
                 {/* Backdrop */}
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowNotifications(false)}
                    className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[1000]"
                 />
                 
                 {/* Sidebar */}
                 <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 w-full sm:w-[440px] h-full bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[1001] flex flex-col"
                 >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                       <h2 className="text-[24px] font-bold text-gray-900 tracking-tight">Notifications</h2>
                       <button 
                          onClick={() => setShowNotifications(false)}
                          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors group"
                       >
                          <X className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                       </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                       <div className="w-20 h-20 rounded-full bg-[#ebfaf5] flex items-center justify-center">
                          <Bell className="w-9 h-9 text-[#00b67a]" />
                       </div>
                       <div className="space-y-1">
                          <h3 className="text-[18px] font-bold text-gray-900">You're all caught up!</h3>
                          <p className="text-[14px] font-medium text-gray-400">When you get notifications, they'll show up here.</p>
                       </div>
                    </div>
                 </motion.div>
              </>
           )}
        </AnimatePresence>

      </div>
    </LocalErrorBoundary>
  );
};

export default CompanyPage;
