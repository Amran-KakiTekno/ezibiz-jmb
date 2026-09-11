import React, { useState } from 'react';
import { 
  QrCode, 
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
      <div className="rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-sm text-slate-900 dark:text-white p-5 sm:p-6 relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                {resident.role}
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400">{t('unitLabel')}:</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{resident.unitNo}</span>
              <span className="text-xs text-slate-400 dark:text-zinc-500">• {resident.tower}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              {t('greeting', { name: resident.name })}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              {t('parkingBay')}: <span className="text-slate-700 dark:text-zinc-300 font-medium">{resident.parkingBay}</span> • {t('accessCard')}: <span className="font-mono text-slate-700 dark:text-zinc-300">{resident.accessCardNo}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] shadow-xs text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-slate-600 dark:text-zinc-400">{t('barrierGate')}:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t('active').toUpperCase()}</span>
            </div>

            {residentParcels.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 shadow-xs">
                <span>📦 {residentParcels.length} {t('parcelsAtGuardhouse')}</span>
              </div>
            )}
          </div>
        </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/[0.1] shadow-2xl rounded-2xl overflow-hidden p-6 space-y-5 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">{t('securePayment')}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{t('unitLabel')}: {resident.unitNo} • {resident.currentBill.period}</p>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.08] shadow-xs text-center">
              <span className="text-xs text-slate-500 dark:text-zinc-400 block">{t('paymentAmount')}</span>
              <span className="font-mono tabular-nums font-bold text-3xl text-amber-600 dark:text-amber-400">
                RM {resident.currentBill.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('duitnow')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  paymentMethod === 'duitnow'
                    ? 'bg-rose-500/15 border-rose-500/50 text-rose-600 dark:text-rose-400 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-900/60 border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('duitnowFast')}
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('fpx')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  paymentMethod === 'fpx'
                    ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-900/60 border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('fpxBanking')}
              </button>
            </div>

            {paymentMethod === 'duitnow' ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white text-center space-y-2 border border-slate-200 dark:border-transparent">
                <p className="text-[11px] font-semibold text-rose-600 uppercase tracking-wide">
                  {t('duitnowNationalStd')}
                </p>
                <div className="w-40 h-40 mx-auto border-2 border-rose-600 p-2 flex items-center justify-center rounded-lg bg-white">
                  <QrCode className="w-32 h-32 text-zinc-950" />
                </div>
                <p className="text-[10px] text-slate-600">{t('scanWithAnyBank')}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">{t('selectFpxBank')}</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-amber-500/50"
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
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessingPay ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('verifyingTransaction')}</span>
                </>
              ) : (
                <span>{t('confirmPayment', { amount: resident.currentBill.totalAmount.toFixed(2) })}</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
