import React, { useState } from 'react';
import { Exercise, Misconception } from '../../types/curriculum';
import { recordExerciseAttempt } from '../../services/masteryStorage';
import { CheckCircle2, AlertTriangle, Lightbulb, Bot, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface ExerciseEngineProps {
  exercise: Exercise;
  onCompleted?: (isCorrect: boolean) => void;
  onAskTutor?: (questionContext: any) => void;
}

export const ExerciseEngine: React.FC<ExerciseEngineProps> = ({
  exercise,
  onCompleted,
  onAskTutor,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [revealedHintLevel, setRevealedHintLevel] = useState<number>(0); // 0 = none, 1 = guiding, 2 = concept, 3 = breakdown
  const [detectedMisconception, setDetectedMisconception] = useState<Misconception | null>(null);
  const [showFullExplanation, setShowFullExplanation] = useState<boolean>(false);

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);
    setHasSubmitted(true);

    const correct = selectedOption === exercise.correctAnswer;
    setIsCorrect(correct);

    // Diagnose likely misconception
    let matchedMisc: Misconception | null = null;
    if (!correct && exercise.misconceptions) {
      const optionTrigger = `chose option ${selectedOption}`;
      matchedMisc = exercise.misconceptions.find((m) => m.triggerCondition.toLowerCase().includes(optionTrigger)) || null;
      setDetectedMisconception(matchedMisc);
      // Auto-reveal first hint if not already revealed
      if (revealedHintLevel === 0) {
        setRevealedHintLevel(1);
      }
    } else {
      setDetectedMisconception(null);
    }

    // Record into persistent mastery model
    recordExerciseAttempt(exercise.lessonId, correct, revealedHintLevel, matchedMisc?.id);

    if (onCompleted) {
      onCompleted(correct);
    }
  };

  const handleNextHint = () => {
    if (revealedHintLevel < 3) {
      setRevealedHintLevel((prev) => prev + 1);
    } else {
      setShowFullExplanation(true);
    }
  };

  const handleTryAgain = () => {
    setHasSubmitted(false);
    setSelectedOption(null);
    setDetectedMisconception(null);
  };

  const difficultyColors = {
    FOUNDATION: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    APPLICATION: 'bg-blue-950 text-blue-300 border-blue-800',
    GIU_LEVEL: 'bg-amber-950 text-amber-300 border-amber-800',
    CHALLENGE: 'bg-rose-950 text-rose-300 border-rose-800',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col space-y-4">
      {/* Exercise Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty.replace('_', ' ')}
          </span>
          <span className="text-xs text-slate-400 font-mono">ID: {exercise.id}</span>
        </div>

        {attemptCount > 0 && (
          <span className="text-xs text-slate-400">
            Attempt <strong className="text-slate-200">{attemptCount}</strong>
          </span>
        )}
      </div>

      {/* Question Title & Objective */}
      <div>
        <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-1">{exercise.title}</h4>
        <p className="text-xs text-indigo-300 font-medium">{exercise.objective}</p>
      </div>

      {/* Code Snippet if present */}
      {exercise.codeSnippet && (
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto">
          <pre className="whitespace-pre">{exercise.codeSnippet}</pre>
        </div>
      )}

      {/* Question Statement */}
      <p className="text-sm text-slate-200 leading-relaxed font-sans">{exercise.question}</p>

      {/* Options List */}
      {exercise.options && (
        <div className="space-y-2 mt-2">
          {exercise.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let optionStyles = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

            if (hasSubmitted) {
              if (idx === exercise.correctAnswer) {
                optionStyles = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold';
              } else if (isSelected) {
                optionStyles = 'bg-rose-950/50 border-rose-500 text-rose-200 line-through';
              }
            } else if (isSelected) {
              optionStyles = 'bg-indigo-950/80 border-indigo-500 text-white font-medium ring-1 ring-indigo-500';
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted && isCorrect}
                onClick={() => {
                  if (!hasSubmitted || !isCorrect) {
                    setSelectedOption(idx);
                  }
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyles}`}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center border shrink-0 text-xs font-mono font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Feedback & Misconception Diagnosis */}
      {hasSubmitted && (
        <div className="space-y-3 pt-2">
          {isCorrect ? (
            <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-lg p-4 text-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold text-emerald-300 mb-1">Excellent Reasoning!</strong>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">{exercise.explanation}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Misconception Diagnostic Alert */}
              {detectedMisconception && (
                <div className="bg-amber-950/40 border border-amber-800/80 rounded-lg p-3 text-amber-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="font-bold text-amber-300">Identified Misconception: {detectedMisconception.name}</strong>
                    <p className="text-slate-300 mt-1">{detectedMisconception.description}</p>
                    <p className="text-amber-300 font-semibold mt-1">Hint: {detectedMisconception.remedyHint}</p>
                  </div>
                </div>
              )}

              {/* Gentle non-giving-away message */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 flex items-center justify-between">
                <span>Not quite yet! Take a moment to think about what the program is doing.</span>
                <button
                  onClick={handleTryAgain}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-attempt
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tiered Hints Box */}
      {revealedHintLevel > 0 && !isCorrect && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-lg p-3 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-indigo-300">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Progressive Hint System (Level {revealedHintLevel}/3)
            </span>
            {revealedHintLevel < 3 && (
              <button
                onClick={handleNextHint}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold"
              >
                Need stronger hint?
              </button>
            )}
          </div>

          <div className="space-y-1.5 text-slate-300 pl-4 border-l-2 border-indigo-700">
            {revealedHintLevel >= 1 && (
              <p><strong className="text-amber-400">Guiding Question:</strong> {exercise.hints[0]}</p>
            )}
            {revealedHintLevel >= 2 && (
              <p><strong className="text-blue-400">Concept Pointer:</strong> {exercise.hints[1]}</p>
            )}
            {revealedHintLevel >= 3 && (
              <p><strong className="text-rose-400">Step Breakdown:</strong> {exercise.hints[2]}</p>
            )}
          </div>
        </div>
      )}

      {/* Bottom Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow"
            >
              Check Answer <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            !isCorrect && (
              <button
                onClick={handleTryAgain}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                Try Again
              </button>
            )
          )}

          {revealedHintLevel === 0 && !isCorrect && (
            <button
              onClick={() => setRevealedHintLevel(1)}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Get a Hint
            </button>
          )}
        </div>

        {/* Ask Socratic AI Tutor button */}
        {onAskTutor && (
          <button
            onClick={() =>
              onAskTutor({
                exerciseId: exercise.id,
                title: exercise.title,
                question: exercise.question,
                attemptCount,
                revealedHintLevel,
                selectedOptionText: selectedOption !== null ? exercise.options?.[selectedOption] : 'None',
              })
            }
            className="px-3 py-2 rounded-lg bg-indigo-950/70 border border-indigo-800/80 hover:bg-indigo-900 text-indigo-300 hover:text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" /> Ask Socratic Tutor
          </button>
        )}
      </div>
    </div>
  );
};
