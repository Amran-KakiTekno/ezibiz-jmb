import React from 'react';
import { Wrench, Scale, Clock, AlertTriangle, CheckCircle2, UserCheck } from 'lucide-react';

export default function DefectKanbanTab({ 
  defects, 
  onOpenForm28, 
  onUpdateDefectStatus, 
  showToast 
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="font-bold text-white text-base">Pengurusan Tiket Aduan & Borang Statutori Akta 757</h3>
          <p className="text-xs text-slate-400">Pantau SLA kerja pembaikan dan jana notis statutori kebocoran inter-floor.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Jumlah Aduan: <strong className="text-amber-400 font-mono">{defects.length}</strong>
          </span>
        </div>
      </div>

      {/* Tickets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {defects.map(ticket => (
          <div 
            key={ticket.id} 
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-lg hover:border-slate-700 transition-colors"
          >
            {/* Header: Ticket No & Priority */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-400 text-xs">{ticket.ticketNo}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                  {ticket.category}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  ticket.priority === 'URGENT'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {ticket.priority}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-slate-400 text-[11px]">SLA {ticket.slaHours}j</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="font-bold text-white text-sm">{ticket.title}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ticket.description}</p>
            </div>

            {/* Meta: Location, Reporter & Contractor */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[11px]">Petak / Lokasi:</span>
                <span className="font-semibold text-slate-200">{ticket.unit}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Pengadu:</span>
                <span className="text-slate-200">{ticket.reportedBy}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-800/60 flex justify-between">
                <span className="text-slate-400 text-[11px]">Kontraktor Ditugaskan:</span>
                <span className="font-semibold text-indigo-300">{ticket.assignedContractor}</span>
              </div>
            </div>

            {/* Bottom Actions: Form 28 Trigger & Status Switcher */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              {/* Form 28 Statutory Button */}
              {ticket.isForm28Eligible ? (
                <button
                  onClick={() => onOpenForm28(ticket)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors"
                  title="Jana Notis Statutori Borang 28 di bawah Akta Pengurusan Strata 2013"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>Jana Borang 28 (Akta 757)</span>
                </button>
              ) : (
                <div className="text-[11px] text-slate-500">Aduan Biasa</div>
              )}

              {/* Status Update Button */}
              <div className="flex items-center gap-1.5">
                {ticket.status !== 'RESOLVED' ? (
                  <button
                    onClick={() => {
                      onUpdateDefectStatus(ticket.id, 'RESOLVED');
                      showToast(`Tiket ${ticket.ticketNo} ditandakan sebagai Selesai!`, 'success');
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tandakan Selesai</span>
                  </button>
                ) : (
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Telah Selesai
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
