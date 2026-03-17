import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as CountUpModule from 'react-countup';
import { 
  BarChart3, Palette, ShieldCheck, MessageCircleQuestion, 
  MessageSquareQuote, Users, ArrowRight, CheckCircle2,
  ChevronRight, Star, Menu, X, Globe, Zap, Heart, ChevronDown,
  Search, ExternalLink, Play, BarChart2, PieChart, Activity,
  Database, Layout, Share2, Layers, Briefcase, Info, Mail, 
  Instagram, Twitter, Facebook, Youtube, Linkedin
} from 'lucide-react';

/* ───── Crash-Proof CountUp ───── */
const SafeCountUp = (props) => {
  try {
    const C = CountUpModule.CountUp || CountUpModule.default || (typeof CountUpModule === 'function' ? CountUpModule : null);
    if (!C || (typeof C !== 'function' && typeof C !== 'string')) return <span>{props.end}{props.suffix||''}</span>;
    return <C {...props} />;
  } catch { return <span>{props.end}{props.suffix||''}</span>; }
};

/* ───── Error Boundary ───── */
class ErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { hasError: false, error: null, errorInfo: null }; }
  componentDidCatch(e, i) { this.setState({ hasError: true, error: e, errorInfo: i }); console.error("Crash:", e, i); }
  render() {
    if (this.state.hasError) return (
      <div style={{ padding: 40, background: '#fff', color: '#e11d48', minHeight: '100vh', fontFamily: 'monospace', border: '10px solid #e11d48' }}>
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>⚠️ Page Crashed</h1>
        <p style={{ fontSize: 18, fontWeight: 'bold' }}>Error: {this.state.error?.toString()}</p>
        <pre style={{ overflow: 'auto', background: '#f8f8f8', padding: 20 }}>{this.state.errorInfo?.componentStack}</pre>
        <button onClick={() => window.location.reload()} style={{ marginTop: 30, padding: '12px 24px', background: '#1a1c21', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>Refresh</button>
      </div>
    );
    return this.props.children;
  }
}

/* ───── Animations ───── */
const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

/* ═══════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════ */
export const BusinessNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  
  const menuData = {
    'Solutions': {
      width: 'w-[420px]',
      columns: [
        {
          title: 'By business goal',
          links: ['Engage with feedback', 'Accelerate conversions', 'Improve with insights', 'Drive revenue growth']
        },
        {
          title: 'By business size',
          links: ['Small and scaling businesses', 'Enterprises']
        }
      ]
    },
    'Features': {
      width: 'w-[480px]',
      columns: [
        {
          title: 'Invite reviews',
          links: ['Service reviews', 'Product reviews', 'Location reviews', 'Review invitations'],
          marginTop: 'mt-8',
          secondTitle: 'Accelerate conversions',
          secondLinks: ['Review SEO & AI Discovery', 'Trustpilot widgets', 'Social media tools', 'Marketing assets']
        },
        {
          title: 'Engage with feedback',
          links: ['Profile page', 'Respond to reviews'],
          marginTop: 'mt-8',
          secondTitle: 'Improve with insights',
          secondLinks: ['Review spotlight', 'Market insights', 'Review insights', 'Data and analytics', 'Review tagging', 'Visitor insights']
        }
      ]
    },
    'Resources': {
      width: 'w-[260px]',
      columns: [
        {
          links: ['Blog', 'Customer stories', 'Guides and reports', 'Webinars and videos', 'Help Center', 'Partners: referral program', 'Integrations']
        }
      ]
    },
    'Company': {
      width: 'w-[280px]',
      columns: [
        {
          links: ['About Trustpilot', 'Trustpilot for Consumers', 'Trustpilot Data Solutions']
        }
      ]
    }
  };

  const navItems = ['Solutions', 'Features', 'Pricing', 'Resources', 'Company', 'Categories', 'Blog'];

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${scrolled?'bg-black/95 backdrop-blur-md py-3 shadow-lg':'bg-black py-4'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Star className="w-7 h-7 text-[#00b67a] fill-current group-hover:rotate-12 transition-transform" />
          <div className="flex flex-col"><span className="text-xl font-bold tracking-tight leading-none text-white">TruthBoard</span><span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-0.5">For Business</span></div>
        </Link>
        <div className="hidden lg:flex items-center gap-8 h-full">
          {navItems.map(item => {
            const hasDropdown = !!menuData[item];
            return (
              <div 
                key={item} 
                className="relative h-full py-6"
                onMouseEnter={() => hasDropdown && setHoveredMenu(item)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer text-white/90 hover:text-white transition-colors font-semibold text-[14px]">
                  {item}
                  {hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${hoveredMenu === item ? 'rotate-180' : ''}`}/>
                  )}
                </div>

                {/* Dropdown Menu */}
                {hasDropdown && hoveredMenu === item && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[150]">
                    {/* Up Arrow indicator */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100/50 rounded-tl-[2px]" />
                    
                    <div className={`bg-white rounded-[16px] shadow-[0_12px_44px_rgb(0,0,0,0.15)] p-8 ${menuData[item].width} flex gap-8 relative overflow-hidden border border-gray-100`}>
                      {menuData[item].columns.map((col, idx) => (
                        <div key={idx} className="flex-1">
                          {col.title && <h4 className="font-bold text-[14px] text-gray-900 mb-4 pb-3 border-b border-gray-100">{col.title}</h4>}
                          <ul className="space-y-3.5">
                            {col.links.map(link => (
                              <li key={link} className="text-[14px] text-gray-600 hover:text-gray-900 hover:underline cursor-pointer cursor-pointer font-medium">
                                {link}
                              </li>
                            ))}
                          </ul>
                          
                          {col.secondTitle && (
                            <div className={col.marginTop}>
                              <h4 className="font-bold text-[14px] text-gray-900 mb-4 pb-3 border-b border-gray-100">{col.secondTitle}</h4>
                              <ul className="space-y-3.5">
                                {col.secondLinks.map(link => (
                                  <li key={link} className="text-[14px] text-gray-600 hover:text-gray-900 hover:underline cursor-pointer cursor-pointer font-medium">
                                    {link}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/login" className="text-white hover:text-[#00b67a] transition-colors font-bold text-[14px]">Log in</Link>
          <Link to="/business/signup" className="bg-transparent text-white px-6 py-2.5 rounded-full font-bold text-[14px] border border-white/80 hover:bg-white hover:text-black transition-all">Create free account</Link>
        </div>
        <button onClick={()=>setOpen(!open)} className="lg:hidden p-2 text-white">{open?<X/>:<Menu/>}</button>
      </div>
      <AnimatePresence>{open&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="lg:hidden absolute top-full left-0 w-full bg-black border-t border-white/10 overflow-hidden"><div className="p-6 space-y-4">{items.map(i=><div key={i.n} className="text-base font-bold text-white py-2 border-b border-white/5 flex justify-between">{i.n}{i.d&&<ChevronRight className="w-4 h-4 text-white/40"/>}</div>)}<div className="pt-6 space-y-3"><Link to="/login" className="block text-center text-white py-2.5 font-bold border border-white/20 rounded-full">Log in</Link><Link to="/business/signup" className="block text-center bg-[#00b67a] text-white py-3 rounded-full font-bold">Create free account</Link></div></div></motion.div>}</AnimatePresence>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════
   HERO IMAGE STACK – rich collage with real photos
   ═══════════════════════════════════════════════════════ */
const HeroImageStack = () => (
  <div className="relative w-full h-[520px] max-w-[600px] ml-auto">
    {/* Photo 1: Office meeting – top-left */}
    <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} 
      className="absolute top-0 left-0 w-[240px] h-[160px] rounded-2xl overflow-hidden shadow-2xl z-20">
      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Office" />
    </motion.div>

    {/* Star badge overlay */}
    <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:0.3}} 
      className="absolute top-0 left-[220px] w-[140px] h-[110px] rounded-2xl bg-[#00b67a] flex items-center justify-center shadow-xl z-30 border-4 border-white/10 overflow-hidden">
      <Star className="w-16 h-16 text-white/20 fill-current" />
      <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40" alt="" />
    </motion.div>

    {/* Photo 2: Woman face – right */}
    <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.4}} 
      className="absolute top-4 left-[340px] w-[110px] h-[130px] rounded-2xl overflow-hidden shadow-xl z-20">
      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="" />
    </motion.div>

    {/* Snippet cards – tight row */}
    <div className="absolute top-[170px] left-0 w-full flex gap-3 z-40">
      {/* Google search card */}
      <motion.div animate={{y:[-2,2,-2]}} transition={{duration:5,repeat:Infinity}} 
        className="bg-white px-4 py-3 rounded-xl shadow-lg w-[130px] border border-gray-100">
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          <span className="text-[9px] font-bold text-gray-500 uppercase">Google search</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1.5"></div><div className="h-1.5 w-2/3 bg-gray-100 rounded-full"></div>
      </motion.div>

      {/* Apple card */}
      <motion.div animate={{y:[-4,4,-4]}} transition={{duration:6,repeat:Infinity}} 
        className="bg-white px-4 py-3 rounded-xl shadow-lg w-[125px] border border-gray-100">
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          <span className="text-[9px] font-bold text-gray-500 uppercase">Apple</span>
        </div>
        <div className="flex gap-0.5 mb-1.5">{[1,2,3,4,5].map(i=><div key={i} className="w-3.5 h-3.5 bg-[#00b67a] rounded-[2px]"/>)}</div>
        <p className="text-[10px] font-black text-gray-800 tracking-tight leading-none">Excellent 4.8</p>
      </motion.div>

      {/* Micro card */}
      <motion.div animate={{y:[2,-2,2]}} transition={{duration:5, repeat:Infinity}} 
        className="bg-white px-4 py-3 rounded-xl shadow-lg w-[120px] border border-gray-100">
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#00A4EF"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg>
          <span className="text-[9px] font-bold text-gray-500 uppercase">Microsoft</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1.5"></div><div className="h-1.5 w-1/2 bg-gray-100 rounded-full"></div>
      </motion.div>
    </div>

    {/* Photo 3: Businessman – bottom-left */}
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.5}} 
      className="absolute top-[280px] left-0 w-[200px] h-[220px] rounded-2xl overflow-hidden shadow-2xl z-20">
      <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Businessman" />
    </motion.div>

    {/* Analytics Dashboard – overlapped bottom-right */}
    <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.7}} 
      className="absolute top-[300px] left-[220px] w-[300px] bg-white rounded-2xl shadow-2xl z-50 p-6 border border-gray-100">
      <div className="flex items-end gap-2 h-20 mb-5">
        {[30,55,40,70,45,60,85,50,65].map((h,i)=><div key={i} className="flex-1 rounded-t-sm" style={{height:`${h}%`, background: i===6?'#00b67a':'#f3f4f6'}}/>)}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          <svg viewBox="0 0 40 40" className="w-full h-full"><circle cx="20" cy="20" r="18" fill="none" stroke="#f3f4f6" strokeWidth="4"/><circle cx="20" cy="20" r="18" fill="none" stroke="#00b67a" strokeWidth="4" strokeDasharray="75 38" strokeLinecap="round" transform="rotate(-90 20 20)"/></svg>
          <Star className="absolute inset-0 m-auto w-4 h-4 text-[#00b67a] fill-current"/>
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-2 w-3/4 bg-gray-100 rounded-full"/>
          <div className="h-2 w-1/2 bg-gray-50 rounded-full"/>
        </div>
      </div>
    </motion.div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative pt-24 lg:pt-40 pb-16 lg:pb-28 bg-[#00b67a] overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl text-[#1a1c21]">
        <motion.h1 variants={fadeInUp} className="text-[30px] md:text-[44px] font-black leading-[1.1] mb-6 tracking-tight">The world's largest independent customer feedback platform</motion.h1>
        <motion.p variants={fadeInUp} className="text-[15px] md:text-[17px] text-[#1a1c21]/80 font-medium mb-8 leading-relaxed max-w-lg">Attract and keep customers with TruthBoard's review platform and powerful analytics tools.</motion.p>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-12">
          <Link to="/request-demo" className="bg-[#1a1c21] text-white px-7 py-3.5 rounded-full font-black text-[15px] hover:bg-black transition-all shadow-lg text-center flex items-center justify-center">Book a demo</Link>
          <Link to="/business/signup" className="bg-[#4162ff] text-white px-7 py-3.5 rounded-full font-black text-[15px] hover:bg-[#3453e0] transition-all shadow-lg text-center flex items-center justify-center">Start for free</Link>
        </motion.div>
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className="hidden lg:block h-[520px]"><HeroImageStack/></motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   SEARCH + STATS
   ═══════════════════════════════════════════════════════ */
const TrustSearch = () => (
  <section className="py-20 bg-white text-center">
    <div className="max-w-xl mx-auto px-6">
      <h2 className="text-[22px] font-bold text-gray-800 mb-8">See what customers are saying about your business:</h2>
      <div className="bg-white rounded-full shadow-xl p-1.5 flex border border-gray-100 mb-5 max-w-lg mx-auto">
        <input type="text" placeholder="Website URL" className="flex-1 px-6 py-3 outline-none font-medium text-[15px] placeholder-gray-300"/>
        <button className="bg-[#1a1c21] text-white px-8 py-3 rounded-full font-black text-[15px] hover:bg-black">Check</button>
      </div>
      <p className="text-gray-400 text-[13px] font-bold">* ex. www.truthboard.com</p>
    </div>
  </section>
);

const WhyConsumers = () => (
  <section className="py-20 bg-white text-center border-b border-gray-50">
    <h2 className="text-[30px] font-black text-gray-800 mb-16 px-6">Why consumers rely on TruthBoard</h2>
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      {[{v:350,s:'m',l:'reviews on TruthBoard.com'},{v:1.3,s:' million',l:'businesses globally with TruthBoard reviews',d:1},{v:190,s:',000+',l:'new reviews every day'}].map((s,i)=>(
        <div key={i} className="group"><div className="text-[42px] font-black text-[#1a1c21] mb-1 leading-none group-hover:text-[#00b67a] transition-colors">{i===0&&'+'}<SafeCountUp end={s.v} decimals={s.d||0}/>{s.s}</div><p className="text-[14px] font-bold text-gray-500">{s.l}</p></div>
      ))}
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   GOLD RELEASE FEATURES – colored circle icons
   ═══════════════════════════════════════════════════════ */
const FeatureGrid = () => {
  const features = [
    { 
      title: 'Enhanced insights', 
      desc: 'Explore all your data in simple charts or export data to view your own way.', 
      bg: 'bg-[#fee2e2]', 
      iconColor: 'text-[#e74c3c]', 
      icon: BarChart2,
      link: '/features/dashboard-analytics'
    },
    { 
      title: 'Customizable assets', 
      desc: 'Create social proof ads in minutes and boost widget performance with testimonials.', 
      bg: 'bg-[#fef3c7]', 
      iconColor: 'text-[#f39c12]', 
      icon: Palette 
    },
    { 
      title: 'Brand-boosting customization', 
      desc: 'Make invitations and reminders your own, and adjust widgets to fit your website.', 
      bg: 'bg-[#ffedd5]', 
      iconColor: 'text-[#e67e22]', 
      icon: CheckCircle2 
    },
    { 
      title: 'Review follow-up questions', 
      desc: 'Get more from your reviewers.', 
      bg: 'bg-[#f3f4f6]', 
      iconColor: 'text-[#636e72]', 
      icon: MessageCircleQuestion 
    },
    { 
      title: 'Review highlights', 
      desc: 'Maximum flexibility to showcase your strengths with help from AI.', 
      bg: 'bg-[#d1fae5]', 
      iconColor: 'text-[#00b67a]', 
      icon: Star 
    },
    { 
      title: 'Visitor insights', 
      desc: 'Reveal where your profile visitors are located, which reviews interest them most, and who else they shop with.', 
      bg: 'bg-[#dcfce7]', 
      iconColor: 'text-[#059669]', 
      icon: Users 
    }
  ];

  return (
    <section className="py-24 bg-[#fbfbfb]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[32px] font-black text-center text-gray-900 mb-16">New Gold Release Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const CardContent = (
              <>
                <div className={`w-14 h-14 shrink-0 rounded-lg ${f.bg} flex items-center justify-center`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-2 group-hover:text-[#00b67a] transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-[14px] leading-relaxed font-medium">{f.desc}</p>
                </div>
              </>
            );

            if (f.link) {
              return (
                <Link 
                  key={i} 
                  to={f.link}
                  className="bg-white p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100 flex gap-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }} 
                className="bg-white p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100 flex gap-6 hover:shadow-xl transition-all duration-300"
              >
                {CardContent}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   SCROLLING LOGOS – styled text logos like Trustpilot
   ═══════════════════════════════════════════════════════ */
const ScrollingLogos = () => {
  const logos = [
    { name:'canvasfactory', font:'italic', weight:400, size:18 },
    { name:'affirm', font:'normal', weight:800, size:22 },
    { name:'TRAVELZOO', font:'normal', weight:900, size:18, letterSpacing:2 },
    { name:'cheapOair', font:'normal', weight:700, size:20 },
    { name:'Care.com', font:'normal', weight:600, size:20 },
    { name:'Discount', font:'normal', weight:800, size:18, color:'#e74c3c' },
    { name:'GRUBHUB', font:'normal', weight:900, size:17, letterSpacing:1 },
    { name:'Panda', font:'normal', weight:700, size:20 }
  ];
  return (
    <div className="py-14 bg-white overflow-hidden border-b border-gray-100">
      <div className="flex gap-16 animate-marquee items-center whitespace-nowrap">
        {[...logos,...logos,...logos,...logos].map((l,i) => (
          <span key={i} className="shrink-0 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer select-none" style={{ fontStyle:l.font, fontWeight:l.weight, fontSize:l.size, letterSpacing:l.letterSpacing||0, color:l.color||undefined }}>{l.name}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-marquee { animation:marquee 20s linear infinite; }
        .animate-marquee:hover { animation-play-state:paused; }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   GO FURTHER – rich star illustration with chat bubbles
   ═══════════════════════════════════════════════════════ */
const GoFurther = () => (
  <section className="py-20 bg-white overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      {/* LEFT: Rich illustration */}
      <div className="lg:w-1/2 flex items-center justify-center">
        <div className="relative w-[380px] h-[380px]">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[16px] border-[#00b67a]/10"/>
          {/* Inner green circle + star */}
          <motion.div animate={{scale:[1,1.04,1]}} transition={{duration:5,repeat:Infinity}} className="absolute inset-[60px] bg-[#00b67a] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,182,122,0.3)]">
            <Star className="w-28 h-28 text-white fill-current"/>
          </motion.div>
          {/* Floating chat bubble – top-right */}
          <motion.div animate={{y:[-4,4,-4]}} transition={{duration:4,repeat:Infinity}} className="absolute -top-2 right-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 z-10">
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-[#00b67a] rounded flex items-center justify-center"><Star className="w-3 h-3 text-white fill-current"/></div><div className="flex gap-0.5">{[1,2,3,4,5].map(j=><div key={j} className="w-2 h-2 bg-[#00b67a] rounded-[1px]"/>)}</div></div>
          </motion.div>
          {/* Floating review card – left */}
          <motion.div animate={{y:[4,-4,4]}} transition={{duration:5,repeat:Infinity}} className="absolute left-[-30px] top-[40%] bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100 z-10 w-[110px]">
            <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(j=><div key={j} className="w-2 h-2 bg-[#00b67a] rounded-[1px]"/>)}</div>
            <div className="h-[3px] w-full bg-gray-100 rounded mb-1"/><div className="h-[3px] w-2/3 bg-gray-100 rounded"/>
          </motion.div>
          {/* Floating people icon – bottom-right */}
          <motion.div animate={{y:[-3,3,-3]}} transition={{duration:3.5,repeat:Infinity}} className="absolute bottom-2 right-0 bg-white p-2.5 rounded-xl shadow-lg border border-gray-100 z-10">
            <Users className="w-5 h-5 text-[#00b67a]"/>
          </motion.div>
          {/* Floating bar chart – top-left */}
          <motion.div animate={{y:[3,-3,3]}} transition={{duration:4.5,repeat:Infinity}} className="absolute top-4 left-0 bg-[#1a1c21] px-3 py-2 rounded-lg shadow-lg z-10">
            <div className="flex items-end gap-1 h-5">{[60,100,40,80].map((h,j)=><div key={j} className="w-2 rounded-t-sm bg-[#00b67a]" style={{height:`${h}%`}}/>)}</div>
          </motion.div>
          {/* Dots – bottom-left */}
          <div className="absolute bottom-8 left-10 flex gap-1.5">{[1,2,3].map(j=><div key={j} className="w-2.5 h-2.5 rounded-full bg-[#00b67a]"/>)}</div>
        </div>
      </div>
      {/* RIGHT: Text */}
      <div className="lg:w-1/2">
        <h2 className="text-[30px] md:text-[36px] font-black text-gray-800 mb-8 leading-tight">Go further with TruthBoard solutions</h2>
        <ul className="space-y-4 mb-10">
          {["Invite all of your customers to review your business.","Let them know you're listening by engaging with feedback.","Use customer testimonials as social proof to help accelerate conversions at every stage of the purchasing journey.","Inform your strategy with insights and data to navigate to success."].map((b,i)=>(
            <li key={i} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#1a1c21] mt-2.5 shrink-0"/><p className="text-[15px] text-gray-600 leading-relaxed">{b}</p></li>
          ))}
        </ul>
        <p className="font-black text-gray-800 text-[15px] mb-5">Want to learn more?</p>
        <Link to="/request-demo" className="bg-[#4162ff] inline-block text-white px-8 py-4 rounded-full font-black text-[15px] hover:bg-[#3453e0] transition-all shadow-xl text-center">Book a demo</Link>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   DATA SOLUTIONS – bar chart + line chart + review popup
   ═══════════════════════════════════════════════════════ */
const DataSolutions = () => (
  <section className="bg-gray-50 py-20 overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2">
        <h2 className="text-[30px] md:text-[36px] font-black text-gray-800 mb-6 leading-tight">TruthBoard Data Solutions</h2>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-10 max-w-lg">Embed rich consumer sentiment and trust signals into every strategic business decision, with data solutions, an intelligence layer that embeds trust everywhere to provide a deeper layer of insight beyond surface-level metrics.</p>
        <button className="bg-[#1a1c21] text-white px-9 py-4 rounded-full font-black text-[15px] hover:bg-black transition-all shadow-lg">Learn more</button>
      </div>
      <div className="lg:w-1/2 relative">
        {/* Big green circle bg */}
        <div className="absolute -top-10 -right-10 w-[350px] h-[350px] bg-[#00b67a]/10 rounded-full blur-[60px]"/>
        <div className="relative z-10">
          {/* Horizontal bar chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-gray-100">
            {['service','staff','customer_period','product','experience','quality'].map((label,i)=>(
              <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                <span className="w-28 text-[11px] font-bold text-gray-400 text-right">{label}</span>
                <div className="flex-1 h-4 bg-gray-50 rounded-sm overflow-hidden"><div className="h-full rounded-sm" style={{width:`${[65,80,45,55,70,50][i]}%`, background: i===1?'#00b67a':i===3?'#ff6b6b':i===4?'#4162ff':'#00b67a'}}/></div>
              </div>
            ))}
          </div>
          {/* Line chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative">
            <div className="flex items-center justify-between mb-2 text-[11px] font-bold text-gray-400"><span>30</span><span>20</span><span>10</span></div>
            <svg viewBox="0 0 300 80" className="w-full h-20">
              <line x1="0" y1="78" x2="300" y2="78" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="0" y1="40" x2="300" y2="40" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4"/>
              <polyline points="0,60 50,30 100,50 150,20 200,40 250,15 300,35" fill="none" stroke="#00b67a" strokeWidth="2.5" strokeLinejoin="round"/>
              <polyline points="0,65 50,55 100,60 150,45 200,55 250,50 300,55" fill="none" stroke="#e74c3c" strokeWidth="2" strokeDasharray="6 3"/>
              {[0,50,100,150,200,250,300].map((x,i)=><circle key={i} cx={x} cy={[60,30,50,20,40,15,35][i]} r="3" fill="#00b67a"/>)}
            </svg>
            <div className="flex justify-between text-[11px] font-bold text-gray-400 mt-1"><span>A</span><span>B</span><span>C</span></div>
            {/* Floating review popup */}
            <motion.div animate={{y:[-3,3,-3]}} transition={{duration:4,repeat:Infinity}} className="absolute -right-4 top-0 bg-white px-3 py-2 rounded-xl shadow-xl border border-gray-100 w-[140px]">
              <div className="flex items-center gap-2 mb-1.5"><div className="w-5 h-5 rounded-full bg-gray-800"/><div><p className="text-[9px] font-bold text-gray-800">Nicola Renato</p><p className="text-[8px] text-gray-400">12 reviews</p></div></div>
              <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(j=><div key={j} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px]"/>)}</div>
              <p className="text-[8px] text-gray-500 leading-tight">Great service with amazing support...</p>
            </motion.div>
          </div>
          {/* Excellent badge */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-[14px] font-black text-gray-800">Excellent</span>
            <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><div key={i} className="w-6 h-6 bg-[#00b67a] rounded-[2px] flex items-center justify-center"><Star className="w-4 h-4 text-white fill-current"/></div>)}</div>
            <Star className="w-4 h-4 text-[#00b67a] fill-current ml-1"/>
            <span className="text-[13px] font-bold text-gray-800">TruthBoard</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   INTEGRATION PARTNER CARDS
   ═══════════════════════════════════════════════════════ */
const IntegrationPartners = () => (
  <section className="py-20 bg-[#fbfbfb]">
    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all">
        <div><h3 className="text-[24px] font-black text-gray-800 mb-4">Salesforce integration</h3><p className="text-[14px] text-gray-500 mb-8 leading-relaxed">Seamlessly integrate Salesforce with TruthBoard and turn your CRM into a reliable hub for trusted review data.</p></div>
        <button className="bg-[#1a1c21] text-white px-7 py-3.5 rounded-full font-black text-[14px] w-fit hover:bg-black transition-all">Find out more</button>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all">
        <div><h3 className="text-[24px] font-black text-gray-800 mb-4">TruthBoard is a founding member of the Coalition for Trusted reviews</h3><p className="text-[14px] text-gray-500 mb-8 leading-relaxed">TruthBoard, Amazon, Booking.com, Expedia Group, Glassdoor and Tripadvisor have formed the Coalition for Trusted Reviews. A shared commitment to protecting the integrity of online consumer reviews worldwide.</p></div>
        <button className="bg-[#1a1c21] text-white px-7 py-3.5 rounded-full font-black text-[14px] w-fit hover:bg-black transition-all">View all referral partners</button>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all">
        <div><h3 className="text-[24px] font-black text-gray-800 mb-4">Find the right Pricing plan for your business</h3><p className="text-[14px] text-gray-500 mb-8 leading-relaxed">Whether you're a new business or a household name, we have a range of plans to help you reach more customers than ever before.</p></div>
        <button className="bg-[#1a1c21] text-white px-7 py-3.5 rounded-full font-black text-[14px] w-fit hover:bg-black transition-all">View our pricing plans</button>
      </div>
      <div className="bg-[#00b67a] p-10 rounded-3xl flex flex-col justify-between hover:shadow-2xl transition-all text-white">
        <div><h3 className="text-[24px] font-black mb-4">TruthBoard's Marketing widgets</h3><p className="text-[14px] text-white/90 mb-8 leading-relaxed">73.6% of TruthBoard visitors say they are more likely to make a purchase from a website that's displaying TruthBoard reviews on-site.</p></div>
        <button className="bg-[#1a1c21] text-white px-7 py-3.5 rounded-full font-black text-[14px] w-fit hover:bg-black transition-all">Learn more</button>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   TOOLS INTEGRATION – styled text logos
   ═══════════════════════════════════════════════════════ */
const ToolsIntegration = () => {
  const tools = [
    { name:'salesforce', style:'text-[#00A1E0] text-2xl font-bold italic' },
    { name:'HubSpot', style:'text-[#FF7A59] text-3xl font-black' },
    { name:'Hootsuite', style:'text-[#143059] text-2xl font-bold' },
    { name:'zendesk', style:'text-[#03363D] text-2xl font-black' },
    { name:'WOOCOMMERCE', style:'text-[#96588A] text-xl font-black tracking-wide' },
    { name:'shopify', style:'text-[#96bf48] text-2xl font-black' }
  ];
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-[28px] font-black text-[#00b67a] mb-20">We easily integrate with your existing tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-20 items-center">
          {tools.map((t,i)=><div key={i} className="flex justify-center cursor-pointer hover:scale-110 transition-transform"><span className={t.style}>{t.name}</span></div>)}
        </div>
        <button className="text-gray-800 px-10 py-3.5 rounded-full font-bold text-[14px] border-2 border-gray-200 hover:border-gray-800 transition-all">See all integrations</button>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   GET INSPIRED – article cards with illustrations
   ═══════════════════════════════════════════════════════ */
const GetInspired = () => {
  const articles = [
    { title:"How to know if your website is credible: The ultimate checklist", color:"bg-[#00b67a]", graphic:(
      <div className="flex items-center justify-center h-full"><div className="w-24 h-24 rounded-full bg-[#1a1c21] relative overflow-hidden shadow-lg"><div className="absolute top-0 right-0 w-1/2 h-full bg-white"/></div></div>
    )},
    { title:"4 Consumer insights about online reviews that are standing the test of time", color:"bg-[#d4edfc]", graphic:(
      <div className="flex items-center justify-center h-full"><div className="w-20 h-28 bg-[#a8d8f0] rounded-xl shadow-lg relative"><div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#4162ff] rounded-lg flex items-center justify-center shadow-md"><Star className="w-5 h-5 text-white fill-current"/></div><div className="absolute bottom-4 left-3 right-3 space-y-1.5"><div className="h-1 bg-white/60 rounded"/><div className="h-1 bg-white/40 rounded w-2/3"/></div></div></div>
    )},
    { title:"What are consumer insights and how do I use them? An introduction", color:"bg-[#6b0a23]", graphic:(
      <div className="flex items-center justify-center h-full gap-5"><motion.div animate={{y:[0,-8,0]}} transition={{duration:3,repeat:Infinity}} className="w-16 h-16 rounded-full bg-[#e84c88] shadow-lg"/><motion.div animate={{y:[0,8,0]}} transition={{duration:3,repeat:Infinity,delay:0.5}} className="w-12 h-12 rounded-full bg-[#ff8fa3] shadow-lg"/></div>
    )}
  ];
  return (
    <section className="py-24 bg-[#fbfbfb]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-[28px] font-black text-center text-gray-800 mb-16">Get inspired</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((a,i)=>(
            <motion.div key={i} whileHover={{y:-6}} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all">
              <div className={`h-48 ${a.color} p-8`}>{a.graphic}</div>
              <div className="p-7 flex-1 flex flex-col justify-between">
                <h3 className="text-[15px] font-black text-gray-800 mb-5 leading-relaxed">{a.title}</h3>
                <Link to="#" className="text-[#4162ff] font-bold text-[14px] flex items-center gap-1.5 group">Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/></Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   FINAL CTA + FOOTER
   ═══════════════════════════════════════════════════════ */
const FinalCTA = () => (
  <section className="py-24 bg-[#00b67a] text-center text-white relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <h2 className="text-[28px] md:text-[36px] font-black mb-10 leading-tight">Ready to unlock the full potential of reviews?</h2>
      <div className="flex flex-col items-center gap-5">
        <Link to="/request-demo" className="bg-[#4162ff] text-white px-12 py-4.5 rounded-full font-black text-[16px] hover:bg-[#3453e0] transition-all shadow-2xl inline-block">Book a demo</Link>
        <Link to="#" className="text-white font-black underline underline-offset-8 hover:text-[#1a1c21] transition-colors text-[15px]">View our pricing plans</Link>
      </div>
    </div>
  </section>
);

export const DetailedFooter = () => (
  <footer className="bg-[#1a1c21] text-white pt-20 pb-10">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="flex items-center gap-2 mb-14"><Star className="w-6 h-6 text-[#00b67a] fill-current"/><span className="text-xl font-bold">TruthBoard</span></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
        <div><h4 className="font-black mb-6 text-[13px]">About us</h4><ul className="space-y-3 text-[13px] text-gray-500"><li>How TruthBoard works</li><li>Our story</li><li>What we believe</li><li>Jobs <span className="bg-[#00b67a] text-black px-1.5 py-0.5 rounded text-[9px] ml-1 font-black">Hiring!</span></li><li>Blog</li><li>Press</li></ul></div>
        <div><h4 className="font-black mb-6 text-[13px]">Review community</h4><ul className="space-y-3 text-[13px] text-gray-500"><li>Join the community</li><li>Leave a review</li><li>Search for a company</li></ul></div>
        <div><h4 className="font-black mb-6 text-[13px]">Businesses</h4><ul className="space-y-3 text-[13px] text-gray-500"><li>Features</li><li>Pricing</li><li>Partners</li><li>Agency Partners</li><li>Find us on Capterra</li><li>Find us on G2</li><li>Data Solutions</li></ul></div>
        <div><h4 className="font-black mb-6 text-[13px]">Resources</h4><ul className="space-y-3 text-[13px] text-gray-500"><li>Business Blog</li><li>Webinars and Videos</li><li>Guides and Reports</li><li>Customer Stories</li><li>Developers</li><li>Tech Blog</li><li>System Status</li></ul></div>
        <div><h4 className="font-black mb-6 text-[13px]">Contact</h4><ul className="space-y-3 text-[13px] text-gray-500"><li>Contact Sales</li><li>Help Center</li><li>Our Offices</li></ul></div>
      </div>
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
        <div className="flex items-center gap-2 text-[14px] font-bold text-gray-400"><span>Country</span><div className="flex items-center gap-2 bg-[#2a2d34] px-3 py-1.5 rounded border border-white/5 ml-2"><span className="text-[13px] text-gray-300">🇺🇸 United States</span><ChevronDown className="w-3.5 h-3.5 text-gray-500"/></div></div>
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400"><span>Follow us on</span><div className="flex gap-4 ml-2">{[Linkedin,Twitter,Facebook,Youtube].map((I,i)=><I key={i} className="w-4 h-4 text-gray-500 hover:text-white transition-colors cursor-pointer"/>)}</div></div>
      </div>
      <div className="flex flex-wrap gap-6 text-[12px] text-gray-600 mb-6">{['Terms and Conditions','Privacy Policy','Company Guidelines','Trademark Guidelines','Manage cookies','Modern Slavery Statement'].map((t,i)=><span key={i} className="hover:text-white cursor-pointer transition-colors">{t}</span>)}</div>
      <p className="text-[12px] text-gray-600">Do not sell or share my personal information</p>
      <p className="text-[12px] text-gray-600 mt-4">© 2026 TruthBoard Inc. All rights reserved.</p>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
const ForBusinesses = () => (
  <ErrorBoundary>
    <div className="bg-white min-h-screen font-sans selection:bg-[#00b67a] selection:text-white overflow-x-hidden antialiased scroll-smooth">
      <BusinessNav />
      <Hero />
      <TrustSearch />
      <WhyConsumers />
      <FeatureGrid />
      <ScrollingLogos />
      <GoFurther />
      <DataSolutions />
      <IntegrationPartners />
      <ToolsIntegration />
      <GetInspired />
      <FinalCTA />
      <DetailedFooter />
    </div>
  </ErrorBoundary>
);

export default ForBusinesses;
