import { useState, useEffect, useContext, useRef } from 'react';
import { 
  Link as LinkIcon, 
  Copy, 
  Mail, 
  Send,
  Upload,
  CheckCircle2,
  QrCode,
  Share2,
  Loader2,
  AlertCircle,
  Clock,
  X,
  FileText,
  Users
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const BusinessCollectReviews = () => {
  const { businessUser } = useContext(AuthContext);
  const [company, setCompany] = useState(null);
  const [copied, setCopied] = useState(false);

  // Single invite state
  const [inviteEmail, setInviteEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  // Bulk invite state
  const [bulkEmails, setBulkEmails] = useState([]);
  const [bulkPreview, setBulkPreview] = useState(false);
  const [bulkSending, setBulkSending] = useState(false);
  const [bulkResult, setBulkResult] = useState(null);
  const fileInputRef = useRef(null);

  // History state
  const [invites, setInvites] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyPages, setHistoryPages] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);

  // Active tab
  const [activeTab, setActiveTab] = useState('invite');

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

  useEffect(() => {
    fetchHistory();
  }, [historyPage]);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await api.get('/invite/history', { params: { page: historyPage, limit: 10 } });
      setInvites(res.data.invites);
      setHistoryPages(res.data.pages);
      setHistoryTotal(res.data.total);
    } catch (err) {
      console.error('Failed to fetch invite history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const reviewLink = company 
    ? `${window.location.origin}/company/${company.slug}/review`
    : 'Loading your unique link...';

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── SINGLE INVITE ───
  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setSending(true);
    setSendResult(null);
    try {
      const res = await api.post('/invite', { email: inviteEmail.trim() });
      setSendResult({ type: 'success', message: res.data.message });
      setInviteEmail('');
      fetchHistory();
    } catch (err) {
      setSendResult({ type: 'error', message: err.response?.data?.message || 'Failed to send invite' });
    } finally {
      setSending(false);
    }
  };

  // ─── CSV UPLOAD ───
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const emails = text
        .split(/[\n,;]+/)
        .map(e => e.trim().toLowerCase())
        .filter(e => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
      
      // Deduplicate
      const unique = [...new Set(emails)];
      setBulkEmails(unique);
      setBulkPreview(true);
      setBulkResult(null);
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const handleBulkSend = async () => {
    if (bulkEmails.length === 0) return;

    setBulkSending(true);
    setBulkResult(null);
    try {
      const res = await api.post('/invite/bulk', { emails: bulkEmails });
      setBulkResult(res.data.results);
      setBulkPreview(false);
      setBulkEmails([]);
      fetchHistory();
    } catch (err) {
      setBulkResult({ sent: 0, failed: bulkEmails.length, details: [{ status: 'failed', reason: err.response?.data?.message || 'Bulk send failed' }] });
    } finally {
      setBulkSending(false);
    }
  };

  const removeBulkEmail = (emailToRemove) => {
    setBulkEmails(prev => prev.filter(e => e !== emailToRemove));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Get More Reviews</h1>
        <p className="text-gray-500 font-medium mt-1">Boost your TrustScore by inviting customers to share their feedback.</p>
      </div>

      {/* ─── YOUR REVIEW LINK ─── */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <LinkIcon className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your unique review link</h3>
          <p className="text-gray-500 font-medium mb-6">Share this link on your website, in emails, or via SMS.</p>
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-gray-50 rounded-[24px] border border-gray-100">
            <div className="flex-1 flex items-center px-4 py-3 font-bold text-gray-600 truncate text-sm">
              {reviewLink}
            </div>
            <button 
              onClick={handleCopy}
              className={`h-12 px-8 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
                copied 
                  ? 'bg-[#00b67a] text-white shadow-lg shadow-[#00b67a]/20' 
                  : 'bg-[#1a1c21] text-white hover:bg-black'
              }`}
            >
              {copied ? <><CheckCircle2 className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy Link</>}
            </button>
          </div>
        </div>
      </div>

      {/* ─── TABS ─── */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
        {[
          { id: 'invite', label: 'Send Invites', icon: Mail },
          { id: 'history', label: 'Invite History', icon: Clock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-[#1a1c21] text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── SEND INVITES TAB ─── */}
      {activeTab === 'invite' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Single Email Invite */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Email Invitation</h4>
                  <p className="text-sm text-gray-500 font-medium">Send a personalized review request</p>
                </div>
              </div>
              
              <form onSubmit={handleSendInvite} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="customer@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#00b67a] focus:border-transparent transition-all font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending || !inviteEmail.trim()}
                  className="h-[52px] px-8 bg-[#00b67a] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#009966] transition-all shadow-lg shadow-[#00b67a]/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {sending ? 'Sending...' : 'Send Invite'}
                </button>
              </form>

              {sendResult && (
                <div className={`mt-4 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                  sendResult.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-100' 
                    : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                  {sendResult.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  {sendResult.message}
                </div>
              )}
            </div>

            {/* Bulk CSV Upload */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Bulk Invitations</h4>
                  <p className="text-sm text-gray-500 font-medium">Upload a CSV file with customer emails (max 50)</p>
                </div>
              </div>

              {!bulkPreview ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleCSVUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-12 border-2 border-dashed border-gray-200 rounded-3xl hover:border-[#00b67a] hover:bg-green-50/30 transition-all group flex flex-col items-center gap-3"
                  >
                    <Upload className="w-10 h-10 text-gray-300 group-hover:text-[#00b67a] transition-colors" />
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-600 group-hover:text-[#00b67a]">Click to upload CSV</p>
                      <p className="text-xs text-gray-400 mt-1">One email per line, or comma/semicolon separated</p>
                    </div>
                  </button>

                  {bulkResult && (
                    <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        Bulk Send Results: {bulkResult.sent} sent, {bulkResult.skipped} skipped, {bulkResult.failed} failed
                      </p>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {bulkResult.details?.map((d, i) => (
                          <div key={i} className={`text-xs font-medium flex items-center gap-2 ${
                            d.status === 'sent' ? 'text-green-600' : d.status === 'skipped' ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {d.status === 'sent' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            {d.email} — {d.reason || 'Sent'}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold text-gray-900">{bulkEmails.length} emails found</p>
                    <button onClick={() => { setBulkPreview(false); setBulkEmails([]); }} className="text-xs font-bold text-red-500 hover:underline">
                      Cancel
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-2 mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    {bulkEmails.map((email) => (
                      <div key={email} className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-gray-100">
                        <span className="text-sm font-medium text-gray-700">{email}</span>
                        <button onClick={() => removeBulkEmail(email)} className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleBulkSend}
                    disabled={bulkSending || bulkEmails.length === 0}
                    className="w-full h-14 bg-[#00b67a] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#009966] transition-all shadow-lg shadow-[#00b67a]/20 disabled:opacity-50"
                  >
                    {bulkSending ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending {bulkEmails.length} emails...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send {bulkEmails.length} Invitations</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#1a1c21] text-white p-8 rounded-[32px] shadow-xl shadow-black/20">
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
      )}

      {/* ─── INVITE HISTORY TAB ─── */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-gray-900">Invitation History</h3>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{historyTotal} total</span>
            </div>
          </div>

          {historyLoading ? (
            <div className="flex flex-col items-center justify-center p-16 space-y-4">
              <Loader2 className="w-8 h-8 text-[#00b67a] animate-spin" />
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Loading...</p>
            </div>
          ) : invites.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {invites.map((invite) => (
                <div key={invite._id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{invite.email}</p>
                      <p className="text-xs text-gray-400 font-medium">
                        Sent {new Date(invite.sentAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                    invite.status === 'completed' 
                      ? 'bg-green-50 text-green-600 border-green-100' 
                      : invite.status === 'expired'
                      ? 'bg-gray-50 text-gray-400 border-gray-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {invite.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-gray-200" />
              </div>
              <div>
                <p className="text-gray-900 font-bold">No invitations sent yet</p>
                <p className="text-sm text-gray-400 font-medium mt-1">Start by sending your first invite above!</p>
              </div>
            </div>
          )}

          {historyPages > 1 && (
            <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-50">
              {[...Array(historyPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHistoryPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    historyPage === i + 1
                      ? 'bg-[#00b67a] text-white shadow-lg'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessCollectReviews;
