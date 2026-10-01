export type MasteryLevel = 'NOT_STARTED' | 'LEARNING' | 'PRACTICING' | 'NEEDS_REVIEW' | 'MASTERED';

export type ExerciseDifficulty = 'FOUNDATION' | 'APPLICATION' | 'GIU_LEVEL' | 'CHALLENGE';

export type ObjectiveCategory = 'RECALL' | 'TRACING' | 'APPLICATION' | 'PROBLEM_SOLVING';

export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'PREDICT_OUTPUT'
  | 'TRACE_TABLE'
  | 'FIND_THE_ERROR'
  | 'FILL_BLANK_CODE'
  | 'BINARY_CONVERSION'
  | 'TRUTH_TABLE';

export interface LearningObjective {
  id: string;
  statement: string;
  category: ObjectiveCategory;
}

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
  triggerCondition: string; // e.g., 'chose option A' or 'off-by-one'
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
  objectiveId?: string; // Links directly to specific LearningObjective
  cognitiveLevel?: ObjectiveCategory; // 'RECALL' | 'TRACING' | 'APPLICATION' | 'PROBLEM_SOLVING'
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
  hints: string[]; // Progressive Socratic hints (Hint 1 guiding question, Hint 2 concept pointer, Hint 3 breakdown)
  explanation: string;
  misconceptions: Misconception[];
}

// Pedagogical progression strictly following:
// intuition -> concrete example -> student prediction -> formal concept -> worked example -> independent application
export type LessonStage =
  | 'INTUITION'
  | 'CONCRETE_EXAMPLE'
  | 'PREDICTION'
  | 'FORMAL_CONCEPT'
  | 'WORKED_EXAMPLE'
  | 'INDEPENDENT_APPLICATION';

export interface LessonContent {
  intuitionWhy: string; // Everyday intuitive scenario before jargon
  concreteExample: {
    scenario: string;
    walkthrough: string[];
    keyObservation: string;
  };
  predictionChallenge: {
    code: string[];
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  conceptSummary: string; // Formal definitions and mathematical/algorithmic properties
  keyTerminology: { term: string; definition: string }[];
  algorithmPresetId?: string; // Links to interactive visualizer preset
  demonstrationNotes: string;
  guidedExample: {
    problemStatement: string;
    thoughtProcess: string[];
    pseudocode: string[];
    tracingTable: { step: number; line: string; vars: string; output: string }[];
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
  objectives: LearningObjective[]; // Formal structured learning objectives
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
  category: 'SEQUENCE' | 'VARIABLES' | 'CONDITIONS' | 'COUNTERS' | 'ACCUMULATORS' | 'LOOPS' | 'INVARIANTS';
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

export interface ObjectiveEvidence {
  objectiveId: string;
  recallPassed: boolean;
  tracingPassed: boolean;
  applicationPassed: boolean;
  problemSolvingPassed: boolean;
  totalAttempts: number;
  successfulAttempts: number;
  mastered: boolean;
}

export interface StudentMasteryRecord {
  lessonId: string;
  level: MasteryLevel;
  totalAttempts: number;
  successfulAttempts: number;
  hintUsageCount: number;
  lastStudiedAt: string;
  encounteredMisconceptions: string[];
  objectiveEvidence?: Record<string, ObjectiveEvidence>;
  quizScore?: number;
}
