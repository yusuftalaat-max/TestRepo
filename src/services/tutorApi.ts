export interface TutorRequest {
  message: string;
  topic?: string;
  lessonTitle?: string;
  exerciseContext?: any;
  attemptCount?: number;
  revealedHintLevel?: number;
  studentCode?: string;
  recentMistakes?: string[];
  masteredObjectives?: string[];
  demonstratedStrengths?: string[];
  totalPreviousAttempts?: number;
  totalHintsUsed?: number;
  prerequisitesMet?: boolean;
}

export function generateTopicAwareFallback(params: TutorRequest): string {
  const topic = (params.topic || '').toLowerCase();
  const title = (params.lessonTitle || '').toLowerCase();
  const combined = `${topic} ${title}`;
  const attempt = params.attemptCount || 1;

  // 1. Sequence & Computational Thinking
  if (
    combined.includes('sequence') ||
    combined.includes('computational thinking') ||
    combined.includes('perimeter') ||
    combined.includes('rectangle') ||
    combined.includes('fahrenheit') ||
    combined.includes('celsius') ||
    combined.includes('conversion')
  ) {
    if (attempt <= 1) {
      return "Let's break this into clear sequential steps: 1) What are the exact inputs we must read first? 2) What formula transforms them? 3) What must be printed at the end?";
    } else if (attempt === 2) {
      return "Remember that computers execute instructions in strict top-to-bottom sequence. Be sure any variables used in a formula are assigned or read BEFORE that formula executes!";
    }
    return "Check your units and operator order. Are your parentheses forcing the subtraction before multiplication or division?";
  }

  // 2. Variables, Assignments & Swaps
  if (
    combined.includes('variable') ||
    combined.includes('swap') ||
    combined.includes('assign') ||
    combined.includes('memory') ||
    combined.includes('destructive')
  ) {
    if (attempt <= 1) {
      return "Let's inspect the memory cells step-by-step. Which variable's value is being read on the right-hand side, and which box is being overwritten on the left?";
    } else if (attempt === 2) {
      return "Remember that assignment in computer memory is destructive: writing a new value completely erases the previous one. Did you make a backup in a temporary variable first?";
    }
    return "Draw boxes for your variables on paper. Write their values before this line executes, then write the single value that gets changed. Which value was lost?";
  }

  // 3. Arithmetic, Division & Modulo
  if (
    combined.includes('mod') ||
    combined.includes('division') ||
    combined.includes('expression') ||
    combined.includes('precedence') ||
    combined.includes('second') ||
    combined.includes('pseudocode conventions')
  ) {
    if (attempt <= 1) {
      return "Think about the arithmetic operator: are you computing the whole integer quotient with '/', or the leftover remainder with 'MOD'?";
    } else if (attempt === 2) {
      return "Check your operator precedence: in expressions like (a + b) / 2, without parentheses the computer divides 'b / 2' first before adding!";
    }
    return "Test with simple numbers: for example, 14 divided by 4 gives a quotient of 3 with a remainder of 2 (14 MOD 4 = 2). How does that apply here?";
  }

  // 4. Conditions, Selection & Branching
  if (
    combined.includes('condition') ||
    combined.includes('branch') ||
    combined.includes('selection') ||
    combined.includes('max') ||
    combined.includes('abs') ||
    combined.includes('even') ||
    combined.includes('odd') ||
    combined.includes('grade') ||
    combined.includes('triangle')
  ) {
    if (attempt <= 1) {
      return "What does the relational test evaluate to with your current input: strictly TRUE or FALSE? Which path executes for that truth value?";
    } else if (attempt === 2) {
      return "Check whether your choices are mutually exclusive (an IF-ELSE IF ladder where only one branch can execute) or independent IF statements that can both run.";
    }
    return "Test the boundary case: what happens when your input is exactly equal to the threshold? Does your condition use '<' or '<='?";
  }

  // 5. Compound Logic & Boolean Operators
  if (
    combined.includes('boolean') ||
    combined.includes('and') ||
    combined.includes('or') ||
    combined.includes('not') ||
    combined.includes('logic') ||
    combined.includes('short-circuit') ||
    combined.includes('leap')
  ) {
    if (attempt <= 1) {
      return "Does this scenario require BOTH requirements to be true simultaneously (AND), or is AT LEAST ONE sufficient (OR)?";
    } else if (attempt === 2) {
      return "Remember that in interval checks like (x >= 0 AND x <= 100), using OR would accidentally match every number in the universe!";
    }
    return "Apply De Morgan's law if you are negating: the negation of (A AND B) is (NOT A) OR (NOT B).";
  }

  // 6. Counters & Events
  if (
    combined.includes('counter') ||
    combined.includes('countdown') ||
    combined.includes('multiple')
  ) {
    if (attempt <= 1) {
      return "Where does the counter start, and where does it increment? Does it advance on every pass or only when a specific condition is met?";
    } else if (attempt === 2) {
      return "Check the final state: what value does the counter hold immediately after the loop exits?";
    }
    return "Trace iteration by iteration: write down the counter value at each step to verify it reaches exactly the target count without an off-by-one error.";
  }

  // 7. Accumulators & Aggregates
  if (
    combined.includes('accumulator') ||
    combined.includes('sum') ||
    combined.includes('factorial') ||
    combined.includes('product') ||
    combined.includes('sentinel') ||
    combined.includes('average')
  ) {
    if (attempt <= 1) {
      return "Where is your accumulator initialized? Remember: an accumulator must be set ONCE before the loop, not inside the repeating body!";
    } else if (attempt === 2) {
      return "Check your identity element: sum accumulators must start at 0 (x + 0 = x), while product accumulators must start at 1 (x * 1 = x)!";
    }
    return "Trace the running total across the first two passes: how does the new value add to or multiply with the existing total?";
  }

  // 8. Loops & Repetition (Strictly when loop context is present)
  if (
    combined.includes('loop') ||
    combined.includes('while') ||
    combined.includes('iteration') ||
    combined.includes('invariant') ||
    combined.includes('prime')
  ) {
    if (attempt <= 1) {
      return "Examine the four loop parts: 1) starting initialization, 2) condition test, 3) body, and 4) state update. Which part is misbehaving?";
    } else if (attempt === 2) {
      return "Check your loop condition: does it check '<' or '<='? Think about whether it stops one step too early (an off-by-one error).";
    }
    return "What guarantees that your loop will eventually stop? Verify that the loop body actually moves the variable closer to the termination condition.";
  }

  // General Algorithmic Problem Solving (Default - NEVER loop-specific!)
  if (attempt <= 1) {
    return "Let's break the problem down into three clear parts: 1) What are the exact inputs? 2) What is the intended output? 3) What is the very first step?";
  } else if (attempt === 2) {
    return "Try hand-tracing with a small concrete example on paper before jumping to conclusions. What state changes first?";
  }
  return "Look at your boundary cases: what should happen for zero, negative numbers, or equal inputs?";
}

export async function askSocraticTutor(params: TutorRequest): Promise<string> {
  try {
    const res = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.reply || data.fallback || generateTopicAwareFallback(params);
  } catch (err) {
    console.warn('Tutor fetch fallback active:', err);
    return generateTopicAwareFallback(params);
  }
}
