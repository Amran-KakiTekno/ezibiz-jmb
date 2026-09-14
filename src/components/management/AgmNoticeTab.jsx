import React, { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import { Megaphone, Vote, CheckCircle2, Plus, AlertCircle } from 'lucide-react';

export default function AgmNoticeTab({ 
  resolutions, 
  onCastVote, 
  onPublishAnnouncement, 
  showToast 
}) {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [votingPending, setVotingPending] = useState(null);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      showToast('Sila lengkapkan tajuk dan kandungan notis rasmi', 'error');
      return;
    }
    const newNotice = {
      id: `post_${Date.now()}`,
      category: 'ANNOUNCEMENT',
      title: `ðŸ“¢ ${noticeTitle}`,
      author: 'Pejabat Pengurusan JMB',
      authorRole: 'JMB Committee',
      unit: 'Management',
      isOfficial: true,
      timestamp: 'Baru diterbitkan',
      content: noticeContent,
      likes: 0,
      readReceiptsCount: 1,
      pinned: true
    };
    onPublishAnnouncement(newNotice);
    setNoticeTitle('');
    setNoticeContent('');
    showToast('Notis rasmi berjaya diterbitkan kepada semua residen!', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
      {/* Broadcast Announcement Form */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Hebahan Notis Rasmi JMB</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Siaran ini akan disematkan di bahagian atas suapan semua residen.</p>
        </div>

        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Tajuk Pengumuman</label>
            <input
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="Cth: Penutupan Sementara Kolam Renang untuk Servis Kimia"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Kandungan Notis</label>
            <textarea
              rows={4}
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              placeholder="Sertakan tarikh, masa yang terkesan dan tindakan yang perlu diambil oleh residen..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <Megaphone className="w-4 h-4" />
            <span>Terbitkan Siaran Rasmi</span>
          </button>
        </form>
      </div>

      {/* AGM Resolutions E-Voting */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Resolusi AGM & Undian Statutori</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sistem e-undian telus mengikut syarat kuorum Akta Pengurusan Strata 2013.</p>
        </div>

        <div className="space-y-4">
          {resolutions.map(res => {
            const approvalPercent = Math.round((res.votesInFavor / res.totalVoted) * 100);
            return (
              <div key={res.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    res.type === 'SPECIAL_RESOLUTION'
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300'
                      : 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300'
                  }`}>
                    {res.type === 'SPECIAL_RESOLUTION' ? 'Resolusi Khas (75% Kuorum)' : 'Resolusi Biasa (>50%)'}
                  </span>

                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Tutup: {res.closesAt}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{res.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{res.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Persetujuan Kuorum ({approvalPercent}%)</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {res.votesInFavor} Menyokong â€¢ {res.votesAgainst} Menentang
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500" 
                      style={{ width: `${approvalPercent}%` }}
                    ></div>
                    <div 
                      className="bg-rose-500 h-full transition-all duration-500" 
                      style={{ width: `${100 - approvalPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-400 pt-1">
                    <span>Diperlukan: {res.statutoryRequirement}</span>
                    <span>Jumlah Mengundi: {res.totalVoted} / {res.quorumNeeded} Pemilik</span>
                  </div>
                </div>

                {/* Voting Actions */}
                {res.status === 'VOTING_ACTIVE' && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setVotingPending({
                          resId: res.id,
                          voteType: 'FAVOR',
                          resTitle: res.title
                        });
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold text-xs transition-colors min-h-[44px] cursor-pointer"
                    >
                      âœ“ Sokong (Undi Ya)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVotingPending({
                          resId: res.id,
                          voteType: 'AGAINST',
                          resTitle: res.title
                        });
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-semibold text-xs transition-colors min-h-[44px] cursor-pointer"
                    >
                      âœ• Bantah (Undi Tidak)
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* E-Voting Confirmation Modal */}
      <ConfirmModal
        open={!!votingPending}
        title={votingPending?.voteType === 'FAVOR' ? 'Sahkan Undian Menyokong' : 'Sahkan Undian Membantah'}
        body={`Adakah anda pasti ingin mengundi ${votingPending?.voteType === 'FAVOR' ? 'MENYOKONG' : 'MEMBANTAH'} bagi "${votingPending?.resTitle}"? Undi tidak boleh dibatalkan.`}
        confirmLabel={votingPending?.voteType === 'FAVOR' ? 'Undi Menyokong' : 'Undi Membantah'}
        danger={votingPending?.voteType === 'AGAINST'}
        onConfirm={() => {
          if (votingPending) {
            onCastVote(votingPending.resId, votingPending.voteType);
            if (votingPending.voteType === 'FAVOR') {
              showToast('Undian sokongan anda telah direkodkan ke dalam lejar undian!', 'success');
            } else {
              showToast('Undian bantahan anda telah direkodkan!', 'info');
            }
            setVotingPending(null);
          }
        }}
        onCancel={() => setVotingPending(null)}
      />
    </div>
  );
}

