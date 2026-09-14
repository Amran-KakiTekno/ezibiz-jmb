import React, { useState } from 'react';
import { Wrench, Send, Camera, Clock, AlertCircle } from 'lucide-react';

export default function ResidentDefectsTab({ resident, defects, onReportDefect, showToast }) {
  const [defectCategory, setDefectCategory] = useState('LIFT');
  const [defectTitle, setDefectTitle] = useState('');
  const [defectDesc, setDefectDesc] = useState('');
  const [defectLocation, setDefectLocation] = useState('Tingkat 14 / Koridor');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!defectTitle.trim() || !defectDesc.trim()) {
      showToast('Sila lengkapkan tajuk dan perihal kerosakan', 'error');
      return;
    }
    const newDefect = {
      id: `DEF-2026-${Math.floor(100 + Math.random() * 900)}`,
      ticketNo: `#TKT-${Math.floor(100 + Math.random() * 900)}`,
      category: defectCategory,
      title: defectTitle,
      unit: resident.unitNo,
      reportedBy: resident.name,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      priority: defectCategory === 'LIFT' || defectCategory === 'WATER_LEAK' ? 'URGENT' : 'MEDIUM',
      status: 'OPEN',
      slaHours: defectCategory === 'LIFT' ? 24 : 48,
      slaTargetTime: '24-48 Jam',
      isForm28Eligible: defectCategory === 'WATER_LEAK',
      form28Generated: false,
      assignedContractor: 'Akan Ditugaskan Pengurusan JMB',
      description: defectDesc
    };
    onReportDefect(newDefect);
    setDefectTitle('');
    setDefectDesc('');
    showToast(`Tiket aduan ${newDefect.ticketNo} berjaya direkodkan dengan SLA pemantauan!`, 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Adu Kerosakan Baharu</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Pengurusan JMB komited dengan SLA maklum balas 24-48 jam.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori Masalah</label>
            <select
              value={defectCategory}
              onChange={(e) => setDefectCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="LIFT">Lif Penumpang (SLA 24 Jam)</option>
              <option value="WATER_LEAK">Kebocoran Air / Paip Siling (Borang 28)</option>
              <option value="FACILITIES">Fasiliti Kolam, Gim & Clubhouse</option>
              <option value="SECURITY">Palang Pintu / RFID / Keselamatan</option>
              <option value="CLEANLINESS">Kebersihan & Pelupusan Sampah</option>
              <option value="PARKING">Tempat Letak Kereta / Lampu</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Lokasi Kerosakan</label>
            <input
              type="text"
              value={defectLocation}
              onChange={(e) => setDefectLocation(e.target.value)}
              placeholder="Cth: Lif 2 Tower A, Tingkat 14"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Ringkasan Aduan</label>
            <input
              type="text"
              value={defectTitle}
              onChange={(e) => setDefectTitle(e.target.value)}
              placeholder="Cth: Pintu lif tersekat-sekat semasa menutup"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Perihal Terperinci</label>
            <textarea
              rows={3}
              value={defectDesc}
              onChange={(e) => setDefectDesc(e.target.value)}
              placeholder="Terangkan masalah dengan jelas untuk memudahkan juruteknik memeriksa..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 resize-none"
            ></textarea>
          </div>

          <div className="p-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 cursor-pointer hover:border-amber-500/50 transition-colors">
            <Camera className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Lampirkan Gambar Kerosakan (Pilihan)</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hantar Tiket Aduan</span>
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Senarai Aduan Semasa</h3>
        <div className="space-y-3">
          {defects.map(d => (
            <div key={d.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{d.ticketNo}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {d.category}
                  </span>
                  {d.isForm28Eligible && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold">
                      Statutori Borang 28
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">SLA:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold font-mono text-[11px]">
                    {d.slaHours} Jam
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{d.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{d.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
                <div>
                  <span>Kontraktor: </span>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{d.assignedContractor}</span>
                </div>
                <div>
                  <span>Status: </span>
                  <span className={`font-semibold ${
                    d.status === 'RESOLVED' ? 'text-emerald-600 dark:text-emerald-400' :
                    d.status === 'CONTRACTOR_ASSIGNED' ? 'text-indigo-600 dark:text-indigo-400' :
                    'text-amber-600 dark:text-amber-400'
                  }`}>
                    {d.status === 'CONTRACTOR_ASSIGNED' ? 'Kontraktor Dilantik' :
                     d.status === 'INVESTIGATING' ? 'Dalam Siasatan' :
                     d.status === 'RESOLVED' ? 'Selesai' : 'Dibuka'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
