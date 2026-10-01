export type MasteryLevel = 'NOT_STARTED' | 'LEARNING' | 'PRACTICING' | 'NEEDS_REVIEW' | 'MASTERED';

export type ExerciseDifficulty = 'FOUNDATION' | 'APPLICATION' | 'GIU_LEVEL' | 'CHALLENGE';

export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'PREDICT_OUTPUT'
  | 'TRACE_TABLE'
  | 'FIND_THE_ERROR'
  | 'FILL_BLANK_CODE'
  | 'BINARY_CONVERSION'
  | 'TRUTH_TABLE';

export interface CodeTraceStep {
  line: number;
  explanation: string;
  variables: Record<string, string | number | boolean>;
  conditionEval?: {
    expression: string;
    result: boolean;
  };
  iteration?: number;
  output?: string;
  predictionPrompt?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface TraceableAlgorithm {
  id: string;
  title: string;
  description: string;
  codeLines: string[];
  initialInputs?: Record<string, number | string>;
  supportedInputs?: { name: string; defaultVal: number; min: number; max: number }[];
  stepsGenerator: (inputs: Record<string, any>) => CodeTraceStep[];
}

export interface Misconception {
  id: string;
  triggerCondition: string; // e.g., 'entered N instead of N-1' or 'chose option B'
  name: string;
  description: string;
  remedyHint: string;
}

export interface Exercise {
  id: string;
  moduleId: string;
  lessonId: string;
  title: string;
  objective: string;
  difficulty: ExerciseDifficulty;
  type: ExerciseType;
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number; // option index or numeric/string value
  tableConfig?: {
    headers: string[];
    rows: { inputs: (string | number)[]; expectedOutputs: (string | number)[] }[];
  };
  hints: [string, string, string]; // Hint 1 (Guiding question), Hint 2 (Concept pointer), Hint 3 (Step breakdown)
  explanation: string;
  misconceptions: Misconception[];
}

export type LessonStage =
  | 'CONCEPT'
  | 'INTUITION'
  | 'DEMONSTRATION'
  | 'GUIDED_EXAMPLE'
  | 'PREDICTION'
  | 'PRACTICE'
  | 'FEEDBACK'
  | 'CHALLENGE'
  | 'MASTERY_CHECK';

export interface LessonContent {
  conceptSummary: string;
  keyTerminology: { term: string; definition: string }[];
  intuitionWhy: string;
  demonstrationNotes: string;
  algorithmPresetId?: string; // Links to interactive visualizer preset
  guidedExample: {
    problemStatement: string;
    thoughtProcess: string[];
    pseudocode: string[];
    tracingTable: { step: number; line: string; vars: string; output: string }[];
  };
  predictionChallenge: {
    code: string[];
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  commonMistakes: { mistake: string; whyWrong: string; correction: string }[];
  teachTogetherNotes: {
    parentIntro: string;
    questionsToAsk: string[];
    subtleTraps: string[];
    challengePrompt: string;
  };
}

export interface Lesson {
  id: string;
  number: number;
  partNumber: number;
  moduleId: string;
  title: string;
  subtitle: string;
  learningObjectives: string[];
  prerequisites: string[];
  estimatedMinutes: number;
  content: LessonContent;
  exerciseIds: string[];
}

export interface Module {
  id: string;
  partNumber: number;
  moduleNumber: number;
  title: string;
  description: string;
  topicsCovered: string[];
  lessons: Lesson[];
}

export interface ProblemLabStep {
  stepNumber: number;
  title: string;
  instruction: string;
  content: string;
  studentActionType: 'INPUT_SELECT' | 'PATTERN_TEXT' | 'CODE_FILL' | 'TRACE_VERIFY' | 'COMPLEXITY_SELECT';
  actionData: any;
}

export interface ProblemLabItem {
  id: string;
  title: string;
  difficulty: 'FOUNDATION' | 'INTERMEDIATE' | 'GIU_EXAM';
  description: string;
  inputSpecification: string;
  outputSpecification: string;
  manualTestCases: { input: string; output: string; rationale: string }[];
  patternNotes: string;
  pseudocode: string[];
  cTranslation: string;
  complexity: { time: string; space: string; explanation: string };
  steps: ProblemLabStep[];
}

export interface StudentMasteryRecord {
  lessonId: string;
  level: MasteryLevel;
  totalAttempts: number;
  successfulAttempts: number;
  hintUsageCount: number;
  lastStudiedAt: string;
  encounteredMisconceptions: string[];
  quizScore?: number;
}
