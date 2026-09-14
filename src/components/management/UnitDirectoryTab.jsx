import React, { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import { 
  Search, 
  MessageSquare, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Building, 
  UserX 
} from 'lucide-react';

export default function UnitDirectoryTab({ 
  units, 
  onToggleCardStatus, 
  onRecordManualPayment, 
  showToast 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [towerFilter, setTowerFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | OVERDUE | PAID
  const [suspendingUnit, setSuspendingUnit] = useState(null);

  const filteredUnits = units.filter(u => {
    const matchesSearch = 
      u.unitNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery);
    
    const matchesTower = towerFilter === 'ALL' || u.tower === towerFilter;
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'OVERDUE' && u.status === 'OVERDUE') ||
      (statusFilter === 'PAID' && u.status === 'PAID');

    return matchesSearch && matchesTower && matchesStatus;
  });

  const generateWhatsAppDunningLink = (unit) => {
    const text = `Salam ${unit.ownerName}, peringatan daripada Badan Pengurusan JMB Residensi Suria Damai berkenaan yuran penyelenggaraan Unit ${unit.unitNo}. Jumlah tertunggak terkini ialah RM ${unit.balance.toFixed(2)} (${unit.daysOverdue} hari). Sila jelaskan bayaran melalui portal rasmi kami: https://ezibiz-jmb.pages.dev untuk mengelakkan penggantungan kad akses palang masuk. Terima kasih.`;
    return `https://wa.me/${unit.phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mengikut No. Unit (cth: B-14-02), Nama Pemilik, atau Telefon..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto tab-scrollbar">
          <select
            value={towerFilter}
            onChange={(e) => setTowerFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">Semua Blok (Tower A & B)</option>
            <option value="Tower A">Tower A Sahaja</option>
            <option value="Tower B">Tower B Sahaja</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">Semua Status Bayaran</option>
            <option value="OVERDUE">Tertunggak Sahaja (Defaulters)</option>
            <option value="PAID">Selesai Dibayar (Paid)</option>
          </select>
        </div>
      </div>

      {/* Units Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">No. Unit & Blok</th>
                <th className="py-3.5 px-4 font-semibold">Pemilik / Penghuni</th>
                <th className="py-3.5 px-4 font-semibold">Keluasan / Syer</th>
                <th className="py-3.5 px-4 font-semibold">Status Palang Kad RFID</th>
                <th className="py-3.5 px-4 font-semibold text-right">Baki Tertunggak</th>
                <th className="py-3.5 px-4 font-semibold text-center">Tindakan Pengurusan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredUnits.map(unit => (
                <tr key={unit.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  {/* Unit & Tower */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">{unit.unitNo}</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">{unit.tower} • Tingkat {unit.floor}</span>
                  </td>

                  {/* Owner / Occupant */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 block">{unit.ownerName}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">+{unit.phone}</span>
                  </td>

                  {/* Sqft & Share Units */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-700 dark:text-slate-300">
                    <span>{unit.sqft} kps</span>
                    <span className="block text-[11px] text-slate-400 dark:text-slate-500">({unit.shareUnits} Syer)</span>
                  </td>

                  {/* RFID Card Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        if (unit.cardStatus === 'ACTIVE') {
                          setSuspendingUnit(unit);
                        } else {
                          onToggleCardStatus(unit.id);
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all min-h-[44px] cursor-pointer ${
                        unit.cardStatus === 'ACTIVE'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20 animate-pulse'
                      }`}
                      title="Klik untuk menukar status sekatan palang masuk"
                    >
                      {unit.cardStatus === 'ACTIVE' ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>AKTIF</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>DIGANTUNG</span>
                        </>
                      )}
                    </button>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{unit.cardSerial}</span>
                  </td>

                  {/* Balance & Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <span className={`font-mono font-bold text-sm ${
                      unit.balance > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      RM {unit.balance.toFixed(2)}
                    </span>
                    {unit.daysOverdue > 0 && (
                      <span className="block text-[10px] text-rose-600/80 dark:text-rose-400/80 font-medium">
                        Lewat {unit.daysOverdue} Hari
                      </span>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      {unit.balance > 0 ? (
                        <>
                          <a
                            href={generateWhatsAppDunningLink(unit)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] transition-colors min-h-[44px]"
                            title="Hantar peringatan tunggakan rasmi melalui WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>1-Klik Nudge</span>
                          </a>

                          <button
                            onClick={() => onRecordManualPayment(unit.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 dark:text-slate-300 text-[11px] transition-colors min-h-[44px] cursor-pointer"
                            title="Rekod bayaran kaunter / pemindahan bank"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>Rekod Bayar</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-[11px] italic">Tiada Tunggakan</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RFID Card Suspension Confirmation Modal */}
      <ConfirmModal
        open={!!suspendingUnit}
        title="Gantung Kad Akses RFID?"
        body={`Adakah anda pasti untuk menggantung kad akses RFID bagi Unit ${suspendingUnit?.unitNo} (${suspendingUnit?.ownerName})? Kad access gate akan dinyahaktifkan.`}
        confirmLabel="Gantung Kad"
        danger={true}
        onConfirm={() => {
          if (suspendingUnit) {
            onToggleCardStatus(suspendingUnit.id);
            setSuspendingUnit(null);
          }
        }}
        onCancel={() => setSuspendingUnit(null)}
      />
    </div>
  );
}
