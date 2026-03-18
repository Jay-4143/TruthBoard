import React, { useState, useEffect, Component, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ChevronDown, Check, Info, 
  HelpCircle, ChevronRight, Menu, X,
  ExternalLink, Minus, Linkedin, Twitter, 
  Facebook, Youtube, Plus as PlusIcon,
  Search, Users, Zap, Briefcase, Globe,
  ShieldCheck, BarChart2, MessageCircleQuestion,
  CheckCircle2
} from 'lucide-react';

/* ───── Error Boundary ───── */
class LocalErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { hasError: false, error: null }; }
  componentDidCatch(e, i) { this.setState({ hasError: true, error: e }); console.error("Pricing Page Error:", e, i); }
  render() {
    if (this.state.hasError) return (
      <div className="p-20 bg-white min-h-screen text-red-600 font-mono border-8 border-red-100 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-black mb-4">Pricing Page Encountered an Issue</h1>
        <p className="text-xl max-w-2xl mx-auto">Error: {this.state.error?.toString()}</p>
        <button onClick={() => window.location.reload()} className="mt-10 px-8 py-3 bg-black text-white rounded-full font-bold shadow-xl hover:scale-105 transition-transform">Reload Pricing Page</button>
      </div>
    );
    return this.props.children;
  }
}

/* ───── Detailed Footer (Duplicated for Safety) ───── */
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

const PricingContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [sticky, setSticky] = useState(false);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (tableRef.current) {
        const top = tableRef.current.getBoundingClientRect().top;
        setSticky(top <= 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const logos = [
     <div key="1" className="flex items-center gap-1 font-bold text-[#bf0000] text-xl">Rakuten <span className="text-black/80 font-black">kobo</span></div>,
     <div key="2" className="flex items-center gap-1 font-black text-[#0066cc] italic text-2xl">Rainbow</div>,
     <div key="3" className="flex items-center gap-2 font-black text-[#1a1c21] text-2xl">ROCKET <span className="text-gray-400 font-bold italic">Loans</span></div>,
     <div key="4" className="flex items-center gap-1 font-black text-[#00bcd4] text-2xl">SoFi <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-[#00bcd4] rounded-full"/><div className="w-1.5 h-1.5 bg-[#ff008a] rounded-full"/><div className="w-1.5 h-1.5 bg-[#3b008d] rounded-full"/></div></div>,
     <div key="5" className="flex items-center gap-1 font-bold text-[#1a73e8] italic text-xl">Garden Goods</div>,
     <div key="6" className="flex items-center gap-1 font-black text-[#1a1c21] text-2xl uppercase tracking-tighter">KAPLAN</div>,
     <div key="7" className="flex items-center gap-1 font-black text-[#3d2a71] text-2xl tracking-tighter">Experian.</div>
  ];

  const plans = [
    {
      name: 'Plus',
      price: '299',
      desc: 'Build trust in your growing business with verified reviews and marketing tools',
      cta: 'Start 14-day free trial',
      features: [
        'Remove third party ads and competitor mentions to keep eyes on you',
        'Streamline customer engagement with invitation and reply integrations',
        'Drive conversions with marketing assets and website widgets',
        'Inform your review strategy with performance insights'
      ]
    },
    {
      name: 'Premium',
      price: '629',
      desc: 'Drive growth with actionable analytics and showcasing assets proven to convert customers',
      cta: 'Buy Premium',
      features: [
        'Forecast your future TrustScore with a predictive 12-month look ahead',
        'Design high-performing social assets in minutes',
        'Benchmark your business against five others to outpace competitors',
        'Explore all your data in one place to easily surface trends and opportunities',
        'Access TruthBoard\'s APIs via add-ons'
      ]
    },
    {
      name: 'Advanced',
      price: '1,099',
      desc: 'Lead in your market with powerful insights and brand-boosting customization',
      cta: 'Book a demo',
      features: [
        'Customize analytics dashboards, invitations, reminders and more',
        'Tag feedback to uncover themes and generate highly-targeted widgets',
        'Design on-brand widgets to fit your website and convert more customers',
        'Assess your performance in the market to move into the lead',
        'Access Salesforce integration and TruthBoard\'s APIs via add-ons'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Request',
      desc: 'Experience exclusive, secure solutions and AI-powered tools',
      cta: 'Book a demo',
      isBlue: true,
      features: [
        'Make TruthBoard your own with full access to APIs',
        'Operate your review strategy at scale with AI-powered tools',
        'Reveal profile visitor insights to discover untapped audiences',
        'Ask for more from your reviewers with private follow up questions',
        'Make data-driven decisions with regular insights summaries of review activity'
      ]
    }
  ];

  const comparisonData = {
    "Manage your reputation": [
       { title: "Performance overview", plans: [true, true, true, true, true] },
       { title: "TrustScore insights", plans: [false, true, true, true, true] },
       { title: "TruthBoard Profile Page customizations", plans: [false, true, true, true, true] },
       { title: "TrustScore forecast", plans: [false, false, true, "Customizable", "Customizable"] },
       { title: "Promotions for your TruthBoard profile page", plans: [false, false, true, true, true] },
    ],
    "Invite reviews": [
       { title: "Automated monthly invitations", plans: ["50", "200", "500", "5000", "Unlimited"] },
       { title: "Automated feedback service (AFS)", plans: [true, true, true, true, true] },
       { title: "Integrations for review invitations", plans: [true, true, true, true, true] },
       { title: "Service reviews analytics", plans: [false, true, true, true, true] },
       { title: "Invitation conversion dashboard", plans: [false, true, true, true, true] },
       { title: "Customizable review invitation email templates", plans: [false, false, false, true, true] },
       { title: "Customizable reminder emails", plans: [false, false, false, true, true] },
    ],
    "Engage with feedback": [
       { title: "Reply to reviews", plans: [true, true, true, true, true] },
       { title: "Flag suspicious reviews", plans: [true, true, true, true, true] },
       { title: "Reply data", plans: [false, true, true, true, true] },
       { title: "Integrations for replying to reviews", plans: [false, true, true, true, true] },
       { title: "Review tagging and filtering", plans: [false, false, false, true, true] },
       { title: "AI-Assisted review responses", plans: [false, false, false, false, true] },
    ],
    "Accelerate conversions": [
       { title: "Connect and share", plans: [false, true, true, true, true] },
       { title: "Image and video generators", plans: [false, true, true, true, true] },
       { title: "Downloadable TruthBoard assets", plans: [false, true, true, true, true] },
       { title: "TruthBoard widgets for website", plans: ["1", "8", "Full access", "Full access", "Full access"] },
       { title: "Testimonial TruthBoard widgets", plans: [false, false, "Full access", "Full access", "Full access"] },
       { title: "Asset builder", status: "New", plans: [false, false, true, true, true] },
    ],
    "Improve with insights": [
       { title: "Search engagement reports", plans: [false, false, false, false, true] },
       { title: "Topics reports with sentiment analysis", plans: [false, false, "Limited access", "Full access", "Full access"] },
       { title: "Analytics explorer", status: "New", plans: [false, false, true, true, true] },
       { title: "My competitors", plans: [false, false, "Limited", "Full access", "Full access"] },
       { title: "Export service reviews", plans: [false, false, true, true, true] },
       { title: "Market insights", plans: [false, false, false, true, true] },
       { title: "Review spotlight", plans: [false, false, false, false, true] },
       { title: "Review follow-up", status: "New", plans: [false, false, false, false, true] },
       { title: "Visitor insights", status: "New", plans: [false, false, false, false, true] },
    ],
    "Add-ons and integrations": [
       { title: "Helpdesk and customer support integrations", plans: [false, true, true, true, true] },
       { title: "Marketing integrations", plans: [false, true, true, true, true] },
       { title: "eCommerce integrations", plans: ["Limited", true, true, true, true] },
       { title: "Salesforce integration", plans: [false, false, "Add-on", "Add-on", "Add-on"] },
       { title: "Connect API", plans: [false, false, "Add-on", "Add-on", "Included"] },
       { title: "Location reviews", plans: [false, "Add-on", "Add-on", "Add-on", "Add-on"] },
    ],
    "Support & Admin": [
       { title: "Email support and help center", plans: [true, true, true, true, true] },
       { title: "Live chat", plans: [false, true, true, true, true] },
       { title: "Dedicated Customer Success Manager", plans: [false, false, true, true, true] },
       { title: "Expert implementation and strategic support", plans: [false, false, false, false, true] },
       { title: "User logins", plans: ["1", "3", "10", "20", "1000"] },
       { title: "Single sign on (SSO)", plans: [false, false, false, false, true] },
       { title: "Additional business domains for purchase", plans: [false, "2", "Unlimited", "Unlimited", "Unlimited"] },
    ]
  };

  const planTitles = ["Free", "Plus", "Premium", "Advanced", "Enterprise"];

  const faqs = [
    { q: "How does TruthBoard work?", a: "TruthBoard is an independent review platform that helps businesses collect, manage, and display customer feedback to build trust and improve business performance." },
    { q: "How long will I have access to my Free TruthBoard account?", a: "Your Free account is yours for as long as you want it. There is no time limit, though feature access is limited compared to paid plans." },
    { q: "Are there any costs when I decide to set up my business to use TruthBoard?", a: "Setup is free for the Free plan. For paid plans, our onboarding team can assist with implementation as part of your subscription." },
    { q: "Do you provide training when I sign up for the Free account? What happens afterwards?", a: "The Free plan includes access to our Help Center and self-service guides. Full training and strategic support are included in our higher-tier plans." },
    { q: "Do I have to pay when I sign up for TruthBoard?", a: "You can start for free with no credit card required. Paid plans are billed annually and offer advanced features to accelerate growth." },
    { q: "What happens to my company's reviews if I stop using your service?", a: "Reviews are owned by the customers who write them and the public community. They will remain visible on our platform according to our guidelines, but your business will lose access to management tools." },
    { q: "How long am I bound to a plan?", a: "Most TruthBoard plans are 12-month commitments, billed upfront annually, to ensure you have enough time to see the long-term benefits of the platform." }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="bg-white min-h-screen font-sans text-[#1a1c21]">
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
                  <div className={`flex items-center gap-1 cursor-pointer transition-colors ${item === 'Pricing' ? 'text-[#00b67a]' : 'text-white/90 hover:text-[#00b67a]'}`} onClick={() => !hasDropdown && handleLinkClick(item)}>
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

      {/* Hero */}
      <section className="pt-40 pb-16 text-center px-6">
        <motion.h1 
          initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}}
          className="text-[32px] md:text-[44px] font-black tracking-tight mb-6 leading-[1.1]"
        >
          Turn trust into action with TruthBoard
        </motion.h1>
        <p className="max-w-3xl mx-auto text-[#1a1c21]/70 font-medium text-[15px] md:text-[17px] leading-relaxed mb-6">
          Choose the right plan to help you reach more customers, earn their trust and keep them loyal for life.<br/>
          All contracts are a 12-month commitment, starting at the prices below.
        </p>
      </section>

      {/* Plan Cards */}
      <section className="pb-32 px-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, i) => (
            <motion.div 
              key={i}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              transition={{delay: i * 0.1}}
              viewport={{once:true}}
              className={`rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_12px_44px_rgba(0,0,0,0.04)] flex flex-col ${p.isBlue ? 'bg-[#e5f1ff] border-[#c0deff]' : 'bg-[#f9fafb]'}`}
            >
              <div className="p-10 pb-4">
                 <h3 className="text-[26px] font-black mb-6 leading-none tracking-tight">{p.name}</h3>
                 <div className="flex items-baseline gap-1 mb-2">
                    {p.price !== 'Request' && <span className="text-[13px] font-bold text-gray-500 mb-4">from</span>}
                    <span className="text-[34px] font-black leading-none">{p.price === 'Request' ? '' : '$'}{p.price}</span>
                 </div>
                 {p.price === 'Request' ? (
                   <p className="text-[14px] font-bold text-gray-500 mb-6">Pricing upon request</p>
                 ) : (
                   <p className="text-[12px] font-bold text-gray-500 mb-10 leading-relaxed uppercase tracking-wider">per month, per domain, billed<br/>upfront annually</p>
                 )}
                 <p className="text-[13px] font-bold text-gray-400 mb-10 text-center uppercase tracking-[0.15em]">{p.price === 'Request' ? 'Contact sales for a quote' : ''}</p>
                 <Link to="/request-demo" className="block w-full bg-[#1a1c21] text-white py-3.5 rounded-full font-bold text-[14px] hover:bg-black transition-all text-center mb-8 shadow-lg">
                   {p.cta}
                 </Link>
              </div>
              <div className="p-10 pt-0 bg-white flex-1">
                 <p className="text-[15px] font-bold text-gray-800 mb-8 leading-snug mt-10">{p.desc}</p>
                 <ul className="space-y-4">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <Check className="w-5 h-5 text-[#00b67a] shrink-0 mt-0.5" />
                        <span className="text-[14px] text-gray-600 font-medium leading-relaxed">{f}</span>
                      </li>
                    ))}
                 </ul>
                 <Link to="#compare" className="block mt-12 text-[14px] font-bold underline text-gray-900 group">
                    See {p.name} in full
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-12 text-[13px] font-bold text-gray-500">*Speak with your sales representative to discuss quarterly payment options.</p>
      </section>

      {/* Brand Carousel */}
      <section className="py-24 border-y border-gray-100">
        <h3 className="text-center text-[18px] md:text-[22px] font-bold text-gray-800 mb-16 px-6 leading-tight">TruthBoard reviews are used by 1.17+ million businesses, globally</h3>
        <div className="overflow-hidden relative">
          <div className="flex gap-24 animate-marquee items-center whitespace-nowrap px-10">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div key={i} className="shrink-0 hover:scale-110 transition-all duration-500 cursor-pointer">{logo}</div>
            ))}
          </div>
          <style>{`
            @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .animate-marquee:hover { animation-play-state: paused; }
          `}</style>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 text-center px-6">
        <h2 className="text-[36px] font-black mb-16 tracking-tight">How our pricing works</h2>
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {[
             { icon: Briefcase, t: "Review our plans", d: "Determine the best plan to help you achieve your business goals. Our team is here to help you find the right fit." },
             { icon: PlusIcon, t: "Enhance your plan", d: "Enhance your plan with add-on modules and integrations where applicable." },
             { icon: Globe, t: "Confirm your domains", d: "Prices shown are per domain, so we need to know each domain you want included in your plan to give you an accurate quote." },
             { icon: BarChart2, t: "Review your quote", d: "You'll receive a personalized quote that reflects your needs and considers things like site traffic, business size per domain, and annual revenue." }
           ].map((step, i) => (
             <div key={i} className="space-y-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center p-4">
                   <step.icon className="w-full h-full text-gray-800" />
                </div>
                <h4 className="text-[18px] font-bold">{step.t}</h4>
                <p className="text-[14px] text-gray-500 leading-relaxed font-medium">{step.d}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section id="compare" className="py-24 bg-white" ref={tableRef}>
        <div className="max-w-[1140px] mx-auto px-6">
          <h2 className="text-[32px] font-black text-center mb-16 tracking-tight">Compare all plans</h2>
          
          <div className="relative border border-gray-100 rounded-[32px] overflow-hidden bg-white shadow-sm">
            {/* Sticky Header Row */}
            <div className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] bg-white border-b border-gray-100 transition-all duration-300 z-50 ${sticky ? 'sticky top-[80px] shadow-md py-4' : 'py-8'}`}>
              <div className="px-8 font-bold text-gray-400 invisible lg:visible">Feature Comparison</div>
              {planTitles.map((t, i) => (
                <div key={i} className="text-center space-y-3 px-2">
                   <h4 className={`text-[15px] font-black ${i===planTitles.length-1 ? 'text-[#4162ff]' : 'text-gray-900'}`}>{t}</h4>
                   <Link to={i === 0 ? "/business/signup" : "/request-demo"} className={`block text-[11px] font-black py-2 rounded-full border transition-all ${i===0 ? 'border-gray-900 hover:bg-black hover:text-white' : 'bg-black text-white hover:bg-gray-800'}`}>
                      {i === 0 ? "Start for free" : "Book a demo"}
                   </Link>
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-50">
               {Object.entries(comparisonData).map(([category, features], catIdx) => (
                 <div key={catIdx} className="bg-white">
                   <div className="px-8 py-8 bg-[#fbfbfb] border-y border-gray-100">
                      <h3 className="text-[16px] font-black text-gray-900">{category}</h3>
                   </div>
                   {features.map((f, fIdx) => (
                     <div key={fIdx} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] divide-x divide-gray-50/50 hover:bg-gray-50/30 transition-colors">
                        <div className="px-8 py-6 flex items-center gap-2 group">
                           <span className="text-[13px] font-bold text-gray-600 group-hover:text-gray-900">{f.title}</span>
                           {f.status && <span className="bg-[#4162ff] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase leading-none">{f.status}</span>}
                           <Info className="w-3.5 h-3.5 text-gray-200 group-hover:text-gray-400 transition-colors cursor-help" />
                        </div>
                        {f.plans.map((val, pIdx) => (
                          <div key={pIdx} className={`py-6 flex items-center justify-center text-[12px] font-bold ${val === false ? 'opacity-0' : 'opacity-100'}`}>
                             {val === true ? (
                               <div className="w-6 h-6 bg-[#00b67a]/10 rounded-full flex items-center justify-center">
                                 <Check className="w-4 h-4 text-[#00b67a] stroke-[3px]" />
                               </div>
                             ) : (
                               <span className="text-gray-600 px-2 text-center">{val}</span>
                             )}
                          </div>
                        ))}
                     </div>
                   ))}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[32px] font-black text-center mb-16 tracking-tight">Frequently asked questions</h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center py-4 text-left group"
                >
                  <span className="text-[15px] font-bold text-gray-900 group-hover:text-[#00b67a] transition-colors">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{height:0, opacity:0}}
                      animate={{height:'auto', opacity:1}}
                      exit={{height:0, opacity:0}}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[14px] text-gray-500 leading-relaxed font-medium">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailedFooter />
    </div>
  );
};

const Pricing = () => (
  <LocalErrorBoundary>
    <PricingContent />
  </LocalErrorBoundary>
);

export default Pricing;
