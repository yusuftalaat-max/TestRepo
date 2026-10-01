import React from 'react';
import { FULL_CURRICULUM_OUTLINE, CURRICULUM_MODULES } from '../../data/curriculumData';
import { loadMasteryRecords } from '../../services/masteryStorage';
import { Lesson, MasteryLevel } from '../../types/curriculum';
import { GitCommit, ArrowRight, CheckCircle2, Lock, Sparkles, BookOpen } from 'lucide-react';

interface CourseMapProps {
  onSelectLesson: (lesson: Lesson) => void;
}

export const CourseMap: React.FC<CourseMapProps> = ({ onSelectLesson }) => {
  const masteryRecords = loadMasteryRecords();
  const allPrototypeLessons = CURRICULUM_MODULES.flatMap((m) => m.lessons);

  const dependencyFlows = [
    {
      title: 'Algorithmic Track',
      chain: ['Problems & Algorithms', 'State & Variables', 'Pseudocode', 'Trace Tables', 'Conditions', 'Loops', 'Big-O Analysis'],
      activeUpTo: 5,
    },
    {
      title: 'Data Representation Track',
      chain: ['Number Systems', 'Binary Conversion', 'Hexadecimal', 'Signed Numbers', "Two's Complement", 'Floating-Point'],
      activeUpTo: 0,
    },
    {
      title: 'Digital Systems & Logic Track',
      chain: ['Propositions', 'AND / OR / NOT', 'Truth Tables', 'Boolean Algebra', 'De Morgan Laws', 'Logic Gates', 'Combinational Circuits'],
      activeUpTo: 0,
    },
    {
      title: 'C Programming Track',
      chain: ['Anatomy of C', 'Types & Memory', 'I/O (printf/scanf)', 'C Selection', 'C Loops', 'Tracing in C', 'GIU Exam Synthesis'],
      activeUpTo: 0,
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <GitCommit className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Curriculum Dependency Graph
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
          GIU CS1 Visual Learning Roadmap
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Concepts build upon each other in a rigorous prerequisite hierarchy. Master algorithmic tracing and state transformations before advancing to digital circuits and pointer mechanics in C.
        </p>
      </div>

      {/* Dependency Tracks Horizontal Chains */}
      <div className="space-y-4">
        <h3 className="text-sm uppercase font-bold text-slate-300 tracking-wider">
          Core Prerequisite Dependency Chains
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {dependencyFlows.map((flow, flowIdx) => (
            <div key={flowIdx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  {flow.title}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {flow.activeUpTo > 0 ? `${flow.activeUpTo} Modules Active` : 'Planned for Next Release'}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {flow.chain.map((node, nodeIdx) => {
                  const isAvailable = nodeIdx <= flow.activeUpTo;
                  return (
                    <React.Fragment key={nodeIdx}>
                      <div
                        className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold shrink-0 flex items-center gap-2 transition-all min-h-[42px] ${
                          isAvailable
                            ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200 shadow'
                            : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                        }`}
                      >
                        {isAvailable ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                        <span>{node}</span>
                      </div>
                      {nodeIdx < flow.chain.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Prototype Modules & Lessons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase font-bold text-slate-300 tracking-wider">
            Active Vertical Prototype Lessons (Modules 1 - 4)
          </h3>
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> 8 Fully Populated Lessons Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allPrototypeLessons.map((les) => {
            const record = masteryRecords[les.id];
            const level: MasteryLevel = record?.level || 'NOT_STARTED';

            const badgeStyles: Record<MasteryLevel, string> = {
              NOT_STARTED: 'bg-slate-800 text-slate-400 border-slate-700',
              LEARNING: 'bg-blue-950 text-blue-300 border-blue-800',
              PRACTICING: 'bg-indigo-950 text-indigo-300 border-indigo-800',
              NEEDS_REVIEW: 'bg-rose-950 text-rose-300 border-rose-800',
              MASTERED: 'bg-emerald-950 text-emerald-300 border-emerald-800',
            };

            return (
              <div
                key={les.id}
                onClick={() => onSelectLesson(les)}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/80 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-indigo-400">
                      Lesson #{les.number}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badgeStyles[level]}`}>
                      {level.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {les.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{les.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span>~{les.estimatedMinutes} mins</span>
                  <span className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                    Open <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 48-Topic Full Curriculum Master Outline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm uppercase font-bold text-slate-300 tracking-wider">
          Complete GIU CS1 48-Topic Curriculum Index
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FULL_CURRICULUM_OUTLINE.map((part) => (
            <div key={part.partNumber} className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 block border-b border-slate-800 pb-1">
                {part.title}
              </span>
              <ul className="space-y-1 text-[11px] text-slate-400">
                {part.topics.map((topic, idx) => (
                  <li
                    key={idx}
                    className={`leading-tight ${
                      topic.includes('(Active in Prototype)')
                        ? 'text-emerald-300 font-semibold flex items-center gap-1'
                        : 'text-slate-500'
                    }`}
                  >
                    {topic.includes('(Active in Prototype)') && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    )}
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
