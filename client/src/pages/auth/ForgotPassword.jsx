import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck, Sparkle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00b67a]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group transition-all">
             <div className="w-12 h-12 bg-[#00b67a] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#00b67a]/20 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
             </div>
             <span className="text-2xl font-black text-gray-900 tracking-tight">TruthBoard</span>
          </Link>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">Reset Password</h2>
          <p className="text-gray-500 font-semibold text-lg max-w-[280px] mx-auto">
            We'll send you a link to get back into your account.
          </p>
        </div>

        <div className="bg-white py-12 px-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="email" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00b67a] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl font-bold text-gray-900 focus:bg-white focus:border-[#00b67a] outline-none transition-all placeholder:text-gray-300"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-5 px-6 border border-transparent rounded-3xl shadow-xl shadow-[#00b67a]/20 text-lg font-black text-white bg-[#00b67a] hover:bg-[#009966] focus:outline-none focus:ring-4 focus:ring-[#00b67a]/20 transition-all active:scale-[0.98]"
                >
                  Send Password Reset link
                </button>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                >
                  <ArrowLeft size={16} /> Back to Sign In
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
               <div className="w-20 h-20 bg-[#f0fdf4] text-[#00b67a] rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                  <ShieldCheck size={32} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Check your email</h3>
                  <p className="text-gray-500 font-bold leading-relaxed px-4">
                    If an account exists for <span className="text-gray-900">{email}</span>, we've sent instructions to reset your password.
                  </p>
               </div>
               <button
                 onClick={() => setIsSubmitted(false)}
                 className="w-full py-5 bg-gray-100 rounded-3xl font-black text-gray-900 hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
               >
                 Try another email
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
