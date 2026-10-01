import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../../data/curriculumData';
import { loadMasteryRecords } from '../../services/masteryStorage';
import { Lesson, StudentMasteryRecord, MasteryLevel } from '../../types/curriculum';
import {
  Users2,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  HelpCircle,
  Sparkles,
  BookOpen,
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
  const [activeTeachLesson, setActiveTeachLesson] = useState<Lesson | null>(
    selectedTeachLesson || null
  );

  const masteryRecords: Record<string, StudentMasteryRecord> = loadMasteryRecords();

  const allLessons: Lesson[] = CURRICULUM_MODULES.flatMap((m) => m.lessons);

  // Compute metrics
  const totalLessons = allLessons.length;
  const masteredCount = Object.values(masteryRecords).filter((r) => r.level === 'MASTERED').length;
  const needsReviewCount = Object.values(masteryRecords).filter((r) => r.level === 'NEEDS_REVIEW').length;
  const practicingCount = Object.values(masteryRecords).filter((r) => r.level === 'PRACTICING').length;

  const totalHintsUsed = Object.values(masteryRecords).reduce((acc, r) => acc + r.hintUsageCount, 0);
  const totalAttempts = Object.values(masteryRecords).reduce((acc, r) => acc + r.totalAttempts, 0);
  const hintDependencyRate = totalAttempts > 0 ? Math.round((totalHintsUsed / totalAttempts) * 100) : 0;

  const masteryBadgeStyle: Record<MasteryLevel, string> = {
    NOT_STARTED: 'bg-slate-800 text-slate-400 border-slate-700',
    LEARNING: 'bg-blue-950 text-blue-300 border-blue-800',
    PRACTICING: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    NEEDS_REVIEW: 'bg-rose-950 text-rose-300 border-rose-800',
    MASTERED: 'bg-emerald-950 text-emerald-300 border-emerald-800',
  };

  // If a lesson is currently chosen for "Teach Together", render that focused co-study view
  if (activeTeachLesson) {
    const notes = activeTeachLesson.content.teachTogetherNotes;

    return (
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Teach Together Co-Study Mode
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Coaching: {activeTeachLesson.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Guidance for parent / instructor: lead with conceptual intuition and Socratic questions rather than answers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLesson(activeTeachLesson)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" /> Jump to Lesson
            </button>
            <button
              onClick={() => {
                setActiveTeachLesson(null);
                if (onCloseTeachTogether) onCloseTeachTogether();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Co-Study Structured Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Core Pedagogical Concept */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" /> Conceptual Core
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {notes.parentIntro}
            </div>

            <div className="bg-indigo-950/30 border border-indigo-900/60 p-4 rounded-xl">
              <span className="text-xs font-bold text-indigo-300 block mb-1">
                Why this matters for GIU CS1 exams:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                This concept forms the bedrock for subsequent topics (data structures, pointers in C, and recursive decomposition). Developing an airtight mental model now prevents recurring confusion later.
              </p>
            </div>
          </div>

          {/* Card 2: Socratic Questions to Ask Your Son */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Socratic Questions to Ask
            </h3>
            <p className="text-xs text-slate-400">
              Pose these questions to test if he understands the mechanics rather than just guessing:
            </p>

            <div className="space-y-2.5">
              {notes.questionsToAsk.map((q, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-200 leading-snug font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Subtle Student Traps to Watch For */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm uppercase font-bold text-rose-400 tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Common Student Traps
            </h3>
            <p className="text-xs text-slate-400">
              Be on the lookout for these specific mental shortcuts:
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              {notes.subtleTraps.map((trap, idx) => (
                <li key={idx} className="bg-rose-950/20 border border-rose-900/50 p-3 rounded-xl flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{trap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: Co-Study Challenge Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm uppercase font-bold text-amber-400 tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Extension Challenge
            </h3>
            <p className="text-xs text-slate-400">
              Once he solves the basic practice exercises, challenge him with this deeper problem:
            </p>

            <div className="bg-amber-950/30 border border-amber-900/60 p-4 rounded-xl text-xs sm:text-sm text-amber-200 leading-relaxed font-sans">
              {notes.challengePrompt}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render full Parent / Instructor Dashboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Instructor & Parent Co-Study Portal
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
            Student Mastery & Diagnostic Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Designed for co-studying with your son. Track evidence-based mastery, hint dependency, and frequent misconceptions.
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">STUDENT:</span>
            <span className="text-slate-200 font-bold">GIU Engineering CS1</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">ACADEMIC YEAR:</span>
            <span className="text-indigo-400 font-bold">2026/2027</span>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Mastered Concepts
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              {masteredCount}
            </span>
            <span className="text-xs text-slate-500">/ {totalLessons}</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Backed by exercise proof</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Needs Review
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400">
              {needsReviewCount}
            </span>
            <span className="text-xs text-slate-500">topics</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Frequent errors logged</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Actively Practicing
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400">
              {practicingCount}
            </span>
            <span className="text-xs text-slate-500">topics</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">In progress</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Hint Dependency
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
              {hintDependencyRate}%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Hints per attempt</span>
        </div>
      </div>

      {/* Actionable Parent Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" /> Socratic Recommendations for Your Next Study Session
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-3.5 h-3.5" /> High Priority
            </div>
            <strong className="text-xs sm:text-sm text-slate-200 block">Review While-Loop Termination Conditions</strong>
            <p className="text-xs text-slate-400 leading-relaxed">
              Student frequently encounters off-by-one errors when checking `i &lt; n` vs `i &le; n`. Walk through Lesson 7's trace table together.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Lightbulb className="w-3.5 h-3.5" /> Concept Reinforcement
            </div>
            <strong className="text-xs sm:text-sm text-slate-200 block">Accumulator Variable Scope</strong>
            <p className="text-xs text-slate-400 leading-relaxed">
              Student showed confusion in Exercise 8 by resetting the accumulator inside the loop body instead of before. Ask him the piggy-bank analogy.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" /> Strong Comprehension
            </div>
            <strong className="text-xs sm:text-sm text-slate-200 block">Sequential Swapping & Variables</strong>
            <p className="text-xs text-slate-400 leading-relaxed">
              Student mastered destructive assignment and temporary variables. He is ready for complex nested conditionals.
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Mastery Matrix with "Teach Together" launcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase font-bold text-slate-300 tracking-wider">
            Detailed Concept Mastery Matrix
          </h3>
          <span className="text-xs text-slate-500">Click any row to open Teach Together mode</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-2.5 px-3">Lesson</th>
                <th className="py-2.5 px-3">Mastery State</th>
                <th className="py-2.5 px-3">Attempts</th>
                <th className="py-2.5 px-3">Hints Used</th>
                <th className="py-2.5 px-3">Identified Misconceptions</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {allLessons.map((les) => {
                const record = masteryRecords[les.id];
                const level: MasteryLevel = record?.level || 'NOT_STARTED';

                return (
                  <tr
                    key={les.id}
                    className="hover:bg-slate-850/50 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-200 block">
                        #{les.number}: {les.title}
                      </span>
                      <span className="text-[11px] text-slate-400">{les.subtitle}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${masteryBadgeStyle[level]}`}>
                        {level.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {record?.successfulAttempts ?? 0} / {record?.totalAttempts ?? 0}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-300">
                      {record?.hintUsageCount ?? 0}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {record && record.encounteredMisconceptions.length > 0 ? (
                        <span className="text-rose-400 font-mono text-[11px]">
                          {record.encounteredMisconceptions.join(', ')}
                        </span>
                      ) : (
                        <span className="text-slate-600">None detected</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setActiveTeachLesson(les)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/80 hover:bg-emerald-900 text-emerald-300 text-[11px] font-semibold transition-colors"
                      >
                        Teach Together
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
