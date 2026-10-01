import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, HelpCircle, CheckCircle2, XCircle, Code, ListTree, Sliders, ArrowRight } from 'lucide-react';
import { ALGORITHM_PRESETS } from '../../data/algorithmsData';
import { TraceableAlgorithm, CodeTraceStep } from '../../types/curriculum';

interface AlgorithmVisualizerProps {
  initialPresetId?: string;
  onPredictionAnswered?: (isCorrect: boolean) => void;
  standalone?: boolean;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  initialPresetId = 'sum-1-to-n',
  onPredictionAnswered,
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
  const [activeTab, setActiveTab] = useState<'visual' | 'traceTable' | 'cCode'>('visual');

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
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header & Presets Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-sm tracking-wide text-slate-200">Algorithm Visualizer</span>
          <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
            GIU CS1 Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
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
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
          >
            {ALGORITHM_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          {/* Sub-tabs */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'visual' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visual Run
            </button>
            <button
              onClick={() => setActiveTab('traceTable')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'traceTable' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trace Table
            </button>
          </div>
        </div>
      </div>

      {/* Inputs Configuration Bar */}
      {currentAlgorithm.supportedInputs && currentAlgorithm.supportedInputs.length > 0 && (
        <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800 flex items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1 font-semibold text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Inputs:
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            {currentAlgorithm.supportedInputs.map((param) => (
              <label key={param.name} className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded border border-slate-700">
                <span className="font-mono text-indigo-300 font-semibold">{param.name} =</span>
                <input
                  type="number"
                  min={param.min}
                  max={param.max}
                  value={inputs[param.name] ?? param.defaultVal}
                  onChange={(e) => handleInputChange(param.name, parseInt(e.target.value) || param.defaultVal)}
                  className="w-12 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-slate-100 font-mono text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Modify inputs to observe how the algorithm adapts.</span>
        </div>
      )}

      {/* Main Execution Arena */}
      {activeTab === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 flex-1">
          {/* Left Column: Pseudocode with Line Highlight */}
          <div className="lg:col-span-6 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-indigo-400" /> Pseudocode
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Line {currentStep?.line ?? 1} of {currentAlgorithm.codeLines.length}
                </span>
              </div>

              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-xs sm:text-sm space-y-1 overflow-x-auto">
                {currentAlgorithm.codeLines.map((lineText, idx) => {
                  const lineNumber = idx + 1;
                  const isCurrentLine = currentStep?.line === lineNumber;
                  return (
                    <div
                      key={idx}
                      className={`flex items-start px-2 py-1 rounded transition-all duration-200 ${
                        isCurrentLine
                          ? 'bg-indigo-950/80 text-indigo-100 border-l-4 border-indigo-500 font-semibold shadow-inner'
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
            <div className="mt-4 bg-indigo-950/30 border border-indigo-900/60 rounded-lg p-3 text-xs">
              <div className="text-indigo-300 font-semibold mb-1 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" /> What is happening at this step:
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">{currentStep?.explanation}</p>
            </div>
          </div>

          {/* Right Column: State, Condition Breakdown, Output */}
          <div className="lg:col-span-6 p-4 flex flex-col justify-between space-y-4">
            {/* Condition Evaluation (if applicable) */}
            {currentStep?.conditionEval && (
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Branch Condition Evaluation</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      currentStep.conditionEval.result
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {currentStep.conditionEval.result ? 'TRUE' : 'FALSE'}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded">
                  <span className="text-indigo-300 font-semibold">{currentStep.conditionEval.expression}</span>
                  <span className="text-slate-500">→</span>
                  <span className={currentStep.conditionEval.result ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {currentStep.conditionEval.result ? 'Condition Met (Enter Body)' : 'Condition Failed (Exit / Skip)'}
                  </span>
                </div>
              </div>
            )}

            {/* Interactive Student Prediction Prompt */}
            {currentStep?.predictionPrompt && (
              <div className="bg-amber-950/40 border border-amber-800/80 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1.5">
                  <HelpCircle className="w-4 h-4" /> Student Prediction Check
                </div>
                <p className="text-xs text-slate-200 mb-2 font-medium">{currentStep.predictionPrompt.question}</p>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {currentStep.predictionPrompt.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handlePredictionChoice(optIdx)}
                      className={`text-xs px-2.5 py-1.5 rounded font-mono border transition-all text-left ${
                        predictionAnswer === optIdx
                          ? optIdx === currentStep.predictionPrompt?.correctIndex
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-rose-900/60 border-rose-500 text-rose-200'
                          : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:border-amber-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {predictionFeedback && (
                  <div className="text-xs text-amber-200 bg-amber-950/60 p-2 rounded border border-amber-900 flex items-start gap-1.5">
                    {predictionAnswer === currentStep.predictionPrompt.correctIndex ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <span>{predictionFeedback}</span>
                  </div>
                )}
              </div>
            )}

            {/* Memory Variables State Grid */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Memory Variables</span>
                {currentStep?.iteration !== undefined && (
                  <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800 font-mono">
                    Iteration: #{currentStep.iteration}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {currentStep?.variables &&
                  Object.entries(currentStep.variables).map(([varName, varVal]) => (
                    <div
                      key={varName}
                      className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 flex flex-col items-center justify-center transition-all hover:border-slate-700"
                    >
                      <span className="text-[11px] font-mono text-slate-400">{varName}</span>
                      <span className="font-mono text-base font-bold text-indigo-300 tracking-wider">
                        {String(varVal)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Output Stream Terminal */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Program Output
              </span>
              <div className="bg-black/80 font-mono text-xs text-emerald-400 p-2 rounded border border-slate-800 min-h-12 flex items-center">
                {accumulatedOutput ? (
                  <span className="whitespace-pre-wrap">{accumulatedOutput}</span>
                ) : (
                  <span className="text-slate-600 italic">No output printed yet...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Trace Table Tab */
        <div className="p-4 overflow-x-auto">
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
            <ListTree className="w-3.5 h-3.5 text-indigo-400" /> Complete Trace Table (Historical Dry Run)
          </div>
          <table className="w-full text-left text-xs font-mono border-collapse border border-slate-800">
            <thead>
              <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                <th className="p-2 border-r border-slate-800">Step #</th>
                <th className="p-2 border-r border-slate-800">Line</th>
                <th className="p-2 border-r border-slate-800">Condition</th>
                <th className="p-2 border-r border-slate-800">Variables State</th>
                <th className="p-2">Output</th>
              </tr>
            </thead>
            <tbody>
              {steps.slice(0, currentStepIndex + 1).map((s, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-slate-800/60 ${
                    idx === currentStepIndex ? 'bg-indigo-950/40 text-indigo-200 font-semibold' : 'text-slate-400'
                  }`}
                >
                  <td className="p-2 border-r border-slate-800">{idx + 1}</td>
                  <td className="p-2 border-r border-slate-800">Line {s.line}</td>
                  <td className="p-2 border-r border-slate-800">
                    {s.conditionEval ? `${s.conditionEval.expression} = ${s.conditionEval.result}` : '-'}
                  </td>
                  <td className="p-2 border-r border-slate-800">
                    {Object.entries(s.variables)
                      .map(([k, v]) => `${k}=${v}`)
                      .join(', ')}
                  </td>
                  <td className="p-2 text-emerald-400">{s.output || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Control Bar: Previous, Play/Pause, Next, Reset, Speed */}
      <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            Previous Step
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStepIndex >= steps.length - 1}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Run
              </>
            )}
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex >= steps.length - 1}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            Next Step <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 transition-colors"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Speed & Progress status */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-slate-800 text-slate-200 rounded px-2 py-1 text-xs border border-slate-700 focus:outline-none"
            >
              <option value={2000}>0.5x (Slow Trace)</option>
              <option value={1200}>1x (Normal)</option>
              <option value={600}>2x (Fast)</option>
            </select>
          </div>

          <div className="font-mono text-slate-400">
            Step <span className="text-indigo-400 font-bold">{currentStepIndex + 1}</span> of{' '}
            <span>{steps.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
