import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center opacity-50">
          <p>No messages yet.</p>
        </div>
      ) : (
        messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))
      )}

      {isTyping && (
        <div className="flex w-full items-end gap-3 p-4">
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm bg-black text-white dark:bg-white dark:text-black border-transparent">
            {/* Robot icon or similar */}
            <div className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s] mx-0.5" />
            <div className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Bot is typing...</span>
        </div>
      )}

      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
