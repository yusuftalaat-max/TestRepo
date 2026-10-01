import { Exercise } from '../types/curriculum';

export const EXERCISE_BANK: Exercise[] = [
  // ==========================================
  // MODULE 1: Problems & Algorithms
  // ==========================================

  // Lesson 1 Exercises
  {
    id: 'ex-m1-1',
    moduleId: 'mod-1',
    lessonId: 'les-1',
    objectiveId: 'obj-m1-l1-def',
    cognitiveLevel: 'RECALL',
    title: 'Algorithm vs Heuristic Definition',
    objective: 'Distinguish between an unambiguous algorithm and a vague procedure.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'Which of the following descriptions satisfies the formal definition of an algorithm in Computer Science?',
    options: [
      'A set of approximate rules of thumb that usually produces acceptable answers in most human scenarios.',
      'An ordered, finite sequence of unambiguous, deterministic instructions that terminates and produces an output for valid inputs.',
      'Any computer program written specifically in the C programming language.',
      'A mathematical equation that solves a problem in zero execution time.'
    ],
    correctAnswer: 1,
    hints: [
      'Think about what a computer needs: can a machine evaluate "add a pinch of salt until it tastes good"?',
      'Recall Donald Knuth\'s five criteria: Finiteness, Definiteness, Input, Output, and Effectiveness.',
      'An algorithm is completely language-independent and guaranteed to finish in a finite number of deterministic steps.'
    ],
    explanation: 'An algorithm must be finite (must terminate) and definite (each step is precisely defined with no ambiguity). It is independent of specific languages like C or arbitrary speeds.',
    misconceptions: [
      {
        id: 'misc-lang-dependent',
        triggerCondition: 'chose option 2',
        name: 'Language Conflation',
        description: 'Believing an algorithm is tied to a specific language like C.',
        remedyHint: 'Algorithms are logical blueprints that exist before any code is written.'
      },
      {
        id: 'misc-heuristic-confuse',
        triggerCondition: 'chose option 0',
        name: 'Heuristic Confusion',
        description: 'Confusing approximate heuristics with deterministic algorithms.',
        remedyHint: 'Heuristics are guesses or rules of thumb; algorithms are guaranteed deterministic procedures.'
      }
    ]
  },
  {
    id: 'ex-m1-1-trace',
    moduleId: 'mod-1',
    lessonId: 'les-1',
    objectiveId: 'obj-m1-l1-trace',
    cognitiveLevel: 'TRACING',
    title: 'Sequential State Transformation Tracing',
    objective: 'Trace temporal state transitions and variable values across sequential steps.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Carefully trace the sequential state transformations below. What is the value of variable `m` after line 4 finishes?\n\n1. k ← 6\n2. m ← k * 3\n3. k ← k + 2\n4. m ← m - k',
    codeSnippet: 'k ← 6\nm ← k * 3\nk ← k + 2\nm ← m - k',
    options: ['10', '18', '8', '12'],
    correctAnswer: 0, // '10'
    hints: [
      'Follow the sequence line-by-line. Write down the values of k and m at each step on paper.',
      'After Line 2: k = 6, m = 6 * 3 = 18. What happens on Line 3 to k?',
      'Line 3 updates k: k becomes 6 + 2 = 8. Now calculate Line 4: m ← 18 - 8.'
    ],
    explanation: 'Line 1: k = 6. Line 2: m = 18. Line 3: k becomes 8. Line 4: m becomes 18 - 8 = 10.',
    misconceptions: [
      {
        id: 'misc-stale-variable',
        triggerCondition: 'chose option 3',
        name: 'Stale Variable Lookup',
        description: 'Using the old value of k (6) instead of the newly updated value (8) on line 4.',
        remedyHint: 'Remember that when line 4 runs, line 3 has already updated k to 8!'
      }
    ]
  },
  {
    id: 'ex-m1-1-app',
    moduleId: 'mod-1',
    lessonId: 'les-1',
    objectiveId: 'obj-m1-l1-prop',
    cognitiveLevel: 'APPLICATION',
    title: 'Identifying Violations of Algorithmic Properties',
    objective: 'Verify whether a proposed procedure satisfies formal algorithmic properties.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A student writes the following procedure to compute division of two positive integers `a` and `b` by repeated subtraction:\n\n1. READ a, b\n2. count ← 0\n3. WHILE a > 0 DO\n4.     a ← a - b\n5. END WHILE\n6. PRINT count\n\nWhich essential property of an algorithm is violated when input a = 7 and b = 2?',
    codeSnippet: '1. READ a, b\n2. count ← 0\n3. WHILE a > 0 DO\n4.     a ← a - b\n5. END WHILE\n6. PRINT count',
    options: [
      'Definiteness: subtracting b is mathematically undefined.',
      'Finiteness: when a = 7 and b = 2, `a` becomes 7 → 5 → 3 → 1 → -1, so `a > 0` becomes false and it terminates; but count was never updated, violating Output correctness.',
      'Finiteness: the algorithm never terminates for any input.',
      'Effectiveness: subtraction is too complex for a processor.'
    ],
    correctAnswer: 1,
    hints: [
      'Trace the value of `a`: starts at 7, minus 2 is 5, minus 2 is 3, minus 2 is 1, minus 2 is -1.',
      'Does the loop terminate? Yes, when a = -1. But what is printed for `count`?',
      'Count remains 0 because the author forgot to count the subtractions, producing an incorrect, non-effective output.'
    ],
    explanation: 'The loop terminates when a reaches -1, but the author completely forgot to increment `count ← count + 1`, meaning the procedure never actually computes the quotient.',
    misconceptions: [
      {
        id: 'misc-termination-blindness',
        triggerCondition: 'chose option 2',
        name: 'Termination Assumption',
        description: 'Assuming a loop never terminates without tracing the actual values.',
        remedyHint: 'Trace `a` explicitly: 7, 5, 3, 1, -1. -1 > 0 is FALSE, so the loop DOES terminate.'
      }
    ]
  },
  {
    id: 'ex-m1-1-ps',
    moduleId: 'mod-1',
    lessonId: 'les-1',
    objectiveId: 'obj-m1-l1-prop',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Designing Unambiguous Computational Steps',
    objective: 'Formulate unambiguous computational steps for a multi-variable problem.',
    difficulty: 'GIU_LEVEL',
    type: 'FILL_BLANK_CODE',
    question: 'To calculate the total cost of purchasing `n` items at unit price `p` with a 15% discount applied only if the total exceeds $100, which pseudocode block is completely correct and unambiguous?',
    options: [
      'cost ← n * p; IF cost > 100 THEN cost ← cost * 0.85; PRINT cost',
      'cost ← n * p; cost ← cost - 15%; PRINT cost',
      'IF n * p > 100 THEN discount = 15; PRINT n * p - discount',
      'cost ← (n * p) * 0.15; PRINT cost'
    ],
    correctAnswer: 0,
    hints: [
      'In computational expressions, percentages like 15% must be written as arithmetic factors (e.g. 0.85 or cost * 15 / 100).',
      'The discount is conditional: it must only apply when `cost > 100`.',
      'Subtracting 15% means the final amount is 85% of original (cost * 0.85).'
    ],
    explanation: 'Option 1 correctly computes gross cost first, tests the threshold (> 100), and applies the 15% discount multiplier (0.85). Option 2 uses invalid syntax (15%), and Option 4 only calculates the discount amount without subtracting.',
    misconceptions: [
      {
        id: 'misc-percentage-literal',
        triggerCondition: 'chose option 1',
        name: 'Percentage Notation Literal',
        description: 'Assuming `%` in programming stands for mathematical percentage rather than modulo.',
        remedyHint: 'In programming, `%` is the modulo operator, not percentage! 15% discount is calculated as cost * 0.85.'
      }
    ]
  },
  {
    id: 'ex-m1-1-inf',
    moduleId: 'mod-1',
    lessonId: 'les-1',
    objectiveId: 'obj-m1-l1-prop',
    cognitiveLevel: 'APPLICATION',
    title: 'Finiteness & Termination Analysis',
    objective: 'Verify whether a proposed procedure satisfies the Finiteness property for all valid inputs.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'Consider this proposed algorithm designed to count down from positive integer `N` to 0:\n\n1. READ N\n2. WHILE N ≠ 0 DO\n3.     N ← N - 2\n4. END WHILE\n5. PRINT "Done"\n\nFor which initial value of N does this procedure violate the Finiteness property of an algorithm?',
    options: ['N = 8', 'N = 10', 'N = 7', 'N = 4'],
    correctAnswer: 2,
    hints: [
      'Trace what happens to N when N starts at 7: 7 - 2 = 5, 5 - 2 = 3, 3 - 2 = 1...',
      'What happens on the next step: 1 - 2 = -1. Does N ever equal 0?',
      'Because N becomes -1, -3, -5..., it bypasses 0 entirely and loops forever!'
    ],
    explanation: 'When N is odd (such as 7), subtracting 2 repeatedly yields 5, 3, 1, -1, -3... The condition `N ≠ 0` is NEVER false, so the procedure runs infinitely, violating Finiteness.',
    misconceptions: [
      {
        id: 'misc-odd-parity-oversight',
        triggerCondition: 'chose option 0',
        name: 'Even Parity Assumption',
        description: 'Assuming the step size of 2 will land exactly on 0 for all numbers without checking odd inputs.',
        remedyHint: 'Always test odd and even numbers when an algorithm decrements by steps greater than 1!'
      }
    ]
  },
  {
    id: 'ex-m1-1-steps',
    moduleId: 'mod-1',
    lessonId: 'les-1',
    objectiveId: 'obj-m1-l1-trace',
    cognitiveLevel: 'TRACING',
    title: 'In-Place Arithmetic Swap Tracing',
    objective: 'Hand-trace complex mathematical transformations across sequential instructions.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the exact sequential state transformations with initial inputs a = 4, b = 5:\n\n1. a ← a + b\n2. b ← a - b\n3. a ← a - b\n\nWhat are the values of variables `a` and `b` after line 3 completes?',
    options: ['a = 4, b = 5', 'a = 5, b = 4', 'a = 9, b = 9', 'a = 0, b = 0'],
    correctAnswer: 1,
    hints: [
      'Trace line-by-line: Line 1 sets `a ← 4 + 5 = 9`. What is b at this moment? b is still 5.',
      'Line 2 sets `b ← a - b = 9 - 5 = 4`. What does variable b now hold?',
      'Line 3 sets `a ← a - b = 9 - 4 = 5`. The original values of a and b have swapped!'
    ],
    explanation: 'Line 1: a becomes 9. Line 2: b becomes 9 - 5 = 4. Line 3: a becomes 9 - 4 = 5. This clever algorithm achieves a swap purely through arithmetic without any temporary variable.',
    misconceptions: [
      {
        id: 'misc-static-subtraction',
        triggerCondition: 'chose option 0',
        name: 'Static Algebra Assumption',
        description: 'Treating lines as simultaneous equations rather than sequential updates.',
        remedyHint: 'Remember that on line 2, `a` is 9, not its original 4!'
      }
    ]
  },

  // Lesson 2 Exercises
  {
    id: 'ex-m1-2',
    moduleId: 'mod-1',
    lessonId: 'les-2',
    objectiveId: 'obj-m1-l2-assign',
    cognitiveLevel: 'RECALL',
    title: 'Destructive Nature of Memory Assignment',
    objective: 'Explain the destructive nature of variable assignment in memory cells.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'When the statement `score ← 95` executes in a computer program, what happens to the previous value (e.g. 80) that was stored in `score`?',
    options: [
      'It is automatically archived in an undo stack in case the program needs it later.',
      'It is permanently overwritten and destroyed in that memory cell.',
      'It is added to 95 to create a cumulative score of 175.',
      'It is moved to a backup variable named `old_score`.'
    ],
    correctAnswer: 1,
    hints: [
      'Think of writing over a whiteboard marker box: erasing and writing a new number.',
      'Computer RAM cells hold only ONE value at any given moment.',
      'Assignment is destructive: the old data is erased completely unless you manually copied it elsewhere.'
    ],
    explanation: 'Computer memory cells store only one value at a time. The assignment operation is destructive: the old value is overwritten and permanently lost.',
    misconceptions: [
      {
        id: 'misc-undo-fallacy',
        triggerCondition: 'chose option 0',
        name: 'Undo Stack Fallacy',
        description: 'Believing memory automatically preserves prior variable values.',
        remedyHint: 'Memory hardware has no automatic history. If you need an older value, you must store it in another variable yourself!'
      }
    ]
  },
  {
    id: 'ex-m1-2-trace',
    moduleId: 'mod-1',
    lessonId: 'les-2',
    objectiveId: 'obj-m1-l2-trace',
    cognitiveLevel: 'TRACING',
    title: 'Multi-Variable Mutation Tracing',
    objective: 'Hand-trace multi-variable sequential mutations across multiple memory cells.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the variables sequentially on paper. What are the final values of `x` and `y` after this sequence?\n\n1. x ← 10\n2. y ← 25\n3. x ← y - x\n4. y ← y - x',
    codeSnippet: 'x ← 10\ny ← 25\nx ← y - x\ny ← y - x',
    options: [
      'x = 15, y = 10',
      'x = 15, y = 25',
      'x = 10, y = 15',
      'x = 25, y = 10'
    ],
    correctAnswer: 0,
    hints: [
      'Line 1: x = 10. Line 2: y = 25.',
      'Line 3: x ← 25 - 10 = 15. Now x is 15!',
      'Line 4 uses current x (15) and current y (25): y ← 25 - 15 = 10.'
    ],
    explanation: 'Line 3 computes x = 25 - 10 = 15. Line 4 computes y = 25 - 15 = 10. So x = 15 and y = 10.',
    misconceptions: [
      {
        id: 'misc-simultaneous-eval',
        triggerCondition: 'chose option 2',
        name: 'Simultaneous Evaluation',
        description: 'Assuming y is not affected by the updated x value.',
        remedyHint: 'Lines execute in temporal order. When line 4 runs, x is ALREADY 15.'
      }
    ]
  },
  {
    id: 'ex-m1-2-app',
    moduleId: 'mod-1',
    lessonId: 'les-2',
    objectiveId: 'obj-m1-l2-swap',
    cognitiveLevel: 'APPLICATION',
    title: 'Flawed Variable Swap Bug Diagnosis',
    objective: 'Formulate and verify the 3-step temporary variable swap pattern.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A student attempts to swap two values `a = 3` and `b = 7` using this code:\n\n1. a ← b\n2. temp ← a\n3. b ← temp\n\nWhat is the state of `a` and `b` after execution, and why did the swap fail?',
    codeSnippet: '1. a ← b\n2. temp ← a\n3. b ← temp',
    options: [
      'Both a and b become 7 because line 1 destroyed the original value of a before copying it.',
      'Both a and b become 3 because temp was initialized improperly.',
      'a = 7 and b = 3; the swap succeeded.',
      'Syntax error on line 2.'
    ],
    correctAnswer: 0,
    hints: [
      'Look at line 1: `a ← b`. What happened to the 3 that was in `a`?',
      'Since `a` was overwritten with 7 immediately, line 2 copies 7 into `temp`.',
      'To preserve `a`, `temp ← a` MUST happen before `a` is modified!'
    ],
    explanation: 'Line 1 immediately destroys the 3 stored in `a`. Line 2 copies 7 into temp, and line 3 puts 7 into b. Both end up as 7.',
    misconceptions: [
      {
        id: 'misc-swap-order',
        triggerCondition: 'chose option 2',
        name: 'Swap Order Confusion',
        description: 'Failing to see that the backup must be made before the target is overwritten.',
        remedyHint: 'Always backup first: temp ← a, then overwrite: a ← b, then restore: b ← temp.'
      }
    ]
  },
  {
    id: 'ex-m1-2-ps',
    moduleId: 'mod-1',
    lessonId: 'les-2',
    objectiveId: 'obj-m1-l2-swap',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Three-Way Circular Rotation Pattern',
    objective: 'Extend the swap pattern to circularly rotate three variables (a → b → c → a).',
    difficulty: 'GIU_LEVEL',
    type: 'FILL_BLANK_CODE',
    question: 'You are given three variables a, b, and c. You need to shift their values circularly such that `a` gets the original `c`, `b` gets the original `a`, and `c` gets the original `b`. Which sequence achieves this without losing any value?',
    options: [
      'temp ← c; c ← b; b ← a; a ← temp',
      'a ← c; b ← a; c ← b',
      'temp ← a; a ← b; b ← c; c ← temp',
      'temp ← b; b ← a; a ← c; c ← temp'
    ],
    correctAnswer: 0,
    hints: [
      'Trace option 1: If original values are a=1, b=2, c=3.',
      'temp gets 3. Then c gets b (2). Then b gets a (1). Then a gets temp (3).',
      'Check final values: a=3 (old c), b=1 (old a), c=2 (old b). Exactly as required!'
    ],
    explanation: 'Option 1 safely backs up c into temp, copies b into c, copies a into b, and finishes by writing temp (original c) into a.',
    misconceptions: [
      {
        id: 'misc-circular-overwrite',
        triggerCondition: 'chose option 1',
        name: 'Cascade Overwrite',
        description: 'Attempting rotation without temp causes cascading destruction of values.',
        remedyHint: 'At least one temporary storage is required when performing circular state shifts.'
      }
    ]
  },
  {
    id: 'ex-m1-2-mut',
    moduleId: 'mod-1',
    lessonId: 'les-2',
    objectiveId: 'obj-m1-l2-trace',
    cognitiveLevel: 'TRACING',
    title: 'Cascading Overwrite Multi-Variable Trace',
    objective: 'Hand-trace multi-variable sequential mutations across multiple memory cells.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the memory values of variables x, y, and z across these sequential statements:\n\n1. x ← 12\n2. y ← 4\n3. z ← x / y\n4. x ← z * 2\n5. y ← x + z\n6. z ← x + y + z\n\nWhat is the final value stored in variable z?',
    options: ['15', '21', '18', '24'],
    correctAnswer: 1,
    hints: [
      'Trace line-by-line: Line 3 computes z = 12 / 4 = 3.',
      'Line 4 overwrites x: x becomes 3 * 2 = 6.',
      'Line 5 overwrites y: y becomes 6 + 3 = 9. Now compute Line 6: 6 + 9 + 3.'
    ],
    explanation: 'Line 1: x = 12. Line 2: y = 4. Line 3: z = 3. Line 4: x = 6. Line 5: y = 6 + 3 = 9. Line 6: z = 6 + 9 + 3 = 21.',
    misconceptions: [
      {
        id: 'misc-initial-value-reversion',
        triggerCondition: 'chose option 0',
        name: 'Initial Value Reversion',
        description: 'Using original x=12 rather than current x=6 when computing later lines.',
        remedyHint: 'Always use the latest updated value in memory for every variable!'
      }
    ]
  },
  {
    id: 'ex-m1-2-expr',
    moduleId: 'mod-1',
    lessonId: 'les-2',
    objectiveId: 'obj-m1-l2-assign',
    cognitiveLevel: 'APPLICATION',
    title: 'Right-Hand Side Complete Evaluation Rule',
    objective: 'Demonstrate that the right-hand side of an assignment is fully evaluated before memory is overwritten.',
    difficulty: 'GIU_LEVEL',
    type: 'PREDICT_OUTPUT',
    question: 'Given integer variable `p = 8` and `q = 3`, trace this self-referential assignment:\n\n1. p ← (p + q) * (p - q)\n\nWhat value is stored into variable `p`?',
    options: ['55', '35', '64', '11'],
    correctAnswer: 0,
    hints: [
      'Evaluate the right-hand side expression completely before modifying memory cell `p`.',
      '(p + q) evaluates to 8 + 3 = 11.',
      '(p - q) evaluates to 8 - 3 = 5. Now multiply: 11 * 5.'
    ],
    explanation: 'The entire right-hand expression (8 + 3) * (8 - 3) = 11 * 5 = 55 is computed using the current value of p (8), and only then is 55 written into memory cell `p`.',
    misconceptions: [
      {
        id: 'misc-mid-expression-overwrite',
        triggerCondition: 'chose option 1',
        name: 'Mid-Expression Overwrite',
        description: 'Believing that computing (p + q) overwrites p immediately before evaluating (p - q).',
        remedyHint: 'The left-hand variable is ONLY overwritten after the entire right-hand calculation is finished!'
      }
    ]
  },

  // ==========================================
  // MODULE 2: Pseudocode & Tracing
  // ==========================================

  // Lesson 3 Exercises
  {
    id: 'ex-m2-1',
    moduleId: 'mod-2',
    lessonId: 'les-3',
    objectiveId: 'obj-m2-l3-syntax',
    cognitiveLevel: 'RECALL',
    title: 'Standard Pseudocode Keyword Conventions',
    objective: 'Identify and apply standardized pseudocode keywords.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'In standard GIU algorithmic pseudocode, which keyword is universally used to obtain input from a user or external file?',
    options: ['SCAN', 'READ (or INPUT)', 'GET_DATA_FROM_KEYBOARD', 'IMPORT'],
    correctAnswer: 1,
    hints: [
      'Think of the basic standard commands: READ (for input) and PRINT (for output).',
      'We avoid language-specific keywords like `scanf` (C) or `cin` (C++).',
      'The formal pseudocode standard uses `READ variable_name`.'
    ],
    explanation: 'Formal academic pseudocode uses `READ` (or `INPUT`) for capturing inputs, and `PRINT` (or `OUTPUT`) for displaying results.',
    misconceptions: [
      {
        id: 'misc-c-syntax-in-pseudo',
        triggerCondition: 'chose option 0',
        name: 'C Syntax in Pseudocode',
        description: 'Using C language functions (scanf, printf) in high-level pseudocode.',
        remedyHint: 'Pseudocode should remain language-independent: use READ and PRINT.'
      }
    ]
  },
  {
    id: 'ex-m2-1-trace',
    moduleId: 'mod-2',
    lessonId: 'les-3',
    objectiveId: 'obj-m2-l3-mod',
    cognitiveLevel: 'TRACING',
    title: 'Integer Division vs Modulo Arithmetic',
    objective: 'Calculate outcomes of integer division (/) and modulo (MOD) remainder operations.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Evaluate the following expressions with integer division and modulo. What is the value of `result`?\n\n1. a ← 29\n2. b ← 6\n3. q ← a / b\n4. r ← a MOD b\n5. result ← (q * 10) + r',
    codeSnippet: 'a ← 29\nb ← 6\nq ← a / b\nr ← a MOD b\nresult ← (q * 10) + r',
    options: ['45', '48.3', '40', '54'],
    correctAnswer: 0, // '45'
    hints: [
      'Calculate integer division 29 / 6: how many whole times does 6 fit into 29?',
      '6 * 4 = 24, so q = 4. What is the leftover remainder r?',
      'r = 29 - 24 = 5. Now calculate result: (4 * 10) + 5 = 45.'
    ],
    explanation: '29 / 6 in integer arithmetic is 4. 29 MOD 6 is 5. (4 * 10) + 5 = 45.',
    misconceptions: [
      {
        id: 'misc-mod-as-float',
        triggerCondition: 'chose option 1',
        name: 'Floating Point Assumption',
        description: 'Treating 29 / 6 as 4.83 instead of truncating to the integer 4.',
        remedyHint: 'Integer division drops all decimal points completely: 29 / 6 = 4.'
      }
    ]
  },
  {
    id: 'ex-m2-1-app',
    moduleId: 'mod-2',
    lessonId: 'les-3',
    objectiveId: 'obj-m2-l3-mod',
    cognitiveLevel: 'APPLICATION',
    title: 'Extracting Digits via Integer Arithmetic',
    objective: 'Use integer division and MOD to extract digits from a 3-digit number.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'An engineer wants to extract the middle tens digit of a 3-digit positive integer `num = 374` (so the answer should be 7). Consider four formulas:\n\n1. (num / 10) MOD 10\n2. (num MOD 100) / 10\n3. num MOD 10\n4. num / 100\n\nWhich of these correctly produce 7 for all 3-digit integers?',
    options: [
      'Both Formula 1 and Formula 2 are correct',
      'Only Formula 1 is correct',
      'Only Formula 3 is correct',
      'Formula 4 is correct'
    ],
    correctAnswer: 0,
    hints: [
      'Test Formula 1: 374 / 10 = 37. 37 MOD 10 = 7. Correct!',
      'Test Formula 2: 374 MOD 100 = 74. 74 / 10 = 7. Correct!',
      'Notice that both approaches successfully isolate the tens digit.'
    ],
    explanation: 'Formula 1 strips the units digit first (374 / 10 = 37) then takes remainder 7. Formula 2 strips the hundreds first (374 MOD 100 = 74) then divides by 10 to get 7. Both are mathematically sound.',
    misconceptions: [
      {
        id: 'misc-units-vs-tens',
        triggerCondition: 'chose option 2',
        name: 'Units Confusion',
        description: 'Assuming num MOD 10 extracts the tens digit instead of the units digit.',
        remedyHint: 'num MOD 10 yields the last digit (4), not the tens digit (7).'
      }
    ]
  },
  {
    id: 'ex-m2-1-ps',
    moduleId: 'mod-2',
    lessonId: 'les-3',
    objectiveId: 'obj-m2-l3-trans',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Translating Change-Making Specifications',
    objective: 'Translate cash register denomination breakdown into structured pseudocode.',
    difficulty: 'GIU_LEVEL',
    type: 'FILL_BLANK_CODE',
    question: 'Given an amount in dollars (e.g. $87), write pseudocode to determine how many $20 bills and remaining dollars are required. What are the correct two operations?',
    options: [
      'twenties ← amount / 20; remDollars ← amount MOD 20',
      'twenties ← amount MOD 20; remDollars ← amount / 20',
      'twenties ← amount * 20; remDollars ← amount - 20',
      'twenties ← amount / 20; remDollars ← amount - twenties'
    ],
    correctAnswer: 0,
    hints: [
      'How many whole $20 bills fit into $87? 87 / 20 = 4 bills ($80).',
      'What is left over? 87 MOD 20 = $7.',
      'Integer division gives the count of bills, and MOD gives the remaining change.'
    ],
    explanation: '`amount / 20` yields the number of $20 bills, and `amount MOD 20` gives the exact leftover amount.',
    misconceptions: [
      {
        id: 'misc-div-mod-swap',
        triggerCondition: 'chose option 1',
        name: 'Division and Modulo Inversion',
        description: 'Inverting the quotient and remainder operators.',
        remedyHint: 'Division (/) yields the count of whole items; Modulo (MOD) yields the leftover remainder.'
      }
    ]
  },
  {
    id: 'ex-m2-1-prec',
    moduleId: 'mod-2',
    lessonId: 'les-3',
    objectiveId: 'obj-m2-l3-mod',
    cognitiveLevel: 'TRACING',
    title: 'Operator Precedence & Integer Truncation',
    objective: 'Calculate outcomes of integer division and modulo with operator precedence.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'In standard computer arithmetic, multiplication (*), division (/), and modulo (MOD) share equal precedence (higher than addition and subtraction) and evaluate left-to-right. What is the value of this expression:\n\nresult ← 25 - 7 * 3 + 18 MOD 5 / 2',
    options: ['5', '2', '4', '7'],
    correctAnswer: 0,
    hints: [
      'Perform high-precedence operations (*, /, MOD) first left-to-right:',
      '7 * 3 = 21. Next, 18 MOD 5 = 3. Next, 3 / 2 (integer division) = 1.',
      'Now perform addition and subtraction left-to-right: 25 - 21 + 1 = 4 + 1 = 5.'
    ],
    explanation: 'First, 7 * 3 = 21. Next, 18 MOD 5 = 3. Next, 3 / 2 (integer division) = 1. Finally, 25 - 21 + 1 = 4 + 1 = 5.',
    misconceptions: [
      {
        id: 'misc-precedence-linear',
        triggerCondition: 'chose option 1',
        name: 'Linear Left-to-Right Evaluation',
        description: 'Ignoring precedence and evaluating operations strictly from left to right.',
        remedyHint: 'Multiplication, division, and MOD must always be computed before addition and subtraction!'
      }
    ]
  },
  {
    id: 'ex-m2-1-time',
    moduleId: 'mod-2',
    lessonId: 'les-3',
    objectiveId: 'obj-m2-l3-trans',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Seconds to Hours, Minutes, and Seconds Breakdown',
    objective: 'Translate time conversion logic into multi-step division and modulo expressions.',
    difficulty: 'GIU_LEVEL',
    type: 'FILL_BLANK_CODE',
    question: 'Given a total elapsed duration `totalSec` in seconds (e.g. 7384 seconds), which pseudocode correctly decomposes it into `hours`, `minutes`, and remaining `seconds`?',
    options: [
      'hours ← totalSec / 3600; rem ← totalSec MOD 3600; minutes ← rem / 60; seconds ← rem MOD 60',
      'hours ← totalSec / 60; minutes ← totalSec / 60; seconds ← totalSec MOD 60',
      'hours ← totalSec MOD 3600; minutes ← totalSec MOD 60; seconds ← totalSec / 60',
      'hours ← totalSec / 3600; minutes ← totalSec / 60; seconds ← totalSec MOD 3600'
    ],
    correctAnswer: 0,
    hints: [
      '1 hour contains 60 * 60 = 3600 seconds.',
      'Integer division `totalSec / 3600` computes the whole hours.',
      'The remainder `rem ← totalSec MOD 3600` holds the remaining seconds to be split into minutes (`rem / 60`) and seconds (`rem MOD 60`).'
    ],
    explanation: 'There are 3600 seconds in an hour. Integer division gives hours, the remainder is partitioned into whole 60-second minutes, and the final remainder is seconds.',
    misconceptions: [
      {
        id: 'misc-seconds-per-hour',
        triggerCondition: 'chose option 1',
        name: '60 Seconds Per Hour Fallacy',
        description: 'Dividing by 60 instead of 3600 to find hours.',
        remedyHint: 'An hour has 60 minutes and each minute has 60 seconds, so 1 hour = 3600 seconds!'
      }
    ]
  },

  // Lesson 4 Exercises
  {
    id: 'ex-m2-2',
    moduleId: 'mod-2',
    lessonId: 'les-4',
    objectiveId: 'obj-m2-l4-construct',
    cognitiveLevel: 'RECALL',
    title: 'Essential Columns of a State Trace Table',
    objective: 'Identify the structural components of an academic trace table.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'When constructing a formal state trace table for a CS1 exam, what should each row of the table represent?',
    options: [
      'A different student in the classroom.',
      'A single discrete execution step corresponding to a statement executed over time.',
      'A separate function declaration in C.',
      'Only lines that contain mathematical errors.'
    ],
    correctAnswer: 1,
    hints: [
      'A trace table tracks temporal execution.',
      'As the CPU moves from line to line, state changes.',
      'Each row records the step number, line executed, and current values of all active variables.'
    ],
    explanation: 'Each row in a trace table records the state of computation at one specific step in time as the instruction pointer advances.',
    misconceptions: [
      {
        id: 'misc-trace-scope',
        triggerCondition: 'chose option 3',
        name: 'Error-Only Tracing',
        description: 'Believing trace tables only record errors rather than complete normal execution.',
        remedyHint: 'Trace tables record every step of execution so that errors can be diagnosed.'
      }
    ]
  },
  {
    id: 'ex-m2-2-trace',
    moduleId: 'mod-2',
    lessonId: 'les-4',
    objectiveId: 'obj-m2-l4-branch',
    cognitiveLevel: 'TRACING',
    title: 'Comprehensive Trace Table Walkthrough',
    objective: 'Track instruction pointer movement and branch skipping in trace tables.',
    difficulty: 'APPLICATION',
    type: 'TRACE_TABLE',
    question: 'Trace the algorithm below for input val = 12:\n\n1. READ val\n2. IF val > 10 THEN\n3.     ans ← val * 2\n4. ELSE\n5.     ans ← val + 5\n6. END IF\n7. ans ← ans - 4\n8. PRINT ans\n\nWhat is the value of `ans` at Line 7 before line 7 executes, and what is printed at Line 8?',
    codeSnippet: '1. READ val\n2. IF val > 10 THEN\n3.     ans ← val * 2\n4. ELSE\n5.     ans ← val + 5\n6. END IF\n7. ans ← ans - 4\n8. PRINT ans',
    options: [
      'Line 7: ans = 24; Line 8 prints 20',
      'Line 7: ans = 17; Line 8 prints 13',
      'Line 7: ans = 24; Line 8 prints 24',
      'Line 7: ans = 12; Line 8 prints 8'
    ],
    correctAnswer: 0,
    hints: [
      'Line 2 checks 12 > 10 (TRUE). So Line 3 executes: ans = 12 * 2 = 24.',
      'Lines 4-5 (the ELSE block) are completely skipped!',
      'Line 7 runs unconditionally: ans ← 24 - 4 = 20. Line 8 prints 20.'
    ],
    explanation: 'Since 12 > 10 is TRUE, Line 3 executes giving ans = 24. Lines 4-5 are bypassed. Line 7 subtracts 4, yielding 20, which is printed at Line 8.',
    misconceptions: [
      {
        id: 'misc-else-run-anyway',
        triggerCondition: 'chose option 1',
        name: 'Failure to Skip ELSE',
        description: 'Executing the ELSE branch even after the IF branch ran.',
        remedyHint: 'In an IF-ELSE construct, when the IF condition is TRUE, the ELSE block is completely bypassed!'
      }
    ]
  },
  {
    id: 'ex-m2-2-app',
    moduleId: 'mod-2',
    lessonId: 'les-4',
    objectiveId: 'obj-m2-l4-debug',
    cognitiveLevel: 'APPLICATION',
    title: 'Pinpointing State Divergence in Trace Table',
    objective: 'Diagnose and locate the exact step where an algorithm fails by inspecting state tables.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A student wrote an algorithm to compute the area of a trapezoid: $Area = \\frac{a + b}{2} \\times h$. Their pseudocode is:\n\n1. READ a, b, h\n2. area ← a + b / 2.0 * h\n3. PRINT area\n\nWhen a = 4, b = 6, and h = 3, the expected mathematical area is ((4 + 6) / 2) * 3 = 15. But their code outputs 13. Which operator precedence error caused this bug?',
    codeSnippet: '1. READ a, b, h\n2. area ← a + b / 2.0 * h\n3. PRINT area',
    options: [
      'Division and multiplication have higher precedence than addition, so it computed 4 + (6 / 2.0 * 3) = 4 + 9 = 13.',
      'The variable h was not read properly.',
      'Floating point rounding error.',
      '2.0 cannot be divided into b.'
    ],
    correctAnswer: 0,
    hints: [
      'Look at line 2: `a + b / 2.0 * h`. In mathematical precedence, what evaluates first?',
      '`b / 2.0` evaluates first (6 / 2 = 3), then multiplied by h (3 * 3 = 9), then added to a (4 + 9 = 13).',
      'The addition `a + b` must be grouped in parentheses: `(a + b) / 2.0 * h`.'
    ],
    explanation: 'Due to operator precedence, `/` and `*` are evaluated before `+`. Without parentheses around `(a + b)`, only `b` was divided and multiplied, adding 4 + 9 = 13 instead of (10 / 2) * 3 = 15.',
    misconceptions: [
      {
        id: 'misc-left-to-right-precedence',
        triggerCondition: 'chose option 2',
        name: 'Left-to-Right Arithmetic Fallacy',
        description: 'Assuming math expressions always evaluate left-to-right regardless of operators.',
        remedyHint: 'Multiplication and division ALWAYS have higher precedence than addition and subtraction. Use parentheses!'
      }
    ]
  },
  {
    id: 'ex-m2-2-ps',
    moduleId: 'mod-2',
    lessonId: 'les-4',
    objectiveId: 'obj-m2-l4-debug',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Boundary Input Dry Run for Minimum of Two',
    objective: 'Test an algorithm with boundary cases where inputs are equal (a == b).',
    difficulty: 'GIU_LEVEL',
    type: 'PREDICT_OUTPUT',
    question: 'Consider this algorithm intended to print the smaller of two numbers:\n\n1. READ x, y\n2. IF x < y THEN\n3.     minVal ← x\n4. ELSE IF x > y THEN\n5.     minVal ← y\n6. END IF\n7. PRINT minVal\n\nWhat happens when the user enters equal numbers: x = 5 and y = 5?',
    codeSnippet: '1. READ x, y\n2. IF x < y THEN\n3.     minVal ← x\n4. ELSE IF x > y THEN\n5.     minVal ← y\n6. END IF\n7. PRINT minVal',
    options: [
      'Neither condition is TRUE, so minVal is never assigned any value, resulting in undefined output or crash!',
      'It prints 5 because equal numbers are handled automatically.',
      'It prints 0.',
      'It causes an infinite loop.'
    ],
    correctAnswer: 0,
    hints: [
      'Evaluate Line 2: is 5 < 5? FALSE.',
      'Evaluate Line 4: is 5 > 5? FALSE.',
      'What happens to minVal? Neither branch ran! It was never initialized.',
      'A robust algorithm must handle equality, for example using `ELSE` instead of `ELSE IF x > y`.'
    ],
    explanation: 'When x == y, both `x < y` and `x > y` evaluate to FALSE. Because there is no final catch-all `ELSE`, `minVal` remains uninitialized, demonstrating a classic boundary gap flaw.',
    misconceptions: [
      {
        id: 'misc-equality-boundary-gap',
        triggerCondition: 'chose option 1',
        name: 'Boundary Equality Gap',
        description: 'Forgetting that strict inequalities (<, >) both evaluate to FALSE when operands are equal.',
        remedyHint: 'When partitioning numbers, always ensure the equality case is handled (using <= or a final ELSE).'
      }
    ]
  },
  {
    id: 'ex-m2-2-table',
    moduleId: 'mod-2',
    lessonId: 'les-4',
    objectiveId: 'obj-m2-l4-construct',
    cognitiveLevel: 'TRACING',
    title: 'Trace Table Column Verification: Binary Parity',
    objective: 'Construct a state trace table with dedicated columns for step, line, variables, conditions, and outputs.',
    difficulty: 'APPLICATION',
    type: 'TRACE_TABLE',
    question: 'Trace this algorithm with input x = 14 using a mental trace table:\n\n1. READ x\n2. y ← 0\n3. WHILE x > 0 DO\n4.     y ← y + (x MOD 2)\n5.     x ← x / 2\n6. END WHILE\n7. PRINT y\n\nWhat does variable `y` represent and what is its final value when x = 14?',
    options: [
      'y = 3 (counts the number of 1-bits in the binary representation of 14)',
      'y = 7 (the quotient of 14 / 2)',
      'y = 0 (because 14 is an even number)',
      'y = 4 (the total number of loop iterations)'
    ],
    correctAnswer: 0,
    hints: [
      'Trace step-by-step: Initially x = 14, y = 0.',
      'Pass 1: 14 MOD 2 = 0; y = 0 + 0 = 0; x = 14 / 2 = 7.',
      'Pass 2: 7 MOD 2 = 1; y = 0 + 1 = 1; x = 7 / 2 = 3.',
      'Pass 3: 3 MOD 2 = 1; y = 1 + 1 = 2; x = 3 / 2 = 1.',
      'Pass 4: 1 MOD 2 = 1; y = 2 + 1 = 3; x = 1 / 2 = 0. Loop terminates! y = 3.'
    ],
    explanation: '14 in binary is 1110. The loop tests the least significant bit with `x MOD 2` and shifts right with `x / 2`. Variable `y` counts the 1-bits, totaling 3.',
    misconceptions: [
      {
        id: 'misc-loop-count-vs-acc',
        triggerCondition: 'chose option 3',
        name: 'Iteration Count Conflation',
        description: 'Confusing the number of times the loop ran (4) with the accumulated variable value (3).',
        remedyHint: 'Check the update statement: y only increases when (x MOD 2) is 1, not on every iteration!'
      }
    ]
  },
  {
    id: 'ex-m2-2-off',
    moduleId: 'mod-2',
    lessonId: 'les-4',
    objectiveId: 'obj-m2-l4-debug',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Diagnosing State Deviation from Trace Tables',
    objective: 'Diagnose and locate the exact step where an algorithm fails by inspecting state tables.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'An engineer attempts to compute the roots of ax² + bx + c = 0. In their trace table, they notice `disc` becomes negative for 2x² + 3x + 1 = 0 (which should have positive discriminant 9 - 8 = 1). Here is their pseudocode:\n\n1. READ a, b, c\n2. a ← 4 * a * c\n3. disc ← (b * b) - a\n\nWhy is line 2 a dangerous software engineering bug?',
    options: [
      'Line 2 destructively overwrites input variable `a` with 4ac before computing the denominator 2a later in the quadratic formula.',
      'Line 3 should be `disc ← (b * b) + a`.',
      'b * b is not allowed in pseudocode.',
      'Integer multiplication overflow is occurring.'
    ],
    correctAnswer: 0,
    hints: [
      'Look at the left side of line 2: `a ← 4 * a * c`.',
      'What was original `a`? It was the quadratic coefficient (e.g. 2).',
      'After line 2, `a` is 8. If you calculate `2 * a` for the denominator, you get 16 instead of 4!'
    ],
    explanation: 'Line 2 destructively overwrites input variable `a`. When the formula later evaluates `(-b ± √disc) / (2a)`, the denominator uses the corrupted `a` instead of the original coefficient.',
    misconceptions: [
      {
        id: 'misc-parameter-reuse',
        triggerCondition: 'chose option 1',
        name: 'Mathematical Formula Error Fallacy',
        description: 'Blaming the mathematical formula instead of variable corruption.',
        remedyHint: 'Never overwrite input parameters when their original values are required for subsequent calculations!'
      }
    ]
  },

  // ==========================================
  // MODULE 3: Conditions & Selection
  // ==========================================

  // Lesson 5 Exercises
  {
    id: 'ex-m3-1',
    moduleId: 'mod-3',
    lessonId: 'les-5',
    objectiveId: 'obj-m3-l5-rel',
    cognitiveLevel: 'RECALL',
    title: 'Relational Operator Syntax and Types',
    objective: 'Formulate correct Boolean expressions using relational operators.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'Which operator is used in algorithmic logic and C programming to test if two values are equal (comparison), rather than assigning a value?',
    options: [
      '= (Single equal sign)',
      '== (Double equal sign)',
      ':= (Colon equals)',
      'EQUALS'
    ],
    correctAnswer: 1,
    hints: [
      'A single equal sign `=` is used for destructive assignment (e.g. x = 5).',
      'To test equality without changing the variables, we use a distinct comparison operator.',
      'The relational equality operator is `==`.'
    ],
    explanation: 'In C and modern computer science notations, `==` tests for equality, while `=` performs assignment.',
    misconceptions: [
      {
        id: 'misc-assign-vs-equality',
        triggerCondition: 'chose option 0',
        name: 'Assignment vs Equality Confusion',
        description: 'Using single = for comparison.',
        remedyHint: 'Single `=` overwrites the variable! Double `==` checks if two values are equal.'
      }
    ]
  },
  {
    id: 'ex-m3-1-trace',
    moduleId: 'mod-3',
    lessonId: 'les-5',
    objectiveId: 'obj-m3-l5-excl',
    cognitiveLevel: 'TRACING',
    title: 'Chained IFs vs IF-ELSE Mutual Exclusivity',
    objective: 'Differentiate between independent IF statements and mutually exclusive IF-ELSE ladders.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace both snippets with input `n = 15`. How many lines of text are printed by Snippet A vs Snippet B?\n\nSnippet A:\nIF n > 5 THEN PRINT "X" END IF\nIF n > 10 THEN PRINT "Y" END IF\n\nSnippet B:\nIF n > 5 THEN PRINT "X"\nELSE IF n > 10 THEN PRINT "Y"\nEND IF',
    options: [
      'Snippet A prints 2 lines ("X" and "Y"); Snippet B prints only 1 line ("X")',
      'Both snippets print 2 lines ("X" and "Y")',
      'Both snippets print only 1 line ("X")',
      'Snippet A prints 1 line; Snippet B prints 2 lines'
    ],
    correctAnswer: 0,
    hints: [
      'In Snippet A, the two IFs are independent: 15 > 5 is TRUE (prints X), and 15 > 10 is ALSO TRUE (prints Y).',
      'In Snippet B, the `ELSE IF` is mutually exclusive: 15 > 5 is TRUE, so it prints X and SKIPS the rest of the ladder!',
      'An IF-ELSE IF ladder stops testing as soon as the first matching condition succeeds.'
    ],
    explanation: 'Snippet A has two independent IFs, so both execute. Snippet B has an IF-ELSE IF ladder, so after the first condition succeeds, all remaining branches are skipped.',
    misconceptions: [
      {
        id: 'misc-ladder-execution',
        triggerCondition: 'chose option 1',
        name: 'Ladder Over-Execution',
        description: 'Believing an ELSE IF can execute even if the earlier IF condition was met.',
        remedyHint: 'Once an IF branch executes in an IF-ELSE IF ladder, the computer exits the ladder immediately.'
      }
    ]
  },
  {
    id: 'ex-m3-1-app',
    moduleId: 'mod-3',
    lessonId: 'les-5',
    objectiveId: 'obj-m3-l5-multi',
    cognitiveLevel: 'APPLICATION',
    title: 'Tax Bracket Multi-Way Ladder Ordering',
    objective: 'Design robust multi-way decision trees with correct boundary ordering.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'An accountant writes this tax ladder for income `inc = 80000`:\n\n1. IF inc > 20000 THEN tax ← 0.10\n2. ELSE IF inc > 50000 THEN tax ← 0.20\n3. ELSE IF inc > 75000 THEN tax ← 0.30\n4. ELSE tax ← 0.0\n5. END IF\n\nWhat tax rate will be selected for income = 80000, and why is this code fundamentally flawed?',
    options: [
      'It assigns 0.10 because 80000 > 20000 is TRUE on line 1, short-circuiting the higher brackets!',
      'It assigns 0.30 correctly.',
      'It assigns 0.0 because 80000 falls through to ELSE.',
      'Runtime crash.'
    ],
    correctAnswer: 0,
    hints: [
      'Look at line 1: `inc > 20000`. Is 80000 > 20000? Yes (TRUE)!',
      'What happens in an IF-ELSE ladder when line 1 is TRUE? Lines 2, 3, and 4 are completely skipped!',
      'When testing open-ended ranges (>), you MUST test from the highest threshold down to the lowest, or use compound intervals.'
    ],
    explanation: 'Because 80000 is greater than 20000, line 1 matches immediately, setting tax to 0.10 and bypassing the 0.30 bracket. When using `>` in ladders, test from largest threshold to smallest.',
    misconceptions: [
      {
        id: 'misc-threshold-ordering',
        triggerCondition: 'chose option 1',
        name: 'Ladder Threshold Inversion',
        description: 'Ordering `>` conditions from smallest to largest instead of largest to smallest.',
        remedyHint: 'If you test `x > 10` before `x > 50`, any number over 50 is also over 10 and gets trapped early!'
      }
    ]
  },
  {
    id: 'ex-m3-1-ps',
    moduleId: 'mod-3',
    lessonId: 'les-5',
    objectiveId: 'obj-m3-l5-multi',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Constructing Maximum of Three Without Built-Ins',
    objective: 'Formulate an optimal nested or chained selection structure for 3 values.',
    difficulty: 'GIU_LEVEL',
    type: 'FILL_BLANK_CODE',
    question: 'To find the maximum of three numbers a, b, and c using the standard sequential comparison pattern:\n\n1. max ← a\n2. [BLANK 1]\n3. [BLANK 2]\n4. PRINT max\n\nWhat are the two correct statements to fill in?',
    options: [
      'IF b > max THEN max ← b END IF; IF c > max THEN max ← c END IF',
      'IF b > a THEN max ← b ELSE max ← c END IF',
      'IF b > c THEN max ← b; IF c > a THEN max ← c',
      'max ← a + b + c / 3'
    ],
    correctAnswer: 0,
    hints: [
      'Start with hypothesis: assume `a` is the max.',
      'Compare with `b`: if `b` is greater than our current maximum, update `max ← b`.',
      'Then compare with `c`: if `c` is greater than our current maximum, update `max ← c`.'
    ],
    explanation: 'The hypothesis-update pattern sets `max ← a`, checks if `b > max`, and checks if `c > max`. This scales easily to N numbers.',
    misconceptions: [
      {
        id: 'misc-pairwise-incomplete',
        triggerCondition: 'chose option 1',
        name: 'Incomplete Pairwise Check',
        description: 'Checking b > a and then guessing c without comparing c to b.',
        remedyHint: 'Always compare the incoming candidate against the CURRENT running maximum.'
      }
    ]
  },
  {
    id: 'ex-m3-1-bound',
    moduleId: 'mod-3',
    lessonId: 'les-5',
    objectiveId: 'obj-m3-l5-rel',
    cognitiveLevel: 'APPLICATION',
    title: 'Boundary Value Testing: Age Bracket Partitioning',
    objective: 'Formulate correct Boolean expressions using relational operators (=, ≠, <, ≤, >, ≥).',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'A museum charges child admission for visitors up to and including 12 years old, adult admission for ages 13 to 64, and senior admission for 65 and older. Which condition ladder partitions these age groups without boundary errors?',
    options: [
      'IF age ≤ 12 THEN (child) ELSE IF age ≤ 64 THEN (adult) ELSE (senior)',
      'IF age < 12 THEN (child) ELSE IF age < 64 THEN (adult) ELSE (senior)',
      'IF age ≤ 13 THEN (child) ELSE IF age ≥ 65 THEN (senior) ELSE (adult)',
      'IF age == 12 THEN (child) ELSE (adult)'
    ],
    correctAnswer: 0,
    hints: [
      'Notice the phrase "up to and including 12": this requires `age ≤ 12`.',
      'If you used `age < 12`, what would happen to a 12-year-old child? They would fall into the adult bracket!',
      'Similarly, "ages 13 to 64" means anyone 64 or younger (who is older than 12) is an adult: `age ≤ 64`.'
    ],
    explanation: '`age ≤ 12` correctly captures all children through age 12. Visitors who are not ≤ 12 enter the ELSE branch; testing `age ≤ 64` captures ages 13 to 64, leaving 65+ for the final ELSE.',
    misconceptions: [
      {
        id: 'misc-strict-inequality-boundary',
        triggerCondition: 'chose option 1',
        name: 'Inclusive vs Strict Inequality Confusion',
        description: 'Using strict `<` when the specification states "up to and including".',
        remedyHint: '"Up to and including N" always requires the inclusive relational operator `<=`, not `<`!'
      }
    ]
  },
  {
    id: 'ex-m3-1-fall',
    moduleId: 'mod-3',
    lessonId: 'les-5',
    objectiveId: 'obj-m3-l5-excl',
    cognitiveLevel: 'TRACING',
    title: 'Independent IFs Overwrite Vulnerability',
    objective: 'Differentiate between independent IF statements and mutually exclusive IF-ELSE ladders.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A programmer writes this fee schedule:\n\n1. fee ← 100\n2. IF score ≥ 70 THEN fee ← 50 END IF\n3. IF score ≥ 90 THEN fee ← 20 END IF\n\nWhat is the value of `fee` for score = 95, and what would happen if lines 2 and 3 were reversed?',
    options: [
      'For score = 95, fee = 20. If reversed, score = 95 would first set fee ← 20, but then line 3 (score ≥ 70) would execute and overwrite fee to 50!',
      'For score = 95, fee = 50 because line 2 terminates the algorithm.',
      'The code produces a runtime error because IF cannot appear twice without ELSE.',
      'Both orders work identically for all scores.'
    ],
    correctAnswer: 0,
    hints: [
      'Notice that lines 2 and 3 are INDEPENDENT `IF` blocks, NOT an `IF-ELSE` ladder.',
      'Every independent `IF` evaluates regardless of whether prior `IF` tests were TRUE.',
      'For score = 95: line 2 sets fee = 50, then line 3 sets fee = 20. But if reversed, line 2 sets fee = 20, and line 3 overwrites fee to 50!'
    ],
    explanation: 'Independent IFs both execute. If reversed, `score ≥ 70` runs after `score ≥ 90` and clobbers the fee to 50 for a 95 score. An `IF-ELSE IF` ladder avoids this dependency.',
    misconceptions: [
      {
        id: 'misc-independent-if-mutex-assumption',
        triggerCondition: 'chose option 1',
        name: 'False Mutual Exclusivity',
        description: 'Assuming sequential IF statements stop executing after the first true match.',
        remedyHint: 'Only an `ELSE IF` branch is skipped when a prior test is true. Independent `IF` statements ALWAYS run!'
      }
    ]
  },

  // Lesson 6 Exercises
  {
    id: 'ex-m3-2',
    moduleId: 'mod-3',
    lessonId: 'les-6',
    objectiveId: 'obj-m3-l6-truth',
    cognitiveLevel: 'RECALL',
    title: 'Truth Table Evaluation for Logical Operators',
    objective: 'Evaluate the truth value of compound expressions involving AND, OR, and NOT.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'Given Boolean variables P = TRUE and Q = FALSE, what is the evaluation of the expression `(NOT P) OR (P AND (NOT Q))`?',
    options: [
      'TRUE',
      'FALSE',
      'Undefined',
      'Both TRUE and FALSE'
    ],
    correctAnswer: 0, // TRUE
    hints: [
      'Step 1: Evaluate `NOT P`. Since P is TRUE, `NOT P` is FALSE.',
      'Step 2: Evaluate `NOT Q`. Since Q is FALSE, `NOT Q` is TRUE.',
      'Step 3: Evaluate `P AND (NOT Q)`. TRUE AND TRUE = TRUE.',
      'Step 4: Evaluate FALSE OR TRUE. For OR, if at least one side is TRUE, the result is TRUE.'
    ],
    explanation: 'NOT P is FALSE. P AND NOT Q is TRUE AND TRUE = TRUE. Finally, FALSE OR TRUE evaluates to TRUE.',
    misconceptions: [
      {
        id: 'misc-or-requires-both',
        triggerCondition: 'chose option 1',
        name: 'OR Conflation with AND',
        description: 'Thinking OR requires both sides to be TRUE.',
        remedyHint: 'OR only requires ONE side to be TRUE for the entire statement to be TRUE.'
      }
    ]
  },
  {
    id: 'ex-m3-2-trace',
    moduleId: 'mod-3',
    lessonId: 'les-6',
    objectiveId: 'obj-m3-l6-compound',
    cognitiveLevel: 'TRACING',
    title: 'Short-Circuit Evaluation Tracing',
    objective: 'Trace compound conditions with short-circuit evaluation semantics.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'In computer programming, short-circuit evaluation means: in `A AND B`, if A is FALSE, B is never evaluated; in `A OR B`, if A is TRUE, B is never evaluated. Consider this check to avoid division by zero:\n\n`IF (count != 0) AND (total / count > 50) THEN`\n\nWhat happens when count = 0 and total = 100?',
    options: [
      'The program safely evaluates `count != 0` to FALSE and exits the IF without evaluating the division, preventing a crash!',
      'The program crashes with a Division-By-Zero error because all parts of a condition are always calculated.',
      'It prints an error message to the console.',
      'total / count evaluates to infinity.'
    ],
    correctAnswer: 0,
    hints: [
      'Evaluate the first term: `count != 0` when count is 0. 0 != 0 is FALSE.',
      'Because the operator is AND, FALSE AND anything is guaranteed to be FALSE.',
      'Short-circuit stops right there: it never touches `total / count`, saving the program from a fatal zero-division crash!'
    ],
    explanation: 'Short-circuit evaluation stops as soon as the outcome is certain. Since 0 != 0 is FALSE, the AND condition fails immediately without executing the division by zero.',
    misconceptions: [
      {
        id: 'misc-eager-evaluation',
        triggerCondition: 'chose option 1',
        name: 'Eager Evaluation Fallacy',
        description: 'Assuming computers always evaluate both sides of an AND/OR condition.',
        remedyHint: 'Modern languages and algorithms use short-circuit evaluation: if the first operand determines the result, the second is skipped.'
      }
    ]
  },
  {
    id: 'ex-m3-2-app',
    moduleId: 'mod-3',
    lessonId: 'les-6',
    objectiveId: 'obj-m3-l6-demorgan',
    cognitiveLevel: 'APPLICATION',
    title: 'Applying De Morgan\'s Law to Boundary Conditions',
    objective: 'Apply De Morgan\'s Laws to correctly negate compound conditions.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A security system grants access if an employee badge is valid AND their clearance is level 3 or higher: `validBadge AND clearance ≥ 3`. To write an alarm condition that triggers when access is DENIED, an engineer writes: `NOT validBadge AND clearance < 3`. Why is this alarm condition wrong?',
    options: [
      'By De Morgan\'s Law, the negation of (A AND B) is (NOT A) OR (NOT B). With AND, an intruder with a fake badge could still enter if their clearance was set to 3!',
      'Because clearance cannot be less than 3.',
      'Because NOT cannot be applied to boolean variables.',
      'De Morgan\'s Law does not apply to clearance levels.'
    ],
    correctAnswer: 0,
    hints: [
      'Think: when is access denied? Access is denied if the badge is invalid OR if the clearance is too low.',
      'It does not require BOTH violations to happen simultaneously to deny access!',
      'Negating (A AND B) yields `(NOT A) OR (NOT B)`.'
    ],
    explanation: 'The negation of (A AND B) is (NOT A) OR (NOT B). If you require both with AND, an intruder who fails only one check would not trigger the alarm.',
    misconceptions: [
      {
        id: 'misc-demorgan-operator-flip',
        triggerCondition: 'chose option 1',
        name: 'Failure to Flip AND/OR in Negation',
        description: 'Distributing NOT across AND without changing AND to OR.',
        remedyHint: 'De Morgan\'s Law states: NOT (A AND B) becomes (NOT A) OR (NOT B).'
      }
    ]
  },
  {
    id: 'ex-m3-2-ps',
    moduleId: 'mod-3',
    lessonId: 'les-6',
    objectiveId: 'obj-m3-l6-compound',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Triangle Inequality Theorem Validation',
    objective: 'Formulate compound conditions to verify geometric constraints.',
    difficulty: 'GIU_LEVEL',
    type: 'FILL_BLANK_CODE',
    question: 'In geometry, three side lengths a, b, and c can form a valid triangle if and only if the sum of any two sides is strictly greater than the third side. Which compound condition correctly tests this?',
    options: [
      '(a + b > c) AND (a + c > b) AND (b + c > a)',
      '(a + b > c) OR (a + c > b) OR (b + c > a)',
      '(a + b + c > 0) AND (a == b == c)',
      '(a + b ≥ c) AND (a + c ≥ b)'
    ],
    correctAnswer: 0,
    hints: [
      'All three triangle inequalities MUST hold simultaneously.',
      'If even a single inequality fails (e.g. 1 + 2 is not > 10), no triangle can exist.',
      'Simultaneous requirements require logical AND between all three checks.'
    ],
    explanation: 'The Triangle Inequality requires all three pairs to satisfy the rule simultaneously: (a + b > c) AND (a + c > b) AND (b + c > a).',
    misconceptions: [
      {
        id: 'misc-or-instead-of-and',
        triggerCondition: 'chose option 1',
        name: 'OR for Simultaneous Constraints',
        description: 'Using OR when all geometric constraints must hold at once.',
        remedyHint: 'When all conditions must be true at the same time, you MUST use AND.'
      }
    ]
  },
  {
    id: 'ex-m3-2-short',
    moduleId: 'mod-3',
    lessonId: 'les-6',
    objectiveId: 'obj-m3-l6-truth',
    cognitiveLevel: 'APPLICATION',
    title: 'Short-Circuit Evaluation & Guard Conditions',
    objective: 'Evaluate how short-circuit Boolean evaluation prevents runtime division-by-zero crashes.',
    difficulty: 'GIU_LEVEL',
    type: 'PREDICT_OUTPUT',
    question: 'In computer programming languages, `AND` short-circuits: if the left operand is FALSE, the right operand is NEVER evaluated. Which expression safely prevents a division-by-zero crash when `count` might be 0?',
    options: [
      '(count ≠ 0) AND (total / count > 50)',
      '(total / count > 50) AND (count ≠ 0)',
      '(count == 0) OR (total / count > 50)',
      '(count ≠ 0) OR (total / count > 50)'
    ],
    correctAnswer: 0,
    hints: [
      'What happens if `count` is 0 and you evaluate `total / count`? The computer crashes with a division-by-zero fatal error!',
      'In option 1: if count == 0, `(count ≠ 0)` is FALSE. Since `FALSE AND anything` is always FALSE, the computer stops immediately and skips `total / count`!',
      'In option 2: the dangerous division runs BEFORE the guard check, crashing immediately.'
    ],
    explanation: 'Placing the guard condition `(count ≠ 0)` first on the left of `AND` guarantees that when count is zero, the division is never attempted, protecting the program from crashing.',
    misconceptions: [
      {
        id: 'misc-short-circuit-order',
        triggerCondition: 'chose option 1',
        name: 'Guard Placement After Dangerous Operation',
        description: 'Placing the safety check after the expression that could crash.',
        remedyHint: 'Guard conditions MUST be on the left side of the `AND` operator!'
      }
    ]
  },
  {
    id: 'ex-m3-2-leap',
    moduleId: 'mod-3',
    lessonId: 'les-6',
    objectiveId: 'obj-m3-l6-compound',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Compound Logic: Gregorian Leap Year Rule',
    objective: 'Formulate valid compound conditions combining AND, OR, and parentheses.',
    difficulty: 'CHALLENGE',
    type: 'FILL_BLANK_CODE',
    question: 'A year is a leap year if: (1) it is divisible by 4, AND (2) it is NOT divisible by 100, UNLESS it is also divisible by 400. Which compound condition expresses this rule correctly?',
    options: [
      '(year MOD 4 == 0 AND year MOD 100 ≠ 0) OR (year MOD 400 == 0)',
      'year MOD 4 == 0 AND year MOD 100 ≠ 0 AND year MOD 400 == 0',
      'year MOD 4 == 0 OR year MOD 400 == 0',
      '(year MOD 4 == 0 OR year MOD 100 == 0) AND (year MOD 400 ≠ 0)'
    ],
    correctAnswer: 0,
    hints: [
      'Test year 2000: 2000 MOD 400 == 0 is TRUE, so it IS a leap year.',
      'Test year 1900: 1900 MOD 100 == 0, so the first part is FALSE, and 1900 MOD 400 is not 0, so it is NOT a leap year.',
      'Test year 2024: 2024 MOD 4 == 0 (TRUE) and 2024 MOD 100 ≠ 0 (TRUE), so it IS a leap year.'
    ],
    explanation: 'The compound condition `(year MOD 4 == 0 AND year MOD 100 ≠ 0) OR (year MOD 400 == 0)` accurately classifies all three historical rules of the calendar.',
    misconceptions: [
      {
        id: 'misc-leap-century-omission',
        triggerCondition: 'chose option 2',
        name: 'Century Rule Omission',
        description: 'Assuming all years divisible by 4 are leap years, ignoring the century exceptions.',
        remedyHint: 'Century years like 1900 are not leap years unless divisible by 400 (like 2000)!'
      }
    ]
  },

  // ==========================================
  // MODULE 4: Loops & Iteration
  // ==========================================

  // Lesson 7 Exercises
  {
    id: 'ex-m4-1',
    moduleId: 'mod-4',
    lessonId: 'les-7',
    objectiveId: 'obj-m4-l7-components',
    cognitiveLevel: 'RECALL',
    title: 'The Four Vital Components of a Loop',
    objective: 'Identify the four essential components of any loop (Init, Condition, Body, Update).',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'Every well-designed loop in computer programming must possess four specific components. Which of the following lists all four correctly?',
    options: [
      'Initialization, Condition Test, Loop Body, State Update (Progress)',
      'Variable Declaration, Arithmetic, Printing, Termination',
      'Input, Output, Semicolon, Return Statement',
      'Memory Allocation, IF Statement, ELSE Statement, Break'
    ],
    correctAnswer: 0,
    hints: [
      'Think about what you need to do pushups: 1) start count, 2) check goal, 3) do pushup, 4) increment count.',
      'Without an initialization, where do you start?',
      'Without a state update, the condition never changes, leading to an infinite loop!'
    ],
    explanation: 'The four universal components of any loop are: 1) Initialization (setting starting values), 2) Condition Test (evaluating whether to continue), 3) Loop Body (the actions performed), and 4) State Update (advancing toward termination).',
    misconceptions: [
      {
        id: 'misc-loop-update-omission',
        triggerCondition: 'chose option 1',
        name: 'Omitting State Update',
        description: 'Failing to recognize that state update is required to avoid infinite loops.',
        remedyHint: 'A loop cannot terminate unless its body contains a state update moving closer to the exit condition.'
      }
    ]
  },
  {
    id: 'ex-m4-1-trace',
    moduleId: 'mod-4',
    lessonId: 'les-7',
    objectiveId: 'obj-m4-l7-trace',
    cognitiveLevel: 'TRACING',
    title: 'Tracing While Loop Final Termination Value',
    objective: 'Trace pre-test WHILE loops line-by-line, including termination values.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the following loop carefully on paper:\n\n1. count ← 1\n2. WHILE count < 6 DO\n3.     count ← count + 2\n4. END WHILE\n5. PRINT count\n\nWhat is the value printed at Line 5 when the loop finishes?',
    codeSnippet: '1. count ← 1\n2. WHILE count < 6 DO\n3.     count ← count + 2\n4. END WHILE\n5. PRINT count',
    options: ['7', '5', '6', '8'],
    correctAnswer: 0, // '7'
    hints: [
      'Pass 1: count = 1. Is 1 < 6? TRUE. count becomes 1 + 2 = 3.',
      'Pass 2: count = 3. Is 3 < 6? TRUE. count becomes 3 + 2 = 5.',
      'Pass 3: count = 5. Is 5 < 6? TRUE! count becomes 5 + 2 = 7.',
      'Pass 4: count = 7. Is 7 < 6? FALSE! Loop exits. What is printed?'
    ],
    explanation: 'Pass 1 sets count to 3. Pass 2 sets count to 5. Pass 3 sets count to 7. When count is 7, 7 < 6 is FALSE, exiting the loop. Line 5 prints 7.',
    misconceptions: [
      {
        id: 'misc-termination-value-guess',
        triggerCondition: 'chose option 1',
        name: 'Guessing Last Valid Iteration',
        description: 'Guessing that count is 5 upon exit because 5 was the last value that satisfied the condition.',
        remedyHint: 'Inside the loop body on the last pass, count was incremented to 7! It took 7 to FAIL the condition.'
      }
    ]
  },
  {
    id: 'ex-m4-1-app',
    moduleId: 'mod-4',
    lessonId: 'les-7',
    objectiveId: 'obj-m4-l7-term',
    cognitiveLevel: 'APPLICATION',
    title: 'Diagnosing Infinite Loop Causes',
    objective: 'Diagnose non-terminating loops and verify progress toward the stopping condition.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A student wrote the following loop to countdown from 5 to 1:\n\n1. i ← 5\n2. WHILE i > 0 DO\n3.     PRINT i\n4.     i ← i + 1\n5. END WHILE\n\nWhy does this loop never terminate?',
    codeSnippet: '1. i ← 5\n2. WHILE i > 0 DO\n3.     PRINT i\n4.     i ← i + 1\n5. END WHILE',
    options: [
      'The counter `i` is being incremented (5, 6, 7...) instead of decremented, moving further away from 0 forever.',
      'The condition `i > 0` is syntactically invalid.',
      'PRINT statements cannot be placed inside while loops.',
      'The loop executes 5 times and stops.'
    ],
    correctAnswer: 0,
    hints: [
      'Look at line 4: `i ← i + 1`. What values does `i` take? 5, 6, 7, 8...',
      'Is 6 > 0? Yes. Is 7 > 0? Yes.',
      'To count DOWN toward 0, `i` must be decremented: `i ← i - 1`.'
    ],
    explanation: 'Line 4 increments `i` so it becomes larger on every iteration (5, 6, 7...). It will remain strictly greater than 0 forever, producing an infinite loop.',
    misconceptions: [
      {
        id: 'misc-direction-inversion',
        triggerCondition: 'chose option 3',
        name: 'Counter Direction Assumption',
        description: 'Assuming loops count down automatically without checking the update operator.',
        remedyHint: 'Check the sign on the update: + moves up, - moves down!'
      }
    ]
  },
  {
    id: 'ex-m4-1-ps',
    moduleId: 'mod-4',
    lessonId: 'les-7',
    objectiveId: 'obj-m4-l7-term',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Zero-Iteration Loop Verification',
    objective: 'Predict behavior when pre-test loop conditions fail on step 1.',
    difficulty: 'GIU_LEVEL',
    type: 'PREDICT_OUTPUT',
    question: 'What is printed by this algorithm when input `limit = -3`?\n\n1. READ limit\n2. sum ← 0\n3. k ← 1\n4. WHILE k ≤ limit DO\n5.     sum ← sum + k\n6.     k ← k + 1\n7. END WHILE\n8. PRINT sum',
    codeSnippet: '1. READ limit\n2. sum ← 0\n3. k ← 1\n4. WHILE k ≤ limit DO\n5.     sum ← sum + k\n6.     k ← k + 1\n7. END WHILE\n8. PRINT sum',
    options: [
      '0',
      '-3',
      '-6',
      'Infinite loop'
    ],
    correctAnswer: 0,
    hints: [
      'Look at Line 4: `k ≤ limit`. Here k is 1 and limit is -3.',
      'Is 1 ≤ -3? FALSE!',
      'In a pre-test WHILE loop, if the condition is FALSE at the start, the body executes ZERO times.',
      'Execution jumps directly to Line 8. What is the value of sum? 0.'
    ],
    explanation: 'Since 1 ≤ -3 is immediately FALSE, the loop body executes zero times. The initial value of sum (0) is printed.',
    misconceptions: [
      {
        id: 'misc-at-least-once-fallacy',
        triggerCondition: 'chose option 1',
        name: 'Do-While Conflation',
        description: 'Believing a WHILE loop is guaranteed to execute at least once.',
        remedyHint: 'A pre-test WHILE loop checks BEFORE iteration 1. If FALSE, it runs ZERO times.'
      }
    ]
  },
  {
    id: 'ex-m4-1-step',
    moduleId: 'mod-4',
    lessonId: 'les-7',
    objectiveId: 'obj-m4-l7-trace',
    cognitiveLevel: 'TRACING',
    title: 'Multiplicative Step Loop Progression',
    objective: 'Trace pre-test WHILE loops line-by-line with non-linear step updates.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the number of times the loop body executes and the final value of `count`:\n\n1. k ← 1\n2. count ← 0\n3. WHILE k ≤ 32 DO\n4.     count ← count + 1\n5.     k ← k * 2\n6. END WHILE\n7. PRINT count',
    options: ['6', '5', '32', '7'],
    correctAnswer: 0,
    hints: [
      'Trace the values of k at the start of each iteration: k = 1, 2, 4, 8, 16, 32.',
      'For k = 32: 32 ≤ 32 is TRUE, so it executes iteration 6, updating k to 64 and count to 6.',
      'Next check: is 64 ≤ 32? FALSE! Loop terminates with count = 6.'
    ],
    explanation: 'The loop executes for powers of 2: 1 (count=1), 2 (count=2), 4 (count=3), 8 (count=4), 16 (count=5), and 32 (count=6). When k becomes 64, the loop stops.',
    misconceptions: [
      {
        id: 'misc-powers-of-two-count',
        triggerCondition: 'chose option 1',
        name: 'Inclusive Power Count Omission',
        description: 'Forgetting that k=1 (2^0) is the first iteration, counting only 2^1 through 2^5.',
        remedyHint: 'Remember 2^0 = 1! The sequence has 6 terms: 1, 2, 4, 8, 16, 32.'
      }
    ]
  },
  {
    id: 'ex-m4-1-bounds',
    moduleId: 'mod-4',
    lessonId: 'les-7',
    objectiveId: 'obj-m4-l7-term',
    cognitiveLevel: 'APPLICATION',
    title: 'Post-Loop Counter Value Inspection',
    objective: 'Predict the value of a loop counter immediately after loop termination.',
    difficulty: 'GIU_LEVEL',
    type: 'PREDICT_OUTPUT',
    question: 'A classic GIU examination question asks: what is the value printed for `i` immediately after this loop terminates?\n\n1. i ← 1\n2. WHILE i ≤ 10 DO\n3.     i ← i + 1\n4. END WHILE\n5. PRINT i',
    options: ['11', '10', '9', '1'],
    correctAnswer: 0,
    hints: [
      'Think about WHY the loop stopped running.',
      'The loop continues as long as `i ≤ 10`.',
      'For the loop to STOP, `i ≤ 10` MUST evaluate to FALSE. What is the first integer greater than 10? 11!'
    ],
    explanation: 'When i is 10, 10 ≤ 10 is TRUE, so line 3 increments `i` to 11. Then the condition tests `11 ≤ 10`, which is FALSE! The loop exits, leaving `i` holding 11.',
    misconceptions: [
      {
        id: 'misc-boundary-clamp-fallacy',
        triggerCondition: 'chose option 1',
        name: 'Boundary Value Clamp Fallacy',
        description: 'Assuming the variable remains capped at 10 upon loop exit.',
        remedyHint: 'The variable MUST exceed the boundary condition in order for the loop to terminate!'
      }
    ]
  },

  // Lesson 8 Exercises
  {
    id: 'ex-m4-2',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    objectiveId: 'obj-m4-l8-ident',
    cognitiveLevel: 'RECALL',
    title: 'Mathematical Identities for Accumulator Initialization',
    objective: 'Select correct mathematical identities for accumulator initializations.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'Why MUST an accumulator for computing a running product (such as Factorial) be initialized to 1 instead of 0?',
    options: [
      'Because 1 is the multiplicative identity element: multiplying any number by 1 preserves its value, whereas 0 * anything = 0.',
      'Because C compilers reject variables initialized to 0 in loops.',
      'Because factorials are only defined for odd numbers.',
      'It doesn\'t matter; 0 and 1 work identically.'
    ],
    correctAnswer: 0,
    hints: [
      'What happens if you multiply: 0 * 1 * 2 * 3 * 4?',
      'The result would permanently remain 0!',
      'For addition, 0 is identity (x + 0 = x). For multiplication, 1 is identity (x * 1 = x).'
    ],
    explanation: '0 is the additive identity (adding 0 changes nothing). 1 is the multiplicative identity (multiplying by 1 changes nothing). Initializing a product to 0 zeroes out the entire calculation.',
    misconceptions: [
      {
        id: 'misc-product-zero-init',
        triggerCondition: 'chose option 3',
        name: 'Universal Zero Initialization Habit',
        description: 'Habitually initializing all variables to 0, even for products.',
        remedyHint: 'Always initialize sum accumulators to 0, but product accumulators to 1!'
      }
    ]
  },
  {
    id: 'ex-m4-2-trace',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    objectiveId: 'obj-m4-l8-pattern',
    cognitiveLevel: 'TRACING',
    title: 'Combined Counter and Accumulator Loop Tracing',
    objective: 'Trace combined counter and accumulator mutations across successive loop iterations.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the following algorithm carefully on paper for input n = 4:\n\n1. READ n\n2. total ← 0\n3. c ← 1\n4. WHILE c ≤ n DO\n5.     total ← total + (c * c)\n6.     c ← c + 1\n7. END WHILE\n8. PRINT total\n\nWhat is the value printed for total?',
    codeSnippet: '1. READ n\n2. total ← 0\n3. c ← 1\n4. WHILE c ≤ n DO\n5.     total ← total + (c * c)\n6.     c ← c + 1\n7. END WHILE\n8. PRINT total',
    options: ['30', '16', '10', '20'],
    correctAnswer: 0, // 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30
    hints: [
      'This computes the sum of squares: 1^2 + 2^2 + 3^2 + ... + n^2.',
      'Iter 1 (c=1): total = 0 + 1*1 = 1.',
      'Iter 2 (c=2): total = 1 + 2*2 = 1 + 4 = 5.',
      'Iter 3 (c=3): total = 5 + 3*3 = 5 + 9 = 14.',
      'Iter 4 (c=4): total = 14 + 4*4 = 14 + 16 = 30.'
    ],
    explanation: 'For n = 4, the loop accumulates 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30.',
    misconceptions: [
      {
        id: 'misc-last-square-only',
        triggerCondition: 'chose option 1',
        name: 'Accumulator Overwrite Fallacy',
        description: 'Calculating only the last square (4*4=16) rather than accumulating.',
        remedyHint: 'Remember `total ← total + ...` ADDS to the previous sum rather than replacing it.'
      }
    ]
  },
  {
    id: 'ex-m4-2-app',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    objectiveId: 'obj-m4-l8-debug',
    cognitiveLevel: 'APPLICATION',
    title: 'The In-Loop Accumulator Reset Bug',
    objective: 'Diagnose scope placement errors and accumulator reset bugs.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A student wrote the following algorithm to compute the sum 1 + 2 + ... + 5, expecting 15:\n\n1. i ← 1\n2. WHILE i ≤ 5 DO\n3.     sum ← 0\n4.     sum ← sum + i\n5.     i ← i + 1\n6. END WHILE\n7. PRINT sum\n\nWhat does this algorithm actually print, and why?',
    codeSnippet: '1. i ← 1\n2. WHILE i ≤ 5 DO\n3.     sum ← 0\n4.     sum ← sum + i\n5.     i ← i + 1\n6. END WHILE\n7. PRINT sum',
    options: [
      'It prints 5 because line 3 resets sum to 0 on every single iteration, destroying all prior additions!',
      'It prints 15 correctly.',
      'It prints 0.',
      'It causes an infinite loop.'
    ],
    correctAnswer: 0,
    hints: [
      'Trace iteration 5: i is 5.',
      'Line 3 executes: `sum ← 0`. What happened to the sum from iterations 1, 2, 3, and 4?',
      'Line 4 adds 5 to 0: sum becomes 5.',
      'Placing `sum ← 0` INSIDE the loop body is a catastrophic bug that wipes out the accumulator every iteration.'
    ],
    explanation: 'Because `sum ← 0` is inside the loop body, every pass wipes out the running total. On the final iteration, sum resets to 0 and adds 5, so it prints 5 instead of 15.',
    misconceptions: [
      {
        id: 'misc-loop-scope-reset',
        triggerCondition: 'chose option 1',
        name: 'Accumulator Scope Blindness',
        description: 'Placing accumulator initialization inside the loop body.',
        remedyHint: 'An accumulator MUST be initialized ONCE, strictly outside and above the loop!'
      }
    ]
  },
  {
    id: 'ex-m4-2-ps',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    objectiveId: 'obj-m4-l8-debug',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Fixing Off-By-One Errors (OBOE) in Boundary Counting',
    objective: 'Diagnose and fix off-by-one errors in counter limits.',
    difficulty: 'GIU_LEVEL',
    type: 'FILL_BLANK_CODE',
    question: 'An algorithm is required to print the first N multiples of 3 (e.g. if N = 3, print 3, 6, 9). A student wrote:\n\n1. READ n\n2. c ← 1\n3. WHILE [CONDITION] DO\n4.     PRINT c * 3\n5.     c ← c + 1\n6. END WHILE\n\nWhich condition guarantees exactly N multiples are printed without an off-by-one error?',
    options: [
      'c ≤ n',
      'c < n',
      'c ≤ n + 1',
      'c > n'
    ],
    correctAnswer: 0,
    hints: [
      'Test with n = 3: we want 3 iterations (c = 1, c = 2, c = 3).',
      'If you use `c < 3`, it runs for c = 1 and c = 2, and stops! That is only 2 multiples (off-by-one error).',
      'With `c ≤ 3`, it runs for c = 1, 2, and 3. Exactly 3 multiples!'
    ],
    explanation: 'When starting a counter at 1, `c ≤ n` guarantees exactly `n` iterations. Using `< n` terminates one step too early (an Off-By-One Error).',
    misconceptions: [
      {
        id: 'misc-oboe-inclusive',
        triggerCondition: 'chose option 1',
        name: 'Off-By-One Strict Inequality',
        description: 'Using strictly less than (<) when inclusive boundary (<=) is required.',
        remedyHint: 'Check with n = 1: `1 < 1` is FALSE (0 iterations!), whereas `1 <= 1` is TRUE (1 iteration).'
      }
    ]
  },
  {
    id: 'ex-m4-2-inv',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    objectiveId: 'obj-m4-l8-pattern',
    cognitiveLevel: 'APPLICATION',
    title: 'Loop Invariant on Exponentiation Accumulator',
    objective: 'Trace combined counter and accumulator mutations across successive loop iterations.',
    difficulty: 'CHALLENGE',
    type: 'PREDICT_OUTPUT',
    question: 'Consider this algorithm to compute base^exp (e.g. 3⁴):\n\n1. READ base, exp\n2. result ← 1\n3. count ← 0\n4. WHILE count < exp DO\n5.     result ← result * base\n6.     count ← count + 1\n7. END WHILE\n8. PRINT result\n\nWhat is the value of `result` and `count` immediately after iteration 2 completes for base = 3, exp = 4?',
    options: [
      'result = 9, count = 2',
      'result = 27, count = 3',
      'result = 6, count = 2',
      'result = 1, count = 0'
    ],
    correctAnswer: 0,
    hints: [
      'Initial state before loop: result = 1, count = 0.',
      'Iteration 1: result = 1 * 3 = 3; count = 0 + 1 = 1.',
      'Iteration 2: result = 3 * 3 = 9; count = 1 + 1 = 2.'
    ],
    explanation: 'After iteration 1, result is 3 and count is 1. After iteration 2, result is 3 * 3 = 9 and count is 2. The loop invariant `result = base^count` holds true after every iteration.',
    misconceptions: [
      {
        id: 'misc-addition-vs-multiplication',
        triggerCondition: 'chose option 2',
        name: 'Multiplication vs Addition Confusion',
        description: 'Adding base instead of multiplying (e.g. 3 + 3 = 6 instead of 3 * 3 = 9).',
        remedyHint: 'Exponentiation is repeated multiplication: result * base, not result + base!'
      }
    ]
  },
  {
    id: 'ex-m4-2-priming',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    objectiveId: 'obj-m4-l8-debug',
    cognitiveLevel: 'PROBLEM_SOLVING',
    title: 'Priming Read Pattern for Sentinel Loops',
    objective: 'Diagnose sentinel loop processing order bugs to prevent sentinel contamination.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A student writes a loop to sum positive exam scores until a sentinel value of -1 is entered:\n\n1. sum ← 0\n2. score ← 0\n3. WHILE score ≠ -1 DO\n4.     READ score\n5.     sum ← sum + score\n6. END WHILE\n7. PRINT sum\n\nIf the user inputs 80, 90, and then -1, what does this program print and what is the bug?',
    options: [
      'It prints 169 because the sentinel -1 is added to sum on line 5 before the loop condition checks it!',
      'It prints 170 correctly.',
      'It causes an infinite loop because score is never -1.',
      'It crashes with an uninitialized variable error.'
    ],
    correctAnswer: 0,
    hints: [
      'Trace line 4 and 5 when the user enters -1.',
      'Line 4 reads score = -1. Line 5 immediately executes: `sum ← sum + (-1)`!',
      'The sentinel -1 got contaminated into the sum! To fix this, use the "Priming Read" pattern: READ once before the loop, and READ at the END of the loop body.'
    ],
    explanation: 'Because `READ score` is at the top of the loop body, when the sentinel -1 is entered, line 5 immediately adds -1 to sum (80 + 90 - 1 = 169) before the loop condition can stop it. The correct design reads before the loop and reads at the very bottom of the loop body.',
    misconceptions: [
      {
        id: 'misc-sentinel-contamination',
        triggerCondition: 'chose option 1',
        name: 'Sentinel Contamination Blindness',
        description: 'Assuming the loop stops immediately when -1 is typed, without realizing statements after READ still execute.',
        remedyHint: 'A WHILE condition only evaluates at the top of the loop, not in the middle of the body!'
      }
    ]
  }
];
