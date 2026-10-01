import { ProblemLabItem } from '../types/curriculum';

export const PROBLEM_LAB_ITEMS: ProblemLabItem[] = [
  {
    id: 'prob-sum-1-to-n',
    title: 'Problem 1: Sum of Integers from 1 to N',
    difficulty: 'FOUNDATION',
    description: 'Given a positive integer N, compute the sum of all consecutive integers from 1 up to and including N (i.e. 1 + 2 + 3 + ... + N).',
    inputSpecification: 'A single positive integer N (where N ≥ 1).',
    outputSpecification: 'A single integer representing the total accumulated sum.',
    manualTestCases: [
      { input: 'N = 1', output: '1', rationale: 'Only one number (1), so sum = 1.' },
      { input: 'N = 4', output: '10', rationale: '1 + 2 + 3 + 4 = 10.' },
      { input: 'N = 5', output: '15', rationale: '1 + 2 + 3 + 4 + 5 = 15.' }
    ],
    patternNotes: 'We maintain two variables: a counter `i` that visits each integer from 1 up to N, and an accumulator `sum` initialized to 0 that adds each value of `i` on each iteration.',
    pseudocode: [
      'ALGORITHM SumOneToN',
      'INPUT: positive integer n',
      'OUTPUT: integer sum',
      '1.  READ n',
      '2.  sum ← 0',
      '3.  i ← 1',
      '4.  WHILE i ≤ n DO',
      '5.      sum ← sum + i',
      '6.      i ← i + 1',
      '7.  END WHILE',
      '8.  PRINT sum',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int n, sum = 0, i = 1;
    printf("Enter n: ");
    scanf("%d", &n);
    
    while (i <= n) {
        sum += i;
        i++;
    }
    
    printf("Sum is: %d\\n", sum);
    return 0;
}`,
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      explanation: 'The loop executes exactly N times. Each iteration takes constant O(1) operations. Storage requires only 3 integer variables.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Understand the Problem Statement',
        instruction: 'Read the problem statement and identify the domain constraints.',
        content: 'We need to add all natural numbers starting from 1 up to an input integer N. For instance, if N is 4, we need 1 + 2 + 3 + 4.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is the required type and constraint on the input N for standard CS1 problems?',
          options: ['Any real number including negatives', 'A positive integer N ≥ 1', 'Only boolean values (True or False)'],
          correctIndex: 1
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Identify Inputs and Outputs',
        instruction: 'Specify the data that enters the algorithm and the expected result.',
        content: 'Clear distinction between input variables and output variables avoids logic bugs.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'Which represents the correct mapping of inputs and outputs?',
          options: [
            'Input: integer N; Output: integer sum',
            'Input: integer sum; Output: integer N',
            'Input: array of letters; Output: float average'
          ],
          correctIndex: 0
        }
      },
      {
        stepNumber: 3,
        title: 'Step 3: Develop Manual Examples',
        instruction: 'Walk through small values of N on paper before touching code.',
        content: 'For N=1 → 1\nFor N=3 → 1 + 2 + 3 = 6\nFor N=5 → 1 + 2 + 3 + 4 + 5 = 15',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is the manual calculation result for N = 6?',
          options: ['21', '18', '20', '36'],
          correctIndex: 0
        }
      },
      {
        stepNumber: 4,
        title: 'Step 4: Find the Algorithmic Pattern',
        instruction: 'Identify how the process repeats and how state transitions.',
        content: 'Notice the repeated action: at each step, we have a current number `i` and we add it to the running sum. Then we step `i` forward by 1.',
        studentActionType: 'PATTERN_TEXT',
        actionData: {
          pattern: 'Accumulator pattern: sum starts at 0, counter starts at 1, repeats while counter ≤ N.'
        }
      },
      {
        stepNumber: 5,
        title: 'Step 5: Formulate Pseudocode',
        instruction: 'Write out the structured, language-neutral logic.',
        content: 'Ensure all variables are initialized outside the loop!',
        studentActionType: 'CODE_FILL',
        actionData: {
          missingLine: 'WHILE i ≤ n DO',
          options: ['WHILE i < n DO', 'WHILE i ≤ n DO', 'WHILE i == n DO', 'IF i ≤ n THEN'],
          correctIndex: 1
        }
      },
      {
        stepNumber: 6,
        title: 'Step 6: Trace Algorithm with Table',
        instruction: 'Build a step-by-step trace table to verify variable state.',
        content: 'Trace for N = 3:\nInitial: n=3, sum=0, i=1\nIter 1: condition (1≤3) True → sum=1, i=2\nIter 2: condition (2≤3) True → sum=3, i=3\nIter 3: condition (3≤3) True → sum=6, i=4\nIter 4: condition (4≤3) FALSE → terminate loop.\nFinal sum: 6.',
        studentActionType: 'TRACE_VERIFY',
        actionData: {
          expectedFinalSum: 6,
          expectedFinalCounter: 4
        }
      },
      {
        stepNumber: 7,
        title: 'Step 7: Test Edge Cases',
        instruction: 'Examine boundary conditions: minimum allowed input, zeros, large values.',
        content: 'Edge case: What happens when N = 1?\n- sum=0, i=1\n- 1 ≤ 1 is TRUE: sum becomes 0 + 1 = 1, i becomes 2\n- 2 ≤ 1 is FALSE: loop terminates\n- Prints 1. Correct!',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What would happen if N = 0 was given to this algorithm as written?',
          options: [
            'The loop condition 1 ≤ 0 is immediately FALSE, so it outputs 0 without entering the loop.',
            'It enters an infinite loop.',
            'It crashes the computer with a division by zero error.'
          ],
          correctIndex: 0
        }
      },
      {
        stepNumber: 8,
        title: 'Step 8: Efficiency Analysis (Time & Space Complexity)',
        instruction: 'Evaluate how execution time scales as N grows from 10 to 1,000,000.',
        content: 'The loop executes N times. If N doubles, the number of operations doubles.',
        studentActionType: 'COMPLEXITY_SELECT',
        actionData: {
          question: 'What is the Big-O time complexity of this iterative loop algorithm?',
          options: ['O(1) - Constant time', 'O(N) - Linear time', 'O(N²) - Quadratic time'],
          correctIndex: 1,
          explanation: 'Because the loop body runs N times, time complexity is linear O(N).'
        }
      },
      {
        stepNumber: 9,
        title: 'Step 9: Translate to C Programming Language',
        instruction: 'Map pseudocode constructs directly to valid C syntax.',
        content: 'Pseudocode `READ n` → C `scanf("%d", &n);`\nPseudocode `sum ← sum + i` → C `sum += i;`\nPseudocode `WHILE i ≤ n DO` → C `while (i <= n) { ... }`',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'In C, why must `sum` be initialized to 0 before the loop?',
          options: [
            'Because in C, uninitialized local variables hold random garbage values from memory!',
            'Because C syntax requires all variables to equal 0.',
            'Because the compiler refuses to compile any program without sum = 0.'
          ],
          correctIndex: 0
        }
      }
    ]
  },
  {
    id: 'prob-find-max',
    title: 'Problem 2: Finding the Maximum in a Sequence',
    difficulty: 'INTERMEDIATE',
    description: 'Given a count N and a sequence of N numbers, find and output the largest number in the sequence.',
    inputSpecification: 'An integer N ≥ 1, followed by N integers.',
    outputSpecification: 'A single integer: the maximum value present.',
    manualTestCases: [
      { input: 'N=3, values: [5, 19, 7]', output: '19', rationale: '19 is greater than both 5 and 7.' },
      { input: 'N=4, values: [-10, -3, -20, -5]', output: '-3', rationale: 'For all-negative numbers, the least negative (-3) is the maximum.' }
    ],
    patternNotes: 'Initialize `maxVal` with the very FIRST element of the sequence (never assume 0, because inputs could all be negative!). Then compare each remaining element against `maxVal`, updating `maxVal` whenever a larger value is found.',
    pseudocode: [
      'ALGORITHM FindMaxSequence',
      '1. READ n',
      '2. READ firstVal',
      '3. maxVal ← firstVal',
      '4. count ← 1',
      '5. WHILE count < n DO',
      '6.     READ nextVal',
      '7.     IF nextVal > maxVal THEN',
      '8.         maxVal ← nextVal',
      '9.     END IF',
      '10.    count ← count + 1',
      '11. END WHILE',
      '12. PRINT maxVal',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>

int main() {
    int n, maxVal, currentVal, i;
    printf("Enter count N: ");
    scanf("%d", &n);
    
    scanf("%d", &maxVal); // Initialize with first element
    
    for (i = 1; i < n; i++) {
        scanf("%d", &currentVal);
        if (currentVal > maxVal) {
            maxVal = currentVal;
        }
    }
    
    printf("Maximum is: %d\\n", maxVal);
    return 0;
}`,
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      explanation: 'We inspect each of the N numbers once. No array storage needed if processed on the fly.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Understand the Problem',
        instruction: 'Define what a maximum means across positive, zero, and negative domains.',
        content: 'The maximum is an element X such that for every element Y in the sequence, X ≥ Y.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'If all inputs are negative: [-12, -45, -3, -88], what is the maximum?',
          options: ['0', '-3', '-88', '-12'],
          correctIndex: 1
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Common Trap Avoidance',
        instruction: 'Why should you NOT initialize `maxVal ← 0`?',
        content: 'If the input sequence is [-10, -5, -8], an initial maxVal of 0 will report 0 as the maximum, which is incorrect because 0 was not even in the input!',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'What is the safe, general initialization for `maxVal` in any dataset?',
          options: [
            'Set maxVal to 0',
            'Set maxVal to 999999',
            'Set maxVal to the first input element in the sequence',
            'Set maxVal to -1'
          ],
          correctIndex: 2
        }
      }
    ]
  },
  {
    id: 'prob-prime-check',
    title: 'Problem 3: Primality Test (Algorithm Optimization)',
    difficulty: 'GIU_EXAM',
    description: 'Determine whether a given positive integer N is a prime number (has exactly two distinct divisors: 1 and itself).',
    inputSpecification: 'An integer N > 1.',
    outputSpecification: 'A boolean decision: "PRIME" or "NOT PRIME".',
    manualTestCases: [
      { input: 'N = 2', output: 'PRIME', rationale: 'Smallest and only even prime.' },
      { input: 'N = 9', output: 'NOT PRIME', rationale: 'Divisible by 3 (3 × 3 = 9).' },
      { input: 'N = 17', output: 'PRIME', rationale: 'Divisible only by 1 and 17.' }
    ],
    patternNotes: 'Trial division: test if any candidate divisor `d` from 2 up to sqrt(N) divides N evenly (i.e. N MOD d == 0). If any does, N is composite. If no divisor is found up to sqrt(N), N is guaranteed prime.',
    pseudocode: [
      'ALGORITHM IsPrime',
      '1. READ n',
      '2. IF n ≤ 1 THEN',
      '3.     PRINT "NOT PRIME"',
      '4.     STOP',
      '5. END IF',
      '6. isPrime ← TRUE',
      '7. d ← 2',
      '8. WHILE (d * d) ≤ n AND isPrime == TRUE DO',
      '9.     IF (n MOD d) == 0 THEN',
      '10.        isPrime ← FALSE',
      '11.    END IF',
      '12.    d ← d + 1',
      '13. END WHILE',
      '14. IF isPrime == TRUE THEN',
      '15.    PRINT "PRIME"',
      '16. ELSE',
      '17.    PRINT "NOT PRIME"',
      '18. END IF',
      'END ALGORITHM'
    ],
    cTranslation: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int n, d = 2;
    bool isPrime = true;
    
    printf("Enter number: ");
    scanf("%d", &n);
    
    if (n <= 1) {
        printf("NOT PRIME\\n");
        return 0;
    }
    
    while (d * d <= n && isPrime) {
        if (n % d == 0) {
            isPrime = false;
        }
        d++;
    }
    
    if (isPrime) printf("PRIME\\n");
    else printf("NOT PRIME\\n");
    return 0;
}`,
    complexity: {
      time: 'O(√N)',
      space: 'O(1)',
      explanation: 'Testing divisors only up to √N instead of N reduces operations from 1,000,000 down to only 1,000 for N = 1,000,000!'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Primality Definition & Boundary Checks',
        instruction: 'Recall that primes must be integers strictly greater than 1.',
        content: 'Is 1 prime? No! By mathematical definition, 1 has only one positive factor, not two.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'Is N = 1 a prime number?',
          options: ['Yes, 1 is the first prime', 'No, 1 is neither prime nor composite', 'It depends on the compiler'],
          correctIndex: 1
        }
      },
      {
        stepNumber: 2,
        title: 'Step 2: Trial Division and Early Exit',
        instruction: 'Examine why checking up to √N is mathematically sufficient.',
        content: 'If N = a × b, both factors cannot simultaneously exceed √N. Therefore, if no divisor exists up to √N, none exists anywhere.',
        studentActionType: 'INPUT_SELECT',
        actionData: {
          question: 'For N = 49, what is the maximum divisor `d` that the condition `(d * d) ≤ 49` will check?',
          options: ['d = 7', 'd = 49', 'd = 24', 'd = 2'],
          correctIndex: 0
        }
      }
    ]
  }
];
