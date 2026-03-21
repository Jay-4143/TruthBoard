import { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Building2, 
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-100 rounded-3xl"></div>)}
    </div>
  </div>;

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
    { label: 'Total Reviews', value: stats.totalReviews, icon: MessageSquare, color: 'emerald' },
    { label: 'Total Companies', value: stats.totalCompanies, icon: Building2, color: 'purple' },
    { label: 'Flagged Reviews', value: stats.flaggedReviews, icon: AlertTriangle, color: 'red' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Overview</h1>
        <div className="flex gap-3">
             <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs uppercase tracking-widest">Live Status</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-${card.color}-50 text-${card.color}-600 group-hover:scale-110 transition-transform`}>
                <card.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                <ArrowUpRight size={14} /> 12%
              </div>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">{card.label}</p>
            <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Platform Activity</h3>
          <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">New user registered</p>
                    <p className="text-xs font-semibold text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-300" size={16} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111] p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Platform Insights</h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">
              Reputation metrics are currently stable. Review volume has increased by 15% in the last 24 hours. No critical system alerts.
            </p>
            <button className="bg-[#00b67a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#009966] transition-all">
              Generate Report
            </button>
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-[#00b67a]/10 rounded-full blur-3xl opacity-50" />
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
