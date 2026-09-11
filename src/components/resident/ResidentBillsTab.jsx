import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileCheck2, 
  QrCode, 
  Building2 
} from 'lucide-react';

export default function ResidentBillsTab({ resident, onPayClick, onViewReceiptClick }) {
  const bill = resident.currentBill;
  const isPaid = bill.status === 'PAID';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 relative overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Invois Penyelenggaraan & Sinking Fund</h3>
                <span className="text-xs font-mono text-slate-400">({bill.billId})</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Tempoh: <span className="text-slate-200 font-medium">{bill.period}</span> • Tarikh Akhir: <span className="text-amber-400 font-medium">{bill.dueDate}</span>
              </p>
            </div>

            <div>
              {isPaid ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  SUDAH DIBAYAR
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Clock className="w-4 h-4" />
                  MENUNGGU BAYARAN
                </span>
              )}
            </div>
          </div>

          <div className="py-5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Caj Penyelenggaraan ({resident.sqft} kps @ RM 0.32/kps):</span>
              <span className="font-mono font-medium text-slate-200">RM {bill.maintenanceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Kumpulan Wang Penjelas / Sinking Fund (Statutori 10%):</span>
              <span className="font-mono font-medium text-slate-200">RM {bill.sinkingFund.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">Tunggakan Terdahulu:</span>
              <span className="font-mono text-slate-400">RM 0.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <span className="font-bold text-sm text-slate-200">Jumlah Perlu Dibayar:</span>
              <div className="text-right">
                <span className="font-mono font-bold text-2xl text-amber-400">
                  RM {isPaid ? '0.00' : bill.totalAmount.toFixed(2)}
                </span>
                {isPaid && (
                  <p className="text-[11px] text-emerald-400 font-medium">Baki Tertunggak: RM 0.00</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {!isPaid ? (
              <button
                onClick={onPayClick}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>⚡ Bayar Pantas Sekarang (DuitNow QR / FPX)</span>
              </button>
            ) : (
              <button
                onClick={onViewReceiptClick}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Papar / Cetak Resit Rasmi JMB (A4 PDF)</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200">Pematuhan Akta Pengurusan Strata 2013 (Akta 757)</p>
            <p className="text-[11px] leading-relaxed mt-1">
              Semua kutipan diasingkan ke dalam dua akaun bank berasingan yang dilindungi undang-undang: 
              Akaun Penyelenggaraan harian dan Akaun Kumpulan Wang Penjelas (Sinking Fund) khusus untuk penggantian aset modal utama.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sejarah Bil 3 Bulan Terkini</h4>
        <div className="space-y-3">
          {[
            { month: 'Ogos 2026', date: '12 Ogos 2026', amount: '369.60' },
            { month: 'Julai 2026', date: '10 Julai 2026', amount: '369.60' },
            { month: 'Jun 2026', date: '08 Jun 2026', amount: '369.60' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-200">{item.month}</p>
                <p className="text-[11px] text-slate-400">Dibayar pada {item.date}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-slate-200 font-semibold">RM {item.amount}</span>
                <span className="block text-[10px] text-emerald-400 font-medium">Lunas</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button 
            onClick={onViewReceiptClick}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Muat Turun Penyata Tahunan (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
