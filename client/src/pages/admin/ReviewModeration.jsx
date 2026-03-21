import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Check, 
  X, 
  User, 
  Building2, 
  Clock, 
  MessageSquare,
  Search,
  ExternalLink
} from 'lucide-react';
import api from '../../services/api';

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlaggedReviews();
  }, []);

  const fetchFlaggedReviews = async () => {
    try {
      const { data } = await api.get('/admin/flagged-reviews');
      setReviews(data);
    } catch (err) {
      console.error('Error fetching flagged reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (reviewId, status) => {
    try {
      await api.put(`/admin/reviews/${reviewId}/moderate`, { status });
      setReviews(reviews.filter(r => r._id !== reviewId));
    } catch (err) {
      console.error('Error moderating review:', err);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Scanning for flags...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Review Moderation</h1>
        <div className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold text-xs uppercase tracking-widest border border-red-100">
           <AlertTriangle size={14} /> {reviews.length} Flagged
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
             </div>
             <h3 className="text-xl font-bold text-gray-900">Queue is Clear</h3>
             <p className="text-gray-400 font-medium mt-2">All flagged reviews have been moderated. Great job!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-lg group">
              {/* Left Bar Indicator */}
              <div className="w-2 bg-red-400"></div>

              <div className="flex-1 p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-none mb-1.5">{review.userId?.name}</h4>
                      <p className="text-xs font-semibold text-gray-400">{review.userId?.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1.5">
                       <Building2 size={16} className="text-gray-400" />
                       <span className="text-sm font-bold text-gray-900">{review.companyId?.name}</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Under Review</p>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-6 rounded-2xl mb-8 relative">
                   <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(s => (
                        <Check key={s} size={14} className={s <= review.rating ? 'text-emerald-500' : 'text-gray-200'} />
                      ))}
                   </div>
                   <h3 className="font-bold text-lg text-gray-900 mb-2">{review.title}</h3>
                   <p className="text-gray-600 font-medium leading-relaxed italic">"{review.reviewText}"</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-red-500">
                         <AlertTriangle size={16} />
                         <span className="text-sm font-bold">{review.flagCount || 5}+ Flags Detected</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                         <Clock size={16} />
                         <span className="text-sm font-semibold">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleModerate(review._id, 'removed')}
                        className="px-6 py-2.5 bg-red-50 text-red-600 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all active:scale-95"
                      >
                         Delete Review
                      </button>
                      <button 
                        onClick={() => handleModerate(review._id, 'active')}
                        className="px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-full font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                      >
                         Approve (Dismiss)
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewModeration;
