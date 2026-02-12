import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="border-t bg-white p-4 dark:bg-zinc-900 dark:border-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center rounded-xl border bg-zinc-50 focus-within:ring-2 focus-within:ring-blue-500/20 px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700 transition-all shadow-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none placeholder:text-zinc-400 dark:text-zinc-100"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className={cn(
            "ml-2 rounded-full p-2 transition-all duration-200",
            input.trim() && !disabled
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              : "bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500 cursor-not-allowed"
          )}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
