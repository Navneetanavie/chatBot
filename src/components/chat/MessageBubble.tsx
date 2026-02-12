import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "flex w-full items-end gap-3 p-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm",
          isUser ? "bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700" : "bg-black text-white dark:bg-white dark:text-black border-transparent"
        )}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-none"
        )}
      >
        {message.content}
        <span className={cn("mt-1 block text-[10px] font-medium", isUser ? "text-blue-200" : "text-zinc-500 dark:text-zinc-400")}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
