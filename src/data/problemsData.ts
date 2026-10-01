import { ProblemLabItem } from '../types/curriculum';

export const PROBLEM_LAB_ITEMS: ProblemLabItem[] = [
  // ========================================================
  // CATEGORY 1: SEQUENCE & BASIC COMPUTATION (Problems 1 - 4)
  // ========================================================

  {
    id: 'prob-rect-area-perim',
    title: 'Problem 1: Rectangle Perimeter & Area',
    difficulty: 'FOUNDATION',
    category: 'SEQUENCE',
    description: 'Given the length and width of a rectangle as positive numbers, compute both its perimeter and its area.',
    inputSpecification: 'Two positive numbers: length `L` and width `W` (where L > 0, W > 0).',
    outputSpecification: 'Two real numbers: perimeter and area.',
    manualTestCases: [
      { input: 'L = 5, W = 3', output: 'Perimeter = 16, Area = 15', rationale: 'Perimeter = 2*(5+3) = 16. Area = 5*3 = 15.' },
      { input: 'L = 10.5, W = 2.0', output: 'Perimeter = 25.0, Area = 21.0', rationale: '2*(10.5 + 2) = 25. 10.5 * 2 = 21.' }
    ],
    patternNotes: 'Sequential computation: values enter as inputs, formulas evaluate in order without branching, results are emitted.',
    pseudocode: [
      'ALGORITHM RectangleMetrics',
      'INPUT: real numbers L, W',
      'OUTPUT: real numbers perimeter, area',
      '1. READ L, W',
      '2. perimeter ← 2 * (L + W)',
      '3. area ← L * W',
      '4. PRINT "Perimeter: ", perimeter',
      '5. PRINT "Area: ", area',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float L, W, perimeter, area;
    printf("Enter length and width: ");
    scanf("%f %f", &L, &W);
    perimeter = 2 * (L + W);
    area = L * W;
    printf("Perimeter: %.2f\\nArea: %.2f\\n", perimeter, area);
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'A fixed number of basic arithmetic calculations executed in constant time.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Understand Problem Constraints',
        instruction: 'Identify mathematical definitions and constraints.',
        content: 'Perimeter is the boundary length (2L + 2W); Area is the surface space (L * W). Both must be positive.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is the required order of arithmetic in calculating perimeter?',
          options: ['Add L and W inside parentheses first, then multiply by 2', 'Multiply 2 * L, then add only W without parentheses', 'Multiply L * W first'],
          correctIndex: 0
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Identify Input and Output Data',
        instruction: 'Identify input and output variables.',
        content: 'Inputs: L, W. Outputs: perimeter, area.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'Which variable types should be used to support dimensions like 4.5 meters?',
          options: ['Real numbers (float / double)', 'Boolean (TRUE/FALSE)', 'Integer only'],
          correctIndex: 0
        }
      },
      {
        stepNumber: 3,
        title: 'Step 3: Sequential Pseudocode Construction',
        instruction: 'Verify the sequential instructions.',
        content: 'Computations must follow reading inputs.',
        studentActionType: 'PATTERN_TEXT',
        actionData: { pattern: 'READ L, W -> compute perimeter -> compute area -> PRINT both' }
      }
    ]
  },

  {
    id: 'prob-temp-convert',
    title: 'Problem 2: Fahrenheit to Celsius Conversion',
    difficulty: 'FOUNDATION',
    category: 'SEQUENCE',
    description: 'Convert a temperature given in Fahrenheit to Celsius using formula: C = (F - 32) * 5 / 9.',
    inputSpecification: 'A real number F representing temperature in degrees Fahrenheit.',
    outputSpecification: 'A real number C representing temperature in degrees Celsius.',
    manualTestCases: [
      { input: 'F = 32.0', output: 'C = 0.0', rationale: 'Freezing point of water: (32 - 32) * 5/9 = 0.0.' },
      { input: 'F = 212.0', output: 'C = 100.0', rationale: 'Boiling point of water: (212 - 32) * 5/9 = 180 * 5/9 = 100.0.' },
      { input: 'F = -40.0', output: 'C = -40.0', rationale: 'The unique point where scales meet: (-40 - 32) * 5/9 = -72 * 5/9 = -40.0.' }
    ],
    patternNotes: 'Parentheses force subtraction before multiplication. In C, `5.0 / 9.0` ensures real division rather than integer 0.',
    pseudocode: [
      'ALGORITHM FahrenheitToCelsius',
      'INPUT: real number F',
      'OUTPUT: real number C',
      '1. READ F',
      '2. C ← (F - 32.0) * (5.0 / 9.0)',
      '3. PRINT C',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float F, C;
    printf("Enter temperature in Fahrenheit: ");
    scanf("%f", &F);
    C = (F - 32.0f) * (5.0f / 9.0f);
    printf("Celsius: %.2f\\n", C);
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'Single formula evaluated in constant time.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Diagnose Integer Division Trap',
        instruction: 'Identify common division pitfalls in computer languages.',
        content: 'In integer arithmetic, 5 / 9 evaluates to 0! Writing `(F - 32) * (5 / 9)` produces 0 for all inputs.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'Why must we write 5.0 / 9.0 instead of integer 5 / 9?',
          options: ['Because integer 5 / 9 truncates to 0, wiping out the entire calculation', 'Because computers cannot divide 5 by 9', 'Because Fahrenheit is an odd number'],
          correctIndex: 0
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Trace with Manual Test Case',
        instruction: 'Test formula with water boiling point (212°F).',
        content: '212 - 32 = 180. 180 * 5 = 900. 900 / 9 = 100.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is the Celsius equivalent of 68°F?',
          options: ['20.0', '18.5', '25.0', '15.0'],
          correctIndex: 0
        }
      }
    ]
  },

  {
    id: 'prob-var-swap',
    title: 'Problem 3: Two-Variable Value Swap',
    difficulty: 'FOUNDATION',
    category: 'VARIABLES',
    description: 'Swap the values stored in two memory variables `x` and `y` so that `x` receives `y`\'s value and `y` receives `x`\'s value.',
    inputSpecification: 'Two variables x and y containing numbers.',
    outputSpecification: 'x and y with their values exchanged.',
    manualTestCases: [
      { input: 'x = 10, y = 20', output: 'x = 20, y = 10', rationale: 'Values cleanly exchanged.' },
      { input: 'x = -5, y = 99', output: 'x = 99, y = -5', rationale: 'Works for negative numbers.' }
    ],
    patternNotes: 'Destructive assignment requires a temporary variable `temp` to avoid erasing `x` before its value is copied into `y`.',
    pseudocode: [
      'ALGORITHM SwapVariables',
      'INPUT: variables x, y',
      '1. READ x, y',
      '2. temp ← x',
      '3. x ← y',
      '4. y ← temp',
      '5. PRINT x, y',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int x, y, temp;
    printf("Enter x and y: ");
    scanf("%d %d", &x, &y);
    temp = x;
    x = y;
    y = temp;
    printf("Swapped: x = %d, y = %d\\n", x, y);
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'Three assignments in constant time.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Understand Memory Overwrite',
        instruction: 'Identify why direct assignment fails.',
        content: 'Writing `x = y; y = x;` copies y into x, destroying x\'s old value.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What would happen if we executed `x ← y; y ← x;` for x = 3, y = 8?',
          options: ['Both x and y would become 8', 'x and y would successfully swap', 'Both x and y would become 3'],
          correctIndex: 0
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Verify the 3-Step Swap Pattern',
        instruction: 'Trace `temp ← x; x ← y; y ← temp`.',
        content: 'Temp holds original x, x gets y, y gets temp.',
        studentActionType: 'PATTERN_TEXT',
        actionData: { pattern: 'Backup to temp -> overwrite destination -> restore from temp' }
      }
    ]
  },

  {
    id: 'prob-seconds-split',
    title: 'Problem 4: Seconds to Hours, Minutes, and Seconds',
    difficulty: 'FOUNDATION',
    category: 'VARIABLES',
    description: 'Given a total duration in seconds, decompose it into equivalent hours, minutes, and leftover seconds using `/` and `MOD`.',
    inputSpecification: 'A non-negative integer `totalSec` (totalSec ≥ 0).',
    outputSpecification: 'Three integers: hours, minutes, seconds.',
    manualTestCases: [
      { input: 'totalSec = 3665', output: '1 hr, 1 min, 5 sec', rationale: '3600 sec = 1 hr. Remaining 65 sec = 1 min + 5 sec.' },
      { input: 'totalSec = 59', output: '0 hr, 0 min, 59 sec', rationale: 'Under 1 minute.' },
      { input: 'totalSec = 7200', output: '2 hr, 0 min, 0 sec', rationale: 'Exactly 2 hours.' }
    ],
    patternNotes: 'Use `/ 3600` for hours, `MOD 3600` for remainder, `/ 60` for minutes, `MOD 60` for seconds.',
    pseudocode: [
      'ALGORITHM SplitSeconds',
      'INPUT: integer totalSec',
      'OUTPUT: integers hrs, mins, secs',
      '1. READ totalSec',
      '2. hrs ← totalSec / 3600',
      '3. rem ← totalSec MOD 3600',
      '4. mins ← rem / 60',
      '5. secs ← rem MOD 60',
      '6. PRINT hrs, mins, secs',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int totalSec, hrs, mins, secs, rem;
    printf("Enter total seconds: ");
    scanf("%d", &totalSec);
    hrs = totalSec / 3600;
    rem = totalSec % 3600;
    mins = rem / 60;
    secs = rem % 60;
    printf("%d hrs, %d mins, %d secs\\n", hrs, mins, secs);
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'Constant number of integer arithmetic operations.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Understand Conversion Units',
        instruction: 'Relate seconds to minutes and hours.',
        content: '1 hour = 60 minutes = 3600 seconds. 1 minute = 60 seconds.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'How do we calculate leftover seconds after taking away all full hours?',
          options: ['totalSec MOD 3600', 'totalSec / 3600', 'totalSec - 60'],
          correctIndex: 0
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Trace with Manual Test Case',
        instruction: 'Trace totalSec = 3723.',
        content: '3723 / 3600 = 1 hr. 3723 MOD 3600 = 123 sec. 123 / 60 = 2 mins. 123 MOD 60 = 3 secs.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What are the hours, minutes, seconds for 3723 seconds?',
          options: ['1 hr, 2 min, 3 sec', '1 hr, 0 min, 123 sec', '2 hr, 1 min, 3 sec'],
          correctIndex: 0
        }
      }
    ]
  },

  // ========================================================
  // CATEGORY 2: CONDITIONS & SELECTION (Problems 5 - 10)
  // ========================================================

  {
    id: 'prob-abs-value',
    title: 'Problem 5: Absolute Value of an Integer',
    difficulty: 'FOUNDATION',
    category: 'CONDITIONS',
    description: 'Compute the absolute value |x| of an integer x without using built-in math libraries.',
    inputSpecification: 'An integer x.',
    outputSpecification: 'The non-negative magnitude |x|.',
    manualTestCases: [
      { input: 'x = -9', output: '9', rationale: '-1 * (-9) = 9.' },
      { input: 'x = 14', output: '14', rationale: 'Positive number unchanged.' },
      { input: 'x = 0', output: '0', rationale: 'Zero remains zero.' }
    ],
    patternNotes: 'Single IF-THEN-ELSE branch: if negative, invert sign via multiplication by -1; otherwise keep unchanged.',
    pseudocode: [
      'ALGORITHM AbsoluteValue',
      'INPUT: integer x',
      'OUTPUT: integer absVal',
      '1. READ x',
      '2. IF x < 0 THEN',
      '3.     absVal ← -1 * x',
      '4. ELSE',
      '5.     absVal ← x',
      '6. END IF',
      '7. PRINT absVal',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int x, absVal;
    printf("Enter integer x: ");
    scanf("%d", &x);
    if (x < 0) {
        absVal = -x;
    } else {
        absVal = x;
    }
    printf("Absolute value: %d\\n", absVal);
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'Single conditional test and assignment.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Formulate the Branching Condition',
        instruction: 'Define the test for negative values.',
        content: 'A number is negative if x < 0.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What mathematical operation inverts the sign of a negative integer?',
          options: ['Multiply by -1 (or apply unary negation -x)', 'Add 10', 'Divide by 2'],
          correctIndex: 0
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Verify the Zero Boundary Case',
        instruction: 'Check if 0 is handled correctly.',
        content: 'When x = 0, 0 < 0 is FALSE. The ELSE branch runs and preserves absVal = 0.',
        studentActionType: 'PATTERN_TEXT',
        actionData: { pattern: 'x < 0 is FALSE for 0, so ELSE branch sets absVal = 0 correctly.' }
      }
    ]
  },

  {
    id: 'prob-max-of-two',
    title: 'Problem 6: Maximum of Two Numbers',
    difficulty: 'FOUNDATION',
    category: 'CONDITIONS',
    description: 'Given two distinct numbers a and b, find and display the larger of the two.',
    inputSpecification: 'Two real numbers a and b.',
    outputSpecification: 'The maximum value.',
    manualTestCases: [
      { input: 'a = 12, b = 25', output: '25', rationale: '25 > 12.' },
      { input: 'a = 8, b = -3', output: '8', rationale: '8 > -3.' },
      { input: 'a = 7, b = 7', output: '7', rationale: 'Equal numbers yield the common value.' }
    ],
    patternNotes: 'Dual branch comparison `IF a >= b THEN max ← a ELSE max ← b`.',
    pseudocode: [
      'ALGORITHM MaxOfTwo',
      'INPUT: numbers a, b',
      'OUTPUT: number maxVal',
      '1. READ a, b',
      '2. IF a ≥ b THEN',
      '3.     maxVal ← a',
      '4. ELSE',
      '5.     maxVal ← b',
      '6. END IF',
      '7. PRINT maxVal',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float a, b, maxVal;
    printf("Enter a and b: ");
    scanf("%f %f", &a, &b);
    if (a >= b) {
        maxVal = a;
    } else {
        maxVal = b;
    }
    printf("Maximum: %.2f\\n", maxVal);
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'One comparison and assignment.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Test Relational Comparison',
        instruction: 'Compare a against b.',
        content: 'If a ≥ b, a is largest; otherwise b is largest.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What happens when a = 9 and b = 9 with condition `a >= b`?',
          options: ['9 >= 9 is TRUE, so maxVal gets a (9)', 'Syntax error', 'Loop freezes'],
          correctIndex: 0
        }
      }
    ]
  },

  {
    id: 'prob-even-odd',
    title: 'Problem 7: Even or Odd Detector',
    difficulty: 'FOUNDATION',
    category: 'CONDITIONS',
    description: 'Determine whether an integer N is Even or Odd using the modulo remainder operator.',
    inputSpecification: 'An integer N.',
    outputSpecification: 'The string "EVEN" or "ODD".',
    manualTestCases: [
      { input: 'N = 14', output: 'EVEN', rationale: '14 MOD 2 = 0.' },
      { input: 'N = 27', output: 'ODD', rationale: '27 MOD 2 = 1.' },
      { input: 'N = 0', output: 'EVEN', rationale: '0 MOD 2 = 0.' }
    ],
    patternNotes: 'Any even integer is perfectly divisible by 2 with remainder 0: `(N MOD 2) == 0`.',
    pseudocode: [
      'ALGORITHM EvenOrOdd',
      'INPUT: integer N',
      'OUTPUT: string',
      '1. READ N',
      '2. IF (N MOD 2) == 0 THEN',
      '3.     PRINT "EVEN"',
      '4. ELSE',
      '5.     PRINT "ODD"',
      '6. END IF',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int N;
    printf("Enter integer N: ");
    scanf("%d", &N);
    if (N % 2 == 0) {
        printf("EVEN\\n");
    } else {
        printf("ODD\\n");
    }
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'Constant time remainder check.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Parity Definition in Math',
        instruction: 'Define even numbers via divisibility.',
        content: 'An even number is an integer multiple of 2 (2k). The remainder when divided by 2 is 0.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is 0 MOD 2 in computer science?',
          options: ['0 (0 is an even number)', 'Undefined (division by zero)', '1'],
          correctIndex: 0
        }
      }
    ]
  },

  {
    id: 'prob-grade-classifier',
    title: 'Problem 8: Academic Grade Classifier',
    difficulty: 'INTERMEDIATE',
    category: 'CONDITIONS',
    description: 'Given a student exam percentage between 0 and 100, classify it into academic letter grades: A (≥ 90), B (≥ 80), C (≥ 70), D (≥ 60), or F (< 60). Reject out-of-range marks.',
    inputSpecification: 'A real number mark.',
    outputSpecification: 'Letter grade A, B, C, D, F, or "INVALID".',
    manualTestCases: [
      { input: 'mark = 92.5', output: 'A', rationale: '≥ 90.' },
      { input: 'mark = 74.0', output: 'C', rationale: 'Between 70 and 79.9.' },
      { input: 'mark = 55.0', output: 'F', rationale: '< 60.' },
      { input: 'mark = 105.0', output: 'INVALID', rationale: 'Above 100.' }
    ],
    patternNotes: 'Multi-way ladder ordered from highest threshold down to lowest, with boundary validation.',
    pseudocode: [
      'ALGORITHM GradeClassifier',
      'INPUT: real mark',
      '1. READ mark',
      '2. IF (mark < 0) OR (mark > 100) THEN',
      '3.     PRINT "INVALID"',
      '4. ELSE IF mark ≥ 90 THEN',
      '5.     PRINT "A"',
      '6. ELSE IF mark ≥ 80 THEN',
      '7.     PRINT "B"',
      '8. ELSE IF mark ≥ 70 THEN',
      '9.     PRINT "C"',
      '10. ELSE IF mark ≥ 60 THEN',
      '11.    PRINT "D"',
      '12. ELSE',
      '13.    PRINT "F"',
      '14. END IF',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float mark;
    printf("Enter mark: ");
    scanf("%f", &mark);
    if (mark < 0 || mark > 100) {
        printf("INVALID\\n");
    } else if (mark >= 90) {
        printf("A\\n");
    } else if (mark >= 80) {
        printf("B\\n");
    } else if (mark >= 70) {
        printf("C\\n");
    } else if (mark >= 60) {
        printf("D\\n");
    } else {
        printf("F\\n");
    }
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'At most 6 comparisons executed in constant time.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Order of Conditions in Ladder',
        instruction: 'Understand why descending threshold ordering is mandatory.',
        content: 'If we tested `mark ≥ 60` first, a student with 95 would match line 1 and receive a D!',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'When testing with `>=` in an IF-ELSE ladder, how must thresholds be ordered?',
          options: ['Descending (from highest score 90 down to 60)', 'Ascending (from 60 up to 90)', 'Any random order'],
          correctIndex: 0
        }
      }
    ]
  },

  {
    id: 'prob-max-of-three',
    title: 'Problem 9: Maximum of Three Numbers',
    difficulty: 'INTERMEDIATE',
    category: 'CONDITIONS',
    description: 'Find the maximum of three numbers a, b, and c using the hypothesis-update pattern without nested code duplication.',
    inputSpecification: 'Three numbers a, b, c.',
    outputSpecification: 'The largest number.',
    manualTestCases: [
      { input: 'a = 12, b = 45, c = 23', output: '45', rationale: 'b is largest.' },
      { input: 'a = 99, b = 14, c = 7', output: '99', rationale: 'a is largest.' },
      { input: 'a = 10, b = 20, c = 50', output: '50', rationale: 'c is largest.' }
    ],
    patternNotes: 'Hypothesis `max ← a`. Test `b > max` and update. Test `c > max` and update. Scales to N numbers.',
    pseudocode: [
      'ALGORITHM MaxOfThree',
      'INPUT: numbers a, b, c',
      'OUTPUT: number maxVal',
      '1. READ a, b, c',
      '2. maxVal ← a',
      '3. IF b > maxVal THEN',
      '4.     maxVal ← b',
      '5. END IF',
      '6. IF c > maxVal THEN',
      '7.     maxVal ← c',
      '8. END IF',
      '9. PRINT maxVal',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float a, b, c, maxVal;
    printf("Enter 3 numbers: ");
    scanf("%f %f %f", &a, &b, &c);
    maxVal = a;
    if (b > maxVal) maxVal = b;
    if (c > maxVal) maxVal = c;
    printf("Max is: %.2f\\n", maxVal);
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'Exactly two comparisons.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: The Hypothesis-Update Pattern',
        instruction: 'Compare with running champion.',
        content: 'Assume first candidate is champion. Each challenger tries to beat the champion.',
        studentActionType: 'PATTERN_TEXT',
        actionData: { pattern: 'max = a -> if b > max: max = b -> if c > max: max = c' }
      }
    ]
  },

  {
    id: 'prob-triangle-valid',
    title: 'Problem 10: Triangle Validity & Classification',
    difficulty: 'INTERMEDIATE',
    category: 'CONDITIONS',
    description: 'Given side lengths a, b, and c: 1) Verify if they form a valid triangle using Triangle Inequality, 2) Classify as Equilateral, Isosceles, or Scalene.',
    inputSpecification: 'Three positive real numbers a, b, c.',
    outputSpecification: 'Validation status and classification.',
    manualTestCases: [
      { input: 'a = 5, b = 5, c = 5', output: 'Valid Equilateral', rationale: 'All 3 sides equal and valid.' },
      { input: 'a = 5, b = 5, c = 8', output: 'Valid Isosceles', rationale: '2 sides equal and valid (5+5 > 8).' },
      { input: 'a = 1, b = 2, c = 10', output: 'INVALID', rationale: '1 + 2 is not > 10 (violates inequality).' }
    ],
    patternNotes: 'Validity requires `(a+b > c) AND (a+c > b) AND (b+c > a)`. Classification uses equality tests.',
    pseudocode: [
      'ALGORITHM TriangleClassifier',
      'INPUT: positive numbers a, b, c',
      '1. READ a, b, c',
      '2. IF (a + b ≤ c) OR (a + c ≤ b) OR (b + c ≤ a) THEN',
      '3.     PRINT "INVALID TRIANGLE"',
      '4. ELSE IF (a == b) AND (b == c) THEN',
      '5.     PRINT "EQUILATERAL"',
      '6. ELSE IF (a == b) OR (b == c) OR (a == c) THEN',
      '7.     PRINT "ISOSCELES"',
      '8. ELSE',
      '9.     PRINT "SCALENE"',
      '10. END IF',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float a, b, c;
    printf("Enter sides a, b, c: ");
    scanf("%f %f %f", &a, &b, &c);
    if (a + b <= c || a + c <= b || b + c <= a) {
        printf("INVALID TRIANGLE\\n");
    } else if (a == b && b == c) {
        printf("EQUILATERAL\\n");
    } else if (a == b || b == c || a == c) {
        printf("ISOSCELES\\n");
    } else {
        printf("SCALENE\\n");
    }
    return 0;
}`,
    complexity: { time: 'O(1)', space: 'O(1)', explanation: 'Constant number of relational tests.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Triangle Inequality Rule',
        instruction: 'Understand geometric impossibility.',
        content: 'If two sides together are shorter than the third side, they cannot meet to form a closed triangle.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'Can sides of length 2, 3, and 6 form a valid triangle?',
          options: ['No, because 2 + 3 = 5, which is less than 6', 'Yes, any 3 positive numbers form a triangle', 'Yes, it is a scalene triangle'],
          correctIndex: 0
        }
      }
    ]
  },

  // ========================================================
  // CATEGORY 3: COUNTERS & EVENT DETECTION (Problems 11 - 13)
  // ========================================================

  {
    id: 'prob-countdown',
    title: 'Problem 11: Count Down to Launch',
    difficulty: 'FOUNDATION',
    category: 'COUNTERS',
    description: 'Given a start number N, print a countdown sequence from N down to 1, followed by "BLAST OFF!" using a WHILE loop.',
    inputSpecification: 'A positive integer N (N ≥ 1).',
    outputSpecification: 'Numbers N, N-1, ... 1, followed by "BLAST OFF!".',
    manualTestCases: [
      { input: 'N = 3', output: '3, 2, 1, BLAST OFF!', rationale: '3 iterations.' },
      { input: 'N = 1', output: '1, BLAST OFF!', rationale: 'Single iteration.' }
    ],
    patternNotes: 'Decrementing counter: initialize `c ← N`, repeat `WHILE c ≥ 1`, update `c ← c - 1`.',
    pseudocode: [
      'ALGORITHM Countdown',
      'INPUT: positive integer N',
      '1. READ N',
      '2. c ← N',
      '3. WHILE c ≥ 1 DO',
      '4.     PRINT c',
      '5.     c ← c - 1',
      '6. END WHILE',
      '7. PRINT "BLAST OFF!"',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int N, c;
    printf("Enter N: ");
    scanf("%d", &N);
    c = N;
    while (c >= 1) {
        printf("%d\\n", c);
        c--;
    }
    printf("BLAST OFF!\\n");
    return 0;
}`,
    complexity: { time: 'O(N)', space: 'O(1)', explanation: 'Executes N iterations with constant storage.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Trace Termination Value',
        instruction: 'Identify the state of `c` upon loop exit.',
        content: 'When the loop terminates, `c` holds 0 (the first value failing c ≥ 1).',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is the final value of counter c immediately after the loop exits?',
          options: ['0', '1', '-1', 'N'],
          correctIndex: 0
        }
      }
    ]
  },

  {
    id: 'prob-multiples-k',
    title: 'Problem 12: Count Multiples of K up to N',
    difficulty: 'INTERMEDIATE',
    category: 'COUNTERS',
    description: 'Count how many numbers between 1 and N are divisible by a given divisor K.',
    inputSpecification: 'Two positive integers N and K (where N ≥ 1, K ≥ 1).',
    outputSpecification: 'The count of multiples.',
    manualTestCases: [
      { input: 'N = 20, K = 5', output: '4', rationale: 'Multiples are 5, 10, 15, 20 (count = 4).' },
      { input: 'N = 10, K = 3', output: '3', rationale: 'Multiples are 3, 6, 9 (count = 3).' }
    ],
    patternNotes: 'Loop through i = 1 to N. When `(i MOD K) == 0`, increment `count ← count + 1`.',
    pseudocode: [
      'ALGORITHM CountMultiples',
      'INPUT: integers N, K',
      'OUTPUT: integer count',
      '1. READ N, K',
      '2. count ← 0',
      '3. i ← 1',
      '4. WHILE i ≤ N DO',
      '5.     IF (i MOD K) == 0 THEN',
      '6.         count ← count + 1',
      '7.     END IF',
      '8.     i ← i + 1',
      '9. END WHILE',
      '10. PRINT count',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int N, K, i = 1, count = 0;
    printf("Enter N and K: ");
    scanf("%d %d", &N, &K);
    while (i <= N) {
        if (i % K == 0) count++;
        i++;
    }
    printf("Count of multiples: %d\\n", count);
    return 0;
}`,
    complexity: { time: 'O(N)', space: 'O(1)', explanation: 'Visits each integer from 1 to N.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Event-Driven Counter Pattern',
        instruction: 'Distinguish loop counter from event counter.',
        content: '`i` is the loop counter (steps through numbers 1..N). `count` is the event counter (increments only when divisible).',
        studentActionType: 'PATTERN_TEXT',
        actionData: { pattern: 'Loop counter advances every step; event counter advances only when condition matches.' }
      }
    ]
  },

  {
    id: 'prob-digit-count',
    title: 'Problem 13: Count Digits of an Integer',
    difficulty: 'INTERMEDIATE',
    category: 'COUNTERS',
    description: 'Count the total number of digits in a non-negative integer N using repeated integer division by 10.',
    inputSpecification: 'An integer N (where N ≥ 0).',
    outputSpecification: 'Integer representing number of digits.',
    manualTestCases: [
      { input: 'N = 4821', output: '4', rationale: 'Four digits (4, 8, 2, 1).' },
      { input: 'N = 0', output: '1', rationale: '0 is a single digit.' },
      { input: 'N = 7', output: '1', rationale: 'One digit.' }
    ],
    patternNotes: 'Repeatedly strip the last digit with `N ← N / 10` until N is 0. Handle N = 0 as special boundary case.',
    pseudocode: [
      'ALGORITHM CountDigits',
      'INPUT: integer N',
      'OUTPUT: integer digits',
      '1. READ N',
      '2. IF N == 0 THEN',
      '3.     digits ← 1',
      '4. ELSE',
      '5.     digits ← 0',
      '6.     WHILE N > 0 DO',
      '7.         digits ← digits + 1',
      '8.         N ← N / 10',
      '9.     END WHILE',
      '10. END IF',
      '11. PRINT digits',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int N, digits = 0;
    printf("Enter N: ");
    scanf("%d", &N);
    if (N == 0) {
        digits = 1;
    } else {
        while (N > 0) {
            digits++;
            N /= 10;
        }
    }
    printf("Number of digits: %d\\n", digits);
    return 0;
}`,
    complexity: { time: 'O(log10 N)', space: 'O(1)', explanation: 'Dividing by 10 takes iterations proportional to number of decimal digits.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: The Zero Edge Case',
        instruction: 'Examine N = 0 boundary.',
        content: 'If N = 0 entered the `while N > 0` loop, it would run zero times and report 0 digits! Thus N = 0 must be guarded.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'Why does N = 0 need a special check before `while N > 0`?',
          options: ['Because 0 > 0 is FALSE, so a while loop would report 0 digits instead of 1', 'Because division by 10 fails on 0', 'Because 0 is negative'],
          correctIndex: 0
        }
      }
    ]
  },

  // ========================================================
  // CATEGORY 4: ACCUMULATORS & AGGREGATES (Problems 14 - 17)
  // ========================================================

  {
    id: 'prob-sum-1-to-n',
    title: 'Problem 14: Sum of Integers from 1 to N',
    difficulty: 'FOUNDATION',
    category: 'ACCUMULATORS',
    description: 'Calculate the total sum 1 + 2 + ... + N using an accumulator and loop counter.',
    inputSpecification: 'A positive integer N (N ≥ 1).',
    outputSpecification: 'The accumulated sum.',
    manualTestCases: [
      { input: 'N = 4', output: '10', rationale: '1 + 2 + 3 + 4 = 10.' },
      { input: 'N = 1', output: '1', rationale: 'Single number.' },
      { input: 'N = 5', output: '15', rationale: '1 + 2 + 3 + 4 + 5 = 15.' }
    ],
    patternNotes: 'Accumulator `sum ← 0`. Loop `i` from 1 to N: `sum ← sum + i`.',
    pseudocode: [
      'ALGORITHM SumOneToN',
      'INPUT: positive integer N',
      'OUTPUT: integer sum',
      '1. READ N',
      '2. sum ← 0',
      '3. i ← 1',
      '4. WHILE i ≤ N DO',
      '5.     sum ← sum + i',
      '6.     i ← i + 1',
      '7. END WHILE',
      '8. PRINT sum',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int N, sum = 0, i = 1;
    printf("Enter N: ");
    scanf("%d", &N);
    while (i <= N) {
        sum += i;
        i++;
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
    complexity: { time: 'O(N)', space: 'O(1)', explanation: 'Loop iterates N times.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Accumulator Identity',
        instruction: 'Additive identity element.',
        content: 'Sum starts at 0 because adding 0 changes nothing.',
        studentActionType: 'PATTERN_TEXT',
        actionData: { pattern: 'sum = 0 outside loop -> sum = sum + i inside loop' }
      }
    ]
  },

  {
    id: 'prob-factorial',
    title: 'Problem 15: Factorial Calculation (N!)',
    difficulty: 'INTERMEDIATE',
    category: 'ACCUMULATORS',
    description: 'Calculate N! (N factorial = 1 * 2 * ... * N) for a non-negative integer N. Note 0! = 1.',
    inputSpecification: 'An integer N (where N ≥ 0).',
    outputSpecification: 'N factorial.',
    manualTestCases: [
      { input: 'N = 4', output: '24', rationale: '1 * 2 * 3 * 4 = 24.' },
      { input: 'N = 0', output: '1', rationale: '0! is defined as 1.' },
      { input: 'N = 5', output: '120', rationale: '24 * 5 = 120.' }
    ],
    patternNotes: 'Multiplicative accumulator initialized to 1. Loop `c` from 1 to N: `fact ← fact * c`.',
    pseudocode: [
      'ALGORITHM Factorial',
      'INPUT: integer N (N ≥ 0)',
      'OUTPUT: integer fact',
      '1. READ N',
      '2. fact ← 1',
      '3. c ← 1',
      '4. WHILE c ≤ N DO',
      '5.     fact ← fact * c',
      '6.     c ← c + 1',
      '7. END WHILE',
      '8. PRINT fact',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int N, c = 1;
    long long fact = 1;
    printf("Enter N: ");
    scanf("%d", &N);
    while (c <= N) {
        fact *= c;
        c++;
    }
    printf("%d! = %lld\\n", N, fact);
    return 0;
}`,
    complexity: { time: 'O(N)', space: 'O(1)', explanation: 'N multiplications in single loop.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Multiplicative Identity',
        instruction: 'Why fact cannot be 0.',
        content: 'Multiplying by 0 produces 0. Therefore, fact starts at 1.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What happens when N = 0 in this algorithm?',
          options: ['Condition 1 <= 0 is FALSE immediately, so the loop runs 0 times and prints fact = 1 (correct!)', 'It causes an infinite loop', 'It crashes with division by zero'],
          correctIndex: 0
        }
      }
    ]
  },

  {
    id: 'prob-average-sentinel',
    title: 'Problem 16: Average of Stream Terminated by Sentinel',
    difficulty: 'INTERMEDIATE',
    category: 'ACCUMULATORS',
    description: 'Read positive numbers from user one by one until user enters -1 (sentinel). Compute and print the average. Guard against zero entries.',
    inputSpecification: 'Stream of numbers ending with -1.',
    outputSpecification: 'Real number average or "No numbers entered".',
    manualTestCases: [
      { input: '10, 20, 30, -1', output: 'Average = 20.0', rationale: 'Total 60 / 3 items = 20.0.' },
      { input: '-1', output: 'No numbers entered', rationale: 'Immediate termination without entries.' }
    ],
    patternNotes: 'Sentinel loop: read first item before while loop (priming read). Update accumulator and counter inside. Read next item at bottom of loop.',
    pseudocode: [
      'ALGORITHM SentinelAverage',
      '1. sum ← 0.0',
      '2. count ← 0',
      '3. READ val',
      '4. WHILE val != -1 DO',
      '5.     sum ← sum + val',
      '6.     count ← count + 1',
      '7.     READ val',
      '8. END WHILE',
      '9. IF count > 0 THEN',
      '10.    avg ← sum / count',
      '11.    PRINT "Average: ", avg',
      '12. ELSE',
      '13.    PRINT "No numbers entered"',
      '14. END IF',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float val, sum = 0;
    int count = 0;
    printf("Enter numbers (-1 to stop): ");
    scanf("%f", &val);
    while (val != -1) {
        sum += val;
        count++;
        scanf("%f", &val);
    }
    if (count > 0) {
        printf("Average: %.2f\\n", sum / count);
    } else {
        printf("No numbers entered\\n");
    }
    return 0;
}`,
    complexity: { time: 'O(K)', space: 'O(1)', explanation: 'Iterates K times where K is number of items entered.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: The Priming Read Pattern',
        instruction: 'Understand why a read is placed before the loop.',
        content: 'A priming read loads the first value so the while condition can inspect it BEFORE entering the body.',
        studentActionType: 'PATTERN_TEXT',
        actionData: { pattern: 'Priming read outside -> process & increment inside -> read next at bottom of loop' }
      }
    ]
  },

  {
    id: 'prob-power-exp',
    title: 'Problem 17: Compute Power (X^Y)',
    difficulty: 'INTERMEDIATE',
    category: 'ACCUMULATORS',
    description: 'Given base X and non-negative exponent Y, compute X^Y using repeated multiplication without using math power functions.',
    inputSpecification: 'Base real number X and non-negative integer exponent Y (Y ≥ 0).',
    outputSpecification: 'The result X^Y.',
    manualTestCases: [
      { input: 'X = 2, Y = 5', output: '32', rationale: '2*2*2*2*2 = 32.' },
      { input: 'X = 5, Y = 0', output: '1', rationale: 'Any number to the power 0 is 1.' },
      { input: 'X = 3, Y = 3', output: '27', rationale: '3*3*3 = 27.' }
    ],
    patternNotes: 'Accumulator `result ← 1.0`. Counter `c` from 1 to Y: `result ← result * X`. Correctly handles Y = 0.',
    pseudocode: [
      'ALGORITHM ComputePower',
      'INPUT: real X, non-negative integer Y',
      'OUTPUT: real result',
      '1. READ X, Y',
      '2. result ← 1.0',
      '3. c ← 1',
      '4. WHILE c ≤ Y DO',
      '5.     result ← result * X',
      '6.     c ← c + 1',
      '7. END WHILE',
      '8. PRINT result',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    float X, result = 1.0f;
    int Y, c = 1;
    printf("Enter base X and exponent Y: ");
    scanf("%f %d", &X, &Y);
    while (c <= Y) {
        result *= X;
        c++;
    }
    printf("%.2f ^ %d = %.2f\\n", X, Y, result);
    return 0;
}`,
    complexity: { time: 'O(Y)', space: 'O(1)', explanation: 'Executes Y multiplications.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: The Exponent 0 Rule',
        instruction: 'Verify zero exponent property.',
        content: 'When Y = 0, loop condition 1 ≤ 0 is immediately FALSE, printing result = 1.0 (correct!).',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is printed for X = 7 and Y = 0?',
          options: ['1.0', '0.0', '7.0', 'Undefined'],
          correctIndex: 0
        }
      }
    ]
  },

  // ========================================================
  // CATEGORY 5: INTEGRATED INVARIANTS & SEARCH (Problems 18 - 19)
  // ========================================================

  {
    id: 'prob-stream-min-max',
    title: 'Problem 18: Find Min and Max in a Stream of N Numbers',
    difficulty: 'GIU_EXAM',
    category: 'INVARIANTS',
    description: 'Given N numbers entered by a user, find both the minimum and maximum values without storing all numbers in an array.',
    inputSpecification: 'Count N (N ≥ 1), followed by N numbers.',
    outputSpecification: 'The minimum and maximum values.',
    manualTestCases: [
      { input: 'N = 4, numbers: 15, 3, 99, 42', output: 'Min = 3, Max = 99', rationale: 'Min and max tracked in parallel.' },
      { input: 'N = 1, number: 7', output: 'Min = 7, Max = 7', rationale: 'Single number is both min and max.' }
    ],
    patternNotes: 'Read first element to initialize BOTH `minVal` and `maxVal`. Loop N-1 times to update each invariant.',
    pseudocode: [
      'ALGORITHM StreamMinMax',
      'INPUT: integer N, followed by N numbers',
      '1. READ N',
      '2. READ val',
      '3. minVal ← val',
      '4. maxVal ← val',
      '5. i ← 2',
      '6. WHILE i ≤ N DO',
      '7.     READ val',
      '8.     IF val < minVal THEN minVal ← val END IF',
      '9.     IF val > maxVal THEN maxVal ← val END IF',
      '10.    i ← i + 1',
      '11. END WHILE',
      '12. PRINT minVal, maxVal',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int N, i = 2;
    float val, minVal, maxVal;
    printf("Enter N: ");
    scanf("%d", &N);
    printf("Enter number 1: ");
    scanf("%f", &val);
    minVal = val;
    maxVal = val;
    while (i <= N) {
        printf("Enter number %d: ", i);
        scanf("%f", &val);
        if (val < minVal) minVal = val;
        if (val > maxVal) maxVal = val;
        i++;
    }
    printf("Min: %.2f, Max: %.2f\\n", minVal, maxVal);
    return 0;
}`,
    complexity: { time: 'O(N)', space: 'O(1)', explanation: 'Visits each item once in streaming fashion.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: First Element Initialization Trap',
        instruction: 'Avoid arbitrary 0 initialization.',
        content: 'If you initialize `minVal ← 0` and all inputs are positive (e.g. 50, 80, 90), minVal would incorrectly stay 0! Always initialize from the first real input.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'Why is initializing `minVal = 0` flawed when finding the minimum of positive numbers?',
          options: ['Because 0 is smaller than all positive inputs, so minVal will falsely report 0 instead of the real minimum', 'Because minVal cannot be zero in C', 'It is not flawed'],
          correctIndex: 0
        }
      }
    ]
  },

  {
    id: 'prob-prime-test',
    title: 'Problem 19: Primality Test by Trial Division',
    difficulty: 'GIU_EXAM',
    category: 'INVARIANTS',
    description: 'Determine whether a given integer N (N ≥ 2) is a Prime Number using a loop with an early-exit flag.',
    inputSpecification: 'An integer N (where N ≥ 2).',
    outputSpecification: '"PRIME" or "COMPOSITE".',
    manualTestCases: [
      { input: 'N = 7', output: 'PRIME', rationale: 'Divisible only by 1 and 7.' },
      { input: 'N = 9', output: 'COMPOSITE', rationale: 'Divisible by 3 (9 MOD 3 = 0).' },
      { input: 'N = 2', output: 'PRIME', rationale: 'The only even prime number.' }
    ],
    patternNotes: 'Maintain a boolean flag `isPrime ← TRUE`. Test candidate divisors `d` from 2 up to N-1 (or d*d ≤ N). If `(N MOD d) == 0`, set flag to FALSE.',
    pseudocode: [
      'ALGORITHM PrimalityTest',
      'INPUT: integer N (N ≥ 2)',
      'OUTPUT: string',
      '1. READ N',
      '2. isPrime ← TRUE',
      '3. d ← 2',
      '4. WHILE (d * d ≤ N) AND isPrime DO',
      '5.     IF (N MOD d) == 0 THEN',
      '6.         isPrime ← FALSE',
      '7.     END IF',
      '8.     d ← d + 1',
      '9. END WHILE',
      '10. IF isPrime THEN',
      '11.    PRINT "PRIME"',
      '12. ELSE',
      '13.    PRINT "COMPOSITE"',
      '14. END IF',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int N, d = 2;
    bool isPrime = true;
    printf("Enter integer N (>= 2): ");
    scanf("%d", &N);
    while (d * d <= N && isPrime) {
        if (N % d == 0) {
            isPrime = false;
        }
        d++;
    }
    if (isPrime) {
        printf("PRIME\\n");
    } else {
        printf("COMPOSITE\\n");
    }
    return 0;
}`,
    complexity: { time: 'O(sqrt(N))', space: 'O(1)', explanation: 'Checking up to sqrt(N) is mathematically sufficient to prove primality.' },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Primality Definition',
        instruction: 'Understand factors of integers.',
        content: 'A prime number has exactly two factors: 1 and itself. If any integer d between 2 and sqrt(N) divides N evenly, N is composite.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'If N = 49 and divisor d reaches 7, what is 49 MOD 7?',
          options: ['0 (49 is divisible by 7, so it is COMPOSITE)', '7', '1'],
          correctIndex: 0
        }
      }
    ]
  }
];
