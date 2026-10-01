import { Exercise } from '../types/curriculum';

export const EXERCISE_BANK: Exercise[] = [
  // MODULE 1: Problems & Algorithms
  {
    id: 'ex-m1-1',
    moduleId: 'mod-1',
    lessonId: 'les-1',
    title: 'Algorithm vs Heuristic Definition',
    objective: 'Distinguish between an unambiguous algorithm and a vague procedure.',
    difficulty: 'FOUNDATION',
    type: 'MULTIPLE_CHOICE',
    question: 'Which of the following is an essential requirement for a sequence of instructions to qualify as an algorithm in Computer Science?',
    options: [
      'It must execute in under 1 second regardless of input size.',
      'Every step must be unambiguous, precisely defined, and the procedure must terminate in finite steps.',
      'It must be written in the C programming language.',
      'It must always produce decimal numbers as output.'
    ],
    correctAnswer: 1,
    hints: [
      'Think about what happens if an instruction is vague, like "stir until it looks nice". Can a computer execute that?',
      'Consider the fundamental properties: finiteness, definiteness (unambiguity), input, output, and effectiveness.',
      'An algorithm must be precise at every single step and guaranteed to stop (terminate), regardless of the programming language.'
    ],
    explanation: 'An algorithm must be finite (must eventually stop) and definite (each step must have only one unambiguous interpretation). It is independent of specific languages or arbitrary execution speeds.',
    misconceptions: [
      {
        id: 'misc-lang-dependent',
        triggerCondition: 'chose option 2',
        name: 'Language Conflation',
        description: 'Believing an algorithm must be tied to a specific programming language like C or Python.',
        remedyHint: 'Algorithms are language-agnostic concepts. They exist in mathematics, pseudocode, and flowcharts before any code is typed!'
      }
    ]
  },
  {
    id: 'ex-m1-2',
    moduleId: 'mod-1',
    lessonId: 'les-2',
    title: 'Variable State Assignment Sequence',
    objective: 'Predict sequential variable mutations.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the variables sequentially. What is the value of variable `a` after the following steps execute?\n\n1. a ← 5\n2. b ← 10\n3. a ← a + b\n4. b ← a - b\n5. a ← a - b',
    codeSnippet: 'a ← 5\nb ← 10\na ← a + b\nb ← a - b\na ← a - b',
    options: ['5', '10', '15', '0'],
    correctAnswer: 1, // index 1 is "10"
    hints: [
      'Work through each line one by one on paper. Update the values of a and b at each line.',
      'At line 3, a becomes 5 + 10 = 15. What does line 4 calculate for b with a=15 and b=10?',
      'Line 4 gives b ← 15 - 10 = 5. Now calculate line 5: a ← 15 - 5.'
    ],
    explanation: 'Line 1: a=5. Line 2: b=10. Line 3: a=15. Line 4: b = 15 - 10 = 5. Line 5: a = 15 - 5 = 10. This classic sequence swaps the values of two variables without using a temporary variable!',
    misconceptions: [
      {
        id: 'misc-parallel-assignment',
        triggerCondition: 'chose option 0',
        name: 'Simultaneous Assignment Fallacy',
        description: 'Assuming assignments happen simultaneously rather than sequentially.',
        remedyHint: 'Remember computers execute instructions sequentially from top to bottom. When line 4 runs, variable `a` already holds 15.'
      }
    ]
  },

  // MODULE 2: Pseudocode & Tracing
  {
    id: 'ex-m2-1',
    moduleId: 'mod-2',
    lessonId: 'les-3',
    title: 'Step Trace Table Verification',
    objective: 'Fill in trace table values for sequential pseudocode.',
    difficulty: 'FOUNDATION',
    type: 'PREDICT_OUTPUT',
    question: 'Given the pseudocode below, what will be printed at the end when input x = 8?',
    codeSnippet: 'READ x\ny ← 3\nz ← x MOD y\nPRINT z',
    options: ['2', '2.66', '1', '0'],
    correctAnswer: 0, // '2'
    hints: [
      'What does the MOD operator calculate in computer science and mathematics?',
      'MOD is the remainder after integer division. What is 8 divided by 3?',
      '8 divided by 3 is 2 with a remainder of 2 (because 3 * 2 = 6, and 8 - 6 = 2).'
    ],
    explanation: '8 MOD 3 evaluates to 2 because 8 = 3 * 2 + 2. The remainder is 2.',
    misconceptions: [
      {
        id: 'misc-mod-as-division',
        triggerCondition: 'chose option 1',
        name: 'MOD vs Division Confusion',
        description: 'Confusing integer remainder with floating-point quotient.',
        remedyHint: 'MOD (or % in C) returns the whole integer remainder, never a fraction or decimal.'
      }
    ]
  },
  {
    id: 'ex-m2-2',
    moduleId: 'mod-2',
    lessonId: 'les-4',
    title: 'GIU Level: Algorithm Tracing with Swaps',
    objective: 'Trace multi-step algorithm with conditional branch and temporary variable.',
    difficulty: 'GIU_LEVEL',
    type: 'PREDICT_OUTPUT',
    question: 'Trace the algorithm with initial inputs x = 14, y = 9. What is the value of `x` at line 7?',
    codeSnippet: '1. READ x, y\n2. IF x > y THEN\n3.     temp ← x\n4.     x ← y\n5.     y ← temp\n6. END IF\n7. PRINT x, y',
    options: ['14', '9', '23', '0'],
    correctAnswer: 1, // '9'
    hints: [
      'Check the IF condition at line 2: is 14 > 9?',
      'Since 14 > 9 is TRUE, we execute lines 3, 4, and 5.',
      'Line 3 saves 14 into temp. Line 4 assigns y (9) to x. Therefore x is now 9.'
    ],
    explanation: 'The condition 14 > 9 is TRUE. The block performs a swap: temp takes 14, x takes 9, y takes 14. Thus, at line 7, x is 9 (and y is 14).',
    misconceptions: [
      {
        id: 'misc-temp-overwrite',
        triggerCondition: 'chose option 0',
        name: 'Missed Branch Execution',
        description: 'Thinking the condition failed or values did not swap.',
        remedyHint: 'Verify the condition: 14 > 9 is true, so the statements inside the IF block DO run!'
      }
    ]
  },

  // MODULE 3: Conditions & Selection
  {
    id: 'ex-m3-1',
    moduleId: 'mod-3',
    lessonId: 'les-5',
    title: 'Nested Condition Branching',
    objective: 'Evaluate mutually exclusive and nested selection blocks.',
    difficulty: 'APPLICATION',
    type: 'PREDICT_OUTPUT',
    question: 'What is the exact output printed when grade = 72?',
    codeSnippet: 'IF grade ≥ 85 THEN\n    PRINT "Excellent"\nELSE IF grade ≥ 70 THEN\n    PRINT "Very Good"\nELSE IF grade ≥ 60 THEN\n    PRINT "Good"\nELSE\n    PRINT "Fail"\nEND IF',
    options: ['"Excellent"', '"Very Good"', '"Good"', '"Very Good" and "Good"'],
    correctAnswer: 1, // '"Very Good"'
    hints: [
      'Follow the tests from top to bottom. Does 72 satisfy grade ≥ 85?',
      '72 ≥ 85 is FALSE, so check the next ELSE IF condition.',
      '72 ≥ 70 is TRUE. In an IF-ELSE IF ladder, once a true branch executes, the remaining branches are skipped!'
    ],
    explanation: 'Since 72 < 85 is false, it moves to the second branch: 72 >= 70 is true, so "Very Good" is printed. The remaining branches are skipped because of the ELSE structure.',
    misconceptions: [
      {
        id: 'misc-multiple-branch',
        triggerCondition: 'chose option 3',
        name: 'Ladder Fall-through Misconception',
        description: 'Believing all matching branches in an IF-ELSE-IF ladder execute.',
        remedyHint: 'An IF-ELSE-IF chain is mutually exclusive: as soon as one condition evaluates to TRUE, its body runs and the rest of the chain is skipped.'
      }
    ]
  },
  {
    id: 'ex-m3-2',
    moduleId: 'mod-3',
    lessonId: 'les-6',
    title: 'GIU Level: Short-Circuit and Operator Precedence',
    objective: 'Evaluate compound Boolean expressions with AND / OR precedence.',
    difficulty: 'GIU_LEVEL',
    type: 'MULTIPLE_CHOICE',
    question: 'In CS1 logic, how does the expression `(A OR B AND C)` evaluate according to standard operator precedence when A = FALSE, B = TRUE, and C = FALSE?',
    options: [
      'TRUE, because (A OR B) is evaluated first to TRUE, and TRUE AND FALSE is FALSE.',
      'FALSE, because AND has higher precedence than OR; (B AND C) is FALSE, and FALSE OR FALSE is FALSE.',
      'TRUE, because OR always has higher precedence than AND.',
      'It cannot be evaluated without explicit parentheses.'
    ],
    correctAnswer: 1,
    hints: [
      'Think about mathematical operators: multiplication (*) takes precedence over addition (+). What is the Boolean equivalent?',
      'In Boolean algebra and C, AND behaves like multiplication, and OR behaves like addition.',
      'Therefore, `B AND C` is evaluated first. Since B=TRUE and C=FALSE, `B AND C` = FALSE. Then `A OR FALSE` = FALSE OR FALSE = FALSE.'
    ],
    explanation: 'AND (conjunction) binds tighter than OR (disjunction). The expression is evaluated as `A OR (B AND C)`. Since B AND C is TRUE AND FALSE = FALSE, we get FALSE OR FALSE = FALSE.',
    misconceptions: [
      {
        id: 'misc-left-to-right-precedence',
        triggerCondition: 'chose option 0',
        name: 'Strict Left-to-Right Assumption',
        description: 'Evaluating expressions purely left-to-right without honoring operator precedence.',
        remedyHint: 'Just as 2 + 3 * 4 is 2 + 12 = 14 (not 20), Boolean AND binds tighter than OR.'
      }
    ]
  },

  // MODULE 4: Iteration & Loops
  {
    id: 'ex-m4-1',
    moduleId: 'mod-4',
    lessonId: 'les-7',
    title: 'Loop Iteration Count & Off-by-One',
    objective: 'Accurately determine how many times a while loop executes.',
    difficulty: 'FOUNDATION',
    type: 'PREDICT_OUTPUT',
    question: 'How many times will the instruction `count ← count + 1` be executed in this loop?',
    codeSnippet: 'count ← 0\ni ← 1\nWHILE i < 5 DO\n    count ← count + 1\n    i ← i + 1\nEND WHILE',
    options: ['4 times', '5 times', '6 times', '3 times'],
    correctAnswer: 0, // '4 times'
    hints: [
      'Write down the value of `i` for each iteration before entering the loop.',
      'Iteration 1: i=1 (1 < 5 is true). Iteration 2: i=2. Iteration 3: i=3. Iteration 4: i=4.',
      'At the end of iteration 4, i becomes 5. What happens at the condition `5 < 5`?'
    ],
    explanation: 'The loop tests `i < 5` (strictly less than). It runs for i = 1, 2, 3, and 4. When i becomes 5, `5 < 5` is FALSE and the loop terminates. Hence, it executes exactly 4 times.',
    misconceptions: [
      {
        id: 'misc-off-by-one-inclusive',
        triggerCondition: 'chose option 1',
        name: 'Off-by-One (< vs ≤)',
        description: 'Assuming < includes the endpoint 5.',
        remedyHint: 'Notice the operator is `<` (strictly less than), not `≤` (less than or equal). 5 < 5 is FALSE!'
      }
    ]
  },
  {
    id: 'ex-m4-2',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    title: 'GIU Level: Accumulator Scope Bug Identification',
    objective: 'Detect common accumulator reinitialization bug in loop.',
    difficulty: 'GIU_LEVEL',
    type: 'FIND_THE_ERROR',
    question: 'A student wrote the following algorithm to compute the sum of numbers from 1 to 4, but it outputs `4` instead of `10`. Where is the bug?',
    codeSnippet: '1. i ← 1\n2. WHILE i ≤ 4 DO\n3.     total ← 0\n4.     total ← total + i\n5.     i ← i + 1\n6. END WHILE\n7. PRINT total',
    options: [
      'The loop condition `i ≤ 4` should be `i < 4`.',
      'Line 3 (`total ← 0`) is inside the loop, resetting the sum to 0 on every iteration!',
      'Line 5 should be `i ← i + 2`.',
      'Line 7 should print `i` instead of `total`.'
    ],
    correctAnswer: 1,
    hints: [
      'Trace what happens to `total` at iteration 1, then at iteration 2.',
      'In iteration 1: total starts at 0, becomes 0+1=1. Then i becomes 2. Now start iteration 2: what does line 3 do?',
      'Line 3 sets total back to 0! The accumulated value from previous iterations is wiped out.'
    ],
    explanation: 'Line 3 resets `total` to 0 on every single loop pass. Accumulator variables must be initialized BEFORE the loop (outside the loop body), not inside it.',
    misconceptions: [
      {
        id: 'misc-loop-scope',
        triggerCondition: 'chose option 0',
        name: 'Misdiagnosing Scope Bug as Off-By-One',
        description: 'Assuming a math error is always an off-by-one condition error.',
        remedyHint: 'Look closely at where variables are initialized. If a variable is wiped to 0 inside the loop, previous work is lost.'
      }
    ]
  },
  {
    id: 'ex-m4-3',
    moduleId: 'mod-4',
    lessonId: 'les-8',
    title: 'Challenge: Infinite Loop Detection with Even Decrement',
    objective: 'Identify non-terminating loop condition with step mismatch.',
    difficulty: 'CHALLENGE',
    type: 'MULTIPLE_CHOICE',
    question: 'Examine this pseudocode. What will occur when executed with input n = 7?',
    codeSnippet: 'READ n\nWHILE n != 0 DO\n    n ← n - 2\nEND WHILE\nPRINT "Done"',
    options: [
      'It prints "Done" after 3 iterations.',
      'It terminates with an error at n = 0.',
      'It enters an infinite loop because n goes 7, 5, 3, 1, -1, -3... and never equals exactly 0!',
      'It executes 7 times and stops.'
    ],
    correctAnswer: 2,
    hints: [
      'Subtract 2 repeatedly starting from 7: 7, 5, 3, 1... What comes next?',
      '1 - 2 = -1. Does n ever equal 0?',
      'Because n skips from 1 to -1, the exact condition `n != 0` remains TRUE forever as n decreases into negative numbers!'
    ],
    explanation: 'Starting with an odd number (7) and decrementing by 2 steps over 0: 7 → 5 → 3 → 1 → -1 → -3... Since n is never exactly 0, `n != 0` is always TRUE, creating an infinite loop. A safer condition would be `WHILE n > 0 DO`.',
    misconceptions: [
      {
        id: 'misc-inequality-jump',
        triggerCondition: 'chose option 0',
        name: 'Zero-Crossing Blindspot',
        description: 'Assuming numbers counting down will automatically stop when they pass 0.',
        remedyHint: 'The condition tests `!= 0`, NOT `> 0`. Once n goes below 0, it is still NOT equal to 0!'
      }
    ]
  }
];
