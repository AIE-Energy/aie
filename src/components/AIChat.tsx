import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([
    { type: 'ai', content: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [perplexityKey, setPerplexityKey] = useState(localStorage.getItem('perplexityKey') || '');
  const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('perplexityKey'));
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    const userMessage = input;
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('perplexity-chat', {
        body: { message: userMessage },
      });

      if (error) {
        throw error;
      }

      setMessages(prev => [...prev, { type: 'ai', content: data.content }]);
    } catch (error) {
      console.error('Error calling AI:', error);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
      toast.error('Failed to get AI response', {
        description: 'Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (perplexityKey.trim()) {
      localStorage.setItem('perplexityKey', perplexityKey);
      setShowKeyInput(false);
      toast.success('API Key saved', { 
        description: 'Your Perplexity API key has been saved locally.' 
      });
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-4 bg-black hover:bg-gray-800 z-40"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {showKeyInput ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Enter Perplexity API Key</h4>
                <form onSubmit={saveApiKey} className="space-y-3">
                  <Input 
                    type="password"
                    value={perplexityKey}
                    onChange={(e) => setPerplexityKey(e.target.value)}
                    placeholder="Enter your Perplexity API key"
                    className="text-sm"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm">Save Key</Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    The API key is stored only in your browser's local storage.
                  </p>
                </form>
              </div>
            ) : (
              messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-black'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
                disabled={isLoading || showKeyInput}
              />
              <Button type="submit" disabled={isLoading || showKeyInput}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
