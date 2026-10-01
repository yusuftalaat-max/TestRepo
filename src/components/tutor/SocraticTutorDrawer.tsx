import React, { useState, useEffect, useRef } from 'react';
import { askSocraticTutor } from '../../services/tutorApi';
import { Bot, Send, X, Sparkles, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';

interface TutorMessage {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  timestamp: string;
}

interface SocraticTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context: {
    topic?: string;
    lessonTitle?: string;
    exerciseContext?: any;
    attemptCount?: number;
    studentCode?: string;
    recentMistakes?: string;
  };
}

export const SocraticTutorDrawer: React.FC<SocraticTutorDrawerProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text: `Hello! I am your GIU CS1 Socratic Tutor. I'm here to help you reason through algorithmic thinking, trace tables, and loops. What part of the concept or exercise would you like to explore together?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If new exercise context opens, tutor offers a proactive thought prompt
  useEffect(() => {
    if (context.exerciseContext?.title) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'tutor',
          text: `I see you are working on "${context.exerciseContext.title}". Remember to trace step-by-step before guessing! Would you like a guiding question on how to begin?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [context.exerciseContext?.title]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: TutorMessage = {
      id: Date.now().toString(),
      sender: 'student',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await askSocraticTutor({
        message: query,
        topic: context.topic,
        lessonTitle: context.lessonTitle,
        exerciseContext: context.exerciseContext,
        attemptCount: context.attemptCount || 1,
        studentCode: context.studentCode,
        recentMistakes: context.recentMistakes,
      });

      const tutorMsg: TutorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: `Let's inspect the variables line by line. What is the value of your counter variable just before the while condition evaluates?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col">
      {/* Drawer Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>Socratic AI Tutor</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Gemini 3.8
              </span>
            </h3>
            <span className="text-[11px] text-slate-400 block truncate max-w-[240px]">
              Context: {context.lessonTitle || 'General CS1'}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Socratic Pedagogy Notice */}
      <div className="bg-indigo-950/40 px-4 py-2 border-b border-indigo-900/60 flex items-center gap-2 text-[11px] text-indigo-300">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span>Tutor guides your thinking with questions; it never gives away answers.</span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'student' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'student'
                  ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none font-sans'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl w-fit text-xs text-indigo-400 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Thinking through your question...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Socratic Prompts */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => handleSendMessage('Why did my loop test fail on the boundary?')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          Check boundary test
        </button>
        <button
          onClick={() => handleSendMessage('How does the accumulator change on iteration 1?')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          Accumulator trace
        </button>
        <button
          onClick={() => handleSendMessage('Help me break this problem into 3 small steps')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          Step breakdown
        </button>
      </div>

      {/* Input Field */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Ask a question about this step..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
