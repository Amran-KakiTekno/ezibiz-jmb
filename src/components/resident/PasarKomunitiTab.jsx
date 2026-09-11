import React, { useState } from 'react';
import { ShoppingBag, Plus, MessageSquare } from 'lucide-react';

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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                communityFilter === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Kongsi ke Komuniti</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div 
            key={post.id}
            className={`rounded-2xl p-5 border transition-all ${
              post.pinned 
                ? 'bg-gradient-to-r from-slate-900 to-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-500/5'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-white">{post.author}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      post.isOfficial 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {post.unit}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{post.timestamp}</span>
                </div>
              </div>

              {post.price && (
                <span className="font-mono font-bold text-amber-400 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {post.price}
                </span>
              )}
            </div>

            <h4 className="font-bold text-slate-100 text-sm mb-2">{post.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span>❤️ {post.likes} Disukai</span>
                {post.readReceiptsCount && (
                  <span className="text-emerald-400">✓ {post.readReceiptsCount} Residen Telah Membaca</span>
                )}
              </div>

              {post.whatsapp && (
                <a
                  href={`https://wa.me/${post.whatsapp}?text=${encodeURIComponent(`Salam ${post.author}, saya berminat dengan siaran anda di EziBiz JMB: "${post.title}"`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Jiran</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Kongsi ke Komuniti Jiran</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Saluran</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                  >
                    <option value="MARKETPLACE">Pasar Komuniti (Jual Beli)</option>
                    <option value="CARPOOL">Kongsi Kereta (Carpool)</option>
                    <option value="PARKING">Sewa Petak Parkir</option>
                    <option value="LOST_FOUND">Barang Hilang & Jumpa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Harga / Kadar (Pilihan)</label>
                  <input
                    type="text"
                    value={newPostPrice}
                    onChange={(e) => setNewPostPrice(e.target.value)}
                    placeholder="Cth: 15.00 / 120.00 sebulan"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tajuk Siaran</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Cth: Kek Pisang Coklat Homemade Segar Panas"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Kandungan Terperinci</label>
                <textarea
                  rows={3}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Kongsikan butiran lanjut, masa penghantaran atau maklumat lain..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md"
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
