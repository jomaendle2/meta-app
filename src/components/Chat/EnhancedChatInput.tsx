"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  SendIcon, 
  SparklesIcon, 
  MicIcon, 
  PaperclipIcon,
  XIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
  placeholder?: string;
}

const EXAMPLE_PROMPTS = [
  "Create a pricing card component",
  "Build a modern login form",
  "Design a dashboard sidebar",
  "Make a responsive navigation bar",
  "Create a product showcase card",
];

export default function EnhancedChatInput({ 
  onSend, 
  loading, 
  placeholder = "Describe the React component you want to create..."
}: EnhancedChatInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSend(input.trim());
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const enhancePrompt = async () => {
    if (!input.trim()) return;
    
    // Simple prompt enhancement - in a real app, this would call an API
    const enhanced = `Create a modern, responsive ${input.toLowerCase()} component using React and Tailwind CSS. Make it accessible and include proper TypeScript types.`;
    setInput(enhanced);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="relative">
      {/* Suggestions */}
      {showSuggestions && (
        <div className="absolute bottom-full mb-2 w-full bg-popover border border-border rounded-lg shadow-lg p-2 z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Try these prompts:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(false)}
              className="h-6 w-6 p-0"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {EXAMPLE_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(prompt)}
                className="w-full text-left px-2 py-1 text-sm rounded hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-end space-x-2">
          {/* Main input area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={loading}
              rows={1}
              className={cn(
                "w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-32 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                "min-h-[48px] max-h-[120px] overflow-y-auto"
              )}
            />
            
            {/* Input toolbar */}
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              {/* Enhance button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={enhancePrompt}
                disabled={loading || !input.trim()}
                className="h-8 w-8 p-0"
                title="Enhance prompt"
              >
                <SparklesIcon className="w-4 h-4" />
              </Button>
              
              {/* Attachment button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={loading}
                className="h-8 w-8 p-0"
                title="Attach file"
              >
                <PaperclipIcon className="w-4 h-4" />
              </Button>
              
              {/* Voice button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={loading}
                className="h-8 w-8 p-0"
                title="Voice input"
              >
                <MicIcon className="w-4 h-4" />
              </Button>
              
              {/* Send button */}
              <Button
                type="submit"
                size="sm"
                disabled={loading || !input.trim()}
                className="h-8 w-8 p-0"
              >
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Suggestions toggle */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="h-12 px-3"
          >
            💡
          </Button>
        </div>
        
        {/* Character count */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>
            {input.length > 0 && `${input.length} characters`}
          </span>
          <span>
            Press Shift+Enter for new line
          </span>
        </div>
      </form>
    </div>
  );
}