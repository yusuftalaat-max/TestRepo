import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Dumbbell,
  Layers,
  Cpu,
  Award,
  GitCommit,
  Users2,
  Bot,
  Share2,
  Download,
  Copy,
  Check,
  X,
  HardDrive,
} from 'lucide-react';

export type NavTab = 'LEARN' | 'PRACTICE' | 'PROBLEM_LAB' | 'ALGORITHM_LAB' | 'EXAMS' | 'COURSE_MAP' | 'INSTRUCTOR';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenTutor: () => void;
  masteredCount: number;
  totalTopics: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenTutor,
  masteredCount,
  totalTopics,
}) => {
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const navItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'LEARN', label: 'Learn', icon: BookOpen },
    { id: 'PRACTICE', label: 'Practice', icon: Dumbbell },
    { id: 'PROBLEM_LAB', label: 'Problem Lab', icon: Layers },
    { id: 'ALGORITHM_LAB', label: 'Algorithm Lab', icon: Cpu },
    { id: 'EXAMS', label: 'Exams', icon: Award },
    { id: 'COURSE_MAP', label: 'Course Map', icon: GitCommit },
  ];

  const liveDevUrl = 'https://ais-dev-d22lbeba5ff7iqz4m44bxt-524384905576.europe-west2.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveDevUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Brand Logo & University Identity */}
          <div
            onClick={() => onSelectTab('LEARN')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 font-bold shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-slate-100 text-sm sm:text-lg tracking-tight font-display">
                  CS1 Companion
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  GIU
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block font-medium">
                German International University • First-Year Engineering
              </span>
            </div>
          </div>

          {/* Desktop Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Socratic Tutor, Instructor Mode, Share */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Share & Google Drive Button */}
            <button
              onClick={() => setShowShareModal(true)}
              aria-label="Share or Export"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm min-h-[38px] min-w-[38px] justify-center"
              title="Share or Export"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Mastery Badge (Tablet/Desktop) */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-500 text-[10px]">MASTERY:</span>
              <span className="text-emerald-400 font-bold">{masteredCount}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{totalTopics}</span>
            </div>

            {/* Socratic Tutor Button */}
            <button
              onClick={onOpenTutor}
              aria-label="Open AI Socratic Tutor"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-700/80 hover:bg-indigo-900 text-indigo-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md min-h-[38px]"
            >
              <Bot className="w-4 h-4 text-indigo-400 animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs">Tutor</span>
            </button>

            {/* Instructor Mode Toggle */}
            <button
              onClick={() => onSelectTab('INSTRUCTOR')}
              aria-label="Instructor and Parent Mode"
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border min-h-[38px] ${
                activeTab === 'INSTRUCTOR'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900'
              }`}
            >
              <Users2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Coach</span>
            </button>
          </div>
        </div>
      </header>

      {/* Share / Export Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-slate-100">Share or Save to Google Drive</h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                aria-label="Close share dialog"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option 1: Direct Web Link */}
            <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                Option 1: Live Interactive Web Link
              </span>
              <p className="text-xs text-slate-400">
                This is the live application running right now on the cloud server:
              </p>
              <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono text-xs text-slate-200">
                <span className="truncate flex-1 text-[11px] sm:text-xs">{liveDevUrl}</span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors min-h-[36px]"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Option 2: Download for Google Drive */}
            <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Option 2: Put on Google Drive (Portable Offline File)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download the complete application as a self-contained single-file bundle. You can drag and drop it directly into your <strong>Google Drive</strong>, share the link, or open it in any browser offline:
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="/download/standalone"
                  download="CS1-Companion-Standalone.html"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow min-h-[44px]"
                >
                  <Download className="w-4 h-4" /> Download Standalone HTML
                </a>
                <a
                  href="/download/zip"
                  download="CS1-Companion-App.zip"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-colors shadow min-h-[44px]"
                >
                  <Download className="w-4 h-4" /> Download Complete ZIP
                </a>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-900/80 p-3 rounded-lg space-y-1">
                <strong className="text-slate-300 block">How to share via Google Drive:</strong>
                <div>1. Click download above to get <code className="text-indigo-300">CS1-Companion-Standalone.html</code>.</div>
                <div>2. Go to <strong>drive.google.com</strong> and upload the file.</div>
                <div>3. Right-click the file &rarr; <strong>Share</strong> &rarr; change to <em>&quot;Anyone with the link&quot;</em>.</div>
                <div>4. Anyone who opens or downloads it can run the full app instantly in their browser!</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar - Ergonomic thumb friendly touch targets >= 44px */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 py-1 px-1 flex items-center justify-around pb-[max(0.35rem,env(safe-area-inset-bottom))] shadow-2xl"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`px-1.5 py-1.5 rounded-xl flex flex-col items-center justify-center gap-0.5 shrink-0 transition-all min-h-[46px] min-w-[50px] ${
                isActive
                  ? 'text-indigo-400 font-bold bg-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400 scale-110' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-tight leading-none truncate max-w-[58px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
