"use client";

import React, { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';



export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        role: 'bot',
        content: 'Hello! How can I help you today?',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 0);
  }, []);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);


    const localResponse = getBotResponse(content);
    if (localResponse) {
      setTimeout(() => {
        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: localResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'bot',
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.warn("API call failed, falling back to local logic:", error);

      setTimeout(() => {
        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: "I’m still learning. Can you rephrase that?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  const getBotResponse = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello there! Ready to chat!";
    }
    if (lowerInput.includes('how are you')) {
      return "I'm just a bot, but I'm functioning perfectly! How about you?";
    }
    if (lowerInput.includes('what is your name')) {
      return "I'm a simple chatbot built with Next.js.";
    }
    if (lowerInput.includes('help')) {
      return "I can help you with general questions. What's on your mind?";
    }
    if (lowerInput.includes('joke')) {
      return null;

    }
    return null;
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-white dark:bg-zinc-900 shadow-xl overflow-hidden md:max-w-2xl md:rounded-2xl md:my-10 md:h-[80vh] border dark:border-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-800">
      <div className="bg-zinc-50/50 border-b p-4 dark:bg-zinc-900/50 dark:border-zinc-800 flex items-center justify-between backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-zinc-900 dark:bg-zinc-100 rounded-full flex items-center justify-center">
            <span className="text-white dark:text-zinc-900 font-bold text-lg">AI</span>
          </div>
          <div>
            <h1 className="font-semibold text-zinc-900 dark:text-white leading-tight">Assistant</h1>
            <span className="text-xs text-zinc-500 block">Always online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
        </div>
      </div>

      <MessageList messages={messages} isTyping={isTyping} />

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}
