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

// Socratic AI Tutor API endpoint
app.post('/api/tutor', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      message,
      topic,
      lessonTitle,
      exerciseContext,
      attemptCount = 1,
      studentCode,
      recentMistakes,
    } = req.body;

    const socraticInstruction = `
You are the Socratic AI Tutor for "CS1 Companion", an interactive learning environment for a first-year Engineering student at the German International University (GIU), Egypt.
The student may have little previous coding background. His father has a CS background and occasionally co-studies with him.

PEDAGOGICAL RULES (STRICT):
1. NEVER simply give the final answer or code solution directly, especially on attempts 1-3.
2. Attempt 1: Ask an incisive guiding question that directs the student's attention to the root mechanic or variable state.
3. Attempt 2: Point toward the relevant core concept (e.g. "What happens to the counter variable right before the loop test?").
4. Attempt 3: Break the problem into smaller, bite-sized steps ("Let's trace just the very first iteration with n=3...").
5. Only if the student is thoroughly stuck after repeated tries: walk through the mechanism step-by-step with clear reasoning before showing the outcome.
6. Diagnose common CS1 misconceptions:
   - Off-by-one errors (< vs <=)
   - Loop variable not updating (infinite loop trap)
   - Accumulator variable reset inside the loop body instead of initialized before
   - Assignment (=) vs equality comparison (==)
   - Boolean condition inverted (e.g. while condition is TRUE vs until condition)
   - Tracing without writing down state table
7. Style: Rigorous, warm, encouraging, concise (2-4 sentences max per response). Speak like a top GIU teaching assistant.

CURRENT CONTEXT:
- Module/Topic: ${topic || 'Computer Science 1'}
- Lesson: ${lessonTitle || 'General'}
- Current Exercise / State: ${JSON.stringify(exerciseContext || {})}
- Student's Current Attempt Number: ${attemptCount}
- Student's Code / Answer: ${studentCode || 'N/A'}
- Recent Identified Errors: ${recentMistakes || 'None'}
`;

    if (!ai || !apiKey) {
      // Intelligent fallback when Gemini API key is not yet set in environment
      let fallbackResponse = '';
      if (attemptCount <= 1) {
        fallbackResponse = `Let's inspect the flow step-by-step. What value does your variable hold right before the condition check? Try tracing the first step on paper or using our Algorithm Visualizer.`;
      } else if (attemptCount === 2) {
        fallbackResponse = `Notice how the loop condition evaluates: does it check '<' or '<='? Think about whether the loop should stop *at* the target or run one extra time.`;
      } else {
        fallbackResponse = `Let's break it down: 1) Initial state before loop, 2) First iteration modification, 3) Loop condition re-evaluation. Where does the output diverge from your expected result?`;
      }
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

    const reply = response.text || 'Think about the state of your variables after the first step. What value changes?';
    res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Tutor API error:', error);
    res.status(500).json({
      error: 'Failed to generate tutor response',
      fallback: 'Let us check the variables at each line. Step through with the Visualizer to see where the value unexpected changes.'
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
