import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, User, Building2, Calendar, Flag, MessageCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { Navigation } from '../components/Navigation';

const ReviewDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await api.get(`/reviews/${id}`);
        setReview(data);
      } catch (err) {
        console.error('Error fetching review:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b67a]"></div></div>;
  if (!review) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p className="text-xl font-bold text-gray-400 uppercase tracking-widest">Review not found</p></div>;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link to={-1} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm mb-12 group transition-all">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </Link>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Header */}
          <div className="p-12 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#00b67a] font-black text-2xl shadow-inner">
                {review.userId?.name?.[0]}
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                   {review.userId?.name}
                   <ShieldCheck size={20} className="text-[#00b67a]" />
                </h1>
                <p className="font-bold text-gray-400 uppercase tracking-widest text-xs flex items-center gap-2">
                   <Calendar size={14} /> Experienced {new Date(review.dateOfExperience).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="text-right">
               <div className="flex items-center justify-end gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={28} className={s <= review.rating ? 'text-[#00b67a] fill-[#00b67a]' : 'text-gray-200'} />
                  ))}
               </div>
               <p className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Rating: {review.rating}/5</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-12">
            <h2 className="text-2xl font-black text-gray-900 mb-6 leading-tight">"{review.title}"</h2>
            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed mb-12">
              {review.reviewText}
            </div>

            {/* Company Link Card */}
            <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex items-center justify-between group transition-all hover:bg-white hover:shadow-lg">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-[#002e21] flex items-center justify-center text-white font-bold shadow-lg">
                    <Building2 size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Review for company</p>
                    <h3 className="text-xl font-black text-gray-900 transition-colors group-hover:text-[#00b67a]">{review.companyId?.name}</h3>
                 </div>
              </div>
              <Link to={`/company/${review.companyId?.slug}`} className="px-8 py-3 bg-white border-2 border-gray-100 rounded-full font-bold text-gray-900 transition-all hover:bg-[#002e21] hover:text-white hover:border-[#002e21]">
                 View Profile
              </Link>
            </div>
          </div>

          {/* Footer Footer Action */}
          <div className="px-12 py-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
             <div className="flex items-center gap-6 text-gray-400">
                <button className="flex items-center gap-2 hover:text-emerald-600 font-bold transition-colors">
                   <MessageCircle size={18} /> 0 Responses
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 font-bold transition-colors">
                   <Flag size={18} /> Report
                </button>
             </div>
             <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Review ID: {review._id}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewDetail;
