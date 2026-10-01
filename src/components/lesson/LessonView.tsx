import React, { useState } from 'react';
import { Lesson, LessonStage } from '../../types/curriculum';
import { AlgorithmVisualizer } from '../algorithm-visualizer/AlgorithmVisualizer';
import { ExerciseEngine } from '../practice/ExerciseEngine';
import { EXERCISE_BANK } from '../../data/exercisesData';
import { markLessonStudied } from '../../services/masteryStorage';
import {
  BookOpen,
  Compass,
  MonitorPlay,
  FileSpreadsheet,
  HelpCircle,
  Dumbbell,
  CheckCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  Users2,
  Sparkles,
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onOpenTeachTogether: (lesson: Lesson) => void;
  onAskTutor: (context: any) => void;
  onNextLesson?: () => void;
}

const STAGES: { id: LessonStage; label: string; icon: React.ElementType }[] = [
  { id: 'CONCEPT', label: '1. Concept', icon: BookOpen },
  { id: 'INTUITION', label: '2. Intuition', icon: Compass },
  { id: 'DEMONSTRATION', label: '3. Demo', icon: MonitorPlay },
  { id: 'GUIDED_EXAMPLE', label: '4. Guided Trace', icon: FileSpreadsheet },
  { id: 'PREDICTION', label: '5. Predict', icon: HelpCircle },
  { id: 'PRACTICE', label: '6. Practice', icon: Dumbbell },
  { id: 'MASTERY_CHECK', label: '7. Mastery Check', icon: Flag },
];

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onOpenTeachTogether,
  onAskTutor,
  onNextLesson,
}) => {
  const [activeStage, setActiveStage] = useState<LessonStage>('CONCEPT');
  const [predictionAnswer, setPredictionAnswer] = useState<number | null>(null);
  const [predictionFeedback, setPredictionFeedback] = useState<string | null>(null);

  // Mark lesson as started/studied
  React.useEffect(() => {
    markLessonStudied(lesson.id);
  }, [lesson.id]);

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
            <span>Teach Together (Parent Mode)</span>
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-1">{lesson.title}</h1>
        <p className="text-sm text-indigo-300 font-medium mb-4">{lesson.subtitle}</p>

        {/* Learning Objectives Pills */}
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-2">
            Learning Objectives (GIU CS1 Specification):
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {lesson.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 7-Stage Pedagogical Stepper */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 overflow-x-auto">
        <div className="flex items-center min-w-max gap-1">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const isActive = s.id === activeStage;
            const isCompleted = idx < currentStageIndex;

            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : isCompleted
                    ? 'bg-slate-800 text-indigo-300 hover:bg-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Content Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-[420px]">
        {/* STAGE 1: CONCEPT */}
        {activeStage === 'CONCEPT' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" /> Formal Concept
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {lesson.content.conceptSummary}
              </p>
            </div>

            {/* Key Terminology Grid */}
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                Key Technical Terminology (University Standard)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.content.keyTerminology.map((term, i) => (
                  <div key={i} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="font-mono text-xs font-bold text-indigo-300 block mb-1">
                      {term.term}
                    </span>
                    <span className="text-xs text-slate-400 leading-normal">{term.definition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions Warning */}
            {lesson.content.commonMistakes && lesson.content.commonMistakes.length > 0 && (
              <div className="bg-rose-950/30 border border-rose-900/60 rounded-xl p-4">
                <h4 className="text-xs uppercase font-bold text-rose-300 tracking-wider mb-2">
                  Classic Student Pitfall:
                </h4>
                {lesson.content.commonMistakes.map((m, idx) => (
                  <div key={idx} className="text-xs text-slate-300 space-y-1">
                    <p><strong className="text-rose-400">Mistake:</strong> {m.mistake}</p>
                    <p><strong className="text-slate-400">Why it's wrong:</strong> {m.whyWrong}</p>
                    <p><strong className="text-emerald-400">Engineering Correction:</strong> {m.correction}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STAGE 2: INTUITION */}
        {activeStage === 'INTUITION' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" /> Physical & Mental Intuition
            </h3>
            <div className="bg-indigo-950/30 border border-indigo-900/60 rounded-xl p-5 text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{lesson.content.intuitionWhy}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Demonstration Pointer:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lesson.content.demonstrationNotes}
              </p>
            </div>
          </div>
        )}

        {/* STAGE 3: INTERACTIVE DEMONSTRATION */}
        {activeStage === 'DEMONSTRATION' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
                <MonitorPlay className="w-5 h-5 text-indigo-400" /> Interactive Execution Engine
              </h3>
              <p className="text-xs text-slate-400">
                Execute instructions one by one. Watch the blue highlight advance and see variables update in memory.
              </p>
            </div>

            <AlgorithmVisualizer
              initialPresetId={lesson.content.algorithmPresetId || 'sum-1-to-n'}
              standalone={false}
            />
          </div>
        )}

        {/* STAGE 4: GUIDED EXAMPLE */}
        {activeStage === 'GUIDED_EXAMPLE' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-400" /> Worked University Problem & Dry Run
              </h3>
              <p className="text-xs text-slate-400">
                Problem: <strong className="text-indigo-300">{lesson.content.guidedExample.problemStatement}</strong>
              </p>
            </div>

            {/* Engineer's Thought Process */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Engineering Thought Process:
              </h4>
              <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside">
                {lesson.content.guidedExample.thoughtProcess.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Pseudocode & Tracing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Formulated Pseudocode
                </span>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-indigo-200 space-y-1">
                  {lesson.content.guidedExample.pseudocode.map((line, idx) => (
                    <div key={idx} className="px-2 py-0.5">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Step-by-Step Trace Table
                </span>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-x-auto text-xs font-mono">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-1.5 pr-2">Step</th>
                        <th className="pb-1.5 pr-2">Instruction</th>
                        <th className="pb-1.5 pr-2">State</th>
                        <th className="pb-1.5">Output</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-slate-300">
                      {lesson.content.guidedExample.tracingTable.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 pr-2 text-indigo-400">{row.step}</td>
                          <td className="py-1.5 pr-2">{row.line}</td>
                          <td className="py-1.5 pr-2 text-emerald-300">{row.vars}</td>
                          <td className="py-1.5 text-slate-400">{row.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: STUDENT PREDICTION */}
        {activeStage === 'PREDICTION' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" /> Active Prediction Check
              </h3>
              <p className="text-xs text-slate-400">
                Predict the state before running it. Prediction forces your brain to build a real mental simulation model.
              </p>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-200">
              {lesson.content.predictionChallenge.code.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>

            <p className="text-sm font-semibold text-slate-200">
              {lesson.content.predictionChallenge.prompt}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.content.predictionChallenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePredictionChoice(idx)}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all ${
                    predictionAnswer === idx
                      ? idx === lesson.content.predictionChallenge.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono mr-2 font-bold text-indigo-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            {predictionFeedback && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                  predictionAnswer === lesson.content.predictionChallenge.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-800 text-amber-200'
                }`}
              >
                {predictionFeedback}
              </div>
            )}
          </div>
        )}

        {/* STAGE 6: PRACTICE */}
        {activeStage === 'PRACTICE' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-indigo-400" /> Targeted Practice Exercises
              </h3>
              <p className="text-xs text-slate-400">
                Apply your understanding. Exercises diagnose common misunderstandings with tiered hints.
              </p>
            </div>

            {lessonExercises.length > 0 ? (
              <div className="space-y-6">
                {lessonExercises.map((ex) => (
                  <ExerciseEngine
                    key={ex.id}
                    exercise={ex}
                    onAskTutor={onAskTutor}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 text-xs">
                No exercises registered for this lesson yet.
              </div>
            )}
          </div>
        )}

        {/* STAGE 7: MASTERY CHECK */}
        {activeStage === 'MASTERY_CHECK' && (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-1">Lesson Verification Complete</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Evidence from your predictions and exercise attempts has been recorded in your GIU Mastery Model.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => onOpenTeachTogether(lesson)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Users2 className="w-4 h-4 text-emerald-400" /> Review with Parent (Teach Together)
              </button>

              {onNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg"
                >
                  Continue to Next Lesson <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stage Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrevStage}
          disabled={currentStageIndex === 0}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Stage
        </button>

        <button
          onClick={handleNextStage}
          disabled={currentStageIndex === STAGES.length - 1}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
        >
          Next Stage <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
