import { Link } from 'react-router-dom';
import { Home, Search, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

const Page404 = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#00b67a]/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      <div className="relative text-center max-w-2xl">
         <div className="inline-flex items-center gap-2 mb-12 animate-bounce">
            <div className="w-16 h-16 bg-[#002e21] rounded-[2rem] flex items-center justify-center text-white shadow-2xl border border-emerald-800/20">
               <AlertCircle size={32} className="text-[#00b67a]" />
            </div>
         </div>

         <h1 className="text-[180px] font-[900] text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 leading-none mb-4 select-none tracking-tighter">
           404
         </h1>
         
         <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-8">Page Not Found</h2>
         
         <p className="text-xl font-bold text-gray-400 leading-relaxed mb-12 px-12">
           The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
         </p>

         <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#00b67a] text-white rounded-[2rem] font-bold text-lg shadow-2xl shadow-[#00b67a]/30 hover:bg-[#009966] hover:scale-105 transition-all"
            >
               <Home size={20} /> Back to Home
            </Link>
            <Link 
              to="/companies" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-[2rem] font-bold text-lg border border-gray-100 shadow-xl shadow-gray-200/50 hover:bg-gray-50 transition-all hover:scale-105"
            >
               <Search size={20} /> Browse Companies
            </Link>
         </div>

         <div className="mt-20 pt-12 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-300 font-bold uppercase tracking-widest text-xs">
            <ShieldCheck size={16} /> TRUTHBOARD SECURITY VERIFIED
         </div>
      </div>
    </div>
  );
};

export default Page404;
