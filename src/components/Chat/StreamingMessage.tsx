"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, RefreshCwIcon } from "lucide-react";
import AIResponse from "@/components/ui/kibo-ui/ai/response";
import { cn } from "@/lib/utils";

interface StreamingMessageProps {
  content: string;
  isUser?: boolean;
  isStreaming?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onFeedback?: (type: "up" | "down") => void;
}

export default function StreamingMessage({
  content,
  isUser = false,
  isStreaming = false,
  onCopy,
  onRegenerate,
  onFeedback,
}: StreamingMessageProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isComplete, setIsComplete] = useState(!isStreaming);

  useEffect(() => {
    // Ensure content is always a string
    const safeContent = content || "";
    
    if (!isStreaming) {
      setDisplayedContent(safeContent);
      setIsComplete(true);
      return;
    }

    setDisplayedContent("");
    setIsComplete(false);
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < safeContent.length) {
        setDisplayedContent(safeContent.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 20); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [content, isStreaming]);

  const handleCopy = () => {
    const safeContent = content || "";
    navigator.clipboard.writeText(safeContent);
    onCopy?.();
  };

  if (isUser) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            You
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 max-w-3xl">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="whitespace-pre-wrap">{content || ""}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 mb-6 group">
      <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
        <AvatarFallback className="bg-muted text-muted-foreground text-sm">
          AI
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 max-w-3xl">
        <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3">
          <AIResponse>
            {displayedContent}
          </AIResponse>
          {isStreaming && !isComplete && (
            <span className="inline-block w-2 h-5 bg-current ml-1 animate-pulse" />
          )}
        </div>
        
        {/* Action buttons */}
        <div className={cn(
          "flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity",
          isComplete && "opacity-100"
        )}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2"
          >
            <CopyIcon className="w-4 h-4" />
          </Button>
          
          {onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              className="h-8 px-2"
            >
              <RefreshCwIcon className="w-4 h-4" />
            </Button>
          )}
          
          {onFeedback && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFeedback("up")}
                className="h-8 px-2"
              >
                <ThumbsUpIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFeedback("down")}
                className="h-8 px-2"
              >
                <ThumbsDownIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}