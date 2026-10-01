# CS1 Companion — GIU Engineering

> **Interactive Learning Environment for Computer Science 1 (GIU Egypt)**  
> Tailored for first-year engineering students and co-studying parents, bridging conceptual understanding, visual tracing, algorithm analysis, and hands-on coding practice.

---

## 🚀 Overview

**CS1 Companion** is designed to demystify core Computer Science fundamentals for first-year Engineering students at the German International University (GIU), Egypt. It emphasizes mental models, state visualization, and systematic problem solving before jumping to syntax.

### ✨ Key Features

1. **Step-by-Step Algorithm Lab**:
   - Visual execution engine with line-by-line highlight
   - Memory inspection table (variables, loop counters, accumulators)
   - Boolean condition evaluator showing step-by-step logic
   - Pre-loaded classic CS1 problems: *Sum 1 to N*, *Find Maximum of Three*, *Count Evens*, *Factorial*
   - Custom algorithm input runner

2. **Structured 9-Stage Pedagogical Modules**:
   - **Module 1**: Algorithmic Thinking & Flow of Control (sequence, selection, repetition)
   - **Module 2**: Loops & Iteration Mechanics (state tables, loop invariants, termination conditions)
   - **Module 3**: Arrays & Linear Data Structures (zero-indexing, boundary checks, traversal patterns)
   - **Module 4**: Modular Design & Functions (parameters, return values, call stack, scope)
   - Each module contains: *Real-world Analogy, Mental Model, Visual Trace, Live Code Lab, Common Traps, Exercises, and Challenge Labs*.

3. **10-Stage Engineering Problem Lab**:
   - Step 1: Problem Definition & Constraints
   - Step 2: Input / Output Specifications
   - Step 3: Edge Cases & Boundary Conditions
   - Step 4: Manual Hand-Tracing
   - Step 5: High-Level Pseudocode
   - Step 6: Step-by-step Invariant Verification
   - Step 7: Clean Implementation
   - Step 8: Test Case Validation
   - Step 9: Complexity Analysis ($O(1)$, $O(n)$, $O(n^2)$)
   - Step 10: Retrospective & Common Pitfalls

4. **Socratic AI Tutor**:
   - Guided inquiry that prompts student discovery rather than handing out answers
   - Diagnoses classic beginner mistakes: off-by-one errors, infinite loop traps, accumulator reset bugs, and comparison vs assignment errors
   - Multi-tier progressive hints

5. **Parent & Instructor Co-Study Mode**:
   - Real-time student progress tracking
   - "Teach Together" discussion prompts designed for parents with CS/engineering backgrounds to guide students effectively
   - Common stumbling points and discussion questions for each topic

6. **Exam & Assessment Simulator**:
   - Timed multiple-choice and tracing question pools
   - Instant diagnostic analysis pinpointing weak subtopics

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend / API**: Express 4, Node.js, `@google/genai` (Gemini 2.5 Flash Socratic Tutor)
- **Deployment**: Vite SPA / Full-stack Node container

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation & Run

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cs1-companion.git
   cd cs1-companion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up your Gemini API key in `.env`:
   ```bash
   cp .env.example .env
   # Add: GEMINI_API_KEY=your_key_here
   ```
   *(Note: The app includes a robust pedagogical heuristic engine, so it works fully even without an API key).*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Hosting Platforms

- **Vercel / Netlify**: Connect the GitHub repo and set build command to `npm run build` and output directory to `dist`.
- **Docker / Cloud Run**: Built with standard container configurations on port 3000.
- **GitHub Pages**: Deploy the built `dist` folder to the `gh-pages` branch.

---

## 📄 License
MIT License. Built for students and educators at GIU Egypt.
