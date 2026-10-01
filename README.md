# CS1 Companion — GIU Engineering

> **Educational-Quality Learning Environment for Computer Science 1 (GIU Egypt)**  
> Focused on Part I: Problems, Algorithms, Pseudocode, Conditions, Counters, Accumulators & Loops.  
> Tailored for first-year engineering students and co-studying parents, bridging conceptual mental models, deterministic state tracing, algorithm analysis, and hands-on problem solving.

---

## 🏛️ Educational Architecture & Curriculum Focus (Part I)

Rather than rushing ahead into binary, Boolean circuits, or memory pointer syntax, this release deepens the foundational algorithmic thinking required to excel in Computer Science 1 at the German International University (GIU), Egypt.

### 📚 The 4 Curated Modules (8 Core Lessons)

1. **Module 1: Problems & Algorithms**
   - **Lesson 1: Problems, Algorithms & Computational Thinking**: From human problem statements to unambiguous machine instructions; the 5 Knuth criteria (Finiteness, Definiteness, Input, Output, Effectiveness); temporal state transitions.
   - **Lesson 2: Inputs, Outputs & Variables**: Destructive assignment in computer memory; why `a = b; b = a;` fails; the 3-step temporary variable swap dance (`temp ← a; a ← b; b ← temp;`).

2. **Module 2: Pseudocode & Algorithm Tracing**
   - **Lesson 3: Pseudocode Conventions & Structure**: Language-independent structured keywords (READ, PRINT, ←, IF, WHILE); integer division `/` vs modulo remainder `MOD`; extracting and stripping decimal digits.
   - **Lesson 4: Algorithm Tracing with State Tables**: Constructing formal trace tables with step numbers, instruction pointers, variable states, and branch evaluations; diagnosing bugs before typing code.

3. **Module 3: Conditions & Selection**
   - **Lesson 5: Conditions & Selection Structures**: Relational comparisons (`=`, `≠`, `<`, `≤`, `>`, `≥`); assignment vs comparison (`=` vs `==`); mutual exclusivity in `IF ... ELSE IF ... ELSE` ladders vs independent `IF` blocks.
   - **Lesson 6: Compound Boolean Conditions & Logic**: Truth tables; logical conjunction (`AND`), disjunction (`OR`), and negation (`NOT`); operator precedence; short-circuit evaluation; De Morgan's Laws.

4. **Module 4: Loops & Iteration**
   - **Lesson 7: Anatomy of Loops & While Statements**: The four universal loop components (Initialization, Condition Test, Body, State Update); pre-test semantics; zero-iteration loops; proving termination and preventing infinite loops.
   - **Lesson 8: Accumulators, Invariants & Debugging Loops**: The accumulator pattern; mathematical identity elements (0 for additive sums, 1 for multiplicative products like factorial); diagnosing in-loop accumulator reset bugs; eliminating Off-By-One Errors (OBOE).

---

## 🎯 6-Stage Pedagogical Progression

Every single lesson follows a strict cognitive progression where formal definitions are never introduced before the student possesses an intuitive mental model:

1. **Intuition**: An everyday physical or analog problem without computer science jargon.
2. **Concrete Example**: A tangible numerical walkthrough with observable state transformations.
3. **Student Prediction**: An active challenge where the student predicts what will happen based on their intuition before seeing the formal rules.
4. **Formal Concept**: Standardized algorithmic definitions, key technical terminology, and common mental traps.
5. **Worked Example**: A complete engineering problem solved with step-by-step reasoning, pseudocode, and an exhaustive state trace table.
6. **Independent Application**: Curated exercises spanning multiple cognitive tiers to prove real objective mastery.

---

## 🛡️ Objective-Based Mastery Standard (No Fake Claims)

- **Clean Slate for New Students**: The application starts in an honest, clean state. Zero fake or pre-seeded student progress, misconceptions, or mastery levels.
- **Evidence-Backed Diagnostics**: No diagnostic claims or error flags are displayed unless supported by actual recorded student behavior.
- **Separation by Learning Objective**: Mastery is tracked per learning objective rather than lesson completion.
- **Multi-Category Verification**: Correct answers to recognition or multiple-choice questions alone do **NOT** establish mastery. The student must demonstrate validated competence across at least two distinct cognitive tiers (including Tracing, Application, or Problem Solving) with $\ge 75\%$ accuracy and low hint dependency.

---

## 🧪 19-Problem Sequenced Engineering Lab

A sequenced suite of 19 engineering problems covering the entire Part I domain, arranged in order of increasing difficulty and explicitly reusing earlier concepts:

1. **Problem 1**: Rectangle Perimeter & Area *(Sequence & Formula Evaluation)*
2. **Problem 2**: Fahrenheit to Celsius Conversion *(Operator Precedence & Floating-Point Division)*
3. **Problem 3**: Two-Variable Value Swap *(Destructive Assignment & Temp Variable)*
4. **Problem 4**: Seconds to Hours, Minutes, and Seconds *(Integer Division & Modulo Remainder)*
5. **Problem 5**: Absolute Value of an Integer *(Single Conditional Branch & Sign Inversion)*
6. **Problem 6**: Maximum of Two Numbers *(Relational Comparison & Mutual Exclusivity)*
7. **Problem 7**: Even or Odd Detector *(Modulo Divisibility Test)*
8. **Problem 8**: Academic Grade Classifier *(Multi-Way Selection Ladder & Interval Bounds)*
9. **Problem 9**: Maximum of Three Numbers *(Hypothesis-Update Pattern & Chained Comparisons)*
10. **Problem 10**: Triangle Validity & Classification *(Triangle Inequality & Compound Boolean Conditions)*
11. **Problem 11**: Count Down to Launch *(Pre-Test While Loop & Decrementing Counter)*
12. **Problem 12**: Count Multiples of K up to N *(Loop + Conditional Event Filter)*
13. **Problem 13**: Count Digits of an Integer *(Repeated Integer Division & Zero Boundary Guard)*
14. **Problem 14**: Sum of Integers from 1 to N *(Accumulator Pattern & Additive Identity 0)*
15. **Problem 15**: Factorial Calculation ($N!$) *(Multiplicative Accumulator & Identity 1)*
16. **Problem 16**: Average of Stream Terminated by Sentinel -1 *(Priming Read & Zero-Division Protection)*
17. **Problem 17**: Compute Power ($X^Y$) *(Repeated Multiplication & Exponent Zero Case)*
18. **Problem 18**: Find Min and Max in a Stream *(Simultaneous Dual Invariant Tracking)*
19. **Problem 19**: Primality Test by Trial Division *(Loop + Early Termination Flag + Modulo)*

---

## 🔍 Instructor Content Inspector Mode

The Instructor & Parent view includes a dedicated **Content Inspector** that allows parents and educators to inspect the entire pedagogical chain of every lesson:
- **Learning Objectives** (with cognitive categories: Recall, Tracing, Application, Problem Solving)
- **Formal Concepts & Key Terminology**
- **Curated Exercises** (linked to objectives and misconceptions)
- **Targeted Misconceptions & Pedagogical Remedies**
- **Objective Mastery Evidence Rules**

---

## 🤖 Context-Aware Socratic AI Tutor

- Analyzes the student's actual history: active topic, specific problem context, previous attempt number, hints revealed, and logged misconceptions.
- **Topic-Aware Fallbacks**: Eliminates generic loop-only tutoring when working on non-loop topics (Variables, Expressions, Modulo, Conditions, Boolean Logic, or Counters).
- Employs strict Socratic questioning: guides the student toward discovery rather than handing out raw solutions.

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
