import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BusinessNavigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-[#1a1a2e] shadow-xl py-4' : 'bg-[#1a1a2e] py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link to="/" className="group flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[#00b67a] text-2xl group-hover:scale-110 transition-transform">★</span>
            <span className="text-white text-xl font-black tracking-tight leading-none">TruthBoard</span>
          </div>
          <span className="text-gray-400 text-[9px] ml-8 font-black uppercase tracking-[0.2em]">For Business</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-white">
          {['Solutions', 'Features', 'Resources', 'Company'].map((item) => (
            <div key={item} className="flex items-center gap-1 cursor-pointer hover:text-[#00b67a] transition-colors">
              {item}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
          <Link to="/pricing" className="hover:text-[#00b67a] transition-colors">Pricing</Link>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link to="/login" className="text-white text-sm font-bold hover:text-[#00b67a] transition-colors">Log in</Link>
          <Link to="/register" className="bg-[#00b67a] text-[#1a1a2e] px-8 py-3 rounded-full text-sm font-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,182,122,0.4)] transition-all transform hover:-translate-y-0.5">
            Create free account
          </Link>
        </div>
      </div>
    </nav>
  );
};

const ScrollingLogos = () => {
  const logos = [
    { name: 'Samsung', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Shopify', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Shopify_logo.svg' },
    { name: 'Deliveroo', url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Deliveroo_logo.svg' },
    { name: 'Salesforce', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
    { name: 'L’Oréal', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Oreal_logo.svg' },
    { name: 'Toyota', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
    { name: 'Under Armour', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Under_Armour_logo.svg' }
  ];

  return (
    <div className="py-12 bg-gray-50 overflow-hidden border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 mb-8 text-center lg:text-left">
        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Trusted by the world&apos;s leading brands</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee flex items-center gap-20 whitespace-nowrap min-w-full">
          {[...logos, ...logos].map((logo, i) => (
            <img key={i} src={logo.url} alt={logo.name} className="h-8 md:h-10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
          ))}
        </div>
        <div className="absolute top-0 py-4 animate-marquee2 flex items-center gap-20 whitespace-nowrap min-w-full">
          {[...logos, ...logos].map((logo, i) => (
            <img key={i} src={logo.url} alt={logo.name} className="h-8 md:h-10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
      `}} />
    </div>
  );
};

const ForBusinesses = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      <BusinessNavigation />
      
      {/* Hero Section */}
      <section className="bg-[#00c684] text-[#1a1a2e] pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-[0.95] animate-in fade-in slide-in-from-left duration-1000">
                The world&apos;s largest independent customer feedback platform
              </h1>
              <p className="text-xl md:text-2xl mb-12 font-bold max-w-2xl opacity-90 leading-snug">
                Attract and keep customers with TruthBoard&apos;s review platform and powerful analytics tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-[#1a1a2e] text-white px-10 py-5 rounded-full font-black text-xl hover:bg-black transition-all shadow-2xl hover:shadow-[#1a1a2e]/40 hover:-translate-y-1">
                  Book a demo
                </button>
                <button className="bg-white text-[#1a1a2e] px-10 py-5 rounded-full font-black text-xl hover:bg-gray-100 transition-all border-2 border-transparent hover:border-[#1a1a2e]">
                  Start for free
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 relative h-[400px] md:h-[500px] w-full flex-shrink-0 animate-in fade-in zoom-in duration-1000">
               <div className="absolute top-0 right-0 w-[80%] h-[90%] bg-[#1a1a2e] rounded-[3rem] p-8 shadow-2xl flex flex-col justify-end">
                  <div className="text-white space-y-4">
                     <div className="flex gap-2">
                        {[1,2,3,4,5].map(i => <span key={i} className="text-[#00c684] text-2xl">★</span>)}
                     </div>
                     <div className="text-3xl md:text-4xl font-black italic">&quot;Our conversion rates jumped 24% after adding TruthBoard widgets.&quot;</div>
                     <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                        </div>
                        <div>
                           <div className="font-bold">Mark Thompson</div>
                           <div className="text-xs opacity-60 uppercase font-black tracking-widest">Head of Growth, Deliveroo</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-[45%] h-[40%] bg-white rounded-3xl shadow-2xl border-8 border-[#00c684] flex flex-col items-center justify-center p-6">
                  <div className="text-5xl md:text-6xl font-black text-[#1a1a2e] leading-none tracking-tighter">4.9</div>
                  <div className="text-sm font-black text-gray-500 uppercase tracking-widest mt-2">Global Score</div>
               </div>
               <div className="absolute top-1/4 -left-8 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-bounce">
                  <div className="text-4xl">🚀</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollingLogos />

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-6xl lg:text-8xl font-black text-[#1a1a2e] tracking-tighter">+350m</h2>
              <p className="text-xl font-bold text-gray-500">reviews on TruthBoard.com</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl lg:text-8xl font-black text-[#1a1a2e] tracking-tighter">1.3m</h2>
              <p className="text-xl font-bold text-gray-500">businesses globally with reviews</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl lg:text-8xl font-black text-[#1a1a2e] tracking-tighter">190k+</h2>
              <p className="text-xl font-bold text-gray-500">new reviews every day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Release Section */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
               <div className="max-w-2xl">
                  <div className="inline-block bg-[#ffce00] text-[#1a1a2e] text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                     New Gold Release Features
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-[#1a1a2e] tracking-tighter leading-[0.95]">
                     Everything you need to outshine the competition.
                  </h2>
               </div>
               <Link to="/features" className="text-[#1a1a2e] text-xl font-black hover:text-[#00b67a] transition-all flex items-center gap-2 group">
                  See all features <span className="group-hover:translate-x-2 transition-transform">→</span>
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: 'Enhanced insights', desc: 'Explore all your data in simple charts or export data to view your own way.', icon: '📈' },
                 { title: 'Customizable assets', desc: 'Ready-to-use templates allow you to promote your business across every channel.', icon: '🎨' },
                 { title: 'Brand customization', desc: 'Align Trustpilot assets with your unique brand voice and visual style.', icon: '🛡️' },
                 { title: 'Review follow-up', desc: 'Get more value from every review with intelligent follow-up questions.', icon: '❓' },
                 { title: 'Review highlights', desc: 'Let your customers tell your story by highlighting the Best quotes.', icon: '💬' },
                 { title: 'Visitor insights', desc: 'See how your reviews impact your website traffic and conversions.', icon: '👥' }
               ].map((f, i) => (
                 <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group border border-gray-100">
                    <div className="text-5xl mb-8 group-hover:scale-110 transition-transform origin-left">{f.icon}</div>
                    <h3 className="text-2xl font-black text-[#1a1a2e] mb-4 tracking-tight">{f.title}</h3>
                    <p className="text-gray-500 font-bold leading-relaxed">{f.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-[#1a1a2e] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-gradient-to-l from-green-500/20 to-transparent"></div>
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
               <div className="lg:w-1/2">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[0.95]">
                     We easily integrate with your existing tools.
                  </h2>
                  <p className="text-xl text-gray-400 font-bold mb-12">
                     Connect TruthBoard with your CRM, e-commerce platform, or help desk to automate your review collection.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                     {['Salesforce', 'Shopify', 'Magento', 'Slack', 'Zendesk', 'Klaviyo'].map(integ => (
                        <div key={integ} className="bg-white/5 border border-white/10 px-6 py-4 rounded-xl flex items-center justify-center font-black opacity-80 hover:opacity-100 hover:bg-white/10 transition-all cursor-pointer">
                           {integ}
                        </div>
                     ))}
                  </div>
               </div>
               <div className="lg:w-1/2 flex justify-center">
                  <div className="w-[80%] aspect-square bg-[#00c684] rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(0,198,132,0.3)] animate-pulse">
                     <span className="text-white text-9xl font-black">★</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
         <div className="max-w-5xl mx-auto px-6">
            <div className="bg-[#1a1a2e] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00c684]/20 to-transparent whitespace-normal opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-[1.1] tracking-tighter">
                     Ready to unlock the full potential of reviews?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-[#00c684] text-[#1a1a2e] px-12 py-5 rounded-full font-black text-xl hover:bg-white hover:shadow-2xl transition-all active:scale-95">
                      Get started now
                    </button>
                    <button className="bg-transparent border-2 border-white/20 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/5 transition-all">
                      Contact Sales
                    </button>
                  </div>
                  <p className="mt-10 text-gray-500 font-bold">No credit card required. Cancel anytime.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Resources Preview */}
      <section className="py-24 bg-white border-t border-gray-100">
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-12 uppercase tracking-widest">Get Inspired</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: 'Credibility Checklist', tags: ['Strategy', 'Trust'], img: 'https://images.unsplash.com/photo-1454165833767-027eeea15c3e?auto=format&fit=crop&q=80&w=800' },
                 { title: '4 Consumer Insights', tags: ['Research', 'Data'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
                 { title: 'Intro to Insights', tags: ['Analytics', 'Growth'], img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' }
               ].map((post, i) => (
                 <div key={i} className="group cursor-pointer">
                    <div className="rounded-3xl overflow-hidden mb-6 aspect-video">
                       <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex gap-2 mb-3">
                       {post.tags.map(t => <span key={t} className="text-[10px] font-black uppercase tracking-widest text-[#00c684]">{t}</span>)}
                    </div>
                    <h3 className="text-2xl font-black text-[#1a1a2e] group-hover:text-[#00c684] transition-colors leading-tight">
                       {post.title}
                    </h3>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default ForBusinesses;

