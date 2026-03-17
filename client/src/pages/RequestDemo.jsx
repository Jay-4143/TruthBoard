import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Navigation';
import { 
  CheckCircle, 
  Search, 
  MessageSquare, 
  Calendar, 
  Clock, 
  HelpCircle,
  Link as LinkIcon
} from 'lucide-react';

const RequestDemo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    companyName: '',
    revenue: '',
    employees: '',
    website: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demo request submitted:', formData);
    alert('Thank you for your interest! We will contact you shortly.');
  };

  return (
    <div className="min-h-screen font-sans text-[#1c1c1c]">
      {/* Minimal Business Header */}
      <header className="bg-[#191919] py-5 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <span className="text-[#00b67a] text-3xl">★</span>
            <div className="flex flex-col justify-center">
              <span className="text-white text-xl md:text-2xl font-bold leading-none tracking-tight">TruthBoard</span>
              <span className="text-gray-400 text-[11px] mt-0.5 leading-none font-medium">For Business</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section with Green Background */}
      <div className="bg-[#00b67a] py-16 md:pt-24 md:pb-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Copy & Badges */}
          <div className="lg:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
              Discover Truthboard's incredible suite of tools
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-95 max-w-lg">
              Book a 30 minute demo with a Truthboard expert to learn why we're trusted by 25,000 business customers
            </p>
            
            {/* Badges */}
            <div className="flex gap-4">
              <div className="bg-[#1c1c1c] p-4 rounded flex flex-col items-center justify-center w-24 h-24 border border-gray-700 shadow-lg">
                <div className="text-[#00b67a] text-xs font-bold mb-1">GetApp</div>
                <div className="text-[10px] text-center leading-none uppercase font-black">Category Leaders 2022</div>
              </div>
              <div className="bg-[#1c1c1c] p-4 rounded flex flex-col items-center justify-center w-24 h-24 border border-gray-700 shadow-lg">
                <div className="text-[#00b67a] text-xs font-bold mb-1 italic">Software Advice</div>
                <div className="text-[10px] text-center leading-none uppercase font-black">Front Runners 2022</div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form Card */}
          <div className="lg:w-1/2 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative z-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">First name*</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name" 
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all placeholder:text-gray-400"
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Last name*</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name" 
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all placeholder:text-gray-400"
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Business email*</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Business email" 
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all placeholder:text-gray-400"
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone number*</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number" 
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all placeholder:text-gray-400"
                  required 
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Country*</label>
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all bg-white"
                  required
                >
                  <option value="">Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Company name*</label>
                <input 
                  type="text" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company name" 
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all placeholder:text-gray-400"
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Annual revenue*</label>
                <select 
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all bg-white"
                  required
                >
                  <option value="">Annual revenue</option>
                  <option value="<1M">Less than $1M</option>
                  <option value="1M-10M">$1M - $10M</option>
                  <option value="10M-50M">$10M - $50M</option>
                  <option value="50M+">$50M+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Number of employees*</label>
                <select 
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all bg-white"
                  required
                >
                  <option value="">Number of employees</option>
                  <option value="1-10">1 - 10</option>
                  <option value="11-50">11 - 50</option>
                  <option value="51-200">51 - 200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Website URL*</label>
                <input 
                  type="url" 
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Website URL" 
                  className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-[#00b67a] outline-none transition-all placeholder:text-gray-400"
                  required 
                />
              </div>
              
              <div className="md:col-span-2 mt-4">
                <button 
                  type="submit"
                  className="w-full bg-[#1c1c1c] text-white font-bold py-4 rounded-full hover:bg-black transition-colors text-lg"
                >
                  Request Demo
                </button>
              </div>
            </form>

            <p className="text-[11px] text-gray-500 mt-6 leading-relaxed">
              By clicking above you accept our <span className="underline cursor-pointer">Privacy Policy</span> and agree to us contacting you via call or email about our products and services. You may unsubscribe at any time by clicking the unsubscribe link in the email or <span className="underline cursor-pointer">contacting us</span>.
            </p>
            <p className="text-[11px] text-gray-500 mt-4">
              This site is protected by reCAPTCHA and the Google <span className="underline cursor-pointer">Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Service</span> apply.
            </p>
          </div>
        </div>
      </div>

      {/* Info Section - Spacing for Form Overlap */}
      <div className="bg-white pt-24 lg:pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center">
            <Search className="w-10 h-10 mb-6 text-gray-800" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4">Should I request a demo?</h3>
            <p className="text-sm text-gray-600 leading-relaxed px-4">
              If you are a business or eCommerce store looking to take your reviews to the next level then yes.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MessageSquare className="w-10 h-10 mb-6 text-gray-800" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4">What happens next?</h3>
            <p className="text-sm text-gray-600 leading-relaxed px-4">
              Someone from our team will be in touch to schedule a call at a time that suits you.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="w-10 h-10 mb-6 text-gray-800" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4">What can I expect?</h3>
            <p className="text-sm text-gray-600 leading-relaxed px-4">
              A live, interactive personalised demo via Zoom or Microsoft Teams. We will answer any specific questions you might have.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="w-10 h-10 mb-6 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-xl">★</span>
            <h3 className="text-xl font-bold mb-4">Are there any obligations?</h3>
            <p className="text-sm text-gray-600 leading-relaxed px-4">
              None whatsoever!
            </p>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-white pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">Trusted by 25,000 business customers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-16 items-center place-items-center opacity-70">
            <span className="text-2xl font-black italic tracking-tighter">AVANT</span>
            <span className="text-2xl font-black tracking-tighter text-blue-600 italic">experian</span>
            <span className="text-2xl font-black tracking-tighter text-red-600">MAPFRE</span>
            <div className="flex flex-col">
               <span className="text-xl font-black bg-blue-800 text-white px-2 py-0.5 leading-none">AMSCOT</span>
               <span className="text-[10px] font-bold uppercase text-gray-600 mt-1">The Money Superstore</span>
            </div>
            <span className="text-2xl font-black text-green-700">StockX</span>
            <span className="text-2xl font-black text-teal-600 italic">Amica</span>
          </div>
          <div className="mt-20">
            <button className="bg-[#4b66f2] text-white font-bold px-10 py-4 rounded-full hover:bg-blue-700 transition-all shadow-md">
              Read their customer stories
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RequestDemo;
