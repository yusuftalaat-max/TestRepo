import { Module, Lesson } from '../types/curriculum';

export const CURRICULUM_MODULES: Module[] = [
  {
    id: 'mod-1',
    partNumber: 1,
    moduleNumber: 1,
    title: 'Problems & Algorithms',
    description: 'Deconstruct complex computational tasks into deterministic, step-by-step algorithms, inputs, outputs, and mutable memory states.',
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
          'Define an algorithm with its formal mathematical properties (finiteness, definiteness, input, output, effectiveness).',
          'Differentiate between vague human heuristics and executable computational steps.',
          'Understand state transformations and temporal progression in computation.'
        ],
        prerequisites: ['Basic high school algebra'],
        estimatedMinutes: 20,
        exerciseIds: ['ex-m1-1'],
        content: {
          conceptSummary: 'An algorithm is an ordered, unambiguous, finite sequence of computational steps that transforms a well-defined input into an intended output. In CS1, an algorithm is not code yet—it is the underlying logical blueprint that exists independently of whether it is written in C, Python, or executed by hand on paper.',
          keyTerminology: [
            { term: 'Definiteness', definition: 'Every individual step must be precisely defined without ambiguity; exactly one action is possible.' },
            { term: 'Finiteness', definition: 'The process must terminate after a finite number of steps for any valid input.' },
            { term: 'Effectiveness', definition: 'Each operation must be basic enough that it can be carried out in a finite amount of time.' },
            { term: 'State', definition: 'The snapshot of all stored values, memory cells, and the current instruction pointer at any single moment.' }
          ],
          intuitionWhy: 'Why do we formalize algorithms instead of immediately writing code? Because a computer has zero common sense. A human instructed to "go to the supermarket and buy milk" knows what to do. A computer would walk through walls, wait forever at an intersection, or buy an infinite amount of milk unless every decision branch and termination condition is explicit.',
          demonstrationNotes: 'Notice how state changes discrete line-by-line. At step t=0, memory has nothing. At step t=1, a memory cell labeled `a` is allocated and assigned 5. At t=2, another cell `b` gets 10. Memory never changes randomly; it only changes when a specific assignment statement executes.',
          algorithmPresetId: 'sum-1-to-n',
          guidedExample: {
            problemStatement: 'Design an algorithm to find the average of three exam marks (m1, m2, m3).',
            thoughtProcess: [
              '1. Identify inputs: three real numbers m1, m2, m3 representing grades.',
              '2. Identify output: one real number representing the mean grade.',
              '3. Recognize intermediate state: we need a temporary accumulator `total` to hold m1 + m2 + m3.',
              '4. Apply formula: average = total / 3.',
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
          predictionChallenge: {
            code: [
              'x ← 7',
              'y ← 3',
              'x ← x + y',
              'y ← x * 2'
            ],
            prompt: 'Predict the final value of variable `y` after these 4 lines execute in order:',
            options: ['6', '20', '14', '17'],
            correctIndex: 1,
            explanation: 'Line 1: x = 7. Line 2: y = 3. Line 3: x becomes 7 + 3 = 10. Line 4: y becomes x * 2 = 10 * 2 = 20.'
          },
          commonMistakes: [
            {
              mistake: 'Assuming assignments are mathematical equations (e.g. thinking x = x + 1 is an impossible equation).',
              whyWrong: 'In computer science, `←` (or `=`) is an assignment operator, not an equality relation. It reads: "Evaluate the right-hand side using current values, then overwrite the left-hand side variable with that result."',
              correction: 'Always evaluate the right side completely first, then store into the variable on the left.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Help your son appreciate that a computer has no intuition: every single variable is a physical memory box that holds only one value at a time. The equal sign in programming is a destructive overwrite action, not a high school algebra equality.',
            questionsToAsk: [
              'Ask: If we write `x ← x + 1`, why does this make complete sense in programming but zero sense in algebra?',
              'Ask: What happens to the old value stored in a variable when a new value is assigned?',
              'Ask: Could an algorithm run forever? What property prevents that?'
            ],
            subtleTraps: [
              'Watch out for him trying to solve problems all at once in his head instead of writing down the sequence of states.',
              'Ensure he treats the left side of an assignment as the storage destination only.'
            ],
            challengePrompt: 'Have him swap two cups of liquid (or two numbers) without using a third temporary cup, and explain why a computer needs a temporary variable `temp`.'
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
          'Distinguish between persistent inputs, mutable state variables, and output streams.',
          'Trace variable lifetime and the destructive nature of assignment.',
          'Select appropriate data types (integers, reals, booleans).'
        ],
        prerequisites: ['Lesson 1: Problems, Algorithms & Computational Thinking'],
        estimatedMinutes: 20,
        exerciseIds: ['ex-m1-2'],
        content: {
          conceptSummary: 'Variables are named locations in memory that hold data values. When an assignment statement executes, the existing value in that memory cell is permanently replaced (destroyed) by the newly computed value.',
          keyTerminology: [
            { term: 'Variable', definition: 'A symbolic name associated with a memory storage location that contains a value that can be modified during program execution.' },
            { term: 'Destructive Assignment', definition: 'Overwriting a memory location destroys whatever prior data was stored there.' },
            { term: 'Data Type', definition: 'A classification specifying what type of value a variable can hold and what mathematical operations are permissible on it.' }
          ],
          intuitionWhy: 'Imagine writing a phone number on a physical chalkboard. If you erase it to write another number, the first number is gone forever unless you copied it somewhere else first. That is destructive assignment.',
          demonstrationNotes: 'Watch the memory inspection panel as variables change. Notice how a swap requires a 3-step dance with a temporary variable `temp` to avoid erasing one of the values.',
          algorithmPresetId: 'find-max-of-three',
          guidedExample: {
            problemStatement: 'Swap the values stored in two variables `a` and `b` using a temporary variable `temp`.',
            thoughtProcess: [
              'If we do `a ← b`, we immediately overwrite `a`! We lost its original value.',
              'Therefore, we must first make a safe copy: `temp ← a`.',
              'Now that `a` is safely copied, we can safely overwrite: `a ← b`.',
              'Finally, restore the copy into `b`: `b ← temp`.'
            ],
            pseudocode: [
              '1. temp ← a',
              '2. a ← b',
              '3. b ← temp'
            ],
            tracingTable: [
              { step: 1, line: 'temp ← a', vars: 'a=5, b=9, temp=5', output: '-' },
              { step: 2, line: 'a ← b', vars: 'a=9, b=9, temp=5', output: '-' },
              { step: 3, line: 'b ← temp', vars: 'a=9, b=5, temp=5', output: '-' }
            ]
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
              'p = 8, q = 8 (failed: original p was overwritten and lost!)',
              'p = 4, q = 8 (nothing changed)',
              'Compilation error'
            ],
            correctIndex: 1,
            explanation: 'Line 3 sets p to 8. But now the original 4 in p is gone! Line 4 then sets q to p (which is 8), leaving both variables equal to 8.'
          },
          commonMistakes: [
            {
              mistake: 'Trying to swap two variables with `a = b; b = a;`.',
              whyWrong: 'Because the first line `a = b` permanently destroys the original value of `a`.',
              correction: 'Always introduce a temporary variable `temp ← a` or use arithmetic swap.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Discuss with your son why memory addresses and pointers exist in C later. For now, emphasize that a variable is a single box that holds one value at a time.',
            questionsToAsk: [
              'Ask: Why did `p ← q; q ← p;` fail to swap? Which value got destroyed?',
              'Ask: How does a temporary variable act like a third cup when transferring water between two glasses?'
            ],
            subtleTraps: [
              'Students often assume computer memory "remembers" what used to be in a variable.',
              'Reinforce that memory has no undo stack unless you explicitly program it.'
            ],
            challengePrompt: 'Can he figure out the arithmetic trick to swap two integers without any temporary variable? (Hint: additions and subtractions!).'
          }
        }
      }
    ]
  },
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
          'Read and write standardized pseudocode (READ, PRINT, ←, IF, WHILE).',
          'Understand statement sequencing and control flow indentation.',
          'Translate human specifications into structured algorithmic statements.'
        ],
        prerequisites: ['Module 1: Problems & Algorithms'],
        estimatedMinutes: 25,
        exerciseIds: ['ex-m2-1'],
        content: {
          conceptSummary: 'Pseudocode is a high-level, human-readable representation of algorithmic logic that uses structured programming conventions (like IF-THEN, WHILE-DO, assignment arrows) without getting bogged down by the syntax errors of a specific compiler.',
          keyTerminology: [
            { term: 'Pseudocode', definition: 'A semi-formal notation combining structured programming constructs with plain mathematical or verbal expressions.' },
            { term: 'Instruction Pointer', definition: 'The invisible marker indicating which exact line of code is currently being executed by the processor.' },
            { term: 'MOD Operator', definition: 'The modulo operation returns the remainder of integer division (e.g. 7 MOD 3 = 1).' }
          ],
          intuitionWhy: 'Why not just jump directly into typing C code? Because when code fails, you do not know if you have a syntax error (forgot a semicolon), a type error, or a fundamental flaw in your algorithm logic. Pseudocode isolates the logic first.',
          demonstrationNotes: 'Step through the visualizer line-by-line. Observe the blue highlight indicating the instruction pointer advancing strictly sequentially from top to bottom unless a control structure directs it elsewhere.',
          algorithmPresetId: 'sum-1-to-n',
          guidedExample: {
            problemStatement: 'Write pseudocode to convert a temperature in degrees Fahrenheit to Celsius using formula: C = (F - 32) * 5 / 9.',
            thoughtProcess: [
              '1. Read user input `fTemp`.',
              '2. Subtract 32 first to get the Fahrenheit delta.',
              '3. Multiply by 5, then divide by 9.0.',
              '4. Print the resulting `cTemp`.'
            ],
            pseudocode: [
              '1. READ fTemp',
              '2. cTemp ← (fTemp - 32.0) * (5.0 / 9.0)',
              '3. PRINT "Celsius: ", cTemp'
            ],
            tracingTable: [
              { step: 1, line: 'READ fTemp', vars: 'fTemp = 212.0', output: '-' },
              { step: 2, line: 'cTemp ← (212 - 32) * (5/9)', vars: 'cTemp = 100.0', output: '-' },
              { step: 3, line: 'PRINT cTemp', vars: 'cTemp = 100.0', output: 'Celsius: 100.0' }
            ]
          },
          predictionChallenge: {
            code: [
              'a ← 10',
              'b ← 4',
              'c ← a MOD b',
              'd ← a / b (integer division)'
            ],
            prompt: 'In integer arithmetic, what are the values of c and d?',
            options: [
              'c = 2, d = 2',
              'c = 2.5, d = 2.5',
              'c = 0, d = 2',
              'c = 4, d = 2'
            ],
            correctIndex: 0,
            explanation: '10 divided by 4 is 2 with a remainder of 2. The integer quotient d is 2, and the integer remainder c is 2.'
          },
          commonMistakes: [
            {
              mistake: 'Using vague natural language in pseudocode, like "repeat until it looks right".',
              whyWrong: 'A machine cannot evaluate aesthetic or ambiguous statements.',
              correction: 'Every condition in pseudocode must evaluate strictly to TRUE or FALSE.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'GIU professors place enormous emphasis on clean pseudocode during midterm and final exams. Many students lose 30-40% of their exam points because they write messy, unstructured English instead of formal algorithmic pseudocode.',
            questionsToAsk: [
              'Ask: What is the exact difference between integer division (10 / 4 = 2) and real division (10.0 / 4.0 = 2.5)?',
              'Ask: Why is the MOD operator so useful in computer science (e.g. checking if a number is even, extracting digits, wrapping around arrays)?'
            ],
            subtleTraps: [
              'Ensure he always explicitly notes units or types when dealing with divisions.'
            ],
            challengePrompt: 'Ask him how to extract the last digit of an integer N using MOD, and how to remove the last digit using integer division.'
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
          'Construct a rigorous trace table tracking step number, current line, variable values, condition evaluations, and output.',
          'Detect logic errors by simulating algorithm execution on boundary inputs.',
          'Predict the precise outputs of multi-step sequential and branch algorithms.'
        ],
        prerequisites: ['Lesson 3: Pseudocode Conventions & Structure'],
        estimatedMinutes: 30,
        exerciseIds: ['ex-m2-2'],
        content: {
          conceptSummary: 'Algorithm tracing (also known as a dry run or manual walkthrough) is the systematic execution of an algorithm by hand, step-by-step, recording every variable state change in a table. It is the #1 tool used by software engineers to verify correctness before implementation.',
          keyTerminology: [
            { term: 'Trace Table', definition: 'A grid where columns represent variables, conditions, and output streams, and rows represent successive execution steps over time.' },
            { term: 'Dry Run', definition: 'Manually walking through an algorithm with pencil and paper, executing instructions exactly as a CPU would.' },
            { term: 'Trace Invariant', definition: 'A property or condition that remains true at a specific point in every execution step.' }
          ],
          intuitionWhy: 'When novice programmers encounter a bug, they often guess or randomly change code until it works. Professional engineers don\'t guess: they trace. By looking at the exact line where variable state departs from expectation, the bug is immediately isolated.',
          demonstrationNotes: 'Look at the Trace Table component next to the code editor. As you click "Next Step", a new row is logged with the updated variable state, highlighting exactly which cell changed color.',
          algorithmPresetId: 'find-max-of-three',
          guidedExample: {
            problemStatement: 'Trace the algorithm that computes the absolute value of an integer `x`.',
            thoughtProcess: [
              'If x is negative (x < 0), its absolute value is -x (which turns it positive).',
              'If x is zero or positive, its absolute value is x unchanged.',
              'Trace with x = -7, then trace with x = 5.'
            ],
            pseudocode: [
              '1. READ x',
              '2. IF x < 0 THEN',
              '3.     absVal ← -1 * x',
              '4. ELSE',
              '5.     absVal ← x',
              '6. END IF',
              '7. PRINT absVal'
            ],
            tracingTable: [
              { step: 1, line: '1. READ x', vars: 'x = -7', output: '-' },
              { step: 2, line: '2. IF x < 0 (-7 < 0 is TRUE)', vars: 'x = -7', output: '-' },
              { step: 3, line: '3. absVal ← -1 * (-7)', vars: 'x = -7, absVal = 7', output: '-' },
              { step: 4, line: '6. END IF (skip ELSE branch)', vars: 'absVal = 7', output: '-' },
              { step: 5, line: '7. PRINT absVal', vars: 'absVal = 7', output: '7' }
            ]
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
            prompt: 'If the input is a = 3, b = 8, what does line 2 evaluate to, and what is printed?',
            options: [
              'Condition 3 > 8 is FALSE; the IF block is skipped; prints 3, 8',
              'Condition 3 > 8 is TRUE; swaps values; prints 8, 3',
              'Condition 3 > 8 is FALSE; prints 8, 3 anyway',
              'Syntax error on line 2'
            ],
            correctIndex: 0,
            explanation: '3 > 8 is FALSE. Therefore, lines 3-5 are completely skipped, and line 7 prints the original values: 3, 8 (already sorted in ascending order!).'
          },
          commonMistakes: [
            {
              mistake: 'Skipping steps or calculating multiple lines in your head instead of writing down the state after every individual line.',
              whyWrong: 'Mental shortcuts lead directly to off-by-one and missed branch bugs.',
              correction: 'One row per line executed. Record the new value in the corresponding variable column.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Tracing is the single most tested skill in GIU CS1 exams. Students are literally given a code snippet and a blank table and asked to fill in every row. If your son masters systematic tracing now, exams become straightforward.',
            questionsToAsk: [
              'Ask: What happened to lines 3, 4, 5 when the condition was FALSE? Did the computer look at them?',
              'Ask: Why is it crucial to test an algorithm with both positive, negative, and zero inputs?'
            ],
            subtleTraps: [
              'Check that he writes down the condition evaluation result (TRUE or FALSE) before executing the branch.'
            ],
            challengePrompt: 'Create a 5-line algorithm with a deliberate bug and ask him to find the bug purely by filling in a trace table.'
          }
        }
      }
    ]
  },
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
          'Formulate precise Boolean conditions using relational operators.',
          'Understand mutual exclusivity in IF-THEN-ELSE ladders.',
          'Map real-world decision trees into structured selection pseudocode.'
        ],
        prerequisites: ['Module 2: Pseudocode & Algorithm Tracing'],
        estimatedMinutes: 25,
        exerciseIds: ['ex-m3-1'],
        content: {
          conceptSummary: 'Selection structures alter the sequential flow of execution based on whether a condition evaluates to TRUE or FALSE. In an IF-THEN-ELSE construct, exactly one of the two branches is guaranteed to execute, never both.',
          keyTerminology: [
            { term: 'Branching', definition: 'Diverting control flow to a different sequence of instructions depending on a Boolean test.' },
            { term: 'Mutual Exclusivity', definition: 'A property of alternatives where the occurrence of one prevents the simultaneous occurrence of the others.' },
            { term: 'Relational Operator', definition: 'An operator that compares two numeric or character values and yields a Boolean result (TRUE or FALSE).' }
          ],
          intuitionWhy: 'Without conditions, a program could only ever do the exact same sequence of math regardless of input—like a toaster with only one button. Selection gives software intelligence: the ability to adapt its behavior to varying inputs.',
          demonstrationNotes: 'In the visualizer, notice how the condition node evaluates to TRUE (green) or FALSE (red), causing the execution highlight to either jump inside the body or bypass directly to the ELSE/END IF.',
          algorithmPresetId: 'find-max-of-three',
          guidedExample: {
            problemStatement: 'Classify an integer `n` as POSITIVE, NEGATIVE, or ZERO.',
            thoughtProcess: [
              'There are 3 possible mutually exclusive outcomes.',
              'Test 1: is n > 0? If so, output "POSITIVE".',
              'If not, test 2: is n < 0? If so, output "NEGATIVE".',
              'If neither, by elimination n must be exactly "ZERO".'
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
              { step: 2, line: 'IF n > 0 (0 > 0 is FALSE)', vars: 'n = 0', output: '-' },
              { step: 3, line: 'ELSE IF n < 0 (0 < 0 is FALSE)', vars: 'n = 0', output: '-' },
              { step: 4, line: 'ELSE (default branch runs)', vars: 'n = 0', output: 'ZERO' }
            ]
          },
          predictionChallenge: {
            code: [
              'val ← 15',
              'IF val > 10 THEN',
              '    PRINT "A"',
              'END IF',
              'IF val > 5 THEN',
              '    PRINT "B"',
              'END IF'
            ],
            prompt: 'Notice these are TWO SEPARATE IF statements (not an IF-ELSE). What will be printed?',
            options: [
              'Only "A"',
              'Only "B"',
              'Both "A" and "B" on separate lines',
              'Nothing is printed'
            ],
            correctIndex: 2,
            explanation: 'Because they are independent IF statements (no ELSE), both conditions are tested. Since 15 > 10 is TRUE, "A" is printed. Then since 15 > 5 is ALSO TRUE, "B" is printed too!'
          },
          commonMistakes: [
            {
              mistake: 'Confusing two independent `IF` statements with an `IF ... ELSE IF` ladder.',
              whyWrong: 'Independent `IF` statements can both run if both conditions are met. An `IF ... ELSE IF` ladder stops as soon as the first match is found.',
              correction: 'Use `ELSE IF` whenever the choices should be mutually exclusive.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Students frequently struggle to distinguish between a chain of independent IFs vs an IF-ELSE-IF ladder. This is a classic trap on CS1 midterm exams.',
            questionsToAsk: [
              'Ask: If we have 4 `IF` statements in a row, how many could potentially execute? (Answer: up to 4!)',
              'Ask: If we have an `IF - ELSE IF - ELSE IF - ELSE` ladder, how many can execute? (Answer: exactly 1!)'
            ],
            subtleTraps: [
              'Watch out for him writing conditions like `10 < x < 20`, which is valid mathematics but invalid in C and algorithmic logic. It must be written as `(x > 10) AND (x < 20)`.'
            ],
            challengePrompt: 'Ask him how to write a condition checking if a year is a leap year (divisible by 4, except century years unless divisible by 400).'
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
          'Formulate compound conditions using logical AND (conjunction), OR (disjunction), and NOT (negation).',
          'Construct and interpret truth tables for compound expressions.',
          'Understand operator precedence (NOT > AND > OR) and short-circuit evaluation.'
        ],
        prerequisites: ['Lesson 5: Conditions & Selection Structures'],
        estimatedMinutes: 25,
        exerciseIds: ['ex-m3-2'],
        content: {
          conceptSummary: 'Compound conditions combine multiple relational comparisons using Boolean operators. Conjunction (AND) requires ALL sub-conditions to be TRUE. Disjunction (OR) requires AT LEAST ONE sub-condition to be TRUE. Negation (NOT) inverts the truth value.',
          keyTerminology: [
            { term: 'AND (Conjunction)', definition: 'Yields TRUE if and only if both operands are TRUE.' },
            { term: 'OR (Disjunction)', definition: 'Yields TRUE if either operand (or both) is TRUE.' },
            { term: 'NOT (Negation)', definition: 'Inverts TRUE to FALSE and FALSE to TRUE.' },
            { term: 'Short-Circuit Evaluation', definition: 'The evaluation of a logical expression stops as soon as the overall truth value is conclusively determined.' }
          ],
          intuitionWhy: 'In everyday English, "or" often means exclusive choice ("Do you want tea or coffee?"). But in computer logic, OR is inclusive: if both conditions are true, the expression is still TRUE.',
          demonstrationNotes: 'Interactive truth tables show real-time evaluation. When A is FALSE in `A AND B`, notice how the engine knows the final result is FALSE without even needing to evaluate B!',
          algorithmPresetId: 'count-evens',
          guidedExample: {
            problemStatement: 'Verify whether a variable `score` is a valid percentage (between 0 and 100 inclusive).',
            thoughtProcess: [
              'Condition 1: score must be at least 0 (score ≥ 0).',
              'Condition 2: score must be at most 100 (score ≤ 100).',
              'Both conditions must be satisfied simultaneously → use AND.'
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
              { step: 2, line: 'Test: (105 ≥ 0) AND (105 ≤ 100)', vars: 'TRUE AND FALSE = FALSE', output: '-' },
              { step: 3, line: 'Execute ELSE branch', vars: 'score = 105', output: 'Invalid percentage: out of bounds' }
            ]
          },
          predictionChallenge: {
            code: [
              'age ← 20',
              'hasLicense ← FALSE',
              'IF (age ≥ 18) AND hasLicense THEN',
              '    PRINT "Allowed to drive alone"',
              'ELSE',
              '    PRINT "Not allowed to drive alone"',
              'END IF'
            ],
            prompt: 'What will be printed?',
            options: [
              'Allowed to drive alone',
              'Not allowed to drive alone',
              'Runtime error',
              'Nothing is printed'
            ],
            correctIndex: 1,
            explanation: 'age ≥ 18 is TRUE, but hasLicense is FALSE. For AND, both must be TRUE. TRUE AND FALSE evaluates to FALSE, so the ELSE branch executes.'
          },
          commonMistakes: [
            {
              mistake: 'Writing `IF age >= 18 OR hasLicense` when both requirements are mandatory.',
              whyWrong: 'OR would allow someone who is 12 years old to drive just because they possess a counterfeit license (or someone who is 20 with no license).',
              correction: 'When all conditions are mandatory, use AND. When any single condition suffices, use OR.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Help your son master De Morgan\'s Laws intuitively: NOT (A AND B) is equivalent to (NOT A) OR (NOT B). For example, "It is not the case that I am tall AND handsome" means "I am either not tall OR not handsome."',
            questionsToAsk: [
              'Ask: What is the negation of `x > 5`? (Careful: it is `x <= 5`, not `x < 5`!)',
              'Ask: In the expression `FALSE AND (very_heavy_calculation())`, does the computer need to run the heavy calculation?'
            ],
            subtleTraps: [
              'Students frequently forget that the negation of strictly greater `>` is less-than-or-equal `≤`.'
            ],
            challengePrompt: 'Show how `NOT (x ≥ 0 AND x ≤ 10)` simplifies to `(x < 0) OR (x > 10)`.'
          }
        }
      }
    ]
  },
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
          'Identify the four essential components of every loop: Initialization, Condition Test, Loop Body, and State Update.',
          'Trace pre-test WHILE loops where the condition is evaluated BEFORE the body runs.',
          'Understand zero-iteration loops where the body never executes.'
        ],
        prerequisites: ['Module 3: Conditions & Selection'],
        estimatedMinutes: 30,
        exerciseIds: ['ex-m4-1'],
        content: {
          conceptSummary: 'A loop enables a block of instructions to repeat as long as a specified condition remains TRUE. In a pre-test WHILE loop, the condition is evaluated at the start of each iteration: if the condition is FALSE initially, the body is never executed (zero iterations).',
          keyTerminology: [
            { term: 'Loop Counter', definition: 'A variable initialized before the loop and updated on each iteration to control how many times the loop repeats.' },
            { term: 'Pre-Test Loop', definition: 'A loop that checks its termination condition prior to executing the loop body on every iteration.' },
            { term: 'Termination Condition', definition: 'The Boolean condition that, once it evaluates to FALSE, causes the loop to stop repeating.' },
            { term: 'Off-By-One Error (OBOE)', definition: 'A logic error where a loop executes one time too many or one time too few (often caused by confusing < with ≤).' }
          ],
          intuitionWhy: 'Imagine doing 5 pushups. You don\'t just start without counting. 1) You start at count = 1. 2) Before each pushup, you check: is count ≤ 5? 3) You do the pushup. 4) You increment count ← count + 1. If you forget to increment the count, you do pushups forever (an infinite loop!).',
          demonstrationNotes: 'Use the interactive Loop Visualizer below! Notice how each cycle consists of: Step 1 (check condition), Step 2 (execute body), Step 3 (update counter), then loop back to Step 1.',
          algorithmPresetId: 'sum-1-to-n',
          guidedExample: {
            problemStatement: 'Print the numbers 1, 2, 3, 4, 5 in ascending order using a WHILE loop.',
            thoughtProcess: [
              '1. Need a counter variable: `i ← 1`.',
              '2. Loop condition: we want to keep going while `i ≤ 5`.',
              '3. Loop body: PRINT i.',
              '4. Counter update: advance `i ← i + 1`. If omitted, i stays 1 forever!',
              '5. When i becomes 6, 6 ≤ 5 is FALSE → loop finishes.'
            ],
            pseudocode: [
              '1. i ← 1',
              '2. WHILE i ≤ 5 DO',
              '3.     PRINT i',
              '4.     i ← i + 1',
              '5. END WHILE',
              '6. PRINT "Done"'
            ],
            tracingTable: [
              { step: 1, line: '1. i ← 1', vars: 'i = 1', output: '-' },
              { step: 2, line: '2. Check: 1 ≤ 5 is TRUE', vars: 'i = 1', output: '1' },
              { step: 3, line: '4. i ← 1 + 1', vars: 'i = 2', output: '-' },
              { step: 4, line: '2. Check: 2 ≤ 5 is TRUE', vars: 'i = 2', output: '2' },
              { step: 5, line: '4. i ← 2 + 1', vars: 'i = 3', output: '-' },
              { step: 6, line: '2. Check: 3 ≤ 5 is TRUE', vars: 'i = 3', output: '3' },
              { step: 7, line: '4. i ← 3 + 1', vars: 'i = 4', output: '-' },
              { step: 8, line: '2. Check: 4 ≤ 5 is TRUE', vars: 'i = 4', output: '4' },
              { step: 9, line: '4. i ← 4 + 1', vars: 'i = 5', output: '-' },
              { step: 10, line: '2. Check: 5 ≤ 5 is TRUE', vars: 'i = 5', output: '5' },
              { step: 11, line: '4. i ← 5 + 1', vars: 'i = 6', output: '-' },
              { step: 12, line: '2. Check: 6 ≤ 5 is FALSE! (Exit)', vars: 'i = 6', output: 'Done' }
            ]
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
            prompt: 'How many numbers are printed by the loop body before "Finished"?',
            options: [
              'Zero (the loop never executes because 10 < 5 is FALSE immediately)',
              '5 numbers',
              '10 numbers',
              'It loops infinitely'
            ],
            correctIndex: 0,
            explanation: 'In a pre-test WHILE loop, the condition is evaluated BEFORE the first iteration. Since k = 10 and 10 < 5 is immediately FALSE, the body is completely bypassed!'
          },
          commonMistakes: [
            {
              mistake: 'Forgetting to increment the loop variable inside the body (`i ← i + 1`).',
              whyWrong: 'If `i` never changes, the condition `i ≤ 5` will never become FALSE, resulting in an infinite loop that freezes the program.',
              correction: 'Always ensure every loop has an instruction that moves the state closer to the termination condition.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'This is the most critical junction in CS1. Loops are where students either build a solid mental model of state progression or get completely lost. Make sure he predicts the value of `i` at the end of the loop (notice `i` ends up as 6, not 5!).',
            questionsToAsk: [
              'Ask: What is the value of `i` immediately AFTER the loop finishes? Why is it 6 and not 5?',
              'Ask: What happens if we put `i ← i + 1` BEFORE `PRINT i` instead of after?'
            ],
            subtleTraps: [
              'Students almost universally guess that `i` is 5 when the loop terminates. Emphasize that to FAIL the test `i ≤ 5`, `i` had to reach 6!'
            ],
            challengePrompt: 'Ask him to write a loop that counts DOWN from 10 to 1, and predict the final value of the counter when the loop exits.'
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
          'Implement the accumulator pattern for sums, products, and running counts.',
          'Understand variable scope and the disaster of resetting an accumulator inside the loop body.',
          'Diagnose and correct non-terminating loops and off-by-one errors.'
        ],
        prerequisites: ['Lesson 7: Anatomy of Loops & While Statements'],
        estimatedMinutes: 30,
        exerciseIds: ['ex-m4-2', 'ex-m4-3'],
        content: {
          conceptSummary: 'An accumulator is a variable initialized outside the loop that gathers and aggregates information across iterations (e.g. `sum ← sum + item` or `fact ← fact * item`). The initial value must be the identity element of the operation (0 for addition, 1 for multiplication).',
          keyTerminology: [
            { term: 'Accumulator Pattern', definition: 'A variable initialized before a loop that collects partial results during each iteration.' },
            { term: 'Additive Identity', definition: '0, because adding 0 does not change the result.' },
            { term: 'Multiplicative Identity', definition: '1, because multiplying by 1 does not change the result (never initialize product accumulators to 0!).' },
            { term: 'Loop Invariant', definition: 'A logical statement about program variables that is true before and after each iteration of a loop.' }
          ],
          intuitionWhy: 'An accumulator is like a piggy bank. You set it on your desk initially empty ($0). Every day, you drop in today\'s pocket money. If you emptied the piggy bank to $0 every single morning before putting coins in, you would only ever have today\'s coins!',
          demonstrationNotes: 'Watch the Factorial visualizer preset. Note how `fact` starts at 1. If it started at 0, every multiplication would yield 0!',
          algorithmPresetId: 'factorial-loop',
          guidedExample: {
            problemStatement: 'Calculate the factorial of an integer n (n! = 1 × 2 × ... × n).',
            thoughtProcess: [
              '1. Multiplicative accumulator `fact` initialized to 1.',
              '2. Counter `c` initialized to 1.',
              '3. Loop while `c ≤ n`.',
              '4. Multiply: `fact ← fact * c`.',
              '5. Advance counter: `c ← c + 1`.',
              '6. Output `fact`.'
            ],
            pseudocode: [
              '1. READ n',
              '2. fact ← 1',
              '3. c ← 1',
              '4. WHILE c ≤ n DO',
              '5.     fact ← fact * c',
              '6.     c ← c + 1',
              '7. END WHILE',
              '8. PRINT fact'
            ],
            tracingTable: [
              { step: 1, line: 'Init: n=3, fact=1, c=1', vars: 'fact=1, c=1', output: '-' },
              { step: 2, line: 'Iter 1: fact ← 1 * 1 = 1, c ← 2', vars: 'fact=1, c=2', output: '-' },
              { step: 3, line: 'Iter 2: fact ← 1 * 2 = 2, c ← 3', vars: 'fact=2, c=3', output: '-' },
              { step: 4, line: 'Iter 3: fact ← 2 * 3 = 6, c ← 4', vars: 'fact=6, c=4', output: '-' },
              { step: 5, line: 'Check: 4 ≤ 3 is FALSE. Exit.', vars: 'fact=6, c=4', output: '6' }
            ]
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
            prompt: 'What will be printed?',
            options: ['30', '10', '40', '0'],
            correctIndex: 0,
            explanation: 'The loop executes 3 times (for i = 1, 2, 3). On each pass, it adds 10 to sum. 10 + 10 + 10 = 30.'
          },
          commonMistakes: [
            {
              mistake: 'Initializing an accumulator inside the loop body (e.g. `sum ← 0` on line 4 inside while).',
              whyWrong: 'Every pass resets the total back to 0, destroying previous additions.',
              correction: 'Always initialize accumulators once, directly above the WHILE statement.'
            },
            {
              mistake: 'Initializing a multiplicative accumulator to 0.',
              whyWrong: 'Because 0 × anything = 0, the result will permanently remain 0.',
              correction: 'Initialize multiplicative accumulators to 1.'
            }
          ],
          teachTogetherNotes: {
            parentIntro: 'Accumulator scope is a classic bug that every beginner makes at least once. Walk through exercise ex-m4-2 together to show him how line 3 resetting total destroys the loop\'s memory.',
            questionsToAsk: [
              'Ask: Why must addition start at 0 but multiplication start at 1?',
              'Ask: What happens if `n = 0` for factorial? Does the loop run? What does it print? (Answer: fact remains 1, which matches the mathematical definition 0! = 1!)'
            ],
            subtleTraps: [
              'Look out for loops that count by 2s or 3s and use `!=` instead of `<` or `≤`.'
            ],
            challengePrompt: 'Challenge him to write an algorithm that calculates the average of N positive numbers entered by the user, stopping when the user enters -1 (sentinel-controlled loop).'
          }
        }
      }
    ]
  }
];

// Complete 4-part curriculum map outline for GIU CS1 course
export const FULL_CURRICULUM_OUTLINE = [
  {
    partNumber: 1,
    title: 'Part 1: Algorithmic Thinking',
    topics: [
      '1. Problems, algorithms and computational thinking (Active in Prototype)',
      '2. Inputs, outputs and variables (Active in Prototype)',
      '3. Representing algorithms (Active in Prototype)',
      '4. Pseudocode conventions (Active in Prototype)',
      '5. Sequential algorithms & state tracing',
      '6. Conditions and selection (Active in Prototype)',
      '7. Boolean conditions & truth logic (Active in Prototype)',
      '8. Iteration and loops (Active in Prototype)',
      '9. Algorithm tracing & state tables',
      '10. Correctness and edge cases',
      '11. Algorithm efficiency & operations counting',
      '12. Introductory Big-O analysis'
    ]
  },
  {
    partNumber: 2,
    title: 'Part 2: Data Representation',
    topics: [
      '13. Number systems (Decimal, Binary, Hexadecimal)',
      '14. Decimal and binary conversion',
      '15. Binary conversion visualizer & place values',
      '16. Hexadecimal representation',
      '17. Binary arithmetic (Addition, Subtraction)',
      '18. Signed numbers & sign-magnitude',
      '19. Complements (1s complement)',
      '20. Two\'s complement representation',
      '21. Integer overflow & bit-width limitations',
      '22. Floating-point representation at introductory level'
    ]
  },
  {
    partNumber: 3,
    title: 'Part 3: Boolean Logic & Digital Systems',
    topics: [
      '23. Boolean values and propositions',
      '24. AND, OR, and NOT gates',
      '25. Truth tables and interactive evaluation',
      '26. Boolean expressions',
      '27. Boolean algebra principles',
      '28. Boolean laws & axioms',
      '29. De Morgan\'s laws',
      '30. Simplifying Boolean expressions',
      '31. Logic gates (NAND, NOR, XOR, XNOR)',
      '32. Expression → circuit synthesis',
      '33. Circuit → expression analysis',
      '34. Circuit → truth table verification',
      '35. Basic combinational logic (Adders & Multiplexers)'
    ]
  },
  {
    partNumber: 4,
    title: 'Part 4: Programming in C',
    topics: [
      '36. From algorithms to programs',
      '37. Anatomy of a C program & compilation pipeline',
      '38. Variables, data types and memory sizing',
      '39. Expressions, operators and casting',
      '40. Input/Output (printf and scanf mechanics)',
      '41. Conditions (if, if-else, switch)',
      '42. Loops in C (while, for, do-while)',
      '43. Nested control structures',
      '44. Functions and arrays for GIU CS1',
      '45. Translating pseudocode into C',
      '46. Program tracing & pointer mental models',
      '47. Debugging techniques & compiler warnings',
      '48. Integrated problem solving & exam preparation'
    ]
  }
];
