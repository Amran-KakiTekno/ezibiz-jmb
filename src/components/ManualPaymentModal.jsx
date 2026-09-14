import React, { useState, useEffect } from 'react';
import { CreditCard, X } from 'lucide-react';
import { useModalA11y } from './ConfirmModal';

export default function ManualPaymentModal({
  isOpen,
  onClose,
  unit,
  onConfirmPayment
}) {
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const modalRef = useModalA11y(isOpen, onClose);

  useEffect(() => {
    if (unit) {
      setAmount(unit.balance ? unit.balance.toFixed(2) : '0.00');
      setReference('');
      setError('');
    }
  }, [unit]);

  if (!isOpen || !unit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Sila masukkan jumlah bayaran yang sah (minimum RM 0.01).');
      return;
    }
    onConfirmPayment(unit.id, parsedAmount, reference.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manual-pay-title"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-900 dark:text-slate-100 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 id="manual-pay-title" className="font-bold text-base text-slate-900 dark:text-white">
                Rekod Bayaran Kaunter / Manual
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unit {unit.unitNo} • {unit.ownerName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 flex justify-between items-center text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-medium">Baki Tertunggak Terkini:</span>
          <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
            RM {unit.balance.toFixed(2)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="manual-pay-amount" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Jumlah Bayaran Diterima (RM) <span className="text-rose-500">*</span>
            </label>
            <input
              id="manual-pay-amount"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0.01"
              required
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (error) setError('');
              }}
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label htmlFor="manual-pay-ref" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              No. Rujukan / Kaedah Bayaran <span className="text-slate-400 font-normal">(Pilihan)</span>
            </label>
            <input
              id="manual-pay-ref"
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Cth: Cimb Clicks / Cek #12345 / Tunai Kaunter"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-500 font-medium">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 text-xs font-medium border border-slate-200 dark:border-white/[0.08] min-h-[44px] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm min-h-[44px] cursor-pointer transition-colors"
            >
              Sahkan Bayaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
