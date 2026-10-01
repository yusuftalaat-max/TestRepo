import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required User-Agent
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Topic-aware Socratic heuristic generator (ensures NO hard-coded loop fallback on non-loop topics)
function getTopicAwareFallback(topic: string, lessonTitle: string, attemptCount: number): string {
  const combined = (topic + ' ' + lessonTitle).toLowerCase();
  
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
    if (attemptCount <= 1) {
      return "Let's break this into clear sequential steps: 1) What are the exact inputs we must read first? 2) What formula transforms them? 3) What must be printed at the end?";
    } else if (attemptCount === 2) {
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
    if (attemptCount <= 1) {
      return "Let's inspect the memory cells step-by-step. Which variable's value is being read on the right-hand side, and which box is being overwritten on the left?";
    } else if (attemptCount === 2) {
      return "Remember that assignment in computer memory is destructive: writing a new value completely erases the previous one. Did you make a backup in a temporary variable first?";
    }
    return "Draw boxes for your variables on paper. Write their values before this line executes, then write the single value that gets changed. Which value was lost?";
  }

  // 3. Arithmetic, Division & Modulo
  if (
    combined.includes('mod') ||
    combined.includes('division') ||
    combined.includes('arithmetic') ||
    combined.includes('expression') ||
    combined.includes('precedence') ||
    combined.includes('second') ||
    combined.includes('time') ||
    combined.includes('pseudocode conventions')
  ) {
    if (attemptCount <= 1) {
      return "Think about the arithmetic operator: are you computing the whole integer quotient with '/', or the leftover remainder with 'MOD'?";
    } else if (attemptCount === 2) {
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
    if (attemptCount <= 1) {
      return "What does the relational test evaluate to with your current input: strictly TRUE or FALSE? Which path executes for that truth value?";
    } else if (attemptCount === 2) {
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
    if (attemptCount <= 1) {
      return "Does this scenario require BOTH requirements to be true simultaneously (AND), or is AT LEAST ONE sufficient (OR)?";
    } else if (attemptCount === 2) {
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
    if (attemptCount <= 1) {
      return "Where does the counter start, and where does it increment? Does it advance on every pass or only when a specific condition is met?";
    } else if (attemptCount === 2) {
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
    if (attemptCount <= 1) {
      return "Where is your accumulator initialized? Remember: an accumulator must be set ONCE before the loop, not inside the repeating body!";
    } else if (attemptCount === 2) {
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
    if (attemptCount <= 1) {
      return "Examine the four loop parts: 1) starting initialization, 2) condition test, 3) body, and 4) state update. Which part is misbehaving?";
    } else if (attemptCount === 2) {
      return "Check your loop condition: does it check '<' or '<='? Think about whether it stops one step too early (an off-by-one error).";
    }
    return "What guarantees that your loop will eventually stop? Verify that the loop body actually moves the variable closer to the termination condition.";
  }

  // General Problem Solving (Default - NEVER loop-specific!)
  if (attemptCount <= 1) {
    return "Let's break the problem down into three clear parts: 1) What are the exact inputs? 2) What is the intended output? 3) What is the very first step?";
  } else if (attemptCount === 2) {
    return "Try hand-tracing with a small concrete example on paper before jumping to conclusions. What state changes first?";
  }
  return "Look at your boundary cases: what should happen for zero, negative numbers, or equal inputs?";
}

// Socratic AI Tutor API endpoint
app.post('/api/tutor', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      message,
      topic = 'Computer Science 1',
      lessonTitle = 'General',
      exerciseContext,
      attemptCount = 1,
      studentCode,
      recentMistakes,
      masteredObjectives,
      demonstratedStrengths,
      totalPreviousAttempts = 0,
      totalHintsUsed = 0,
      revealedHintLevel = 0,
      prerequisitesMet = true,
    } = req.body;

    const socraticInstruction = `
You are the Socratic AI Tutor for "CS1 Companion", an interactive learning environment for a first-year Engineering student at the German International University (GIU), Egypt.
The student has no previous coding background. His father has a CS background and occasionally co-studies with him.

PEDAGOGICAL RULES (STRICT):
1. NEVER simply give the final answer or code solution directly, especially on attempts 1-3.
2. Attempt 1: Ask an incisive guiding question that directs the student's attention to the root mechanic or variable state.
3. Attempt 2: Point toward the relevant core concept (e.g. "What happens to the variable right before the branch?").
4. Attempt 3: Break the problem into smaller, bite-sized steps ("Let's trace just the very first step with concrete values...").
5. Only if the student is thoroughly stuck after repeated tries: walk through the mechanism step-by-step with clear reasoning before showing the outcome.
6. Tone: Rigorous, warm, encouraging, concise (2-4 sentences max per response).
7. CRITICAL TOPIC CONSTRAINT: Tailor advice strictly to the ACTIVE topic: "${topic}".
   - DO NOT mention loops, while statements, or iterations if the active topic is Sequence, Variables, Modulo, Conditions, Selection, or Boolean Logic!
   - For Sequence/Formulas: Focus on input/output order and operator precedence.
   - For Variables/Swap: Focus on destructive assignment and temporary variable preservation.
   - For Expressions/Modulo: Focus on integer division vs remainder.
   - For Conditions: Focus on Boolean truth values, mutual exclusivity (IF-ELSE vs independent IFs), and relational operator boundaries.
   - For Counters/Accumulators: Focus on placement of initialization (outside loop) and identity elements (0 for sums, 1 for products).
   - For Loops: Focus on the 4 loop parts (init, test, body, update) and termination guarantees.

STUDENT'S RECORDED CONTEXT & HISTORY:
- Active Topic: ${topic}
- Current Lesson / Problem: ${lessonTitle}
- Exercise / Problem Context: ${JSON.stringify(exerciseContext || {})}
- Student Attempt Number: ${attemptCount}
- Hints Already Revealed on this task: ${revealedHintLevel} of 3
- Total Hints Used Across History: ${totalHintsUsed}
- Total Historical Exercise Attempts: ${totalPreviousAttempts}
- Demonstrated Strengths / Mastered Lessons: ${JSON.stringify(demonstratedStrengths || [])}
- Mastered Objectives in History: ${JSON.stringify(masteredObjectives || [])}
- Actually Logged Misconceptions (from student errors): ${JSON.stringify(recentMistakes || [])}
- Prerequisite Knowledge Status: ${prerequisitesMet ? 'Verified' : 'Review Needed'}
- Student's Code / Answer: ${studentCode || 'N/A'}
`;

    if (!ai || !apiKey) {
      // Dynamic topic-aware fallback when Gemini API key is not in environment
      const fallbackResponse = getTopicAwareFallback(topic, lessonTitle, attemptCount);
      res.json({ reply: fallbackResponse, source: 'heuristic' });
      return;
    }

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `${socraticInstruction}\n\nStudent question / response:\n"${message || 'I am stuck, can you guide me?'}"`
          }
        ]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        temperature: 0.7,
        maxOutputTokens: 350,
      }
    });

    const reply = response.text || getTopicAwareFallback(topic, lessonTitle, attemptCount);
    res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Tutor API error:', error);
    const fallbackResponse = getTopicAwareFallback(req.body.topic || '', req.body.lessonTitle || '', req.body.attemptCount || 1);
    res.json({
      reply: fallbackResponse,
      source: 'heuristic_fallback'
    });
  }
});

// Download endpoints for offline standalone file and portable archive
app.get('/download/standalone', (_req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'dist', 'cs1-companion-standalone.html');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'CS1-Companion-Standalone.html');
  } else {
    res.status(404).send('Standalone file is generating. Please try again in a few seconds.');
  }
});

app.get('/download/zip', (_req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'dist', 'CS1-Companion-App.zip');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'CS1-Companion-App.zip');
  } else {
    res.status(404).send('Zip file not found.');
  }
});

app.get('/download/package', (_req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'dist', 'cs1-companion-portable.tar.gz');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'CS1-Companion-Portable.tar.gz');
  } else {
    res.status(404).send('Package archive not found.');
  }
});

// Production & Vite middleware configuration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const distExists = fs.existsSync(path.resolve(__dirname, 'dist', 'index.html'));

  if (isProd && distExists) {
    // Production mode: serve built assets
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Development mode or on-the-fly SSR: use Vite middleware and transform index.html
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicitly handle all non-API HTML requests by transforming index.html with Vite
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        if (vite.ssrFixStacktrace) vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CS1 Companion server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
