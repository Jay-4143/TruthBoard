import React, { useState, useEffect, Component } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Search, ChevronDown, CheckCircle, ExternalLink, Globe,
  MessageSquare, Info, ShieldCheck, Sparkles, ThumbsUp, 
  Share2, Flag, ShoppingCart, Truck, UserCheck, HelpCircle,
  MoreHorizontal, ChevronRight, Bell, User
} from 'lucide-react';

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
          <h2 className="text-2xl font-black mb-4">Display Error</h2>
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
  
  // Real or Mock State
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll handler for sticky header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const safeSlug = (slug || "").toLowerCase();
      
      try {
        console.log("Fetching data for slug:", safeSlug);
        
        // For demonstration, if slug is 'amazon', use specific mock data
        if (safeSlug.includes('amazon')) {
          setCompany({
            name: "Amazon",
            website: "www.amazon.com",
            rating: 1.7,
            reviewCount: 44536,
            category: "Book Store",
            breadcrumbs: ["Media & Publishing", "Books & Magazines", "Book Store", "Amazon"],
            description: "Online shopping from the earth's biggest selection of books, magazines, music, DVDs, videos, electronics, computers, software, apparel & accessories, shoes, jewelry, tools & hardware, housewares, furniture, sporting goods, beauty & personal care, broadband & dsl, gourmet food & just about anything else.",
            claimed: true,
            isBad: true,
            stars: [
              { label: '5 star', percent: 19, color: 'bg-emerald-500' },
              { label: '4 star', percent: 5, color: 'bg-emerald-300' },
              { label: '3 star', percent: 4, color: 'bg-yellow-400' },
              { label: '2 star', percent: 6, color: 'bg-orange-400' },
              { label: '1 star', percent: 66, color: 'bg-red-500' },
            ]
          });

          setReviews([
            {
              id: 1,
              user: "Steve",
              initials: "ST",
              date: "5 days ago",
              rating: 1,
              title: "Ordered product for £35, waited in",
              text: "Amazon is a service I use often, but lately my orders have been arriving in terrible shape. Some boxes look like they have been through a war zone—completely mutilated and smashed. Recently, I ordered...",
              verified: true,
              usefulCount: 2
            },
            {
              id: 2,
              user: "Kevin Hansen",
              initials: "KH",
              date: "Mar 11, 2026",
              rating: 1,
              title: "Amazon is a service I use often, but",
              text: "Amazon is a service I use often, but lately my orders have been arriving in terrible shape. Some boxes look like they have been through a war zone—completely mutilated and smashed. Recently, I ordered...",
              verified: true,
              usefulCount: 1
            }
          ]);
        } else {
          // Dynamic fetch
          const response = await api.get(`/companies/${slug}`);
          const companyData = response?.data;
          setCompany(companyData);
          if (companyData?._id) {
            const reviewsResponse = await api.get(`/reviews/company/${companyData._id}`);
            setReviews(reviewsResponse?.data || []);
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
         <span className="text-2xl font-black text-[#002e21]">TruthBoard</span>
       </motion.div>
    </div>
  );

  if (!company) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 border-t-4 border-[#00b67a]">
      <Star className="w-12 h-12 text-[#00b67a] mb-6 animate-pulse" />
      <h2 className="text-[28px] font-black mb-4">Company Profile Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md text-center">The requested company profile could not be loaded. Please check the URL or try searching again.</p>
      <Link to="/" className="bg-[#002e21] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">Back to Home</Link>
    </div>
  );

  return (
    <LocalErrorBoundary>
      <div className="min-h-screen bg-[#fffcf8] selection:bg-[#00b67a] selection:text-white font-sans text-gray-900">
        
        {/* ───── STICKY HEADER ───── */}
        <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-[#002e21] shadow-xl py-2' : 'bg-[#002e21] py-4'}`}>
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <Star className="w-8 h-8 text-[#00b67a] fill-current group-hover:rotate-12 transition-transform" />
                <span className="text-xl font-black text-white tracking-tighter">Trustpilot</span>
              </Link>
              
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search for another company..." 
                  className="w-[400px] bg-white rounded-md pl-4 pr-10 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00b67a]/20 font-medium border-none shadow-inner"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-8 text-[14px] font-bold text-white/90">
              <Link to="/categories" className="hover:text-white">Categories</Link>
              <Link to="/blog" className="hover:text-white">Blog</Link>
              <div className="flex items-center gap-6 pl-4 border-l border-white/5">
                <Bell className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[12px] font-black hover:bg-white/20 transition-all border border-white/5 cursor-pointer">JA</div>
                <Link to="/business" className="bg-[#a8c6ff] text-[#002e21] px-5 py-2.5 rounded-full hover:bg-white transition-all">
                  For businesses
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* ───── SUB-NAV Tabs (Visible after hero) ───── */}
        <div className={`fixed w-full top-16 z-[90] bg-white border-b border-gray-100 transition-all duration-300 ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center gap-12">
            <div className="flex items-center gap-3">
               <Star className={`w-6 h-6 ${company?.isBad ? 'text-red-500':'text-emerald-500'} fill-current`} />
               <span className="font-bold text-[15px]">{company?.name || 'Company'}</span>
            </div>
            <div className="flex gap-8 h-full">
              {['Summary', 'About', 'Reviews'].map(t => (
                <button key={t} onClick={()=>setActiveTab(t)} className={`text-[13px] font-bold relative transition-colors ${activeTab === t ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600':'text-gray-500 hover:text-gray-900'}`}>{t}</button>
              ))}
            </div>
            <div className="ml-auto flex gap-4">
              <button className="bg-white border border-gray-200 px-4 py-2 rounded-md font-bold text-[13px] hover:bg-gray-50 whitespace-nowrap">Visit website</button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold text-[13px] hover:bg-blue-700 whitespace-nowrap">Write a review</button>
            </div>
          </div>
        </div>

        {/* ───── MAIN CONTENT ───── */}
        <div className="pt-[100px] pb-24">
          <div className="max-w-[1400px] mx-auto px-6">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-8 uppercase tracking-widest leading-none">
              {company?.breadcrumbs?.map((b, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span>›</span>}
                  <span className={i === (company.breadcrumbs.length - 1) ? 'text-gray-500':'hover:text-gray-600 cursor-pointer'}>{b}</span>
                </React.Fragment>
              )) || <span>Company Profile › {company?.name}</span>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
              
              {/* LEFT COLUMN */}
              <div className="space-y-12">
                
                {/* Profile Card */}
                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00b67a]/20" />
                  <div className="flex items-start gap-10">
                    <div className="w-32 h-32 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
                      {/* Logo Mock */}
                      <div className="w-full h-full bg-blue-500 rounded-md flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform capitalize">
                        {company?.name?.[0] || 'C'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {company?.claimed && (
                          <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                            <CheckCircle className="w-2.5 h-2.5" /> Claimed profile
                          </div>
                        )}
                      </div>
                      <h1 className="text-[44px] font-black leading-none mb-4 tracking-tighter">{company?.name}</h1>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-[15px] font-bold border-b border-gray-400 pb-0.5 whitespace-nowrap">Reviews {(company?.reviewCount || 0).toLocaleString()}</span>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => (
                            <div key={s} className={`w-8 h-8 rounded-sm flex items-center justify-center ${s <= Math.floor(company?.rating || 0) ? (company?.isBad ? 'bg-red-500':'bg-emerald-500') : 'bg-gray-200'}`}>
                              <Star className={`w-5 h-5 ${s <= Math.floor(company?.rating || 0) ? 'text-white fill-current':'text-gray-300'}`} />
                            </div>
                          ))}
                        </div>
                        <span className="text-[17px] font-black text-gray-500">{company?.rating || '0.0'}</span>
                        <HelpCircle className="w-4 h-4 text-gray-300 hover:text-gray-400 cursor-pointer" />
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-[15px] hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" /> Write a review
                        </button>
                        <button className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-full font-black text-[15px] hover:bg-gray-50 transition-all flex items-center gap-2">
                          Visit website <ExternalLink className="w-4 h-4 opacity-40" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Summary Section */}
                <div className="bg-[#fcf8ff] p-10 rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-6 right-6 text-purple-200"><Sparkles className="w-8 h-8 rotate-12" /></div>
                   <h2 className="text-[20px] font-black mb-6 flex items-center gap-3">
                      Review summary <Sparkles className="w-5 h-5 text-purple-500" />
                   </h2>
                   <p className="text-gray-500 text-[13px] font-bold uppercase tracking-widest mb-4">Based on reviews, created with AI</p>
                   <p className="text-[15px] leading-relaxed text-gray-700 font-medium max-w-2xl">
                     {company?.rating < 3 ? "Most reviewers were let down by their experience overall. Many people found the delivery service to be unreliable, with frequent delays, missed deliveries, and packages arriving in poor condition or at incorrect addresses. Customers also reported issues with orders not arriving as expected or even being lost. The customer service was a significant point of frustration for many..." : "The company has received highly positive feedback overall. Many people found the service to be reliable, with quick responses and high quality results. Customers also reported issues were handled professionally and quickly by the support team..."} <span className="text-blue-600 font-bold cursor-pointer hover:underline ml-1">See more</span>
                   </p>
                   <div className="mt-8 pt-8 border-t border-purple-100 flex items-center gap-4 text-[13px] font-bold text-gray-500">
                      <span>Was this summary helpful?</span>
                      <div className="flex gap-3">
                         <button className="hover:text-emerald-500 transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                         <button className="hover:text-red-500 rotate-180 transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                      </div>
                   </div>
                </div>

                {/* Sentiment Bubbles */}
                <div className="space-y-6">
                   <h3 className="text-[20px] font-black">What people talk about most</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: 'Delivery service', desc: 'Reviewers express concerns regarding the delivery speed and reliability. Many customers report issues...', icon: Truck, color: 'border-purple-100 bg-purple-50/30' },
                        { title: 'Product quality', desc: 'Customers had varied experiences with product durability and build quality. While some reviewers were pleased...', icon: ShoppingCart, color: 'border-blue-100 bg-blue-50/30' },
                        { title: 'Customer support', desc: 'Consumers reported interactions to be mixed, with extreme emphasis on response times and satisfaction...', icon: UserCheck, color: 'border-indigo-100 bg-indigo-50/30' }
                      ].map((card, i) => (
                        <div key={i} className={`p-8 rounded-2xl border ${card.color} hover:shadow-md transition-all group cursor-pointer relative`}>
                           <card.icon className="w-6 h-6 text-indigo-300 mb-6 group-hover:scale-110 transition-transform" />
                           <h4 className="text-[17px] font-black mb-3">{card.title}</h4>
                           <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                              {card.desc} <span className="text-blue-600 hover:underline">See more</span>
                           </p>
                           <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                              <ChevronRight className="w-8 h-8 text-blue-600/40" />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Review List */}
                <div className="space-y-12 pt-12">
                   <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-12">
                         <button className="text-[15px] font-black border-b-[3px] border-gray-900 pb-5">Reviews</button>
                         <button className="text-[15px] font-bold text-gray-400 pb-5 hover:text-gray-600 transition-colors">About</button>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-4">
                         <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2 hover:bg-gray-50 transition-all whitespace-nowrap">Most recent <ChevronDown className="w-4 h-4" /></button>
                         <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2 hover:bg-gray-50 transition-all whitespace-nowrap">More filters <ChevronDown className="w-4 h-4" /></button>
                      </div>
                   </div>

                   <div className="space-y-8">
                      {reviews.map(rev => (
                        <div key={rev.id || rev._id} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                           <div className="flex items-center justify-between mb-8">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-black text-sm border border-emerald-100 shadow-inner overflow-hidden uppercase">
                                    {rev.initials || (rev.user?.[0]) || 'U'}
                                 </div>
                                 <div className="truncate">
                                    <h5 className="font-black text-[15px] truncate max-w-[150px]">{rev.user || (rev.userId?.name)}</h5>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{rev.date || new Date().toLocaleDateString()}</p>
                                 </div>
                              </div>
                              <div className="flex gap-1">
                                 {[1,2,3,4,5].map(s => (
                                    <div key={s} className={`w-5 h-5 rounded-[1px] ${s <= rev.rating ? (rev.rating < 3 ? 'bg-red-500':'bg-emerald-500') : 'bg-gray-200'} flex items-center justify-center`}>
                                       <Star className={`w-3 h-3 ${s <= rev.rating ? 'text-white fill-current':'text-gray-300'}`} />
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <h4 className="text-[20px] font-black mb-4 leading-snug">{rev.title}</h4>
                           <p className="text-[15px] leading-relaxed text-gray-600 font-medium mb-10">
                              {rev.text || rev.reviewText} <span className="text-blue-600 hover:underline cursor-pointer">See more</span>
                           </p>
                           <div className="flex items-center gap-8 pt-8 border-t border-gray-50">
                              <button className="flex items-center gap-2 text-[12px] font-bold text-gray-500 hover:text-emerald-600 transition-colors">
                                 <ThumbsUp className="w-4 h-4" /> Useful {(rev.usefulCount || 0) > 0 && rev.usefulCount}
                              </button>
                              <button className="flex items-center gap-2 text-[12px] font-bold text-gray-500 hover:text-blue-600 transition-colors">
                                 <Share2 className="w-4 h-4" /> Share
                              </button>
                              <button className="flex items-center gap-2 text-[12px] font-bold text-gray-500 hover:text-red-600 transition-colors ml-auto">
                                 <Flag className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      ))}
                      
                      <button className="w-full bg-[#f0f0f0] py-4 rounded-xl font-black text-[15px] hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        See all {(company.reviewCount || 0).toLocaleString()} reviews <ChevronDown className="w-5 h-5 opacity-40 rotate-180" />
                      </button>
                   </div>
                </div>

                {/* Company Details Section */}
                <div className="pt-24 space-y-12">
                   <h3 className="text-[24px] font-black">Company details</h3>
                   <div className="flex gap-3 flex-wrap">
                      {['Book Store','Clothing Store','Hobby Store','Shoe Store'].map(tag => (
                        <div key={tag} className="px-4 py-2 bg-gray-100 rounded text-[12px] font-bold text-gray-600 hover:bg-gray-200 cursor-pointer">{tag}</div>
                      ))}
                      <Info className="w-5 h-5 text-gray-300 ml-2 mt-2" />
                   </div>
                   <div className="space-y-6 max-w-2xl">
                      <h4 className="text-[14px] font-black uppercase text-gray-400 tracking-widest leading-none">Information provided by various external sources</h4>
                      <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                        {company.description}
                      </p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                      <div className="space-y-4">
                         <h4 className="text-[14px] font-black uppercase text-gray-400 tracking-widest leading-none">Contact info</h4>
                         <div className="flex items-center gap-3 text-[14px] font-bold text-gray-700">
                            <Globe className="w-5 h-5 text-gray-400 shrink-0" />
                            <span className="border-b border-gray-700 pb-0.5 truncate">{company.website}</span>
                         </div>
                         <div className="flex items-center gap-3 text-[14px] font-bold text-gray-700">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0"><User className="w-3 h-3 text-gray-400" /></div>
                            <span>United Kingdom</span>
                         </div>
                      </div>
                   </div>
                </div>

              </div>

              {/* RIGHT COLUMN (SIDEBAR) */}
              <aside className="space-y-8 lg:sticky lg:top-[150px]">
                
                {/* TrustScore Card */}
                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
                   <div className="flex flex-col xl:flex-row items-start justify-between mb-8 gap-8">
                      <div>
                         <h2 className="text-[64px] font-black leading-none mb-2 tracking-tighter">{company.rating}</h2>
                         <p className="text-[20px] font-black uppercase tracking-widest mb-4">{company.rating < 3 ? 'Bad' : 'Excellent'}</p>
                         <div className="flex gap-0.5 mb-2">
                            {[1,2,3,4,5].map(s => (
                               <div key={s} className={`w-8 h-8 rounded-sm ${s <= Math.floor(company.rating) ? (company.rating < 3 ? 'bg-red-500':'bg-emerald-500') : 'bg-gray-200'} flex items-center justify-center`}>
                                  <Star className={`w-5 h-5 ${s <= Math.floor(company.rating) ? 'text-white fill-current':'text-gray-300'}`} />
                               </div>
                            ))}
                         </div>
                         <p className="text-[13px] font-bold text-gray-400 mt-4 uppercase">{(company.reviewCount || 0).toLocaleString()} reviews</p>
                      </div>
                      <div className="space-y-3 flex-1 w-full shrink-0">
                         {(company.stars || []).map((s, i) => (
                           <div key={i} className="flex items-center gap-4 group cursor-pointer w-full">
                              <span className="text-[13px] font-bold text-gray-500 w-12 group-hover:text-gray-900 transition-colors whitespace-nowrap">{s.label}</span>
                              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{width:0}} whileInView={{width:`${s.percent}%`}} viewport={{once:true}}
                                    className={`h-full ${s.color} rounded-full`} 
                                 />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="pt-8 border-t border-gray-100 text-center">
                      <button className="text-[14px] font-black text-gray-600 hover:text-gray-900 border-b-2 border-gray-400 pb-1 flex items-center justify-center gap-2 mx-auto">
                        How is the TrustScore calculated?
                      </button>
                   </div>
                </div>

                {/* Transparency Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all cursor-pointer">
                   <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-[14px] font-black leading-none">TruthBoard's verification</h4>
                      <p className="text-[12px] text-gray-500 font-bold">Protecting platform integrity</p>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-300 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Transparency Summary Small */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-left">
                   <div className="flex items-start gap-4">
                      <MessageSquare className="w-6 h-6 text-gray-300 shrink-0" />
                      <p className="text-[14px] font-bold text-gray-700 leading-snug">
                       {company.rating < 3 ? "Hasn't replied to negative reviews" : "Regularly engages with customers"}
                      </p>
                   </div>
                   <div className="pt-6 border-t border-gray-100 flex items-start gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                         <Star className="w-5 h-5 text-gray-300 group-hover:text-[#00b67a] transition-colors" />
                      </div>
                      <div className="relative flex-1">
                         <div className="text-[13px] font-bold text-gray-700 leading-snug group-hover:text-blue-600 transition-colors pr-6">
                           How this company uses TruthBoard <br/>
                           <span className="text-gray-400 font-medium block mt-1">See how their reviews and ratings are sourced and moderated.</span>
                         </div>
                         <ExternalLink className="absolute top-0 right-0 w-3.5 h-3.5 text-gray-300" />
                      </div>
                   </div>
                </div>
              </aside>

            </div>

            {/* PEOPLE ALSO LOOKED AT */}
            <section className="mt-32 pt-32 border-t border-gray-100">
               <div className="flex items-center justify-between mb-12 px-2">
                  <h3 className="text-[24px] font-black flex items-center gap-3">
                     People also looked at <HelpCircle className="w-4 h-4 text-gray-300" />
                  </h3>
                  <div className="flex gap-4">
                     <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 hover:bg-gray-100 transition-all"><ChevronDown className="w-5 h-5 rotate-90" /></button>
                     <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-gray-50 shadow-md active:scale-95 transition-all"><ChevronDown className="w-5 h-5 -rotate-90" /></button>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
                  {[
                    { name: 'Temu', url: 'temu.com', rating: 2.0, revs: '49K', color: 'bg-orange-600', initials: 'T' },
                    { name: 'Amazon.co.uk', url: 'www.amazon.co.uk', rating: 1.4, revs: '32K', color: 'bg-gray-200', initials: 'A' },
                    { name: 'Amazon.de', url: 'www.amazon.de', rating: 1.6, revs: '24K', color: 'bg-indigo-600', initials: 'A' },
                    { name: 'SHEIN', url: 'shein.co.uk', rating: 3.9, revs: '59K', color: 'bg-gray-800', initials: 'S' }
                  ].map((comp, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer h-full flex flex-col">
                       <div className="w-16 h-16 rounded-xl overflow-hidden mb-6 flex items-center justify-center relative shadow-inner">
                          <div className={`w-full h-full ${comp.color} flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform`}>{comp.initials}</div>
                       </div>
                       <h4 className="text-[17px] font-black mb-1 leading-none">{comp.name}</h4>
                       <p className="text-[13px] font-medium text-gray-400 mb-6 truncate">{comp.url}</p>
                       <div className="flex items-center gap-3 border-t border-gray-50 pt-6 mt-auto">
                          <div className="flex gap-0.5">
                             {[1,2,3,4,5].map(s => (
                               <div key={s} className={`w-4 h-4 rounded-[1px] ${s <= Math.floor(comp.rating) ? 'bg-red-500':'bg-gray-200'} flex items-center justify-center`}>
                                  <Star className={`w-2 h-2 ${s <= Math.floor(comp.rating) ? 'text-white fill-current':'text-gray-300'}`} />
                               </div>
                             ))}
                          </div>
                          <span className="text-[13px] font-black text-gray-800">{comp.rating}</span>
                          <span className="text-[13px] font-bold text-gray-400 shrink-0">({comp.revs})</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

          </div>
        </div>

      </div>
    </LocalErrorBoundary>
  );
};

export default CompanyPage;
