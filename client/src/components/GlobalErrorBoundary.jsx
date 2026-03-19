import React, { Component } from 'react';

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.group("🔴 Global Application Error");
    console.error("Error:", error);
    console.error("Info:", errorInfo);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fffcf8] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Application Error</h1>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              We encountered an unexpected issue while loading this page. Our team has been notified.
            </p>
            
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 mb-10 text-left overflow-auto max-h-40">
               <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-2 font-bold">Error Summary</p>
               <p className="text-xs font-mono text-red-600 break-words">
                 {this.state.error?.toString() || "Unknown runtime exception"}
               </p>
            </div>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-[#00b67a] hover:bg-[#009966] text-white py-4 rounded-full font-bold text-[15px] shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Back to Home
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-gray-400 text-sm font-bold hover:text-gray-600 transition-colors"
            >
              Try Refreshing Page
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-2 opacity-40">
             <span className="text-[#00b67a] text-xl">★</span>
             <span className="text-sm font-bold text-[#002e21] tracking-tighter">TruthBoard Safety System</span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
