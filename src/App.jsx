import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  Home, 
  ShieldCheck, 
  CreditCard, 
  Wrench, 
  QrCode, 
  ShoppingBag, 
  BarChart3, 
  TrendingUp, 
  Vote, 
  Smartphone, 
  Settings, 
  CheckCircle2, 
  AlertTriangle,
  MoreHorizontal,
  X
} from 'lucide-react';
import ResidentPortal from './components/ResidentPortal';
import ManagementDesk from './components/ManagementDesk';
import ReceiptModal from './components/ReceiptModal';
import Form28Modal from './components/Form28Modal';
import SettingsModal from './components/SettingsModal';
import { useSettings } from './utils/useSettings';
import { 
  BUILDING_PROFILE, 
  CURRENT_RESIDENT, 
  INITIAL_UNITS, 
  INITIAL_DEFECTS, 
  INITIAL_POSTS, 
  INITIAL_PARCELS, 
  VERIFIED_EXPENDITURES, 
  AGM_RESOLUTIONS 
} from './data/mockData';

export default function App() {
  const { theme, setTheme, language, setLanguage, t } = useSettings();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMoreDrawer, setShowMoreDrawer] = useState(false);

  // Master State
  const [persona, setPersona] = useState('RESIDENT'); // RESIDENT | MANAGEMENT
  const [activeTab, setActiveTab] = useState('bills');
  const [viewportMode, setViewportMode] = useState('responsive'); // responsive | mobile
  const [building, setBuilding] = useState(BUILDING_PROFILE);
  const [resident, setResident] = useState(CURRENT_RESIDENT);
  const [units, setUnits] = useState(INITIAL_UNITS);
  const [defects, setDefects] = useState(INITIAL_DEFECTS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  const [expenditures, setExpenditures] = useState(VERIFIED_EXPENDITURES);
  const [resolutions, setResolutions] = useState(AGM_RESOLUTIONS);

  // Modals & Toast State
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [form28Ticket, setForm28Ticket] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const handlePersonaChange = (newPersona) => {
    setPersona(newPersona);
    if (newPersona === 'RESIDENT') {
      setActiveTab('bills');
    } else {
      setActiveTab('kpis');
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#6366f1', '#fbbf24']
      });
    } catch (e) {
      console.log('Confetti effect executed');
    }
  };

  // Action: Pay Bill (Resident)
  const handlePayBill = () => {
    // 1. Update resident bill status
    const updatedResident = {
      ...resident,
      currentBill: {
        ...resident.currentBill,
        status: 'PAID'
      }
    };
    setResident(updatedResident);

    // 2. Update units table
    setUnits(prev => prev.map(u => {
      if (u.unitNo === resident.unitNo) {
        return { ...u, balance: 0.00, status: 'PAID', daysOverdue: 0 };
      }
      return u;
    }));

    // 3. Update building stats
    setBuilding(prev => {
      const newCollected = prev.stats.totalCollectedThisMonth + resident.currentBill.totalAmount;
      const newEfficiency = Math.round((newCollected / prev.stats.totalDueThisMonth) * 1000) / 10;
      return {
        ...prev,
        bankAccounts: {
          ...prev.bankAccounts,
          maintenance: {
            ...prev.bankAccounts.maintenance,
            balance: prev.bankAccounts.maintenance.balance + resident.currentBill.maintenanceCharge
          },
          sinkingFund: {
            ...prev.bankAccounts.sinkingFund,
            balance: prev.bankAccounts.sinkingFund.balance + resident.currentBill.sinkingFund
          }
        },
        stats: {
          ...prev.stats,
          totalCollectedThisMonth: newCollected,
          collectionEfficiency: newEfficiency
        }
      };
    });

    triggerConfetti();
    showToast(
      language === 'ms' 
        ? 'Alhamdulillah! Bayaran RM ' + resident.currentBill.totalAmount.toFixed(2) + ' telah berjaya diproses.'
        : 'Success! Payment of RM ' + resident.currentBill.totalAmount.toFixed(2) + ' was processed.', 
      'success'
    );
    setShowReceiptModal(true);
  };

  // Action: Toggle RFID access card status (Management)
  const handleToggleCardStatus = (unitId) => {
    setUnits(prev => prev.map(u => {
      if (u.id === unitId) {
        const nextStatus = u.cardStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        showToast(`Kad Akses ${u.unitNo}: ${nextStatus === 'ACTIVE' ? 'ACTIVE' : 'SUSPENDED'}`, nextStatus === 'ACTIVE' ? 'success' : 'error');
        return { ...u, cardStatus: nextStatus };
      }
      return u;
    }));
  };

  // Action: Record manual payment (Management)
  const handleRecordManualPayment = (unitId) => {
    setUnits(prev => prev.map(u => {
      if (u.id === unitId) {
        showToast(`Manual payment RM ${u.balance.toFixed(2)} for Unit ${u.unitNo} recorded.`, 'success');
        return { ...u, balance: 0.00, status: 'PAID', daysOverdue: 0 };
      }
      return u;
    }));
  };

  // Action: Report defect
  const handleReportDefect = (newDefect) => {
    setDefects(prev => [newDefect, ...prev]);
  };

  // Action: Update defect status
  const handleUpdateDefectStatus = (defectId, nextStatus) => {
    setDefects(prev => prev.map(d => {
      if (d.id === defectId) {
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  // Action: Create post
  const handleCreatePost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  // Action: Cast AGM Vote
  const handleCastVote = (resId, choice) => {
    setResolutions(prev => prev.map(r => {
      if (r.id === resId) {
        return {
          ...r,
          votesInFavor: choice === 'FAVOR' ? r.votesInFavor + 1 : r.votesInFavor,
          votesAgainst: choice === 'AGAINST' ? r.votesAgainst + 1 : r.votesAgainst,
          totalVoted: r.totalVoted + 1
        };
      }
      return r;
    }));
  };

  // Action: Log parcel
  const handleLogParcel = (newParcel) => {
    setParcels(prev => [newParcel, ...prev]);
  };

  // Action: Collect parcel
  const handleCollectParcel = (parcelId) => {
    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        return { ...p, status: 'COLLECTED', collectedAt: 'Just now' };
      }
      return p;
    }));
  };

  const residentNavItems = [
    { id: 'bills', label: t('tabBills'), icon: CreditCard },
    { id: 'defects', label: t('tabDefects'), icon: Wrench },
    { id: 'visitor', label: t('tabVisitor'), icon: QrCode },
    { id: 'community', label: t('tabMarket'), icon: ShoppingBag },
    { id: 'glassbox', label: t('tabGlassbox'), icon: BarChart3 }
  ];

  const managementNavItems = [
    { id: 'kpis', label: t('tabKpis'), icon: TrendingUp },
    { id: 'units', label: t('tabUnits'), icon: Building2 },
    { id: 'defects', label: t('tabDefectKanban'), icon: Wrench },
    { id: 'agm', label: t('tabAgm'), icon: Vote },
    { id: 'guardhouse', label: t('tabGuardhouse'), icon: ShieldCheck }
  ];

  const currentNavItems = persona === 'RESIDENT' ? residentNavItems : managementNavItems;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* DESKTOP SIDEBAR (Visible >= 768px) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 bg-white/95 dark:bg-black/90 backdrop-blur-xl border-r border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300 transition-colors">
        <div className="flex flex-col h-full justify-between p-4">
          <div className="space-y-5">
            {/* Branding */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] text-amber-500 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight block truncate">
                      EziBiz JMB
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono border border-amber-500/20">
                      {t('act757')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">
                    {building.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Persona Switcher Toggle */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-white/[0.08] shadow-xs flex gap-1">
              <button
                type="button"
                onClick={() => handlePersonaChange('RESIDENT')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  persona === 'RESIDENT'
                    ? 'bg-amber-500 text-black font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/50'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span className="truncate">{t('residentPersona')}</span>
              </button>
              <button
                type="button"
                onClick={() => handlePersonaChange('MANAGEMENT')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  persona === 'MANAGEMENT'
                    ? 'bg-amber-500 text-black font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="truncate">{t('managementPersona')}</span>
              </button>
            </div>

            {/* Vertical Navigation Tabs */}
            <nav className="space-y-1">
              {currentNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border-amber-500/30 dark:border-amber-500/20 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-900/60 border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-zinc-400'}`} />
                    <span className="truncate">{item.label}</span>
                    {isActive && <span className="sidebar-active-dot ml-auto shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop Sidebar Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-2">
            <button 
              onClick={() => setViewportMode(prev => prev === 'mobile' ? 'responsive' : 'mobile')}
              className={`w-full flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                viewportMode === 'mobile'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300 font-semibold shadow-xs'
                  : 'border-slate-200 dark:border-white/[0.08] text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-900/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>{viewportMode === 'mobile' ? t('responsiveView') : t('mobileSimulator')}</span>
            </button>

            <div className="px-1 pt-1">
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/[0.06] min-h-[44px]"
                title={t('settings')}
              >
                <Settings className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
                <span>{t('settings')}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR (Visible < 768px) */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-black/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.08] px-4 h-14 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] text-amber-500 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight truncate">
            EziBiz JMB
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => handlePersonaChange(persona === 'RESIDENT' ? 'MANAGEMENT' : 'RESIDENT')}
            className="px-2.5 py-1 rounded-lg bg-amber-500 text-black text-xs font-semibold flex items-center gap-1 shadow-xs min-h-[36px]"
          >
            {persona === 'RESIDENT' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
            <span className="truncate max-w-[85px]">
              {persona === 'RESIDENT' ? t('managementPersona') : t('residentPersona')}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors cursor-pointer"
            aria-label={t('settings')}
            title={t('settings')}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="md:pl-64 flex-1 flex flex-col min-w-0 pb-24 md:pb-8">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {viewportMode === 'mobile' ? (
            /* Simulated Smartphone Bezel for Mobile Testing */
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-center mb-3 text-xs text-zinc-500 font-mono">
                <span>{t('mobileSimulator')} (390px)</span>
              </div>
              <div className="w-[390px] min-h-[780px] bg-slate-50 dark:bg-black text-slate-900 dark:text-zinc-100 border-4 border-slate-300 dark:border-zinc-800 rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col p-4">
                {/* Phone Speaker & Camera Notch */}
                <div className="w-32 h-4 bg-slate-200 dark:bg-zinc-900 rounded-full mx-auto mb-4 shrink-0 border border-slate-300/60 dark:border-white/[0.05]"></div>

                {/* Scrollable Screen Content */}
                <div className="flex-1 overflow-y-auto pr-1">
                  {persona === 'RESIDENT' ? (
                    <ResidentPortal
                      resident={resident}
                      building={building}
                      defects={defects}
                      posts={posts}
                      parcels={parcels}
                      expenditures={expenditures}
                      onPayBill={handlePayBill}
                      onViewReceipt={() => setShowReceiptModal(true)}
                      onReportDefect={handleReportDefect}
                      onCreatePost={handleCreatePost}
                      showToast={showToast}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      t={t}
                    />
                  ) : (
                    <ManagementDesk
                      building={building}
                      units={units}
                      defects={defects}
                      resolutions={resolutions}
                      parcels={parcels}
                      onToggleCardStatus={handleToggleCardStatus}
                      onRecordManualPayment={handleRecordManualPayment}
                      onOpenForm28={setForm28Ticket}
                      onUpdateDefectStatus={handleUpdateDefectStatus}
                      onCastVote={handleCastVote}
                      onPublishAnnouncement={handleCreatePost}
                      onLogParcel={handleLogParcel}
                      onCollectParcel={handleCollectParcel}
                      showToast={showToast}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      t={t}
                    />
                  )}
                </div>

                {/* Phone Bottom Home Bar */}
                <div className="w-28 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto mt-3 shrink-0"></div>
              </div>
            </div>
          ) : (
            /* Responsive Viewport */
            persona === 'RESIDENT' ? (
              <ResidentPortal
                resident={resident}
                building={building}
                defects={defects}
                posts={posts}
                parcels={parcels}
                expenditures={expenditures}
                onPayBill={handlePayBill}
                onViewReceipt={() => setShowReceiptModal(true)}
                onReportDefect={handleReportDefect}
                onCreatePost={handleCreatePost}
                showToast={showToast}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                t={t}
              />
            ) : (
              <ManagementDesk
                building={building}
                units={units}
                defects={defects}
                resolutions={resolutions}
                parcels={parcels}
                onToggleCardStatus={handleToggleCardStatus}
                onRecordManualPayment={handleRecordManualPayment}
                onOpenForm28={setForm28Ticket}
                onUpdateDefectStatus={handleUpdateDefectStatus}
                onCastVote={handleCastVote}
                onPublishAnnouncement={handleCreatePost}
                onLogParcel={handleLogParcel}
                onCollectParcel={handleCollectParcel}
                showToast={showToast}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                t={t}
              />
            )
          )}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Visible < 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/[0.08] px-2 pt-1 pb-[max(0.375rem,env(safe-area-inset-bottom))] min-h-[4rem] flex items-center justify-around transition-colors">
        {currentNavItems.slice(0, 4).map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors cursor-pointer ${
                isActive 
                  ? 'text-amber-600 dark:text-amber-400 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="truncate max-w-[64px]">{item.label}</span>
            </button>
          );
        })}

        {/* 5th Slot: More (⋯) Button */}
        {(() => {
          const isFifthActive = activeTab === currentNavItems[4]?.id;
          return (
            <button
              type="button"
              onClick={() => setShowMoreDrawer(true)}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors cursor-pointer relative ${
                isFifthActive || showMoreDrawer
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300'
              }`}
            >
              <div className="relative">
                <MoreHorizontal className="w-5 h-5 mb-0.5" />
                {isFifthActive && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </div>
              <span className="truncate max-w-[64px]">
                {isFifthActive ? currentNavItems[4]?.label : (t('more') || 'More')}
              </span>
            </button>
          );
        })()}
      </nav>

      {/* MORE (⋯) DRAWER (Mobile) */}
      {showMoreDrawer && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
            onClick={() => setShowMoreDrawer(false)}
          />

          {/* Sheet Container */}
          <div className="relative w-full bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-white/[0.1] rounded-t-2xl shadow-2xl p-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-3 z-10 animate-in slide-in-from-bottom duration-200">
            {/* Grab Handle */}
            <div className="w-10 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-white/[0.08]">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('moreModules')}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  {persona === 'RESIDENT' ? t('residentPersona') : t('managementPersona')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMoreDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Primary Action: 5th Module Tab */}
            {(() => {
              const fifth = currentNavItems[4];
              if (!fifth) return null;
              const FifthIcon = fifth.icon;
              const isFifthActive = activeTab === fifth.id;

              return (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(fifth.id);
                    setShowMoreDrawer(false);
                  }}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isFifthActive
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 shadow-xs'
                      : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isFifthActive 
                      ? 'bg-amber-500 text-black shadow-xs' 
                      : 'bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}>
                    <FifthIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm truncate">{fifth.label}</span>
                      {isFifthActive && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-medium">
                          {t('active')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 truncate mt-0.5">
                      {persona === 'RESIDENT'
                        ? (language === 'ms' ? 'Penyata kewangan & audit terbuka JMB' : 'Act 757 verified transparent accounts & runway')
                        : (language === 'ms' ? 'Pondok pengawal, log pelawat & bungkusan' : 'Security checkpoint & parcel intake logs')}
                    </p>
                  </div>
                </button>
              );
            })()}

            {/* Secondary Actions Grid: Settings & Persona Switcher */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowMoreDrawer(false);
                  setShowSettingsModal(true);
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-left"
              >
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-xs text-slate-900 dark:text-white block truncate">{t('settings')}</span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 block truncate">{theme === 'dark' ? t('themeDark') : t('themeLight')}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  handlePersonaChange(persona === 'RESIDENT' ? 'MANAGEMENT' : 'RESIDENT');
                  setShowMoreDrawer(false);
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-left"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  {persona === 'RESIDENT' ? <ShieldCheck className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-xs text-slate-900 dark:text-white block truncate">
                    {persona === 'RESIDENT' ? t('managementPersona') : t('residentPersona')}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 block truncate">
                    {language === 'ms' ? 'Tukar Portal' : 'Switch Role'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        bill={resident.currentBill}
        resident={resident}
        building={building}
      />

      {/* Statutory Act 757 Form 28 Modal */}
      <Form28Modal
        isOpen={!!form28Ticket}
        onClose={() => setForm28Ticket(null)}
        ticket={form28Ticket}
        building={building}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Toast Alert Banner */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 animate-in slide-in-from-bottom-3 duration-300">
          <div className={`px-4 py-3 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2.5 border ${
            toast.type === 'success' 
              ? 'bg-white/95 dark:bg-zinc-950/95 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
              : toast.type === 'error'
              ? 'bg-white/95 dark:bg-zinc-950/95 text-rose-700 dark:text-rose-300 border-rose-500/30'
              : 'bg-white/95 dark:bg-zinc-950/95 text-amber-700 dark:text-amber-300 border-amber-500/30'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
