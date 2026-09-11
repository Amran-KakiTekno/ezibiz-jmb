import React from 'react';
import { BarChart3, ShieldCheck } from 'lucide-react';

export default function GlassboxTab({ building, expenditures }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="rounded-2xl bg-zinc-950/80 border border-white/[0.08] shadow-rim p-6 space-y-6 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-base">Ketelusan Kewangan Komuniti (Glassbox Ledger)</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
              Diaudit & Disahkan
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Semua aliran wang masuk dan keluar didedahkan secara terbuka kepada setiap pemilik strata demi membasmi syak wasangka dan salah guna dana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08] shadow-rim">
            <span className="text-xs text-zinc-400 block">Kadar Kutipan Bulan Ini:</span>
            <span className="font-mono tabular-nums font-semibold text-2xl text-emerald-400">{building.stats.collectionEfficiency}%</span>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${building.stats.collectionEfficiency}%` }}></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08] shadow-rim">
            <span className="text-xs text-zinc-400 block">Baki Kumpulan Wang Penjelas (Sinking Fund):</span>
            <span className="font-mono tabular-nums font-semibold text-2xl text-amber-400">
              RM {building.bankAccounts.sinkingFund.balance.toLocaleString()}
            </span>
            <p className="text-[11px] text-zinc-400 mt-1">
              Kecukupan Rizab: <span className="text-amber-300 font-semibold font-mono tabular-nums">{building.bankAccounts.sinkingFund.runwayMonths} Bulan</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08] shadow-rim">
            <span className="text-xs text-zinc-400 block">Akaun Operasi Penyelenggaraan:</span>
            <span className="font-mono tabular-nums font-semibold text-2xl text-zinc-100">
              RM {building.bankAccounts.maintenance.balance.toLocaleString()}
            </span>
            <p className="text-[11px] text-zinc-500 mt-1 font-mono">Maybank Islamic • 5641 2890 1142</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            Log Perbelanjaan Utama Terkini (Disahkan dengan Invois Kontraktor)
          </h4>
          <div className="space-y-3">
            {expenditures.map(exp => (
              <div key={exp.id} className="p-4 rounded-xl bg-zinc-900/40 border border-white/[0.06] hover:border-white/[0.12] flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs transition-all shadow-rim">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${
                      exp.fund === 'SINKING_FUND'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {exp.fund === 'SINKING_FUND' ? 'Sinking Fund' : 'Penyelenggaraan'}
                    </span>
                    <span className="font-semibold text-zinc-200">{exp.category}</span>
                  </div>
                  <p className="text-zinc-400">{exp.vendor} • Ref: <span className="font-mono text-zinc-300">{exp.invoiceRef}</span></p>
                  <p className="text-[11px] text-zinc-500">{exp.description}</p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="font-mono tabular-nums font-semibold text-base text-zinc-100">
                    RM {exp.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-medium">✓ Resit Disahkan Bendahari</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
