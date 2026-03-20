import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Star, 
  MessageSquare, 
  ArrowUpRight, 
  Calendar,
  Filter,
  Download
} from 'lucide-react';

const BusinessAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 font-medium mt-1">Deep dive into your performance and customer sentiment.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
            {[
              { label: '7D', value: '7d' },
              { label: '30D', value: '30d' },
              { label: '90D', value: '90d' },
              { label: '1Y', value: '1y' }
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setTimeRange(t.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  timeRange === t.value 
                    ? 'bg-[#1a1c21] text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button className="p-3 bg-white rounded-2xl border border-gray-100 text-gray-500 hover:text-gray-900 shadow-sm transition-all">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Visits', value: '1,284', trend: '+12.5%', isPos: true, icon: Users, color: 'text-blue-600' },
          { label: 'Review Conversion', value: '4.2%', trend: '+0.8%', isPos: true, icon: MessageSquare, color: 'text-purple-600' },
          { label: 'TrustScore Change', value: '0.0', trend: '0.0%', isPos: null, icon: Star, color: 'text-[#00b67a]' },
          { label: 'Negative Feedback', value: '2', trend: '-15%', isPos: true, icon: TrendingUp, color: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${
                stat.isPos === true ? 'text-green-600' : stat.isPos === false ? 'text-red-600' : 'text-gray-400'
              }`}>
                {stat.trend}
                {stat.isPos !== null && <ArrowUpRight className="w-3 h-3" />}
              </div>
            </div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Rating Trends</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00b67a]"></div>
                <span className="text-xs font-bold text-gray-500">Your Company</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-xs font-bold text-gray-500">Industry Avg</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative w-full max-w-md aspect-video mb-8 opacity-10">
              <svg viewBox="0 0 100 50" className="w-full h-full text-[#00b67a]">
                <path d="M0 45 Q 25 35, 50 40 T 100 10" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-gray-500 font-bold">Chart visualization is coming soon.</p>
            <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-widest">Connect your data to see trends.</p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Sentiment Analysis</h3>
          <div className="space-y-8 flex-1 flex flex-col justify-center">
            {[
              { label: 'Positive', color: 'bg-[#00b67a]', percent: 85 },
              { label: 'Neutral', color: 'bg-amber-400', percent: 10 },
              { label: 'Negative', color: 'bg-red-500', percent: 5 },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{s.label}</span>
                  <span className="text-sm font-bold text-gray-900">{s.percent}%</span>
                </div>
                <div className="h-4 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${s.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${s.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-center text-gray-400 font-medium italic">
            "Based on automated analysis of your 0 reviews."
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
