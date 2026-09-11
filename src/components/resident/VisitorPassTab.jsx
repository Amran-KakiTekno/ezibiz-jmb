import React, { useState } from 'react';
import { QrCode, Share2 } from 'lucide-react';

export default function VisitorPassTab({ resident, building, showToast }) {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPlate, setVisitorPlate] = useState('');
  const [visitorDate, setVisitorDate] = useState('2026-09-12');
  const [generatedPass, setGeneratedPass] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!visitorName.trim()) {
      showToast('Sila masukkan nama pelawat', 'error');
      return;
    }
    const passCode = `RSD-VIS-${Math.floor(1000 + Math.random() * 9000)}`;
    const pass = {
      code: passCode,
      name: visitorName,
      plate: visitorPlate || 'Tiada Kenderaan',
      date: visitorDate,
      unit: resident.unitNo,
      issuedAt: new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })
    };
    setGeneratedPass(pass);
    showToast(`Pas Pelawat ${passCode} berjaya dijana!`, 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
      <div className="rounded-2xl bg-zinc-950/80 border border-white/[0.08] shadow-rim p-6 space-y-4 backdrop-blur-md">
        <div>
          <h3 className="font-semibold text-white text-base">Jana Pas Masuk Pelawat Pantas (QR)</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Imbas kod QR di pondok pengawal untuk kemasukan lancar tanpa perlu tinggalkan kad pengenalan.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Nama Penuh Pelawat</label>
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="Cth: Kamarul Ariffin"
              className="w-full px-3 py-2 bg-zinc-900 border border-white/[0.08] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">No. Pendaftaran Kenderaan (Plat Kereta)</label>
            <input
              type="text"
              value={visitorPlate}
              onChange={(e) => setVisitorPlate(e.target.value)}
              placeholder="Cth: VDK 8892"
              className="w-full px-3 py-2 bg-zinc-900 border border-white/[0.08] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Tarikh Lawatan</label>
            <input
              type="date"
              value={visitorDate}
              onChange={(e) => setVisitorDate(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-white/[0.08] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-rim transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Jana Pas Masuk QR</span>
          </button>
        </form>
      </div>

      <div>
        {generatedPass ? (
          <div className="rounded-2xl bg-zinc-950 border border-amber-500/30 shadow-card-elevated p-6 space-y-5 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <span>Pas Pelawat Sah • 1 Hari</span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white tracking-tight">{building.name}</h4>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">Destinasi: Unit {resident.unitNo} ({resident.tower})</p>
            </div>

            {/* Boarding pass QR ticket element */}
            <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto shadow-inner flex flex-col items-center justify-center border-4 border-zinc-800">
              <div className="w-full h-full border-2 border-dashed border-zinc-400 p-2 flex flex-col items-center justify-center">
                <QrCode className="w-32 h-32 text-zinc-950" />
                <span className="font-mono text-[10px] font-bold text-zinc-900 tracking-wider mt-1">{generatedPass.code}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-zinc-900/80 p-3 rounded-xl border border-white/[0.08] shadow-rim">
              <div className="text-left">
                <span className="text-zinc-500 text-[11px] block">Nama Pelawat:</span>
                <span className="font-semibold text-zinc-200">{generatedPass.name}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 text-[11px] block">No. Kenderaan:</span>
                <span className="font-mono tabular-nums font-bold text-amber-400">{generatedPass.plate}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Salam ${generatedPass.name}, ini pas masuk pelawat bagi ${building.name}, Unit ${resident.unitNo}. Sila tunjukkan kod ini di palang guardhouse: ${generatedPass.code}`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-rim"
            >
              <Share2 className="w-4 h-4" />
              <span>Kongsi Pas ke WhatsApp Pelawat</span>
            </a>
          </div>
        ) : (
          <div className="rounded-2xl bg-zinc-950/40 border border-dashed border-zinc-800 p-12 text-center text-zinc-500 space-y-3">
            <QrCode className="w-12 h-12 mx-auto text-zinc-600 stroke-[1.5]" />
            <p className="text-xs">Isi maklumat di sebelah untuk menjana Pas Masuk QR kenderaan pelawat.</p>
          </div>
        )}
      </div>
    </div>
  );
}
