import React, { useState } from 'react';
import { Exercise, Misconception } from '../../types/curriculum';
import { recordExerciseAttempt } from '../../services/masteryStorage';
import { CheckCircle2, AlertTriangle, Lightbulb, Bot, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

interface ExerciseEngineProps {
  exercise?: Exercise;
  exercises?: Exercise[];
  lessonId?: string;
  onCompleted?: (isCorrect: boolean) => void;
  onAskTutor?: (questionContext: any) => void;
}

export const ExerciseEngine: React.FC<ExerciseEngineProps> = ({
  exercise: singleExercise,
  exercises: exerciseList,
  onCompleted,
  onAskTutor,
}) => {
  const allExercises = exerciseList || (singleExercise ? [singleExercise] : []);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const exercise = allExercises[currentIdx];

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [revealedHintLevel, setRevealedHintLevel] = useState<number>(0);
  const [detectedMisconception, setDetectedMisconception] = useState<Misconception | null>(null);
  const [showFullExplanation, setShowFullExplanation] = useState<boolean>(false);

  if (!exercise) {
    return (
      <div className="p-8 text-center text-xs text-slate-400 bg-slate-900 rounded-xl border border-slate-800">
        No exercise available.
      </div>
    );
  }

  const handleSelectExercise = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setAttemptCount(0);
    setRevealedHintLevel(0);
    setDetectedMisconception(null);
    setShowFullExplanation(false);
  };

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
      matchedMisc = exercise.misconceptions.find((m) =>
        m.triggerCondition.toLowerCase().includes(optionTrigger)
      ) || null;
      setDetectedMisconception(matchedMisc);
      if (revealedHintLevel === 0) {
        setRevealedHintLevel(1);
      }
    } else {
      setDetectedMisconception(null);
    }

    // Record into persistent objective-based mastery model
    recordExerciseAttempt(
      exercise.lessonId,
      correct,
      revealedHintLevel,
      exercise.objectiveId,
      exercise.cognitiveLevel,
      matchedMisc?.id
    );

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
      {/* Exercise Navigation Tabs if multiple exercises */}
      {allExercises.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 mr-1 shrink-0">
            Exercises ({allExercises.length}):
          </span>
          {allExercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => handleSelectExercise(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
                currentIdx === idx
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>#{idx + 1}</span>
              <span className="uppercase text-[10px] text-indigo-300">
                {ex.cognitiveLevel || ex.difficulty}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Exercise Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${difficultyColors[exercise.difficulty]}`}
          >
            {exercise.difficulty.replace('_', ' ')}
          </span>
          {exercise.cognitiveLevel && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 uppercase font-bold">
              {exercise.cognitiveLevel}
            </span>
          )}
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

      {/* Question Text */}
      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
        {exercise.question}
      </div>

      {/* Code Snippet Box if present */}
      {exercise.codeSnippet && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-3.5 font-mono text-xs sm:text-sm text-indigo-300 whitespace-pre overflow-x-auto max-w-full">
          {exercise.codeSnippet}
        </div>
      )}

      {/* Multiple Choice Options - Touch-Friendly >= 48px */}
      {exercise.options && exercise.options.length > 0 && (
        <div className="space-y-2 pt-1">
          {exercise.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const showSuccess = hasSubmitted && idx === exercise.correctAnswer;
            const showFailure = hasSubmitted && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                disabled={hasSubmitted && isCorrect}
                onClick={() => {
                  if (!hasSubmitted || !isCorrect) {
                    setSelectedOption(idx);
                    setHasSubmitted(false);
                  }
                }}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center active:scale-[0.99] touch-manipulation ${
                  showSuccess
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                    : showFailure
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                    : isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200 font-semibold'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-mono mr-2.5 font-bold text-indigo-400 shrink-0">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Action Submit / Try Again - Touch Friendly Controls */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {!hasSubmitted || !isCorrect ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition-all shadow min-h-[44px] active:scale-95"
          >
            Submit Answer
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 py-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Correct! Objective evidence recorded.
            </span>
            {allExercises.length > 1 && currentIdx < allExercises.length - 1 && (
              <button
                onClick={() => handleSelectExercise(currentIdx + 1)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 min-h-[44px] active:scale-95"
              >
                Next Exercise <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {hasSubmitted && !isCorrect && (
          <button
            onClick={handleTryAgain}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px] active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try Again
          </button>
        )}
      </div>

      {/* Misconception Diagnostic Alert */}
      {detectedMisconception && (
        <div className="bg-rose-950/30 border border-rose-800 rounded-xl p-3.5 text-xs text-rose-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-rose-300">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Targeted Diagnostic: {detectedMisconception.name}</span>
          </div>
          <p className="text-slate-300">{detectedMisconception.description}</p>
          <div className="text-emerald-300 pt-1 font-medium">
            💡 Guide: {detectedMisconception.remedyHint}
          </div>
        </div>
      )}

      {/* Progressive 3-Stage Hints */}
      {revealedHintLevel > 0 && (
        <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Socratic Hint {revealedHintLevel} of 3</span>
            </span>
            {revealedHintLevel < 3 && (
              <button
                onClick={handleNextHint}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-normal"
              >
                Need deeper hint?
              </button>
            )}
          </div>
          <p className="text-slate-300 leading-relaxed">
            {exercise.hints[revealedHintLevel - 1]}
          </p>
        </div>
      )}

      {/* Full Explanation */}
      {(showFullExplanation || (hasSubmitted && isCorrect)) && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1 leading-relaxed">
          <span className="font-bold text-indigo-300 block mb-0.5">Explanation:</span>
          <p>{exercise.explanation}</p>
        </div>
      )}

      {/* Bottom Hint / Socratic Tutor Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
        <div>
          {revealedHintLevel > 0 && revealedHintLevel < 3 && (
            <button
              onClick={handleNextHint}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 min-h-[44px] px-2 py-1"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Reveal Hint {revealedHintLevel + 1}
            </button>
          )}

          {revealedHintLevel === 0 && !isCorrect && (
            <button
              onClick={() => setRevealedHintLevel(1)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 text-xs flex items-center gap-1.5 transition-colors min-h-[44px] active:scale-95"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Get a Hint
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
                topic: exercise.objective,
                attemptCount,
                revealedHintLevel,
                selectedOptionText:
                  selectedOption !== null ? exercise.options?.[selectedOption] : 'None',
              })
            }
            className="px-3.5 py-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/80 hover:bg-indigo-900 text-indigo-300 hover:text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px] active:scale-95 shrink-0"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Ask Socratic Tutor
          </button>
        )}
      </div>
    </div>
  );
};
