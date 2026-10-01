import React, { useState, useEffect } from 'react';
import { EXERCISE_BANK } from '../../data/exercisesData';
import { Exercise } from '../../types/curriculum';
import {
  Timer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react';

interface ExamModeProps {
  onOpenLessonById?: (lessonId: string) => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({ onOpenLessonById }) => {
  const [examType, setExamType] = useState<'TOPIC_QUIZ' | 'MIXED_QUIZ' | 'MIDTERM_SIMULATION'>('MIDTERM_SIMULATION');
  const [examActive, setExamActive] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(600); // 10 minutes
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

  // Pick question set
  const examQuestions: Exercise[] = React.useMemo(() => {
    if (examType === 'TOPIC_QUIZ') {
      return EXERCISE_BANK.filter((e) => e.moduleId === 'mod-4');
    }
    return EXERCISE_BANK;
  }, [examType]);

  // Countdown timer when exam is active
  useEffect(() => {
    if (!examActive || examSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examActive, examSubmitted]);

  const handleStartExam = () => {
    setStudentAnswers({});
    setCurrentQuestionIndex(0);
    setExamSubmitted(false);
    setTimeLeftSeconds(examType === 'MIDTERM_SIMULATION' ? 900 : 480);
    setExamActive(true);
  };

  const handleSelectAnswer = (optIdx: number) => {
    const q = examQuestions[currentQuestionIndex];
    if (!q) return;
    setStudentAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    setExamActive(false);
  };

  // Diagnostic calculations after submission
  let correctCount = 0;
  const topicStats: Record<string, { total: number; correct: number }> = {};
  const identifiedMisconceptions: { name: string; description: string; remedy: string }[] = [];

  examQuestions.forEach((q) => {
    const ans = studentAnswers[q.id];
    const isCorrect = ans === q.correctAnswer;
    if (isCorrect) correctCount++;

    const topicKey = q.moduleId;
    if (!topicStats[topicKey]) {
      topicStats[topicKey] = { total: 0, correct: 0 };
    }
    topicStats[topicKey].total += 1;
    if (isCorrect) topicStats[topicKey].correct += 1;

    if (!isCorrect && ans !== undefined && q.misconceptions) {
      const match = q.misconceptions.find((m) => m.triggerCondition.includes(`chose option ${ans}`));
      if (match) {
        identifiedMisconceptions.push({
          name: match.name,
          description: match.description,
          remedy: match.remedyHint,
        });
      }
    }
  });

  const percentage = Math.round((correctCount / examQuestions.length) * 100);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ: Exercise | undefined = examQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Exam Mode & GIU Midterm Simulation
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
            Formal Examination Assessment
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Simulates real exam constraints: hints are disabled, answers are scored on final submission, and detailed diagnostic reports are generated.
          </p>
        </div>

        {/* Exam Type Selector (when not currently in exam) */}
        {!examActive && !examSubmitted && (
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <select
              value={examType}
              onChange={(e: any) => setExamType(e.target.value)}
              className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-xl px-3 py-2.5 font-medium focus:outline-none flex-1 sm:max-w-xs min-h-[44px]"
            >
              <option value="MIDTERM_SIMULATION">GIU Midterm Practice (Full Scope)</option>
              <option value="MIXED_QUIZ">Mixed CS1 Diagnostic Quiz</option>
              <option value="TOPIC_QUIZ">Topic Quiz: Loops & Accumulators</option>
            </select>

            <button
              onClick={handleStartExam}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow min-h-[44px] active:scale-95 shrink-0"
            >
              Begin Assessment
            </button>
          </div>
        )}

        {/* Live Timer if Active */}
        {examActive && (
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 font-mono text-xs min-h-[44px]">
            <Timer className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
            <span className="text-slate-400">Time:</span>
            <span className={`font-bold text-sm ${timeLeftSeconds < 120 ? 'text-rose-400' : 'text-slate-100'}`}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>
        )}
      </div>

      {/* State 1: Active Exam Flow */}
      {examActive && !examSubmitted && currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5">
          {/* Question Stepper */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Q {currentQuestionIndex + 1} of {examQuestions.length}
              </span>
              <span className="text-xs text-slate-400 font-mono hidden xs:inline">[{currentQ.difficulty}]</span>
            </div>

            <span className="text-xs text-slate-500">
              Answered: {Object.keys(studentAnswers).length} / {examQuestions.length}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-100">{currentQ.title}</h3>

          {currentQ.codeSnippet && (
            <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto max-w-full">
              <pre className="whitespace-pre">{currentQ.codeSnippet}</pre>
            </div>
          )}

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">{currentQ.question}</p>

          {/* Options - Touch Friendly >= 48px */}
          {currentQ.options && (
            <div className="space-y-2 pt-1">
              {currentQ.options.map((opt, idx) => {
                const isSelected = studentAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-3 min-h-[48px] active:scale-[0.99] touch-manipulation ${
                      isSelected
                        ? 'bg-indigo-950/80 border-indigo-500 text-white font-semibold ring-1 ring-indigo-500'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-indigo-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 gap-2">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold min-h-[46px] active:scale-95"
            >
              Previous
            </button>

            {currentQuestionIndex < examQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold min-h-[46px] active:scale-95"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg min-h-[46px] active:scale-95"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      )}

      {/* State 2: Post-Submission Comprehensive Diagnostic Report */}
      {examSubmitted && (
        <div className="space-y-6">
          {/* Score Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1 text-emerald-400">
                <Award className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">Exam Results Generated</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                Score: {correctCount} / {examQuestions.length} ({percentage}%)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {percentage >= 80
                  ? 'Strong university-level performance. Conceptual foundation is solid!'
                  : percentage >= 50
                  ? 'Satisfactory start, but key edge cases and loop mechanics require review.'
                  : 'Needs targeted revision before GIU CS1 exams. See diagnostic guidance below.'}
              </p>
            </div>

            <button
              onClick={handleStartExam}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Practice Exam
            </button>
          </div>

          {/* Performance by Topic breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm uppercase font-bold text-slate-300 tracking-wider">
              Diagnostic Performance by Topic
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(topicStats).map(([modId, stats]) => {
                const topicPct = Math.round((stats.correct / stats.total) * 100);
                const titleMap: Record<string, string> = {
                  'mod-1': 'Module 1: Problems & State',
                  'mod-2': 'Module 2: Tracing & Tables',
                  'mod-3': 'Module 3: Conditions & Logic',
                  'mod-4': 'Module 4: Loops & Accumulators',
                };

                return (
                  <div key={modId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block truncate">
                      {titleMap[modId] || modId}
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-bold font-mono text-indigo-300">
                        {stats.correct} / {stats.total}
                      </span>
                      <span className={`text-xs font-bold ${topicPct >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {topicPct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${topicPct >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        style={{ width: `${topicPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Identified Misconceptions */}
          {identifiedMisconceptions.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h4 className="text-sm uppercase font-bold text-amber-400 tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Diagnosed Student Misconceptions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {identifiedMisconceptions.map((misc, idx) => (
                  <div key={idx} className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-xl text-xs space-y-1">
                    <strong className="text-amber-300 font-bold block">{misc.name}</strong>
                    <p className="text-slate-300">{misc.description}</p>
                    <p className="text-indigo-300 font-semibold pt-1">Remedy: {misc.remedy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Revision Steps */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h4 className="text-sm uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Recommended Remediation Lessons
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-xs text-slate-200 block">Lesson 7: Anatomy of Loops & While Statements</strong>
                  <span className="text-[11px] text-slate-400">Eliminate off-by-one errors and loop invariants</span>
                </div>
                {onOpenLessonById && (
                  <button
                    onClick={() => onOpenLessonById('les-7')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Open
                  </button>
                )}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-xs text-slate-200 block">Lesson 8: Accumulators & Debugging Loops</strong>
                  <span className="text-[11px] text-slate-400">Fix accumulator reset and scope traps</span>
                </div>
                {onOpenLessonById && (
                  <button
                    onClick={() => onOpenLessonById('les-8')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Open
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* State 3: Intro when neither active nor submitted */}
      {!examActive && !examSubmitted && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              1. GIU Exam Rules
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              No hints are revealed during the exam. Questions test predictive tracing, error diagnosis, and edge case reasoning.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              2. Socratic Post-Mortem
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              After submitting, you receive a full diagnostic report revealing your identified misconceptions and recommended review lessons.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              3. Parent Review
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Exam scores automatically feed into the Instructor Dashboard so you and your father can review weak areas together.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
