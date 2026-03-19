import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BusinessNav, DetailedFooter } from './ForBusinesses';
import { Star, MapPin, Search, PlusCircle, Check, X, TrendingUp, Cpu, Send, CheckCircle2, Sliders } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   HERO SECTION 
   ═══════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-[#f14a79] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
      <div className="lg:w-1/2">
        <h3 className="text-[14px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Review Insights</h3>
        <h1 className="text-4xl md:text-5xl md:leading-[1.1] font-[900] mb-6 tracking-tight text-[#1c1c1c]">
          Make data-driven decisions
        </h1>
        <p className="text-[18px] font-medium mb-10 leading-relaxed text-[#1c1c1c] max-w-[440px]">
          Dynamic and practical insights delivered by artificial intelligence. Uncover big picture trends within your reviews. Start doing more of what's working, and less of what's not.
        </p>
        <Link to="/request-demo" className="bg-[#1c1c1c] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all hover:scale-105 shadow-xl inline-block">
          Book a demo
        </Link>
      </div>

      <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-[500px] w-full items-center">
        {/* Abstract 4-quadrant Graphic */}
        <div className="relative w-[380px] h-[380px] rounded-[48px] overflow-visible z-20 shadow-2xl">
           <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 rounded-[48px] overflow-hidden">
             {/* Top Left - Dark Red */}
             <div className="bg-[#41001a] relative"></div>
             {/* Top Right - Pink Map */}
             <div className="bg-[#f47da0] relative overflow-hidden">
                <svg className="absolute w-[150%] h-[150%] -top-4 -left-4 stroke-white/60 stroke-[4] fill-none" viewBox="0 0 100 100">
                  <path d="M 20 0 L 30 100 M 60 0 L 50 100 M 0 30 L 100 20 M 0 70 L 100 60 M 25 35 L 55 65" />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#41001a] z-10">
                   <MapPin className="w-14 h-14 fill-current text-[#41001a] drop-shadow-lg" />
                   <div className="w-4 h-4 bg-white rounded-full absolute top-[18px] left-1/2 -translate-x-1/2" />
                </div>
             </div>
             {/* Bottom Left - Image */}
             <div className="bg-gray-200 relative">
                <img src="https://images.unsplash.com/photo-1515347619362-e68b3d68fb46?auto=format&fit=crop&w=400&q=80" alt="Woman walking" className="w-full h-full object-cover" />
             </div>
             {/* Bottom Right - Pink Gradient */}
             <div className="bg-gradient-to-br from-[#f8a8c1] to-[#fde2ea] relative"></div>
           </div>

           {/* Floating Review Card 1 (Top Left Cross) */}
           <motion.div animate={{y:[-4,4,-4]}} transition={{duration:5, repeat:Infinity, ease:"easeInOut"}} className="absolute -top-6 -left-12 w-[220px] bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-4 border border-gray-100 z-30">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-full bg-[#41001a] shrink-0" />
                 <div className="w-full"><div className="w-3/4 h-2.5 bg-gray-200 rounded mb-1.5"/><div className="w-1/2 h-2 bg-gray-100 rounded"/></div>
              </div>
              <div className="flex gap-[1.5px] mb-3">
                {[1,2,3,4,5].map(i => <div key={i} className={`w-6 h-6 flex items-center justify-center rounded-[2px] ${i===5?'bg-gray-300':'bg-[#00b67a]'}`}><Star className="w-4 h-4 text-white fill-current"/></div>)}
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded mb-1.5" />
              <div className="w-full h-1.5 bg-gray-200 rounded mb-1.5" />
              <div className="w-2/3 h-1.5 bg-gray-200 rounded" />
              {/* White connector dot to map */}
              <div className="absolute -right-10 bottom-6 w-5 h-5 bg-white rounded-full shadow-md z-0" />
           </motion.div>

           {/* Floating Review Card 2 (Bottom Right) */}
           <motion.div animate={{y:[4,-4,4]}} transition={{duration:6, repeat:Infinity, ease:"easeInOut", delay:1}} className="absolute bottom-10 -right-16 w-[220px] bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-4 border border-gray-100 z-30">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-full bg-[#41001a] shrink-0" />
                 <div className="w-full"><div className="w-3/4 h-2.5 bg-gray-200 rounded mb-1.5"/><div className="w-1/2 h-2 bg-gray-100 rounded"/></div>
              </div>
              <div className="flex gap-[1.5px] mb-3">
                {[1,2,3,4,5].map(i => <div key={i} className={`w-6 h-6 flex items-center justify-center rounded-[2px] ${i===5?'bg-gray-300':'bg-[#00b67a]'}`}><Star className="w-4 h-4 text-white fill-current"/></div>)}
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded mb-1.5" />
              <div className="w-full h-1.5 bg-gray-200 rounded mb-1.5" />
              <div className="w-3/4 h-1.5 bg-gray-200 rounded" />
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
  <section className="bg-[#fdf2f5] py-28 px-6 md:px-12 text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto text-center md:text-left">
      <h4 className="text-[13px] font-bold mb-6 tracking-wide">Did you know?</h4>
      <h2 className="text-[32px] md:text-[40px] font-[900] leading-[1.2] max-w-4xl tracking-tight">
        Review Insights' machine learning model gets more intelligent with each review. After analyzing more than 100 million, it delivers some pretty smart insights.
      </h2>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   REVIEW FOLLOW UP (DASHBOARD)
   ═══════════════════════════════════════════════════════ */
const ReviewFollowUpSection = () => (
  <section className="bg-[#fbfbfb] py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto text-center mb-16 relative z-20">
      <h2 className="text-[36px] md:text-[44px] font-[900] tracking-tight">Review follow-up</h2>
    </div>

    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      <div className="md:w-[55%] relative h-[600px] w-full flex justify-center items-center">
        {/* Faint green background blob/pattern */}
        <div className="absolute w-[500px] h-[500px] bg-[#eefff7] rounded-[100px] rotate-45 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#e3feef] rounded-full z-0 translate-x-10 -translate-y-10" />

        {/* Dashboard Mockup */}
        <div className="relative z-10 w-[500px] h-[400px] bg-[#1c1c1c] rounded-3xl p-3 shadow-2xl overflow-hidden flex flex-col border border-gray-800 translate-x-[-10%] md:translate-x-0">
           {/* Browser Header */}
           <div className="flex items-center gap-2 mb-3 px-2">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-green-500"/></div>
              <div className="flex-1 bg-white/10 rounded px-3 py-1 text-white text-[10px] font-medium flex items-center justify-between">
                <span>Campaign 0001</span><span className="bg-white text-black px-1.5 rounded text-[8px] font-bold">Draft</span>
              </div>
           </div>

           {/* Main Dashboard Layout */}
           <div className="flex-1 bg-white rounded-xl shadow-inner overflow-hidden flex">
              {/* Left Sidebar Rules */}
              <div className="w-2/3 border-r border-gray-200 p-4 bg-gray-50 flex flex-col gap-4">
                 <div className="bg-yellow-50 border border-yellow-200 p-2 rounded flex items-start gap-2">
                   <span className="text-yellow-600 text-sm">⚠️</span>
                   <p className="text-[8px] font-medium text-gray-700">Questions and their responses won't appear publicly, or impact your TruthScore.<a className="text-blue-500 hover:underline cursor-pointer"> Learn more</a></p>
                 </div>
                 
                 <div className="bg-white border text-left border-gray-200 rounded shadow-sm p-4">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                       <div className="flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-blue-600" />
                          <div><p className="text-[12px] font-bold">Rules</p><p className="text-[9px] text-gray-500">When to show these questions and in what language</p></div>
                       </div>
                       <X className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <p className="text-[10px] font-bold mb-2">Which reviews will trigger private campaign questions?</p>
                    <div className="flex gap-1.5 mb-4">
                       {['1 star -', '2 stars +', '3 stars +', '4 stars +', '5 stars -'].map(star => <div key={star} className="border border-gray-200 px-2 py-1 flex items-center rounded text-[9px] text-gray-600"><Star className="w-2.5 h-2.5 mr-1 fill-current text-gray-300"/>{star}</div>)}
                    </div>

                    <p className="text-[10px] font-bold mb-2">Which language will see the questions?</p>
                    <div className="border border-gray-200 p-2 rounded text-[11px] mb-2 flex justify-between bg-white text-gray-700">Italian <Search className="w-3 h-3"/></div>
                    
                    <div className="flex items-start gap-2 mb-4">
                       <input type="checkbox" className="mt-0.5" defaultChecked />
                       <p className="text-[8px] text-gray-500 leading-tight">Questions will not be automatically translated - all customers will see exactly what you enter. Create separate campaigns to collect feedback in specific languages.</p>
                    </div>
                    <button className="bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full">Save</button>
                 </div>

                 {/* Collapsed Question block */}
                 <div className="bg-white border border-gray-200 rounded shadow-sm p-3 w-full">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 text-left">Question</p>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 border border-gray-300 rounded-full" /><p className="text-[10px] text-gray-600">Option 1</p></div>
                 </div>
                 
                 <div className="border border-dashed border-blue-400 bg-blue-50 text-blue-600 rounded p-2 flex justify-center text-[10px] font-bold items-center gap-1 cursor-pointer">
                    <PlusCircle className="w-3 h-3" /> Add a question
                 </div>

                 <div className="mt-auto flex justify-between gap-2 border-t pt-2 border-gray-200">
                    <button className="flex-1 border text-[10px] font-bold border-gray-300 rounded-full py-2 hover:bg-gray-100 transition-colors">Save</button>
                    <button className="flex-1 bg-blue-600 text-white text-[10px] font-bold rounded-full py-2 hover:bg-blue-700 transition-colors">Save and publish</button>
                 </div>
              </div>
              
              {/* Right Sidebar Phone Mockup */}
              <div className="w-1/3 p-4 flex items-center justify-center bg-gray-50 border-l border-gray-200 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full translate-x-1/2 -translate-y-1/2" />
                 <div className="w-[140px] h-[280px] bg-white border-[6px] border-[#1c1c1c] rounded-[24px] shadow-lg relative flex flex-col z-10 overflow-hidden">
                     {/* Phone Header */}
                      <div className="bg-[#1c1c1c] text-white p-2 flex justify-between items-center text-[8px]">
                         <div className="flex items-center gap-1"><Star className="w-3 h-3 text-[#00b67a] fill-current"/><span className="font-bold">TruthBoard</span></div>
                         <Search className="w-3 h-3" />
                      </div>
                     <div className="p-3 flex-1 flex flex-col relative text-left">
                        <p className="text-[8px] text-gray-400 font-bold mb-1">Question 1 of 1</p>
                        <p className="text-[12px] font-bold mb-3 leading-tight text-black">Question</p>
                        <div className="border border-gray-300 rounded p-2 flex items-center gap-2 bg-gray-50 mb-3 shadow-sm">
                           <div className="w-3 h-3 border border-[#00b67a] rounded-full flex items-center justify-center bg-[#00b67a]">
                              <div className="w-1 h-1 bg-white rounded-full"/>
                           </div>
                           <span className="text-[10px] text-gray-800">Option 1</span>
                        </div>
                        <button className="bg-blue-600 text-white w-full rounded-full py-1.5 text-[9px] font-bold mt-2">Submit</button>
                     </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="md:w-[45%] relative z-20">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Review follow-up</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Make precise decisions with deeper customer feedback
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Collect deeper feedback from your reviewers with immediate follow-up questions that are just between you and the customer. Go beyond vague feedback to get to the root of common issues, recognize high-performing teams, or inform your product roadmap with richer customer insight.
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   SENTIMENT ANALYSIS 
   ═══════════════════════════════════════════════════════ */
const SentimentAnalysisSection = () => (
  <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      
      <div className="md:w-[50%]">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Sentiment Analysis</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Zoom in for the big picture
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Our AI engine does the heavy lifting to highlight and identify positive, negative, and neutral customer sentiments within your reviews. Gain an understanding of how each aspect of your brand is perceived now and over time with sentiment scores for different topics.
        </p>
      </div>

      <div className="md:w-[50%] relative h-[450px] w-full flex justify-center items-center">
        {/* Background light shapes */}
        <div className="absolute w-[400px] h-[400px] bg-[#f9f9f9] border border-gray-100 rounded-full z-0 translate-x-10 -translate-y-4" />
        <div className="absolute w-[150px] h-[150px] bg-[#f0f0f0] rounded-full z-0 -translate-x-20 translate-y-20" />
        
        {/* Sentiment Graphic */}
        <div className="relative z-10 w-[380px] flex flex-col items-center">
           <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] p-6 border border-gray-200 w-full mb-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-[#41001a] shrink-0" />
                 <div className="w-full"><div className="w-3/4 h-3 bg-gray-200 rounded mb-2"/><div className="w-1/3 h-2 bg-gray-100 rounded"/></div>
              </div>
              <div className="flex gap-[2px] mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-6 h-6 bg-gray-200 flex items-center justify-center rounded-[2px]"><Star className="w-4 h-4 text-white fill-current"/></div>)}
              </div>
              
              {/* Highlight sentences */}
              <div className="mb-2">
                 <span className="bg-[#00f898] text-[#1c1c1c] font-bold leading-loose px-2 mr-2 text-[14px]">The prices were very fair.</span>
                 <span className="bg-gray-200 inline-block w-16 h-4 rounded align-middle" />
              </div>
              <div className="text-right">
                 <span className="bg-gray-200 inline-block w-16 h-4 rounded align-middle mr-2 mt-4" />
                 <span className="bg-[#ff4e8a] text-white font-bold leading-loose px-2 text-[14px]">the shipping took too long!</span>
              </div>
           </div>

           {/* Sentiment Tags */}
           <div className="flex justify-between w-[90%] font-bold text-[18px]">
              <motion.div animate={{y:[-3,3,-3]}} transition={{duration:4, repeat:Infinity, ease:"easeInOut"}} className="bg-[#f0f0f0] text-[#1c1c1c] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-gray-200">
                 Product <X className="w-5 h-5 stroke-[2.5]" />
              </motion.div>
              <motion.div animate={{y:[3,-3,3]}} transition={{duration:5, repeat:Infinity, ease:"easeInOut", delay:0.5}} className="bg-[#00e676] text-[#1c1c1c] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                 Price <Check className="w-5 h-5 stroke-[3]" />
              </motion.div>
              <motion.div animate={{y:[-2,2,-2]}} transition={{duration:4.5, repeat:Infinity, ease:"easeInOut", delay:1}} className="bg-[#ff4e8a] text-[#1c1c1c] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                 Delivery <Check className="w-5 h-5 stroke-[3]" />
              </motion.div>
           </div>
        </div>

      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   CATEGORIZED FEEDBACK
   ═══════════════════════════════════════════════════════ */
const CategorizedFeedbackSection = () => (
  <section className="bg-[#f14a79] py-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      
      <div className="md:w-1/2 relative h-[500px] w-full flex justify-center items-center">
        {/* Dark Red blobs */}
        <div className="absolute w-[450px] h-[450px] bg-[#d53a66] rounded-full z-0 top-[10%] left-[5%] mix-blend-multiply opacity-50" />
        
        {/* Phone & Dashboard Stack */}
        <div className="relative w-[450px] h-[400px] flex items-center">
           {/* Phone peaking out */}
           <div className="absolute top-0 left-10 w-[200px] h-[400px] bg-[#8a1c41] border-[10px] border-[#1c1c1c] rounded-[36px] shadow-2xl z-10 flex flex-col p-4">
              <div className="absolute top-0 w-[60px] h-[16px] bg-[#1c1c1c] rounded-b-[12px] right-[50%] translate-x-1/2 z-20" />
              <div className="flex items-center gap-2 mb-4 bg-black/20 p-2 rounded-lg mt-4">
                 <div className="w-6 h-6 border border-[#f14a79] flex items-center justify-center rounded hexagon bg-[#1c1c1c]"><div className="w-2.5 h-2.5 bg-[#f14a79] rounded-full" /></div>
                 <div className="flex gap-[1px]">
                   {[1,2,3,4,5].map(i => <div key={i} className={`w-4 h-4 flex items-center justify-center rounded-[1px] ${i===5?'bg-gray-400':'bg-[#00e676]'}`}><Star className="w-2.5 h-2.5 text-[#1c1c1c] fill-current"/></div>)}
                 </div>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center justify-between text-white/80 font-bold text-[10px]">
                   <span>Excellent</span><div className="w-24 h-2 bg-black/40 rounded overflow-hidden"><div className="w-[75%] h-full bg-[#1c1c1c]"/></div><span className="w-4 text-right">75%</span>
                 </div>
                 <div className="flex items-center justify-between text-white/80 font-bold text-[10px]">
                   <span>Great</span><div className="w-24 h-2 bg-black/40 rounded overflow-hidden"><div className="w-[15%] h-full bg-[#1c1c1c]"/></div><span className="w-4 text-right">15%</span>
                 </div>
                 <div className="flex items-center justify-between text-white/80 font-bold text-[10px]">
                   <span>Average</span><div className="w-24 h-2 bg-black/40 rounded overflow-hidden"><div className="w-[8%] h-full bg-[#1c1c1c]"/></div><span className="w-4 text-right">8%</span>
                 </div>
                 <div className="flex items-center justify-between text-white/80 font-bold text-[10px]">
                   <span>Poor</span><div className="w-24 h-2 bg-black/40 rounded overflow-hidden"><div className="w-[4%] h-full bg-[#1c1c1c]"/></div><span className="w-4 text-right">4%</span>
                 </div>
              </div>
           </div>

           {/* Dashboard Line chart card overlapping */}
           <motion.div animate={{y:[-4,4,-4]}} transition={{duration:6, repeat:Infinity, ease:"easeInOut"}} className="absolute left-[-5%] bottom-6 w-[400px] bg-[#f9f8f4] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] p-6 z-20 border border-gray-100">
              <h3 className="text-[28px] font-[900] leading-tight mb-2 text-black tracking-tight">Reviews over time</h3>
              <p className="text-[12px] font-bold text-gray-700 mb-6">How MyBusiness got its reviews in the past 12 months</p>
              
              {/* Fake animated line chart */}
              <div className="relative h-24 mb-6 border-b border-l border-gray-300 ml-4 flex items-end px-2 gap-4 pb-0">
                 {/* Chart guides */}
                 <div className="absolute top-1/2 left-0 w-full border-b border-gray-200 border-dashed" />
                 
                 {/* SVG Line path representation (using path shape) */}
                 <div className="absolute inset-0 pt-2 pb-0 flex items-end overflow-visible px-2">
                   <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none" className="overflow-visible">
                      <path d="M0 80 Q 50 70 80 80 T 150 10 T 250 80 T 300 70" fill="none" stroke="#22c55e" strokeWidth="3" className="drop-shadow" />
                      <path d="M0 90 Q 60 85 130 90 T 200 60 T 300 85" fill="none" stroke="#eab308" strokeWidth="3" className="drop-shadow" />
                      {/* Dots on peak */}
                      <circle cx="150" cy="10" r="4" fill="#22c55e" />
                      <circle cx="200" cy="60" r="4" fill="#eab308" />
                   </svg>
                 </div>
              </div>

              {/* Legend */}
              <div className="flex justify-between w-full px-2 mt-4 text-[10px] font-bold text-gray-600 uppercase">
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /> Organic</div>
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Automated Invitations</div>
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /> Manual invitations</div>
              </div>
           </motion.div>
        </div>
      </div>

      <div className="md:w-1/2">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Topics</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight text-[#1c1c1c]">
          Categorized feedback
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Review Insights sorts and categorizes clusters of words and phrases within your reviews into topics, giving you a deep understanding of what your customers are passionate about.
        </p>
      </div>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   TRUTHSCORE FORECAST
   ═══════════════════════════════════════════════════════ */
const TruthScoreForecastSection = () => (
  <section className="bg-white py-28 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      
      <div className="md:w-[45%]">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">TruthScore forecast</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Look ahead to your future success
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Explore how today's review activities could shape your TruthScore and experiment with different scenarios to see how changes in your review volume and ratings could shape your TruthScore in the next year.
        </p>
      </div>

      <div className="md:w-[55%] relative h-[450px] flex justify-center items-center">
         {/* Abstract background blobs */}
         <div className="absolute w-[350px] h-[350px] bg-[#f14a79] rounded-full mix-blend-multiply opacity-80 z-0 top-[0%] right-[20%] translate-x-10 -translate-y-10" />
         <div className="absolute w-[200px] h-[200px] bg-[#d53a66] rounded-full mix-blend-multiply opacity-90 z-0 bottom-[10%] left-[20%]" />

         {/* Dashboard graphic */}
         <motion.div initial={{scale:0.95, opacity:0}} whileInView={{scale:1, opacity:1}} transition={{duration:0.6}} viewport={{once:true}} className="w-[480px] bg-[#f8e7ed] border-[12px] border-[#a01640] rounded-[36px] shadow-2xl relative z-20 flex p-6 px-8 gap-4 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
             <div className="w-[70%] bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-[28px] font-bold leading-none mb-2 text-[#a01640] tracking-tight">TruthScore<br/>forecast</h3>
                  <p className="text-[12px] font-bold text-gray-500 mb-6 leading-tight max-w-[150px]">Based on your performance<br/>in the last <strong className="text-black">28 days</strong></p>
                </div>

                <div className="h-40 w-full relative">
                   <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-gray-200 pl-2 pb-2 mr-2">
                       {/* Y axis text */}
                       <div className="flex flex-col justify-between h-full absolute -left-4 top-0 bottom-6 text-[8px] font-bold text-gray-400">
                          <span>5</span><span>4</span><span>3</span><span>2</span><span>1</span>
                       </div>
                       <div className="absolute bottom-2 left-6 right-2 flex justify-between text-[8px] font-bold text-gray-400">
                          <span>Sept</span><span>Oct</span><span>Nov</span>
                       </div>
                       
                       {/* Actual graph shape filling up to right */}
                       <div className="absolute left-[2px] bottom-[2px] right-2 h-[80%] overflow-hidden flex items-end">
                         <div className="w-full h-full relative" style={{clipPath: "polygon(0 80%, 30% 60%, 60% 50%, 90% 40%, 100% 40%, 100% 100%, 0 100%)"}}>
                            <div className="absolute inset-0 bg-[#d1fae5] border-t-[3px] border-[#00b67a]" />
                         </div>
                       </div>
                       
                       {/* Current Score Projection line/dot */}
                       <div className="absolute top-[20%] right-8 text-[20px] font-bold text-[#1c1c1c]">4.7</div>
                       <div className="absolute bottom-[2px] top-6 border-l border-dashed border-gray-300 right-10" />
                       <div className="absolute right-[36px] top-[40px] w-2.5 h-2.5 bg-[#00b67a] rounded-full" />
                   </div>
                </div>
             </div>

             <div className="w-[30%] flex flex-col gap-4">
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-end justify-center p-4 gap-2">
                   <div className="w-5 bg-gray-200 rounded-t h-[40%]" />
                   <div className="w-5 bg-[#f9a8d4] rounded-t h-[70%]" />
                   <div className="w-5 bg-gray-200 rounded-t h-[50%]" />
                </div>
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-4">
                   <div className="w-14 h-14 bg-[#f9a8d4] rounded-full opacity-80" />
                </div>
             </div>
         </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS (3 STEPS)
   ═══════════════════════════════════════════════════════ */
const StepsSection = () => (
  <section className="bg-white py-24 px-6 md:px-12">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-[32px] md:text-[36px] font-[900] text-center mb-20 tracking-tight text-[#1c1c1c]">
        How it works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {[
          { icon: <Send className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-[#1c1c1c]" fill="none" />, title: "1. Collect Reviews", desc: "Use our review invitation tools to gather an ongoing stream of reviews from all of your customers, never missing out on feedback." },
          { icon: <Cpu className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-[#1c1c1c]" fill="none" />, title: "2. Our AI engine sorts and analyzes your customers' feedback", desc: "Built to save you time and provide more value from your reviews, our ever-learning AI categorizes topics in your reviews and identifies customer sentiment around them." },
          { icon: <CheckCircle2 className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-[#1c1c1c]" fill="none" />, title: "3. Use your learnings to create better experiences", desc: "Dive deeper into your feedback, and discover what your customers are thinking. Validate business decisions and focus on areas that will give your customers what they truly want." }
        ].map((step, i) => (
          <div key={i} className="text-center px-4 flex flex-col">
            {step.icon}
            <h3 className="text-[20px] font-bold mb-4 px-2 text-[#1c1c1c] leading-tight flex-1 flex flex-col justify-end">{step.title}</h3>
            <p className="text-[14px] text-gray-700 font-medium leading-relaxed">{step.desc}</p>
          </div>
        ))}
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
                <p className="text-[11px] font-bold text-gray-500 mb-6 leading-tight max-w-[150px] text-left">Based on your performance<br/>in the last <strong className="text-black">28 days</strong></p>
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
                     {[1,2,3,4,5].map(i => <div key={i} className={`w-4 h-4 flex items-center justify-center rounded-[1px] ${i===5?'bg-gray-300':'bg-[#00b67a]'}`}><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500"><div className="w-4 h-4 rounded-full bg-gray-200"/>Bjorn Baumann</div>
                </div>
                <p className="text-left w-full font-bold text-[16px] mb-4">Exciting service</p>
                <div className="w-full h-1.5 bg-gray-200 rounded mb-2"/><div className="w-2/3 h-1.5 bg-gray-200 rounded mb-4 shadow" />
                <div className="w-full flex gap-1 justify-start">
                   <span className="bg-[#fbbf24] text-[9px] font-bold px-2 py-1 flex items-center rounded border border-yellow-500 shadow-sm"><PlusCircle className="w-2.5 h-2.5 mr-0.5 inline"/>Add tag</span>
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
                      <div className="flex items-center gap-1 mb-1"><div className="w-3 h-3 rounded-full bg-[#1c1c1c]"/><div className="w-8 h-1 bg-gray-200 rounded"/></div>
                      <div className="flex gap-[1px] mb-1">{[1,2,3,4,5].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px]"/>)}</div>
                      <div className="w-full h-1 bg-gray-200 rounded mb-0.5"/><div className="w-full h-1 bg-[#1c1c1c] rounded mb-0.5"/>
                   </div>
                   <div className="bg-white rounded p-2 shadow border border-gray-100 w-20 opacity-90">
                      <div className="flex gap-[1px] mb-1">{[1,2,3,4].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#005138] rounded-[1px]"/>)}</div>
                      <div className="w-full h-1 bg-gray-200 rounded mb-0.5"/>
                   </div>
                </div>
                
                <div className="flex flex-col gap-2 z-20">
                   <div className="bg-white rounded p-2 shadow border-[1.5px] border-[#1c1c1c] w-24">
                      <div className="flex items-center gap-1 mb-1"><div className="w-3 h-3 rounded-full bg-[#1c1c1c]"/><div className="w-10 h-1 bg-gray-200 rounded"/></div>
                      <div className="w-full h-1.5 bg-gray-200 rounded mb-1"/><div className="w-2/3 h-1.5 bg-gray-200 rounded"/>
                   </div>
                   <div className="bg-white rounded p-2 shadow border border-[#1c1c1c] w-24">
                      <div className="flex gap-[1px] mb-1">{[1,2,3].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px]"/>)}</div>
                      <div className="w-full h-1 bg-gray-200 rounded mb-0.5"/><div className="w-full h-1 bg-gray-200 rounded mb-0.5"/>
                   </div>
                </div>

                <div className="flex flex-col gap-2 mt-8 z-10">
                   <div className="bg-white rounded p-2 shadow border border-[#1c1c1c] w-16 mb-2">
                       <div className="w-5 h-5 bg-[#1c1c1c] rounded mb-1 mx-auto"/>
                       <div className="flex gap-[1px] justify-center">{[1,2].map(i => <div key={i} className="w-2 h-2 bg-yellow-400 rounded-[1px]"/>)}</div>
                   </div>
                   <div className="bg-white rounded p-2 shadow border border-gray-100 w-16 opacity-90">
                      <div className="w-full h-1 bg-gray-200 rounded mb-0.5"/>
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
  <section className="bg-[#f14a79] py-28 px-6 text-center text-[#1c1c1c]">
    <div className="max-w-[800px] mx-auto">
      <h2 className="text-[32px] md:text-[38px] font-[900] mb-10 tracking-tight leading-tight">
        Want to see which review invitation method is right for you?
      </h2>
      <Link to="/request-demo" className="bg-[#4a85fa] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-[#3b72df] transition-all shadow-xl inline-block hover:scale-105">
        Book a demo
      </Link>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT PAGE
   ═══════════════════════════════════════════════════════ */
const ReviewInsights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans antialiased selection:bg-[#1c1c1c] selection:text-white">
      <BusinessNav />
      {/* Spacer so it flows correctly below fixed nav */}
      <div className="pt-0" />
      
      <HeroSection />
      <DidYouKnow />
      <ReviewFollowUpSection />
      <SentimentAnalysisSection />
      <CategorizedFeedbackSection />
      <TruthScoreForecastSection />
      <StepsSection />
      <InterestCards />
      <BottomCTA />
      
      <DetailedFooter />
    </div>
  );
};

export default ReviewInsights;
