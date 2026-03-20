import { useState, useEffect, useContext } from 'react';
import { 
  Link as LinkIcon, 
  Copy, 
  Mail, 
  MessageSquare, 
  Chrome, 
  Share2,
  CheckCircle2,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const BusinessCollectReviews = () => {
  const { user } = useContext(AuthContext);
  const [company, setCompany] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get('/business/profile');
        setCompany(res.data);
      } catch (err) {
        console.error('Failed to fetch company profile:', err);
      }
    };
    fetchCompany();
  }, []);

  const reviewLink = company 
    ? `${window.location.origin}/company/${company.slug}/review`
    : `Loading your unique link...`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Get More Reviews</h1>
        <p className="text-gray-500 font-medium mt-1">Boost your TrustScore by inviting more customers to share their feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Link Card */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <LinkIcon className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your unique review link</h3>
              <p className="text-gray-500 font-medium mb-8">Share this link directly on your website, in emails, or via SMS.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-gray-50 rounded-[24px] border border-gray-100">
                <div className="flex-1 flex items-center px-4 py-3 font-bold text-gray-600 truncate">
                  {reviewLink}
                </div>
                <button 
                  onClick={handleCopy}
                  className={`h-14 px-8 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    copied 
                      ? 'bg-[#00b67a] text-white shadow-lg shadow-[#00b67a]/20' 
                      : 'bg-[#1a1c21] text-white hover:bg-black'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Invitation Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Email Invitations</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Send personalized emails to your customers asking for feedback after their purchase.
              </p>
              <button className="mt-6 text-sm font-bold text-blue-600 uppercase tracking-widest hover:underline">Setup Emails</button>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">SMS Invitations</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Reach customers directly on their mobile phones for higher response rates.
              </p>
              <button className="mt-6 text-sm font-bold text-amber-600 uppercase tracking-widest hover:underline">Setup SMS</button>
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-[#1a1c21] text-white p-8 rounded-[32px] shadow-gl shadow-black/20">
            <QrCode className="w-12 h-12 text-[#00b67a] mb-6" />
            <h4 className="text-xl font-bold mb-2">QR Code</h4>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
              Download your custom QR code for print materials, packaging, or in-store displays.
            </p>
            <button className="w-full h-12 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-all">
              Download PNG
            </button>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <Share2 className="w-10 h-10 text-gray-200 mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-2">Social Sharing</h4>
            <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6">
              Share your review link directly to your social media platforms.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 h-10 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all">
                <span className="text-xs font-bold text-gray-600">Twitter</span>
              </button>
              <button className="flex-1 h-10 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all">
                <span className="text-xs font-bold text-gray-600">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCollectReviews;
