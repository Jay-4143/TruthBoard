import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BusinessNav, DetailedFooter } from './ForBusinesses';
import { Star, Mail, ArrowUpRight, Search, Zap, Code, Layout, Sliders, Smartphone, CheckCircle2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   HERO SECTION 
   ═══════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-[#00b67a] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
      <div className="lg:w-1/2">
        <h3 className="text-[14px] font-bold mb-4 tracking-wide text-[#1c1c1c]">TruthBoard widgets</h3>
        <h1 className="text-4xl md:text-5xl md:leading-[1.1] font-[900] mb-6 tracking-tight">
          Reviews in the right place at the right time
        </h1>
        <p className="text-[18px] font-medium mb-10 leading-relaxed text-[#1c1c1c] max-w-[440px]">
          Turn reviews into revenue by displaying them on your website — so shoppers have everything they need to reach the order confirmation page.
        </p>
        <Link to="/request-demo" className="bg-[#1c1c1c] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all hover:scale-105 shadow-xl inline-block">
          Book a demo
        </Link>
      </div>

      <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-[500px] w-full items-center">
        {/* Background dark green blobs */}
        <div className="absolute right-[10%] w-[400px] h-[400px] bg-[#009b68] rounded-[60px] blur-[2px] rotate-12 opacity-80 mix-blend-multiply" />
        <div className="absolute right-[25%] w-[300px] h-[300px] bg-[#009b68] rounded-[60px] blur-[2px] -rotate-12 opacity-60 mix-blend-multiply" />

        {/* Hero Phone Mockup */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          className="relative w-[260px] h-[520px] bg-[#eefaf4] border-[12px] border-[#1c1c1c] rounded-[36px] shadow-2xl z-20 flex flex-col items-center pt-8 overflow-hidden"
        >
          <div className="absolute top-0 w-[100px] h-[20px] bg-[#1c1c1c] rounded-b-[14px] z-30" />
          <div className="w-[85%] h-8 bg-white rounded-full mt-2 mb-6" />
          
          <div className="w-[85%] flex-1 bg-white rounded-t-2xl shadow-inner p-3 overflow-hidden flex flex-col gap-3">
             <div className="w-full h-[60px] bg-[#005138] rounded-lg p-2 flex flex-col justify-end">
                <div className="flex justify-between items-center text-white">
                   <div className="flex gap-[2px]">
                     {[1,2,3,4,5].map(i=><div key={i} className={`w-3 h-3 flex items-center justify-center rounded-[1px] ${i===5?'bg-white/30':'bg-[#00b67a]'}`}><Star className="w-2 h-2 text-white fill-current"/></div>)}
                   </div>
                   <span className="text-[7px]">437 reviews</span>
                </div>
             </div>
             
             {/* Mock reviews */}
             <div className="flex gap-2">
                <div className="w-[80%] shrink-0 h-[70px] bg-white border border-gray-100 shadow-sm rounded-md p-2">
                   <div className="flex gap-1 mb-1">
                     {[1,2,3,4,5].map(i=><div key={i} className="w-2.5 h-2.5 bg-[#00b67a] flex outline outline-[0.5px] outline-white items-center justify-center rounded-[1px]"/>)}
                   </div>
                   <div className="w-full h-1 bg-gray-200 mb-1"/><div className="w-3/4 h-1 bg-gray-200" />
                </div>
                <div className="w-[80%] shrink-0 h-[70px] bg-white border border-gray-100 shadow-sm rounded-md p-2">
                   <div className="flex gap-1 mb-1">
                     {[1,2,3,4,5].map(i=><div key={i} className={`w-2.5 h-2.5 flex outline outline-[0.5px] outline-white items-center justify-center rounded-[1px] ${i>3?'bg-gray-300':'bg-[#00b67a]'}`}/>)}
                   </div>
                   <div className="w-full h-1 bg-gray-200 mb-1"/><div className="w-2/3 h-1 bg-gray-200" />
                </div>
             </div>

             <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="col-span-1 h-16 bg-[#e6fcf5] rounded border border-[#00b67a]/20" />
                <div className="col-span-2 h-16 border border-gray-200 flex flex-col p-2 gap-1 rounded">
                   <div className="w-full h-1.5 bg-gray-200"/><div className="w-full h-1.5 bg-gray-200"/><div className="w-1/2 h-1.5 bg-gray-200"/>
                </div>
             </div>
             <div className="w-full h-8 bg-gray-100 rounded-md mt-auto mb-2 flex items-center justify-center">
                 <span className="text-[8px] font-bold mr-1">See our <strong className="text-black text-[9px]">437</strong> reviews on</span>
                 <Star className="w-2.5 h-2.5 text-[#00b67a] fill-current" />
                 <span className="text-[8px] font-bold text-black ml-0.5">TruthBoard</span>
             </div>
          </div>
        </motion.div>

        {/* Floating Pills w/ Arrows */}
        <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute z-30 top-[20%] left-0 xl:-left-[5%] bg-white px-4 py-2 rounded-xl shadow-lg font-[900] text-[15px] flex items-center gap-2 border border-gray-100">
          TruthBoard review <ArrowUpRight className="w-5 h-5" />
        </motion.div>
        <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute z-30 top-[50%] right-[0%] bg-white px-4 py-2 rounded-xl shadow-lg font-[900] text-[15px] flex items-center gap-2 border border-gray-100">
          <ArrowUpRight className="w-5 h-5 transform -rotate-90" /> TruthBoard widgets
        </motion.div>
        <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute z-30 bottom-[10%] left-[5%] bg-white px-4 py-2 rounded-xl shadow-lg font-[900] text-[15px] flex items-center gap-2 border border-gray-100">
          Micro Review count <ArrowUpRight className="w-5 h-5" />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   DID YOU KNOW
   ═══════════════════════════════════════════════════════ */
const DidYouKnow = () => (
  <section className="bg-[#e6fcf5] py-28 px-6 md:px-12 text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto">
      <h4 className="text-[13px] font-bold mb-6 tracking-wide">Did you know?</h4>
      <h2 className="text-[32px] md:text-[44px] font-[900] leading-[1.1] max-w-4xl tracking-tight mb-8">
        73.6% of TruthBoard visitors say they are more likely to make a purchase from a website that's displaying TruthBoard reviews on-site.
      </h2>
      <p className="text-[14px] font-bold">
        * Based on internal survey to 4,027 TruthBoard visitors in May 2018
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   FLEX WIDGET
   ═══════════════════════════════════════════════════════ */
const FlexWidgetSection = () => (
  <section className="bg-white py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      <div className="md:w-1/2 relative z-20">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Flex widget</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight max-w-lg">
          Bring trust to any corner of your website
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium max-w-[420px]">
          Easily customize widgets by size, color and trust signals to fit any page on your website and align to your brand. Choose to highlight your TruthScore, review volume, or word rating, and even display recent or favorite reviews.
        </p>
      </div>

      <div className="md:w-1/2 relative h-[500px] w-full flex justify-center items-center font-sans">
        <div className="absolute w-[500px] h-[500px] bg-[#fbfbfb] rounded-full z-0 top-10 right-0" />
        
        <div className="relative z-10 w-[360px] flex flex-col gap-6">
           {/* Top Widget (Red Accent) */}
           <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full bg-[#1c1c1c] text-white rounded-[16px] overflow-hidden shadow-2xl flex border border-[#333]">
              <div className="flex-1 p-5">
                 <p className="font-[900] text-lg mb-4">Rated <span className="font-bold">4.1</span> out of 5 stars</p>
                 <p className="text-[12px] font-bold mb-1">Rated <span className="font-bold">Great</span></p>
                 <div className="flex gap-[1.5px] mb-2">
                   {[1,2,3,4,5].map(i => <div key={i} className={`w-5 h-5 flex items-center justify-center rounded-[1.5px] ${i===5?'bg-gray-400':'bg-[#00b67a]'}`}><Star className="w-3.5 h-3.5 text-white fill-current"/></div>)}
                 </div>
                 <p className="text-[10px] text-gray-400">Banking & Money</p>
              </div>
              <div className="w-[120px] bg-[#ff4e4e] relative flex flex-col items-center justify-center shrink-0">
                 <div className="absolute -left-6 bottom-0 w-12 h-12 bg-[#ff4e4e] rounded-tr-[50px] z-0" />
                 <Star className="w-5 h-5 text-[#00b67a] fill-current absolute bottom-4 left-6 z-10" />
                 <span className="font-bold text-white text-[15px] absolute bottom-4 left-12 z-10 tracking-tight">TruthBoard</span>
                 <div className="absolute top-6 right-6 z-10">
                   <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white"/></div>
                 </div>
              </div>
           </motion.div>

           {/* Middle Thin Widget */}
           <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="w-[90%] mx-auto bg-[#1c1c1c] text-white rounded-[12px] overflow-hidden shadow-xl flex border border-[#333]">
              <div className="w-[80px] shrink-0 bg-[#b794f6] relative flex items-center justify-center">
                 <div className="absolute -right-4 top-0 w-8 h-1/2 bg-[#b794f6] rounded-br-[20px]" />
                 <CheckCircle2 className="w-6 h-6 text-[#1c1c1c] z-10" />
              </div>
              <div className="flex-1 p-3 px-6 flex items-center justify-between z-10 bg-[#1c1c1c]">
                 <div>
                    <p className="font-bold text-[10px] mb-1">Rated 4.1 out of 5</p>
                    <div className="flex gap-[1px]">
                      {[1,2,3,4,5].map(i => <div key={i} className={`w-3.5 h-3.5 flex items-center justify-center rounded-[1px] ${i===5?'bg-gray-400':'bg-[#00b67a]'}`}><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}
                    </div>
                 </div>
                 <div className="flex items-center gap-1">
                   <Star className="w-3 h-3 text-[#00b67a] fill-current" />
                   <span className="font-bold text-[11px] tracking-tight">TruthBoard</span>
                 </div>
              </div>
           </motion.div>

           {/* Bottom Widget (Purple Accent) */}
           <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="w-full bg-[#1c1c1c] text-white rounded-[16px] overflow-hidden shadow-2xl flex border border-[#333]">
              <div className="flex-1 p-5 pb-8 relative z-10 bg-[#1c1c1c]">
                 <p className="text-xl font-[900] leading-tight mb-8">Rated <span className="font-bold">4.1</span><br/>out of 5 stars</p>
                 <p className="text-[10px] font-bold mb-1"><span className="font-bold text-[12px]">32,554</span> reviews</p>
                 <div className="flex gap-[1.5px]">
                   {[1,2,3,4,5].map(i => <div key={i} className={`w-5 h-5 flex items-center justify-center rounded-[1.5px] ${i===5?'bg-gray-400':'bg-[#00b67a]'}`}><Star className="w-3.5 h-3.5 text-white fill-current"/></div>)}
                 </div>
              </div>
              <div className="w-[120px] bg-[#b794f6] relative flex flex-col items-center justify-start pt-6 shrink-0">
                 <div className="absolute -left-6 top-0 w-12 h-16 bg-[#b794f6] rounded-br-[50px] z-0" />
                 <div className="w-10 h-10 rounded-full border border-[#1c1c1c] flex items-center justify-center z-10 text-[#1c1c1c]">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                 </div>
                 <div className="absolute bottom-6 left-6 flex items-center gap-1 w-full z-10">
                   <Star className="w-5 h-5 text-[#00b67a] fill-current" />
                    <span className="font-bold text-white text-[15px] tracking-tight">TruthBoard</span>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   REVIEW HIGHLIGHTS
   ═══════════════════════════════════════════════════════ */
const ReviewHighlightsSection = () => (
  <section className="bg-white py-20 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-center gap-16 relative z-10">
      
      <div className="md:w-1/2 relative h-[500px] w-full flex justify-center items-center overflow-hidden">
        {/* Abstract typography background */}
        <div className="absolute inset-0 flex flex-col justify-center gap-2 select-none pointer-events-none z-0">
          {[...Array(5)].map((_, i) => (
             <div key={i} className="text-[#00b67a] text-opacity-10 text-[100px] font-bold leading-[0.8] tracking-tighter ml-[-20%] w-[150%] whitespace-nowrap">
               Highlight Highlight Highlight
             </div>
          ))}
        </div>
        
        {/* Intersecting Cards */}
        <div className="relative z-10 w-[300px] h-[300px]">
           <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-[260px] h-[160px] bg-[#dcfce7] rounded-2xl shadow-xl flex flex-col justify-center p-6 border border-white border-opacity-50 blur-[0.5px]">
              <div className="flex gap-2 mb-6 items-center">
                 <div className="w-3 h-3 bg-[#00b67a] rounded-full" />
                 <div className="h-2.5 w-[60%] bg-[#00b67a] rounded" />
              </div>
              <div className="h-1.5 w-full bg-[#00b67a]/50 rounded mb-2.5" />
              <div className="h-1.5 w-full bg-[#00b67a]/50 rounded mb-2.5" />
              <div className="h-1.5 w-[40%] bg-[#00b67a]/50 rounded" />
              <div className="absolute bottom-4 left-6 flex gap-1.5">
                {[1,2,3].map(i=><div key={i} className="w-3 h-3 bg-[#00b67a]/30 rounded-full"/>)}
              </div>
           </motion.div>

           <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-4 -right-10 w-[260px] h-[160px] bg-[#00b67a] rounded-3xl shadow-[0_20px_40px_rgba(0,182,122,0.3)] flex flex-col justify-center p-6">
              <div className="flex gap-2 mb-6 items-center">
                 <div className="w-3 h-3 bg-white rounded-full" />
                 <div className="h-2.5 w-[60%] bg-white rounded" />
              </div>
              <div className="h-1.5 w-full bg-white/50 rounded mb-2.5" />
              <div className="h-1.5 w-full bg-white/50 rounded mb-2.5" />
              <div className="h-1.5 w-[40%] bg-white/50 rounded" />
           </motion.div>
        </div>
      </div>

      <div className="md:w-1/2 relative z-20">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Review highlights</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Accelerate conversions with relevant customer quotes
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Automatically display quotes grouped by AI-driven topics that highlight your business's strengths at key points in your website's customer journey - like showcasing reviews about fast delivery at checkout. Boost your website visitors' confidence and accelerate conversions.
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   INCREASE CONVERSIONS (Tumbling Widgets)
   ═══════════════════════════════════════════════════════ */
const IncreaseConversionsSection = () => (
  <section className="bg-white py-20 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      
      <div className="md:w-[45%]">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">TrustBox Widgets</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Increase conversions and sales on your site
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Boost your conversion rates, increase basket size, and reduce cart abandonment by putting TrustBox widgets on your site.
        </p>
      </div>

      <div className="md:w-[55%] relative h-[500px] w-full flex justify-center items-center">
        <div className="absolute w-[450px] h-[450px] bg-[#fbfbfb] rounded-full z-0 pointer-events-none" />
        
        {/* Background Mint Phones/Shapes */}
        <div className="absolute top-[20%] right-[10%] w-[180px] h-[360px] bg-[#bdf0db] rounded-[24px] rotate-12 z-10 border border-[#00b67a]/10" />
        <div className="absolute top-[30%] left-[10%] w-[160px] h-[320px] bg-[#bdf0db] rounded-[24px] -rotate-[15deg] z-10 border border-[#00b67a]/10" />

        {/* Foreground Widgets */}
        <motion.div initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.6}} viewport={{once:true}} className="absolute top-[15%] left-[5%] w-[380px] bg-white border border-[#1c1c1c] rounded-[16px] shadow-xl p-4 z-20">
           <div className="flex justify-between items-start">
             <div>
                <h3 className="text-2xl font-[900] text-black">Excellent</h3>
                <div className="flex gap-[2px] mt-1 mb-2">
                   {[1,2,3,4,5].map(i=><div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-[2px]"><Star className="w-3.5 h-3.5 text-white fill-current"/></div>)}
                </div>
                <p className="text-[8px] text-gray-400 font-bold mb-1">Based on <strong className="text-black">34,275</strong> reviews</p>
                <div className="flex items-center gap-1 mt-1">
                   <Star className="w-3.5 h-3.5 text-[#00b67a] fill-current" />
                   <span className="text-[11px] font-bold tracking-tight text-black">TruthBoard</span>
                </div>
             </div>
             <div className="flex gap-2">
                <div className="w-[100px] bg-gray-50 border border-gray-100 rounded p-2">
                   <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i=><div key={i} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px]"/>)}</div>
                   <div className="h-1.5 w-3/4 bg-gray-300 rounded mb-1"/><div className="h-1.5 w-full bg-gray-200 rounded mb-1"/><div className="h-1.5 w-[60%] bg-gray-200 rounded"/>
                </div>
                <div className="w-[100px] bg-gray-50 border border-gray-100 rounded p-2">
                   <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i=><div key={i} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px]"/>)}</div>
                   <div className="h-1.5 w-[80%] bg-gray-300 rounded mb-1"/><div className="h-1.5 w-full bg-gray-200 rounded mb-1"/><div className="h-1.5 w-[40%] bg-gray-200 rounded"/>
                </div>
             </div>
           </div>
        </motion.div>

        <motion.div initial={{y:40, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.6, delay:0.2}} viewport={{once:true}} className="absolute top-[45%] right-0 w-[260px] bg-white border border-[#1c1c1c] rounded-xl shadow-xl p-3 px-4 z-30 flex items-center justify-between">
            <span className="text-xl font-[900]">Excellent</span>
            <div className="flex gap-[1px]">
               {[1,2,3,4,5].map(i=><div key={i} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}
            </div>
            <div className="flex items-center gap-0.5">
               <Star className="w-3.5 h-3.5 text-[#00b67a] fill-current" />
               <span className="text-[11px] font-bold tracking-tight text-black">Truthboard</span>
            </div>
        </motion.div>

        <motion.div initial={{y:50, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.6, delay:0.4}} viewport={{once:true}} className="absolute bottom-[0%] left-[10%] w-[260px] bg-white border border-[#1c1c1c] rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-4 py-5 z-40 text-center flex flex-col items-center rotate-[-4deg]">
            <div className="flex items-center gap-1.5 mb-3">
               <Star className="w-7 h-7 text-[#00b67a] fill-current" />
               <span className="text-[28px] font-bold tracking-tight text-black leading-none">TruthBoard</span>
            </div>
            <div className="flex gap-[3px] mb-3">
               {[1,2,3,4,5].map(i=><div key={i} className={`w-8 h-8 flex items-center justify-center rounded-[3px] ${i===5?'bg-gray-200':'bg-[#00b67a]'}`}><Star className="w-5 h-5 text-white fill-current"/></div>)}
            </div>
            <p className="text-[11px] font-bold text-gray-600">TruthScore <strong className="text-black">4.9</strong> | <strong className="text-black">34,275</strong> reviews</p>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   EMAIL MARKETING
   ═══════════════════════════════════════════════════════ */
const EmailMarketingSection = () => (
  <section className="bg-white py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-center gap-16 relative z-10">
      
      <div className="md:w-1/2 relative h-[500px] w-full flex justify-center items-center">
        <div className="absolute w-[450px] h-[450px] bg-[#f5f5f5] rounded-full z-0 mix-blend-multiply" />
        
        <div className="relative w-[280px] h-[480px] bg-[#eefaf4] border-[12px] border-[#1c1c1c] rounded-[40px] shadow-2xl z-20 flex flex-col items-center pt-8 overflow-hidden">
           <div className="absolute top-0 w-[120px] h-[20px] bg-[#1c1c1c] rounded-b-[16px] z-30" />
           <div className="absolute -left-6 top-8 w-12 h-12 bg-white rounded-full border border-gray-200 shadow-lg flex items-center justify-center z-40">
             <Mail className="w-6 h-6 text-[#1c1c1c]" />
           </div>
           
           <div className="w-[85%] mt-6 flex-1 bg-white rounded-t-xl shadow p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2 border-b border-gray-100 pb-3">
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold">To:</span><div className="h-3 w-16 bg-gray-200 rounded" />
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold">From:</span><div className="h-3 w-24 bg-gray-200 rounded" />
                 </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                 <div className="h-2 w-full bg-gray-200 rounded" />
                 <div className="h-2 w-full bg-gray-200 rounded" />
                 <div className="h-2 w-[80%] bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col gap-2 mt-4 mb-auto">
                 <div className="h-2 w-full bg-gray-200 rounded" />
                 <div className="h-2 w-full bg-gray-200 rounded" />
                 <div className="h-2 w-[40%] bg-gray-200 rounded" />
              </div>

              {/* Email Footer / TrustBox Signature */}
              <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-4 h-4 bg-[#1c1c1c] rounded-full" />
                       <div className="w-10 h-2 bg-gray-200 rounded" />
                    </div>
                    <div className="flex gap-[1px]">
                       {[1,2,3,4,5].map(i=><div key={i} className={`w-4 h-4 flex items-center justify-center rounded-[1px] ${i===5?'bg-gray-300':'bg-[#00b67a]'}`}><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}
                    </div>
                 </div>
                 <div className="flex gap-1">
                   <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center"><Instagram className="w-2.5 h-2.5 text-gray-500" /></div>
                   <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center"><Facebook className="w-2.5 h-2.5 text-gray-500" /></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="md:w-1/2">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Email Marketing TrustBoxes</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Show your true colors in every email
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Dynamic Truthboard widgets for your email signature and email <a href="#" className="underline decoration-1 hover:decoration-2">marketing campaigns</a> add a little extra credibility that can make a big difference.
        </p>
      </div>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   DISPLAY API
   ═══════════════════════════════════════════════════════ */
const DisplayAPISection = () => (
  <section className="bg-[#00b67a] py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      
      <div className="md:w-1/2 pr-10">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide">Display API</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Create a custom review display
        </h2>
        <p className="text-[18px] leading-relaxed font-medium">
          Want to make something unique? With Truthboard's API you can create a custom display of your Truthboard reviews on your site and make your stars shine.
        </p>
      </div>

      <div className="md:w-1/2 relative h-[500px] w-full flex justify-center items-center">
        {/* Background dark blob */}
        <div className="absolute w-[450px] h-[450px] bg-[#009b68] rounded-full blur-[2px] opacity-80 mix-blend-multiply top-0 left-0" />
        
        {/* Browser window graphic */}
        <div className="relative z-10 w-[420px] h-[300px] border-[3px] border-[#1c1c1c] rounded-xl overflow-hidden shadow-2xl group flex flex-col bg-white">
           <div className="h-6 border-b-[3px] border-[#1c1c1c] flex items-center px-2 gap-1.5 shrink-0 bg-[#eefaf4]">
              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-green-400" />
           </div>
           
           <div className="flex-1 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80" alt="Strawberries" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[15s]" />
              
              <div className="absolute top-6 left-6 w-[180px] bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-[#1c1c1c] rounded-full" />
                    <span className="text-[10px] font-bold">Joe Ford</span>
                 </div>
                 <div className="flex gap-[1px] mb-2">{[1,2,3,4,5].map(i=><div key={i} className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}</div>
                 <p className="text-[14px] font-bold leading-tight text-black">My desserts have become marvelous.</p>
              </div>

              <div className="absolute top-[30%] right-6 w-[180px] bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-[#1c1c1c] rounded-full" />
                    <span className="text-[10px] font-bold">Kasia Puchalska</span>
                 </div>
                 <div className="flex gap-[1px] mb-2">{[1,2,3,4,5].map(i=><div key={i} className={`w-3.5 h-3.5 flex items-center justify-center rounded-[1px] ${i===5?'bg-gray-300':'bg-yellow-400'}`}><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}</div>
                 <p className="text-[13px] font-[800] leading-tight text-black">Good service but some of the food was slightly old.</p>
              </div>

              <div className="absolute bottom-6 left-[15%] w-[180px] bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-[#1c1c1c] rounded-full" />
                    <span className="text-[10px] font-bold">Gemma Winston</span>
                 </div>
                 <div className="flex gap-[1px] mb-2">{[1,2,3,4,5].map(i=><div key={i} className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-2.5 h-2.5 text-white fill-current"/></div>)}</div>
                 <p className="text-[13px] font-[800] leading-tight text-black">I am very happy to have fresh and healthy products, directly from local farms.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   ADDITIONAL FEATURES 
   ═══════════════════════════════════════════════════════ */
const AdditionalFeaturesSection = () => (
  <section className="bg-[#044124] py-24 px-6 md:px-12 text-white">
    <div className="max-w-[1200px] mx-auto text-center">
      <h2 className="text-[32px] md:text-[36px] font-[900] mb-16 tracking-tight">Additional Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
         <div>
            <h3 className="text-[20px] font-bold mb-4">Targeted TrustBox</h3>
            <p className="text-[15px] font-medium leading-relaxed opacity-90 max-w-sm mx-auto">
              Show customers the most relevant reviews for them. The Targeted TrustBox displays only your tagged reviews on your site.
            </p>
         </div>
         <div>
            <h3 className="text-[20px] font-bold mb-4">Responsive design</h3>
            <p className="text-[15px] font-medium leading-relaxed opacity-90 max-w-sm mx-auto">
              All TrustBoxes are responsive. They adapt to fit different screen sizes and can be configured to different height and width attributes for your page.
            </p>
         </div>
         <div>
            <h3 className="text-[20px] font-bold mb-4">Product Attribute Ratings</h3>
            <p className="text-[15px] font-medium leading-relaxed opacity-90 max-w-sm mx-auto">
              Attribute Ratings give your customers a more detailed view of your products, making it easier for them to choose what to buy.
            </p>
         </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS (4 STEPS)
   ═══════════════════════════════════════════════════════ */
const StepsSection = () => (
  <section className="bg-white py-32 px-6 md:px-12">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-[32px] md:text-[36px] font-[900] text-center mb-20 tracking-tight text-[#1c1c1c]">
        How it works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <Layout className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-[#1c1c1c]" fill="none" />, title: "1. Choose your TrustBox widget", desc: "Filters help you sort through the different TrustBox types, until you find what fits your site best." },
          { icon: <Sliders className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-[#1c1c1c]" fill="none" />, title: "2. Configure your TrustBox", desc: "Choose from light or dark versions, review filters, SEO options, and a suitable width and height for your site." },
          { icon: <Code className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-[#1c1c1c]" fill="none" />, title: "3. Get the code", desc: "With the click of a button, Truthboard generates the code for the TrustBox widget you've designed." },
          { icon: <Smartphone className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-[#1c1c1c]" fill="none" />, title: "4. Implement your TrustBox", desc: "If you're using an eCommerce integration, you can drag-and-drop your widget onto your site. Otherwise, simply copy and paste the HTML." }
        ].map((step, i) => (
          <div key={i} className="text-center px-4">
            {step.icon}
            <h3 className="text-[20px] font-bold mb-4 px-2 text-[#1c1c1c] leading-tight">{step.title}</h3>
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
        {/* Card 1 */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#fff100] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-6 border-2 border-transparent group-hover:border-black/5 transition-all">
             {/* Yellow mock graphic */}
             <div className="w-full flex h-full items-center justify-center gap-4 relative z-10">
                <div className="flex flex-col gap-2">
                   <Facebook className="text-[#1c1c1c] w-6 h-6 fill-current"/>
                   <Twitter className="text-[#1c1c1c] w-6 h-6 fill-current"/>
                   <Linkedin className="text-[#1c1c1c] w-6 h-6 fill-current"/>
                   <Instagram className="text-[#1c1c1c] w-6 h-6"/>
                </div>
                <div className="w-32 h-32 bg-[#ff5eaf] rounded-full flex flex-col items-center justify-center shadow-lg relative z-20 shrink-0 border border-[#1c1c1c]">
                   <span className="text-[20px] font-bold leading-tight text-[#1c1c1c] tracking-tight">People<br/>love us</span>
                   <div className="flex items-center gap-0.5 mt-2"><Star className="w-3.5 h-3.5 text-black fill-current"/><span className="text-[11px] font-bold">Truthboard</span></div>
                </div>
                {/* Polaroid in bg */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-28 bg-white p-2 pb-6 shadow-xl border border-[#1c1c1c] rotate-12 z-0">
                   <div className="w-full h-full bg-gray-200 outline outline-1 outline-gray-300">
                     <img src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover grayscale opacity-50" alt="Sofa"/>
                   </div>
                   <div className="absolute bottom-2 right-2"><Zap className="w-3 h-3 text-[#1c1c1c] fill-current"/></div>
                </div>
             </div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Social Media Tools</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            Share trust on every social network. Automatically share Truthboard reviews on your company's Facebook page, and turn your best reviews into attention grabbing images...
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2">Read more</a>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#ff8e2d] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-6 border-2 border-transparent group-hover:border-black/5 transition-all">
             {/* Abstract Brochure Graphic */}
             <div className="w-[80%] h-[120px] bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex relative border-[3px] border-[#1c1c1c] overflow-visible">
                <div className="w-1/3 border-r-[3px] border-[#1c1c1c] p-2 flex flex-col gap-1 justify-center relative translate-y-[-10px] transform">
                   <div className="w-full h-8 bg-[#1c1c1c]/10" />
                   <div className="w-full h-2 bg-[#1c1c1c]/10" />
                   <div className="w-full h-2 bg-[#1c1c1c]/10" />
                </div>
                <div className="w-1/3 border-r-[3px] border-[#1c1c1c] p-2 flex flex-col gap-1 justify-center translate-y-[10px] transform bg-gray-50">
                    <div className="w-full h-2 bg-[#1c1c1c]/10" />
                    <div className="w-full h-10 bg-[#1c1c1c]/10" />
                </div>
                <div className="w-1/3 p-2 flex flex-col items-center justify-center relative translate-y-[-5px] transform shrink-0">
                   <div className="absolute -bottom-10 -right-8 w-20 h-20 bg-white border-[3px] border-[#1c1c1c] rounded-full flex flex-col items-center justify-center shadow-lg z-20">
                      <div className="flex items-center gap-0.5 justify-center mt-1 w-full"><Star className="w-4 h-4 text-[#00b67a] fill-current"/><span className="text-[11px] font-bold">Truthboard</span></div>
                      <div className="flex gap-[1px] mt-1">{[1,2,3,4,5].map(i=><div key={i} className="w-2.5 h-2.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"/>)}</div>
                   </div>
                </div>
             </div>
             {/* Decorative small triangles */}
             <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0L20 20H0L10 0z\' fill=\'%23000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '20px',  }}></div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Marketing Assets</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            The power of Truthboard reviews goes far beyond the boundaries of your website. With Truthboard Marketing Assets, you can add credibility and improve the performance of TV Ads...
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2">Read more</a>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#ffb6c1] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-6 border-2 border-transparent group-hover:border-black/5 transition-all">
             {/* Pink Mockup Graphic */}
             <div className="w-[180px] h-[260px] bg-white border-[6px] border-[#1c1c1c] rounded-[24px] shadow-2xl relative translate-y-10 group-hover:translate-y-8 transition-transform">
                <div className="p-3 w-full bg-gray-50 border-b border-gray-200">
                   <p className="font-bold text-[10px] mb-1">Product Attributes</p>
                </div>
                <div className="p-3">
                   <div className="flex items-start gap-2 mb-3">
                      <div className="w-10 h-10 border border-gray-200 rounded shrink-0 flex items-center justify-center bg-gray-50"><div className="w-6 h-6 rounded border-2 border-[#1c1c1c] border-t-0 rounded-t-full"/></div>
                      <div>
                        <p className="text-[9px] font-bold leading-tight">Smart Wired headphones<br/>Black</p>
                        <div className="flex gap-[1px] mt-1">{[1,2,3,4,5].map(i=><div key={i} className="w-2.5 h-2.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-[6px] h-[6px] text-white fill-current"/></div>)}<span className="text-[7px] text-gray-400 ml-1 mt-0.5">240</span></div>
                      </div>
                   </div>
                   <div className="inline-block border border-gray-200 rounded px-1 min-w-[50px] mb-2"><span className="text-[9px] font-bold">Comfort</span></div>
                   <div className="w-full flex items-center justify-between mb-1 text-[8px] font-bold text-gray-400"><span>Excellent</span><div className="w-16 h-2 bg-[#00b67a] rounded" /></div>
                   <div className="w-full flex items-center justify-between text-[8px] font-bold text-gray-400"><span>Great</span><div className="w-16 h-2 bg-[#00b67a]/40 rounded" /></div>
                </div>
             </div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Product Reviews</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            Share product reviews throughout your site to create confidence wherever shoppers are thinking about making a purchase. Match them to the look and feel of your brand...
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
  <section className="bg-[#00e676] py-28 px-6 text-center text-[#1c1c1c]">
    <div className="max-w-[800px] mx-auto">
      <h2 className="text-[36px] md:text-[42px] font-[900] mb-10 tracking-tight leading-tight">
        Put trusted reviews on your site today
      </h2>
      <Link to="/request-demo" className="bg-[#7b61ff] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-[#684be6] transition-all shadow-xl inline-block hover:scale-105">
        Book a demo
      </Link>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT PAGE
   ═══════════════════════════════════════════════════════ */
const TrustBoxWidgets = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans antialiased selection:bg-[#00b67a] selection:text-white">
      <BusinessNav />
      {/* Spacer so it flows correctly below fixed nav */}
      <div className="pt-0" />
      
      <HeroSection />
      <DidYouKnow />
      <FlexWidgetSection />
      <ReviewHighlightsSection />
      <IncreaseConversionsSection />
      <EmailMarketingSection />
      <DisplayAPISection />
      <AdditionalFeaturesSection />
      <StepsSection />
      <InterestCards />
      <BottomCTA />
      
      <DetailedFooter />
    </div>
  );
};

export default TrustBoxWidgets;
