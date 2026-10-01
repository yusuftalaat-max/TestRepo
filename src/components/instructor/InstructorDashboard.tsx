import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../../data/curriculumData';
import { EXERCISE_BANK } from '../../data/exercisesData';
import { loadMasteryRecords, getStudentDiagnostics, resetAllMasteryData } from '../../services/masteryStorage';
import { Lesson, StudentMasteryRecord, Exercise } from '../../types/curriculum';
import {
  Users2,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  Layers,
  Dumbbell,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  Activity,
} from 'lucide-react';

interface InstructorDashboardProps {
  onOpenLesson: (lesson: Lesson) => void;
  selectedTeachLesson?: Lesson | null;
  onCloseTeachTogether?: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  onOpenLesson,
  selectedTeachLesson,
  onCloseTeachTogether,
}) => {
  const [activeTab, setActiveTab] = useState<'INSPECTOR' | 'STUDENT_DIAGNOSTICS' | 'TEACH_TOGETHER'>(
    selectedTeachLesson ? 'TEACH_TOGETHER' : 'INSPECTOR'
  );

  const allLessons: Lesson[] = CURRICULUM_MODULES.flatMap((m) => m.lessons);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(allLessons[0].id);

  const inspectorLesson = allLessons.find((l) => l.id === selectedLessonId) || allLessons[0];
  const inspectorExercises: Exercise[] = EXERCISE_BANK.filter((e) =>
    inspectorLesson.exerciseIds.includes(e.id)
  );

  const masteryRecords: Record<string, StudentMasteryRecord> = loadMasteryRecords();
  const diagnostics = getStudentDiagnostics();

  const handleResetData = () => {
    if (window.confirm('Reset all student progress and mastery records to clean initial state?')) {
      resetAllMasteryData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Instructor & Parent Educational Control Center
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
            Pedagogical Curriculum & Diagnostics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            German International University (GIU) • Part I: Algorithms, Flow of Control, Conditions & Loops
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('INSPECTOR')}
            className={`px-3 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[42px] flex-1 sm:flex-initial ${
              activeTab === 'INSPECTOR'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Inspector
          </button>

          <button
            onClick={() => setActiveTab('STUDENT_DIAGNOSTICS')}
            className={`px-3 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[42px] flex-1 sm:flex-initial ${
              activeTab === 'STUDENT_DIAGNOSTICS'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Diagnostics
          </button>

          <button
            onClick={() => setActiveTab('TEACH_TOGETHER')}
            className={`px-3 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[42px] flex-1 sm:flex-initial ${
              activeTab === 'TEACH_TOGETHER'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users2 className="w-3.5 h-3.5" /> Coaching
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: INSTRUCTOR CONTENT INSPECTOR                      */}
      {/* ======================================================== */}
      {activeTab === 'INSPECTOR' && (
        <div className="space-y-6">
          {/* Lesson Selector Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Select Lesson:
            </span>

            <div className="flex items-center gap-2 overflow-x-auto max-w-full no-scrollbar">
              {allLessons.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLessonId(l.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[40px] flex items-center shrink-0 ${
                    selectedLessonId === l.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  Lesson {l.number}: {l.title.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Full Pedagogical Chain Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <span className="text-[11px] font-bold text-indigo-400 uppercase font-mono">
                  Module {inspectorLesson.number <= 2 ? '1' : inspectorLesson.number <= 4 ? '2' : inspectorLesson.number <= 6 ? '3' : '4'} • Lesson #{inspectorLesson.number}
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">{inspectorLesson.title}</h3>
                <p className="text-xs text-indigo-300">{inspectorLesson.subtitle}</p>
              </div>

              <button
                onClick={() => onOpenLesson(inspectorLesson)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
              >
                <BookOpen className="w-3.5 h-3.5" /> View Lesson
              </button>
            </div>

            {/* Stage 1: Learning Objectives */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>1. Learning Objectives (Divided by Cognitive Category)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {inspectorLesson.objectives.map((obj) => (
                  <div key={obj.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-500">{obj.id}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono uppercase ${
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
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{obj.statement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 2: Formal Concepts & Key Terminology */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>2. Formal Concepts & Key Terminology</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {inspectorLesson.content.conceptSummary}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {inspectorLesson.content.keyTerminology.map((term, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-indigo-300 font-mono block">{term.term}</span>
                    <p className="text-[11px] text-slate-400 leading-normal">{term.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 3: Curated Exercises */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  <Dumbbell className="w-4 h-4 text-indigo-400" />
                  <span>3. Curated Exercises ({inspectorExercises.length} Total)</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Must establish evidence across Recall, Tracing, Application & Problem Solving
                </span>
              </div>

              <div className="space-y-3">
                {inspectorExercises.map((ex) => (
                  <div key={ex.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold">{ex.id}</span>
                        <span className="font-bold text-slate-200">{ex.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {ex.cognitiveLevel && (
                          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono font-bold uppercase">
                            {ex.cognitiveLevel}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-mono">
                          {ex.difficulty}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 font-sans">{ex.question}</p>

                    {ex.codeSnippet && (
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-indigo-300">
                        {ex.codeSnippet}
                      </div>
                    )}

                    <div className="text-[11px] text-emerald-400 pt-1">
                      <strong>Correct Answer:</strong>{' '}
                      {ex.options && typeof ex.correctAnswer === 'number'
                        ? `${String.fromCharCode(65 + ex.correctAnswer)} (${ex.options[ex.correctAnswer]})`
                        : ex.correctAnswer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 4: Common Misconceptions & Traps */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>4. Targeted Misconceptions & Remedial Guidance</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {inspectorLesson.content.commonMistakes.map((m, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs space-y-1.5">
                    <span className="font-bold text-rose-300 block">⚠️ {m.mistake}</span>
                    <p className="text-slate-400"><strong className="text-slate-300">Why it happens:</strong> {m.whyWrong}</p>
                    <p className="text-emerald-300"><strong className="text-emerald-400">Pedagogical remedy:</strong> {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 5: Objective Mastery Evidence Rules */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>5. Objective Mastery Evidence Standard (Strict Verification)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                In this educational environment, correct answers to recognition or multiple-choice recall questions alone do <strong>NOT</strong> establish mastery. A student achieves mastery on a learning objective only when they provide validated evidence across at least two distinct cognitive tiers (including Tracing, Application, or Problem Solving) with $\ge 75\%$ accuracy and low hint usage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: STUDENT PROGRESS & REAL DIAGNOSTICS               */}
      {/* ======================================================== */}
      {activeTab === 'STUDENT_DIAGNOSTICS' && (
        <div className="space-y-6">
          {/* Real Metrics Header */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Attempts</span>
              <span className="text-2xl font-extrabold text-slate-100 font-mono mt-1 block">
                {diagnostics.totalAttempts}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {diagnostics.hasRecordedData ? `${diagnostics.successfulAttempts} correct` : 'No attempts yet'}
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Recorded Accuracy</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono mt-1 block">
                {diagnostics.hasRecordedData ? `${diagnostics.overallAccuracyPct}%` : 'N/A'}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">Supported by actual behavior</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Objectives Mastered</span>
              <span className="text-2xl font-extrabold text-indigo-400 font-mono mt-1 block">
                {diagnostics.masteredObjectivesCount}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Across {diagnostics.totalTrackedObjectivesCount} attempted objectives
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Hints Requested</span>
              <span className="text-2xl font-extrabold text-amber-400 font-mono mt-1 block">
                {diagnostics.totalHintsUsed}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">Assistance tier requests</span>
            </div>
          </div>

          {/* Student Status Card: Only Real Claims */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>Recorded Student Diagnostics (Strict Evidence-Based)</span>
              </h3>

              {diagnostics.hasRecordedData && (
                <button
                  onClick={handleResetData}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset to Clean State
                </button>
              )}
            </div>

            {!diagnostics.hasRecordedData ? (
              <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-200">Awaiting Student Activity</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  A new student begins with a clean state. No diagnostic claims or misconceptions are displayed until supported by actual recorded exercise attempts and state traces.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Actually Encountered Misconceptions */}
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Actually Encountered Misconceptions:
                  </span>
                  {diagnostics.actuallyEncounteredMisconceptions.length === 0 ? (
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Zero misconceptions encountered so far! High precision on recorded attempts.</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {diagnostics.actuallyEncounteredMisconceptions.map((miscId) => (
                        <div key={miscId} className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 text-xs text-rose-200">
                          <span className="font-mono font-bold">{miscId}</span> - Logged from incorrect answer choice.
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Per Lesson Objective Breakdown */}
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Objective Evidence Log:
                  </span>
                  <div className="space-y-2">
                    {Object.values(masteryRecords).map((rec) => (
                      <div key={rec.lessonId} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-300 font-mono">{rec.lessonId}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono">
                            Level: {rec.level}
                          </span>
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          Attempts: {rec.totalAttempts} (Success: {rec.successfulAttempts}, Hints: {rec.hintUsageCount})
                        </div>
                        {rec.objectiveEvidence && Object.keys(rec.objectiveEvidence).length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-900">
                            {Object.values(rec.objectiveEvidence).map((oe) => (
                              <div key={oe.objectiveId} className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] flex items-center justify-between">
                                <span className="font-mono text-slate-300">{oe.objectiveId}</span>
                                <span className={oe.mastered ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                                  {oe.mastered ? '✓ Mastered' : 'Needs Evidence'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: TEACH TOGETHER (CO-STUDY COACHING GUIDES)         */}
      {/* ======================================================== */}
      {activeTab === 'TEACH_TOGETHER' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Parent Coaching Guide
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  {inspectorLesson.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-xl px-3 py-1.5 font-medium"
                >
                  {allLessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      Lesson {l.number}: {l.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Guidance Card 1 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-indigo-300 uppercase tracking-wider block">
                  How to Introduce This Concept:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {inspectorLesson.content.teachTogetherNotes.parentIntro}
                </p>
              </div>

              {/* Guidance Card 2 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-amber-300 uppercase tracking-wider block">
                  Socratic Questions to Ask Him:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {inspectorLesson.content.teachTogetherNotes.questionsToAsk.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guidance Card 3 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-rose-300 uppercase tracking-wider block">
                  Subtle Traps to Watch For:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {inspectorLesson.content.teachTogetherNotes.subtleTraps.map((trap, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">⚠️</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guidance Card 4 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-emerald-300 uppercase tracking-wider block">
                  Challenge Discussion Prompt:
                </span>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px] bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  {inspectorLesson.content.teachTogetherNotes.challengePrompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
