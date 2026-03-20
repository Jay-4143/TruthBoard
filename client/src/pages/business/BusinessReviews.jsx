import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Send,
  User,
   AlertCircle,
   Loader2,
   Trash2
 } from 'lucide-react';
import api from '../../services/api';

const BusinessReviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filter, setFilter] = useState(searchParams.get('status') || 'all');
  const [ratingFilter, setRatingFilter] = useState(searchParams.get('rating') || '');
  
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get('/business/reviews', {
        params: {
          status: filter,
          rating: ratingFilter,
          page,
          limit: 10
        }
      });
      setReviews(res.data.reviews);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filter, ratingFilter, page]);

  const handleFilterChange = (newStatus) => {
    setFilter(newStatus);
    setPage(1);
    setSearchParams({ status: newStatus, rating: ratingFilter });
  };

  const handleRatingChange = (newRating) => {
    setRatingFilter(newRating);
    setPage(1);
    setSearchParams({ status: filter, rating: newRating });
  };

  const handleReplySubmit = async (reviewId) => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    try {
      await api.post(`/business/reviews/${reviewId}/reply`, { reviewText: replyText });
      setReplyText('');
      setReplyingTo(null);
      fetchReviews(); // Refresh list
    } catch (err) {
      console.error('Failed to post reply:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

   const handleDeleteReview = async (reviewId) => {
     if (!window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) return;
     
     try {
       await api.delete(`/reviews/${reviewId}`);
       fetchReviews(); // Refresh list
     } catch (err) {
       console.error('Failed to delete review:', err);
       alert('Failed to delete review. Please try again.');
     }
   };
 
   return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
          <p className="text-gray-500 font-medium mt-1">Read and respond to what customers are saying.</p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          {['all', 'unreplied', 'replied'].map((s) => (
            <button
              key={s}
              onClick={() => handleFilterChange(s)}
              className={`px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                filter === s 
                  ? 'bg-[#1a1c21] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Filters & Tools */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search reviews..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] transition-all font-medium"
          />
        </div>
        
        <select 
          value={ratingFilter}
          onChange={(e) => handleRatingChange(e.target.value)}
          className="w-full sm:w-48 px-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00b67a] font-bold text-gray-600 appearance-none cursor-pointer"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <Loader2 className="w-10 h-10 text-[#00b67a] animate-spin" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Loading Reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {reviews.map((review) => (
              <div 
                key={review._id} 
                className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0">
                        {review.userId?.avatar ? (
                          <img src={review.userId.avatar} alt={review.userId.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{review.userId?.name || 'Anonymous User'}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-[#00b67a] fill-current' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                            {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>

                     <div className="flex items-center gap-2">
                       {review.reply ? (
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest border border-green-100">
                           <CheckCircle2 className="w-3 h-3" />
                           Replied
                         </div>
                       ) : (
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-100">
                           <Clock className="w-3 h-3" />
                           Waiting
                         </div>
                       )}
                       <button 
                         onClick={() => handleDeleteReview(review._id)}
                         className="p-2 text-red-300 hover:text-red-600 transition-colors"
                         title="Delete Review"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                       <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                         <MoreVertical className="w-5 h-5" />
                       </button>
                     </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h5 className="text-xl font-semibold text-gray-900">{review.title}</h5>
                    <p className="text-gray-600 font-medium leading-relaxed italic">
                      “{review.reviewText}”
                    </p>
                  </div>

                  {/* Company Reply Area */}
                  {review.reply ? (
                    <div className="bg-[#f8f9fa] rounded-3xl p-6 sm:p-8 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1a1c21] flex items-center justify-center text-white shrink-0">
                            <Star className="w-4 h-4" fill="currentColor" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-tighter">Your Response</span>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              {new Date(review.reply.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button className="text-xs font-bold text-[#00b67a] uppercase hover:underline">Edit</button>
                      </div>
                      <p className="text-gray-600 font-medium leading-relaxed">
                        {review.reply.reviewText}
                      </p>
                    </div>
                  ) : replyingTo === review._id ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="bg-[#f8f9fa] p-1 rounded-[24px] border-2 border-[#00b67a]">
                        <textarea
                          autoFocus
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your response to the customer..."
                          className="w-full p-6 bg-transparent border-none outline-none focus:ring-0 text-gray-700 font-medium resize-none min-h-[140px]"
                        ></textarea>
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setReplyingTo(null)}
                          className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all"
                        >
                          Cancel
                        </button>
                        <button 
                          disabled={!replyText.trim() || isSubmitting}
                          onClick={() => handleReplySubmit(review._id)}
                          className="px-8 py-2.5 bg-[#00b67a] text-white rounded-full text-sm font-bold hover:bg-[#009966] transition-all flex items-center gap-2 shadow-lg shadow-[#00b67a]/20 disabled:opacity-50"
                        >
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          Post Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setReplyingTo(review._id)}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a1c21] text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-black/10"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Reply to customer
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button 
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-3 bg-white border border-gray-100 rounded-2xl disabled:opacity-30 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[...Array(pages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                      page === i + 1 
                        ? 'bg-[#00b67a] text-white shadow-lg' 
                        : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setPage(page + 1)}
                  disabled={page === pages}
                  className="p-3 bg-white border border-gray-100 rounded-2xl disabled:opacity-30 hover:bg-gray-50 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-20 text-center">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-gray-200" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">No reviews found</h3>
            <p className="text-gray-500 font-medium mt-2 max-w-sm mx-auto">
              We couldn't find any reviews matching your current filters. Try adjusting them or clear all filters.
            </p>
            <button 
              onClick={() => { setFilter('all'); setRatingFilter(''); setPage(1); }}
              className="mt-8 text-[#00b67a] font-bold uppercase tracking-widest text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessReviews;
