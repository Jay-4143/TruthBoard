import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import { ChevronLeft, Info, Calendar, Type, MessageSquare, Edit2 } from 'lucide-react';

const EditReview = () => {
  const { reviewId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [dateOfExperience, setDateOfExperience] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await api.get('/reviews/me');
        const foundReview = data.find(r => r._id === reviewId);
        
        if (!foundReview) {
          setError('Review not found or you are not authorized to edit it.');
          setLoading(false);
          return;
        }

        setReview(foundReview);
        setRating(foundReview.rating);
        setTitle(foundReview.title);
        setReviewText(foundReview.reviewText);
        // Format date for input: YYYY-MM-DD
        const date = new Date(foundReview.dateOfExperience);
        setDateOfExperience(date.toISOString().split('T')[0]);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch review:', err);
        setError('Failed to load review details.');
        setLoading(false);
      }
    };

    if (user) {
      fetchReview();
    } else {
      navigate('/login');
    }
  }, [user, reviewId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return setError('Please select a star rating');
    if (title.length < 3) return setError('Please provide a descriptive title');
    if (reviewText.length < 8) return setError('Your review must be at least 10 characters');
    if (!dateOfExperience) return setError('Please select a date of experience');

    setSubmitLoading(true);
    setError('');
    try {
      await api.put(`/reviews/${reviewId}`, {
        rating,
        title,
        reviewText,
        dateOfExperience
      });
      setSuccess(true);
      setTimeout(() => navigate('/my-reviews'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update review');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Review Updated!</h2>
          <p className="text-gray-500 font-medium">Your changes have been saved successfully. Redirecting you back to your reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10 px-4">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/my-reviews')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to my reviews</span>
        </button>

        {/* Company Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
            {review?.companyId?.name?.[0] || 'C'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1a1c21] tracking-tight">{review?.companyId?.name}</h2>
            <p className="text-blue-600 font-bold text-sm hover:underline cursor-pointer">{review?.companyId?.website}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-3">
                  <Info className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Rating */}
              <div className="space-y-4 text-center">
                <label className="text-xl font-bold text-[#1a1c21]">Rate your recent experience</label>
                <div className="flex justify-center">
                  <StarRating rating={rating} setRating={setRating} interactive={true} size="h-14 w-14" />
                </div>
              </div>

              {/* Review text */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="text" className="text-lg font-bold text-[#1a1c21]">Tell us more about your experience</label>
                </div>
                <div className="relative">
                  <textarea 
                    id="text" 
                    rows="8" 
                    className="w-full px-5 py-5 border-2 border-gray-100 rounded-2xl outline-none focus:border-blue-600 transition-all text-lg placeholder-gray-300 resize-none shadow-inner" 
                    placeholder="Share your experience..." 
                    value={reviewText} 
                    onChange={(e) => setReviewText(e.target.value)} 
                  />
                  <div className="absolute right-4 bottom-4 text-gray-300">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>
                <button type="button" className="text-blue-600 text-sm font-bold hover:underline">Read our Guidelines for Reviewers</button>
              </div>

              {/* Date */}
              <div className="space-y-4">
                <label htmlFor="date" className="text-lg font-bold text-[#1a1c21] flex items-center gap-2">
                  Date of experience
                  <Info className="w-4 h-4 text-gray-400" />
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    id="date" 
                    className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-600 transition-all text-lg shadow-inner bg-white appearance-none" 
                    value={dateOfExperience} 
                    max={new Date().toISOString().split('T')[0]} 
                    onChange={(e) => setDateOfExperience(e.target.value)} 
                  />
                  <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <label htmlFor="title" className="text-lg font-bold text-[#1a1c21]">Give your review a title</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="title" 
                    className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-600 transition-all text-lg shadow-inner" 
                    placeholder="What's important for people to know?" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                    <Edit2 className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={submitLoading} 
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/20"
                >
                  {submitLoading ? 'Updating...' : 'Submit updated review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
