import React, { useState } from 'react';
import { Navbar, NavTab } from './components/layout/Navbar';
import { LessonView } from './components/lesson/LessonView';
import { ExerciseEngine } from './components/practice/ExerciseEngine';
import { ProblemLab } from './components/problem-lab/ProblemLab';
import { AlgorithmVisualizer } from './components/algorithm-visualizer/AlgorithmVisualizer';
import { ExamMode } from './components/exam/ExamMode';
import { CourseMap } from './components/course-map/CourseMap';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { SocraticTutorDrawer } from './components/tutor/SocraticTutorDrawer';
import { CURRICULUM_MODULES } from './data/curriculumData';
import { EXERCISE_BANK } from './data/exercisesData';
import { loadMasteryRecords } from './services/masteryStorage';
import { Lesson, ExerciseDifficulty } from './types/curriculum';
import {
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Filter,
  PlayCircle,
  Lightbulb,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('LEARN');
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_MODULES[0].lessons[0]);
  const [selectedTeachLesson, setSelectedTeachLesson] = useState<Lesson | null>(null);

  // Socratic AI Tutor Drawer state & context
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [tutorContext, setTutorContext] = useState<{
    topic?: string;
    lessonTitle?: string;
    exerciseContext?: any;
    attemptCount?: number;
    studentCode?: string;
    recentMistakes?: string;
  }>({
    topic: 'Computer Science 1',
    lessonTitle: selectedLesson.title,
  });

  // Practice tab filter state
  const [practiceDifficulty, setPracticeDifficulty] = useState<ExerciseDifficulty | 'ALL'>('ALL');
  const [practiceModule, setPracticeModule] = useState<string>('ALL');

  const masteryRecords = loadMasteryRecords();
  const allLessons: Lesson[] = CURRICULUM_MODULES.flatMap((m) => m.lessons);

  const masteredCount = Object.values(masteryRecords).filter((r) => r.level === 'MASTERED').length;

  // Determine "What should I learn next?"
  const nextLessonCandidate =
    allLessons.find((les) => !masteryRecords[les.id] || masteryRecords[les.id].level === 'NOT_STARTED') ||
    allLessons[0];

  // Determine "What should I review?" (Topics with NEEDS_REVIEW or low accuracy)
  const reviewLessonCandidate =
    allLessons.find((les) => masteryRecords[les.id]?.level === 'NEEDS_REVIEW') ||
    allLessons.find((les) => les.id === 'les-7') ||
    allLessons[1];

  const handleOpenTutorWithContext = (context: any) => {
    setTutorContext((prev) => ({
      ...prev,
      ...context,
      topic: selectedLesson.title,
      lessonTitle: selectedLesson.title,
    }));
    setIsTutorOpen(true);
  };

  const handleOpenTeachTogether = (lesson: Lesson) => {
    setSelectedTeachLesson(lesson);
    setActiveTab('INSTRUCTOR');
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === selectedLesson.id);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      setSelectedLesson(allLessons[currentIndex + 1]);
    }
  };

  const filteredExercises = EXERCISE_BANK.filter((ex) => {
    const matchDiff = practiceDifficulty === 'ALL' || ex.difficulty === practiceDifficulty;
    const matchMod = practiceModule === 'ALL' || ex.moduleId === practiceModule;
    return matchDiff && matchMod;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'INSTRUCTOR') setSelectedTeachLesson(null);
        }}
        onOpenTutor={() => setIsTutorOpen(true)}
        masteredCount={masteredCount}
        totalTopics={allLessons.length}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ==================== TAB 1: LEARN ==================== */}
        {activeTab === 'LEARN' && (
          <div className="space-y-8">
            {/* Student Home 3-Question Decision Compass */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Question 1: What should I learn next? */}
              <div
                onClick={() => setSelectedLesson(nextLessonCandidate)}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/80 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> What Should I Learn Next?
                  </div>
                  <strong className="text-base text-slate-100 block group-hover:text-indigo-300 transition-colors">
                    {nextLessonCandidate.title}
                  </strong>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {nextLessonCandidate.subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs font-semibold text-indigo-400">
                  <span>Start Lesson #{nextLessonCandidate.number}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Question 2: What should I review? */}
              <div
                onClick={() => setSelectedLesson(reviewLessonCandidate)}
                className="bg-slate-900 border border-slate-800 hover:border-rose-500/80 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" /> What Should I Review?
                  </div>
                  <strong className="text-base text-slate-100 block group-hover:text-rose-300 transition-colors">
                    {reviewLessonCandidate.title}
                  </strong>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    Diagnosed off-by-one errors and loop invariants require reinforcement.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs font-semibold text-rose-400">
                  <span>Re-trace Loop Mechanics</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Question 3: How am I progressing? */}
              <div
                onClick={() => setActiveTab('COURSE_MAP')}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/80 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> How Am I Progressing?
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-emerald-400">
                      {Math.round((masteredCount / allLessons.length) * 100)}%
                    </span>
                    <span className="text-xs text-slate-400">Mastery Rate</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {masteredCount} of {allLessons.length} core concepts verified by exercise evidence.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs font-semibold text-emerald-400">
                  <span>View Dependency Map</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Quick Lesson Switcher Horizontal Strip */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 overflow-x-auto">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider shrink-0">
                Curriculum Lessons:
              </span>
              <div className="flex items-center gap-2">
                {allLessons.map((les) => (
                  <button
                    key={les.id}
                    onClick={() => setSelectedLesson(les)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      selectedLesson.id === les.id
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    #{les.number}: {les.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Interactive Lesson Workspace */}
            <LessonView
              lesson={selectedLesson}
              onOpenTeachTogether={handleOpenTeachTogether}
              onAskTutor={handleOpenTutorWithContext}
              onNextLesson={handleNextLesson}
            />
          </div>
        )}

        {/* ==================== TAB 2: PRACTICE ==================== */}
        {activeTab === 'PRACTICE' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                  Structured CS1 Exercise Question Bank
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Targeted reasoning exercises across four difficulty tiers. Receive diagnostic feedback and progressive 3-tiered hints.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                  <Filter className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-slate-500 font-medium">Difficulty:</span>
                  <select
                    value={practiceDifficulty}
                    onChange={(e: any) => setPracticeDifficulty(e.target.value)}
                    className="bg-transparent text-slate-200 font-semibold focus:outline-none"
                  >
                    <option value="ALL">All Levels</option>
                    <option value="FOUNDATION">Foundation</option>
                    <option value="APPLICATION">Application</option>
                    <option value="GIU_LEVEL">GIU Level</option>
                    <option value="CHALLENGE">Challenge</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-500 font-medium">Module:</span>
                  <select
                    value={practiceModule}
                    onChange={(e: any) => setPracticeModule(e.target.value)}
                    className="bg-transparent text-slate-200 font-semibold focus:outline-none"
                  >
                    <option value="ALL">All Modules</option>
                    <option value="mod-1">Module 1: Problems</option>
                    <option value="mod-2">Module 2: Tracing</option>
                    <option value="mod-3">Module 3: Conditions</option>
                    <option value="mod-4">Module 4: Loops</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-6">
              {filteredExercises.map((exercise) => (
                <ExerciseEngine
                  key={exercise.id}
                  exercise={exercise}
                  onAskTutor={handleOpenTutorWithContext}
                />
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: PROBLEM LAB ==================== */}
        {activeTab === 'PROBLEM_LAB' && (
          <ProblemLab onAskTutor={handleOpenTutorWithContext} />
        )}

        {/* ==================== TAB 4: ALGORITHM LAB ==================== */}
        {activeTab === 'ALGORITHM_LAB' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-1">
                Visual Algorithm Laboratory
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl">
                Independent execution sandbox. Select algorithmic presets (accumulator loops, multi-branch selection, modulo counters, factorials), modify inputs, and step line-by-line while inspecting memory cells and condition evaluations.
              </p>
            </div>

            <AlgorithmVisualizer standalone={true} />
          </div>
        )}

        {/* ==================== TAB 5: EXAMS ==================== */}
        {activeTab === 'EXAMS' && (
          <ExamMode
            onOpenLessonById={(lessonId) => {
              const target = allLessons.find((l) => l.id === lessonId);
              if (target) {
                setSelectedLesson(target);
                setActiveTab('LEARN');
              }
            }}
          />
        )}

        {/* ==================== TAB 6: COURSE MAP ==================== */}
        {activeTab === 'COURSE_MAP' && (
          <CourseMap
            onSelectLesson={(lesson) => {
              setSelectedLesson(lesson);
              setActiveTab('LEARN');
            }}
          />
        )}

        {/* ==================== TAB 7: INSTRUCTOR / PARENT MODE ==================== */}
        {activeTab === 'INSTRUCTOR' && (
          <InstructorDashboard
            selectedTeachLesson={selectedTeachLesson}
            onOpenLesson={(lesson) => {
              setSelectedLesson(lesson);
              setActiveTab('LEARN');
            }}
            onCloseTeachTogether={() => setSelectedTeachLesson(null)}
          />
        )}
      </main>

      {/* Socratic AI Tutor Slide-out Drawer */}
      <SocraticTutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        context={tutorContext}
      />
    </div>
  );
}
