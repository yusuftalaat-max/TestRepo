import { Module } from '../types/curriculum';

export const CURRICULUM_MODULES: Module[] = [
  // ==========================================
  // MODULE 1: Problems & Algorithms
  // ==========================================
  {
    id: 'mod-1',
    partNumber: 1,
    moduleNumber: 1,
    title: 'Problems & Algorithms',
    description: 'Deconstruct computational tasks into deterministic, step-by-step algorithms, inputs, outputs, and mutable memory states.',
    topicsCovered: [
      'Problems, algorithms and computational thinking',
      'Inputs, outputs and state variables',
      'Deterministic execution vs ambiguity',
      'State transformations over time'
    ],
    lessons: [
      {
        id: 'les-1',
        number: 1,
        partNumber: 1,
        moduleId: 'mod-1',
        title: 'Problems, Algorithms & Computational Thinking',
        subtitle: 'From human problem statements to unambiguous machine instructions',
        learningObjectives: [
          'Distinguish between unambiguous computational steps and vague heuristics.',
          'Trace temporal state transitions in sequential steps.',
          'Verify the 5 formal properties of an algorithm (Finiteness, Definiteness, Input, Output, Effectiveness).'
        ],
        objectives: [
          {
            id: 'obj-m1-l1-def',
            statement: 'Distinguish between unambiguous computational steps and vague human heuristics.',
            category: 'RECALL'
          },
          {
            id: 'obj-m1-l1-trace',
            statement: 'Trace temporal state transitions and variable values across sequential computational steps.',
            category: 'TRACING'
          },
          {
            id: 'obj-m1-l1-prop',
            statement: 'Verify whether a proposed procedure satisfies the 5 formal mathematical properties of an algorithm.',
            category: 'APPLICATION'
          }
        ],
        prerequisites: ['Basic high school algebra'],
        estimatedMinutes: 20,
        exerciseIds: ['ex-m1-1', 'ex-m1-1-trace', 'ex-m1-1-app', 'ex-m1-1-ps', 'ex-m1-1-inf', 'ex-m1-1-steps'],
        content: {
          intuitionWhy: 'Imagine giving instructions to a helper robot who has zero common sense. If you tell a human to "buy some apples at the market", they know how many to buy, what to do if the shop is closed, and when to stop. A computer has no instincts: unless every single decision, input, and stopping condition is specified with 100% precision, it will either freeze, crash, or run forever.',
          concreteExample: {
            scenario: 'Crossing a busy intersection safely',
            walkthrough: [
              'Vague human instruction: "Walk across when it looks clear." (Ambiguous! What if a car speeds around the corner?)',
              'Deterministic algorithm step 1: Look at the pedestrian signal light.',
              'Deterministic algorithm step 2: If the signal light is RED, wait and check again in 1 second.',
              'Deterministic algorithm step 3: If the signal light is GREEN, verify both left and right lanes have zero moving vehicles.',
              'Deterministic algorithm step 4: Walk straight across at 1 meter/second until sidewalk is reached.'
            ],
            keyObservation: 'Every step has exactly ONE possible action, depends on measurable facts, and guarantees safe completion.'
          },
          predictionChallenge: {
            code: [
              'x ← 7',
              'y ← 3',
              'x ← x + y',
              'y ← x * 2'
            ],
            prompt: 'Step through these 4 instructions in your head. What is the value stored in variable y when line 4 finishes?',
            options: ['6', '20', '14', '17'],
            correctIndex: 1,
            explanation: 'Line 1 gives x = 7. Line 2 gives y = 3. Line 3 evaluates 7 + 3 = 10 and stores it into x. Line 4 evaluates x * 2 = 10 * 2 = 20 and stores it into y.'
          },
          conceptSummary: 'An algorithm is a finite, ordered sequence of unambiguous instructions that takes well-defined inputs and produces an intended output. It is the logical blueprint that exists independently of whether it is written in C, Python, or traced by hand on paper.',
          keyTerminology: [
            { term: 'Definiteness', definition: 'Every individual instruction must be clear, exact, and have only one possible interpretation.' },
            { term: 'Finiteness', definition: 'The algorithm must be guaranteed to terminate after a finite number of steps for any valid input.' },
            { term: 'Effectiveness', definition: 'Each operation must be basic and feasible enough that a processor can execute it in a finite amount of time.' },
            { term: 'State', definition: 'The exact snapshot of all variable values and memory cells at any specific point in time during execution.' }
          ],
          demonstrationNotes: 'Watch the memory state table below. Notice that variables never change at random: memory changes strictly when an assignment line executes.',
          algorithmPresetId: 'sum-1-to-n',
          guidedExample: {
            problemStatement: 'Design an algorithm to calculate the average of three exam marks: m1, m2, and m3.',
            thoughtProcess: [
              '1. Identify inputs: three numbers m1, m2, m3 representing grades.',
              '2. Identify output: one real number representing the mean grade.',
              '3. Intermediate state: an accumulator variable `total` holding the sum.',
              '4. Compute result: divide `total` by 3.0.',
              '5. Emit output.'
            ],
            pseudocode: [
              '1. READ m1, m2, m3',
              '2. total ← m1 + m2 + m3',
              '3. avg ← total / 3.0',
              '4. PRINT avg'
            ],
            tracingTable: [
              { step: 1, line: 'READ m1, m2, m3', vars: 'm1=80, m2=90, m3=70', output: '-' },
              { step: 2, line: 'total ← m1 + m2 + m3', vars: 'total = 240', output: '-' },
              { step: 3, line: 'avg ← total / 3.0', vars: 'avg = 80.0', output: '-' },
              { step: 4, line: 'PRINT avg', vars: 'avg = 80.0', output: '80.0' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Treating code instructions as simultaneous algebraic equations rather than sequential actions.',
              whyWrong: 'In algebra, x = x + 1 is an impossible contradiction. In computation, it is a sequential command: "Take current value of x, add 1, then overwrite x."',
              correction: 'Always evaluate the right-hand side first using the current state, then write the result into the left variable.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Help your son realize that a computer is completely literal: it has no intuition. The assignment arrow (← or =) is a destructive action, not an equality balance.',
            questionsToAsk: [
              'Ask: If we write x ← x + 1, why does this make complete sense in programming but zero sense in high school algebra?',
              'Ask: What happens to the old value stored in a variable when a new value is written to it?',
              'Ask: What property guarantees that a program will not freeze forever?'
            ],
            subtleTraps: [
              'Watch out for him trying to calculate multiple steps at once in his head instead of writing down the state table row-by-row.'
            ],
            challengePrompt: 'Ask him to write an algorithm for a robot to find the largest of two numbers without using any built-in functions.'
          }
        }
      },
      {
        id: 'les-2',
        number: 2,
        partNumber: 1,
        moduleId: 'mod-1',
        title: 'Inputs, Outputs & Variables',
        subtitle: 'Modeling computational state and memory allocation',
        learningObjectives: [
          'Understand the destructive nature of variable assignment.',
          'Hand-trace multi-variable sequential mutations without losing data.',
          'Implement and verify the temporary variable swap pattern.'
        ],
        objectives: [
          {
            id: 'obj-m1-l2-assign',
            statement: 'Explain the destructive nature of variable assignment in memory cells.',
            category: 'RECALL'
          },
          {
            id: 'obj-m1-l2-trace',
            statement: 'Hand-trace multi-variable sequential mutations across multiple memory cells.',
            category: 'TRACING'
          },
          {
            id: 'obj-m1-l2-swap',
            statement: 'Formulate and verify the 3-step temporary variable swap pattern.',
            category: 'APPLICATION'
          }
        ],
        prerequisites: ['Lesson 1: Problems, Algorithms & Computational Thinking'],
        estimatedMinutes: 20,
        exerciseIds: ['ex-m1-2', 'ex-m1-2-trace', 'ex-m1-2-app', 'ex-m1-2-ps', 'ex-m1-2-mut', 'ex-m1-2-expr'],
        content: {
          intuitionWhy: 'Imagine you have two glasses: Glass A is filled with orange juice, and Glass B is filled with milk. If you want to swap their contents, you CANNOT simply pour Glass B directly into Glass A—Glass A would overflow, and the orange juice would be destroyed and lost forever! You need a third empty glass (a temporary holder) to hold the orange juice first.',
          concreteExample: {
            scenario: 'Swapping two values stored in memory cells a and b',
            walkthrough: [
              'Initial state: Cell `a` holds 5. Cell `b` holds 9.',
              'Flawed attempt: `a ← b; b ← a;` -> When `a ← b` runs, `a` becomes 9. But the original 5 is wiped out! Then `b ← a` sets `b` to 9. Both cells now hold 9 (the 5 was destroyed!).',
              'Correct solution: Step 1: Make a backup in a temporary cup: `temp ← a` (temp gets 5).',
              'Step 2: Safely overwrite cell `a`: `a ← b` (`a` gets 9).',
              'Step 3: Pour the backup into cell `b`: `b ← temp` (`b` gets 5).'
            ],
            keyObservation: 'Every variable is a single physical memory container. Overwriting it destroys the prior value permanently.'
          },
          predictionChallenge: {
            code: [
              'p ← 4',
              'q ← 8',
              'p ← q',
              'q ← p'
            ],
            prompt: 'What are the final values of p and q? Did they successfully swap?',
            options: [
              'p = 8, q = 4 (successfully swapped)',
              'p = 8, q = 8 (failed: original value of p was destroyed)',
              'p = 4, q = 8 (nothing changed)',
              'Syntax error'
            ],
            correctIndex: 1,
            explanation: 'Line 3 sets p to 8, destroying the original 4. Line 4 then reads p (which is now 8) and puts it in q. Both end up as 8!'
          },
          conceptSummary: 'Variables are named locations in computer memory that hold a single data value of a specific type. In computer architecture, assignment is destructive: writing a new value to a memory location replaces whatever was there previously.',
          keyTerminology: [
            { term: 'Variable', definition: 'A labeled memory cell that stores a single data value that can be read or modified.' },
            { term: 'Destructive Assignment', definition: 'The action where writing a new value into a variable erases the old value completely.' },
            { term: 'Temporary Variable (temp)', definition: 'An auxiliary variable created to preserve a value during state transformations such as swapping.' }
          ],
          demonstrationNotes: 'Run the Variable Swap preset in the visualizer to see the three memory cells (a, b, temp) change color as values move.',
          algorithmPresetId: 'variable-swap',
          guidedExample: {
            problemStatement: 'Given two numbers x and y, swap their values using a temporary variable `temp`.',
            thoughtProcess: [
              '1. Store x into temp so we do not lose x.',
              '2. Overwrite x with y.',
              '3. Overwrite y with the preserved temp value.'
            ],
            pseudocode: [
              '1. temp ← x',
              '2. x ← y',
              '3. y ← temp'
            ],
            tracingTable: [
              { step: 1, line: 'temp ← x', vars: 'x = 12, y = 99, temp = 12', output: '-' },
              { step: 2, line: 'x ← y', vars: 'x = 99, y = 99, temp = 12', output: '-' },
              { step: 3, line: 'y ← temp', vars: 'x = 99, y = 12, temp = 12', output: '-' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Trying to swap two variables with `x = y; y = x;`.',
              whyWrong: 'Line 1 destroys x before it can be copied into y.',
              correction: 'Always introduce `temp ← x` before changing `x`.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'This 3-step swap is the foundational pattern for sorting algorithms (like Bubble Sort and Selection Sort) in CS1.',
            questionsToAsk: [
              'Ask: Which exact line in `x ← y; y ← x;` causes the data loss?',
              'Ask: Can you swap two integer variables using only addition and subtraction without a temporary variable?'
            ],
            subtleTraps: [
              'Make sure he always writes the target variable on the LEFT side of the assignment arrow.'
            ],
            challengePrompt: 'Show that `x ← x + y; y ← x - y; x ← x - y;` performs a swap without temp!'
          }
        }
      }
    ]
  },

  // ==========================================
  // MODULE 2: Pseudocode & Algorithm Tracing
  // ==========================================
  {
    id: 'mod-2',
    partNumber: 1,
    moduleNumber: 2,
    title: 'Pseudocode & Algorithm Tracing',
    description: 'Master formal pseudocode standards and execute deterministic mental simulations using step-by-step trace tables.',
    topicsCovered: [
      'Formal pseudocode conventions',
      'Sequential instruction pointers',
      'Building rigorous state trace tables',
      'Detecting logic flaws before typing code'
    ],
    lessons: [
      {
        id: 'les-3',
        number: 3,
        partNumber: 1,
        moduleId: 'mod-2',
        title: 'Pseudocode Conventions & Structure',
        subtitle: 'The universal language of algorithm specification',
        learningObjectives: [
          'Read and interpret structured pseudocode statements.',
          'Apply integer division and MOD operators correctly in arithmetic evaluations.',
          'Translate human problem specifications into structured pseudocode.'
        ],
        objectives: [
          {
            id: 'obj-m2-l3-syntax',
            statement: 'Identify and apply standardized pseudocode keywords (READ, PRINT, ←, IF, WHILE).',
            category: 'RECALL'
          },
          {
            id: 'obj-m2-l3-mod',
            statement: 'Calculate outcomes of integer division (/) and modulo (MOD) remainder operations.',
            category: 'TRACING'
          },
          {
            id: 'obj-m2-l3-trans',
            statement: 'Translate multi-step human specifications into unambiguous structured pseudocode.',
            category: 'APPLICATION'
          }
        ],
        prerequisites: ['Module 1: Problems & Algorithms'],
        estimatedMinutes: 25,
        exerciseIds: ['ex-m2-1', 'ex-m2-1-trace', 'ex-m2-1-app', 'ex-m2-1-ps', 'ex-m2-1-prec', 'ex-m2-1-time'],
        content: {
          intuitionWhy: 'Before an architect builds a skyscraper, they draw architectural blueprints. They do not start pouring concrete on day one. In computer science, pseudocode is our architectural blueprint: it lets us verify that our logic is 100% sound without being distracted by compiler punctuation errors like missing semicolons or braces.',
          concreteExample: {
            scenario: 'Splitting 14 slices of pizza equally among 4 students',
            walkthrough: [
              'How many whole slices does each student receive? 14 / 4 = 3 slices each (this is integer division).',
              'How many slices are left over in the box? 14 - (4 * 3) = 2 slices (this is the MODULO operator: 14 MOD 4 = 2).',
              'In computer science: `/` between integers discards the fraction, and `MOD` returns the exact integer remainder.'
            ],
            keyObservation: 'Integer division and remainder are two complementary aspects of dividing integers.'
          },
          predictionChallenge: {
            code: [
              'a ← 17',
              'b ← 5',
              'q ← a / b   (integer division)',
              'r ← a MOD b (remainder)'
            ],
            prompt: 'In integer arithmetic, what are the values of q and r?',
            options: [
              'q = 3, r = 2',
              'q = 3.4, r = 2',
              'q = 2, r = 3',
              'q = 3, r = 0'
            ],
            correctIndex: 0,
            explanation: '17 divided by 5 is 3 with a remainder of 2, because 5 * 3 + 2 = 17.'
          },
          conceptSummary: 'Pseudocode is a semi-formal, language-independent notation that uses structured programming keywords (READ, PRINT, ←, IF, WHILE, END) to describe algorithms with complete precision.',
          keyTerminology: [
            { term: 'Pseudocode', definition: 'A structured, human-readable notation for algorithms that avoids specific programming language syntax.' },
            { term: 'Integer Division (/)', definition: 'Division where fractional decimals are discarded, leaving only the whole integer quotient.' },
            { term: 'Modulo Operator (MOD or %)', definition: 'An operator that returns the integer remainder after integer division.' }
          ],
          demonstrationNotes: 'Observe how the instruction pointer moves sequentially line-by-line down the pseudocode unless redirected.',
          algorithmPresetId: 'count-evens',
          guidedExample: {
            problemStatement: 'Write pseudocode to convert a time given in total seconds (e.g. 3665) into hours, minutes, and remaining seconds.',
            thoughtProcess: [
              '1. 1 hour = 3600 seconds. Hours = totalSeconds / 3600.',
              '2. Remaining seconds after extracting hours = totalSeconds MOD 3600.',
              '3. 1 minute = 60 seconds. Minutes = remaining / 60.',
              '4. Final leftover seconds = remaining MOD 60.'
            ],
            pseudocode: [
              '1. READ totalSec',
              '2. hrs ← totalSec / 3600',
              '3. rem ← totalSec MOD 3600',
              '4. mins ← rem / 60',
              '5. secs ← rem MOD 60',
              '6. PRINT hrs, mins, secs'
            ],
            tracingTable: [
              { step: 1, line: 'READ totalSec', vars: 'totalSec = 3665', output: '-' },
              { step: 2, line: 'hrs ← 3665 / 3600', vars: 'hrs = 1', output: '-' },
              { step: 3, line: 'rem ← 3665 MOD 3600', vars: 'rem = 65', output: '-' },
              { step: 4, line: 'mins ← 65 / 60', vars: 'mins = 1', output: '-' },
              { step: 5, line: 'secs ← 65 MOD 60', vars: 'secs = 5', output: '-' },
              { step: 6, line: 'PRINT', vars: 'hrs=1, mins=1, secs=5', output: '1 hr, 1 min, 5 sec' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Assuming MOD returns a percentage or floating-point fraction.',
              whyWrong: 'MOD is strictly the whole integer remainder from division.',
              correction: 'Always check: (Quotient * Divisor) + Remainder MUST equal the Dividend.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'GIU CS1 exams test MOD extensively. It is used to check even/oddness (n MOD 2 == 0), extract digits (n MOD 10), and circular buffers.',
            questionsToAsk: [
              'Ask: How can you extract the last digit of an integer using MOD? (Answer: n MOD 10)',
              'Ask: How can you remove the last digit of an integer? (Answer: n / 10)'
            ],
            subtleTraps: [
              'Ensure he never writes vague English in pseudocode like "repeat until done".'
            ],
            challengePrompt: 'Have him write pseudocode to test if an integer is a multiple of 7.'
          }
        }
      },
      {
        id: 'les-4',
        number: 4,
        partNumber: 1,
        moduleId: 'mod-2',
        title: 'Algorithm Tracing with State Tables',
        subtitle: 'The essential skill for debugging without a computer',
        learningObjectives: [
          'Construct a complete trace table tracking all variable state changes.',
          'Accurately record Boolean condition evaluations before executing branch lines.',
          'Isolate algorithmic bugs by identifying the exact row where actual state diverges from expectation.'
        ],
        objectives: [
          {
            id: 'obj-m2-l4-construct',
            statement: 'Construct a state trace table with dedicated columns for step, line, variables, conditions, and outputs.',
            category: 'TRACING'
          },
          {
            id: 'obj-m2-l4-branch',
            statement: 'Track instruction pointer movement and branch skipping in trace tables.',
            category: 'TRACING'
          },
          {
            id: 'obj-m2-l4-debug',
            statement: 'Diagnose and locate the exact step where an algorithm fails by inspecting state tables.',
            category: 'PROBLEM_SOLVING'
          }
        ],
        prerequisites: ['Lesson 3: Pseudocode Conventions & Structure'],
        estimatedMinutes: 30,
        exerciseIds: ['ex-m2-2', 'ex-m2-2-trace', 'ex-m2-2-app', 'ex-m2-2-ps', 'ex-m2-2-table', 'ex-m2-2-off'],
        content: {
          intuitionWhy: 'When an airplane encounters a mechanical problem, engineers don\'t guess: they read the black-box flight data recorder, which records the altitude, speed, and rudder angle at every fraction of a second. A trace table is your black-box flight recorder for code. When code produces the wrong answer, a trace table shows you the exact line where reality departed from your plan.',
          concreteExample: {
            scenario: 'Simulating the computation of absolute value for x = -7',
            walkthrough: [
              'We have an algorithm: If x < 0, set result to -1 * x; otherwise set result to x.',
              'We create a table with columns: [Step, Line Number, x, Condition (x < 0), result, Output].',
              'Step 1 (Line 1): Read x → x is -7. result is undefined.',
              'Step 2 (Line 2): Check condition: is -7 < 0? Yes (TRUE).',
              'Step 3 (Line 3): Enter TRUE branch: result gets -1 * (-7) = 7.',
              'Step 4 (Line 4): Skip the ELSE branch entirely because line 2 was TRUE.',
              'Step 5 (Line 5): Print result → outputs 7.'
            ],
            keyObservation: 'Writing down each row forces your brain to act like an honest CPU instead of jumping to assumptions.'
          },
          predictionChallenge: {
            code: [
              'READ a, b',
              'IF a > b THEN',
              '    temp ← a',
              '    a ← b',
              '    b ← temp',
              'END IF',
              'PRINT a, b'
            ],
            prompt: 'If the input values are a = 3 and b = 8, what does the IF condition evaluate to, and what is printed?',
            options: [
              'Condition 3 > 8 is FALSE; the IF body is skipped; prints 3, 8',
              'Condition 3 > 8 is TRUE; values are swapped; prints 8, 3',
              'Condition 3 > 8 is FALSE; prints 8, 3 anyway',
              'Runtime error'
            ],
            correctIndex: 0,
            explanation: '3 > 8 is FALSE. Therefore lines 3-5 are completely bypassed, and line 7 prints the original values 3, 8 (already sorted!).'
          },
          conceptSummary: 'A trace table (or dry run table) is a grid where columns represent variables, condition evaluations, and output, and rows represent successive execution steps over time. It is the gold standard for manual algorithm verification.',
          keyTerminology: [
            { term: 'Trace Table', definition: 'A tabular record of variable values and condition tests at every single step of program execution.' },
            { term: 'Dry Run', definition: 'The process of executing an algorithm by hand using pencil and paper without running it on a computer.' },
            { term: 'Branch Bypass', definition: 'Skipping a block of instructions because its governing conditional test evaluated to FALSE.' }
          ],
          demonstrationNotes: 'Use the step-by-step buttons in the visualizer. Each click generates one row in the trace table.',
          algorithmPresetId: 'find-max-of-three',
          guidedExample: {
            problemStatement: 'Trace the algorithm that determines if an integer `n` is even or odd for n = 4.',
            thoughtProcess: [
              '1. Read n = 4.',
              '2. Evaluate condition: (n MOD 2) == 0. 4 MOD 2 is 0. 0 == 0 is TRUE.',
              '3. Execute IF branch: print "EVEN".',
              '4. Skip ELSE branch.'
            ],
            pseudocode: [
              '1. READ n',
              '2. IF (n MOD 2) == 0 THEN',
              '3.     PRINT "EVEN"',
              '4. ELSE',
              '5.     PRINT "ODD"',
              '6. END IF'
            ],
            tracingTable: [
              { step: 1, line: '1. READ n', vars: 'n = 4', output: '-' },
              { step: 2, line: '2. (4 MOD 2) == 0', vars: '0 == 0 (TRUE)', output: '-' },
              { step: 3, line: '3. PRINT "EVEN"', vars: 'n = 4', output: 'EVEN' },
              { step: 4, line: '6. END IF (bypassed lines 4-5)', vars: 'n = 4', output: '-' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Skipping steps or updating variables in your head instead of writing each row.',
              whyWrong: 'Mental shortcuts lead directly to off-by-one errors and missed branch skips on exams.',
              correction: 'Strictly one row per executed statement. Always record condition truth values explicitly.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'GIU exams allocate up to 40% of marks to trace tables. If your son develops the discipline to write trace tables calmly, he will avoid careless errors.',
            questionsToAsk: [
              'Ask: What happened to the ELSE branch when the condition was TRUE? Did the computer touch it?',
              'Ask: Why should we test algorithms with negative, zero, and positive numbers?'
            ],
            subtleTraps: [
              'Ensure he records the condition result (TRUE/FALSE) in its own column.'
            ],
            challengePrompt: 'Create a 4-line algorithm with a subtle bug and challenge him to locate it solely by filling in a trace table.'
          }
        }
      }
    ]
  },

  // ==========================================
  // MODULE 3: Conditions & Selection
  // ==========================================
  {
    id: 'mod-3',
    partNumber: 1,
    moduleNumber: 3,
    title: 'Conditions & Selection',
    description: 'Master binary decision branching, truth tables, relational and logical operators, and multi-way selection structures.',
    topicsCovered: [
      'Relational comparisons (==, !=, <, ≤, >, ≥)',
      'Boolean operators (AND, OR, NOT)',
      'IF-THEN, IF-THEN-ELSE structures',
      'Nested conditions and multi-way ladders'
    ],
    lessons: [
      {
        id: 'les-5',
        number: 5,
        partNumber: 1,
        moduleId: 'mod-3',
        title: 'Conditions & Selection Structures',
        subtitle: 'Empowering programs to make decisions',
        learningObjectives: [
          'Formulate valid relational comparison tests.',
          'Differentiate between chained independent IFs and mutually exclusive IF-ELSE IF ladders.',
          'Design robust multi-way decision trees without gaps or overlapping intervals.'
        ],
        objectives: [
          {
            id: 'obj-m3-l5-rel',
            statement: 'Formulate correct Boolean expressions using relational operators (=, ≠, <, ≤, >, ≥).',
            category: 'RECALL'
          },
          {
            id: 'obj-m3-l5-excl',
            statement: 'Differentiate between independent IF statements and mutually exclusive IF-ELSE IF-ELSE ladders.',
            category: 'TRACING'
          },
          {
            id: 'obj-m3-l5-multi',
            statement: 'Construct multi-way selection ladders covering all valid input partitions without logical gaps.',
            category: 'APPLICATION'
          }
        ],
        prerequisites: ['Module 2: Pseudocode & Algorithm Tracing'],
        estimatedMinutes: 25,
        exerciseIds: ['ex-m3-1', 'ex-m3-1-trace', 'ex-m3-1-app', 'ex-m3-1-ps', 'ex-m3-1-bound', 'ex-m3-1-fall'],
        content: {
          intuitionWhy: 'Imagine a railway track switch. When the train arrives at the junction, it can travel down Track A or Track B, but it can NEVER travel down both simultaneously. Selection structures in programming act like this track switch: depending on whether a question is TRUE or FALSE, the computer selects one path and completely ignores the other.',
          concreteExample: {
            scenario: 'Categorizing water temperature into Solid, Liquid, or Gas',
            walkthrough: [
              'Question 1: Is temperature ≤ 0°C? If YES → it is ICE (Solid). We are done!',
              'If NO, Question 2: Is temperature ≥ 100°C? If YES → it is STEAM (Gas). We are done!',
              'If NO to both, it must be LIQUID. No third question is needed!',
              'Notice: exactly ONE of the three labels can be chosen for any temperature.'
            ],
            keyObservation: 'In an IF - ELSE IF - ELSE ladder, once the first matching branch executes, all remaining branches are skipped.'
          },
          predictionChallenge: {
            code: [
              'score ← 85',
              'IF score > 70 THEN',
              '    PRINT "Good"',
              'END IF',
              'IF score > 80 THEN',
              '    PRINT "Excellent"',
              'END IF'
            ],
            prompt: 'Notice these are TWO SEPARATE IF statements (not an IF-ELSE). What will be printed for score = 85?',
            options: [
              'Only "Good"',
              'Only "Excellent"',
              'Both "Good" and "Excellent" on separate lines',
              'Nothing'
            ],
            correctIndex: 2,
            explanation: 'Because they are two independent IF statements without an ELSE, BOTH conditions are tested. Since 85 > 70 is TRUE, "Good" is printed. Then since 85 > 80 is ALSO TRUE, "Excellent" is printed as well!'
          },
          conceptSummary: 'Selection structures alter sequential execution flow based on Boolean tests. An IF-THEN-ELSE ladder enforces mutual exclusivity: at most one branch executes.',
          keyTerminology: [
            { term: 'Branching', definition: 'Directing execution down a specific instruction path based on a condition.' },
            { term: 'Mutual Exclusivity', definition: 'A property where the execution of one branch guarantees the exclusion of all other branches.' },
            { term: 'Relational Operator', definition: 'An operator that compares two values and produces a Boolean result (TRUE or FALSE).' }
          ],
          demonstrationNotes: 'Trace the Max of Three preset to see how successive comparisons narrow down the maximum value.',
          algorithmPresetId: 'find-max-of-three',
          guidedExample: {
            problemStatement: 'Classify an input integer `n` as POSITIVE, NEGATIVE, or ZERO.',
            thoughtProcess: [
              'Test 1: is n > 0? If TRUE → "POSITIVE".',
              'If FALSE, test 2: is n < 0? If TRUE → "NEGATIVE".',
              'If both FALSE, by logical elimination n must be "ZERO".'
            ],
            pseudocode: [
              '1. READ n',
              '2. IF n > 0 THEN',
              '3.     PRINT "POSITIVE"',
              '4. ELSE IF n < 0 THEN',
              '5.     PRINT "NEGATIVE"',
              '6. ELSE',
              '7.     PRINT "ZERO"',
              '8. END IF'
            ],
            tracingTable: [
              { step: 1, line: 'READ n', vars: 'n = 0', output: '-' },
              { step: 2, line: 'IF n > 0', vars: '0 > 0 is FALSE', output: '-' },
              { step: 3, line: 'ELSE IF n < 0', vars: '0 < 0 is FALSE', output: '-' },
              { step: 4, line: 'ELSE', vars: 'default branch runs', output: 'ZERO' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Using chained independent IFs instead of ELSE IF when only one classification should occur.',
              whyWrong: 'A single input can accidentally trigger multiple independent IFs, printing conflicting answers.',
              correction: 'Use ELSE IF whenever choices are mutually exclusive.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Students often struggle to see why `IF (a > b) ... IF (b > c)` is very different from `IF (a > b) ... ELSE IF (b > c)`. Help him visualize the two paths.',
            questionsToAsk: [
              'Ask: In a ladder with 4 `ELSE IF` branches, how many can execute? (Answer: exactly one!)',
              'Ask: What is the purpose of the final `ELSE` block without a condition? (Answer: catch-all fallback)'
            ],
            subtleTraps: [
              'Watch out for him writing conditions like `10 < x < 20`, which is valid math notation but invalid in algorithms. It must be `(x > 10) AND (x < 20)`.'
            ],
            challengePrompt: 'Ask him how to find the minimum of three numbers using the fewest comparisons.'
          }
        }
      },
      {
        id: 'les-6',
        number: 6,
        partNumber: 1,
        moduleId: 'mod-3',
        title: 'Compound Boolean Conditions & Logic',
        subtitle: 'Combining decisions with AND, OR, and NOT',
        learningObjectives: [
          'Construct and evaluate truth tables for compound Boolean expressions.',
          'Formulate compound conditions with correct precedence and parentheses.',
          'Simplify and negate complex compound boundary checks using De Morgan\'s principles.'
        ],
        objectives: [
          {
            id: 'obj-m3-l6-truth',
            statement: 'Evaluate the truth value of compound expressions involving AND, OR, and NOT.',
            category: 'RECALL'
          },
          {
            id: 'obj-m3-l6-compound',
            statement: 'Formulate valid interval checks and boundary validations using logical operators.',
            category: 'TRACING'
          },
          {
            id: 'obj-m3-l6-demorgan',
            statement: 'Apply De Morgan\'s Laws to correctly negate compound conditions.',
            category: 'APPLICATION'
          }
        ],
        prerequisites: ['Lesson 5: Conditions & Selection Structures'],
        estimatedMinutes: 25,
        exerciseIds: ['ex-m3-2', 'ex-m3-2-trace', 'ex-m3-2-app', 'ex-m3-2-ps', 'ex-m3-2-short', 'ex-m3-2-leap'],
        content: {
          intuitionWhy: 'Think of a bank vault with two distinct locks: Vault A requires Key 1 AND Key 2 simultaneously to open. If you only have one key, it stays locked. Now think of an apartment building entrance with a keycard reader OR an intercom button: you can enter with EITHER your card OR by someone buzzing you in. In computer logic, AND requires everything to be true, while OR requires at least one.',
          concreteExample: {
            scenario: 'Checking if an applicant is eligible to drive alone',
            walkthrough: [
              'Requirement 1: Age must be at least 18 (age ≥ 18).',
              'Requirement 2: Must have a valid driver license (hasLicense == TRUE).',
              'Both conditions are mandatory. A 16-year-old with a license cannot drive alone. A 30-year-old without a license cannot drive alone.',
              'Compound condition: `(age ≥ 18) AND (hasLicense == TRUE)`.'
            ],
            keyObservation: 'AND narrows down choices (both must hold). OR widens choices (either one holds).'
          },
          predictionChallenge: {
            code: [
              'x ← 5',
              'y ← 12',
              'test ← (x > 3) AND (y < 10)'
            ],
            prompt: 'What is the final Boolean value of variable `test`?',
            options: ['TRUE', 'FALSE', '5', '12'],
            correctIndex: 1,
            explanation: 'x > 3 is 5 > 3 (TRUE). y < 10 is 12 < 10 (FALSE). TRUE AND FALSE evaluates to FALSE.'
          },
          conceptSummary: 'Compound conditions combine relational tests using logical conjunction (AND), disjunction (OR), and negation (NOT). In operator precedence, NOT is evaluated first, then AND, then OR.',
          keyTerminology: [
            { term: 'AND (Conjunction)', definition: 'Evaluates to TRUE if and only if both operands are TRUE.' },
            { term: 'OR (Disjunction)', definition: 'Evaluates to TRUE if at least one operand is TRUE.' },
            { term: 'NOT (Negation)', definition: 'Inverts TRUE to FALSE, and FALSE to TRUE.' },
            { term: 'Short-Circuit Evaluation', definition: 'Stopping expression evaluation as soon as the result is determined (e.g. FALSE AND anything is immediately FALSE).' }
          ],
          demonstrationNotes: 'Notice how short-circuit evaluation allows safe boundary checks without crashing.',
          algorithmPresetId: 'count-evens',
          guidedExample: {
            problemStatement: 'Verify whether an input mark `score` is a valid percentage (between 0 and 100 inclusive).',
            thoughtProcess: [
              'Condition 1: score ≥ 0.',
              'Condition 2: score ≤ 100.',
              'Both must hold simultaneously → use AND.'
            ],
            pseudocode: [
              '1. READ score',
              '2. IF (score ≥ 0) AND (score ≤ 100) THEN',
              '3.     PRINT "Valid percentage"',
              '4. ELSE',
              '5.     PRINT "Invalid percentage: out of bounds"',
              '6. END IF'
            ],
            tracingTable: [
              { step: 1, line: 'READ score', vars: 'score = 105', output: '-' },
              { step: 2, line: '(105 ≥ 0) AND (105 ≤ 100)', vars: 'TRUE AND FALSE = FALSE', output: '-' },
              { step: 3, line: 'Execute ELSE branch', vars: 'score = 105', output: 'Invalid percentage: out of bounds' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Using OR instead of AND for interval checking: `IF (score >= 0) OR (score <= 100)`.',
              whyWrong: 'Every single number in the universe satisfies this! If score is 500, it is ≥ 0. If score is -50, it is ≤ 100.',
              correction: 'For inclusive ranges between min and max, ALWAYS use AND.'
            },
            {
              mistake: 'Thinking the negation of x > 5 is x < 5.',
              whyWrong: 'You forgot the equals case! If x is exactly 5, neither x > 5 nor x < 5 is true.',
              correction: 'The negation of strictly greater `>` is less-than-or-equal `≤`.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Teach him De Morgan\'s Law with intuitive examples: "NOT (Tall AND Handsome)" means "Either not tall OR not handsome."',
            questionsToAsk: [
              'Ask: What is the negation of `(x ≥ 0) AND (x ≤ 100)`? (Answer: `(x < 0) OR (x > 100)`)',
              'Ask: Why does `FALSE AND (very_slow_calculation())` evaluate instantly without calculating the second part?'
            ],
            subtleTraps: [
              'Watch for parentheses! `NOT A AND B` means `(NOT A) AND B`, not `NOT (A AND B)`.'
            ],
            challengePrompt: 'Ask him to write a condition checking if a triangle with side lengths a, b, c is valid (each side must be strictly less than the sum of the other two).'
          }
        }
      }
    ]
  },

  // ==========================================
  // MODULE 4: Loops & Iteration
  // ==========================================
  {
    id: 'mod-4',
    partNumber: 1,
    moduleNumber: 4,
    title: 'Loops & Iteration',
    description: 'Master pre-test while loops, loop counters, accumulators, termination conditions, and eliminate off-by-one errors.',
    topicsCovered: [
      'The anatomy of a loop (initialization, condition, body, update)',
      'Pre-test WHILE loops vs post-test structures',
      'The accumulator and counter patterns',
      'Diagnosing infinite loops and off-by-one errors'
    ],
    lessons: [
      {
        id: 'les-7',
        number: 7,
        partNumber: 1,
        moduleId: 'mod-4',
        title: 'Anatomy of Loops & While Statements',
        subtitle: 'Automating repetition with pre-test conditions',
        learningObjectives: [
          'Identify the four vital components of any loop construct (Initialization, Condition, Body, Update).',
          'Trace pre-test WHILE loops line-by-line, recording counter states and termination values.',
          'Prove loop termination and diagnose infinite loop hazards.'
        ],
        objectives: [
          {
            id: 'obj-m4-l7-components',
            statement: 'Identify the four essential components of any loop (Init, Condition, Body, Update).',
            category: 'RECALL'
          },
          {
            id: 'obj-m4-l7-trace',
            statement: 'Trace pre-test WHILE loops line-by-line, including zero-iteration and termination values.',
            category: 'TRACING'
          },
          {
            id: 'obj-m4-l7-term',
            statement: 'Diagnose non-terminating loops and verify progress toward the stopping condition.',
            category: 'APPLICATION'
          }
        ],
        prerequisites: ['Module 3: Conditions & Selection'],
        estimatedMinutes: 30,
        exerciseIds: ['ex-m4-1', 'ex-m4-1-trace', 'ex-m4-1-app', 'ex-m4-1-ps', 'ex-m4-1-step', 'ex-m4-1-bounds'],
        content: {
          intuitionWhy: 'Imagine you are doing pushups for workout training. You don\'t just collapse on the floor randomly. 1) You decide on a goal: 5 pushups. 2) You start counting at 1. 3) BEFORE each pushup, you ask yourself: "Is my count ≤ 5?" If YES, you do the pushup. 4) After the pushup, you increment your count: count ← count + 1. If you forgot to increase your count, you would do pushups forever until exhaustion! That is an infinite loop.',
          concreteExample: {
            scenario: 'Printing the numbers 1, 2, 3 using a pre-test WHILE loop',
            walkthrough: [
              'Part 1: Initialization → `i ← 1` (set starting point).',
              'Part 2: Condition check → Is 1 ≤ 3? TRUE! Enter loop body.',
              'Part 3: Loop body → PRINT 1.',
              'Part 4: State update → `i ← 1 + 1 = 2`. Go back to Part 2!',
              'Second pass: Is 2 ≤ 3? TRUE! PRINT 2. `i ← 3`.',
              'Third pass: Is 3 ≤ 3? TRUE! PRINT 3. `i ← 4`.',
              'Fourth pass: Is 4 ≤ 3? FALSE! Loop stops! Execution moves forward.',
              'Notice: At the end of the loop, `i` holds 4, NOT 3!'
            ],
            keyObservation: 'To FAIL the condition `i ≤ 3`, `i` had to advance to 4.'
          },
          predictionChallenge: {
            code: [
              'k ← 10',
              'WHILE k < 5 DO',
              '    PRINT k',
              '    k ← k + 1',
              'END WHILE',
              'PRINT "Finished"'
            ],
            prompt: 'How many times does the loop body execute before "Finished" is printed?',
            options: [
              'Zero times (10 < 5 is FALSE immediately on the pre-test)',
              '5 times',
              '10 times',
              'Infinite loop'
            ],
            correctIndex: 0,
            explanation: 'In a pre-test WHILE loop, the condition is evaluated BEFORE the first iteration. Because 10 < 5 is FALSE right away, the body is completely skipped!'
          },
          conceptSummary: 'A pre-test WHILE loop repeats a block of instructions as long as its Boolean condition evaluates to TRUE. Every robust loop must contain an initialization, a test, a body, and a state update that moves closer to termination.',
          keyTerminology: [
            { term: 'Loop Counter', definition: 'A variable initialized before a loop that advances on each iteration to control execution count.' },
            { term: 'Pre-Test Evaluation', definition: 'Checking the termination condition before every pass through the loop body.' },
            { term: 'Zero-Iteration Loop', definition: 'A loop whose body never runs because the initial condition test evaluates to FALSE immediately.' },
            { term: 'Infinite Loop', definition: 'A loop that never terminates because its condition never evaluates to FALSE.' }
          ],
          demonstrationNotes: 'Step through the Sum 1 to N visualizer to observe the counter incrementing on each iteration.',
          algorithmPresetId: 'sum-1-to-n',
          guidedExample: {
            problemStatement: 'Print the even numbers from 2 up to 8 inclusive using a WHILE loop.',
            thoughtProcess: [
              '1. Start counter at 2: `count ← 2`.',
              '2. Condition: while `count ≤ 8`.',
              '3. Body: PRINT count.',
              '4. Update: step by 2: `count ← count + 2`.'
            ],
            pseudocode: [
              '1. count ← 2',
              '2. WHILE count ≤ 8 DO',
              '3.     PRINT count',
              '4.     count ← count + 2',
              '5. END WHILE',
              '6. PRINT "Done"'
            ],
            tracingTable: [
              { step: 1, line: 'count ← 2', vars: 'count = 2', output: '-' },
              { step: 2, line: '2 ≤ 8 (TRUE)', vars: 'count = 2', output: '2' },
              { step: 3, line: 'count ← 2 + 2', vars: 'count = 4', output: '-' },
              { step: 4, line: '4 ≤ 8 (TRUE)', vars: 'count = 4', output: '4' },
              { step: 5, line: 'count ← 4 + 2', vars: 'count = 6', output: '-' },
              { step: 6, line: '6 ≤ 8 (TRUE)', vars: 'count = 6', output: '6' },
              { step: 7, line: 'count ← 6 + 2', vars: 'count = 8', output: '-' },
              { step: 8, line: '8 ≤ 8 (TRUE)', vars: 'count = 8', output: '8' },
              { step: 9, line: 'count ← 8 + 2', vars: 'count = 10', output: '-' },
              { step: 10, line: '10 ≤ 8 (FALSE)', vars: 'count = 10', output: 'Done' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Forgetting to advance the counter variable inside the loop (`i ← i + 1`).',
              whyWrong: 'If `i` never changes, the condition will remain TRUE forever, locking the CPU in an infinite loop.',
              correction: 'Always ensure the loop body modifies at least one variable involved in the condition test.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Ask your son what value the counter holds immediately after the loop exits. Almost all beginners guess 8. Show him that to fail `count ≤ 8`, count had to reach 10!',
            questionsToAsk: [
              'Ask: What value does `count` have after the loop terminates? Why is it 10 and not 8?',
              'Ask: What would happen if we placed `count ← count + 2` before `PRINT count`?'
            ],
            subtleTraps: [
              'Students often confuse the termination condition (when to stop) with the continuation condition (when to keep going).'
            ],
            challengePrompt: 'Have him write a loop that counts DOWN from 10 to 1, and predict the final value of the variable upon exit.'
          }
        }
      },
      {
        id: 'les-8',
        number: 8,
        partNumber: 1,
        moduleId: 'mod-4',
        title: 'Accumulators, Invariants & Debugging Loops',
        subtitle: 'Computing running totals, products, and detecting subtle bugs',
        learningObjectives: [
          'Select correct initialization identities (0 for sums, 1 for products).',
          'Trace combined loop counters and accumulators across iterations.',
          'Diagnose and fix accumulator reset bugs, OBOE boundary flaws, and invariant violations.'
        ],
        objectives: [
          {
            id: 'obj-m4-l8-ident',
            statement: 'Select correct mathematical identities for accumulator initializations (0 for additive, 1 for multiplicative).',
            category: 'RECALL'
          },
          {
            id: 'obj-m4-l8-pattern',
            statement: 'Trace combined counter and accumulator mutations across successive loop iterations.',
            category: 'TRACING'
          },
          {
            id: 'obj-m4-l8-debug',
            statement: 'Diagnose scope placement errors, accumulator reset bugs, and off-by-one errors.',
            category: 'PROBLEM_SOLVING'
          }
        ],
        prerequisites: ['Lesson 7: Anatomy of Loops & While Statements'],
        estimatedMinutes: 30,
        exerciseIds: ['ex-m4-2', 'ex-m4-2-trace', 'ex-m4-2-app', 'ex-m4-2-ps', 'ex-m4-2-inv', 'ex-m4-2-priming'],
        content: {
          intuitionWhy: 'An accumulator is like a physical piggy bank. You place it on your desk initially empty ($0). Every day, you drop in today\'s pocket money: `total ← total + today`. If you made the terrible mistake of emptying the piggy bank back to $0 every morning inside your daily routine, you would only ever possess today\'s pocket money! That is why an accumulator must be initialized ONCE outside the loop.',
          concreteExample: {
            scenario: 'Calculating the factorial of 4 (4! = 1 * 2 * 3 * 4 = 24)',
            walkthrough: [
              'Because factorial involves MULTIPLICATION, our accumulator `fact` must start at 1, NOT 0! (If it started at 0, 0 * 1 * 2 * 3 * 4 would be 0!).',
              'Pass 1: fact ← 1 * 1 = 1.',
              'Pass 2: fact ← 1 * 2 = 2.',
              'Pass 3: fact ← 2 * 3 = 6.',
              'Pass 4: fact ← 6 * 4 = 24.',
              'Final result is 24.'
            ],
            keyObservation: 'Additive accumulators start at 0 (identity for addition). Multiplicative accumulators start at 1 (identity for multiplication).'
          },
          predictionChallenge: {
            code: [
              'sum ← 0',
              'i ← 1',
              'WHILE i ≤ 3 DO',
              '    sum ← sum + 10',
              '    i ← i + 1',
              'END WHILE',
              'PRINT sum'
            ],
            prompt: 'What will be printed when this algorithm completes?',
            options: ['30', '10', '40', '0'],
            correctIndex: 0,
            explanation: 'The loop executes 3 times (for i = 1, 2, 3). In each pass, it adds 10 to sum. 0 + 10 + 10 + 10 = 30.'
          },
          conceptSummary: 'The accumulator pattern aggregates information across loop iterations. An accumulator must always be initialized outside the loop to its mathematical identity element (0 for sums, 1 for products).',
          keyTerminology: [
            { term: 'Accumulator Pattern', definition: 'A variable initialized before a loop that progressively collects partial results during each iteration.' },
            { term: 'Additive Identity', definition: '0, because adding 0 leaves any value unchanged (sum ← 0).' },
            { term: 'Multiplicative Identity', definition: '1, because multiplying by 1 leaves any value unchanged (prod ← 1).' },
            { term: 'Off-By-One Error (OBOE)', definition: 'A boundary flaw where a loop executes one iteration too many or too few (e.g. using < instead of ≤).' }
          ],
          demonstrationNotes: 'Watch the Factorial visualizer preset to observe `fact` growing multiplicatively on each pass.',
          algorithmPresetId: 'factorial-loop',
          guidedExample: {
            problemStatement: 'Compute the sum of integers from 1 up to N.',
            thoughtProcess: [
              '1. Read n.',
              '2. Initialize accumulator `total ← 0`.',
              '3. Initialize counter `i ← 1`.',
              '4. Loop while `i ≤ n`.',
              '5. `total ← total + i`.',
              '6. `i ← i + 1`.',
              '7. Output total.'
            ],
            pseudocode: [
              '1. READ n',
              '2. total ← 0',
              '3. i ← 1',
              '4. WHILE i ≤ n DO',
              '5.     total ← total + i',
              '6.     i ← i + 1',
              '7. END WHILE',
              '8. PRINT total'
            ],
            tracingTable: [
              { step: 1, line: 'total ← 0, i ← 1', vars: 'total = 0, i = 1', output: '-' },
              { step: 2, line: 'Iter 1: total ← 0 + 1 = 1, i ← 2', vars: 'total = 1, i = 2', output: '-' },
              { step: 3, line: 'Iter 2: total ← 1 + 2 = 3, i ← 3', vars: 'total = 3, i = 3', output: '-' },
              { step: 4, line: 'Iter 3: total ← 3 + 3 = 6, i ← 4', vars: 'total = 6, i = 4', output: '-' },
              { step: 5, line: '4 ≤ 3 (FALSE)', vars: 'total = 6, i = 4', output: '6' }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Placing the accumulator initialization inside the loop body (e.g. `sum ← 0` on line 5).',
              whyWrong: 'Every single iteration resets the total back to 0, destroying all previous additions.',
              correction: 'Always initialize accumulators once, directly above the WHILE statement.'
            },
            {
              mistake: 'Initializing a product accumulator to 0.',
              whyWrong: 'Because 0 × anything = 0, the product will remain 0 forever.',
              correction: 'Always initialize product accumulators to 1.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'The accumulator bug where students initialize inside the loop body is the #1 most common loop bug in GIU labs. Show him the difference between the two placements.',
            questionsToAsk: [
              'Ask: What happens if we write `total ← 0` inside the while loop body?',
              'Ask: Why must `prod ← 1` be used for factorials instead of `prod ← 0`?'
            ],
            subtleTraps: [
              'Check for off-by-one errors: does the problem say "less than N" (<) or "up to and including N" (≤)?'
            ],
            challengePrompt: 'Ask him to write an algorithm that calculates the average of numbers entered by a user until the user enters -1 (sentinel value).'
          }
        }
      }
    ]
  }
];

export const FULL_CURRICULUM_OUTLINE = [
  {
    partNumber: 1,
    title: 'Part I: Algorithms, Flow of Control & Loops (Active)',
    topics: [
      'Problems & Computational Thinking (Active)',
      'Inputs, Outputs & Variables (Active)',
      'Pseudocode Standards & Modulo Arithmetic (Active)',
      'Algorithm Tracing with State Tables (Active)',
      'Conditions & Decision Branching (Active)',
      'Compound Logic & De Morgan Laws (Active)',
      'Anatomy of Loops & Pre-Test While (Active)',
      'Accumulators, Invariants & OBOE Debugging (Active)',
      '19-Problem Engineering Lab (Active)',
      'Algorithm Visualizer Tracing Engine (Active)'
    ]
  },
  {
    partNumber: 2,
    title: 'Part II: Data Representation & Number Systems (Next Phase)',
    topics: [
      'Positional Number Systems (Dec, Bin, Oct, Hex)',
      'Radix Conversions & Fractional Representation',
      'Signed Numbers & Two\'s Complement Arithmetic',
      'Character Encoding (ASCII, Unicode)',
      'Floating-Point IEEE 754 Standards',
      'Bitwise Masking & Shifts'
    ]
  },
  {
    partNumber: 3,
    title: 'Part III: Digital Logic & Hardware Systems (Next Phase)',
    topics: [
      'Boolean Algebra & Logic Gates',
      'Truth Table Derivation & Canonical Forms',
      'Combinational Circuits (Adders, Multiplexers)',
      'Sequential Logic (Flip-Flops & Registers)',
      'Von Neumann Architecture & Memory Hierarchy'
    ]
  },
  {
    partNumber: 4,
    title: 'Part IV: Imperative C Programming & Memory (Next Phase)',
    topics: [
      'C Compilation Pipeline & Syntax',
      'Pointers, References & Address Arithmetic',
      'Arrays & Memory Layout in C',
      'Functions, Call Stack & Scope',
      'Structures & Dynamic Memory Allocation',
      'GIU Exam Final Synthesis'
    ]
  }
];
