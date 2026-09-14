import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Download, Share2 } from 'lucide-react';
import { useModalA11y } from './ConfirmModal';

export default function ReceiptModal({ isOpen, onClose, bill, resident, building }) {
  const modalRef = useModalA11y(isOpen, onClose);

  if (!isOpen || !bill) return null;

  const receiptNo = `REC-2026-09-${resident.unitNo.replace('-', '')}`;
  const transactionRef = `DUITNOW-MY-${Date.now().toString().slice(-8)}`;
  const paidDate = new Date().toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm printable-backdrop animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden printable-card flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Actions (Hidden in Print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span id="receipt-modal-title">Resit Rasmi Pembayaran JMB (Akta 757)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shadow-sm font-sans min-h-[44px] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF (A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-slate-800 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 print:bg-white print:text-slate-900 print:p-0">
          {/* Official Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 dark:border-slate-800 print:border-slate-300 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 print:border-slate-800 flex items-center justify-center font-bold text-amber-700 dark:text-amber-400 print:text-slate-900 text-sm">
                  JMB
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-900 dark:text-white print:text-slate-900">
                    {building.name}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">
                    Badan Pengurusan Bersama / Joint Management Body
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600 mt-2 max-w-sm">
                {building.address} â€¢ Reg: <span className="font-mono text-slate-700 dark:text-slate-300 print:text-slate-800">{building.jmbRegNo}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">
                Strata Plan: <span className="font-mono">{building.strataNo}</span>
              </p>
            </div>

            {/* Receipt Numbering & Badge */}
            <div className="sm:text-right">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 print:text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Sah / Paid in Full</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-500">No. Resit:</p>
              <p className="font-mono font-bold text-amber-600 dark:text-amber-400 print:text-slate-900 text-sm">{receiptNo}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-500 mt-1">Tarikh Bayaran:</p>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 print:text-slate-800">{paidDate}</p>
            </div>
          </div>

          {/* Unit & Payer Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 print:bg-slate-50 border border-slate-200 dark:border-slate-800 print:border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">No. Unit:</span>
              <span className="font-bold text-base text-amber-600 dark:text-amber-400 print:text-slate-900">{resident.unitNo}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Nama Pemilik / Pembayar:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 print:text-slate-800">{resident.name}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Keluasan / Unit Syer:</span>
              <span className="text-slate-800 dark:text-slate-200 print:text-slate-800">{resident.sqft} kps ({resident.shareUnits} Syer)</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Kaedah Bayaran:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 print:text-emerald-700 font-semibold">DuitNow QR / FPX</span>
            </div>
          </div>

          {/* Itemized Table Breakdown */}
          <div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 print:border-slate-300 text-slate-500 dark:text-slate-400 print:text-slate-600 uppercase tracking-wider">
                  <th className="py-2.5 font-semibold">Butiran Caj (Akta Pengurusan Strata 2013)</th>
                  <th className="py-2.5 text-center font-semibold">Tempoh</th>
                  <th className="py-2.5 text-right font-semibold">Kadar</th>
                  <th className="py-2.5 text-right font-semibold">Jumlah (RM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 print:divide-slate-200">
                <tr>
                  <td className="py-3 pr-2">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 print:text-slate-800">Caj Penyelenggaraan (Maintenance Charges)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-500">Kawalan keselamatan, pembersihan, lif & tenaga elektrik kawasan guna sama</p>
                  </td>
                  <td className="py-3 text-center text-slate-700 dark:text-slate-300 print:text-slate-700">{bill.period}</td>
                  <td className="py-3 text-right font-mono text-slate-700 dark:text-slate-300 print:text-slate-700">RM 0.32/kps</td>
                  <td className="py-3 text-right font-mono font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">
                    {bill.maintenanceCharge.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 print:text-slate-800">Kumpulan Wang Penjelas (Sinking Fund)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-500">Mandatori statutori 10% di bawah Seksyen 24 Akta 757 untuk pembaikan modal</p>
                  </td>
                  <td className="py-3 text-center text-slate-700 dark:text-slate-300 print:text-slate-700">{bill.period}</td>
                  <td className="py-3 text-right font-mono text-slate-700 dark:text-slate-300 print:text-slate-700">10% Daripada Caj</td>
                  <td className="py-3 text-right font-mono font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">
                    {bill.sinkingFund.toFixed(2)}
                  </td>
                </tr>
                {bill.lateInterest > 0 && (
                  <tr>
                    <td className="py-3 pr-2">
                      <p className="font-semibold text-rose-600 dark:text-rose-400 print:text-rose-700">Faedah Lewat Bayar (Late Interest 10% p.a.)</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-500">Faedah mudah menurut Peraturan Pengurusan Strata 2015</p>
                    </td>
                    <td className="py-3 text-center text-slate-700 dark:text-slate-300 print:text-slate-700">{bill.period}</td>
                    <td className="py-3 text-right font-mono text-slate-700 dark:text-slate-300 print:text-slate-700">10% p.a.</td>
                    <td className="py-3 text-right font-mono font-semibold text-rose-600 dark:text-rose-400 print:text-rose-700">
                      {bill.lateInterest.toFixed(2)}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 dark:border-slate-800 print:border-slate-400">
                  <td colSpan="3" className="py-3 font-bold text-sm text-slate-800 dark:text-slate-200 print:text-slate-900 text-right pr-4">
                    JUMLAH DIBAYAR / TOTAL PAID:
                  </td>
                  <td className="py-3 font-mono font-bold text-lg text-amber-600 dark:text-amber-400 print:text-slate-900 text-right">
                    RM {bill.totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Statutory Fund Separation Notice */}
          <div className="p-3.5 rounded-lg bg-amber-500/10 print:bg-slate-100 border border-amber-500/20 print:border-slate-300 text-[11px] text-amber-800 dark:text-amber-300/90 print:text-slate-700 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 print:text-slate-800 shrink-0" />
              Notis Pengasingan Akaun Statutori (Seksyen 23 & 24 Akta 757):
            </p>
            <p>
              Bayaran ini telah diagihkan secara automatik: <span className="font-mono font-semibold">RM {bill.maintenanceCharge.toFixed(2)}</span> didepositkan ke Akaun Penyelenggaraan ({building.bankAccounts.maintenance.bank}) dan <span className="font-mono font-semibold">RM {bill.sinkingFund.toFixed(2)}</span> didepositkan ke Akaun Kumpulan Wang Penjelas ({building.bankAccounts.sinkingFund.bank}).
            </p>
          </div>

          {/* Footer Signoff & Barcode Simulation */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 print:border-slate-300 flex flex-col sm:flex-row justify-between items-end text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-600 gap-4">
            <div>
              <p className="font-mono">Ref Transaksi: {transactionRef}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">Resit dijana secara berkomputer melalui EziBiz JMB Suite. Tiada tandatangan fizikal diperlukan.</p>
            </div>
            <div className="text-right">
              <div className="font-mono text-xs tracking-widest text-slate-700 dark:text-slate-300 print:text-slate-700 bg-slate-100 dark:bg-slate-950 print:bg-slate-200 px-3 py-1 rounded border border-slate-200 dark:border-slate-800 print:border-slate-300 inline-block">
                *EZIBIZ-JMB-{resident.unitNo}*
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

