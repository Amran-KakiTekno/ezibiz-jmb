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
  showToast
}) {
  const [activeTab, setActiveTab] = useState('bills'); // bills | defects | visitor | community | glassbox

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
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                {resident.role}
              </span>
              <span className="text-xs text-slate-400">Unit:</span>
              <span className="font-mono font-bold text-amber-400">{resident.unitNo}</span>
              <span className="text-xs text-slate-500">• {resident.tower}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Selamat Sejahtera, {resident.name}
            </h2>
            <p className="text-xs text-slate-400">
              Petak Parkir: <span className="text-slate-300 font-medium">{resident.parkingBay}</span> • Kad Akses: <span className="font-mono text-slate-300">{resident.accessCardNo}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-slate-400">Palang Akses:</span>
              <span className="font-semibold text-emerald-400">AKTIF</span>
            </div>

            {residentParcels.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 animate-bounce">
                <span>📦 {residentParcels.length} Bungkusan di Guardhouse</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto tab-scrollbar">
        <button
          onClick={() => setActiveTab('bills')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'bills'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Bil & Bayaran</span>
          {resident.currentBill.status === 'PENDING' && (
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('defects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'defects'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Aduan & Kerosakan</span>
        </button>

        <button
          onClick={() => setActiveTab('visitor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'visitor'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Pas Pelawat QR</span>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'community'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pasar Komuniti</span>
        </button>

        <button
          onClick={() => setActiveTab('glassbox')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'glassbox'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Glassbox Ketelusan JMB</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Bayaran Selamat JMB</h3>
                <p className="text-xs text-slate-400">Unit: {resident.unitNo} • {resident.currentBill.period}</p>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Jumlah Bayaran</span>
              <span className="font-mono font-bold text-3xl text-amber-400">
                RM {resident.currentBill.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('duitnow')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  paymentMethod === 'duitnow'
                    ? 'bg-rose-500/15 border-rose-500/50 text-rose-400 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                DuitNow QR Pantas
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('fpx')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  paymentMethod === 'fpx'
                    ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-400 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
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
                <div className="w-40 h-40 mx-auto border-2 border-rose-600 p-2 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-slate-950" />
                </div>
                <p className="text-[10px] text-slate-600">Imbas dengan mana-mana aplikasi Bank atau E-Wallet di Malaysia</p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">Pilih Bank FPX Anda</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
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
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isProcessingPay ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
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
