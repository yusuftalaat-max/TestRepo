import React, { useState } from 'react';
import { PROBLEM_LAB_ITEMS } from '../../data/problemsData';
import { ProblemLabItem, ProblemLabStep } from '../../types/curriculum';
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCode,
  Gauge,
  HelpCircle,
  Binary,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ProblemLabProps {
  onAskTutor: (context: any) => void;
}

export const ProblemLab: React.FC<ProblemLabProps> = ({ onAskTutor }) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(PROBLEM_LAB_ITEMS[0].id);
  const currentProblem: ProblemLabItem =
    PROBLEM_LAB_ITEMS.find((p) => p.id === selectedProblemId) || PROBLEM_LAB_ITEMS[0];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepAnswers, setStepAnswers] = useState<Record<number, number>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<number, { isCorrect: boolean; message: string }>>({});
  const [viewCodeFormat, setViewCodeFormat] = useState<'pseudocode' | 'c'>('pseudocode');

  const currentStep: ProblemLabStep | undefined = currentProblem.steps[currentStepIndex];

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
    <div className="space-y-6">
      {/* Header & Problem Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              10-Stage Engineering Problem Lab
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">{currentProblem.title}</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">{currentProblem.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedProblemId}
            onChange={(e) => {
              setSelectedProblemId(e.target.value);
              handleResetProblem();
            }}
            className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {PROBLEM_LAB_ITEMS.map((prob) => (
              <option key={prob.id} value={prob.id}>
                {prob.title} ({prob.difficulty})
              </option>
            ))}
          </select>

          <button
            onClick={handleResetProblem}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 text-xs border border-slate-700 transition-colors"
            title="Restart problem"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Step Progression */}
        <div className="lg:col-span-7 space-y-4">
          {/* Stepper Tabs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 overflow-x-auto">
            <div className="flex items-center gap-1 min-w-max">
              {currentProblem.steps.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isAnswered = stepAnswers[idx] !== undefined;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow'
                        : isAnswered
                        ? 'bg-slate-800 text-indigo-300'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    <span className="hidden sm:inline text-[11px] truncate max-w-24">
                      {step.title.split(':')[1]?.trim() || step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Card */}
          {currentStep && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 min-h-[360px] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {currentStep.title}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Step {currentStepIndex + 1} of {currentProblem.steps.length}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-300">{currentStep.instruction}</p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {currentStep.content}
                </div>

                {/* Step Action Component */}
                {currentStep.studentActionType === 'INPUT_SELECT' && currentStep.actionData && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold text-slate-300">
                      {currentStep.actionData.question}
                    </p>
                    <div className="space-y-2">
                      {currentStep.actionData.options.map((opt: string, optIdx: number) => {
                        const isChosen = stepAnswers[currentStepIndex] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(optIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                              isChosen
                                ? optIdx === currentStep.actionData.correctIndex
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                                  : 'bg-rose-950/60 border-rose-500 text-rose-200'
                                : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className="font-mono mr-2 font-bold text-indigo-400">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step Feedback */}
                {stepFeedback[currentStepIndex] && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                      stepFeedback[currentStepIndex].isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                        : 'bg-amber-950/40 border-amber-800 text-amber-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{stepFeedback[currentStepIndex].message}</span>
                  </div>
                )}
              </div>

              {/* Navigation within steps */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex >= currentProblem.steps.length - 1}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Code & Mathematical Model Artifacts */}
        <div className="lg:col-span-5 space-y-4">
          {/* Format Switcher */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-2 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-indigo-400" /> Implementation Artifact
            </span>
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setViewCodeFormat('pseudocode')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewCodeFormat === 'pseudocode'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pseudocode
              </button>
              <button
                onClick={() => setViewCodeFormat('c')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewCodeFormat === 'c'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                C Translation
              </button>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-indigo-200 overflow-x-auto shadow-xl max-h-[380px] overflow-y-auto">
            {viewCodeFormat === 'pseudocode' ? (
              <div className="space-y-1">
                {currentProblem.pseudocode.map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-6 text-slate-600 select-none mr-2">{idx + 1}</span>
                    <pre className="font-mono whitespace-pre text-slate-200">{line}</pre>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="font-mono text-emerald-300 whitespace-pre">{currentProblem.cTranslation}</pre>
            )}
          </div>

          {/* Complexity & Efficiency Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-indigo-400" /> Algorithmic Complexity
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase block">Time Complexity</span>
                <span className="text-sm font-mono font-bold text-indigo-300">
                  {currentProblem.complexity.time}
                </span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase block">Space Complexity</span>
                <span className="text-sm font-mono font-bold text-emerald-300">
                  {currentProblem.complexity.space}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {currentProblem.complexity.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
