import { MasteryLevel, StudentMasteryRecord, ObjectiveEvidence, ObjectiveCategory } from '../types/curriculum';

const STORAGE_KEY = 'cs1_companion_mastery_v2';

export function loadMasteryRecords(): Record<string, StudentMasteryRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultRecords();
    return JSON.parse(raw);
  } catch {
    return getDefaultRecords();
  }
}

export function saveMasteryRecords(records: Record<string, StudentMasteryRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save mastery records:', e);
  }
}

export function resetAllMasteryData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset mastery data:', e);
  }
}

export function recordExerciseAttempt(
  lessonId: string,
  isCorrect: boolean,
  hintsUsed: number,
  objectiveId?: string,
  cognitiveCategory?: ObjectiveCategory,
  misconceptionId?: string
): StudentMasteryRecord {
  const records = loadMasteryRecords();
  const current: StudentMasteryRecord = records[lessonId] || {
    lessonId,
    level: 'NOT_STARTED',
    totalAttempts: 0,
    successfulAttempts: 0,
    hintUsageCount: 0,
    lastStudiedAt: new Date().toISOString(),
    encounteredMisconceptions: [],
    objectiveEvidence: {},
  };

  current.totalAttempts += 1;
  if (isCorrect) current.successfulAttempts += 1;
  current.hintUsageCount += hintsUsed;
  current.lastStudiedAt = new Date().toISOString();

  if (misconceptionId && !current.encounteredMisconceptions.includes(misconceptionId)) {
    current.encounteredMisconceptions.push(misconceptionId);
  }

  // Update objective-level evidence if objectiveId is specified
  if (objectiveId) {
    if (!current.objectiveEvidence) {
      current.objectiveEvidence = {};
    }
    const evidence: ObjectiveEvidence = current.objectiveEvidence[objectiveId] || {
      objectiveId,
      recallPassed: false,
      tracingPassed: false,
      applicationPassed: false,
      problemSolvingPassed: false,
      totalAttempts: 0,
      successfulAttempts: 0,
      mastered: false,
    };

    evidence.totalAttempts += 1;
    if (isCorrect) {
      evidence.successfulAttempts += 1;
      if (cognitiveCategory === 'RECALL') evidence.recallPassed = true;
      if (cognitiveCategory === 'TRACING') evidence.tracingPassed = true;
      if (cognitiveCategory === 'APPLICATION') evidence.applicationPassed = true;
      if (cognitiveCategory === 'PROBLEM_SOLVING') evidence.problemSolvingPassed = true;
    }

    // STRICT PEDAGOGICAL MASTERY RULE:
    // Recognition (Recall) alone NEVER establishes mastery.
    // Mastery requires validated evidence across at least TWO distinct cognitive categories,
    // including either Tracing or Application/Problem Solving, with overall accuracy >= 75%.
    const categoriesPassed = [
      evidence.recallPassed,
      evidence.tracingPassed,
      evidence.applicationPassed,
      evidence.problemSolvingPassed,
    ].filter(Boolean).length;

    const rigorousApplicationOrTrace = evidence.tracingPassed || evidence.applicationPassed || evidence.problemSolvingPassed;
    const accuracy = evidence.totalAttempts > 0 ? evidence.successfulAttempts / evidence.totalAttempts : 0;

    evidence.mastered = categoriesPassed >= 2 && rigorousApplicationOrTrace && accuracy >= 0.75;
    current.objectiveEvidence[objectiveId] = evidence;
  }

  // Determine overall lesson mastery level
  const totalObjCount = current.objectiveEvidence ? Object.keys(current.objectiveEvidence).length : 0;
  const masteredObjCount = current.objectiveEvidence
    ? Object.values(current.objectiveEvidence).filter((o) => o.mastered).length
    : 0;

  const overallAccuracy = current.totalAttempts > 0 ? current.successfulAttempts / current.totalAttempts : 0;

  if (totalObjCount > 0 && masteredObjCount === totalObjCount && current.hintUsageCount <= totalObjCount * 2) {
    current.level = 'MASTERED';
  } else if (current.totalAttempts >= 3 && overallAccuracy < 0.45) {
    current.level = 'NEEDS_REVIEW';
  } else if (current.successfulAttempts > 0) {
    current.level = 'PRACTICING';
  } else {
    current.level = 'LEARNING';
  }

  records[lessonId] = current;
  saveMasteryRecords(records);
  return current;
}

export function markLessonStudied(lessonId: string): void {
  const records = loadMasteryRecords();
  if (!records[lessonId] || records[lessonId].level === 'NOT_STARTED') {
    records[lessonId] = {
      lessonId,
      level: 'LEARNING',
      totalAttempts: 0,
      successfulAttempts: 0,
      hintUsageCount: 0,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: [],
      objectiveEvidence: {},
    };
    saveMasteryRecords(records);
  }
}

// Clean state for fresh student: ZERO fake/pre-seeded records
function getDefaultRecords(): Record<string, StudentMasteryRecord> {
  return {};
}

// Diagnostic helper: Only returns real, recorded student facts
export function getStudentDiagnostics(): {
  hasRecordedData: boolean;
  totalAttempts: number;
  successfulAttempts: number;
  overallAccuracyPct: number;
  totalHintsUsed: number;
  actuallyEncounteredMisconceptions: string[];
  masteredObjectivesCount: number;
  totalTrackedObjectivesCount: number;
} {
  const records = loadMasteryRecords();
  const recordsList = Object.values(records);

  const totalAttempts = recordsList.reduce((acc, r) => acc + r.totalAttempts, 0);
  const successfulAttempts = recordsList.reduce((acc, r) => acc + r.successfulAttempts, 0);
  const totalHintsUsed = recordsList.reduce((acc, r) => acc + r.hintUsageCount, 0);

  const misconceptionsSet = new Set<string>();
  let masteredObjectivesCount = 0;
  let totalTrackedObjectivesCount = 0;

  recordsList.forEach((r) => {
    r.encounteredMisconceptions.forEach((m) => misconceptionsSet.add(m));
    if (r.objectiveEvidence) {
      Object.values(r.objectiveEvidence).forEach((o) => {
        totalTrackedObjectivesCount += 1;
        if (o.mastered) masteredObjectivesCount += 1;
      });
    }
  });

  return {
    hasRecordedData: totalAttempts > 0,
    totalAttempts,
    successfulAttempts,
    overallAccuracyPct: totalAttempts > 0 ? Math.round((successfulAttempts / totalAttempts) * 100) : 0,
    totalHintsUsed,
    actuallyEncounteredMisconceptions: Array.from(misconceptionsSet),
    masteredObjectivesCount,
    totalTrackedObjectivesCount,
  };
}
