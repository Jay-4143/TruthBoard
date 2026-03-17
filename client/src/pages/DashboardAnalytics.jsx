import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BusinessNav, DetailedFooter } from './ForBusinesses';
import { Star, MessageCircle, BarChart2 } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   HERO SECTION - Vibrant Pink
   ═══════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-[#ff4e8a] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
      
      {/* Left Text Column */}
      <div className="lg:w-1/2">
        <h3 className="text-sm font-bold mb-4 tracking-wide">Dashboard and Analytics</h3>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-black">
          Stay on top of your review data
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-10 leading-snug">
          We’ll crunch the numbers behind your reviews, giving you the insights needed to get the most out of your customer feedback and build a customer-centric business.
        </p>
        <Link to="/request-demo" className="bg-[#1c1c1c] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-black transition-colors w-fit shadow-xl inline-block">
          Book a demo
        </Link>
      </div>

      {/* Right Graphic Column: Phone Mockup */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-[500px] w-full items-center">
        {/* Deep Pink Backdrop circle */}
        <div className="absolute right-[10%] w-[450px] h-[450px] bg-[#d92c6a] rounded-full blur-[2px]" />
        
        {/* Phone Frame */}
        <div className="relative w-[320px] h-[600px] border-[12px] border-[#6b032d] bg-[#ff4e8a] rounded-[48px] shadow-2xl flex flex-col gap-6 p-6 overflow-hidden z-10 translate-y-12">
          
          {/* Top Analytics Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#fcfaf5] rounded-[20px] p-5 shadow-lg w-full -ml-16 pr-16"
          >
            <div className="flex gap-4 justify-between mb-6 border-b border-gray-200 pb-4">
              <div>
                <p className="text-[10px] font-bold text-gray-800">Reviews collected</p>
                <p className="text-3xl font-black">69</p>
                <div className="h-[3px] w-8 bg-[#8b003a] mt-1" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-800">Invitations delivered</p>
                <p className="text-2xl font-black">100</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-800">Current TrustScore</p>
                <p className="text-xl font-black">4.4</p>
              </div>
            </div>
            {/* Bar Chart Mockup */}
            <div className="flex items-end justify-between h-24 gap-1.5 px-2">
              {[40, 20, 45, 100, 30, 50, 40, 20, 60, 110, 45, 60].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-[#ff4e8a] opacity-80" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="h-1 w-12 bg-[#3b001a] mt-4 mx-auto rounded-full" />
          </motion.div>

          {/* Bottom Source Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#fcfaf5] rounded-[20px] p-5 shadow-lg w-[110%] -ml-4"
          >
            <h4 className="text-2xl font-black mb-4">Source of reviews</h4>
            <div className="space-y-3">
              {[
                ['Organic', '80%'],
                ['Manual Invitation', '50%'],
                ['Automatic Invitation', '30%'],
                ['Basic Invitation', '10%']
              ].map(([label, width], i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold w-28 text-gray-900">{label}</span>
                  <div className="flex-1 h-2 bg-[#f0e6e6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b001a] rounded-full" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   DID YOU KNOW - Light Pink Text Section
   ═══════════════════════════════════════════════════════ */
const DidYouKnow = () => (
  <section className="bg-[#faebeb] py-24 px-6 md:px-12 text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto">
      <h4 className="text-sm font-bold mb-4">Did you know?</h4>
      <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black leading-tight max-w-4xl">
        Trustpilot gets over 4 million new reviews every month - that's a lot of content to analyze!
      </h2>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   ANALYTICS EXPLORER - Floating Review Cards
   ═══════════════════════════════════════════════════════ */
const AnalyticsExplorer = () => (
  <section className="bg-white py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-20">
      
      {/* Left Graphic: Pink grid and reviews */}
      <div className="lg:w-1/2 relative h-[500px] w-full flex items-center justify-center">
        {/* Pink Grid Background */}
        <div className="absolute w-[360px] h-[360px] bg-[#ff4e8a] rounded-[40px] grid grid-cols-3 grid-rows-3 gap-1 p-1 overflow-hidden">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-[#f03874] rounded-xl shadow-inner mix-blend-multiply opacity-50" />
          ))}
        </div>

        {/* Floating Review 1 */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-0 bg-[#32363a] text-white p-4 rounded-xl shadow-2xl w-[320px] z-20"
        >
          <p className="text-[11px] font-medium leading-relaxed mb-3">
            Speedy delivery from Octoshoe. As always a perfect fit. I can't wait to take a spin in my new high tops.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <div className="flex gap-[1px]">
                {[1,2,3,4,5].map(j => <div key={j} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-sm"><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}
              </div>
              <span className="text-[9px] text-gray-400 ml-1">Verified</span>
            </div>
            <div className="flex items-center gap-1 group">
              <Star className="w-3 h-3 text-[#00b67a] fill-current group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold tracking-tight">Trustpilot</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Review 2 */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-44 -right-12 bg-[#32363a] text-white p-4 rounded-xl shadow-2xl w-[320px] z-30"
        >
          <p className="text-[11px] font-medium leading-relaxed mb-3">
            I emailed to find more out about tracking. Sarah from support was super helpful. Order placed and delivered. Thanks so much!
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <div className="flex gap-[1px]">
                {[1,2,3,4,5].map(j => <div key={j} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-sm"><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}
              </div>
              <span className="text-[9px] text-gray-400 ml-1">Verified</span>
            </div>
            <div className="flex items-center gap-1 group">
              <Star className="w-3 h-3 text-[#00b67a] fill-current group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold tracking-tight">Trustpilot</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Review 3 */}
        <motion.div 
          animate={{ y: [0, -8, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 -left-8 bg-[#32363a] text-white p-4 rounded-xl shadow-2xl w-[320px] z-20"
        >
          <p className="text-[11px] font-medium leading-relaxed mb-3">
            Great service from OctoShoe. I called to find out why my delivery was delayed. James found & fixed the issues with courier in a flash.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <div className="flex gap-[1px]">
                {[1,2,3,4,5].map(j => <div key={j} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-sm"><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}
              </div>
              <span className="text-[9px] text-gray-400 ml-1">Verified</span>
            </div>
            <div className="flex items-center gap-1 group">
              <Star className="w-3 h-3 text-[#00b67a] fill-current group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold tracking-tight">Trustpilot</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Right Text Column */}
      <div className="lg:w-1/2">
        <h4 className="text-sm font-bold mb-4 tracking-wide text-gray-800">Analytics explorer</h4>
        <h2 className="text-[32px] md:text-[40px] font-black leading-tight mb-6">
          Easily surface trends and opportunities that matter most
        </h2>
        <p className="text-[17px] text-gray-700 leading-relaxed font-medium">
          Analyze your widget, search, profile and TrustScore performance in one place. Uncover and share untapped opportunities from the data you already have.
        </p>
      </div>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   HQ PERFORMANCE - Photo + Overlapping Cards
   ═══════════════════════════════════════════════════════ */
const HQPerformance = () => (
  <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
      
      {/* Left Text */}
      <div className="lg:w-[40%]">
        <h4 className="text-sm font-bold mb-4 tracking-wide text-gray-800">Dashboard</h4>
        <h2 className="text-[32px] md:text-[40px] font-black leading-tight mb-6">
          Your HQ for review performance
        </h2>
        <p className="text-[17px] text-gray-700 leading-relaxed font-medium">
          Get at-a-glance performance metrics and engage with customers all in one place. Monitor review invitation performance and tweak your strategy accordingly to collect more feedback — because more reviews mean more opportunity for ROI.
        </p>
      </div>

      {/* Right Graphic: Photo with overlapping UI */}
      <div className="lg:w-[60%] relative h-[500px] flex justify-end items-center mt-12 lg:mt-0">
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#d92c6a] rounded-full blur-[2px] right-20" />
        
        {/* The Photo Container */}
        <div className="relative w-[340px] h-[420px] bg-white rounded-[40px] p-2 shadow-2xl z-10 border-[6px] border-[#6b032d] mr-8">
          <img 
            src="https://images.unsplash.com/photo-1531123414708-1e1d1b8e8185?auto=format&fit=crop&w=600&q=80" 
            className="w-full h-full object-cover rounded-[30px]" 
            alt="Woman working on laptop"
          />
        </div>

        {/* Floating Source Card */}
        <motion.div 
          animate={{ y: [-5, 5, -5] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[5%] bg-[#fcfaf5] rounded-[16px] p-4 shadow-xl w-[260px] z-30"
        >
          <h4 className="text-[16px] font-black mb-3">Source of reviews</h4>
          <div className="space-y-2">
            {[
              ['Organic', '90%'],
              ['Manual Invitation', '60%'],
              ['Automatic Invitation', '40%'],
              ['Basic Invitation', '20%']
            ].map(([label, width], i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[9px] font-bold w-24 text-gray-900">{label}</span>
                <div className="flex-1 h-1.5 bg-[#f0e6e6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b001a] rounded-full" style={{ width }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating Sentiment Card */}
        <motion.div 
          animate={{ y: [5, -5, 5] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-44 left-[10%] bg-[#fcfaf5] rounded-[16px] p-4 shadow-xl w-[300px] z-30"
        >
          <h4 className="text-[16px] font-black mb-4">Sentiment score over time</h4>
          <div className="flex justify-between items-center mb-4">
            <div className="text-[9px] font-bold space-y-3">
              <p>Positive</p>
              <p>Neutral</p>
              <p>Negative</p>
            </div>
            
            <div className="w-[180px] h-16 relative">
              <div className="absolute top-2 right-4 text-right">
                <p className="text-[9px] font-bold">Sentiment score: <span className="text-[#00b67a]">Positive</span></p>
                <p className="text-[9px] font-bold">Number of reviews: 48</p>
              </div>
              <svg viewBox="0 0 100 40" className="w-full h-full absolute inset-0 preserve-aspect-none pt-4">
                <path d="M0,35 L40,25 L80,10 L100,5 L100,40 L0,40 Z" fill="#bcf1df" />
                <polyline points="0,35 40,25 80,10 100,5" fill="none" stroke="#00b67a" strokeWidth="1" />
                <circle cx="0" cy="35" r="2" fill="#1c1c1c" />
                <circle cx="100" cy="5" r="2" fill="#1c1c1c" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   DIG INTO DATA - Phone + Topic Tags
   ═══════════════════════════════════════════════════════ */
const DigIntoData = () => (
  <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c] mb-20">
    <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
      
      {/* Left Graphic: Phone mockup containing charts */}
      <div className="lg:w-1/2 relative h-[500px] w-full flex justify-center items-center font-sans">
        {/* Pink rounded bg blob */}
        <div className="absolute w-[350px] h-[350px] bg-[#f03874] rounded-full z-0" />

        {/* Floating Topic Tags */}
        <div className="absolute inset-0 z-30 pointer-events-none w-full h-full max-w-[500px] mx-auto">
          {[
            { text: "All reviews", top: "15%", left: "12%", bg: "#3b001a", color: "white" },
            { text: "experience", top: "18%", right: "12%", bg: "#ffe5ec", color: "#6b032d" },
            { text: "furniture", top: "45%", left: "8%", bg: "#ffe5ec", color: "#6b032d" },
            { text: "packaging", top: "42%", right: "10%", bg: "#ffe5ec", color: "#6b032d" },
            { text: "move", top: "65%", left: "10%", bg: "#ffe5ec", color: "#6b032d" },
            { text: "removal", top: "62%", right: "12%", bg: "#ffe5ec", color: "#6b032d" },
            { text: "care", top: "85%", left: "15%", bg: "#ffb3c6", color: "#1c1c1c" },
            { text: "storage", top: "85%", right: "15%", bg: "#ffb3c6", color: "#1c1c1c" }
          ].map((tag, i) => (
            <motion.div 
              key={i}
              animate={{ y: [0, i%2===0 ? -6 : 6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="absolute px-4 py-2 rounded-full font-bold text-sm shadow-lg whitespace-nowrap"
              style={{ top: tag.top, left: tag.left, right: tag.right, backgroundColor: tag.bg, color: tag.color }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>

        {/* The Phone Phone mock */}
        <div className="relative w-[240px] h-[460px] border-[8px] border-[#6b032d] bg-[#ff4e8a] rounded-[40px] shadow-2xl flex flex-col items-center pt-8 z-20 overflow-hidden">
          <h2 className="text-5xl font-black text-[#6b032d] mb-1">3.7</h2>
          <p className="text-xl font-bold text-[#6b032d] mb-3">Average</p>
          <div className="flex gap-1 mb-8">
            {[1,2,3,4,5].map((s,i) => (
              <div key={i} className={`w-5 h-5 flex items-center justify-center rounded-sm ${i === 4 ? 'bg-gray-300' : 'bg-[#00b67a]'}`}>
                <Star className="w-3.5 h-3.5 text-white fill-current" />
              </div>
            ))}
          </div>

          <div className="w-[90%] bg-[#fcfaf5] rounded-t-[20px] p-4 flex-1 mt-auto shadow-inner rounded-b-[30px] mb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="flex gap-2 justify-center mb-4">
              <div className="w-6 h-1 bg-[#ff4e8a] rounded-full" />
              <div className="w-6 h-1 bg-[#ff4e8a] rounded-full" />
            </div>
            
            <div className="flex justify-between items-baseline mb-4 border-b border-gray-200 pb-2">
              <span className="text-xs font-black">Reviews</span>
              <span className="text-[9px] text-gray-500 font-bold">124,656 reviews</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Excellent', width: '80%', color: '#6b032d' },
                { label: 'Great', width: '25%', color: '#6b032d' },
                { label: 'Average', width: '15%', color: '#6b032d' },
                { label: 'Poor', width: '10%', color: '#6b032d' },
                { label: 'Bad', width: '20%', color: '#6b032d' }
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[9px] font-bold w-12">{row.label}</span>
                  <div className="flex-1 h-1.5 bg-[#f0e6e6] rounded-full">
                    <div className="h-full rounded-full" style={{ width: row.width, backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Right Text Column */}
      <div className="lg:w-1/2">
        <h4 className="text-sm font-bold mb-4 tracking-wide text-gray-800">Performance Data</h4>
        <h2 className="text-[32px] md:text-[40px] font-black leading-tight mb-6">
          Dig into your review data
        </h2>
        <p className="text-[17px] text-gray-700 leading-relaxed font-medium max-w-lg">
          Gauge customer satisfaction in your reviews over time to keep your customers happy. See analytics segmented by review tags to understand performance in areas that best support your business strategy.
        </p>
      </div>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT PORTFOLIO
   ═══════════════════════════════════════════════════════ */
const DashboardAnalytics = () => {
  // Ensure standard scrolling on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans antialiased">
      <BusinessNav />
      {/* Spacer for fixed nav */}
      <div className="pt-[72px]" /> 
      <HeroSection />
      <DidYouKnow />
      <AnalyticsExplorer />
      <HQPerformance />
      <DigIntoData />
      <DetailedFooter />
    </div>
  );
};

export default DashboardAnalytics;
