import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import StarRating from '../components/StarRating';

const WriteReview = () => {
  const { companyId: initialCompanyId } = useParams();
  const [searchParams] = useSearchParams();
  const companySlug = searchParams.get('slug');
  
  const [step, setStep] = useState(initialCompanyId || companySlug ? 2 : 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [dateOfExperience, setDateOfExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle Initial Company Fetch if ID or Slug provided via URL
  useEffect(() => {
    const fetchSelectedCompany = async () => {
      if (initialCompanyId) {
        try {
          // In a real app, you'd have GET /api/companies/:id
          // For now we search specifically for this ID in the list
          const { data } = await api.get(`/companies`); 
          const found = data.find(c => c._id === initialCompanyId);
          if (found) setSelectedCompany(found);
        } catch (err) { console.error(err); }
      } else if (companySlug) {
        try {
          const { data } = await api.get(`/companies/search?q=${companySlug}`);
          if (data.length > 0) setSelectedCompany(data[0]);
        } catch (err) { console.error(err); }
      }
    };
    fetchSelectedCompany();
  }, [initialCompanyId, companySlug]);

  // Handle Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1) {
        try {
          const { data } = await api.get(`/companies/search?q=${searchQuery}&limit=5`);
          setSearchResults(data);
        } catch (err) { console.error(err); }
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (rating === 0) return setError('Please select a star rating');
    if (title.length < 3) return setError('Please provide a descriptive title');
    if (reviewText.length < 8) return setError('Your review is too short');
    if (!dateOfExperience) return setError('Please select a date of experience');

    setLoading(true);
    setError('');

    try {
      await api.post('/reviews', {
        companyId: selectedCompany._id,
        rating,
        title,
        reviewText,
        dateOfExperience
      });
      navigate(`/company/${selectedCompany.slug}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
          Write a review
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Sharing your experience helps millions make the right choice.
        </p>
      </div>

      {step === 1 && (
        <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <h2 className="text-xl font-bold mb-8 text-center text-[#1a1a2e]">Which company do you want to review?</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a company name..."
              className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 focus:border-[#00b67a] focus:bg-white rounded-2xl outline-none transition-all text-lg shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <div className="absolute right-6 top-5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {searchResults.map((company) => (
              <button
                key={company._id}
                onClick={() => handleSelectCompany(company)}
                className="w-full flex items-center justify-between p-6 hover:bg-green-50 rounded-2xl border border-gray-100 transition-all text-left group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#1a1a2e] text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-[#00b67a] transition-colors">
                    {company.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base uppercase">{company.name}</div>
                    <div className="text-xs text-gray-500">{company.website}</div>
                  </div>
                </div>
                <div className="text-[#00b67a] opacity-0 group-hover:opacity-100 transition-opacity font-bold">Review →</div>
              </button>
            ))}
            {searchQuery.length > 1 && searchResults.length === 0 && (
              <div className="text-center py-10 text-gray-400 italic">No companies found matching &ldquo;{searchQuery}&rdquo;</div>
            )}
            {searchQuery.length === 0 && (
               <div className="text-gray-400 text-sm text-center">Type at least 2 characters to search.</div>
            )}
          </div>
        </div>
      )}

      {step === 2 && selectedCompany && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-start gap-5">
               <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a2e] to-gray-800 text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg">
                 {selectedCompany.name[0]}
               </div>
               <div>
                  <h2 className="text-xl font-black text-[#1a1a2e] tracking-tight">{selectedCompany.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedCompany.website}</p>
                  <button 
                    onClick={() => { setStep(1); setSelectedCompany(null); }}
                    className="text-sm text-[#00b67a] font-bold mt-4 px-3 py-1 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
                  >
                    Change company
                  </button>
               </div>
            </div>
            
            <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
               <div className="text-3xl mb-4">💡</div>
               <h3 className="font-bold text-indigo-900 text-lg mb-2">Honesty is key</h3>
               <p className="text-sm text-indigo-700 leading-relaxed font-medium">
                 Your reviews help people make better decisions and companies improve their products. High-quality reviews include names, dates, and specific incidents.
               </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 space-y-10">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-lg text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}

               <div className="space-y-4">
                 <label className="block text-lg font-black text-gray-900">How would you rate your experience?</label>
                 <StarRating rating={rating} setRating={setRating} interactive={true} size="h-12 w-12" />
               </div>

               {rating > 0 && (
                 <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                   <div className="space-y-3">
                     <div className="flex justify-between items-end">
                       <label htmlFor="text" className="block text-lg font-black text-gray-900">Tell us more about your experience</label>
                       <button type="button" className="text-sm text-[#4162ff] font-bold hover:underline">Want a tip?</button>
                     </div>
                     <textarea
                       id="text"
                       rows="8"
                       className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#00b67a] focus:bg-white transition-all shadow-sm resize-none text-base leading-relaxed"
                       placeholder="What made your experience great? What is this company doing well? Remember to be honest, helpful, and constructive!"
                       value={reviewText}
                       onChange={(e) => setReviewText(e.target.value)}
                     ></textarea>
                     <div className="flex flex-col gap-2">
                       {reviewText.length < 8 && (
                         <div className="flex items-center gap-1 text-xs text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Type {8 - reviewText.length} more characters.
                         </div>
                       )}
                       <button type="button" className="text-xs text-gray-700 font-bold hover:underline text-left">Read our Guidelines for Reviewers</button>
                     </div>
                   </div>

                   <div className="space-y-3">
                     <label htmlFor="title" className="block text-lg font-black text-gray-900">Give your review a title</label>
                     <input
                        type="text"
                        id="title"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#00b67a] focus:bg-white transition-all shadow-sm text-base font-medium"
                       placeholder="What's important for people to know?"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                     />
                     {title.length > 0 && title.length < 3 && (
                       <div className="flex items-center gap-1 text-xs text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Type {3 - title.length} more characters.
                       </div>
                     )}
                   </div>

                   <div className="space-y-3">
                     <div className="flex items-center gap-2">
                       <label htmlFor="date" className="block text-lg font-black text-gray-900">Date of experience</label>
                       <div className="group relative">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                           When did your interaction with the company happen?
                         </div>
                       </div>
                     </div>
                     <input
                        type="date"
                        id="date"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#00b67a] focus:bg-white transition-all shadow-sm text-base font-medium"
                        value={dateOfExperience}
                        onChange={(e) => setDateOfExperience(e.target.value)}
                     />
                   </div>

                   <div className="pt-4 text-xs text-gray-500 leading-relaxed font-medium">
                      By submitting this review, you confirm it’s <button type="button" className="text-[#4162ff] hover:underline">based on a genuine experience</button> and you haven’t received an incentive to write it.
                   </div>

                   <div className="pt-6 border-t border-gray-100">
                     {user ? (
                        <button
                         type="submit"
                         disabled={loading}
                         className={`w-full bg-[#1a1a2e] text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-black hover:-translate-y-1 transition-all active:scale-95 flex justify-center items-center gap-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                       >
                         {loading && <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>}
                         {loading ? 'PUBLISHING...' : 'POST YOUR REVIEW NOW'}
                       </button>
                     ) : (
                       <div className="space-y-6">
                          <div className="text-center">
                            <h4 className="text-lg font-black text-gray-900">Just one last step</h4>
                            <p className="text-sm text-gray-500">It&apos;s your story to tell—sign in to submit.</p>
                          </div>
                          
                          <div className="space-y-3">
                            <button type="button" className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-all">
                              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                              Continue with Google
                            </button>
                            <button type="button" className="w-full flex items-center justify-center gap-3 py-4 bg-[#1877f2] text-white rounded-full font-bold hover:bg-[#166fe5] transition-all">
                              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                              Continue with Facebook
                            </button>
                            <button type="button" className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all">
                              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12.062 3c-1.258 0-2.585.543-3.09 1.15-.558.623-.883 1.547-.883 2.5 0 .95.422 1.82 1.05 2.5.55.6 1.636 1.15 3.09 1.15 1.5 0 2.585-.543 3.09-1.15.558-.623.882-1.547.882-2.5 0-.95-.422-1.82-1.045-2.5C14.598 3.543 13.513 3 12.062 3zm4.5 9.043c-1.146-.683-2.617-1.043-4.5-1.043-1.884 0-3.355.36-4.5 1.043-1.444.85-2.25 2.113-2.25 3.557v2.4h13.5v-2.4c0-1.444-.806-2.707-2.25-3.557z"/></svg>
                              Sign in with Apple
                            </button>
                            <button type="button" onClick={() => navigate('/login')} className="w-full text-center text-[#4162ff] font-bold text-sm hover:underline">Continue with email</button>
                          </div>
                       </div>
                     )}
                   </div>
                 </div>
               )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
