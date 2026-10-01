import { TraceableAlgorithm, CodeTraceStep } from '../types/curriculum';

export const ALGORITHM_PRESETS: TraceableAlgorithm[] = [
  {
    id: 'sum-1-to-n',
    title: 'Sum 1 to N (Accumulator Loop)',
    description: 'Calculates the sum 1 + 2 + ... + n using a loop counter and an accumulator.',
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

      // Line 1: READ n
      steps.push({
        line: 1,
        explanation: `Read input value n = ${n}. Memory allocates space for variable n.`,
        variables: { n },
        output: '',
      });

      // Line 2: sum <- 0
      let sum = 0;
      steps.push({
        line: 2,
        explanation: 'Initialize accumulator `sum` to 0. An accumulator holds running totals.',
        variables: { n, sum },
        output: '',
      });

      // Line 3: i <- 1
      let i = 1;
      steps.push({
        line: 3,
        explanation: 'Initialize loop counter `i` to 1 (the first number in the range).',
        variables: { n, sum, i },
        output: '',
      });

      let iteration = 1;
      while (i <= n) {
        // Line 4: Check condition (True)
        steps.push({
          line: 4,
          iteration,
          explanation: `Check loop condition: is i (which is ${i}) ≤ n (${n})? Yes (${i} ≤ ${n} is TRUE). Enter loop body.`,
          variables: { n, sum, i },
          conditionEval: { expression: `${i} ≤ ${n}`, result: true },
          predictionPrompt:
            iteration === 2
              ? {
                  question: `Before Line 5 executes: what will the new value of sum be after adding i (${i}) to sum (${sum})?`,
                  options: [`${sum + i}`, `${sum}`, `${i}`, `${sum + i + 1}`],
                  correctIndex: 0,
                  explanation: `sum becomes old sum (${sum}) + i (${i}) = ${sum + i}.`,
                }
              : undefined,
        });

        // Line 5: sum <- sum + i
        const oldSum = sum;
        sum += i;
        steps.push({
          line: 5,
          iteration,
          explanation: `Update accumulator: sum ← ${oldSum} + ${i} = ${sum}.`,
          variables: { n, sum, i },
        });

        // Line 6: i <- i + 1
        const oldI = i;
        i += 1;
        steps.push({
          line: 6,
          iteration,
          explanation: `Increment counter: i ← ${oldI} + 1 = ${i}.`,
          variables: { n, sum, i },
        });

        iteration++;
        if (iteration > 20) break; // guard
      }

      // Line 4: Loop condition becomes FALSE
      steps.push({
        line: 4,
        iteration,
        explanation: `Check loop condition: is i (${i}) ≤ n (${n})? No (${i} ≤ ${n} is FALSE). Terminate loop!`,
        variables: { n, sum, i },
        conditionEval: { expression: `${i} ≤ ${n}`, result: false },
      });

      // Line 7: END WHILE
      steps.push({
        line: 7,
        explanation: 'Loop has finished all iterations. Execution drops to the next statement.',
        variables: { n, sum, i },
      });

      // Line 8: PRINT
      steps.push({
        line: 8,
        explanation: `Print final output: "Sum is: ${sum}". Variable sum retains final value ${sum}.`,
        variables: { n, sum, i },
        output: `Sum is: ${sum}`,
      });

      return steps;
    },
  },
  {
    id: 'find-max-of-three',
    title: 'Selection: Maximum of 3 Numbers',
    description: 'Demonstrates sequential conditional statements (IF-THEN) to update the current maximum.',
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
        explanation: `Hypothesize that the first number 'a' is the maximum: maxVal ← ${a}.`,
        variables: { a, b, c, maxVal },
      });

      const cond1 = b > maxVal;
      steps.push({
        line: 3,
        explanation: `Evaluate condition: is b (${b}) > maxVal (${maxVal})? Result: ${cond1 ? 'TRUE' : 'FALSE'}.`,
        variables: { a, b, c, maxVal },
        conditionEval: { expression: `${b} > ${maxVal}`, result: cond1 },
      });

      if (cond1) {
        maxVal = b;
        steps.push({
          line: 4,
          explanation: `Since condition was TRUE, update maxVal ← ${b}.`,
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
        explanation: `Evaluate second condition: is c (${c}) > maxVal (${maxVal})? Result: ${cond2 ? 'TRUE' : 'FALSE'}.`,
        variables: { a, b, c, maxVal },
        conditionEval: { expression: `${c} > ${maxVal}`, result: cond2 },
      });

      if (cond2) {
        maxVal = c;
        steps.push({
          line: 7,
          explanation: `Condition was TRUE: update maxVal ← ${c}.`,
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
        explanation: `Output maximum value found: ${maxVal}.`,
        variables: { a, b, c, maxVal },
        output: `Maximum is: ${maxVal}`,
      });

      return steps;
    },
  },
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
        explanation: 'count ← 0 (accumulator for how many even numbers we discover).',
        variables: { limit, count },
      });

      let k = 1;
      steps.push({
        line: 3,
        explanation: 'k ← 1 (counter starting at 1).',
        variables: { limit, count, k },
      });

      let iter = 1;
      while (k <= limit) {
        steps.push({
          line: 4,
          iteration: iter,
          explanation: `Check loop test: is k (${k}) ≤ limit (${limit})? TRUE.`,
          variables: { limit, count, k },
          conditionEval: { expression: `${k} ≤ ${limit}`, result: true },
        });

        const isEven = k % 2 === 0;
        steps.push({
          line: 5,
          iteration: iter,
          explanation: `Test evenness: (${k} MOD 2) == 0 ? ${k % 2} == 0 is ${isEven ? 'TRUE' : 'FALSE'}.`,
          variables: { limit, count, k },
          conditionEval: { expression: `(${k} MOD 2) == 0`, result: isEven },
        });

        if (isEven) {
          count++;
          steps.push({
            line: 6,
            iteration: iter,
            explanation: `k (${k}) is even! Increment count: count ← ${count}.`,
            variables: { limit, count, k },
          });
        }

        steps.push({
          line: 7,
          iteration: iter,
          explanation: 'End of IF statement.',
          variables: { limit, count, k },
        });

        const oldK = k;
        k++;
        steps.push({
          line: 8,
          iteration: iter,
          explanation: `Advance counter: k ← ${oldK} + 1 = ${k}.`,
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
        explanation: `Output final count of even numbers: ${count}.`,
        variables: { limit, count, k },
        output: `Even count: ${count}`,
      });

      return steps;
    },
  },
  {
    id: 'factorial-loop',
    title: 'Factorial Calculation (n!)',
    description: 'Multiplicative accumulator demonstrating rapid growth and loop invariants.',
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
];
