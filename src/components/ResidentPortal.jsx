import React, { useState } from 'react';
import { 
  CreditCard, 
  Wrench, 
  QrCode, 
  ShoppingBag, 
  BarChart3, 
  X
} from 'lucide-react';
import ResidentBillsTab from './resident/ResidentBillsTab';
import ResidentDefectsTab from './resident/ResidentDefectsTab';
import VisitorPassTab from './resident/VisitorPassTab';
import PasarKomunitiTab from './resident/PasarKomunitiTab';
import GlassboxTab from './resident/GlassboxTab';

export default function ResidentPortal({
  resident,
  building,
  defects,
  posts,
  parcels,
  expenditures,
  onPayBill,
  onViewReceipt,
  onReportDefect,
  onCreatePost,
  showToast,
  activeTab: controlledTab,
  onTabChange,
  t = (k) => k
}) {
  const [internalTab, setInternalTab] = useState('bills'); // bills | defects | visitor | community | glassbox
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;
  const setActiveTab = onTabChange || setInternalTab;

  // Quick Pay Modal State
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('duitnow'); // duitnow | fpx
  const [selectedBank, setSelectedBank] = useState('Maybank2u');
  const [isProcessingPay, setIsProcessingPay] = useState(false);

  const handleExecutePayment = () => {
    setIsProcessingPay(true);
    setTimeout(() => {
      setIsProcessingPay(false);
      setShowPayModal(false);
      onPayBill();
    }, 1200);
  };

  const residentParcels = parcels.filter(p => p.unit === resident.unitNo && p.status === 'AWAITING_PICKUP');

  return (
    <div className="space-y-6 pb-12">
      {/* Resident Welcome & Status Bar */}
      <div className="rounded-2xl bg-zinc-950/80 border border-white/[0.08] shadow-rim p-5 sm:p-6 relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                {resident.role}
              </span>
              <span className="text-xs text-zinc-400">Unit:</span>
              <span className="font-mono font-bold text-amber-400">{resident.unitNo}</span>
              <span className="text-xs text-zinc-500">• {resident.tower}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Selamat Sejahtera, {resident.name}
            </h2>
            <p className="text-xs text-zinc-400">
              Petak Parkir: <span className="text-zinc-300 font-medium">{resident.parkingBay}</span> • Kad Akses: <span className="font-mono text-zinc-300">{resident.accessCardNo}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/[0.08] shadow-rim text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-zinc-400">Palang Akses:</span>
              <span className="font-semibold text-emerald-400">AKTIF</span>
            </div>

            {residentParcels.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 shadow-rim">
                <span>📦 {residentParcels.length} Bungkusan di Guardhouse</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-900/60 border border-white/[0.08] shadow-rim rounded-xl overflow-x-auto tab-scrollbar">
        <button
          onClick={() => setActiveTab('bills')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'bills'
              ? 'bg-amber-500 text-black font-semibold shadow-xs'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{t('tabBills') || 'Bills & Dues'}</span>
          {resident.currentBill.status === 'PENDING' && (
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('defects')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'defects'
              ? 'bg-amber-500 text-black font-semibold shadow-xs'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>{t('tabDefects') || 'Defect Desk'}</span>
        </button>

        <button
          onClick={() => setActiveTab('visitor')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'visitor'
              ? 'bg-amber-500 text-black font-semibold shadow-xs'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>{t('tabVisitor') || 'Visitor Pass'}</span>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'community'
              ? 'bg-amber-500 text-black font-semibold shadow-xs'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t('tabMarket') || 'Community Market'}</span>
        </button>

        <button
          onClick={() => setActiveTab('glassbox')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'glassbox'
              ? 'bg-amber-500 text-black font-semibold shadow-xs'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t('tabGlassbox') || 'Glassbox Accounts'}</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'bills' && (
        <ResidentBillsTab
          resident={resident}
          onPayClick={() => setShowPayModal(true)}
          onViewReceiptClick={onViewReceipt}
        />
      )}

      {activeTab === 'defects' && (
        <ResidentDefectsTab
          resident={resident}
          defects={defects}
          onReportDefect={onReportDefect}
          showToast={showToast}
        />
      )}

      {activeTab === 'visitor' && (
        <VisitorPassTab
          resident={resident}
          building={building}
          showToast={showToast}
        />
      )}

      {activeTab === 'community' && (
        <PasarKomunitiTab
          resident={resident}
          posts={posts}
          onCreatePost={onCreatePost}
          showToast={showToast}
        />
      )}

      {activeTab === 'glassbox' && (
        <GlassboxTab
          building={building}
          expenditures={expenditures}
        />
      )}

      {/* QUICK PAY MODAL (DUITNOW QR & FPX SIMULATOR) */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-zinc-950 border border-white/[0.1] shadow-card-elevated rounded-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="font-semibold text-white text-base">Bayaran Selamat JMB</h3>
                <p className="text-xs text-zinc-400">Unit: {resident.unitNo} • {resident.currentBill.period}</p>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08] shadow-rim text-center">
              <span className="text-xs text-zinc-400 block">Jumlah Bayaran</span>
              <span className="font-mono tabular-nums font-bold text-3xl text-amber-400">
                RM {resident.currentBill.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('duitnow')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  paymentMethod === 'duitnow'
                    ? 'bg-rose-500/15 border-rose-500/50 text-rose-400 font-bold shadow-rim'
                    : 'bg-zinc-900/60 border-white/[0.08] text-zinc-400 hover:text-white'
                }`}
              >
                DuitNow QR Pantas
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('fpx')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  paymentMethod === 'fpx'
                    ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-400 font-bold shadow-rim'
                    : 'bg-zinc-900/60 border-white/[0.08] text-zinc-400 hover:text-white'
                }`}
              >
                FPX Perbankan Internet
              </button>
            </div>

            {paymentMethod === 'duitnow' ? (
              <div className="p-4 rounded-xl bg-white text-center space-y-2">
                <p className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide">
                  DuitNow QR • Standard Pembayaran Kebangsaan
                </p>
                <div className="w-40 h-40 mx-auto border-2 border-rose-600 p-2 flex items-center justify-center rounded-lg">
                  <QrCode className="w-32 h-32 text-zinc-950" />
                </div>
                <p className="text-[10px] text-zinc-600">Imbas dengan mana-mana aplikasi Bank atau E-Wallet di Malaysia</p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-300">Pilih Bank FPX Anda</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-white/[0.08] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="Maybank2u">Maybank2u</option>
                  <option value="CIMB Clicks">CIMB Clicks</option>
                  <option value="Public Bank">Public Bank Enterprise</option>
                  <option value="RHB Now">RHB Now</option>
                  <option value="Hong Leong Connect">Hong Leong Connect</option>
                  <option value="Bank Islam">Bank Islam Internet Banking</option>
                </select>
              </div>
            )}

            <button
              onClick={handleExecutePayment}
              disabled={isProcessingPay}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-rim transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessingPay ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Mengesahkan Transaksi...</span>
                </>
              ) : (
                <span>Sahkan Pembayaran RM {resident.currentBill.totalAmount.toFixed(2)}</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
