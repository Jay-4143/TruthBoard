import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ChevronDown,
  Globe,
  MessageSquare,
  Users,
  Award,
  Linkedin,
  Facebook,
  Youtube,
  TrendingUp
} from 'lucide-react';

import imgPhone from '../assets/corporate/hero_person_phone_1773762091473.png';
import imgShopping from '../assets/corporate/hero_person_shopping_1773762199371.png';
import imgGroup from '../assets/corporate/hero_group_people_1773762246722.png';
import imgHappy from '../assets/corporate/hero_happy_customer_1773762223578.png';

/* ═══════════════════════════════════════════════════════
   DROPDOWN DATA
   ═══════════════════════════════════════════════════════ */
const menuItems = [
  {
    name: 'Trust Centre',
    sections: [
      {
        title: 'Trust Centre',
        links: ['Trust Centre', 'How Truthboard works', 'Trust report 2025', "Truthboard's use of AI"]
      },
      {
        title: 'Public affairs',
        links: ['Public affairs']
      }
    ]
  },
  {
    name: 'Investors',
    sections: [
      {
        title: 'For investors',
        links: [
          'Investor Relations',
          'Why invest in Truthboard',
          'Results, reports and presentations',
          'Regulatory news',
          'Analyst coverage',
          'Analyst consensus',
          'Sustainability',
          'Financial calendar',
          'IPO information'
        ]
      },
      {
        title: 'Shareholder information',
        links: ['Shareholder FAQs', 'Shareholder meetings and documents', 'Share price center']
      },
      {
        title: 'Governance',
        links: [
          'Board and executive teams',
          'Anti-bribery policy',
          'Modern slavery policy',
          'Code of ethics',
          'Articles of association',
          'Terms of reference',
          'Schedule of matters reserved for the board'
        ]
      }
    ]
  },
  {
    name: 'Legal',
    sections: [
      {
        title: 'Guidelines and policies',
        links: ['Our guidelines and policies', 'For reviewers', 'For businesses', 'For everyone']
      }
    ]
  },
  {
    name: 'Press',
    sections: [
      {
        title: 'Global announcements',
        links: ['Press', 'Brand hub', 'Press contact']
      }
    ]
  },
  {
    name: 'Careers',
    sections: [
      {
        title: 'Working at Truthboard',
        links: ['Careers at Truthboard', 'Open jobs', 'DEI at Truthboard']
      }
    ]
  },
  {
    name: 'Company',
    sections: [
      {
        title: 'Company',
        links: [
          { name: 'About Truthboard', type: 'refresh' },
          { name: 'Truthboard for Consumers', type: 'link', path: '/' },
          { name: 'Truthboard for Business', type: 'link', path: '/business' },
          { name: 'Truthboard Data Solutions', type: 'link', path: '/datasolutions' }
        ]
      }
    ]
  }
];

/* ═══════════════════════════════════════════════════════
   CUSTOM NAVBAR (Reused across Corporate pages)
   ═══════════════════════════════════════════════════════ */
export const CorporateNav = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (item) => {
    if (typeof item === 'object') {
      if (item.type === 'refresh') {
        if (window.location.pathname === '/about') {
           window.location.reload();
        } else {
           navigate('/about');
        }
      } else if (item.type === 'link') {
        navigate(item.path);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-[#1c1c1c] py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center text-white">
        <Link to="/" className="flex items-center gap-2 group">
          <Star className="w-10 h-10 text-[#00b67a] fill-current group-hover:scale-110 transition-transform" />
          <span className={`text-[26px] font-bold tracking-tighter ${isScrolled ? 'text-black' : 'text-white'}`}>TruthBoard</span>
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {menuItems.map(item => (
            <div
              key={item.name}
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => setHoveredMenu(item.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className={`text-[13px] font-bold tracking-tight transition-colors ${isScrolled ? 'text-black/70 group-hover:text-black' : 'text-white/70 group-hover:text-white'}`}>
                  {item.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredMenu === item.name ? 'rotate-180' : ''} ${isScrolled ? 'text-black/40' : 'text-white/40'}`} />
              </div>

              <AnimatePresence>
                {hoveredMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white text-black p-10 rounded-2xl shadow-2xl border border-gray-100 flex gap-16 transition-all ${
                      item.name === 'Investors' ? 'min-w-[800px]' : 
                      item.name === 'Trust Centre' ? 'min-w-[500px]' : 'min-w-[280px]'
                    }`}
                  >
                    {item.sections.map((section, idx) => (
                      <div key={idx} className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-bold mb-6 text-[#1c1c1c] pb-2 border-b border-gray-100 whitespace-nowrap">
                          {section.title}
                        </h4>
                        <ul className="space-y-4">
                          {section.links.map((link, lIdx) => (
                            <li key={lIdx}>
                              {typeof link === 'string' ? (
                                <Link to="#" className="text-[14px] font-bold text-gray-500 hover:text-[#00b67a] transition-colors block whitespace-nowrap">
                                  {link}
                                </Link>
                              ) : (
                                <button 
                                  onClick={() => handleLinkClick(link)}
                                  className="text-[14px] font-bold text-gray-500 hover:text-[#00b67a] transition-colors block text-left w-full whitespace-nowrap"
                                >
                                  {link.name}
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button 
            onClick={() => navigate('/contact')}
            className="bg-[#4162ff] text-white px-8 py-3 rounded-full font-bold text-[14px] hover:bg-[#3453e0] transition-all transform hover:scale-105 shadow-lg ml-4"
          >
            Contact us
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════
   CUSTOM FOOTER (Reused across Corporate pages)
   ═══════════════════════════════════════════════════════ */
export const CorporateFooter = () => (
  <footer className="bg-[#0d0d0d] text-white pt-32 pb-16 px-6 md:px-12">
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-20 items-start mb-24">
        <div className="lg:w-1/4">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <Star className="w-8 h-8 text-[#00b67a] fill-current" />
            <span className="text-2xl font-bold tracking-tight">TruthBoard</span>
          </Link>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-16">
          <div>
            <h4 className="font-[900] text-[15px] mb-8">Company</h4>
            <ul className="space-y-4 text-[13px] font-bold text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Trust Centre</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Investors</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Legal</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Public affairs</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Brand hub</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Get in touch</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[900] text-[15px] mb-8">Consumer / Review Community</h4>
            <ul className="space-y-4 text-[13px] font-bold text-gray-400">
              <li><Link to="#" className="hover:text-white transition-colors">Join the community</Link></li>
              <li><Link to="/write-review" className="hover:text-white transition-colors">Write a review</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Help center</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Consumer blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Get in touch</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[900] text-[15px] mb-8">TruthBoard for Business</h4>
            <ul className="space-y-4 text-[13px] font-bold text-gray-400">
              <li><Link to="/business" className="hover:text-white transition-colors">TruthBoard for business</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Log in</Link></li>
              <li><Link to="/request-demo" className="hover:text-white transition-colors">Book a demo</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Help center</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Plans and pricing</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Business blog</Link></li>
              <li><Link to="/datasolutions" className="hover:text-white transition-colors text-[#00b67a]">Data solutions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Get in touch</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-16 border-t border-white/10 gap-8">
        <div className="space-y-6">
          <h4 className="font-[900] text-[15px]">Country</h4>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-lg min-w-[240px] cursor-pointer">
            <div className="w-6 h-4 bg-blue-600 relative overflow-hidden flex items-center justify-center text-[4px] font-bold leading-[1]">USA</div>
            <span className="text-[13px] font-bold">United States</span>
            <ChevronDown className="w-4 h-4 ml-auto opacity-40" />
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6">
          <h4 className="font-[900] text-[15px]">Follow us on</h4>
          <div className="flex gap-4">
            {[Linkedin, Facebook, TrendingUp, Youtube].map((Icon, i) => (
              <div key={i} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#00b67a] transition-all cursor-pointer">
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-4 mt-20 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        {['Terms and Conditions', 'Privacy Policy', 'Company Guidelines', 'Trademark Guidelines', 'Manage cookies', 'Modern Slavery Statement', 'DSA Transparency Report', 'System status', 'Do not sell or share my personal information'].map(link => (
          <Link key={link} to="#" className="hover:text-white transition-colors">{link}</Link>
        ))}
      </div>
      <p className="mt-12 text-[11px] font-bold text-gray-600">© 2026 TruthBoard Inc. All rights reserved.</p>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-white pt-40 pb-24 px-6 md:px-12">
    <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-[45%]">
        <h1 className="text-4xl md:text-[64px] leading-[1] font-[900] mb-8 tracking-tighter text-[#1c1c1c]">
          TruthBoard gives everybody a voice
        </h1>
        <p className="text-[15px] font-bold mb-10 text-gray-800">
          The world’s largest independent customer feedback platform
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="bg-[#1c1c1c] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-black transition-all shadow-xl">
            How TruthBoard works
          </button>
          <button className="bg-[#4162ff] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#3453e0] transition-all shadow-xl">
            See Trust in Action
          </button>
        </div>
        <Link to="#" className="text-[13px] font-bold underline underline-offset-4 text-[#1c1c1c]">Explore our platform</Link>
      </div>
      <div className="lg:w-[55%] relative flex justify-center">
        {/* Collage Image Mockup */}
        <div className="relative w-full max-w-[600px] h-[400px] bg-[#fbfbfb] rounded-[40px] p-8 flex items-center justify-center overflow-hidden border border-gray-100">
          <div className="grid grid-cols-4 gap-4 w-full">
            {[
              { img: imgPhone, stars: 5 },
              { img: imgShopping, stars: 4 },
              { img: imgGroup, stars: 5 },
              { img: imgHappy, stars: 3 }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-square rounded-2xl relative overflow-hidden bg-gray-100">
                  <img src={item.img} alt="Consumer feedback" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, si) => (
                    <div key={si} className={`w-3 h-3 ${si < item.stars ? 'bg-[#00b67a]' : 'bg-gray-100'} rounded-[1px] flex items-center justify-center`}>
                      <Star className={`w-2 h-2 ${si < item.stars ? 'text-white' : 'text-gray-300'} fill-current`} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-10 right-20 w-32 h-20 bg-white shadow-xl rounded-xl p-3 border border-gray-100 z-10 flex flex-col justify-end">
            <div className="w-8 h-2 bg-gray-100 rounded mb-1" />
            <div className="w-12 h-2 bg-gray-100 rounded" />
            <div className="flex gap-[2px] mt-2">
              {[...Array(5)].map((_, i) => <div key={i} className="w-2.5 h-2.5 bg-[#00b67a] rounded-[1px] flex items-center justify-center"><Star className="w-1.5 h-1.5 text-white fill-current" /></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   VISION SECTION
   ═══════════════════════════════════════════════════════ */
const VisionSection = () => (
  <section className="bg-white py-24 px-6">
    <div className="max-w-[1000px] mx-auto text-center">
      <h2 className="text-[32px] md:text-[44px] font-[900] mb-20 tracking-tight text-[#1c1c1c]">
        Our vision is to be the universal symbol of trust
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left text-[14px] leading-relaxed text-gray-700 font-medium">
        <div className="space-y-6">
          <p>
            Founded in 2007, TruthBoard began with a simple yet powerful vision: to become the universal symbol of trust, connecting consumers and businesses through reviews.
          </p>
          <p>
            As an open, independent, and impartial service, our platform helps people make confident choices and businesses earn loyalty at every step.
          </p>
        </div>
        <div className="space-y-6">
          <p>
            Today, we have 350 million active reviews and over 60 million monthly active users worldwide. We’ve generated 149 billion annual TruthBoard brand impressions, and the numbers keep growing.
          </p>
          <p>
            With a team of more than 1,000 employees, we’re headquartered in Copenhagen, with offices in Amsterdam, Denver, Edinburgh, Hamburg, London, Melbourne, Milan, and New York.
          </p>
        </div>
      </div>

      {/* 5 Static Stars in the middle */}
      <div className="flex justify-center gap-6 mt-24">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} className="w-16 h-16 text-[#00b67a] fill-current" />
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   STATS SECTION (WHITE BOXES WITH ICONS)
   ═══════════════════════════════════════════════════════ */
const StatsGrid = () => (
  <section className="bg-[#f2f2f2] py-24 px-6 overflow-hidden">
    <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { icon: Award, title: "100+", desc: "TruthBoard is in more than 100 countries" },
        { icon: MessageSquare, title: "350+ million", desc: "reviews on truthboard.com" },
        { icon: Globe, title: "1.3 million", desc: "businesses globally with TruthBoard reviews" },
        { icon: Users, title: "190,000+", desc: "new reviews every day" }
      ].map((item, i) => (
        <div key={i} className="bg-white p-10 rounded-3xl text-center flex flex-col items-center">
          <div className="mb-6">
            {i === 0 && <Star className="w-10 h-10 text-black border border-black rounded-full p-2" />}
            {i === 1 && <MessageSquare className="w-10 h-10 text-black" />}
            {i === 2 && <Globe className="w-10 h-10 text-black" />}
            {i === 3 && <Users className="w-10 h-10 text-black border-2 border-black rounded-full p-2" />}
          </div>
          <h3 className="text-[28px] font-[900] mb-4 text-[#1c1c1c]">{item.title}</h3>
          <p className="text-[13px] text-gray-500 font-medium leading-[1.6]">
            {i === 1 ? <>reviews on <a href="#" className="underline">truthboard.com</a></> :
              i === 2 ? <><a href="#" className="underline">businesses</a> globally with Truthboard reviews</> : item.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   WHAT WE DO SECTION
   ═══════════════════════════════════════════════════════ */
const WhatWeDo = () => (
  <section className="bg-white py-32 px-6">
    <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-20">
      <div className="lg:w-1/2 relative flex justify-center scale-110">
        <div className="relative w-[500px] h-[500px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-xl bg-gray-100">
            <img src={imgPhone} className="w-full h-full object-cover" alt="User 1" />
          </div>
          <div className="absolute top-10 left-20 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-gray-200">
            <img src={imgShopping} className="w-full h-full object-cover" alt="User 2" />
          </div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border-6 border-white shadow-xl overflow-hidden flex items-center justify-center bg-gray-300">
            <img src={imgGroup} className="w-full h-full object-cover" alt="User 3" />
          </div>
          <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-gray-100">
            <img src={imgHappy} className="w-full h-full object-cover" alt="User 4" />
          </div>

          <div className="absolute top-1/4 left-[-10px] bg-[#00b67a] text-white p-2 rounded-lg shadow-lg flex items-center gap-1 z-10">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
          <div className="absolute bottom-1/4 left-0 bg-[#00b67a] text-white p-2 rounded-lg shadow-lg flex items-center gap-1 z-10">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
          <div className="absolute top-10 right-10 bg-[#73cf11] text-white p-2 rounded-lg shadow-lg flex items-center gap-1 z-10">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
          <div className="absolute bottom-0 right-1/4 bg-[#00b67a] text-white p-2 rounded-lg shadow-lg flex items-center gap-1 z-10">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
        </div>
      </div>
      <div className="lg:w-1/2">
        <h2 className="text-4xl md:text-[52px] font-[900] mb-8 tracking-tighter text-[#1c1c1c]">What We Do</h2>
        <p className="text-[17px] font-[900] mb-6 text-[#1c1c1c]">We're here to help businesses and consumers.</p>
        <div className="space-y-6 text-[15px] font-medium text-gray-600 leading-relaxed">
          <p>
            Anyone can leave a review for a company, as long as it's based on a genuine experience. And the reviews help millions of <a href="#" className="underline">consumers</a> find trusted companies, and make more informed and confident buying choices.
          </p>
          <p>
            The reviews also help <a href="#" className="underline">businesses</a> earn trust by helping them interact with consumers, understand customer feedback, and take proactive measures to improve their business.
          </p>
          <p>
            Our mission is to build trust between consumers and businesses by making TruthBoard visible wherever people go - TruthBoard everywhere.
          </p>
          <p>
            We take a unique approach to safeguarding the integrity of the platform, using sophisticated fake review detection technology and taking action against those who breach our guidelines. Find out how we use a three-pronged approach - powered by technology, community, and people - by visiting <a href="#" className="underline">our Trust Centre</a>.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   VALUES SECTION
   ═══════════════════════════════════════════════════════ */
const ValuesSection = () => (
  <section className="bg-[#fbfbfb] py-32 px-6">
    <div className="max-w-[1100px] mx-auto text-center">
      <h2 className="text-4xl md:text-[52px] font-[900] mb-12 tracking-tighter text-[#1c1c1c]">Our values</h2>
      <p className="text-[15px] font-medium text-gray-500 mb-24 max-w-4xl mx-auto leading-relaxed">
        Our vision to become a universal symbol of trust is ambitious. To achieve this, we must walk our talk of openness and transparency. We have a set of shared values to guide how we behave, make decisions, and approach everything we do, both individually and as a business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-12 px-12">
        {[
          { color: "bg-[#00b67a]", title: "We start with the customer", desc: "We obsess over consumer and business problems, using trust as our guide." },
          { color: "bg-[#ff4e8a]", title: "We act with integrity", desc: "We do the right thing, even when it’s hard." },
          { color: "bg-[#fd7c22]", title: "We are positively human", desc: "We care about each other and embrace diversity." },
          { color: "bg-[#ffcf00]", title: "We make it happen", desc: "We deliver on commitments to drive impact." },
          { color: "bg-[#00b67a]", title: "We win together", desc: "We’re one team, externally competitive, but internally collaborative." }
        ].map((val, i) => (
          <div key={i} className={`flex flex-col items-center ${i >= 3 ? 'md:translate-x-1/2' : ''}`}>
            <div className={`w-32 h-32 ${val.color} rounded-full flex items-center justify-center mb-8 shadow-xl`}>
              <Star className="w-16 h-16 text-[#0d0d0d]/80 fill-current" />
            </div>
            <h4 className="text-[22px] font-[900] mb-4 text-[#1c1c1c] tracking-tight">{val.title}</h4>
            <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[280px]">
              {val.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS SECTION (GREEN)
   ═══════════════════════════════════════════════════════ */
const Testimonials = () => (
  <section className="bg-[#00b67a] py-32 px-6">
    <div className="max-w-[1240px] mx-auto">
      <h2 className="text-3xl md:text-5xl font-[900] text-center mb-24 text-[#0d0d0d] tracking-tight">Don't just take it from us</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white/10 p-12 rounded-[24px] backdrop-blur-sm border border-white/10">
          <h3 className="text-2xl font-[900] mb-6 text-[#0d0d0d]">Great Platform for Customer Reviews</h3>
          <p className="text-[15px] font-medium text-[#0d0d0d] leading-relaxed mb-10">
            “We recently started using TruthBoard to manage our company’s online reputation, and overall, the experience has been positive. The platform provides a great way to collect and showcase customer feedback, which helps build credibility and trust with potential clients. The dashboard is intuitive, making it easy to manage reviews and respond to customer feedback efficiently.”
          </p>
          <p className="text-[13px] font-bold text-[#0d0d0d]/80 uppercase tracking-widest">
            Vivasoft Ltd | Date of experience: <span className="underline">February 14, 2025</span>
          </p>
        </div>
        <div className="bg-white/10 p-12 rounded-[24px] backdrop-blur-sm border border-white/10">
          <h3 className="text-2xl font-[900] mb-6 text-[#0d0d0d]">A Trusted Platform for Honest Reviews</h3>
          <p className="text-[15px] font-medium text-[#0d0d0d] leading-relaxed mb-10">
            “TruthBoard is an excellent platform that helps customers share genuine feedback and experiences. I always check reviews on TruthBoard before using a new service, and it’s saved me from many bad choices!”
          </p>
          <p className="text-[13px] font-bold text-[#0d0d0d]/80 uppercase tracking-widest mt-16">
            Travel Minibus | Date of experience: <span className="underline">May 08, 2025</span>
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   CALL TO ACTION SECTION (WHITE)
   ═══════════════════════════════════════════════════════ */
const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="text-center md:text-left">
          <h2 className="text-[28px] md:text-3xl font-[900] mb-8 text-[#1c1c1c] tracking-tight">
            Learn more about how TruthBoard works and how reviews are collected.
          </h2>
          <button className="bg-[#1c1c1c] text-white px-10 py-3.5 rounded-full font-bold text-[14px] hover:bg-black transition-all shadow-xl">
            Take me there
          </button>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-[28px] md:text-3xl font-[900] mb-8 text-[#1c1c1c] tracking-tight">
            Have a question for our team? Get in touch.
          </h2>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-[#1c1c1c] text-white px-10 py-3.5 rounded-full font-bold text-[14px] hover:bg-black transition-all shadow-xl"
          >
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutTruthBoard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About TruthBoard - TruthBoard Corporate";
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#1c1c1c] selection:bg-[#00b67a] selection:text-[#0d0d0d] overflow-hidden">
      <CorporateNav />
      <HeroSection />
      <VisionSection />
      <StatsGrid />
      <WhatWeDo />
      <ValuesSection />
      <Testimonials />
      <CTASection />
      <CorporateFooter />
    </div>
  );
};

export default AboutTruthBoard;
