import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Code,
  ListTree,
  Sliders,
  ArrowRight,
  Cpu,
  Layers,
  Terminal,
  Columns,
} from 'lucide-react';
import { ALGORITHM_PRESETS } from '../../data/algorithmsData';
import { TraceableAlgorithm, CodeTraceStep } from '../../types/curriculum';

interface AlgorithmVisualizerProps {
  initialPresetId?: string;
  onPredictionAnswered?: (isCorrect: boolean) => void;
  onAskTutor?: (context: any) => void;
  standalone?: boolean;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  initialPresetId = 'sum-1-to-n',
  onPredictionAnswered,
  onAskTutor: _onAskTutor,
  standalone = false,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);
  const currentAlgorithm: TraceableAlgorithm =
    ALGORITHM_PRESETS.find((p) => p.id === selectedPresetId) || ALGORITHM_PRESETS[0];

  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    currentAlgorithm.supportedInputs?.forEach((inp) => {
      init[inp.name] = inp.defaultVal;
    });
    return init;
  });

  const [steps, setSteps] = useState<CodeTraceStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1200); // ms per step
  const [activeTab, setActiveTab] = useState<'visual' | 'traceTable'>('visual');

  // Mobile-specific sub-panel switcher: 'code' | 'memory' | 'stacked'
  const [mobileSubView, setMobileSubView] = useState<'code' | 'memory' | 'stacked'>('code');
  // Mobile trace table display preference: 'cards' | 'table'
  const [mobileTraceMode, setMobileTraceMode] = useState<'cards' | 'table'>('cards');

  // Prediction challenge state
  const [predictionAnswer, setPredictionAnswer] = useState<number | null>(null);
  const [predictionFeedback, setPredictionFeedback] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Recalculate steps whenever algorithm preset or inputs change
  useEffect(() => {
    const generated = currentAlgorithm.stepsGenerator(inputs);
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setPredictionAnswer(null);
    setPredictionFeedback(null);
  }, [selectedPresetId, inputs]);

  // Handle play / pause timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          // Pause if current step has an unanswered prediction prompt
          const nextStep = steps[prev + 1];
          if (nextStep?.predictionPrompt && predictionAnswer === null) {
            setIsPlaying(false);
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps, predictionAnswer]);

  const currentStep: CodeTraceStep | undefined = steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setPredictionAnswer(null);
    setPredictionFeedback(null);
  };

  const handleInputChange = (name: string, val: number) => {
    setInputs((prev) => ({ ...prev, [name]: val }));
  };

  const handlePredictionChoice = (choiceIndex: number) => {
    if (!currentStep?.predictionPrompt) return;
    setPredictionAnswer(choiceIndex);
    const isCorrect = choiceIndex === currentStep.predictionPrompt.correctIndex;
    setPredictionFeedback(
      isCorrect
        ? `Spot on! ${currentStep.predictionPrompt.explanation}`
        : `Not quite. ${currentStep.predictionPrompt.explanation}`
    );
    if (onPredictionAnswered) onPredictionAnswered(isCorrect);
  };

  // Compile full output accumulated up to current step
  const accumulatedOutput = steps
    .slice(0, currentStepIndex + 1)
    .filter((s) => s.output && s.output.length > 0)
    .map((s) => s.output)
    .join('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header & Presets Bar */}
      <div className="bg-slate-950/90 px-3.5 sm:px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-bold text-xs sm:text-sm tracking-wide text-slate-100">
            Algorithm Lab
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 hidden xs:inline">
            GIU Trace
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Preset Selector */}
          <select
            value={selectedPresetId}
            onChange={(e) => {
              setSelectedPresetId(e.target.value);
              const found = ALGORITHM_PRESETS.find((p) => p.id === e.target.value);
              if (found?.supportedInputs) {
                const newInp: Record<string, number> = {};
                found.supportedInputs.forEach((x) => (newInp[x.name] = x.defaultVal));
                setInputs(newInp);
              }
            }}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded-xl px-2.5 py-2 sm:py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium max-w-[200px] xs:max-w-xs sm:max-w-sm truncate"
          >
            {ALGORITHM_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          {/* Main Sub-Tabs (Visual vs Trace Table) */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-700 text-xs shrink-0">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 ${
                activeTab === 'visual'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Visual</span>
            </button>
            <button
              onClick={() => setActiveTab('traceTable')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 ${
                activeTab === 'traceTable'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inputs Configuration Bar - Touch-Friendly on Mobile with - and + steppers */}
      {currentAlgorithm.supportedInputs && currentAlgorithm.supportedInputs.length > 0 && (
        <div className="bg-slate-900/80 px-3 sm:px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <span className="flex items-center gap-1 font-semibold text-slate-400 text-xs shrink-0">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Inputs:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {currentAlgorithm.supportedInputs.map((param) => {
                const currentVal = inputs[param.name] ?? param.defaultVal;
                return (
                  <div
                    key={param.name}
                    className="flex items-center bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs min-h-[40px]"
                  >
                    <span className="font-mono text-indigo-300 font-semibold mr-1.5">{param.name} =</span>
                    <button
                      type="button"
                      aria-label={`Decrease ${param.name}`}
                      onClick={() => handleInputChange(param.name, Math.max(param.min, currentVal - 1))}
                      disabled={currentVal <= param.min}
                      className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm hover:bg-slate-800 disabled:opacity-30 active:scale-90 transition-all shrink-0"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={param.min}
                      max={param.max}
                      value={currentVal}
                      onChange={(e) =>
                        handleInputChange(param.name, parseInt(e.target.value) || param.defaultVal)
                      }
                      className="w-12 bg-transparent text-slate-100 font-mono text-center text-xs font-bold focus:outline-none"
                    />
                    <button
                      type="button"
                      aria-label={`Increase ${param.name}`}
                      onClick={() => handleInputChange(param.name, Math.min(param.max, currentVal + 1))}
                      disabled={currentVal >= param.max}
                      className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm hover:bg-slate-800 disabled:opacity-30 active:scale-90 transition-all shrink-0"
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            Modify inputs to observe dynamic state changes.
          </span>
        </div>
      )}

      {/* Mobile-Only Segmented Panel Switcher (Code vs Memory vs Stacked for small viewports) */}
      {activeTab === 'visual' && (
        <div className="lg:hidden bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            View:
          </span>
          <div className="grid grid-cols-3 gap-1 flex-1 max-w-sm">
            <button
              onClick={() => setMobileSubView('code')}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors min-h-[38px] ${
                mobileSubView === 'code'
                  ? 'bg-indigo-600 text-white shadow font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>1. Code</span>
            </button>
            <button
              onClick={() => setMobileSubView('memory')}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors min-h-[38px] ${
                mobileSubView === 'memory'
                  ? 'bg-indigo-600 text-white shadow font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>2. State</span>
            </button>
            <button
              onClick={() => setMobileSubView('stacked')}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors min-h-[38px] ${
                mobileSubView === 'stacked'
                  ? 'bg-indigo-600 text-white shadow font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Columns className="w-3 h-3" />
              <span>Stacked</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Execution Arena */}
      {activeTab === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 flex-1">
          {/* ======================================================== */}
          {/* Left Column (Desktop) / Mobile Panel 1: Code & Step      */}
          {/* ======================================================== */}
          <div
            className={`lg:col-span-6 p-3 sm:p-4 flex flex-col justify-between space-y-4 ${
              mobileSubView === 'code' || mobileSubView === 'stacked' ? 'block' : 'hidden lg:flex'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-indigo-400" /> Pseudocode
                </span>
                <span className="text-xs text-indigo-300 font-mono font-semibold">
                  Line {currentStep?.line ?? 1} of {currentAlgorithm.codeLines.length}
                </span>
              </div>

              {/* Code Lines Container */}
              <div className="bg-slate-950 rounded-xl p-2.5 sm:p-3.5 border border-slate-800 font-mono text-xs sm:text-sm space-y-1 overflow-x-auto max-w-full">
                {currentAlgorithm.codeLines.map((lineText, idx) => {
                  const lineNumber = idx + 1;
                  const isCurrentLine = currentStep?.line === lineNumber;
                  return (
                    <div
                      key={idx}
                      className={`flex items-start px-2 py-1 rounded transition-all duration-200 ${
                        isCurrentLine
                          ? 'bg-indigo-950 text-indigo-100 border-l-4 border-indigo-500 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <span className="w-6 shrink-0 text-slate-600 select-none text-right mr-3 font-mono text-xs">
                        {lineNumber}
                      </span>
                      <pre className="font-mono whitespace-pre">{lineText}</pre>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Step Explanation Box */}
            <div className="bg-indigo-950/30 border border-indigo-900/60 rounded-xl p-3 sm:p-3.5 text-xs">
              <div className="text-indigo-300 font-semibold mb-1 flex items-center gap-1.5 text-xs">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>What happens at step {currentStepIndex + 1}:</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                {currentStep?.explanation}
              </p>
            </div>

            {/* Interactive Student Prediction Prompt (Displayed directly in flow) */}
            {currentStep?.predictionPrompt && (
              <div className="bg-amber-950/40 border border-amber-800/80 rounded-xl p-3 sm:p-4 shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Interactive Prediction Checkpoint</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 mb-2.5 font-medium leading-relaxed">
                  {currentStep.predictionPrompt.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  {currentStep.predictionPrompt.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handlePredictionChoice(optIdx)}
                      className={`text-xs px-3 py-2.5 rounded-xl font-mono border transition-all text-left min-h-[44px] flex items-center ${
                        predictionAnswer === optIdx
                          ? optIdx === currentStep.predictionPrompt?.correctIndex
                            ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-rose-900/70 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-500 active:scale-[0.99]'
                      }`}
                    >
                      <span className="font-mono mr-2 font-bold text-indigo-400">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
                {predictionFeedback && (
                  <div className="text-xs text-amber-200 bg-amber-950/60 p-2.5 rounded-lg border border-amber-900 flex items-start gap-2">
                    {predictionAnswer === currentStep.predictionPrompt.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <span>{predictionFeedback}</span>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Context Helper: Quick Snapshot of Variables in Code View */}
            <div className="lg:hidden bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-400">Live Memory:</span>
              <div className="flex items-center gap-2 overflow-x-auto">
                {currentStep?.variables &&
                  Object.entries(currentStep.variables).map(([k, v]) => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-indigo-300"
                    >
                      <strong>{k}</strong> = {String(v)}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Right Column (Desktop) / Mobile Panel 2: Memory & State  */}
          {/* ======================================================== */}
          <div
            className={`lg:col-span-6 p-3 sm:p-4 flex flex-col justify-between space-y-4 ${
              mobileSubView === 'memory' || mobileSubView === 'stacked' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Condition Evaluation (if applicable) */}
            {currentStep?.conditionEval && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-3.5 space-y-2">
                <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                  <span>Branch Condition Evaluation</span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                      currentStep.conditionEval.result
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {currentStep.conditionEval.result ? 'TRUE' : 'FALSE'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-indigo-300 font-semibold">
                    {currentStep.conditionEval.expression}
                  </span>
                  <span className="text-slate-500">→</span>
                  <span
                    className={
                      currentStep.conditionEval.result
                        ? 'text-emerald-400 font-bold'
                        : 'text-rose-400 font-bold'
                    }
                  >
                    {currentStep.conditionEval.result
                      ? 'Condition Met (Proceed)'
                      : 'Condition Failed (Exit / Skip)'}
                  </span>
                </div>
              </div>
            )}

            {/* Memory Variables State Grid */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-3.5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" /> Memory Cells
                </span>
                {currentStep?.iteration !== undefined && (
                  <span className="text-[11px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-800 font-mono font-semibold">
                    Iteration #{currentStep.iteration}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {currentStep?.variables &&
                  Object.entries(currentStep.variables).map(([varName, varVal]) => (
                    <div
                      key={varName}
                      className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center transition-all hover:border-slate-700 min-h-[70px]"
                    >
                      <span className="text-[11px] font-mono text-slate-400 font-medium mb-0.5">
                        {varName}
                      </span>
                      <span className="font-mono text-lg font-bold text-indigo-300 tracking-wider">
                        {String(varVal)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Program Output Terminal */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Console Output Stream
                </span>
                <span className="text-[10px] text-slate-500 font-mono">stdout</span>
              </div>
              <div className="bg-black/90 font-mono text-xs text-emerald-400 p-3 rounded-lg border border-slate-800 min-h-[64px] flex items-center overflow-x-auto">
                {accumulatedOutput ? (
                  <pre className="whitespace-pre-wrap">{accumulatedOutput}</pre>
                ) : (
                  <span className="text-slate-600 italic">No output emitted yet...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* TRACE TABLE: Responsive Cards (Mobile) / Table (Desktop) */
        /* ======================================================== */
        <div className="p-3 sm:p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <ListTree className="w-4 h-4 text-indigo-400" />
              <span>Execution State History ({steps.length} Total Steps)</span>
            </div>

            {/* Mobile View Switcher between Cards and Table */}
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setMobileTraceMode('cards')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mobileTraceMode === 'cards'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setMobileTraceMode('table')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mobileTraceMode === 'table'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Table
              </button>
            </div>
          </div>

          {/* Mode A: Card-based Timeline (Mobile Default - Zero Horizontal Blowout) */}
          {mobileTraceMode === 'cards' ? (
            <div className="space-y-2.5">
              <div className="text-[11px] text-slate-500 flex items-center justify-between pb-1">
                <span>Tap any card to jump visualizer to that step</span>
                <span className="font-mono text-indigo-400">Step {currentStepIndex + 1} active</span>
              </div>
              {steps.slice(0, currentStepIndex + 1).map((s, idx) => {
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Jump to step ${idx + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setCurrentStepIndex(idx);
                    }}
                    className={`p-3 rounded-xl border text-xs space-y-2 transition-all cursor-pointer active:scale-[0.99] touch-manipulation focus:outline-none ${
                      isCurrent
                        ? 'bg-indigo-950/50 border-indigo-500 shadow-md ring-2 ring-indigo-500/80'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 font-bold font-mono">
                        <span className={isCurrent ? 'text-indigo-200' : 'text-indigo-300'}>
                          Step #{idx + 1} • Line {s.line}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded bg-indigo-600 text-white text-[9px] uppercase font-bold tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      {s.conditionEval && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            s.conditionEval.result
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {s.conditionEval.result ? 'TRUE' : 'FALSE'}
                        </span>
                      )}
                    </div>

                    {/* Explanation */}
                    <p className="text-slate-300 font-sans text-xs leading-normal">
                      {s.explanation}
                    </p>

                    {/* Variable State Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1.5 border-t border-slate-900/80">
                      <span className="text-[10px] text-slate-500 font-mono">State:</span>
                      {Object.entries(s.variables).map(([k, v]) => (
                        <span
                          key={k}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300"
                        >
                          {k}={String(v)}
                        </span>
                      ))}
                      {s.output && (
                        <span className="ml-auto font-mono text-[11px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900">
                          &gt; {s.output}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Mode B: Full Standard Tabular View with internal scroll wrapper */
            <div className="space-y-2">
              <div className="text-[11px] text-slate-500 flex items-center justify-between pb-0.5">
                <span>Swipe table horizontally to inspect all columns</span>
                <span className="font-mono text-indigo-400">Step {currentStepIndex + 1} of {steps.length}</span>
              </div>
              <div className="overflow-x-auto max-w-full rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-300 border-b border-slate-800">
                      <th className="p-2.5 border-r border-slate-800 w-16">Step #</th>
                      <th className="p-2.5 border-r border-slate-800 w-20">Line</th>
                      <th className="p-2.5 border-r border-slate-800">Condition</th>
                      <th className="p-2.5 border-r border-slate-800">Variables State</th>
                      <th className="p-2.5">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {steps.slice(0, currentStepIndex + 1).map((s, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`border-b border-slate-800/60 cursor-pointer transition-colors ${
                          idx === currentStepIndex
                            ? 'bg-indigo-950/50 text-indigo-200 font-semibold'
                            : 'text-slate-400 hover:bg-slate-900/50'
                        }`}
                      >
                        <td className="p-2.5 border-r border-slate-800 text-indigo-400 font-bold">{idx + 1}</td>
                        <td className="p-2.5 border-r border-slate-800">Line {s.line}</td>
                        <td className="p-2.5 border-r border-slate-800">
                          {s.conditionEval
                            ? `${s.conditionEval.expression} = ${s.conditionEval.result ? 'TRUE' : 'FALSE'}`
                            : '-'}
                        </td>
                        <td className="p-2.5 border-r border-slate-800">
                          {Object.entries(s.variables)
                            .map(([k, v]) => `${k}=${v}`)
                            .join(', ')}
                        </td>
                        <td className="p-2.5 text-emerald-400 font-semibold">{s.output || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Touch-Friendly Playback Controls Bar */}
      <div className="bg-slate-950 px-3 sm:px-4 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Primary Stepper Buttons - Min 46px Touch Targets on Mobile */}
        <div className="grid grid-cols-4 gap-1.5 w-full sm:flex sm:w-auto items-center sm:gap-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-2 sm:px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold flex items-center justify-center gap-1 transition-colors min-h-[46px] active:scale-95"
          >
            Prev
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStepIndex >= steps.length - 1}
            className={`px-2 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow min-h-[46px] active:scale-95 ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 shrink-0" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 shrink-0" /> Run
              </>
            )}
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex >= steps.length - 1}
            className="px-2 sm:px-4 py-2.5 rounded-xl bg-indigo-950/80 border border-indigo-700/80 text-indigo-200 hover:bg-indigo-900 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold flex items-center justify-center gap-1 transition-colors min-h-[46px] active:scale-95"
          >
            Next <SkipForward className="w-3.5 h-3.5 shrink-0" />
          </button>

          <button
            onClick={handleReset}
            className="px-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs flex items-center justify-center gap-1 transition-colors min-h-[46px] active:scale-95"
            title="Reset to beginning"
            aria-label="Reset simulation"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Speed & Progress status */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-900">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-slate-900 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs border border-slate-700 focus:outline-none min-h-[40px]"
            >
              <option value={2000}>0.5x Slow</option>
              <option value={1200}>1.0x Normal</option>
              <option value={600}>2.0x Fast</option>
            </select>
          </div>

          <div className="font-mono text-xs text-slate-300">
            Step <span className="text-indigo-400 font-bold">{currentStepIndex + 1}</span> /{' '}
            <span>{steps.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
