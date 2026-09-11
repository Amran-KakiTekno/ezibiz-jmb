import React from 'react';
import { 
  Building2, 
  Smartphone, 
  Monitor, 
  UserCheck, 
  ShieldCheck, 
  ArrowUpRight, 
  Home, 
  Layers, 
  Radio
} from 'lucide-react';

export default function Header({ 
  persona, 
  onTogglePersona, 
  viewportMode, 
  onToggleViewport,
  hubUrl = "https://ezibiz-hub.pages.dev",
  building
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand & Suite Backlink */}
          <div className="flex items-center gap-3">
            <a 
              href={hubUrl}
              className="flex items-center gap-2 group p-1.5 -ml-1.5 rounded-lg hover:bg-slate-900 transition-colors"
              title="Kembali ke EziBiz Suite Central Hub"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">EziBiz JMB</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
                    Akta 757
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[140px] sm:max-w-[200px]">
                  {building?.name || "Residensi Suria Damai"}
                </p>
              </div>
            </a>
          </div>

          {/* Center Pill: Persona Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => onTogglePersona('RESIDENT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                persona === 'RESIDENT'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portal</span> Residen (B-14-02)
            </button>
            <button
              onClick={() => onTogglePersona('MANAGEMENT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                persona === 'MANAGEMENT'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Meja</span> JMB & Pengurusan
            </button>
          </div>

          {/* Right Actions: Viewport Switcher & Hub Link */}
          <div className="flex items-center gap-2">
            {/* Viewport switch: Mobile Phone Frame vs Desktop */}
            <div className="hidden md:flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
              <button
                onClick={() => onToggleViewport('mobile')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewportMode === 'mobile'
                    ? 'bg-slate-800 text-amber-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Simulasi Telefon Pintar (Mobile PWA)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleViewport('responsive')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewportMode === 'responsive'
                    ? 'bg-slate-800 text-amber-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Paparan Skrin Penuh"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Hub Switcher Button */}
            <a
              href={hubUrl}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden lg:inline">EziBiz Hub</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
