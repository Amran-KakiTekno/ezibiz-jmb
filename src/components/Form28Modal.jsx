import React from 'react';
import { X, Printer, AlertTriangle, Scale, ShieldAlert, FileText } from 'lucide-react';

export default function Form28Modal({ isOpen, onClose, ticket, building }) {
  if (!isOpen || !ticket) return null;

  const noticeDate = new Date().toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm printable-backdrop animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden printable-card flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Actions */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
            <Scale className="w-5 h-5 text-amber-500" />
            <span>Statutori Akta 757: Borang 28 (Notis Memeriksa Kebocoran Inter-Floor)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shadow-sm font-sans min-h-[44px] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Notis Statutori (A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-slate-800 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form 28 Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 print:bg-white print:text-slate-900 print:p-0">
          {/* Statutory Title Header */}
          <div className="text-center border-b border-slate-200 dark:border-slate-800 print:border-slate-300 pb-4 space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 print:text-slate-600">
              AKTA PENGURUSAN STRATA 2013 [AKTA 757]
            </p>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-slate-600">
              PERATURAN-PERATURAN PENGURUSAN STRATA (PENYELENGGARAAN DAN PENGURUSAN) 2015
            </p>
            <h1 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-amber-600 dark:text-amber-400 print:text-slate-900 mt-2">
              BORANG 28 / FORM 28
            </h1>
            <h2 className="text-xs sm:text-sm font-semibold uppercase text-slate-700 dark:text-slate-300 print:text-slate-700">
              [Peraturan 56] • NOTIS MAKSUD MASUK UNTUK MEMERIKSA KEBOCORAN INTER-FLOOR ATAU KEROSAKAN KEPADA DINDING PARTISI
            </h2>
          </div>

          {/* Legal Notice Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 print:bg-slate-50 border border-slate-200 dark:border-slate-800 print:border-slate-200 space-y-1">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 font-medium">Kepada Pemilik / Penghuni Petak Atas:</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white print:text-slate-900">UNIT {ticket.affectedUpperUnit || "B-13-04"}</p>
              <p className="text-slate-700 dark:text-slate-300 print:text-slate-700">{building.name}</p>
              <p className="text-slate-500 dark:text-slate-400 print:text-slate-500">{building.address}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 print:bg-slate-50 border border-slate-200 dark:border-slate-800 print:border-slate-200 space-y-1">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 font-medium">Badan Pengurusan Bersama (JMB):</span>
              <p className="font-bold text-sm text-amber-600 dark:text-amber-400 print:text-slate-900">{building.name}</p>
              <p className="text-slate-700 dark:text-slate-300 print:text-slate-700">No. Pendaftaran: {building.jmbRegNo}</p>
              <p className="text-slate-500 dark:text-slate-400 print:text-slate-500">Tarikh Notis: {noticeDate}</p>
            </div>
          </div>

          {/* Statutory Declaration Clauses */}
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 print:text-slate-800 leading-relaxed">
            <p>
              <strong>BAHAWASANYA</strong> suatu aduan kebocoran inter-floor telah diterima oleh pihak Badan Pengurusan daripada pemilik/penghuni 
              petak bawah iaitu <strong>Unit {ticket.unit} ({ticket.reportedBy})</strong>, merujuk kepada aduan <strong>{ticket.ticketNo}</strong>.
            </p>
            
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-slate-100 border border-slate-200 dark:border-slate-800 print:border-slate-300 space-y-1.5">
              <p className="font-semibold text-slate-800 dark:text-slate-200 print:text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 print:text-slate-700" />
                Perihal Kerosakan & Lokasi:
              </p>
              <p className="text-slate-700 dark:text-slate-300 print:text-slate-800 italic">
                "{ticket.description}"
              </p>
            </div>

            <p>
              <strong>AMBIL PERHATIAN</strong> bahawa di bawah Peraturan 56 Peraturan-Peraturan Pengurusan Strata (Penyelenggaraan dan Pengurusan) 2015 
              dan Seksyen 142 Akta 757, pegawai atau ejen yang diberi kuasa oleh Badan Pengurusan Bersama/Perbadanan Pengurusan bersama kontraktor bertauliah:
            </p>

            <div className="p-4 rounded-xl bg-amber-500/10 print:bg-amber-50/50 border border-amber-500/30 print:border-amber-300 text-amber-800 dark:text-amber-200 print:text-amber-950 space-y-2">
              <p className="font-bold flex items-center gap-2 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 print:text-amber-700 shrink-0" />
                JADUAL PEMERIKSAAN TAPAK & AKSES KE PETAK ATAS:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Tarikh Pemeriksaan Dicadangkan: <strong>Dalam tempoh tujuh (7) hari daripada penerimaan notis ini</strong>.</li>
                <li>Masa Akses Ditetapkan: <strong>10:00 AM - 4:00 PM (Hari Bekerja)</strong>.</li>
                <li>Kontraktor Pemeriksa: <strong>{ticket.assignedContractor || "Kontraktor Kalis Air Bertauliah JMB"}</strong>.</li>
              </ul>
            </div>

            {/* Warning of Penalty under Act 757 */}
            <div className="p-4 rounded-xl bg-rose-500/10 print:bg-rose-50/50 border border-rose-500/30 print:border-rose-300 text-rose-700 dark:text-rose-300 print:text-rose-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 print:text-rose-700 shrink-0" />
                AMARAN PENALTI STATUTORI (SEKSYEN 142 AKTA 757):
              </p>
              <p className="text-[11px] leading-normal">
                Mana-mana orang yang enggan membenarkan kemasukan atau menghalang pegawai yang diberi kuasa untuk menjalankan pemeriksaan ini 
                melakukan suatu <strong>kesalahan jenayah</strong> dan boleh, apabila disabitkan, didenda tidak melebihi <strong>RM 50,000 (Ringgit Malaysia Lima Puluh Ribu)</strong> 
                atau dipenjarakan selama tempoh tidak melebihi <strong>tiga (3) tahun</strong> atau kedua-duanya sekali.
              </p>
            </div>
          </div>

          {/* Signature Signoff */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 print:border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-500 dark:text-slate-400 print:text-slate-700">
            <div>
              <p className="text-slate-500 dark:text-slate-400 print:text-slate-500 mb-12">Bagi pihak Badan Pengurusan Bersama (JMB):</p>
              <div className="border-t border-slate-200 dark:border-slate-700 print:border-slate-400 pt-1">
                <p className="font-bold text-slate-800 dark:text-slate-200 print:text-slate-900">PENGURUS BANGUNAN BERDAFTAR</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-600">Pejabat Pengurusan {building.name}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 print:text-slate-500 mb-12">Akuan Penerimaan Pemilik Petak Atas:</p>
              <div className="border-t border-slate-200 dark:border-slate-700 print:border-slate-400 pt-1">
                <p className="font-bold text-slate-800 dark:text-slate-200 print:text-slate-900">Tandatangan & Tarikh Diserahkan</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-600">Nama: .....................................................</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
