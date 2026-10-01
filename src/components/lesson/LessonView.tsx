import React, { useState } from 'react';
import { Lesson, LessonStage } from '../../types/curriculum';
import { AlgorithmVisualizer } from '../algorithm-visualizer/AlgorithmVisualizer';
import { ExerciseEngine } from '../practice/ExerciseEngine';
import { EXERCISE_BANK } from '../../data/exercisesData';
import { markLessonStudied, loadMasteryRecords } from '../../services/masteryStorage';
import {
  Compass,
  FileSpreadsheet,
  HelpCircle,
  BookOpen,
  Dumbbell,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Users2,
  Sparkles,
  Award,
  Layers,
  Lightbulb,
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onOpenTeachTogether: (lesson: Lesson) => void;
  onAskTutor: (context: any) => void;
  onNextLesson?: () => void;
}

// Strict pedagogical progression:
// intuition -> concrete example -> student prediction -> formal concept -> worked example -> independent application
const STAGES: { id: LessonStage; label: string; number: number; icon: React.ElementType }[] = [
  { id: 'INTUITION', label: '1. Intuition', number: 1, icon: Compass },
  { id: 'CONCRETE_EXAMPLE', label: '2. Concrete Example', number: 2, icon: Layers },
  { id: 'PREDICTION', label: '3. Student Prediction', number: 3, icon: HelpCircle },
  { id: 'FORMAL_CONCEPT', label: '4. Formal Concept', number: 4, icon: BookOpen },
  { id: 'WORKED_EXAMPLE', label: '5. Worked Example', number: 5, icon: FileSpreadsheet },
  { id: 'INDEPENDENT_APPLICATION', label: '6. Independent Application', number: 6, icon: Dumbbell },
];

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onOpenTeachTogether,
  onAskTutor,
  onNextLesson,
}) => {
  const [activeStage, setActiveStage] = useState<LessonStage>('INTUITION');
  const [predictionAnswer, setPredictionAnswer] = useState<number | null>(null);
  const [predictionFeedback, setPredictionFeedback] = useState<string | null>(null);

  // Mobile-specific sub-view for Worked Example (Stage 5)
  const [stage5View, setStage5View] = useState<'pseudocode' | 'trace' | 'stacked'>('trace');
  const [stage5TraceMode, setStage5TraceMode] = useState<'cards' | 'table'>('cards');

  // Mark lesson as started/studied
  React.useEffect(() => {
    markLessonStudied(lesson.id);
  }, [lesson.id]);

  const masteryRecords = loadMasteryRecords();
  const currentRecord = masteryRecords[lesson.id];

  const currentStageIndex = STAGES.findIndex((s) => s.id === activeStage);

  const handleNextStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      setActiveStage(STAGES[currentStageIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      setActiveStage(STAGES[currentStageIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePredictionChoice = (optIdx: number) => {
    setPredictionAnswer(optIdx);
    const correct = optIdx === lesson.content.predictionChallenge.correctIndex;
    setPredictionFeedback(
      correct
        ? `Correct! ${lesson.content.predictionChallenge.explanation}`
        : `Look closely: ${lesson.content.predictionChallenge.explanation}`
    );
  };

  // Find linked exercises for this lesson
  const lessonExercises = EXERCISE_BANK.filter((ex) => lesson.exerciseIds.includes(ex.id));

  return (
    <div className="space-y-6">
      {/* Top Banner: Module & Lesson Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase tracking-wider">
              Module {lesson.number <= 2 ? '1' : lesson.number <= 4 ? '2' : lesson.number <= 6 ? '3' : '4'}
            </span>
            <span className="text-xs text-slate-400 font-mono">Lesson #{lesson.number}</span>
          </div>

          <button
            onClick={() => onOpenTeachTogether(lesson)}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-colors shadow"
          >
            <Users2 className="w-4 h-4 text-emerald-400" />
            <span>Teach Together (Co-Study Mode)</span>
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-1">{lesson.title}</h1>
        <p className="text-sm text-indigo-300 font-medium mb-4">{lesson.subtitle}</p>

        {/* Structured Learning Objectives */}
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-2">
            Learning Objectives (Evaluated Across Recall, Tracing, Application & Problem Solving):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {lesson.objectives.map((obj) => {
              const evidence = currentRecord?.objectiveEvidence?.[obj.id];
              const isMastered = evidence?.mastered;

              return (
                <div
                  key={obj.id}
                  className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                    isMastered
                      ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 uppercase ${
                        obj.category === 'RECALL'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : obj.category === 'TRACING'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : obj.category === 'APPLICATION'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {obj.category}
                    </span>
                    <span className="text-[11px] leading-tight">{obj.statement}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60 mt-1">
                    <span>Status:</span>
                    <span className={isMastered ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {isMastered ? '✓ Mastered' : 'In Progress'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6-Stage Pedagogical Stepper Nav */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-lg overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStage(stage.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all min-h-[44px] shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Content Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6">
        {/* STAGE 1: INTUITION */}
        {activeStage === 'INTUITION' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Stage 1: Everyday Mental Model & Intuition (No Jargon)</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100">Why Does This Concept Exist?</h3>

            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
              {lesson.content.intuitionWhy}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-slate-200 block mb-1">Notice:</strong>
                We haven\'t used any compiler words or code syntax yet! We first understand the fundamental physical or logical necessity before naming it.
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: CONCRETE EXAMPLE */}
        {activeStage === 'CONCRETE_EXAMPLE' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Stage 2: Tangible Scenario with Concrete Numbers</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100">
              Scenario: {lesson.content.concreteExample.scenario}
            </h3>

            <div className="space-y-2">
              {lesson.content.concreteExample.walkthrough.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center justify-center font-mono text-[11px] shrink-0 font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-300 mb-0.5">Key Observation:</strong>
                {lesson.content.concreteExample.keyObservation}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: STUDENT PREDICTION */}
        {activeStage === 'PREDICTION' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Stage 3: Test Your Mental Model (Active Prediction)</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100">Predict the Outcome Before Learning the Rules</h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
              {lesson.content.predictionChallenge.code.map((line, i) => (
                <div key={i} className="py-0.5">
                  <span className="text-slate-600 mr-3 select-none">{i + 1}</span>
                  {line}
                </div>
              ))}
            </div>

            <p className="text-sm font-semibold text-slate-200">{lesson.content.predictionChallenge.prompt}</p>

            <div className="space-y-2">
              {lesson.content.predictionChallenge.options.map((option, idx) => {
                const isSelected = predictionAnswer === idx;
                const isCorrect = idx === lesson.content.predictionChallenge.correctIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => handlePredictionChoice(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono mr-2 font-bold text-indigo-400">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {predictionFeedback && (
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-800/80 text-xs sm:text-sm text-indigo-200 leading-relaxed">
                {predictionFeedback}
              </div>
            )}
          </div>
        )}

        {/* STAGE 4: FORMAL CONCEPT */}
        {activeStage === 'FORMAL_CONCEPT' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Stage 4: Formal Algorithmic Terminology & Rules</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100">Now, We Give It Formal Names</h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed">
              {lesson.content.conceptSummary}
            </div>

            {/* Terminology Grid */}
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-3">
                Key Technical Terminology:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.content.keyTerminology.map((term, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-indigo-300 font-mono block">{term.term}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{term.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Traps */}
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-3">
                Common Misconceptions & Mental Traps:
              </span>
              <div className="space-y-2">
                {lesson.content.commonMistakes.map((m, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs space-y-1">
                    <div className="font-bold text-rose-300">⚠️ Mistake: {m.mistake}</div>
                    <div className="text-slate-400"><strong className="text-slate-300">Why it fails:</strong> {m.whyWrong}</div>
                    <div className="text-emerald-400"><strong className="text-emerald-300">Correction:</strong> {m.correction}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Visualizer Integration */}
            {lesson.content.algorithmPresetId && (
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider block">
                  Interactive Execution Simulator:
                </span>
                <AlgorithmVisualizer
                  initialPresetId={lesson.content.algorithmPresetId}
                  onAskTutor={onAskTutor}
                />
              </div>
            )}
          </div>
        )}

        {/* STAGE 5: WORKED EXAMPLE */}
        {activeStage === 'WORKED_EXAMPLE' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Stage 5: Worked Example with State Trace Table</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100">
              Problem: {lesson.content.guidedExample.problemStatement}
            </h3>

            {/* Thought Process */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                Engineering Thought Process:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {lesson.content.guidedExample.thoughtProcess.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-mono font-bold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile View Switcher for Worked Example on < lg screens */}
            <div className="lg:hidden bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Worked View:
              </span>
              <div className="grid grid-cols-3 gap-1 flex-1 max-w-sm">
                <button
                  onClick={() => setStage5View('pseudocode')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center transition-colors min-h-[38px] ${
                    stage5View === 'pseudocode'
                      ? 'bg-indigo-600 text-white shadow font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setStage5View('trace')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center transition-colors min-h-[38px] ${
                    stage5View === 'trace'
                      ? 'bg-indigo-600 text-white shadow font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  Trace Steps
                </button>
                <button
                  onClick={() => setStage5View('stacked')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center transition-colors min-h-[38px] ${
                    stage5View === 'stacked'
                      ? 'bg-indigo-600 text-white shadow font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  Stacked
                </button>
              </div>
            </div>

            {/* Pseudocode & Tracing Grid: Side-by-side on lg, Adaptive on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Pseudocode Column */}
              <div
                className={`lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1 ${
                  stage5View === 'pseudocode' || stage5View === 'stacked' ? 'block' : 'hidden lg:block'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                  <span className="text-slate-400 text-[11px] uppercase font-bold tracking-wider">Pseudocode:</span>
                  <span className="text-[10px] text-indigo-400 font-mono">{lesson.content.guidedExample.pseudocode.length} Lines</span>
                </div>
                <div className="space-y-0.5 overflow-x-auto max-w-full">
                  {lesson.content.guidedExample.pseudocode.map((line, i) => (
                    <div key={i} className="py-0.5 flex items-start">
                      <span className="text-slate-600 mr-2.5 select-none w-5 text-right shrink-0">{i + 1}</span>
                      <span className="whitespace-pre">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Trace Table Column with Cards vs Table mobile alternative */}
              <div
                className={`lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 ${
                  stage5View === 'trace' || stage5View === 'stacked' ? 'block' : 'hidden lg:block'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                  <span className="text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                    Step-by-Step State Trace ({lesson.content.guidedExample.tracingTable.length} Steps):
                  </span>
                  
                  {/* Mode switcher: Cards vs Table */}
                  <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setStage5TraceMode('cards')}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                        stage5TraceMode === 'cards'
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Cards
                    </button>
                    <button
                      onClick={() => setStage5TraceMode('table')}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                        stage5TraceMode === 'table'
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Table
                    </button>
                  </div>
                </div>

                {stage5TraceMode === 'cards' ? (
                  /* Mobile-First Trace Step Cards */
                  <div className="space-y-2">
                    {lesson.content.guidedExample.tracingTable.map((row) => (
                      <div
                        key={row.step}
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-300 font-mono text-[11px]">
                            Step #{row.step} • Line {row.line}
                          </span>
                          {row.output && (
                            <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                              stdout: {row.output}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800/80 font-mono text-[11px]">
                          <span className="text-slate-500 text-[10px]">Variables:</span>
                          <span className="text-amber-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {row.vars}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard Tabular View with internal horizontal scroll container */
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 block">Swipe table horizontally to inspect all columns:</span>
                    <div className="overflow-x-auto max-w-full rounded-lg border border-slate-800">
                      <table className="w-full text-left text-xs font-mono min-w-[360px]">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 text-[11px] bg-slate-900/60">
                            <th className="p-2 border-r border-slate-800">Step</th>
                            <th className="p-2 border-r border-slate-800">Line</th>
                            <th className="p-2 border-r border-slate-800">Variables State</th>
                            <th className="p-2">Output</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-slate-300 text-[11px]">
                          {lesson.content.guidedExample.tracingTable.map((row) => (
                            <tr key={row.step} className="hover:bg-slate-900/50">
                              <td className="p-2 text-indigo-400 font-bold border-r border-slate-800">{row.step}</td>
                              <td className="p-2 text-slate-400 border-r border-slate-800">{row.line}</td>
                              <td className="p-2 font-bold text-amber-300 border-r border-slate-800">{row.vars}</td>
                              <td className="p-2 text-emerald-400">{row.output || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 6: INDEPENDENT APPLICATION */}
        {activeStage === 'INDEPENDENT_APPLICATION' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Dumbbell className="w-4 h-4" />
              <span>Stage 6: Independent Practice & Objective Mastery Evidence</span>
            </div>

            <p className="text-xs text-slate-400">
              Solve these curated exercises across Recall, Tracing, Application, and Problem Solving. Recognition alone does not establish mastery: demonstrate evidence across multiple cognitive categories.
            </p>

            {lessonExercises.length > 0 ? (
              <ExerciseEngine
                exercises={lessonExercises}
                lessonId={lesson.id}
                onAskTutor={onAskTutor}
              />
            ) : (
              <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-400 text-xs">
                No exercises found for this lesson.
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Between Stages - Touch Friendly */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 gap-2">
          <button
            onClick={handlePrevStage}
            disabled={currentStageIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors min-h-[46px] active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Prev Stage
          </button>

          <span className="text-xs font-mono text-slate-500 text-center truncate px-1">
            {currentStageIndex + 1} / {STAGES.length}
          </span>

          {currentStageIndex < STAGES.length - 1 ? (
            <button
              onClick={handleNextStage}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md min-h-[46px] active:scale-95"
            >
              Next Stage <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            onNextLesson && (
              <button
                onClick={onNextLesson}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md min-h-[46px] active:scale-95"
              >
                Next Lesson <Award className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
