import React, { useState } from 'react';
import { ShoppingBag, Plus, MessageSquare } from 'lucide-react';
import { useModalA11y } from '../ConfirmModal';

export default function PasarKomunitiTab({ 
  resident, 
  posts, 
  onCreatePost, 
  showToast 
}) {
  const [communityFilter, setCommunityFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostCategory, setNewPostCategory] = useState('MARKETPLACE');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostPrice, setNewPostPrice] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const createModalRef = useModalA11y(showCreateModal, () => setShowCreateModal(false));

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      showToast('Sila lengkapkan tajuk dan kandungan siaran', 'error');
      return;
    }
    const newPost = {
      id: `post_${Date.now()}`,
      category: newPostCategory,
      title: newPostTitle,
      author: resident.name,
      authorRole: 'Verified Resident',
      unit: resident.unitNo,
      isOfficial: false,
      timestamp: 'Baru sebentar',
      price: newPostPrice ? `RM ${newPostPrice}` : null,
      content: newPostContent,
      whatsapp: resident.phone.replace(/[^0-9]/g, ''),
      likes: 1,
      commentsCount: 0
    };
    onCreatePost(newPost);
    setNewPostTitle('');
    setNewPostPrice('');
    setNewPostContent('');
    setShowCreateModal(false);
    showToast('Siaran anda telah dikongsikan ke Pasar Komuniti!', 'success');
  };

  const filteredPosts = posts.filter(p => {
    if (communityFilter === 'ALL') return true;
    return p.category === communityFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto tab-scrollbar pb-1 sm:pb-0">
          {['ALL', 'ANNOUNCEMENT', 'MARKETPLACE', 'CARPOOL', 'PARKING', 'LOST_FOUND'].map(cat => (
            <button
              key={cat}
              onClick={() => setCommunityFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
                communityFilter === cat
                  ? 'bg-amber-500 text-black font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-rim'
              }`}
            >
              {cat === 'ALL' ? 'Semua Saluran' :
               cat === 'ANNOUNCEMENT' ? '📢 Notis Rasmi' :
               cat === 'MARKETPLACE' ? '🥖 Pasar Komuniti' :
               cat === 'CARPOOL' ? '🚗 Kongsi Kereta' :
               cat === 'PARKING' ? '🅿️ Sewa Parkir' : '🔍 Hilang & Jumpa'}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-rim transition-colors whitespace-nowrap cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Kongsi ke Komuniti</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map(post => (
          <div 
            key={post.id}
            className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
              post.pinned 
                ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-zinc-950 dark:to-amber-950/20 border-amber-500/30 shadow-rim'
                : 'bg-white dark:bg-zinc-950/80 border-slate-200 dark:border-white/[0.08] shadow-rim hover:border-slate-300 dark:hover:border-white/[0.15]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] shadow-rim flex items-center justify-center font-bold text-xs text-amber-600 dark:text-amber-400">
                    {post.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">{post.author}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        post.isOfficial 
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-mono'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-mono'
                      }`}>
                        {post.unit}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-500">{post.timestamp}</span>
                  </div>
                </div>

                {post.price && (
                  <span className="font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-rim">
                    {post.price}
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-slate-900 dark:text-zinc-100 text-sm mb-2">{post.title}</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{post.content}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
              <div className="flex items-center gap-4 text-[11px]">
                <span>❤️ {post.likes}</span>
                {post.readReceiptsCount && (
                  <span className="text-emerald-600 dark:text-emerald-400">✓ {post.readReceiptsCount} Dibaca</span>
                )}
              </div>

              {post.whatsapp && (
                <a
                  href={`https://wa.me/${post.whatsapp}?text=${encodeURIComponent(`Salam ${post.author}, saya berminat dengan siaran anda di EziBiz JMB: "${post.title}"`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold text-xs transition-colors min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            ref={createModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-post-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/[0.1] shadow-card-elevated rounded-2xl overflow-hidden p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
              <h3 id="create-post-title" className="font-semibold text-slate-900 dark:text-white text-base">Kongsi ke Komuniti Jiran</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                aria-label="Tutup"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">Saluran</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="MARKETPLACE">Pasar Komuniti (Jual Beli)</option>
                    <option value="CARPOOL">Kongsi Kereta (Carpool)</option>
                    <option value="PARKING">Sewa Petak Parkir</option>
                    <option value="LOST_FOUND">Barang Hilang & Jumpa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">Harga / Kadar (Pilihan)</label>
                  <input
                    type="text"
                    value={newPostPrice}
                    onChange={(e) => setNewPostPrice(e.target.value)}
                    placeholder="Cth: 15.00 / 120.00 sebulan"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">Tajuk Siaran</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Cth: Kek Pisang Coklat Homemade Segar Panas"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">Kandungan Terperinci</label>
                <textarea
                  rows={3}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Kongsikan butiran lanjut, masa penghantaran atau maklumat lain..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:border-amber-500/50 resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 text-xs font-medium border border-slate-200 dark:border-white/[0.08] cursor-pointer min-h-[44px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow-rim cursor-pointer min-h-[44px]"
                >
                  Terbitkan Siaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
