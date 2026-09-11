import React, { useState } from 'react';
import { ShieldCheck, Package, QrCode, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export default function GuardhouseTab({ 
  parcels, 
  onLogParcel, 
  onCollectParcel, 
  showToast 
}) {
  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  // Parcel Logging State
  const [parcelUnit, setParcelUnit] = useState('B-14-02');
  const [parcelRecipient, setParcelRecipient] = useState('Ir. Hazim Razali');
  const [parcelCourier, setParcelCourier] = useState('Shopee Xpress');
  const [parcelTracking, setParcelTracking] = useState('');
  const [parcelShelf, setParcelShelf] = useState('Locker B-3');

  const handleVerifyPass = (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) {
      showToast('Sila masukkan kod pas pelawat', 'error');
      return;
    }
    // Simulation: if code contains RSD-VIS or length >= 6
    if (verifyCode.toUpperCase().includes('RSD-VIS') || verifyCode.length >= 6) {
      setVerificationResult({
        valid: true,
        code: verifyCode.toUpperCase(),
        destination: 'Unit B-14-02 (Tower B)',
        visitor: 'Kamarul Ariffin',
        plate: 'VDK 8892',
        status: 'BENARKAN MASUK (ACCESS GRANTED)'
      });
      showToast('Pas Pelawat Sah! Palang automatik dibuka.', 'success');
    } else {
      setVerificationResult({
        valid: false,
        code: verifyCode,
        status: 'KOD TIDAK SAH ATAU TELAH TAMAT TEMPOH'
      });
      showToast('Kod tidak sah! Sila semak dengan pemilik unit.', 'error');
    }
  };

  const handleLogParcelSubmit = (e) => {
    e.preventDefault();
    if (!parcelTracking.trim()) {
      showToast('Sila masukkan nombor penjejakan bungkusan', 'error');
      return;
    }
    const newParcel = {
      id: `PCL-${Math.floor(1000 + Math.random() * 9000)}`,
      unit: parcelUnit,
      recipient: parcelRecipient,
      courier: parcelCourier,
      trackingNo: parcelTracking,
      arrivedAt: 'Hari ini ' + new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' }),
      status: 'AWAITING_PICKUP',
      shelfLocation: parcelShelf
    };
    onLogParcel(newParcel);
    setParcelTracking('');
    showToast(`Bungkusan bagi ${parcelUnit} berjaya direkodkan & notifikasi dihantar!`, 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
      {/* 1. Guardhouse Visitor Pass Scanner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base border-b border-slate-800 pb-3">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <span>Pengesahan Palang Masuk Pengawal (Visitor Scanner)</span>
        </div>

        <form onSubmit={handleVerifyPass} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Imbas Kod QR / Masukkan Kod Pas Pelawat
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="Cth: RSD-VIS-4921"
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500 uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
              >
                Sahkan Kod
              </button>
            </div>
          </div>
        </form>

        {verificationResult && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            verificationResult.valid 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {verificationResult.valid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              )}
              <span>{verificationResult.status}</span>
            </div>

            {verificationResult.valid && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20 text-slate-300">
                <div>
                  <span className="text-slate-400 text-[11px] block">Destinasi Petak:</span>
                  <span className="font-bold text-white">{verificationResult.destination}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Nama Pelawat:</span>
                  <span className="font-semibold text-white">{verificationResult.visitor}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">No. Plat:</span>
                  <span className="font-mono text-amber-400 font-bold">{verificationResult.plate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Tindakan Palang:</span>
                  <span className="text-emerald-400 font-bold">BUKA PALANG (AUTO OPEN)</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Parcel Arrival Terminal */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-base border-b border-slate-800 pb-3">
          <Package className="w-5 h-5 text-indigo-400" />
          <span>Daftar Bungkusan Tiba (Parcel Logger)</span>
        </div>

        <form onSubmit={handleLogParcelSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Unit Sasaran</label>
              <select
                value={parcelUnit}
                onChange={(e) => setParcelUnit(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              >
                <option value="B-14-02">B-14-02 (Ir. Hazim)</option>
                <option value="A-08-01">A-08-01 (Ahmad Fauzi)</option>
                <option value="B-12-04">B-12-04 (Datin Sheila)</option>
                <option value="A-03-05">A-03-05 (Tan Sri Raymond)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Syarikat Kurier</label>
              <select
                value={parcelCourier}
                onChange={(e) => setParcelCourier(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              >
                <option value="Shopee Xpress">Shopee Xpress</option>
                <option value="J&T Express">J&T Express</option>
                <option value="NinjaVan">NinjaVan</option>
                <option value="DHL eCommerce">DHL eCommerce</option>
                <option value="Pos Laju">Pos Laju Malaysia</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">No. Penjejakan (Tracking No)</label>
              <input
                type="text"
                value={parcelTracking}
                onChange={(e) => setParcelTracking(e.target.value)}
                placeholder="Cth: SPXMY0489912"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Lokasi Rak / Locker</label>
              <input
                type="text"
                value={parcelShelf}
                onChange={(e) => setParcelShelf(e.target.value)}
                placeholder="Cth: Locker B-3"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Rekod Bungkusan & Notifikasi Residen</span>
          </button>
        </form>

        {/* Recent Parcels List */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bungkusan Menunggu Kutipan</h4>
          <div className="space-y-2">
            {parcels.filter(p => p.status === 'AWAITING_PICKUP').map(p => (
              <div key={p.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-400">{p.unit}</span>
                  <span className="text-slate-300 ml-2">{p.recipient}</span>
                  <span className="block text-[11px] text-slate-400 font-mono mt-0.5">{p.courier} • {p.trackingNo}</span>
                </div>
                <button
                  onClick={() => {
                    onCollectParcel(p.id);
                    showToast(`Bungkusan ${p.id} ditandakan sebagai telah dituntut!`, 'success');
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600/30 text-slate-300 hover:text-emerald-300 text-[11px] font-semibold border border-slate-700 transition-colors"
                >
                  Tuntut (Collected)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
