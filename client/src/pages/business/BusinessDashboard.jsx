import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  ArrowRight,
  ChevronRight,
  MoreHorizontal,
  ThumbsUp,
  Clock
} from 'lucide-react';
import api from '../../services/api';

const BusinessDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/business/stats');
        setStats(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          // Company not found -> redirect to onboarding
          navigate('/business/onboarding');
        } else {
          setError('Failed to load dashboard stats');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b67a]"></div>
        <p className="text-gray-500 font-medium">Crunching your numbers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex flex-col items-center text-center">
        <p className="font-bold text-lg mb-2">Oops!</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full font-semibold text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Reviews', 
      value: stats.totalReviews, 
      icon: MessageSquare, 
      color: 'bg-blue-500',
      trend: `${stats.newReviewsLast30Days} new this month`
    },
    { 
      label: 'Average Rating', 
      value: stats.averageRating?.toFixed(1) || '0.0', 
      icon: Star, 
      color: 'bg-[#00b67a]',
      trend: 'Based on all time'
    },
    { 
      label: 'TrustScore', 
      value: stats.trustScore?.toFixed(1) || '0.0', 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      trend: 'Calculated score'
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Good morning, {stats.company.name}!</h1>
          <p className="text-gray-500 font-medium mt-1">Here's what's happening with your reputation today.</p>
        </div>
        <Link 
          to="/business/collect-reviews"
          className="inline-flex items-center gap-2 bg-[#00b67a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#009966] transition-all shadow-lg shadow-[#00b67a]/20"
        >
          Collect more reviews
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-2xl text-white`}>
                <card.icon className="w-6 h-6" />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{card.label}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-4xl font-semibold text-gray-900">{card.value}</p>
            </div>
            <p className="text-xs font-semibold text-gray-500 mt-4 flex items-center gap-1.5 uppercase tracking-tight">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              {card.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reviews */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Recent Reviews</h3>
            <Link to="/business/reviews" className="text-sm font-semibold text-[#00b67a] hover:underline flex items-center gap-1">
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex-1">
            {stats.recentReviews.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {stats.recentReviews.map((review) => (
                  <div key={review._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                          {review.userId.avatar ? (
                            <img src={review.userId.avatar} alt={review.userId.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-semibold text-gray-500">{review.userId.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{review.userId.name}</h4>
                            <span className="text-xs text-gray-400 font-medium">• {new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < review.rating ? 'text-[#00b67a] fill-current' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 font-medium line-clamp-2 italic">"{review.reviewText}"</p>
                        </div>
                      </div>
                      <Link 
                        to={`/business/reviews?reviewId=${review._id}`}
                        className="p-2 text-gray-400 hover:text-[#00b67a] hover:bg-[#00b67a]/5 rounded-lg transition-all shrink-0"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 font-semibold">No reviews yet.</p>
                <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-widest">Share your profile to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Rating Overview */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">Rating Distribution</h3>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.ratingDistribution?.[star] || 0;
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-12 shrink-0">
                    <span className="text-sm font-semibold text-gray-600">{star}</span>
                    <Star className="w-3 h-3 text-gray-400 fill-current" />
                  </div>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00b67a] rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 w-10 text-right uppercase tracking-tighter">
                    {Math.round(percentage)}%
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-2xl">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Response Rate</span>
              <span className="text-lg font-semibold text-gray-900">0%</span>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-2xl">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Avg Response Time</span>
              <span className="text-lg font-semibold text-gray-900">N/A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
