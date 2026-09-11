import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import ResidentPortal from './components/ResidentPortal';
import ManagementDesk from './components/ManagementDesk';
import ReceiptModal from './components/ReceiptModal';
import Form28Modal from './components/Form28Modal';
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
  // Master State
  const [persona, setPersona] = useState('RESIDENT'); // RESIDENT | MANAGEMENT
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
    showToast('Alhamdulillah! Bayaran RM ' + resident.currentBill.totalAmount.toFixed(2) + ' telah berjaya diproses.', 'success');
    setShowReceiptModal(true);
  };

  // Action: Toggle RFID access card status (Management)
  const handleToggleCardStatus = (unitId) => {
    setUnits(prev => prev.map(u => {
      if (u.id === unitId) {
        const nextStatus = u.cardStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        showToast(`Kad Akses ${u.unitNo} ditukar status kepada: ${nextStatus === 'ACTIVE' ? 'DIBENARKAN' : 'DISEKAT'}`, nextStatus === 'ACTIVE' ? 'success' : 'error');
        return { ...u, cardStatus: nextStatus };
      }
      return u;
    }));
  };

  // Action: Record manual payment (Management)
  const handleRecordManualPayment = (unitId) => {
    setUnits(prev => prev.map(u => {
      if (u.id === unitId) {
        showToast(`Bayaran manual RM ${u.balance.toFixed(2)} bagi Unit ${u.unitNo} telah direkodkan.`, 'success');
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
        return { ...p, status: 'COLLECTED', collectedAt: 'Baru sahaja' };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Alert Banner */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className={`px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border ${
            toast.type === 'success' 
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40 shadow-emerald-950/50'
              : toast.type === 'error'
              ? 'bg-rose-950/90 text-rose-200 border-rose-500/40 shadow-rose-950/50'
              : 'bg-slate-900/90 text-amber-200 border-amber-500/40 shadow-slate-950/50'
          }`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Header
        persona={persona}
        onTogglePersona={setPersona}
        viewportMode={viewportMode}
        onToggleViewport={setViewportMode}
        building={building}
      />

      {/* Main App Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewportMode === 'mobile' ? (
          /* Simulated Smartphone Bezel for Mobile PWA Testing */
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-center mb-3 text-xs text-slate-400">
              <span>Simulasi Paparan Telefon Pintar (Mobile PWA 390px)</span>
            </div>
            <div className="w-[390px] min-h-[780px] bg-slate-950 border-[10px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col p-4">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-4 shrink-0"></div>

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
                  />
                )}
              </div>

              {/* Phone Bottom Home Bar */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-3 shrink-0"></div>
            </div>
          </div>
        ) : (
          /* Full Responsive Viewport */
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
            />
          )
        )}
      </main>

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
    </div>
  );
}
