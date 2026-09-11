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
  ArrowLeft, 
  Settings, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import ResidentPortal from './components/ResidentPortal';
import ManagementDesk from './components/ManagementDesk';
import ReceiptModal from './components/ReceiptModal';
import Form28Modal from './components/Form28Modal';
import SuiteWaffleMenu from './components/SuiteWaffleMenu';
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
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* DESKTOP SIDEBAR (Visible >= 768px) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 bg-black/90 backdrop-blur-xl border-r border-white/[0.08] transition-colors">
        <div className="flex flex-col h-full justify-between p-4">
          <div className="space-y-5">
            {/* Branding & Hub Link */}
            <div>
              <a 
                href="https://ezibiz-hub.pages.dev" 
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('backToHub')}</span>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/[0.08] shadow-rim text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-white tracking-tight block truncate">
                      EziBiz JMB
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono border border-amber-500/20">
                      {t('act757')}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate">
                    {building.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Persona Switcher Toggle */}
            <div className="p-1 rounded-xl bg-zinc-900/90 border border-white/[0.08] shadow-rim flex gap-1">
              <button
                type="button"
                onClick={() => handlePersonaChange('RESIDENT')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  persona === 'RESIDENT'
                    ? 'bg-amber-500 text-black font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
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
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
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
                        ? 'bg-amber-500/10 text-amber-300 font-semibold border-amber-500/20 shadow-rim'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span className="truncate">{item.label}</span>
                    {isActive && <span className="sidebar-active-dot ml-auto shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop Sidebar Footer */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2">
            <button 
              onClick={() => setViewportMode(prev => prev === 'mobile' ? 'responsive' : 'mobile')}
              className={`w-full flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                viewportMode === 'mobile'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300 font-semibold shadow-rim'
                  : 'border-white/[0.08] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>{viewportMode === 'mobile' ? t('responsiveView') : t('mobileSimulator')}</span>
            </button>

            <div className="flex items-center justify-between px-1 pt-1">
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer border border-transparent hover:border-white/[0.06]"
                title={t('settings')}
              >
                <Settings className="w-4 h-4 text-zinc-400" />
                <span>{t('settings')}</span>
              </button>

              <SuiteWaffleMenu currentApp="jmb" />
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR (Visible < 768px) */}
      <header className="md:hidden sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/[0.08] px-4 h-14 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <a 
            href="https://ezibiz-hub.pages.dev" 
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
            title={t('backToHub')}
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] shadow-rim text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm text-white tracking-tight truncate">
            EziBiz JMB
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => handlePersonaChange(persona === 'RESIDENT' ? 'MANAGEMENT' : 'RESIDENT')}
            className="px-2.5 py-1 rounded-lg bg-amber-500 text-black text-xs font-semibold flex items-center gap-1 shadow-xs"
          >
            {persona === 'RESIDENT' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
            <span className="truncate max-w-[85px]">
              {persona === 'RESIDENT' ? t('managementPersona') : t('residentPersona')}
            </span>
          </button>
          <SuiteWaffleMenu currentApp="jmb" />
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="md:pl-64 flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {viewportMode === 'mobile' ? (
            /* Simulated Smartphone Bezel for Mobile Testing */
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-center mb-3 text-xs text-zinc-500 font-mono">
                <span>{t('mobileSimulator')} (390px)</span>
              </div>
              <div className="w-[390px] min-h-[780px] bg-black text-zinc-100 border-4 border-zinc-800 rounded-[48px] shadow-2xl shadow-black/80 overflow-hidden relative flex flex-col p-4">
                {/* Phone Speaker & Camera Notch */}
                <div className="w-32 h-4 bg-zinc-900 rounded-full mx-auto mb-4 shrink-0 border border-white/[0.05]"></div>

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
                <div className="w-28 h-1 bg-zinc-700 rounded-full mx-auto mt-3 shrink-0"></div>
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-1 flex items-center justify-around h-16 transition-colors">
        {currentNavItems.slice(0, 4).map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors cursor-pointer ${
                isActive ? 'text-amber-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setShowSettingsModal(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="truncate">{t('settings')}</span>
        </button>
      </nav>

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
          <div className={`px-4 py-3 rounded-xl shadow-card-elevated text-xs font-medium flex items-center gap-2.5 border ${
            toast.type === 'success' 
              ? 'bg-zinc-950/95 text-emerald-300 border-emerald-500/30 shadow-rim'
              : toast.type === 'error'
              ? 'bg-zinc-950/95 text-rose-300 border-rose-500/30 shadow-rim'
              : 'bg-zinc-950/95 text-amber-300 border-amber-500/30 shadow-rim'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
