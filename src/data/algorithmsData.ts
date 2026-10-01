import { TraceableAlgorithm, CodeTraceStep } from '../types/curriculum';

export const ALGORITHM_PRESETS: TraceableAlgorithm[] = [
  // 1. Variable Swap with Temp Variable
  {
    id: 'variable-swap',
    title: 'Variable Swap (3-Step Memory Preservation)',
    description: 'Demonstrates the destructive nature of variable assignment and the necessity of a temporary variable `temp`.',
    codeLines: [
      'READ a, b',
      'temp ← a',
      'a ← b',
      'b ← temp',
      'PRINT "Swapped: a=", a, " b=", b',
    ],
    supportedInputs: [
      { name: 'a', defaultVal: 5, min: -50, max: 100 },
      { name: 'b', defaultVal: 9, min: -50, max: 100 },
    ],
    stepsGenerator: (inputs) => {
      const a = Number(inputs.a) ?? 5;
      const b = Number(inputs.b) ?? 9;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Initial state: variable a receives ${a}, variable b receives ${b}. Variable temp is not yet allocated.`,
        variables: { a, b },
      });

      const temp = a;
      steps.push({
        line: 2,
        explanation: `Step 1 (Backup): temp ← a. We copy ${a} into temp. If we overwrote 'a' without this step, ${a} would be permanently destroyed!`,
        variables: { a, b, temp },
      });

      const newA = b;
      steps.push({
        line: 3,
        explanation: `Step 2 (Overwrite): a ← b. Memory cell 'a' is destructively overwritten with ${b}. Notice both a and b currently hold ${b}, but the original value of a (${temp}) is safe in temp.`,
        variables: { a: newA, b, temp },
      });

      const newB = temp;
      steps.push({
        line: 4,
        explanation: `Step 3 (Restore): b ← temp. We copy the backed-up value (${temp}) into cell 'b'. The swap is complete!`,
        variables: { a: newA, b: newB, temp },
      });

      steps.push({
        line: 5,
        explanation: `Output final state: a holds ${newA} (was ${a}) and b holds ${newB} (was ${b}).`,
        variables: { a: newA, b: newB, temp },
        output: `Swapped: a = ${newA}, b = ${newB}`,
      });

      return steps;
    },
  },

  // 2. Sum 1 to N (Accumulator Loop)
  {
    id: 'sum-1-to-n',
    title: 'Sum 1 to N (Accumulator Loop)',
    description: 'Calculates the sum 1 + 2 + ... + n using a loop counter and an accumulator initialized to 0.',
    codeLines: [
      'READ n',
      'sum ← 0',
      'i ← 1',
      'WHILE i ≤ n DO',
      '    sum ← sum + i',
      '    i ← i + 1',
      'END WHILE',
      'PRINT "Sum is: ", sum',
    ],
    supportedInputs: [{ name: 'n', defaultVal: 4, min: 1, max: 10 }],
    stepsGenerator: (inputs) => {
      const n = Number(inputs.n) || 4;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Read input value n = ${n}. Memory allocates space for variable n.`,
        variables: { n },
        output: '',
      });

      let sum = 0;
      steps.push({
        line: 2,
        explanation: 'Initialize accumulator `sum` to 0 (additive identity: adding 0 changes nothing).',
        variables: { n, sum },
        output: '',
      });

      let i = 1;
      steps.push({
        line: 3,
        explanation: 'Initialize loop counter `i` to 1 (the first number in the sequence).',
        variables: { n, sum, i },
        output: '',
      });

      let iteration = 1;
      while (i <= n) {
        steps.push({
          line: 4,
          iteration,
          explanation: `Check loop condition: is i (${i}) ≤ n (${n})? Yes (${i} ≤ ${n} is TRUE). Enter loop body for iteration ${iteration}.`,
          variables: { n, sum, i },
          conditionEval: { expression: `${i} ≤ ${n}`, result: true },
        });

        const oldSum = sum;
        sum += i;
        steps.push({
          line: 5,
          iteration,
          explanation: `Update accumulator: sum ← ${oldSum} + ${i} = ${sum}.`,
          variables: { n, sum, i },
        });

        const oldI = i;
        i += 1;
        steps.push({
          line: 6,
          iteration,
          explanation: `Increment counter: i ← ${oldI} + 1 = ${i}. Advancing toward termination.`,
          variables: { n, sum, i },
        });

        iteration++;
        if (iteration > 20) break;
      }

      steps.push({
        line: 4,
        iteration,
        explanation: `Check loop condition: is i (${i}) ≤ n (${n})? No (${i} ≤ ${n} is FALSE). Counter reached ${i}, terminating the loop.`,
        variables: { n, sum, i },
        conditionEval: { expression: `${i} ≤ ${n}`, result: false },
      });

      steps.push({
        line: 7,
        explanation: 'Loop has finished all iterations. Execution drops below the END WHILE statement.',
        variables: { n, sum, i },
      });

      steps.push({
        line: 8,
        explanation: `Print final output: "Sum is: ${sum}". Variable sum retains final accumulated value ${sum}.`,
        variables: { n, sum, i },
        output: `Sum is: ${sum}`,
      });

      return steps;
    },
  },

  // 3. Maximum of Three Numbers
  {
    id: 'find-max-of-three',
    title: 'Selection: Maximum of 3 Numbers',
    description: 'Demonstrates sequential conditional statements (IF-THEN) with the hypothesis-update pattern.',
    codeLines: [
      'READ a, b, c',
      'maxVal ← a',
      'IF b > maxVal THEN',
      '    maxVal ← b',
      'END IF',
      'IF c > maxVal THEN',
      '    maxVal ← c',
      'END IF',
      'PRINT "Maximum is: ", maxVal',
    ],
    supportedInputs: [
      { name: 'a', defaultVal: 12, min: -50, max: 100 },
      { name: 'b', defaultVal: 27, min: -50, max: 100 },
      { name: 'c', defaultVal: 19, min: -50, max: 100 },
    ],
    stepsGenerator: (inputs) => {
      const a = Number(inputs.a) ?? 12;
      const b = Number(inputs.b) ?? 27;
      const c = Number(inputs.c) ?? 19;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Inputs received: a = ${a}, b = ${b}, c = ${c}.`,
        variables: { a, b, c },
      });

      let maxVal = a;
      steps.push({
        line: 2,
        explanation: `Hypothesis: assume first candidate 'a' is the running maximum: maxVal ← ${a}.`,
        variables: { a, b, c, maxVal },
      });

      const cond1 = b > maxVal;
      steps.push({
        line: 3,
        explanation: `Evaluate condition: is challenger b (${b}) > current max (${maxVal})? Result: ${cond1 ? 'TRUE' : 'FALSE'}.`,
        variables: { a, b, c, maxVal },
        conditionEval: { expression: `${b} > ${maxVal}`, result: cond1 },
      });

      if (cond1) {
        maxVal = b;
        steps.push({
          line: 4,
          explanation: `Since condition was TRUE, update running maximum: maxVal ← ${b}.`,
          variables: { a, b, c, maxVal },
        });
      }

      steps.push({
        line: 5,
        explanation: 'Completed first IF block.',
        variables: { a, b, c, maxVal },
      });

      const cond2 = c > maxVal;
      steps.push({
        line: 6,
        explanation: `Evaluate condition: is challenger c (${c}) > current max (${maxVal})? Result: ${cond2 ? 'TRUE' : 'FALSE'}.`,
        variables: { a, b, c, maxVal },
        conditionEval: { expression: `${c} > ${maxVal}`, result: cond2 },
      });

      if (cond2) {
        maxVal = c;
        steps.push({
          line: 7,
          explanation: `Since condition was TRUE, update running maximum: maxVal ← ${c}.`,
          variables: { a, b, c, maxVal },
        });
      }

      steps.push({
        line: 8,
        explanation: 'Completed second IF block.',
        variables: { a, b, c, maxVal },
      });

      steps.push({
        line: 9,
        explanation: `Output maximum value found across all three inputs: ${maxVal}.`,
        variables: { a, b, c, maxVal },
        output: `Maximum is: ${maxVal}`,
      });

      return steps;
    },
  },

  // 4. Count Even Numbers (Loop + Selection)
  {
    id: 'count-evens',
    title: 'Count Even Numbers (Loop + Selection)',
    description: 'Combines iteration with conditional logic using the modulo operator (MOD).',
    codeLines: [
      'READ limit',
      'count ← 0',
      'k ← 1',
      'WHILE k ≤ limit DO',
      '    IF (k MOD 2) == 0 THEN',
      '        count ← count + 1',
      '    END IF',
      '    k ← k + 1',
      'END WHILE',
      'PRINT "Even count: ", count',
    ],
    supportedInputs: [{ name: 'limit', defaultVal: 5, min: 1, max: 10 }],
    stepsGenerator: (inputs) => {
      const limit = Number(inputs.limit) || 5;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Initialize problem with limit = ${limit}.`,
        variables: { limit },
      });

      let count = 0;
      steps.push({
        line: 2,
        explanation: 'count ← 0 (event counter initialized to zero before loop).',
        variables: { limit, count },
      });

      let k = 1;
      steps.push({
        line: 3,
        explanation: 'k ← 1 (loop counter starting at 1).',
        variables: { limit, count, k },
      });

      let iter = 1;
      while (k <= limit) {
        steps.push({
          line: 4,
          iteration: iter,
          explanation: `Check loop test: is k (${k}) ≤ limit (${limit})? TRUE. Enter iteration ${iter}.`,
          variables: { limit, count, k },
          conditionEval: { expression: `${k} ≤ ${limit}`, result: true },
        });

        const isEven = k % 2 === 0;
        steps.push({
          line: 5,
          iteration: iter,
          explanation: `Test parity: (${k} MOD 2) == 0 ? Remainder is ${k % 2}. Result is ${isEven ? 'TRUE' : 'FALSE'}.`,
          variables: { limit, count, k },
          conditionEval: { expression: `(${k} MOD 2) == 0`, result: isEven },
        });

        if (isEven) {
          count++;
          steps.push({
            line: 6,
            iteration: iter,
            explanation: `k (${k}) is even! Increment event counter: count ← ${count}.`,
            variables: { limit, count, k },
          });
        }

        steps.push({
          line: 7,
          iteration: iter,
          explanation: 'End of IF statement branch.',
          variables: { limit, count, k },
        });

        const oldK = k;
        k++;
        steps.push({
          line: 8,
          iteration: iter,
          explanation: `Advance loop counter: k ← ${oldK} + 1 = ${k}.`,
          variables: { limit, count, k },
        });

        iter++;
        if (iter > 20) break;
      }

      steps.push({
        line: 4,
        iteration: iter,
        explanation: `Loop condition check: k (${k}) ≤ limit (${limit}) is FALSE. Loop finishes.`,
        variables: { limit, count, k },
        conditionEval: { expression: `${k} ≤ ${limit}`, result: false },
      });

      steps.push({
        line: 9,
        explanation: 'Loop exited.',
        variables: { limit, count, k },
      });

      steps.push({
        line: 10,
        explanation: `Output final count of discovered even numbers: ${count}.`,
        variables: { limit, count, k },
        output: `Even count: ${count}`,
      });

      return steps;
    },
  },

  // 5. Factorial Calculation (n!)
  {
    id: 'factorial-loop',
    title: 'Factorial Calculation (n!)',
    description: 'Multiplicative accumulator initialized to 1 demonstrating growth and loop invariants.',
    codeLines: [
      'READ n',
      'fact ← 1',
      'c ← 1',
      'WHILE c ≤ n DO',
      '    fact ← fact * c',
      '    c ← c + 1',
      'END WHILE',
      'PRINT "Factorial: ", fact',
    ],
    supportedInputs: [{ name: 'n', defaultVal: 4, min: 1, max: 7 }],
    stepsGenerator: (inputs) => {
      const n = Number(inputs.n) || 4;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Set input n = ${n}.`,
        variables: { n },
      });

      let fact = 1;
      steps.push({
        line: 2,
        explanation: 'Initialize multiplicative accumulator: fact ← 1 (never 0, because 0 * anything = 0).',
        variables: { n, fact },
      });

      let c = 1;
      steps.push({
        line: 3,
        explanation: 'Initialize counter c ← 1.',
        variables: { n, fact, c },
      });

      let iter = 1;
      while (c <= n) {
        steps.push({
          line: 4,
          iteration: iter,
          explanation: `Check condition: c (${c}) ≤ n (${n}) is TRUE.`,
          variables: { n, fact, c },
          conditionEval: { expression: `${c} ≤ ${n}`, result: true },
        });

        const oldFact = fact;
        fact = fact * c;
        steps.push({
          line: 5,
          iteration: iter,
          explanation: `Multiply: fact ← ${oldFact} × ${c} = ${fact}.`,
          variables: { n, fact, c },
        });

        const oldC = c;
        c++;
        steps.push({
          line: 6,
          iteration: iter,
          explanation: `Increment counter: c ← ${oldC} + 1 = ${c}.`,
          variables: { n, fact, c },
        });

        iter++;
        if (iter > 20) break;
      }

      steps.push({
        line: 4,
        iteration: iter,
        explanation: `Condition: c (${c}) ≤ n (${n}) is FALSE. Terminate loop.`,
        variables: { n, fact, c },
        conditionEval: { expression: `${c} ≤ ${n}`, result: false },
      });

      steps.push({
        line: 7,
        explanation: 'Loop exited.',
        variables: { n, fact, c },
      });

      steps.push({
        line: 8,
        explanation: `Output result: Factorial = ${fact}.`,
        variables: { n, fact, c },
        output: `Factorial: ${fact}`,
      });

      return steps;
    },
  },

  // 6. Primality Test with Early Exit Flag
  {
    id: 'prime-check',
    title: 'Primality Test (Loop + Flag Variable)',
    description: 'Tests whether integer N is prime using a candidate divisor loop with an early-exit Boolean flag.',
    codeLines: [
      'READ n',
      'isPrime ← TRUE',
      'd ← 2',
      'WHILE (d * d ≤ n) AND isPrime DO',
      '    IF (n MOD d) == 0 THEN',
      '        isPrime ← FALSE',
      '    END IF',
      '    d ← d + 1',
      'END WHILE',
      'PRINT "Is Prime: ", isPrime',
    ],
    supportedInputs: [{ name: 'n', defaultVal: 7, min: 2, max: 30 }],
    stepsGenerator: (inputs) => {
      const n = Number(inputs.n) || 7;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Input number to test for primality: n = ${n}.`,
        variables: { n },
      });

      let isPrime = true;
      steps.push({
        line: 2,
        explanation: 'Initialize hypothesis flag: isPrime ← TRUE. We assume n is prime until proven composite.',
        variables: { n, isPrime },
      });

      let d = 2;
      steps.push({
        line: 3,
        explanation: 'd ← 2 (start checking candidate divisors at 2, the smallest possible factor).',
        variables: { n, isPrime, d },
      });

      let iter = 1;
      while (d * d <= n && isPrime) {
        steps.push({
          line: 4,
          iteration: iter,
          explanation: `Check loop test: is (d*d ≤ n) AND isPrime? (${d * d} ≤ ${n} is ${d * d <= n}) AND (isPrime is ${isPrime}). Both TRUE!`,
          variables: { n, isPrime, d },
          conditionEval: { expression: `(${d * d} ≤ ${n}) AND isPrime`, result: true },
        });

        const divides = n % d === 0;
        steps.push({
          line: 5,
          iteration: iter,
          explanation: `Test divisibility: (${n} MOD ${d}) == 0 ? Remainder is ${n % d}. Divisible? ${divides ? 'YES (COMPOSITE)' : 'NO'}.`,
          variables: { n, isPrime, d },
          conditionEval: { expression: `(${n} MOD ${d}) == 0`, result: divides },
        });

        if (divides) {
          isPrime = false;
          steps.push({
            line: 6,
            iteration: iter,
            explanation: `Found factor ${d}! Setting isPrime ← FALSE. The compound while condition will now exit early!`,
            variables: { n, isPrime, d },
          });
        }

        steps.push({
          line: 7,
          iteration: iter,
          explanation: 'End of divisibility check.',
          variables: { n, isPrime, d },
        });

        const oldD = d;
        d++;
        steps.push({
          line: 8,
          iteration: iter,
          explanation: `Increment divisor: d ← ${oldD} + 1 = ${d}.`,
          variables: { n, isPrime, d },
        });

        iter++;
        if (iter > 15) break;
      }

      steps.push({
        line: 4,
        iteration: iter,
        explanation: `Loop condition check: (d*d ≤ n) AND isPrime evaluates to FALSE. Either d passed sqrt(n) or a factor was found. Loop exits.`,
        variables: { n, isPrime, d },
        conditionEval: { expression: `(${d * d} ≤ ${n}) AND isPrime`, result: false },
      });

      steps.push({
        line: 9,
        explanation: 'Finished divisor tests.',
        variables: { n, isPrime, d },
      });

      steps.push({
        line: 10,
        explanation: `Result: n = ${n} is ${isPrime ? 'PRIME (no divisors found)' : 'COMPOSITE (divisible)'}.`,
        variables: { n, isPrime, d },
        output: isPrime ? `${n} is PRIME` : `${n} is COMPOSITE`,
      });

      return steps;
    },
  },

  // 7. Extract & Reverse Digits (Decimal Modulo/Division Accumulator)
  {
    id: 'extract-reverse-digits',
    title: 'Extract & Reverse Digits (MOD 10 / DIV 10)',
    description: 'Deconstructs an integer digit-by-digit using integer modulo and division, reconstructing the reversed number with an accumulator.',
    codeLines: [
      'READ num',
      'reversed ← 0',
      'WHILE num > 0 DO',
      '    digit ← num MOD 10',
      '    reversed ← (reversed * 10) + digit',
      '    num ← num / 10',
      'END WHILE',
      'PRINT "Reversed number: ", reversed',
    ],
    supportedInputs: [{ name: 'num', defaultVal: 384, min: 10, max: 9999 }],
    stepsGenerator: (inputs) => {
      let num = Math.floor(Number(inputs.num)) || 384;
      const initialNum = num;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Read initial integer input: num = ${num}.`,
        variables: { num },
        output: '',
      });

      let reversed = 0;
      steps.push({
        line: 2,
        explanation: 'Initialize accumulator `reversed` to 0.',
        variables: { num, reversed },
        output: '',
      });

      let iter = 1;
      let digit = 0;

      while (num > 0) {
        steps.push({
          line: 3,
          iteration: iter,
          explanation: `Check loop test: is num > 0? (${num} > 0) is TRUE. Enter loop body.`,
          variables: { num, reversed, digit },
          conditionEval: { expression: `${num} > 0`, result: true },
        });

        digit = num % 10;
        steps.push({
          line: 4,
          iteration: iter,
          explanation: `Extract rightmost digit: digit ← ${num} MOD 10 = ${digit}.`,
          variables: { num, reversed, digit },
        });

        const oldReversed = reversed;
        reversed = reversed * 10 + digit;
        steps.push({
          line: 5,
          iteration: iter,
          explanation: `Accumulate digit: reversed ← (${oldReversed} * 10) + ${digit} = ${reversed}. Shift existing digits left by base 10 and add new digit.`,
          variables: { num, reversed, digit },
        });

        const oldNum = num;
        num = Math.floor(num / 10);
        steps.push({
          line: 6,
          iteration: iter,
          explanation: `Strip rightmost digit: num ← ${oldNum} / 10 (integer division) = ${num}. Notice decimal portion is discarded!`,
          variables: { num, reversed, digit },
        });

        steps.push({
          line: 7,
          iteration: iter,
          explanation: `End of iteration ${iter}. num is now ${num}, reversed is ${reversed}.`,
          variables: { num, reversed, digit },
        });

        iter++;
        if (iter > 10) break;
      }

      steps.push({
        line: 3,
        iteration: iter,
        explanation: `Check loop test: is num > 0? (${num} > 0) is FALSE. All digits have been processed. Loop terminates!`,
        variables: { num, reversed, digit },
        conditionEval: { expression: `${num} > 0`, result: false },
      });

      steps.push({
        line: 8,
        explanation: `Print final reversed value: original ${initialNum} reversed is ${reversed}.`,
        variables: { num, reversed, digit },
        output: `Reversed: ${reversed}`,
      });

      return steps;
    },
  },

  // 8. Euclidean Algorithm for GCD (Greatest Common Divisor)
  {
    id: 'euclidean-gcd',
    title: 'Euclidean Algorithm (GCD via Modulo Invariant)',
    description: 'Computes the Greatest Common Divisor (GCD) of two numbers by repeatedly replacing the pair (a, b) with (b, a MOD b) until b becomes 0.',
    codeLines: [
      'READ a, b',
      'WHILE b ≠ 0 DO',
      '    remainder ← a MOD b',
      '    a ← b',
      '    b ← remainder',
      'END WHILE',
      'PRINT "GCD is: ", a',
    ],
    supportedInputs: [
      { name: 'a', defaultVal: 48, min: 1, max: 200 },
      { name: 'b', defaultVal: 18, min: 1, max: 200 },
    ],
    stepsGenerator: (inputs) => {
      let a = Math.abs(Math.floor(Number(inputs.a))) || 48;
      let b = Math.abs(Math.floor(Number(inputs.b))) || 18;
      const initialA = a;
      const initialB = b;
      const steps: CodeTraceStep[] = [];

      steps.push({
        line: 1,
        explanation: `Read initial positive inputs: a = ${a}, b = ${b}.`,
        variables: { a, b },
        output: '',
      });

      let iter = 1;
      let remainder = 0;

      while (b !== 0) {
        steps.push({
          line: 2,
          iteration: iter,
          explanation: `Check loop test: is b ≠ 0? (${b} ≠ 0) is TRUE. Proceed with division remainder.`,
          variables: { a, b, remainder },
          conditionEval: { expression: `${b} ≠ 0`, result: true },
        });

        remainder = a % b;
        steps.push({
          line: 3,
          iteration: iter,
          explanation: `Calculate remainder: remainder ← ${a} MOD ${b} = ${remainder}.`,
          variables: { a, b, remainder },
        });

        const oldA = a;
        a = b;
        steps.push({
          line: 4,
          iteration: iter,
          explanation: `Shift b into a: a ← b (a becomes ${b}).`,
          variables: { a, b, remainder },
        });

        const oldB = b;
        b = remainder;
        steps.push({
          line: 5,
          iteration: iter,
          explanation: `Shift remainder into b: b ← remainder (b becomes ${remainder}).`,
          variables: { a, b, remainder },
        });

        steps.push({
          line: 6,
          iteration: iter,
          explanation: `Iteration ${iter} complete: state is now a = ${a}, b = ${b}. Notice GCD(${initialA}, ${initialB}) = GCD(${a}, ${b}) is preserved!`,
          variables: { a, b, remainder },
        });

        iter++;
        if (iter > 15) break;
      }

      steps.push({
        line: 2,
        iteration: iter,
        explanation: `Check loop test: is b ≠ 0? (${b} ≠ 0) is FALSE. The remainder is now zero! The algorithm terminates.`,
        variables: { a, b, remainder },
        conditionEval: { expression: `${b} ≠ 0`, result: false },
      });

      steps.push({
        line: 7,
        explanation: `The final non-zero remainder preserved in variable a is the GCD: GCD(${initialA}, ${initialB}) = ${a}.`,
        variables: { a, b, remainder },
        output: `GCD(${initialA}, ${initialB}) = ${a}`,
      });

      return steps;
    },
  },
];
