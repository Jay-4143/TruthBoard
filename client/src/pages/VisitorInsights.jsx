import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BusinessNav, DetailedFooter } from './ForBusinesses';
import { Search, MapPin, MousePointer2, TrendingUp, Users, Target, Zap, CheckCircle2, Star, PlusCircle } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   HERO SECTION 
   ═══════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-[#00b67a] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
      <div className="lg:w-1/2">
        <h3 className="text-[14px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Visitor insights</h3>
        <h1 className="text-4xl md:text-5xl md:leading-[1.1] font-[900] mb-6 tracking-tight text-[#1c1c1c]">
          Identify new audiences and growth opportunities
        </h1>
        <p className="text-[18px] font-medium mb-10 leading-relaxed text-[#1c1c1c] max-w-[440px]">
          Look into who's looking at you with insights that teach you about the audiences you haven't won over yet
        </p>
        <Link to="/request-demo" className="bg-[#1c1c1c] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all hover:scale-105 shadow-xl inline-block">
          Book a demo
        </Link>
      </div>

      <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-[500px] w-full items-center">
        {/* Visitors Text Overlapping Graphics */}
        <div className="relative w-full h-full flex items-center justify-center">
          <h2 className="absolute text-[120px] font-bold leading-none text-[#1c1c1c] opacity-10 select-none z-0">
            Visitor<br />Insights
          </h2>

          {/* Dashboard Interest Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 w-[420px] border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[15px] font-bold">Interest</h4>
              <p className="text-[9px] text-gray-500 font-medium">Discover what your visitors care about</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span>Shopping and fashion</span>
                    <span>33%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "33%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-[#00b67a]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span>Business services</span>
                    <span>32%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "32%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-[#00b67a]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span>Home and garden</span>
                    <span>13%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "13%" }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="h-full bg-[#00b67a]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-bold">Percentage total 100% as visitors browse multiple categories</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   DID YOU KNOW
   ═══════════════════════════════════════════════════════ */
const DidYouKnow = () => (
  <section className="bg-[#e6fcf5] py-24 px-6 md:px-12 text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto text-center md:text-left">
      <h4 className="text-[13px] font-bold mb-6 tracking-wide">Did you know?</h4>
      <h2 className="text-[32px] md:text-[40px] font-[900] leading-[1.2] max-w-4xl tracking-tight">
        With visitor insights, you can uncover key audience behaviors, identify new market opportunities, and refine your strategy to drive even higher engagement and conversions.
      </h2>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   KEY VISITOR DEMOGRAPHICS
   ═══════════════════════════════════════════════════════ */
const DemographicsSection = () => (
  <section className="bg-white py-32 px-6 md:px-12 text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-20">
      <div className="md:w-[45%]">
        <h2 className="text-3xl md:text-4xl font-[900] mb-8 tracking-tight">
          Identify key visitor demographics
        </h2>
        <p className="text-[18px] leading-relaxed font-medium text-gray-700">
          Get a detailed breakdown of where your visitors come from, how they interact with your reviews, and what businesses they compare you to.
        </p>
      </div>

      <div className="md:w-[55%] relative h-[450px] w-full flex justify-center items-center">
        {/* Mint green blob background */}
        <div className="absolute w-[450px] h-[450px] bg-[#e6fcf5] rounded-full z-0" />

        {/* Radar Chart Mockup on Tablet */}
        <motion.div
          initial={{ rotate: -5, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 w-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h4 className="text-[14px] font-[900]">Demography index</h4>
              <p className="text-[9px] text-gray-500 font-bold">Get a snapshot of who your visitors are</p>
            </div>
            <button className="text-[10px] font-bold text-blue-600">Download CSV</button>
          </div>

          <div className="p-8 flex gap-8">
            <div className="flex-1 relative aspect-square">
              {/* Radar Chart Svg */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#f3f4f6" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="18.5" y1="18.5" x2="81.5" y2="81.5" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="18.5" y1="81.5" x2="81.5" y2="18.5" stroke="#f3f4f6" strokeWidth="0.5" />

                <polygon
                  points="50,20 75,35 70,65 50,80 30,65 25,35"
                  fill="#00b67a"
                  fillOpacity="0.2"
                  stroke="#00b67a"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="w-[180px] space-y-4">
              <div className="text-[10px] font-bold border-b border-gray-100 pb-2">Interests diversity</div>
              {[
                { label: 'Logistics service', value: '29%' },
                { label: 'Courier service', value: '4.9%' },
                { label: 'Online marketplace', value: '4.1%' },
                { label: 'Shoe store', value: '3.2%' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00b67a]" />
                    <span>{item.label}</span>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   TRACK REVIEW ENGAGEMENT
   ═══════════════════════════════════════════════════════ */
const EngagementSection = () => (
  <section className="bg-[#00b67a] py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-20 relative z-10">
      <div className="md:w-1/2 order-2 md:order-1 relative h-[500px] flex justify-center items-center">
        {/* Diagonal Cards Collage Collage */}
        <div className="relative w-full h-full rotate-[12deg]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute top-0 left-0 bg-white p-6 rounded-2xl shadow-xl w-[220px]"
          >
            <h4 className="text-[13px] font-bold mb-2">United Kingdom</h4>
            <p className="text-[10px] text-gray-500 font-bold mb-4">The majority of your visitors are from the UK.</p>
            <button className="text-[10px] font-bold text-blue-600">Explore more</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl w-[220px] z-10"
          >
            <h4 className="text-[13px] font-bold mb-2">1m 33s</h4>
            <p className="text-[10px] text-gray-500 font-bold mb-4">On average people spend 1 minute and 33 seconds reading your reviews.</p>
            <button className="text-[10px] font-bold text-blue-600">Explore more</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 right-0 bg-white p-6 rounded-2xl shadow-xl w-[220px]"
          >
            <h4 className="text-[13px] font-bold mb-2">Google search</h4>
            <p className="text-[10px] text-gray-500 font-bold mb-4">The most used search engine to find your reviews is Google search.</p>
            <button className="text-[10px] font-bold text-blue-600">Explore more</button>
          </motion.div>
        </div>
      </div>

      <div className="md:w-1/2 order-1 md:order-2">
        <h2 className="text-3xl md:text-4xl font-[900] mb-8 tracking-tight">
          Track review engagement
        </h2>
        <p className="text-[18px] leading-relaxed font-medium">
          See which reviews resonate most with visitors, including average time spent, search behavior, and widget interactions.
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   SPOT OPPORTUNITIES
   ═══════════════════════════════════════════════════════ */
const OpportunitiesSection = () => (
  <section className="bg-white py-32 px-6 md:px-12 text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-20">
      <div className="md:w-[45%]">
        <h2 className="text-3xl md:text-4xl font-[900] mb-8 tracking-tight">
          Spot opportunities for growth
        </h2>
        <p className="text-[18px] leading-relaxed font-medium text-gray-700">
          Learn where your audience is most engaged and discover new market segments to target.
        </p>
      </div>

      <div className="md:w-[55%] relative h-[500px] flex justify-center items-center">
        {/* Dark background graphic with text overflow */}
        <div className="absolute w-full h-[400px] bg-[#1c1c1c] rounded-[48px] overflow-hidden flex items-center justify-center p-12">
          <h2 className="absolute text-[120px] font-bold leading-tight text-white/5 whitespace-nowrap -rotate-12">
            Visitor Insights Visitor Insights
          </h2>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative z-10 bg-white rounded-3xl p-8 w-full max-w-[380px] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <h4 className="text-[16px] font-bold">Interests diversity</h4>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00b67a] flex items-center justify-center cursor-pointer">
                  <Target className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {['Shopping and fashion', 'Business services', 'Home and garden'].map((cat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[20px] font-bold text-gray-200">#{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-[12px] font-bold">{cat}</p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                      <div
                        className="h-full bg-[#00b67a] rounded-full"
                        style={{ width: i === 0 ? '70%' : i === 1 ? '45%' : '30%' }}
                      />
                    </div>
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
   TURN INSIGHTS INTO ACTION
   ═══════════════════════════════════════════════════════ */
const ActionSection = () => (
  <section className="bg-white py-32 px-6 md:px-12 text-[#1c1c1c] border-t border-gray-100">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-20">
      <div className="md:w-1/2 relative h-[500px] flex justify-center items-center order-2 md:order-1">
        {/* Top-down phone mockup */}
        <div className="absolute w-[400px] h-[400px] bg-[#e6fcf5] rounded-full z-0 opacity-50" />

        <div className="relative z-10 w-[240px] h-[480px] bg-white border-[8px] border-[#1c1c1c] rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#1c1c1c] w-1/3 h-[25px] rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 z-20" />

          <div className="p-5 pt-10">
            <div className="w-full h-32 bg-gray-50 rounded-2xl border border-gray-100 mb-6 p-4">
              <div className="flex gap-[1px] mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-[#00b67a] fill-current" />)}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mb-2" /><div className="w-2/3 h-2 bg-gray-200 rounded" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e6fcf5] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#00b67a]" />
                  </div>
                  <div className="flex-1"><div className="w-full h-1.5 bg-gray-100 rounded" /><div className="w-1/2 h-1.5 bg-gray-100 rounded mt-1" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Clover Icons */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-20 left-10 text-[#00b67a] opacity-60">
          <Zap className="w-12 h-12 fill-current" />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-20 right-10 text-[#00b67a] opacity-60">
          <TrendingUp className="w-14 h-14" />
        </motion.div>
      </div>

      <div className="md:w-1/2 order-1 md:order-2">
        <h2 className="text-3xl md:text-4xl font-[900] mb-8 tracking-tight">
          Turn insights into action
        </h2>
        <p className="text-[18px] leading-relaxed font-medium text-gray-700">
          Optimize your marketing, website experience, and customer engagement strategies based on real-time visitor data.
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   THIS MAY ALSO INTEREST YOU
   ═══════════════════════════════════════════════════════ */
const InterestCards = () => (
  <section className="bg-white pt-10 pb-32 px-6 md:px-12">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-[32px] md:text-[36px] font-[900] text-center mb-16 tracking-tight text-[#1c1c1c]">
        This may also interest you
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-[#1c1c1c]">
        {/* Card 1 - Yellow */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#fff100] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-end justify-start p-0 pl-10 pr-0 border-2 border-transparent group-hover:border-black/5 transition-all">
            <div className="bg-white w-[90%] h-[180px] rounded-tl-2xl border-l-[6px] border-t-[6px] border-[#1c1c1c] shadow-lg flex flex-col p-4 px-6 translate-y-2 group-hover:-translate-y-2 transition-transform">
              <h3 className="text-[26px] font-bold leading-none mb-2 text-left tracking-tight">TruthScore forecast</h3>
              <p className="text-[11px] font-bold text-gray-500 mb-6 leading-tight max-w-[150px] text-left">Based on your performance<br />in the last <strong className="text-black">28 days</strong></p>
              <div className="w-full flex-1 relative border-l border-b border-gray-200">
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0 40 L0 30 Q30 25 50 15 T100 15 L100 40 Z" fill="#dcfce7" />
                  <path d="M0 30 Q30 25 50 15 T100 15" fill="none" stroke="#00b67a" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Dashboard and analytics</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            Gain key insights into customer feedback, to monitor and optimize customer interactions, and enhance your business growth.
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2 mt-auto">Read more</a>
        </div>

        {/* Card 2 - Orange */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#ff8e2d] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-6 border-2 border-transparent group-hover:border-black/5 transition-all">
            <div className="w-[90%] bg-white border-[4px] border-[#1c1c1c] rounded-xl shadow-lg p-4 group-hover:scale-105 transition-transform z-10 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-4">
                <div className="flex gap-[1px]">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-4 h-4 flex items-center justify-center rounded-[1px] ${i === 5 ? 'bg-gray-300' : 'bg-[#00b67a]'}`}><Star className="w-2.5 h-2.5 text-white fill-current" /></div>)}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500"><div className="w-4 h-4 rounded-full bg-gray-200" />Bjorn Baumann</div>
              </div>
              <p className="text-left w-full font-bold text-[16px] mb-4">Exciting service</p>
              <div className="w-full h-1.5 bg-gray-200 rounded mb-2" /><div className="w-2/3 h-1.5 bg-gray-200 rounded mb-4 shadow" />
              <div className="w-full flex gap-1 justify-start">
                <span className="bg-[#fbbf24] text-[9px] font-bold px-2 py-1 flex items-center rounded border border-yellow-500 shadow-sm"><PlusCircle className="w-2.5 h-2.5 mr-0.5 inline" />Add tag</span>
                <span className="bg-[#a7f3d0] text-[#065f46] text-[9px] font-bold px-2 py-1 rounded border border-green-300 shadow-sm">Content: Delivery</span>
                <span className="bg-[#a7f3d0] text-[#065f46] text-[9px] font-bold px-2 py-1 rounded border border-green-300 shadow-sm">Content: Service</span>
              </div>
            </div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Review Tags</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            Sharpen your response strategies by using tags to quickly categorize feedback and streamline your review management.
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2 mt-auto">Read more</a>
        </div>

        {/* Card 3 - Pink */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#ff4e8a] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-4 px-6 border-2 border-transparent group-hover:border-black/5 transition-all">
            {/* Masonry Review Cards Graphic */}
            <div className="w-full h-[80%] relative flex justify-center gap-2 group-hover:scale-105 transition-transform z-10">
              <div className="flex flex-col gap-2 mt-4 translate-y-[-10px]">
                <div className="bg-white rounded p-2 shadow border border-[#1c1c1c] w-20">
                  <div className="flex items-center gap-1 mb-1"><div className="w-3 h-3 rounded-full bg-[#1c1c1c]" /><div className="w-8 h-1 bg-gray-200 rounded" /></div>
                  <div className="flex gap-[1px] mb-1">{[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px]" />)}</div>
                  <div className="w-full h-1 bg-gray-200 rounded mb-0.5" /><div className="w-full h-1 bg-[#1c1c1c] rounded mb-0.5" />
                </div>
                <div className="bg-white rounded p-2 shadow border border-gray-100 w-20 opacity-90">
                  <div className="flex gap-[1px] mb-1">{[1, 2, 3, 4].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#005138] rounded-[1px]" />)}</div>
                  <div className="w-full h-1 bg-gray-200 rounded mb-0.5" />
                </div>
              </div>

              <div className="flex flex-col gap-2 z-20">
                <div className="bg-white rounded p-2 shadow border-[1.5px] border-[#1c1c1c] w-24">
                  <div className="flex items-center gap-1 mb-1"><div className="w-3 h-3 rounded-full bg-[#1c1c1c]" /><div className="w-10 h-1 bg-gray-200 rounded" /></div>
                  <div className="w-full h-1.5 bg-gray-200 rounded mb-1" /><div className="w-2/3 h-1.5 bg-gray-200 rounded" />
                </div>
                <div className="bg-white rounded p-2 shadow border border-[#1c1c1c] w-24">
                  <div className="flex gap-[1px] mb-1">{[1, 2, 3].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px]" />)}</div>
                  <div className="w-full h-1 bg-gray-200 rounded mb-0.5" /><div className="w-full h-1 bg-gray-200 rounded mb-0.5" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-8 z-10">
                <div className="bg-white rounded p-2 shadow border border-[#1c1c1c] w-16 mb-2">
                  <div className="w-5 h-5 bg-[#1c1c1c] rounded mb-1 mx-auto" />
                  <div className="flex gap-[1px] justify-center">{[1, 2].map(i => <div key={i} className="w-2 h-2 bg-yellow-400 rounded-[1px]" />)}</div>
                </div>
                <div className="bg-white rounded p-2 shadow border border-gray-100 w-16 opacity-90">
                  <div className="w-full h-1 bg-gray-200 rounded mb-0.5" />
                </div>
              </div>
            </div>
            {/* Abstract background diamonds */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-wrap gap-4 items-center justify-center -z-0">
              {[...Array(15)].map((_, i) => <div key={i} className="w-4 h-4 bg-white rotate-45" />)}
            </div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Service Reviews</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            Every two seconds, a new review is written on TruthBoard's consumer-facing site. Collecting reviews on TruthBoard gives your current and future customers a place to learn...
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2 mt-auto">Read more</a>
        </div>

      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   BOTTOM CTA
   ═══════════════════════════════════════════════════════ */
const BottomCTA = () => (
  <section className="bg-[#00b67a] py-32 px-6 text-center text-[#1c1c1c]">
    <div className="max-w-[800px] mx-auto">
      <h2 className="text-[32px] md:text-4xl font-[900] mb-12 tracking-tight leading-tight">
        Ready to unlock the full potential of reviews?
      </h2>
      <div className="flex flex-col items-center gap-4">
        <Link to="/request-demo" className="bg-[#1c1c1c] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all shadow-xl inline-block hover:scale-105">
          Book a demo
        </Link>
        <Link to="/pricing" className="text-[14px] font-bold underline underline-offset-4 hover:text-[#1c1c1c]/80">View our pricing plans</Link>
      </div>
    </div>
  </section>
);

const VisitorInsights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <BusinessNav />
      <HeroSection />
      <DidYouKnow />
      <DemographicsSection />
      <EngagementSection />
      <OpportunitiesSection />
      <ActionSection />
      <InterestCards />
      <BottomCTA />
      <DetailedFooter />
    </div>
  );
};

export default VisitorInsights;
