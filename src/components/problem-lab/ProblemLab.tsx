import React, { useState } from 'react';
import { PROBLEM_LAB_ITEMS } from '../../data/problemsData';
import { ProblemLabItem, ProblemLabStep } from '../../types/curriculum';
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCode,
  RotateCcw,
  Sparkles,
  Bot,
  Filter,
  CheckSquare,
  BookOpen,
} from 'lucide-react';

interface ProblemLabProps {
  onAskTutor: (context: any) => void;
}

export const ProblemLab: React.FC<ProblemLabProps> = ({ onAskTutor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedProblemId, setSelectedProblemId] = useState<string>(PROBLEM_LAB_ITEMS[0].id);

  const filteredProblems = selectedCategory === 'ALL'
    ? PROBLEM_LAB_ITEMS
    : PROBLEM_LAB_ITEMS.filter((p) => p.category === selectedCategory);

  const currentProblem: ProblemLabItem =
    PROBLEM_LAB_ITEMS.find((p) => p.id === selectedProblemId) || filteredProblems[0] || PROBLEM_LAB_ITEMS[0];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepAnswers, setStepAnswers] = useState<Record<number, number>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<number, { isCorrect: boolean; message: string }>>({});
  const [viewCodeFormat, setViewCodeFormat] = useState<'pseudocode' | 'c'>('pseudocode');

  // Mobile viewport panel switcher: 'step' | 'code'
  const [mobilePanel, setMobilePanel] = useState<'step' | 'code'>('step');

  const currentStep: ProblemLabStep | undefined = currentProblem.steps[currentStepIndex];

  const categories = [
    { id: 'ALL', label: 'All 19 Problems' },
    { id: 'SEQUENCE', label: '1. Sequence' },
    { id: 'VARIABLES', label: '2. Variables & Swaps' },
    { id: 'CONDITIONS', label: '3. Conditions' },
    { id: 'COUNTERS', label: '4. Counters' },
    { id: 'ACCUMULATORS', label: '5. Accumulators' },
    { id: 'INVARIANTS', label: '6. Invariants & Primes' },
  ];

  const handleSelectAnswer = (optionIdx: number) => {
    if (!currentStep) return;
    setStepAnswers((prev) => ({ ...prev, [currentStepIndex]: optionIdx }));

    if (currentStep.actionData?.correctIndex !== undefined) {
      const correct = optionIdx === currentStep.actionData.correctIndex;
      setStepFeedback((prev) => ({
        ...prev,
        [currentStepIndex]: {
          isCorrect: correct,
          message: correct
            ? 'Correct! You identified the proper engineering constraint.'
            : 'Re-examine the mathematical requirement. Think about boundary values.',
        },
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < currentProblem.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleResetProblem = () => {
    setCurrentStepIndex(0);
    setStepAnswers({});
    setStepFeedback({});
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Category Filter Pills - Touch-friendly horizontal scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-slate-900/70 p-2 sm:p-2.5 rounded-2xl border border-slate-800 text-xs no-scrollbar">
        <Filter className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              const firstInCat = cat.id === 'ALL'
                ? PROBLEM_LAB_ITEMS[0]
                : PROBLEM_LAB_ITEMS.find((p) => p.category === cat.id);
              if (firstInCat) {
                setSelectedProblemId(firstInCat.id);
                handleResetProblem();
              }
            }}
            className={`px-3.5 py-2 rounded-xl font-semibold shrink-0 transition-colors min-h-[44px] flex items-center active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Header & Problem Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Problem Lab ({currentProblem.category})
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-100">{currentProblem.title}</h2>
          <p className="text-xs text-slate-400 max-w-xl">{currentProblem.description}</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={selectedProblemId}
            onChange={(e) => {
              setSelectedProblemId(e.target.value);
              handleResetProblem();
            }}
            className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-1 sm:max-w-xs truncate min-h-[44px]"
          >
            {filteredProblems.map((prob) => (
              <option key={prob.id} value={prob.id}>
                {prob.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleResetProblem}
            className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 text-xs border border-slate-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 active:scale-95"
            title="Restart problem steps"
            aria-label="Restart problem steps"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile-Only Panel Switcher: Lets students toggle between Step Task and Code Solution with 1 tap */}
      <div className="lg:hidden bg-slate-900 border border-slate-800 rounded-xl p-1.5 grid grid-cols-2 gap-1.5 shadow">
        <button
          onClick={() => setMobilePanel('step')}
          className={`px-3 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[44px] active:scale-95 ${
            mobilePanel === 'step'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Step {currentStepIndex + 1} Challenge</span>
        </button>
        <button
          onClick={() => setMobilePanel('code')}
          className={`px-3 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[44px] active:scale-95 ${
            mobilePanel === 'code'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Code & Test Cases</span>
        </button>
      </div>

      {/* Main 2-Column Workspace (Side-by-side on desktop, Tab-switched on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ======================================================== */}
        {/* Left Column: Interactive Step Progression                */}
        {/* ======================================================== */}
        <div
          className={`lg:col-span-7 space-y-4 ${
            mobilePanel === 'step' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Stepper Tabs - Touch-Friendly Pill Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              {currentProblem.steps.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isAnswered = stepAnswers[idx] !== undefined;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all min-h-[38px] ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow'
                        : isAnswered
                        ? 'bg-slate-800 text-indigo-300 border border-slate-700'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    <span>#{idx + 1}</span>
                    <span className="hidden sm:inline text-[11px] truncate max-w-28 font-medium">
                      {step.title.split(':')[1]?.trim() || step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Card */}
          {currentStep && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 min-h-[360px] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {currentStep.title}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-semibold">
                    Step {currentStepIndex + 1} of {currentProblem.steps.length}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-200">
                  {currentStep.instruction}
                </p>

                <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {currentStep.content}
                </div>

                {/* Step Action Component (Options with min-h-[44px] touch targets) */}
                {currentStep.studentActionType === 'INPUT_SELECT' && currentStep.actionData && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold text-indigo-300">
                      {currentStep.actionData.question}
                    </p>
                    <div className="space-y-2">
                      {currentStep.actionData.options.map((opt: string, optIdx: number) => {
                        const isChosen = stepAnswers[currentStepIndex] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all min-h-[44px] flex items-center active:scale-[0.99] touch-manipulation ${
                              isChosen
                                ? optIdx === currentStep.actionData.correctIndex
                                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                                  : 'bg-rose-950/70 border-rose-500 text-rose-200 font-medium'
                                : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className="font-mono mr-2.5 font-bold text-indigo-400 shrink-0">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step Feedback Box */}
                {stepFeedback[currentStepIndex] && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                      stepFeedback[currentStepIndex].isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                        : 'bg-amber-950/40 border-amber-800 text-amber-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{stepFeedback[currentStepIndex].message}</span>
                  </div>
                )}
              </div>

              {/* Navigation within steps - Touch-Friendly Target */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 gap-2">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous Step
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex >= currentProblem.steps.length - 1}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow min-h-[44px]"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* Right Column: Code & Mathematical Model Artifacts        */}
        {/* ======================================================== */}
        <div
          className={`lg:col-span-5 space-y-4 ${
            mobilePanel === 'code' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Format Switcher */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-2 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-indigo-400" /> Implementation
            </span>
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setViewCodeFormat('pseudocode')}
                className={`px-3 py-1.5 rounded-md transition-colors min-h-[32px] ${
                  viewCodeFormat === 'pseudocode'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pseudocode
              </button>
              <button
                onClick={() => setViewCodeFormat('c')}
                className={`px-3 py-1.5 rounded-md transition-colors min-h-[32px] ${
                  viewCodeFormat === 'c'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                C Source
              </button>
            </div>
          </div>

          {/* Code Viewer Panel - Overflow-Safe Monospace */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3.5 sm:p-4 font-mono text-xs overflow-x-auto shadow-xl max-w-full">
            {viewCodeFormat === 'pseudocode' ? (
              <div className="space-y-1">
                {currentProblem.pseudocode.map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-slate-600 select-none text-[11px] w-5 text-right shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-slate-200 whitespace-pre">{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="text-slate-300 font-mono text-xs leading-relaxed whitespace-pre">
                {currentProblem.cTranslation}
              </pre>
            )}
          </div>

          {/* Manual Validation Test Cases Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Validation Test Cases:
            </span>
            <div className="space-y-2">
              {currentProblem.manualTestCases.map((tc, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs font-mono space-y-1">
                  <div className="flex flex-wrap items-center justify-between text-indigo-300 font-bold gap-1">
                    <span>In: {tc.input}</span>
                    <span className="text-emerald-400">Out: {tc.output}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">{tc.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complexity Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Complexity Profile</span>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-[11px]">
                  {currentProblem.complexity.time}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[11px]">
                  {currentProblem.complexity.space}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">{currentProblem.complexity.explanation}</p>
          </div>

          {/* Socratic Hint Trigger */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Need guidance on this problem?</span>
            </div>
            <button
              onClick={() =>
                onAskTutor({
                  topic: currentProblem.category,
                  problemTitle: currentProblem.title,
                  stepInstruction: currentStep?.instruction,
                  currentStepNumber: currentStepIndex + 1,
                })
              }
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow min-h-[38px] shrink-0"
            >
              <Bot className="w-4 h-4" /> Ask Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
