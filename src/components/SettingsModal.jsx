import React, { useEffect } from 'react';
import { Settings, Sun, Moon, CheckCircle2, X } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, theme, setTheme, language, setLanguage, t }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-900 dark:text-slate-100 animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 id="settings-title" className="font-bold text-base sm:text-lg">
                {t('settingsTitle')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('settingsSub')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label={t('close')}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Appearance / Theme */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('themeLabel')}
            </label>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {theme === 'light' ? t('themeLight') : t('themeDark')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Light Option */}
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                theme === 'light'
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-500/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                {theme === 'light' && (
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 dark:text-white">
                  {t('themeLight')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  {t('themeLightDesc')}
                </p>
              </div>
            </button>

            {/* Dark Option */}
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                theme === 'dark'
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-500/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                {theme === 'dark' && (
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 dark:text-white">
                  {t('themeDark')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  {t('themeDarkDesc')}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Language */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('languageLabel')}
            </label>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {language === 'en' ? 'EN' : 'MS'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* English Option */}
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                language === 'en'
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-500/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400">
                  EN
                </span>
                {language === 'en' && (
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 dark:text-white">
                  {t('langEn')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  {t('langEnDesc')}
                </p>
              </div>
            </button>

            {/* Malay Option */}
            <button
              type="button"
              onClick={() => setLanguage('ms')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                language === 'ms'
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-500/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400">
                  BM
                </span>
                {language === 'ms' && (
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 dark:text-white">
                  {t('langMs')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  {t('langMsDesc')}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Section 3: App & Property Info */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t('aboutVersion')}</span>
            <span className="font-mono text-slate-700 dark:text-slate-300">v1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t('aboutWorkspace')}</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">Residensi Suria Damai</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t('aboutDeploy')}</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold font-mono">Act 757 Certified</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition-colors cursor-pointer shadow-sm"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
