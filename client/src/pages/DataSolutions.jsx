import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BusinessNav, DetailedFooter } from './ForBusinesses';
import { 
  Star, 
  ArrowRight, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Target, 
  PieChart, 
  BarChart3, 
  Search, 
  Zap, 
  ChevronRight,
  Monitor,
  Database,
  LineChart,
  Handshake,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
const HeroSection = ({ scrollToForm }) => (
  <section className="bg-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
      <div className="lg:w-1/2">
        <h1 className="text-4xl md:text-[56px] leading-[1.1] font-[900] mb-8 tracking-tight text-[#1c1c1c]">
          Truthboard Data Solutions
        </h1>
        <p className="text-[18px] font-medium mb-10 leading-relaxed text-gray-600 max-w-lg">
          Embed rich consumer sentiment and trust signals into every strategic business decision, with data solutions, an intelligence layer that embeds trust everywhere to provide a deeper layer of insight beyond surface-level metrics.
        </p>
        <button 
          onClick={scrollToForm}
          className="bg-[#1c1c1c] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all hover:scale-105 shadow-xl inline-block"
        >
          Get in touch
        </button>
      </div>

      <div className="lg:w-1/2 relative h-[500px] w-full flex items-center justify-center">
        {/* Abstract Data Visualization */}
        <div className="relative w-full max-w-[500px] h-[400px]">
           {/* Line Chart Graphic */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 flex flex-col"
           >
              <div className="flex justify-between items-center mb-10">
                 <div className="space-y-1">
                    <div className="w-16 h-2 bg-gray-100 rounded"/>
                    <div className="w-24 h-2 bg-gray-100 rounded"/>
                 </div>
                 <div className="px-3 py-1 bg-green-50 text-[#00b67a] text-[10px] font-bold rounded-full border border-green-100">
                    +12% from last period
                 </div>
              </div>
              
              <div className="flex-1 flex items-end justify-between relative">
                 <svg viewBox="0 0 300 120" className="w-full h-full">
                    <path d="M0 100 Q50 80 100 90 T200 60 T300 40" fill="none" stroke="#ff4e8a" strokeWidth="3" />
                    <path d="M0 100 Q50 80 100 90 T200 60 T300 40 L300 120 L0 120 Z" fill="#ff4e8a" fillOpacity="0.1" />
                    <circle cx="100" cy="90" r="12" fill="white" stroke="#00b67a" strokeWidth="2" />
                 </svg>
                 
                 {/* Floating Labels */}
                 <div className="absolute top-0 right-0 p-2 bg-white shadow-lg rounded-lg border border-gray-50 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"><Star className="w-3 h-3 text-yellow-400 fill-current"/></div>
                    <div className="text-[9px] font-bold">2 hours ago</div>
                 </div>
              </div>
           </motion.div>

           {/* Small Review Card Overlap */}
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="absolute bottom-10 right-[-20px] bg-white p-4 rounded-xl shadow-2xl border border-gray-100 w-[180px] z-20"
           >
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 rounded-full bg-gray-200" />
                 <div>
                    <h5 className="text-[10px] font-bold">Excellent</h5>
                    <div className="flex gap-[1px]">
                       {[1,2,3,4,5].map(i => <Star key={i} className="w-2 h-2 text-[#00b67a] fill-current"/>)}
                    </div>
                 </div>
              </div>
              <p className="text-[9px] text-gray-500 leading-tight">"Super happy with our purchase, the quality is..."</p>
           </motion.div>

           {/* Badge Below Graphic */}
           <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <span className="text-[12px] font-bold">Excellent</span>
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><div key={i} className="w-5 h-5 bg-[#00b67a] rounded-[1px] flex items-center justify-center"><Star className="w-3 h-3 text-white fill-current"/></div>)}</div>
              <Star className="w-4 h-4 text-[#00b67a] fill-current ml-1"/>
              <span className="text-[12px] font-bold">Truthboard</span>
           </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   STATS SECTION
   ═══════════════════════════════════════════════════════ */
const StatsSection = () => (
  <section className="bg-[#fbfbfb] py-20 px-6 border-y border-gray-100">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-2xl md:text-3xl font-[900] text-center mb-16 tracking-tight">
        Trusted data from the largest and fastest growing customer feedback platform
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        <div>
          <h3 className="text-[32px] font-[900] mb-2">+350m</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed max-w-[150px] mx-auto">
            reviews on <a href="#" className="underline text-blue-600">Truthboard.com</a>
          </p>
        </div>
        <div>
          <h3 className="text-[32px] font-[900] mb-2">1.3 million</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed max-w-[180px] mx-auto">
            businesses globally with Truthboard reviews
          </p>
        </div>
        <div>
          <div className="flex justify-center mb-2"><MessageSquare className="w-8 h-8"/></div>
          <h3 className="text-[32px] font-[900] mb-2">63+ million</h3>
          <p className="text-[13px] text-gray-500 font-bold">monthly active users</p>
        </div>
        <div>
          <h3 className="text-[32px] font-[900] mb-2">190,000+</h3>
          <p className="text-[13px] text-gray-500 font-bold">new reviews every day</p>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   QUOTE SECTION
   ═══════════════════════════════════════════════════════ */
const QuoteSection = () => (
  <section className="bg-white py-32 px-6">
    <div className="max-w-[1000px] mx-auto text-center">
       <h2 className="text-[28px] md:text-[34px] font-[900] leading-[1.3] mb-10 tracking-tight text-[#1c1c1c]">
         “A customer sentiment analysis, typically relying on Truthboard data, is part of virtually every consumer investment diligence exercise we do.”
       </h2>
       <p className="text-[15px] font-bold text-gray-500">
         - Jesse Thomas, Global Head of Data Science - Advent International
       </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   TRENDS SECTION
   ═══════════════════════════════════════════════════════ */
const TrendsSection = () => (
  <section className="bg-[#fbfbfb] py-32 px-6">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-[900] text-center mb-16 tracking-tight text-[#1c1c1c]">
        Understand trends to set new ones
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { 
            title: "Black Friday 2024 Key Themes and Trends", 
            description: "Black Friday 2024 saw record consumer engagement, but reviews reveal a different story behind the holiday rush. Our analysis uncovers the hidden patterns shaping spending, sentiment, and operational risk." 
          },
          { 
            title: "European Heatwave's Influence on Consumer Behaviors", 
            description: "As Europe sweltered in record heat, consumer demand for air conditioning soared, while ratings plunged. Our analysis uncovers what rising temperatures revealed about sales, service, and operational resilience." 
          },
          { 
            title: "Truthboard Insights Report 2025", 
            description: "A comprehensive look at Truthboard's global review ecosystem, covering growth trends, industry and regional coverage, user engagement patterns, and how reviews power real-time insights for businesses, investors, and AI systems." 
          }
        ].map((item, i) => (
          <div key={i} className="flex flex-col text-center">
            <h3 className="text-[22px] font-[900] mb-6 leading-tight">{item.title}</h3>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-8 flex-grow">{item.description}</p>
            <a href="#" className="text-[13px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2 text-blue-600">Download report</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   TRUSTLENS PRODUCT SUITE SECTION
   ═══════════════════════════════════════════════════════ */
const ProductSuite = ({ scrollToForm }) => (
  <section className="bg-white py-32 px-6 overflow-hidden">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-[900] text-center mb-24 tracking-tight">Truthboard Data Solutions</h2>
      
      <div className="flex flex-col lg:flex-row items-start gap-20">
        <div className="lg:w-[45%] space-y-16">
          <div>
            <h3 className="text-2xl font-[900] mb-6">TrustLens</h3>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
              Visualize millions of raw consumer feedback points into clear, actionable intelligence. Our interactive platform provides instant insights, helping you explore sentiment trends, uncover correlations, and benchmark performance of brands and companies.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-[900] mb-6">TrustSignals</h3>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
              Drive customer purchases by embedding key trust signals—star ratings, review counts, and sentiment scores—directly into your products. Our easy-to-integrate solution builds instant confidence at every touchpoint.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-[900] mb-6">TrustSource</h3>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-10">
              Access Truthboard reviews and business data in the rawest form and incorporate directly with TrustSource to power deep analysis, market research, and competitive intelligence. Uncover trends, benchmark performance, and spot emerging risks or opportunities with unmatched scale and historical depth.
            </p>
            <button 
              onClick={scrollToForm}
              className="bg-[#1c1c1c] text-white px-8 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all shadow-lg"
            >
              Get in touch
            </button>
          </div>
        </div>

        <div className="lg:w-[55%] relative">
           <motion.div 
             initial={{ x: 100, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="relative bg-white border-[6px] border-[#1c1c1c] rounded-3xl shadow-2xl overflow-hidden"
           >
              {/* Fake Dashboard UI */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-100" />
                    <div className="w-24 h-3 bg-gray-100 rounded" />
                 </div>
                 <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-50" />
                    <div className="w-6 h-6 rounded-full bg-gray-50" />
                 </div>
              </div>
              <div className="p-8 space-y-8">
                 <div className="flex justify-between items-center">
                    <div className="space-y-1"><h4 className="text-[14px] font-bold">Sentiment themes</h4><p className="text-[9px] text-gray-400 font-bold">Discover the most mentioned topics over time</p></div>
                    <div className="px-3 py-1 bg-gray-50 text-[10px] font-bold rounded border border-gray-100">Verify &rarr;</div>
                 </div>
                 
                 <div className="h-48 bg-gray-50 rounded-xl relative overflow-hidden p-6 border border-gray-100">
                    <div className="flex items-end justify-between h-full gap-4 relative">
                       <svg viewBox="0 0 400 120" className="absolute inset-0 w-full h-full">
                          <path d="M0 60 Q50 40 100 80 T200 40 T300 70 T400 50" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 3"/>
                          <path d="M0 80 Q50 60 100 90 T200 50 T300 90 T400 70" fill="none" stroke="#3b82f6" strokeWidth="2" />
                       </svg>
                    </div>
                 </div>
              </div>
           </motion.div>
           <p className="text-[12px] font-bold text-gray-400 text-center mt-6 italic">TrustLens Insights Platform</p>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   INDUSTRIES GRID
   ═══════════════════════════════════════════════════════ */
const IndustryGrid = () => (
  <section className="bg-[#fbfbfb] py-32 px-6">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-[900] text-center mb-24 tracking-tight">Embedding trust across industries</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 w-20 h-20 flex items-center justify-center">
            <LineChart className="w-10 h-10 text-gray-800" />
          </div>
          <h3 className="text-[22px] font-[900] mb-6">Investments</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm">
            Gain real-time insights on portfolio companies, benchmark competitors, and spot risks before they hit the market, trusted by firms like Advent and Felix Capital to power investment decisions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 w-20 h-20 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-gray-800" />
          </div>
          <h3 className="text-[22px] font-[900] mb-6">Risk Intelligence</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm">
            Detect reputational and operational risks before they escalate. Track sentiment shifts, market events, and competitive signals in real time to protect portfolio health and inform critical business decisions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 w-20 h-20 flex items-center justify-center">
            <Handshake className="w-10 h-10 text-gray-800" />
          </div>
          <h3 className="text-[22px] font-[900] mb-6">Consulting</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm">
            Deliver strategies grounded in independent, real-time data. Benchmark markets, validate recommendations, and track sentiment shifts, trusted by firms like BCG to give clients actionable, evidence-led advice.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 w-20 h-20 flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-gray-800" />
          </div>
          <h3 className="text-[22px] font-[900] mb-6">Social Listening</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm">
            Track what customers are saying in the wild, beyond your own customer insights and surveys – for a reality check from the outside.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   FUTURE WITH AI (PRESS)
   ═══════════════════════════════════════════════════════ */
const AIPressSection = () => (
  <section className="bg-white py-32 px-6">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-[900] text-center mb-24 tracking-tight">Leading the discussion on trust in a future with AI</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {[
          { icon: TechRadarLogo, title: "TechRadar", desc: "Our take on why trust and transparency matter more than ever in the age of AI commerce.", action: "Read now" },
          { icon: WebSummitLogo, title: "Web Summit", desc: "Exploring why trust must be built into the platforms and systems shaping decisions across industries worldwide.", action: "Watch now" },
          { icon: SalesforceLogo, title: "In conversation with Salesforce", desc: "We discuss how reviews and AI insights help businesses create a unified, trusted customer experience.", action: "Watch now" },
          { icon: LondonTechWeekLogo, title: "London Tech Week", desc: "“If AI is going to make choices for us, it needs to reflect us.” Hear how Truthboard brings real human voices into those decisions.", action: "Watch now" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-16 flex items-center justify-center mb-8">
               <item.icon />
            </div>
            <h4 className="text-[18px] font-bold mb-4 leading-tight">{item.title}</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6 flex-grow">{item.desc}</p>
            <a href="#" className="text-[13px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2 text-blue-600">{item.action}</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Small Logo Components for Press Section
const TechRadarLogo = () => <span className="text-2xl font-bold italic">techradar</span>;
const WebSummitLogo = () => <div className="flex items-center gap-1 font-bold text-2xl">web<span className="bg-[#ff4e8a] px-1 text-white">summit</span></div>;
const SalesforceLogo = () => <div className="bg-[#00A1E0] text-white px-3 py-1 rounded-full text-lg font-bold">salesforce</div>;
const LondonTechWeekLogo = () => <div className="border-4 border-[#1c1c1c] p-2 text-[10px] font-bold leading-none">LONDON<br/>TECH<br/>WEEK</div>;

/* ═══════════════════════════════════════════════════════
   CONTACT FORM SECTION
   ═══════════════════════════════════════════════════════ */
const ContactSection = React.forwardRef((props, ref) => (
  <section ref={ref} id="get-in-touch" className="bg-[#fbfbfb] py-32 px-6">
    <div className="max-w-[1000px] mx-auto text-center">
      <h2 className="text-[32px] md:text-5xl font-[900] mb-6 tracking-tight">Get in touch</h2>
      <p className="text-[16px] text-gray-500 font-bold mb-16">Learn more about Truthboard Data Solutions</p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="space-y-2">
          <label className="text-[13px] font-bold">First name*</label>
          <input type="text" placeholder="First name" className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold">Last name*</label>
          <input type="text" placeholder="Last name" className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold">Job title*</label>
          <input type="text" placeholder="Job title" className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold">Company name*</label>
          <input type="text" placeholder="Company name" className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold">Business email*</label>
          <input type="email" placeholder="Business email" className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold">Phone number</label>
          <input type="tel" placeholder="Phone number" className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[13px] font-bold">Website URL*</label>
          <input type="url" placeholder="Website URL" className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[13px] font-bold">Which Data Solutions product are you interested in?*</label>
          <select className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all text-gray-500 shadow-sm appearance-none">
            <option>Please select one</option>
            <option>TrustLens</option>
            <option>TrustSignals</option>
            <option>TrustSource</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[13px] font-bold">What industry are you in?*</label>
          <select className="w-full px-5 py-4 rounded bg-white border border-gray-200 focus:border-[#4162ff] outline-none transition-all text-gray-500 shadow-sm appearance-none">
            <option>Please select one</option>
            <option>Investments</option>
            <option>Risk Intelligence</option>
            <option>Consulting</option>
            <option>Other</option>
          </select>
        </div>
        
        <div className="md:col-span-2 mt-4 text-center">
            <button className="bg-[#1c1c1c] text-white w-full py-5 rounded-xl font-bold text-[16px] hover:bg-black transition-all shadow-xl hover:scale-[1.01]">
               Get in touch
            </button>
            <p className="mt-8 text-[11px] text-gray-400 font-medium leading-[1.6] max-w-2xl mx-auto">
              By clicking above you accept our <a href="#" className="underline text-blue-600">Privacy Policy</a> and agree to us contacting you via call or email about our products and services. You may unsubscribe at any time by clicking the unsubscribe link in the email or by <a href="#" className="underline text-blue-600">contacting us</a>.
              <br/><br/>
              This site is protected by reCAPTCHA and the Google <a href="#" className="underline text-blue-600">Privacy Policy</a> and <a href="#" className="underline text-blue-600">Terms of Service</a> apply.
            </p>
        </div>
      </form>
    </div>
  </section>
));

/* ═══════════════════════════════════════════════════════
   BOTTOM CTA SECTION
   ═══════════════════════════════════════════════════════ */
const RecommendationSection = () => (
  <section className="bg-white py-32 px-6 text-center text-[#1c1c1c]">
    <div className="max-w-[1000px] mx-auto">
      <h2 className="text-[32px] md:text-5xl font-[900] mb-8 tracking-tight leading-tight">
        Discover more business solutions from Truthboard, the world's largest independent customer feedback platform
      </h2>
      <p className="text-[18px] font-medium text-gray-500 mb-12">Attract and keep customers with Truthboard's review platform and powerful analytics tools.</p>
      <Link to="/business" className="bg-[#4162ff] text-white px-12 py-5 rounded-full font-bold text-[16px] hover:bg-[#3453e0] transition-all shadow-2xl inline-block hover:scale-105">
        Learn more
      </Link>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   CUSTOM DATA SOLUTIONS NAVIGATION
   ═══════════════════════════════════════════════════════ */
const DataSolutionsNav = () => {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-[100] bg-black py-4 shadow-sm transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo - star + Truthboard */}
        <Link to="/" className="flex items-center gap-2 group">
          <Star className="w-8 h-8 text-[#00b67a] fill-current" />
          <span className="text-[22px] font-bold tracking-tight text-white">Truthboard</span>
        </Link>

        {/* Desktop Nav - Only Company Dropdown */}
        <div className="hidden lg:flex items-center gap-8 relative pr-20">
          <div 
            className="relative py-2 group"
            onMouseEnter={() => setIsCompanyOpen(true)}
            onMouseLeave={() => setIsCompanyOpen(false)}
          >
            <div className="flex items-center gap-1.5 cursor-pointer text-white/90 font-semibold text-[15px] hover:text-white transition-colors">
              Company
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCompanyOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isCompanyOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 pt-4 z-[150] min-w-[240px]"
                >
                  {/* Up Arrow indicator */}
                  <div className="absolute top-2 right-4 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 rounded-tl-[2px] z-10" />
                  
                  <div className="bg-white rounded-2xl shadow-[0_12px_44px_rgb(0,0,0,0.1)] p-6 border border-gray-100 relative z-20 overflow-hidden">
                    <ul className="space-y-4">
                      <li>
                        <Link to="/about" className="text-[15px] text-gray-700 hover:text-black cursor-pointer font-medium transition-colors">
                          About Truthboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/business" className="text-[15px] text-gray-700 hover:text-black cursor-pointer font-medium transition-colors">
                          Truthboard for Business
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="text-[15px] text-gray-700 hover:text-black cursor-pointer font-medium transition-colors">
                          Truthboard for Consumers
                        </Link>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

const DataSolutionsPage = () => {
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white overflow-hidden">
      <DataSolutionsNav />
      <HeroSection scrollToForm={scrollToForm} />
      <StatsSection />
      <QuoteSection />
      <TrendsSection />
      <ProductSuite scrollToForm={scrollToForm} />
      <IndustryGrid />
      <AIPressSection />
      <ContactSection ref={formRef} />
      <RecommendationSection />
      <DetailedFooter />
    </div>
  );
};

export default DataSolutionsPage;
