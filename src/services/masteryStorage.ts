import { MasteryLevel, StudentMasteryRecord } from '../types/curriculum';

const STORAGE_KEY = 'cs1_companion_mastery_v1';

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

export function recordExerciseAttempt(
  lessonId: string,
  isCorrect: boolean,
  hintsUsed: number,
  misconceptionId?: string
): StudentMasteryRecord {
  const records = loadMasteryRecords();
  const current = records[lessonId] || {
    lessonId,
    level: 'NOT_STARTED',
    totalAttempts: 0,
    successfulAttempts: 0,
    hintUsageCount: 0,
    lastStudiedAt: new Date().toISOString(),
    encounteredMisconceptions: [],
  };

  current.totalAttempts += 1;
  if (isCorrect) current.successfulAttempts += 1;
  current.hintUsageCount += hintsUsed;
  current.lastStudiedAt = new Date().toISOString();

  if (misconceptionId && !current.encounteredMisconceptions.includes(misconceptionId)) {
    current.encounteredMisconceptions.push(misconceptionId);
  }

  // Calculate mastery level based on rigorous evidence
  // Mastery requires at least 3 attempts, >= 80% accuracy, and low hint usage
  const accuracy = current.totalAttempts > 0 ? current.successfulAttempts / current.totalAttempts : 0;
  
  if (current.totalAttempts >= 3 && accuracy >= 0.8 && current.hintUsageCount <= 2) {
    current.level = 'MASTERED';
  } else if (current.totalAttempts >= 2 && accuracy < 0.5) {
    current.level = 'NEEDS_REVIEW';
  } else if (current.totalAttempts >= 1) {
    current.level = current.successfulAttempts > 0 ? 'PRACTICING' : 'LEARNING';
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
    };
    saveMasteryRecords(records);
  }
}

function getDefaultRecords(): Record<string, StudentMasteryRecord> {
  // Pre-seed initial state so UI is informative on first launch
  return {
    'les-1': {
      lessonId: 'les-1',
      level: 'PRACTICING',
      totalAttempts: 2,
      successfulAttempts: 2,
      hintUsageCount: 1,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: [],
    },
    'les-2': {
      lessonId: 'les-2',
      level: 'LEARNING',
      totalAttempts: 1,
      successfulAttempts: 1,
      hintUsageCount: 0,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: [],
    },
    'les-3': {
      lessonId: 'les-3',
      level: 'LEARNING',
      totalAttempts: 1,
      successfulAttempts: 0,
      hintUsageCount: 2,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: ['misc-mod-as-division'],
    },
    'les-4': {
      lessonId: 'les-4',
      level: 'NOT_STARTED',
      totalAttempts: 0,
      successfulAttempts: 0,
      hintUsageCount: 0,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: [],
    },
    'les-5': {
      lessonId: 'les-5',
      level: 'NOT_STARTED',
      totalAttempts: 0,
      successfulAttempts: 0,
      hintUsageCount: 0,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: [],
    },
    'les-6': {
      lessonId: 'les-6',
      level: 'NOT_STARTED',
      totalAttempts: 0,
      successfulAttempts: 0,
      hintUsageCount: 0,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: [],
    },
    'les-7': {
      lessonId: 'les-7',
      level: 'NEEDS_REVIEW',
      totalAttempts: 3,
      successfulAttempts: 1,
      hintUsageCount: 4,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: ['misc-off-by-one-inclusive'],
    },
    'les-8': {
      lessonId: 'les-8',
      level: 'LEARNING',
      totalAttempts: 1,
      successfulAttempts: 0,
      hintUsageCount: 2,
      lastStudiedAt: new Date().toISOString(),
      encounteredMisconceptions: ['misc-loop-scope'],
    }
  };
}
