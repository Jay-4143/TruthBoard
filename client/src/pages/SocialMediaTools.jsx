import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BusinessNav, DetailedFooter } from './ForBusinesses';
import { Star, Instagram, Linkedin, Facebook, Twitter, Settings, Download, Search, Image as ImageIcon } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   HERO SECTION - Green Background
   ═══════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-[#00b67a] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
      
      {/* Left Text Column */}
      <div className="lg:w-1/2">
        <h3 className="text-[14px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Social Media Tools</h3>
        <h1 className="text-4xl md:text-5xl font-[900] leading-[1.1] mb-6 text-[#1c1c1c] tracking-tight">
          Stand out in social - effortlessly
        </h1>
        <p className="text-[18px] font-medium mb-10 leading-relaxed text-[#1c1c1c] max-w-[420px]">
          Let your customers speak on your behalf and be a trusted brand on every social network
        </p>
        <Link to="/request-demo" className="bg-[#1c1c1c] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all hover:scale-105 shadow-xl inline-block">
          Book a demo
        </Link>
      </div>

      {/* Right Graphic Column: Tablets / Phones overlap */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-[500px] w-full items-center">
        {/* Dark green blobs */}
        <div className="absolute right-[5%] w-[450px] h-[450px] bg-[#009b68] rounded-full blur-[2px] opacity-40 top-0" />
        <div className="absolute right-[20%] w-[350px] h-[350px] bg-[#009b68] rounded-full blur-[2px] opacity-60 bottom-0" />
        
        {/* Background Tablet Mockup */}
        <div className="absolute right-[15%] w-[480px] h-[320px] border-[10px] border-[#1c1c1c] bg-[#eefaf4] rounded-[24px] shadow-2xl z-10 overflow-hidden flex flex-col justify-end pt-6 pl-6">
          <div className="w-[85%] bg-white rounded-t-[16px] p-6 shadow-xl relative min-h-[220px]">
             {/* Content mimicking the asset builder */}
             <div className="flex gap-4 mb-4">
                <h3 className="text-3xl font-[900] text-black">Excellent</h3>
                <div className="flex gap-0.5 mt-2">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-sm"><Star className="w-3.5 h-3.5 text-white fill-current" /></div>)}
                </div>
             </div>
             <p className="text-[11px] text-gray-500 font-bold mb-4">Based on <strong className="text-black">34,275</strong> reviews</p>
             <div className="flex items-center gap-1 mt-6">
                <Star className="w-5 h-5 text-[#00b67a] fill-current" />
                <span className="text-lg font-bold tracking-tight">Truthboard</span>
             </div>
          </div>
        </div>

        {/* Foreground Phone Mockup */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute right-[2%] w-[240px] h-[440px] border-[12px] border-[#1c1c1c] bg-[#f8f5ed] rounded-[36px] shadow-2xl z-20 overflow-hidden"
        >
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-[#1c1c1c] rounded-b-[12px] z-30" />
          
          <div className="p-4 pt-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#1c1c1c] rounded-full shadow" />
              <div className="flex flex-col">
                 <div className="h-1.5 w-16 bg-gray-300 rounded mb-1" />
                 <div className="h-1.5 w-10 bg-gray-200 rounded" />
              </div>
            </div>
            {/* Post image/content */}
            <div className="w-full h-[240px] bg-[#00b67a] rounded-[16px] p-4 relative shadow-inner">
               <div className="bg-white p-3 rounded-xl shadow-lg relative z-20 mt-4">
                  <p className="text-[9px] leading-tight font-medium text-gray-800 mb-2">
                    "I really love the service and the prices were very fair. Even though I picked express, the shipping took too long!"
                  </p>
                  <p className="text-[7px] text-gray-400 font-bold mb-1">Jonas Hansen</p>
                  <div className="flex gap-0.5 mb-2">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-1.5 h-1.5 text-white fill-current" /></div>)}
                  </div>
                  <div className="mt-2 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 text-[#00b67a] fill-current" />
                    <span className="text-[8px] font-bold tracking-tight text-black">Truthboard</span>
                  </div>
               </div>
               
               {/* Decorative background shapes */}
               <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#009b68] rounded-tl-[100px] z-10" />
               <div className="absolute top-4 right-4 w-12 h-12 bg-[#009b68] rounded-full z-10" />
               <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#009b68] rounded-full z-10" />
            </div>

            <div className="mt-4 px-1">
               <p className="text-[9px] font-bold text-gray-600 mb-2">542 likes</p>
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-300" />
                  <div className="flex-1 space-y-1">
                     <div className="h-1.5 w-full bg-gray-200 rounded" />
                     <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
                  </div>
               </div>
            </div>
          </div>
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
      <h4 className="text-[13px] font-bold mb-6">Did you know?</h4>
      <h2 className="text-[32px] md:text-[44px] font-[900] leading-tight max-w-4xl tracking-tight mb-8">
        91% of millennials trust online reviews as much as a personal recommendation
      </h2>
      <a href="#" className="text-[13px] text-black font-bold underline underline-offset-4 decoration-1 hover:decoration-2 transition-all">
        BrightLocal consumer review survey
      </a>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   ASSET BUILDER GRID
   ═══════════════════════════════════════════════════════ */
const AssetBuilder = () => (
  <section className="bg-[#fbfbfb] py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
      
      {/* Left Graphic: Tilted Grid */}
      <div className="lg:w-1/2 relative h-[600px] w-full flex justify-center items-center">
        {/* Faint circle background */}
        <div className="absolute w-[450px] h-[450px] bg-[#f5f5f5] rounded-full mix-blend-multiply top-20 right-10" />

        <div className="absolute transform -rotate-12 scale-110">
          <div className="grid grid-cols-3 gap-4">
            {/* Row 1 */}
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-3 border border-gray-100">
               <p className="text-[10px] font-bold text-gray-500 text-center leading-tight mt-2">Rated <strong className="text-black text-[12px]">Excellent</strong></p>
            </motion.div>
            <motion.div animate={{ y: [2, -2, 2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center justify-center p-2 border border-gray-100">
               <div className="flex gap-[2px]">
                  {[1,2,3,4,5].map(i => <div key={i} className={`w-5 h-5 flex items-center justify-center rounded-sm ${i===5?'bg-gray-200':'bg-[#00b67a]'}`}><Star className="w-3.5 h-3.5 text-white fill-current" /></div>)}
               </div>
            </motion.div>
            <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3 border border-gray-100">
               <p className="text-xl font-[900] text-black">50K+ <span className="text-[11px] font-bold block text-gray-700">reviews</span></p>
            </motion.div>

            {/* Row 2 */}
            <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3 border border-gray-100">
               <div className="flex items-center gap-1.5">
                  <Star className="w-6 h-6 text-[#00b67a] fill-current" />
                  <span className="text-[20px] font-bold tracking-tight text-black">Truthboard</span>
               </div>
            </motion.div>
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center p-3 border border-gray-100">
               <p className="text-[18px] font-[900] text-black mb-1">Excellent</p>
               <div className="flex gap-px mb-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-[2px]"><Star className="w-2.5 h-2.5 text-white fill-current" /></div>)}
               </div>
            </motion.div>
            <motion.div animate={{ y: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-3 border border-gray-100">
               <div className="flex gap-[2px] mb-2">
                  {[1,2,3,4,5].map(i => <div key={i} className={`w-5 h-5 flex items-center justify-center rounded-sm ${i===5?'bg-[#00b67a] bg-opacity-50':'bg-[#00b67a]'}`}><Star className="w-3.5 h-3.5 text-white fill-current" /></div>)}
               </div>
               <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-[#00b67a] fill-current" />
                  <span className="text-[13px] font-bold tracking-tight text-black">Truthboard</span>
               </div>
            </motion.div>

            {/* Row 3 */}
            <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-3 border border-gray-100">
               <div className="flex items-end gap-1 w-full justify-center">
                  <span className="text-2xl font-[900] text-black leading-none mb-1">4.8</span>
               </div>
               <div className="flex gap-px mb-1.5 mt-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-[2px]"><Star className="w-2.5 h-2.5 text-white fill-current" /></div>)}
               </div>
               <div className="flex items-center gap-0.5 mt-1 border-t border-gray-100 pt-1 w-full justify-center">
                  <Star className="w-3 h-3 text-[#00b67a] fill-current" />
                  <span className="text-[10px] font-bold tracking-tight text-black">Truthboard</span>
               </div>
            </motion.div>
            <motion.div animate={{ y: [2, -2, 2] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col items-start justify-center p-4 border border-gray-100">
               <p className="text-[14px] font-[900] text-black mb-1">Excellent</p>
               <div className="flex gap-[1px] mb-2.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-2 h-2 text-white fill-current" /></div>)}
               </div>
               <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#00b67a] fill-current" />
                  <span className="text-[11px] font-bold tracking-tight text-black">Truthboard</span>
               </div>
            </motion.div>
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 bg-white rounded-2xl shadow-xl flex flex-col items-start justify-center p-3 border border-gray-100">
               <p className="text-[9px] font-bold text-gray-500 mb-1">Rated <strong className="text-black text-[11px]">Excellent</strong></p>
               <div className="flex gap-[1px] mb-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-[8px] h-[8px] text-white fill-current" /></div>)}
               </div>
               <p className="text-[7px] font-medium text-gray-400 mb-2">50K+ reviews</p>
               <div className="flex items-center gap-0.5 border-t border-gray-100 pt-1.5 w-full">
                  <Star className="w-3 h-3 text-[#00b67a] fill-current" />
                  <span className="text-[9px] font-bold tracking-tight text-black">Truthboard</span>
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Text Column */}
      <div className="lg:w-1/2">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Asset builder</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Quickly create high-impact social proof for ads
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium max-w-lg">
          Spend less time waiting in design queues and more time converting customers with ads that drive trust. You can now create customizable social proof ads in minutes.
        </p>
      </div>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   REVIEW IMAGE GENERATOR 
   ═══════════════════════════════════════════════════════ */
const ReviewImageGenerator = () => (
  <section className="bg-white py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
      
      {/* Left Text */}
      <div className="lg:w-[45%]">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Review Image Generator</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Social is noisy - make your reviews loud
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Turn your <a href="#" className="underline decoration-1 hover:decoration-2">best reviews</a> into attention-grabbing images fit for every social channel. The Image Generator does all the designing for you, saving you time, effort and much needed resource.
        </p>
      </div>

      {/* Right Graphic: Abstract Phone + Floating UI elements */}
      <div className="lg:w-[55%] flex justify-center lg:justify-end relative h-[600px] items-center">
        {/* Faint circle background */}
        <div className="absolute w-[450px] h-[450px] bg-[#fbfbfb] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        
        {/* Background photo in the shape of a phone screen */}
        <div className="relative w-[300px] h-[550px] bg-[#1c1c1c] rounded-[48px] shadow-2xl z-10 overflow-hidden group">
          
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a56?auto=format&fit=crop&w=600&q=80" 
            alt="Forest background"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div>
              <p className="text-white/80 font-bold text-xs mb-3">Blue tshirt and shawl</p>
              <h3 className="text-[40px] font-black leading-[1.1] text-white">
                Best<br/>experience<br/>buying<br/>online.
              </h3>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-end mb-4">
                 <div className="flex gap-[3px]">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-7 h-7 bg-[#00b67a] flex items-center justify-center rounded-[3px]"><Star className="w-5 h-5 text-white fill-current" /></div>)}
                 </div>
                 <p className="text-white font-bold text-sm">By Beryl</p>
              </div>
              <div className="flex justify-between items-center text-white/90 text-xs border-t border-white/20 pt-3">
                 <span>Rated 5/5 | 10 reviews</span>
                 <div className="flex items-center gap-1">
                   <Star className="w-3.5 h-3.5 text-[#00b67a] fill-current" />
                   <span className="font-bold tracking-tight">Truthboard</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute inset-0 z-20 pointer-events-none w-full h-full">
          <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] right-[10%] bg-white px-5 py-2.5 rounded-full shadow-lg font-black text-black">
            Write review
          </motion.div>
          <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[20%] right-[3%] bg-white px-5 py-2.5 rounded-full shadow-lg font-black text-black">
            Select image
          </motion.div>
          <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[50%] right-[0%] bg-white px-5 py-2.5 rounded-full shadow-lg font-black text-black">
            Choose colour
          </motion.div>
          <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[62%] right-[12%] bg-white px-5 py-2.5 rounded-full shadow-lg font-black text-black">
            Position
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   HOOTSUITE INTEGRATION
   ═══════════════════════════════════════════════════════ */
const HootsuiteIntegration = () => (
  <section className="bg-[#00e676] py-32 px-6 md:px-12 relative overflow-hidden text-[#1c1c1c]">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      
      {/* Left Graphic */}
      <div className="md:w-1/2 relative h-[500px] flex justify-center items-center">
        {/* Background shapes */}
        <div className="absolute w-[380px] h-[380px] bg-[#00b67a] rounded-[48px] rotate-12 top-10" />
        <div className="absolute w-[380px] h-[380px] bg-[#008f5d] rounded-[48px] -rotate-6 top-14 opacity-50" />
        
        {/* The Polaroid / Photo card */}
        <div className="relative w-[320px] bg-[#1c1c1c] rounded-[24px] p-2 shadow-2xl z-20 border border-black/10">
           <div className="w-full h-[320px] bg-white rounded-[20px] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80" alt="Movers" className="w-full h-full object-cover" />
           </div>
           <div className="flex justify-center gap-2 py-6">
             {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 bg-[#00b67a] flex items-center justify-center rounded-[3px]"><Star className="w-6 h-6 text-white fill-current" /></div>)}
           </div>
        </div>

        {/* Floating Social Icons against the dark background */}
        <motion.div animate={{ y: [-4, 4, -4], rotate: -12 }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-[10%] bg-white w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center z-30">
          <Instagram className="w-7 h-7 text-[#1c1c1c]" />
        </motion.div>
        <motion.div animate={{ y: [4, -4, 4], rotate: 45 }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[35%] left-[2%] bg-[#1c1c1c] w-14 h-14 rounded-full shadow-xl flex items-center justify-center z-30">
          <Settings className="w-7 h-7 text-white" />
        </motion.div>
        <motion.div animate={{ y: [-5, 5, -5], rotate: 12 }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[25%] right-[10%] bg-[#1c1c1c] w-16 h-16 rounded-3xl shadow-xl flex items-center justify-center z-30">
          <Facebook className="w-8 h-8 text-white" fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [3, -3, 3], rotate: -5 }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[20%] right-[3%] bg-white w-[70px] h-[50px] rounded-2xl shadow-xl flex items-center justify-center z-30 border border-gray-100">
          <div className="flex font-black text-[#1c1c1c] tracking-tighter text-2xl items-center"><span className="bg-[#1c1c1c] text-white px-1 mr-[1px] rounded-sm text-lg">in</span></div>
        </motion.div>
        
      </div>

      {/* Right Text */}
      <div className="md:w-1/2 md:pl-10">
        <h4 className="text-[13px] font-bold mb-4 tracking-wide text-[#1c1c1c]">Hootsuite Integration</h4>
        <h2 className="text-[36px] md:text-[44px] font-[900] leading-[1.1] mb-6 tracking-tight">
          Connect to your social apps
        </h2>
        <p className="text-[18px] text-[#1c1c1c] leading-relaxed font-medium">
          Make Truthboard reviews a regular part of your social media strategy. Share, monitor, and respond to reviews directly from Hootsuite.
        </p>
      </div>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS STEPS
   ═══════════════════════════════════════════════════════ */
const StepsSection = () => (
  <section className="bg-white py-32 px-6 md:px-12 border-b border-gray-100">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-[32px] md:text-[40px] font-[900] text-center mb-20 tracking-tight">
        How our Image Generator works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <Star className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-gray-800" fill="none" />, title: "1. Find a great review", desc: "Any review or portion of a review can be turned into a testimonial image in minutes" },
          { icon: <ImageIcon className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-gray-800" fill="none" />, title: "2. Choose a background image", desc: "Select an image from our catalogue or upload your own background image" },
          { icon: <Settings className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-gray-800" fill="none" />, title: "3. Select a size and filters", desc: "Choose a template size for Instagram, Facebook, or Twitter, and customize it with filters" },
          { icon: <Download className="w-8 h-8 mb-6 mx-auto stroke-[1.5] text-gray-800" fill="none" />, title: "4. Download the image", desc: "You can share your testimonial image anywhere: social media, blogs, emails, etc." }
        ].map((step, i) => (
          <div key={i} className="text-center px-4">
            {step.icon}
            <h3 className="text-[18px] font-bold mb-4 px-2">{step.title}</h3>
            <p className="text-[14px] text-gray-600 font-medium leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   TESTIMONIAL BLOCK
   ═══════════════════════════════════════════════════════ */
const TestimonialSection = () => (
  <section className="bg-white py-20 px-6 md:px-12">
    <div className="max-w-[1000px] mx-auto">
      <div className="bg-[#fbfbfb] p-0 flex flex-col md:flex-row shadow-sm border border-gray-100">
        <div className="md:w-1/2 h-[300px]">
          <img 
            src="https://images.unsplash.com/photo-1584485542289-e1fb58d20ae4?auto=format&fit=crop&w=800&q=80" 
            alt="Handwashing" 
            className="w-full h-full object-cover grayscale opacity-80"
          />
        </div>
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <p className="text-[16px] font-bold text-[#005138] leading-relaxed mb-8">
            “I absolutely love the new Truthboard image generator and have used it frequently on social media to help advertise our business. I’ve found that there is no better way of showing off our ‘excellent’ Truthboard rating on social media!”
          </p>
          <div>
            <p className="font-bold text-[15px] mb-1 text-[#1c1c1c]">Lorraine Dallmeier</p>
            <p className="font-medium text-[13px] text-gray-500">Director of FormulaBotanica.com</p>
          </div>
        </div>
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
      <h2 className="text-[32px] md:text-[36px] font-[900] text-center mb-16 tracking-tight">
        This may also interest you
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-[#1c1c1c]">
        {/* Card 1 */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#fff100] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-6 border-2 border-transparent group-hover:border-black/5 transition-all">
             {/* Mock graphic for marketing assets (Yellow) */}
             <div className="w-[80%] h-[120px] bg-white rounded-lg shadow-xl shadow-black/10 flex relative rotate-2 border-2 border-[#1c1c1c]">
                <div className="w-1/3 border-r-2 border-[#1c1c1c] p-2 flex flex-col gap-1">
                   <div className="w-full h-8 bg-gray-200" />
                   <div className="w-full h-2 bg-gray-200" />
                   <div className="w-full h-2 bg-gray-200" />
                </div>
                <div className="w-1/3 border-r-2 border-[#1c1c1c] bg-gray-100 p-2" />
                <div className="w-1/3 bg-white p-2 flex flex-col items-center justify-center relative">
                   <div className="absolute -bottom-6 -right-4 bg-white border-2 border-[#1c1c1c] rounded-xl px-2 py-1 flex items-center gap-1 shadow-lg transform -rotate-12">
                      <Star className="w-5 h-5 text-[#00b67a] fill-current" />
                      <span className="font-black text-[12px]">Truthboard</span>
                   </div>
                   <div className="flex gap-[1px]">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-2 h-2 text-white fill-current" /></div>)}
                   </div>
                </div>
             </div>
             {/* Background decorative triangles */}
             <div className="absolute top-4 left-4 w-4 h-4 text-orange-500 transform rotate-45 border-b-[6px] border-l-[6px] border-transparent border-t-[6px] border-t-orange-500" />
             <div className="absolute bottom-6 right-8 w-4 h-4 text-orange-500 transform rotate-180 border-b-[6px] border-l-[6px] border-transparent border-t-[6px] border-t-orange-500" />
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Marketing Assets</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            The power of Truthboard reviews goes far beyond the boundaries of your website. With Truthboard Marketing Assets, you can add credibility and improve the performance of TV Ads, display ads...
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2">Read more</a>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#ff8e2d] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:border-black/5 transition-all">
             {/* Mock graphic for widgets (Orange) */}
             <div className="relative w-[80%] h-[140px] bg-white border-[6px] border-[#1c1c1c] rounded-[20px] p-3 flex flex-col shadow-xl">
                 <div className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded-full mb-3 border border-gray-200">
                    <span className="text-[10px] font-bold">Excellent</span>
                    <div className="flex gap-[1px]">
                      {[1,2,3,4,5].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#00b67a] flex items-center justify-center"><Star className="w-1.5 h-1.5 text-white fill-current" /></div>)}
                    </div>
                    <span className="text-[9px] font-bold flex items-center gap-0.5"><Star className="w-2 h-2 text-[#00b67a] fill-current"/> Truthboard</span>
                 </div>
                 <div className="flex gap-2.5 h-full">
                    <div className="flex-1 border border-gray-200 rounded-lg p-2 relative shadow-sm h-[70px]">
                        <p className="text-[11px] font-black leading-none mb-1">Excellent</p>
                        <div className="flex gap-[1px] mb-1">
                           {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-2 h-2 text-white fill-current" /></div>)}
                        </div>
                        <p className="text-[6px] font-bold text-gray-400">4.8/5</p>
                    </div>
                    <div className="flex-1 border border-gray-200 rounded-lg p-2 h-[70px] bg-gray-50 flex flex-col gap-1">
                       <div className="w-full h-1.5 bg-gray-200 rounded"/>
                       <div className="w-3/4 h-1.5 bg-gray-200 rounded"/>
                    </div>
                 </div>
             </div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Truthboard Widgets</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            Display Truthboard reviews on your site with Truthboard widgets. With a cut and paste of code, you can increase conversion and sales by sharing Truthboard reviews on your site...
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2">Read more</a>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col group cursor-pointer">
          <div className="bg-[#ffb6c1] h-[220px] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-6 border-2 border-transparent group-hover:border-black/5 transition-all">
             {/* Mock graphic for SEO (Pink) */}
             <div className="w-[85%] h-full bg-white border-[3px] border-[#1c1c1c] rounded-lg relative overflow-hidden flex flex-col">
                 <div className="h-6 border-b-2 border-[#1c1c1c] bg-gray-100 flex items-center gap-1 px-2">
                    <div className="w-2 h-2 rounded-full border border-gray-400" />
                    <div className="w-2 h-2 rounded-full border border-gray-400" />
                    <div className="w-2 h-2 rounded-full border border-gray-400" />
                 </div>
                 <div className="p-3">
                    <div className="flex items-center gap-1 mb-2">
                       <div className="w-4 h-4 rounded-full bg-blue-500" />
                       <div className="h-2 w-16 bg-blue-500 rounded" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[#1a0dab] underline">HoneyHiveShop</span>
                    </div>
                    <div className="flex items-center gap-1">
                       {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i===5?'text-gray-300':'text-yellow-400'} fill-current`} />)}
                       <span className="text-[8px] text-gray-500 ml-1">Rating 4.8</span>
                    </div>
                 </div>
                 
                 {/* Magnifying glass overlay */}
                 <div className="absolute top-8 left-2 w-[110px] h-[110px] border-[4px] border-[#1c1c1c] rounded-full shadow-[0_0_0_9999px_rgba(255,182,193,0.3)] backdrop-blur-[1px] flex justify-center items-center z-10 pointer-events-none" />
                 <div className="absolute bottom-4 left-6 w-[40px] h-[8px] bg-[#1c1c1c] rotate-45 origin-left z-20 pointer-events-none" />
             </div>
          </div>
          <h3 className="text-[24px] font-[900] mb-4">Review SEO</h3>
          <p className="text-[14px] leading-relaxed font-medium mb-6 text-gray-700">
            Climb to the top of search. Make your brand more visible in both paid and organic search, and drive more traffic to your site with Truthboard reviews.
          </p>
          <a href="#" className="text-[14px] font-bold underline underline-offset-4 decoration-1 hover:decoration-2 mt-auto">Learn more</a>
        </div>

      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   BOTTOM CTA
   ═══════════════════════════════════════════════════════ */
const BottomCTA = () => (
  <section className="bg-[#00e676] py-24 px-6 text-center text-[#1c1c1c]">
    <div className="max-w-[800px] mx-auto">
      <h2 className="text-[36px] md:text-[42px] font-[900] mb-10 tracking-tight leading-tight">
        Start sharing reviews on your social pages today
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
const SocialMediaTools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans antialiased selection:bg-[#00b67a] selection:text-white">
      <BusinessNav />
      {/* Navigation spacer */}
      <div className="pt-0" />
      <HeroSection />
      <DidYouKnow />
      <AssetBuilder />
      <ReviewImageGenerator />
      <HootsuiteIntegration />
      <StepsSection />
      <TestimonialSection />
      <InterestCards />
      <BottomCTA />
      <DetailedFooter />
    </div>
  );
};

export default SocialMediaTools;
