import React, { useState } from 'react';
import { 
  TrendingUp, 
  Building2, 
  Wrench, 
  Vote, 
  ShieldCheck, 
  CreditCard 
} from 'lucide-react';
import ManagementKpisTab from './management/ManagementKpisTab';
import UnitDirectoryTab from './management/UnitDirectoryTab';
import DefectKanbanTab from './management/DefectKanbanTab';
import AgmNoticeTab from './management/AgmNoticeTab';
import GuardhouseTab from './management/GuardhouseTab';

export default function ManagementDesk({
  building,
  units,
  defects,
  resolutions,
  parcels,
  onToggleCardStatus,
  onRecordManualPayment,
  onOpenForm28,
  onUpdateDefectStatus,
  onCastVote,
  onPublishAnnouncement,
  onLogParcel,
  onCollectParcel,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('kpis'); // kpis | units | defects | agm | guardhouse

  return (
    <div className="space-y-6 pb-12">
      {/* Management Command Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-amber-950/30 border border-slate-800 p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Pusat Operasi JMB (Akta 757)
              </span>
              <span className="text-xs text-slate-400 font-mono">Reg: {building.jmbRegNo}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Meja Eksekutif JMB & Pengurusan Bangunan
            </h2>
            <p className="text-xs text-slate-400">
              {building.name} • {building.totalUnits} Petak Berdaftar (Tower A & Tower B)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-slate-400">Sistem Bersepadu:</span>
              <span className="font-semibold text-emerald-400">AKTIF 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs for JMB Management Deck */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto tab-scrollbar">
        <button
          onClick={() => setActiveTab('kpis')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'kpis'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Ringkasan Eksekutif & Kewangan</span>
        </button>

        <button
          onClick={() => setActiveTab('units')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'units'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Direktori Unit & WhatsApp Nudge</span>
        </button>

        <button
          onClick={() => setActiveTab('defects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'defects'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Tiket Aduan & Borang 28</span>
        </button>

        <button
          onClick={() => setActiveTab('agm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'agm'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Vote className="w-4 h-4" />
          <span>Notis Rasmi & Undian AGM</span>
        </button>

        <button
          onClick={() => setActiveTab('guardhouse')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'guardhouse'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Pondok Pengawal & Bungkusan</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'kpis' && (
        <ManagementKpisTab
          building={building}
          units={units}
          defects={defects}
        />
      )}

      {activeTab === 'units' && (
        <UnitDirectoryTab
          units={units}
          onToggleCardStatus={onToggleCardStatus}
          onRecordManualPayment={onRecordManualPayment}
          showToast={showToast}
        />
      )}

      {activeTab === 'defects' && (
        <DefectKanbanTab
          defects={defects}
          onOpenForm28={onOpenForm28}
          onUpdateDefectStatus={onUpdateDefectStatus}
          showToast={showToast}
        />
      )}

      {activeTab === 'agm' && (
        <AgmNoticeTab
          resolutions={resolutions}
          onCastVote={onCastVote}
          onPublishAnnouncement={onPublishAnnouncement}
          showToast={showToast}
        />
      )}

      {activeTab === 'guardhouse' && (
        <GuardhouseTab
          parcels={parcels}
          onLogParcel={onLogParcel}
          onCollectParcel={onCollectParcel}
          showToast={showToast}
        />
      )}
    </div>
  );
}
