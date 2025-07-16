"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { V0Chat } from "@/features/v0chat/types";
import { 
  SearchIcon, 
  MessageCircleIcon, 
  ClockIcon, 
  StarIcon,
  FolderIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  chats: V0Chat[];
  currentChat: V0Chat | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  loading: boolean;
}

export default function Sidebar({ 
  chats, 
  currentChat, 
  onSelectChat, 
  onNewChat, 
  loading 
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecentExpanded, setIsRecentExpanded] = useState(true);
  const [isStarredExpanded, setIsStarredExpanded] = useState(true);

  const filteredChats = chats.filter(chat => 
    chat.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentChats = filteredChats.slice(0, 10);
  const starredChats = filteredChats.filter(chat => chat.favorite);

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Button
            onClick={onNewChat}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <MessageCircleIcon className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 py-2">
          {/* Quick Actions */}
          <div className="px-2 py-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Quick Start
            </p>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-2"
                onClick={onNewChat}
              >
                <MessageCircleIcon className="w-4 h-4 mr-2" />
                New Component
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-2"
              >
                <FolderIcon className="w-4 h-4 mr-2" />
                Templates
              </Button>
            </div>
          </div>

          {/* Starred Chats */}
          {starredChats.length > 0 && (
            <div className="px-2 py-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-6 px-0 mb-1"
                onClick={() => setIsStarredExpanded(!isStarredExpanded)}
              >
                {isStarredExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 mr-1" />
                )}
                <StarIcon className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium text-muted-foreground">
                  Starred
                </span>
              </Button>
              {isStarredExpanded && (
                <div className="space-y-1 ml-2">
                  {starredChats.map((chat) => (
                    <ChatItem
                      key={chat.id}
                      chat={chat}
                      isActive={currentChat?.id === chat.id}
                      onSelect={onSelectChat}
                      loading={loading}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recent Chats */}
          <div className="px-2 py-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start h-6 px-0 mb-1"
              onClick={() => setIsRecentExpanded(!isRecentExpanded)}
            >
              {isRecentExpanded ? (
                <ChevronDownIcon className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 mr-1" />
              )}
              <ClockIcon className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium text-muted-foreground">
                Recent
              </span>
            </Button>
            {isRecentExpanded && (
              <div className="space-y-1 ml-2">
                {recentChats.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-2 py-2">
                    No recent chats
                  </p>
                ) : (
                  recentChats.map((chat) => (
                    <ChatItem
                      key={chat.id}
                      chat={chat}
                      isActive={currentChat?.id === chat.id}
                      onSelect={onSelectChat}
                      loading={loading}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

interface ChatItemProps {
  chat: V0Chat;
  isActive: boolean;
  onSelect: (chatId: string) => void;
  loading: boolean;
}

function ChatItem({ chat, isActive, onSelect, loading }: ChatItemProps) {
  const displayTitle = chat.title || chat.id.slice(0, 8);
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "w-full justify-start h-8 px-2 truncate",
        isActive && "bg-accent text-accent-foreground"
      )}
      onClick={() => onSelect(chat.id)}
      disabled={loading}
    >
      <MessageCircleIcon className="w-3 h-3 mr-2 flex-shrink-0" />
      <span className="truncate text-left">{displayTitle}</span>
      {chat.favorite && (
        <StarIcon className="w-3 h-3 ml-auto flex-shrink-0" />
      )}
    </Button>
  );
}