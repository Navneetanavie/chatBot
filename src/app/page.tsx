import { ChatLayout } from '@/components/chat/ChatLayout';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
      <ChatLayout />
    </main>
  );
}
