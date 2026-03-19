import React, { useState, useEffect, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Search, ChevronDown, ArrowRight,
  Linkedin, Twitter, Facebook, Youtube,
  Play, Check, Mail, Globe, MessageCircle
} from 'lucide-react';

/* ───── Error Boundary ───── */
class LocalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 m-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <button onClick={() => window.location.reload()} className="bg-[#00b67a] text-white px-8 py-3 rounded-full font-bold">Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Blog = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Featured');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    'Featured', 'Trends in Trust', 'Reviews Matter', 
    'Buy With Confidence', 'TruthBoard Stories'
  ];

  const featuredPost = {
    date: 'November 18, 2025',
    title: 'TruthBoard Sees 76% Surge in Reviews Ahead of Black Friday as Shoppers Turn to Each Other for Guidance',
    desc: 'Make your voice heard. October 20-24th',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
    cta: 'Read now'
  };

  const sections = [
    {
      id: 'Trends in Trust',
      title: 'Trends in Trust',
      posts: [
        { title: 'Parcel delivery scams to watch out for all year round', date: 'January 31, 2024', img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Romance scams: Spot the signs', date: 'January 17, 2024', img: 'https://images.unsplash.com/photo-1516589174184-c685265e48d6?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Holiday hoaxes: How scammers take advantage of the holiday season', date: 'November 10, 2023', img: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Gift card scams: What to look out for and how to avoid them', date: 'November 1, 2023', img: 'https://images.unsplash.com/photo-1549460398-1ff921162d8c?q=80&w=2070&auto=format&fit=crop' }
      ]
    },
    {
      id: 'Reviews Matter',
      title: 'Reviews Matter',
      posts: [
        { title: 'TruthBoard Sees 76% Surge in Reviews Ahead of Black Friday', date: 'November 18, 2025', img: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Your voice changes the game during Write a Review Week', date: 'October 15, 2025', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop' },
        { title: '4 tips for sharing perfect product review photos', date: 'March 4, 2024', img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop' },
        { title: 'A critical analysis of the five-star experience', date: 'September 12, 2023', img: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop' }
      ]
    },
    {
      id: 'Buy With Confidence',
      title: 'Buy With Confidence',
      posts: [
        { title: 'Personal liability insurance: Coverage when you’re held responsible', date: 'May 20, 2024', img: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Understanding auto insurance: Comprehensive, full coverage, and liability explained', date: 'May 17, 2024', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Disability insurance: Short-term, long-term, and everything in between', date: 'May 15, 2024', img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Life insurance: Understanding term, whole, and supplemental policies', date: 'May 15, 2024', img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop' }
      ]
    },
    {
      id: 'TruthBoard Stories',
      title: 'TruthBoard Stories',
      posts: [
        { title: 'TruthBoard Pride & Allies: Our recommended resources', date: 'August 12, 2022', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop' },
        { title: 'TruthBoard is sponsoring Pride Copenhagen 2022 🏳️‍🌈', date: 'July 15, 2022', img: 'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Meet the pets of TruthBoard: 2021 Edition', date: 'November 8, 2021', img: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1972&auto=format&fit=crop' },
        { title: 'Introducing TruthBoard Pride & Allies', date: 'August 20, 2021', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop' }
      ]
    }
  ];

  return (
    <LocalErrorBoundary>
      <div className="min-h-screen bg-[#fffcf8] font-sans selection:bg-[#00b67a] selection:text-white">
        
        {/* ───── TOP NAVIGATION ───── */}
        <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-[#002e21] shadow-lg' : 'bg-[#002e21]'}`}>
          <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <Star className="w-8 h-8 text-[#00b67a] fill-current group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold text-white tracking-tighter">TruthBoard</span>
            </Link>
            
            <div className="flex items-center gap-8 text-[14px] font-bold text-white/90">
              <Link to="/categories" className="hover:text-white">Categories</Link>
              <Link to="/blog" className="text-[#00b67a]">Blog</Link>
              <div className="flex items-center gap-2 cursor-pointer border-l border-white/10 pl-8">
                <div className="w-8 h-8 rounded-full bg-[#1a1c21] flex items-center justify-center text-[11px] font-bold">JA</div>
                <span className="hover:text-white">Jay</span>
                <ChevronDown className="w-4 h-4 opacity-60" />
              </div>
              <Link to="/business" className="bg-[#a8c6ff] text-[#002e21] px-5 py-2.5 rounded-full hover:bg-white transition-all ml-4">
                For businesses
              </Link>
            </div>
          </div>
        </nav>

        {/* ───── BLOG SUB-HEADER ───── */}
        <div className="pt-16 bg-[#fffcf8]">
          <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-12">
              <h1 className="text-xl font-bold text-gray-900">The TruthBoard Blog</h1>
              <div className="hidden lg:flex items-center gap-6">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[13px] font-bold transition-all relative py-5 ${activeCategory === cat ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-72">
              <input 
                type="text" 
                placeholder="Search articles" 
                className="w-full bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00b67a]/20 transition-all placeholder:text-gray-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-300" />
            </div>
          </div>
        </div>

        {/* ───── FEATURED HERO ───── */}
        <main className="max-w-[1400px] mx-auto px-6 py-12">
          {activeCategory === 'Featured' && (
            <motion.section 
              initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}
              className="mb-24"
            >
              <h2 className="text-[28px] font-bold text-gray-900 mb-8">Featured</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-gray-100 pb-20">
                <div className="space-y-6 lg:pr-12">
                  <p className="text-[14px] font-bold text-gray-400">{featuredPost.date}</p>
                  <h3 className="text-[34px] md:text-[44px] font-bold text-gray-900 leading-[1.1] tracking-tight">
                    {featuredPost.title}
                  </h3>
                  <div className="pt-4">
                    <Link to="#" className="bg-[#4162ff] text-white px-8 py-3.5 rounded font-bold text-[15px] hover:bg-blue-600 transition-all shadow-lg inline-block">
                      Read now
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden group">
                  <img src={featuredPost.image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 border-[16px] border-white/10 pointer-events-none" />
                  {/* Write a Review Week Overlay Mock-up */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                     <div className="w-full h-full bg-white/95 border-[6px] border-[#00b67a] flex flex-col items-center justify-center text-center p-8 shadow-2xl">
                        <div className="flex items-center gap-2 mb-4">
                           <Star className="w-8 h-8 text-[#00b67a] fill-current" />
                           <span className="text-2xl font-bold">TruthBoard</span>
                        </div>
                        <h4 className="text-[42px] font-bold text-gray-900 mb-2 leading-none">Write a<br/>Review<br/>Week 🖊️</h4>
                        <div className="mt-8 flex flex-col items-center gap-4">
                           <p className="font-bold text-gray-600">Make your voice heard.</p>
                           <div className="bg-[#00b67a] text-white px-6 py-2 rounded-full font-bold text-[14px]">
                              October 20-24th
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ───── CONTENT SECTIONS ───── */}
          {sections.map((section, idx) => (
            (activeCategory === 'Featured' || activeCategory === section.title) && (
              <motion.section 
                key={section.id}
                initial={{opacity:0, y:20}} 
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                className="mb-24 last:mb-0"
              >
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100/50">
                  <h2 className="text-[28px] font-bold text-gray-900">{section.title}</h2>
                  <Link to="#" className="text-[13px] font-bold text-[#4162ff] hover:underline flex items-center gap-1">
                    See more articles
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {section.posts.map((post, pIdx) => (
                    <Link key={pIdx} to="#" className="group flex flex-col">
                      <div className="aspect-[1.5] w-full bg-gray-100 rounded-sm overflow-hidden mb-5">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="space-y-3">
                        <p className={`text-[12px] font-bold uppercase tracking-wider ${idx % 2 === 0 ? 'text-[#e67e22]' : 'text-[#4162ff]'}`}>
                          {section.title}
                        </p>
                        <h4 className="text-[18px] font-bold text-gray-900 leading-snug group-hover:text-[#4162ff] transition-colors line-clamp-3">
                          {post.title}
                        </h4>
                        <p className="text-[12px] font-bold text-gray-400 mt-2">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )
          ))}
        </main>

        {/* ───── DARK GREEN FOOTER ───── */}
        <footer className="bg-[#002e21] text-white pt-24 pb-12 mt-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-20 group cursor-pointer">
              <Star className="w-8 h-8 text-[#00b67a] fill-current group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold tracking-tighter">TruthBoard</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
              <div>
                <h5 className="text-[14px] font-bold mb-8 text-white/50 uppercase tracking-widest">About</h5>
                <ul className="space-y-5 text-[14px] font-bold">
                  {['About us','Jobs','Contact','Blog','How TruthBoard works','Press','Investor Relations'].map(link => (
                    <li key={link}><Link to="#" className="text-white/80 hover:text-[#00b67a] transition-colors">{link}</Link></li>
                  ))}
                  <li className="pt-4"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="w-28 opacity-80 hover:opacity-100 cursor-pointer" alt="App Store"/></li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-[14px] font-bold mb-8 text-white/50 uppercase tracking-widest">Community</h5>
                <ul className="space-y-5 text-[14px] font-bold">
                  {['Trust in reviews','Help Center','Log in','Sign up'].map(link => (
                    <li key={link}><Link to="#" className="text-white/80 hover:text-[#00b67a] transition-colors">{link}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[14px] font-bold mb-8 text-white/50 uppercase tracking-widest">Businesses</h5>
                <ul className="space-y-5 text-[14px] font-bold">
                  {['TruthBoard Business','Products','Plans & Pricing','Business Login','Blog for Business'].map(link => (
                    <li key={link}><Link to="#" className="text-white/80 hover:text-[#00b67a] transition-colors">{link}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[14px] font-bold mb-8 text-white/50 uppercase tracking-widest">Follow us on</h5>
                <div className="flex gap-6">
                  {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                    <Icon key={i} className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[14px] font-bold mb-8 text-white/50 uppercase tracking-widest">Choose country</h5>
                <div className="relative group">
                  <div className="bg-white text-gray-900 px-4 py-3 rounded flex items-center justify-between cursor-pointer border border-transparent group-hover:border-[#00b67a] transition-all">
                    <div className="flex items-center gap-3">
                      <img src="https://flagcdn.com/us.svg" className="w-5 h-3.5 object-cover" alt="US"/>
                      <span className="text-[13px] font-bold">United States</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-12 flex flex-col lg:flex-row justify-between items-center gap-8 text-[13px] font-bold text-white/40">
               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
                  {['Legal','Privacy Policy','Terms & Conditions','Guidelines for Reviewers','System status','Cookie preferences','Modern Slavery Statement'].map(t => (
                    <span key={t} className="hover:text-white cursor-pointer transition-colors">{t}</span>
                  ))}
               </div>
               <p>© 2026 TruthBoard Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    </LocalErrorBoundary>
  );
};

export default Blog;
