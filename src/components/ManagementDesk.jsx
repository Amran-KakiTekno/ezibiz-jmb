import React, { useState } from 'react';
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
  showToast,
  activeTab: controlledTab,
  onTabChange,
  t = (k) => k
}) {
  const [internalTab, setInternalTab] = useState('kpis'); // kpis | units | defects | agm | guardhouse
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;

  return (
    <div className="space-y-6 pb-12">
      {/* Management Command Banner */}
      <div className="rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-sm text-slate-900 dark:text-white p-5 sm:p-6 relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                {t('jmbOpsCenter')}
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">Reg: {building.jmbRegNo}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              {t('managementDeskTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              {building.name} • {building.totalUnits} {t('registeredUnits')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] shadow-xs text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-slate-600 dark:text-zinc-400">{t('integratedSystem')}:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t('active247')}</span>
            </div>
          </div>
        </div>
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
