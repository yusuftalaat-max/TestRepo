export interface TutorRequest {
  message: string;
  topic?: string;
  lessonTitle?: string;
  exerciseContext?: any;
  attemptCount?: number;
  studentCode?: string;
  recentMistakes?: string;
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
    return data.reply || data.fallback || 'Look at the values of your variables before and after the loop. Where does the value change?';
  } catch (err) {
    console.warn('Tutor fetch failed, using pedagogical fallback:', err);
    // Graceful offline fallback
    if ((params.attemptCount || 1) === 1) {
      return `Let's pause and inspect the values. What value does the counter hold just before the condition check? Try walking through line by line.`;
    }
    return `Look at the condition: does it check '<' or '<='? Check what happens on the very last step right before termination.`;
  }
}
