import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Wrench, 
  Users, 
  Clock 
} from 'lucide-react';

export default function ManagementKpisTab({ building, units, defects }) {
  const totalUnits = units.length;
  const paidUnits = units.filter(u => u.status === 'PAID').length;
  const overdueUnits = units.filter(u => u.status === 'OVERDUE');
  const totalOverdueAmount = overdueUnits.reduce((acc, u) => acc + u.balance, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-rim">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-2">
            <span>Kadar Kutipan Bulan Ini</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono tabular-nums font-semibold text-3xl text-emerald-600 dark:text-emerald-400">
              {building.stats.collectionEfficiency}%
            </span>
            <span className="text-xs text-slate-400 dark:text-zinc-500">({paidUnits}/{totalUnits} Petak)</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${building.stats.collectionEfficiency}%` }}></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-rim">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-2">
            <span>Rizab Sinking Fund (Statutori)</span>
            <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <span className="font-mono tabular-nums font-semibold text-2xl text-amber-600 dark:text-amber-400">
            RM {building.bankAccounts.sinkingFund.balance.toLocaleString()}
          </span>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2">
            Kecukupan Operasi: <span className="text-amber-700 dark:text-amber-300 font-semibold font-mono tabular-nums">{building.bankAccounts.sinkingFund.runwayMonths} Bulan</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-rim">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-2">
            <span>Jumlah Tunggakan Yuran</span>
            <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          </div>
          <span className="font-mono tabular-nums font-semibold text-2xl text-rose-600 dark:text-rose-400">
            RM {totalOverdueAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2">
            Melibatkan <span className="text-rose-700 dark:text-rose-300 font-semibold">{overdueUnits.length} Pemilik Petak</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-rim">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-2">
            <span>Tiket Aduan Aktif</span>
            <Wrench className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          </div>
          <span className="font-mono tabular-nums font-semibold text-3xl text-indigo-600 dark:text-indigo-400">
            {defects.filter(d => d.status !== 'RESOLVED').length}
          </span>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">1 Aduan Siling Bocor (Borang 28)</span>
          </p>
        </div>
      </div>

      {/* Sinking Fund & Maintenance Separation Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-rim p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Pecahan Akaun Statutori (Akta 757)</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Dua akaun bank berasingan yang diwajibkan undang-undang</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono border border-amber-500/20">
              Seksyen 23 & 24
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.08] shadow-rim space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-zinc-200">1. Akaun Penyelenggaraan (Maintenance Fund)</span>
                <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">RM 62,450.00</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Maybank Islamic (No: 5641 2890 1142) • Khusus untuk kos operasi bulanan: gaji pengawal keselamatan, bil elektrik TNB, dan pencucian lif.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.08] shadow-rim space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-zinc-200">2. Akaun Kumpulan Wang Penjelas (Sinking Fund)</span>
                <span className="font-mono tabular-nums text-amber-600 dark:text-amber-400 font-semibold">RM 184,500.00</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                CIMB Islamic (No: 8604 1993 7701) • Rizab modal khas untuk mengecat bangunan, penggantian pam air booster, dan overhauls kabel lif.
              </p>
            </div>
          </div>
        </div>

        {/* Defaulter Aging Analysis */}
        <div className="rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-rim p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Analisis Penuaan Tunggakan (Defaulter Aging)</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Peringkat tindakan mengikut Undang-Undang Kecil Strata</p>
            </div>
            <Clock className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.08] shadow-rim">
              <div>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">1 - 30 Hari (Semasa)</span>
                <p className="text-[11px] text-slate-500 dark:text-zinc-500">Peringatan automatik WhatsApp</p>
              </div>
              <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-zinc-300">2 Unit • RM 792.00</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.08] shadow-rim">
              <div>
                <span className="font-semibold text-amber-700 dark:text-amber-400">31 - 60 Hari (Peringatan Rasmi)</span>
                <p className="text-[11px] text-slate-500 dark:text-zinc-500">Faedah lewat 10% p.a. mula dikenakan</p>
              </div>
              <span className="font-mono tabular-nums font-semibold text-amber-700 dark:text-amber-400">1 Unit • RM 776.16</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 dark:bg-zinc-900/60 border border-rose-500/30 dark:bg-rose-500/5 shadow-rim">
              <div>
                <span className="font-semibold text-rose-700 dark:text-rose-400">60+ Hari (Tindakan Penguatkuasaan)</span>
                <p className="text-[11px] text-rose-600 dark:text-rose-300/80">Penggantungan Kad RFID & Notis Borang 20 (Tribunal SMT)</p>
              </div>
              <span className="font-mono tabular-nums font-semibold text-rose-700 dark:text-rose-400">2 Unit • RM 2,446.40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
