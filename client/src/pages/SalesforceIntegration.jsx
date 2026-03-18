import React, { useState, useEffect, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ChevronDown, Play, CheckCircle2, 
  ArrowRight, Linkedin, Twitter, Facebook, Youtube,
  Users, MessageCircleQuestion 
} from 'lucide-react';

/* ───── Error Boundary ───── */
class LocalErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { hasError: false, error: null }; }
  componentDidCatch(e, i) { this.setState({ hasError: true, error: e }); console.error("Salesforce Page Error:", e, i); }
  render() {
    if (this.state.hasError) return (
      <div className="p-20 bg-white min-h-screen text-red-600 font-mono border-8 border-red-100">
        <h1 className="text-3xl font-bold mb-4">Something went wrong on this page</h1>
        <p className="text-lg">Error: {this.state.error?.toString()}</p>
        <button onClick={() => window.location.reload()} className="mt-8 px-6 py-2 bg-black text-white rounded-lg">Refresh Page</button>
      </div>
    );
    return this.props.children;
  }
}

const DetailedFooter = () => (
  <footer className="bg-[#1a1c21] text-white pt-20 pb-10">
    <div className="max-w-[1240px] mx-auto px-6">
      <div className="flex items-center gap-2 mb-14">
        <Star className="w-6 h-6 text-[#00b67a] fill-current" />
        <span className="text-xl font-bold">TruthBoard</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
        <div><h4 className="font-bold mb-6 text-[13px] uppercase tracking-wider">About us</h4><ul className="space-y-3 text-[14px] text-gray-400"><li>How TruthBoard works</li><li>Our story</li><li>What we believe</li><li>Jobs</li><li>Blog</li><li>Press</li></ul></div>
        <div><h4 className="font-bold mb-6 text-[13px] uppercase tracking-wider">Review community</h4><ul className="space-y-3 text-[14px] text-gray-400"><li>Join the community</li><li>Leave a review</li><li>Search for a company</li></ul></div>
        <div><h4 className="font-bold mb-6 text-[13px] uppercase tracking-wider">Businesses</h4><ul className="space-y-3 text-[14px] text-gray-400"><li>Features</li><li>Pricing</li><li>Partners</li><li>Agency Partners</li><li>Data Solutions</li></ul></div>
        <div><h4 className="font-bold mb-6 text-[13px] uppercase tracking-wider">Resources</h4><ul className="space-y-3 text-[14px] text-gray-400"><li>Business Blog</li><li>Webinars and Videos</li><li>Guides and Reports</li><li>Customer Stories</li><li>Developers</li></ul></div>
        <div><h4 className="font-bold mb-6 text-[13px] uppercase tracking-wider">Contact</h4><ul className="space-y-3 text-[14px] text-gray-400"><li>Contact Sales</li><li>Help Center</li><li>Our Offices</li></ul></div>
      </div>
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 mb-10 text-[13px] text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <span>Country</span>
          <div className="flex items-center gap-2 bg-[#2a2d34] px-4 py-2 rounded border border-white/10 ml-2">
            <span className="text-gray-300">🇺🇸 United States</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Follow us on</span>
          <div className="flex gap-5">
            {[Linkedin, Twitter, Facebook, Youtube].map((I, i) => (
              <I key={i} className="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-pointer" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 text-[12px] text-gray-500 mt-10">
        {['Terms and Conditions', 'Privacy Policy', 'Company Guidelines', 'Trademark Guidelines', 'Manage cookies'].map((t, i) => (
          <span key={i} className="hover:text-white cursor-pointer transition-colors">{t}</span>
        ))}
      </div>
      <p className="text-[12px] text-gray-600 mt-6">© 2026 TruthBoard Inc. All rights reserved.</p>
    </div>
  </footer>
);

const SalesforceIntegrationContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const menuData = {
    'Solutions': {
      width: 'w-[420px]',
      columns: [
        { title: 'By business goal', links: ['Engage with feedback', 'Accelerate conversions', 'Improve with insights', 'Drive revenue growth'] },
        { title: 'By business size', links: ['Small and scaling businesses', 'Enterprises'] }
      ]
    },
    'Features': {
      width: 'w-[480px]',
      columns: [
        { title: 'Invite reviews', links: ['Service reviews', 'Product reviews', 'Location reviews', 'Review invitations'] },
        { title: 'Engage with feedback', links: ['Profile page', 'Respond to reviews'] }
      ]
    },
    'Resources': {
      width: 'w-[260px]',
      columns: [{ links: ['Blog', 'Customer stories', 'Guides and reports', 'Webinars and videos', 'Help Center', 'Partners', 'Integrations'] }]
    },
    'Company': {
      width: 'w-[280px]',
      columns: [{ links: ['About Truthboard', 'Truthboard for Consumers', 'Truthboard Data Solutions'] }]
    }
  };

  const handleLinkClick = (linkName) => {
    const routeMap = {
      'About Truthboard': '/about', 'Truthboard for Consumers': '/', 'Truthboard for Business': '/business',
      'Truthboard Data Solutions': '/datasolutions', 'Pricing': '/pricing', 'Blog': '/blog',
      'Engage with feedback': '/features/review-insights', 'Accelerate conversions': '/features/social-media-tools',
      'Improve with insights': '/features/dashboard-analytics', 'Service reviews': '/features/review-insights'
    };
    if (routeMap[linkName]) navigate(routeMap[linkName]);
    setHoveredMenu(null); setOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1c21]">
      {/* ───── NAVIGATION ───── */}
      <nav className={`fixed w-full top-0 z-[100] transition-all duration-500 ${scrolled?'bg-[#1a1c21]/95 backdrop-blur-md py-3 shadow-lg':'bg-[#1a1c21] py-5'} text-white border-b border-white/5`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/business" className="flex items-center gap-2">
              <Star className="w-8 h-8 text-[#00b67a] fill-current" />
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-bold tracking-tight text-white">TruthBoard</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">For Business</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex-1 md:flex items-center justify-center gap-8 text-[14px] font-bold h-full">
            {['Solutions', 'Features', 'Pricing', 'Resources', 'Company'].map(item => {
              const hasDropdown = !!menuData[item];
              return (
                <div 
                  key={item} 
                  className="relative h-full py-4 group"
                  onMouseEnter={() => hasDropdown && setHoveredMenu(item)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <div className={`flex items-center gap-1 cursor-pointer transition-colors text-white/90 hover:text-[#00b67a]`} onClick={() => !hasDropdown && handleLinkClick(item)}>
                    {item}
                    {hasDropdown && <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${hoveredMenu === item ? 'rotate-180' : ''}`}/>}
                  </div>

                  {hasDropdown && hoveredMenu === item && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[150]">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100/50 rounded-tl-[2px]" />
                      <div className={`bg-white rounded-[16px] shadow-[0_12px_44px_rgb(0,0,0,0.15)] p-8 ${menuData[item].width} flex gap-8 relative overflow-hidden border border-gray-100`}>
                        {menuData[item].columns.map((col, idx) => (
                          <div key={idx} className="flex-1">
                            {col.title && <h4 className="font-bold text-[14px] text-gray-900 mb-4 pb-3 border-b border-gray-100">{col.title}</h4>}
                            <ul className="space-y-3.5">
                              {col.links.map(link => (
                                <li key={link} onClick={() => handleLinkClick(link)} className="text-[14px] text-gray-600 hover:text-[#00b67a] cursor-pointer font-medium transition-colors">
                                  {link}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6 min-w-fit">
            <Link to="/login" className="text-[14px] font-bold hover:text-[#00b67a] transition-colors">Log in</Link>
            <Link to="/business/signup" className="hidden lg:block bg-transparent border-2 border-white text-white px-6 py-2.5 rounded-full font-bold text-[14px] hover:bg-white hover:text-black transition-all">Create free account</Link>
          </div>
        </div>
      </nav>

      {/* ───── HERO SECTION ───── */}
      <section className="bg-[#00d67d] pt-40 pb-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[48px] md:text-[60px] font-bold leading-[1.05] mb-8 tracking-tight"
            >
              Accelerate growth with TruthBoard’s integration for Salesforce
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[20px] font-medium leading-[1.4] mb-12 max-w-[500px]"
            >
              Turn your CRM into a reliable hub for trusted review data, allowing you to connect with more customers, fuel performance, and inform business decisions.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="bg-[#00204a] p-3 px-5 rounded-lg flex items-center gap-3 w-fit"
            >
              <div className="bg-white p-1.5 rounded">
                <svg className="w-8 h-8" viewBox="0 0 24 24"><path d="M13.35 2.01c-.13-.01-.26 0-.39.01a7.51 7.51 0 0 0-5.83 2.91 1 1 0 0 0 .15 1.39 1 1 0 0 0 1.39-.15 5.51 5.51 0 0 1 4.28-2.15c.1 0 .2-.01.3-.01 3.04 0 5.51 2.47 5.51 5.51 0 .1-.01.2-.01.3a5.51 5.51 0 0 1-2.15 4.28 1 1 0 0 0-.15 1.39 1 1 0 0 0 1.39.15 7.51 7.51 0 0 0 2.91-5.83c.01-.13.01-.26.01-.39 0-4.14-3.37-7.51-7.51-7.51z" fill="#00A1E0"/><path d="M10.65 21.99c.13.01.26 0 .39-.01a7.51 7.51 0 0 0 5.83-2.91 1 1 0 0 0-.15-1.39 1 1 0 0 0-1.39.15 5.51 5.51 0 0 1-4.28 2.15c-.1 0-.2.01-.3.01-3.04 0-5.51-2.47-5.51-5.51 0-.1.01-.2.01-.3a5.51 5.51 0 0 1 2.15-4.28 1 1 0 0 0 .15-1.39 1 1 0 0 0-1.39-.15 7.51 7.51 0 0 0-2.91 5.83c-.01.13-.01.26-.01.39 0 4.14 3.37 7.51 7.51 7.51z" fill="#00A1E0"/></svg>
              </div>
              <span className="text-white font-bold text-[18px] tracking-widest">PARTNER</span>
            </motion.div>
          </div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 md:w-[600px] w-full"
          >
            <div className="bg-white rounded-[32px] p-10 md:p-14 shadow-2xl">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-gray-800">First name*</label>
                  <input type="text" placeholder="First name" className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-gray-800">Last name*</label>
                  <input type="text" placeholder="Last name" className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-gray-800">Business email*</label>
                  <input type="email" placeholder="Business email" className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-gray-800">Phone number*</label>
                  <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                   <label className="text-[14px] font-bold text-gray-800">Country*</label>
                   <div className="relative">
                     <select className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium appearance-none">
                       <option>Country</option>
                       <option>United States</option>
                       <option>United Kingdom</option>
                     </select>
                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                   </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[14px] font-bold text-gray-800">Company name*</label>
                  <input type="text" placeholder="Company name" className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[14px] font-bold text-gray-800">Annual revenue*</label>
                   <div className="relative">
                     <select className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium appearance-none">
                       <option>Annual revenue</option>
                       <option>$0-$1M</option>
                     </select>
                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-[14px] font-bold text-gray-800">Number of employees*</label>
                   <div className="relative">
                     <select className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium appearance-none">
                       <option>Number of employees</option>
                       <option>1-50</option>
                     </select>
                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                   </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[14px] font-bold text-gray-800">Website URL*</label>
                  <input type="url" placeholder="Website URL" className="w-full px-4 py-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#00b67a] text-[15px] font-medium" />
                </div>
                <div className="md:col-span-2 mt-2">
                  <button className="w-full bg-[#1a1c21] text-white py-4 rounded-full font-bold text-[18px] hover:bg-black transition-all shadow-xl">
                    Request Demo
                  </button>
                  <p className="text-[11px] text-gray-500 mt-6 leading-relaxed">
                    By clicking above you accept our <Link to="#" className="underline text-[#4162ff]">Privacy Policy</Link> and agree to us contacting you via call or email about our products and services. You may unsubscribe at any time by clicking the unsubscribe link in the email or by <Link to="#" className="underline text-[#4162ff]">contacting us</Link>.
                  </p>
                  <p className="text-[11px] text-gray-500 mt-4">
                    This site is protected by reCAPTCHA and the Google <Link to="#" className="underline text-[#4162ff]">Privacy Policy</Link> and <Link to="#" className="underline text-[#4162ff]">Terms of Service</Link> apply.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── VIDEO SECTION ───── */}
      <section className="py-24 text-center">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[36px] font-bold mb-16 tracking-tight">See what TruthBoard for Salesforce can do for you</h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl aspect-video bg-gray-100 flex items-center justify-center border border-gray-50"
          >
             <div className="absolute inset-0 bg-[#f9fafb] flex items-center justify-center opacity-40">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full max-w-2xl px-12">
                     <div className="grid grid-cols-4 gap-8">
                        {[1,2,3,4,5,6,7,8].map(i => (
                          <div key={i} className="aspect-square rounded-full bg-gray-300 border-4 border-white flex items-center justify-center">
                            <Users className="w-8 h-8 text-gray-400 opacity-30" />
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
             </div>
             <div className="absolute top-12 left-12 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00d67d] rounded-lg p-2"><Star className="w-full h-full text-white fill-current" /></div>
                <div className="text-left"><p className="text-[12px] font-bold">Trusted by 200k+ users</p><p className="text-[10px] text-gray-500">Live integration data</p></div>
             </div>
             <button className="relative z-10 w-24 h-24 bg-[#1a1c21] rounded-full flex items-center justify-center group shadow-[0_0_40px_rgba(0,0,0,0.1)]">
               <Play className="w-10 h-10 text-white fill-current ml-1 transition-transform group-hover:scale-110" />
             </button>
          </motion.div>
        </div>
      </section>

      {/* ───── FEATURES SECTION ───── */}
      <section className="pb-32">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-40">
           
           {/* Feature 1 */}
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <h2 className="text-[40px] font-bold leading-tight mb-8 tracking-tight">Automatically collect high volumes of feedback that earns trust</h2>
                <p className="text-[18px] text-gray-600 mb-8 leading-relaxed font-medium">
                  Trigger review collection from order or opportunity status, automatically engaging the right contact at the right time. Monitor reviews and save time by replying directly within Salesforce.
                </p>
                <p className="text-[16px] text-gray-500 italic leading-relaxed">
                  95% of companies that get most of their reviews via the automated invites are rated either ‘excellent’ or ‘great’. (source: TruthBoard Data, March 2022)
                </p>
                <button className="mt-10 bg-[#1a1c21] text-white px-10 py-4 rounded-full font-bold text-[18px] hover:bg-black transition-all">Book a demo</button>
              </div>
              <div className="lg:w-1/2 relative">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00d67d] rounded-full opacity-60 blur-xl" />
                 <div className="relative bg-white rounded-[24px] shadow-2xl border border-gray-100 p-2 overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-50 flex flex-col">
                       <div className="h-10 border-b bg-white flex items-center px-4 gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80"/>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-80"/>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-80"/>
                          <span className="ml-4 text-[11px] font-bold text-gray-400 tracking-wide uppercase">Invitation settings</span>
                       </div>
                       <div className="flex-1 p-8 space-y-6">
                          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="space-y-1">
                              <p className="text-[12px] font-bold">Automated Invites</p>
                              <p className="text-[10px] text-gray-400">Triggered on Order Completed</p>
                            </div>
                            <div className="w-10 h-5 bg-[#00d67d] rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-fullShadow-sm"/></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
                               <MessageCircleQuestion className="w-5 h-5 text-gray-300" />
                               <span className="text-[10px] font-bold text-gray-400">Order Placed</span>
                            </div>
                            <div className="h-24 bg-[#00d67d]/5 rounded-xl border-2 border-[#00d67d] p-4 space-y-2">
                               <CheckCircle2 className="w-5 h-5 text-[#00d67d]" />
                               <span className="text-[10px] font-bold text-[#00d67d]">Order Shipped</span>
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="absolute -bottom-8 -left-8 flex gap-4">
                    <div className="w-6 h-6 bg-[#00d67d] rounded-full" />
                    <div className="w-8 h-8 bg-[#00d67d] rounded-full" />
                 </div>
              </div>
           </div>

           {/* Feature 2 */}
           <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
              <div className="lg:w-1/2">
                <h2 className="text-[40px] font-bold leading-tight mb-8 tracking-tight">Easily track and optimize performance</h2>
                <p className="text-[18px] text-gray-600 mb-8 leading-relaxed font-medium">
                  With all your review data in one place, you can easily incorporate it into reports or analyses in Salesforce — helping uncover critical insights to inform strategy and decisions.
                </p>
              </div>
              <div className="lg:w-1/2 relative text-white">
                 <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#f85c94] rounded-full opacity-20 blur-xl" />
                 <div className="relative bg-white rounded-[24px] shadow-2xl border border-gray-100 p-2 overflow-hidden">
                    <div className="aspect-[4/3] bg-white p-8 space-y-6">
                       <div className="flex justify-between items-center">
                         <div className="space-y-1">
                           <h4 className="text-[14px] font-bold text-gray-800">TruthScore Analytics</h4>
                           <p className="text-[11px] text-gray-400">Daily performance tracking</p>
                         </div>
                         <div className="px-3 py-1 bg-green-50 text-[#00b67a] rounded-lg text-[11px] font-bold border border-green-100">+12.4%</div>
                       </div>
                       <div className="h-[200px] border-b border-l border-gray-100 relative pt-4 pr-4">
                          <div className="absolute left-0 bottom-0 w-full flex items-end justify-between px-2 h-full">
                             {[40,65,45,80,60,95,70].map((h, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ height: 0 }}
                                 whileInView={{ height: `${h}%` }}
                                 transition={{ duration: 1, delay: i * 0.1 }}
                                 className="w-8 bg-[#f85c94] rounded-t-lg opacity-80" 
                               />
                             ))}
                          </div>
                          <div className="absolute top-0 right-0 p-4 space-y-2">
                             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#f85c94]"/><span className="text-[10px] text-gray-400">Volume</span></div>
                             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-200"/><span className="text-[10px] text-gray-400">Goal</span></div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="absolute -bottom-8 -right-8 flex gap-4">
                    <div className="w-12 h-12 bg-[#f85c94] rounded-full opacity-60" />
                    <div className="w-6 h-6 bg-[#f85c94] rounded-full opacity-60" />
                 </div>
              </div>
           </div>

           {/* Feature 3 */}
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <h2 className="text-[40px] font-bold leading-tight mb-8 tracking-tight">Drive revenue with content that converts</h2>
                <p className="text-[18px] text-gray-600 mb-8 leading-relaxed font-medium">
                  Increase campaign effectiveness by pulling user-generated review content into any Salesforce connected marketing tool. Personalize campaigns with audience segments filtered by review tag or star rating.
                </p>
                <p className="text-[16px] text-gray-500 font-medium leading-relaxed italic">
                  For US consumers, an online advertisement with the TruthBoard logo and stars is nearly two-and-a-half times as persuasive as the same ad without them. (source: <Link to="#" className="underline text-[#1a1c21]">London Research, July 2022</Link>)
                </p>
              </div>
              <div className="lg:w-1/2 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffde00] rounded-full opacity-30 blur-3xl" />
                 <div className="relative bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 flex items-center justify-center">
                    <div className="w-[300px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transform rotate-2">
                       <div className="p-4 flex items-center gap-3 border-b border-gray-50">
                          <div className="w-9 h-9 rounded-full bg-[#f8f8f8] p-2 flex items-center justify-center"><Star className="w-full h-full text-[#00b67a] fill-current" /></div>
                          <div>
                            <span className="text-[14px] font-bold block leading-none">myhomes</span>
                            <span className="text-[10px] text-gray-400">Verified Customer</span>
                          </div>
                       </div>
                       <div className="aspect-square bg-gradient-to-br from-indigo-50 to-blue-100 p-8 flex items-center justify-center">
                          <div className="w-full aspect-video bg-white rounded-lg shadow-sm p-4 rotate-3 flex flex-col justify-between">
                            <div className="w-1/2 h-2 bg-gray-100 rounded-full" />
                            <div className="space-y-1">
                               <div className="w-full h-1.5 bg-gray-50 rounded-full" />
                               <div className="w-2/3 h-1.5 bg-gray-50 rounded-full" />
                            </div>
                          </div>
                       </div>
                       <div className="p-5 space-y-4 bg-white">
                          <div className="flex gap-1">
                             {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#00b67a] text-[#00b67a]" />)}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-[#1a1c21]">Excellent TruthScore</p>
                            <p className="text-[11px] text-gray-500 mt-1">Based on 142,000+ real reviews</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="absolute -bottom-10 right-0 w-32 h-32 bg-[#ffde00] rounded-full" />
              </div>
           </div>
        </div>
      </section>

      {/* ───── CTA SECTION ───── */}
      <section className="py-24 bg-[#00d67d] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-bold mb-12 tracking-tight">Speak with one of our team members to learn more</h2>
          <button className="bg-[#1a1c21] text-white px-12 py-5 rounded-full font-bold text-[18px] hover:bg-black transition-all shadow-xl">
            Get started
          </button>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <DetailedFooter />
    </div>
  );
};

const SalesforceIntegration = () => (
  <LocalErrorBoundary>
    <SalesforceIntegrationContent />
  </LocalErrorBoundary>
);

export default SalesforceIntegration;
