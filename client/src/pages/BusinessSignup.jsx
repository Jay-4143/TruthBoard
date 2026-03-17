import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const BusinessSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    website: '',
    companyName: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    workEmail: '',
    country: 'United States',
    phone: '',
    employees: '',
    revenue: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Business signup submitted:', formData);
    alert('Thank you for signing up your business!');
    navigate('/business');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 relative selection:bg-[#00b67a] selection:text-white">
      {/* Background Shapes */}
      {/* Top right large circle */}
      <div 
        className="fixed top-[-40%] right-[-10%] w-[60%] h-[120%] bg-[#00b67a] rounded-full opacity-90 hidden lg:block -z-0 pointer-events-none" 
      />
      {/* Bottom left small organic shape (simulated with rounded div) */}
      <div 
        className="fixed bottom-0 left-[-10%] w-[40%] h-[40%] bg-[#00b67a]/20 rounded-tr-[100%] rounded-tl-full hidden lg:block -z-0 pointer-events-none" 
      />
      {/* Bottom right acute triangle/corner */}
      <div 
        className="fixed bottom-0 right-0 w-[40%] h-[40%] bg-[#00b67a] hidden lg:block -z-0 pointer-events-none" 
        style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 40%)' }}
      />
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto min-h-screen flex flex-col lg:flex-row items-start py-12 px-6 sm:px-12 lg:px-24 pt-16 lg:pt-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[45%] lg:pr-16 mb-12 lg:mb-0 flex flex-col pt-0 sm:pt-4 md:pt-8 lg:pt-0">
          
          <div className="mb-16 lg:mb-24 mt-2"> {/* mt-2 to align with form title */}
            <button onClick={() => navigate(-1)} className="inline-flex items-center text-[13px] font-bold text-gray-600 hover:text-black transition-colors w-fit mb-12 lg:mb-16 block">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            <Link to="/" className="flex items-center gap-2 w-fit group">
              <span className="text-[#00b67a] text-[36px] leading-none group-hover:scale-105 transition-transform">★</span>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[24px] tracking-tight leading-none text-gray-900">TruthBoard</span>
                <span className="font-semibold text-[10px] text-gray-500 uppercase tracking-widest mt-1">For Business</span>
              </div>
            </Link>
          </div>

          <div className="space-y-10 lg:space-y-12">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-gray-800" fill="#333" stroke="white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2.5">Build credibility with reviews</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed max-w-[340px]">
                  Collect trustworthy reviews on an open, transparent platform millions of consumers use.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-gray-800" fill="#333" stroke="white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2.5">Grow performance</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed max-w-[340px]">
                  TruthBoard stars and content are proven to convert at higher rates than those of competitors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Form Card) */}
        <div className="w-full lg:w-[55%] flex justify-end items-start">
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 sm:p-12 w-full max-w-[640px] border border-gray-100/50">
            
            <h1 className="text-[28px] font-bold text-gray-900 border-b border-gray-200 pb-6 mb-8 mt-2">
              Create a free account
            </h1>

            <button className="w-full bg-[#1c55fd] text-white font-bold py-3.5 px-4 flex items-center justify-center gap-3 hover:bg-[#1541c4] transition-colors mb-8 shadow-sm group">
              <div className="bg-white p-1.5 flex items-center justify-center"> {/* Simulated Google Icon square */}
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
              Sign up with Google
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">OR</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            <h2 className="text-[#0e144a] font-bold text-lg mb-6">Sign up with email</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <input 
                type="url" 
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website" 
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 shadow-sm transition-shadow"
                required
              />
              
              <input 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company name" 
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 shadow-sm transition-shadow"
                required
              />

              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name" 
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 shadow-sm transition-shadow"
                required
              />

              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name" 
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 shadow-sm transition-shadow"
                required
              />

              <input 
                type="text" 
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Job title" 
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 shadow-sm transition-shadow"
                required
              />

              <input 
                type="email" 
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="Work email" 
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 shadow-sm transition-shadow"
                required
              />

              <div className="grid grid-cols-3 gap-4">
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition-shadow bg-white text-gray-700 appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23737b83%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
                >
                  <option value="Country">Country</option>
                  <option value="US">🇺🇸 US</option>
                  <option value="UK">🇬🇧 UK</option>
                  <option value="CA">🇨🇦 CA</option>
                  <option value="AU">🇦🇺 AU</option>
                </select>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number" 
                  className="col-span-2 border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 shadow-sm transition-shadow"
                  required
                />
              </div>

              <select 
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition-shadow bg-white text-gray-500 appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23737b83%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .9em top 50%', backgroundSize: '.65em auto' }}
                required
              >
                <option value="" disabled hidden>Number of employees</option>
                <option value="1-10" className="text-gray-900">1 - 10</option>
                <option value="11-50" className="text-gray-900">11 - 50</option>
                <option value="51-200" className="text-gray-900">51 - 200</option>
                <option value="200+" className="text-gray-900">200+</option>
              </select>

              <select 
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[3px] p-3 text-[15px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition-shadow bg-white text-gray-500 appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23737b83%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .9em top 50%', backgroundSize: '.65em auto' }}
                required
              >
                <option value="" disabled hidden>Annual revenue</option>
                <option value="<1M" className="text-gray-900">Less than $1M</option>
                <option value="1M-10M" className="text-gray-900">$1M - $10M</option>
                <option value="10M-50M" className="text-gray-900">$10M - $50M</option>
                <option value="50M+" className="text-gray-900">$50M+</option>
              </select>

              <button 
                type="submit"
                className="w-full bg-[#1c55fd] text-white font-bold py-4 rounded-[3px] hover:bg-[#1541c4] transition-colors mt-6 text-base"
              >
                Create free account
              </button>

            </form>

            <div className="mt-8 space-y-4">
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                This site is protected by reCAPTCHA and the Google <span className="text-[#1c55fd] underline cursor-pointer font-semibold">Privacy Policy</span> and <span className="text-[#1c55fd] underline cursor-pointer font-semibold">Terms of Service</span> apply.
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                By submitting this form you accept our <span className="text-[#1c55fd] underline cursor-pointer font-semibold">Privacy Policy</span> and agree to receive emails or calls from TruthBoard about our products and services. You may unsubscribe at any time by clicking the unsubscribe link at the bottom of the email or by contacting us at <span className="text-[#1c55fd] underline cursor-pointer font-semibold">privacy@truthboard.com</span>. TruthBoard's calls may be recorded for training and quality purposes.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;
