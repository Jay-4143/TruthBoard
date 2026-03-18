import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { 
  Star, 
  Eye, 
  ThumbsUp, 
  Edit2, 
  Trash2, 
  Share2, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get('/reviews/me');
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setError('Failed to load reviews. Please try again.');
        setLoading(false);
      }
    };

    if (user) {
      fetchReviews();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you wish to delete your review?')) {
      try {
        await api.delete(`/reviews/${reviewId}`);
        setReviews(reviews.filter(r => r._id !== reviewId));
      } catch (err) {
        console.error('Failed to delete review:', err);
        alert('Failed to delete review. Please try again.');
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b67a]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-3xl font-bold border-4 border-white shadow-sm">
              {getInitials(user?.name)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User Name'}</h1>
              <p className="text-gray-500 font-medium">{user?.location || 'India'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">{reviews.length}</span>
              <div className="flex items-center gap-1.5 text-gray-500 font-medium text-sm">
                <Star className="w-4 h-4 text-blue-500" />
                <span>Review{reviews.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">9</span>
              <div className="flex items-center gap-1.5 text-gray-500 font-medium text-sm">
                <Eye className="w-4 h-4 text-blue-500" />
                <span>Read</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">0</span>
              <div className="flex items-center gap-1.5 text-gray-500 font-medium text-sm">
                <ThumbsUp className="w-4 h-4 text-blue-500" />
                <span>Useful</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

        <div className="space-y-8">
          {reviews.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-lg">You haven't written any reviews yet.</p>
              <Link to="/" className="text-[#00b67a] font-bold mt-4 inline-block hover:underline">
                Start reviewing companies now
              </Link>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-gray-500">Review of</span>
                  <Link to={`/company/${review.companyId?.slug}`} className="text-blue-600 hover:underline">
                    {review.companyId?.name || 'Company'}
                  </Link>
                </div>

                {/* Pending message placeholder */}
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-3 flex items-center gap-3 text-cyan-800 text-sm font-medium">
                  <Info className="w-4 h-4" />
                  <span>Your review is pending. <button className="underline">Read more</button></span>
                </div>

                {/* Review Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                          {getInitials(user?.name)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{user?.name}</div>
                          <div className="text-xs text-gray-500">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {new Date().getTime() - new Date(review.createdAt).getTime() < 86400000 ? 'Today' : '2 days ago'}
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-8 h-8 flex items-center justify-center rounded-[2px] ${
                            i < review.rating ? 'bg-[#00b67a]' : 'bg-gray-200'
                          }`}
                        >
                          <Star className="w-5 h-5 text-white fill-current" />
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{review.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{review.reviewText}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                        {formatDate(review.dateOfExperience)}
                      </div>
                      <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                        Unprompted review
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => navigate(`/edit-review/${review._id}`)}
                          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(review._id)}
                          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className="text-gray-300 hover:text-gray-900 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {reviews.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="px-6 py-2 border border-gray-200 rounded-md text-gray-400 font-bold text-sm bg-white cursor-not-allowed">
              Previous
            </button>
            <button className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-md text-blue-600 font-bold flex items-center justify-center text-sm shadow-sm">
              1
            </button>
            <button className="px-6 py-2 border border-gray-200 rounded-md text-gray-500 font-bold text-sm bg-white hover:bg-gray-50 transition-colors">
              Next page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
