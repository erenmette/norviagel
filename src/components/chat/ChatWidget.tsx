'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatWidget({ isOpen, onClose }: Props) {
  const locale = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const greeting = locale === 'nl'
    ? 'Hoi! Ik ben de Norvia assistent. Stel gerust je vraag over Norvia Gel Glove.'
    : 'Hi! I\'m the Norvia assistant. Feel free to ask me anything about Norvia Gel Glove.';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [isOpen, greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].filter((m) => m.content !== greeting),
          locale,
        }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch {
      const errorMsg = locale === 'nl'
        ? 'Sorry, er ging iets mis. Probeer het later opnieuw.'
        : 'Sorry, something went wrong. Please try again later.';
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] flex flex-col rounded-2xl border border-accent/20 bg-primary-dark/98 backdrop-blur-xl shadow-[0_0_40px_rgba(0,163,255,0.15)] overflow-hidden animate-[chatOpen_0.3s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <MessageCircle size={16} className="text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Norvia Assistant</p>
            <p className="text-[10px] text-text-muted">
              {locale === 'nl' ? 'Online' : 'Online'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[50vh]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-accent text-white rounded-br-md'
                  : 'bg-surface-light text-text-secondary rounded-bl-md'
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-light rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 size={16} className="text-accent animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={locale === 'nl' ? 'Stel een vraag...' : 'Ask a question...'}
            className="flex-1 bg-surface rounded-xl px-4 py-2.5 text-[16px] sm:text-sm text-white placeholder:text-text-muted border border-border focus:border-accent/50 focus:outline-none transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-accent hover:bg-accent-light text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
