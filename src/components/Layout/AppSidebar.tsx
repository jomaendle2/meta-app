"use client";

import { Button } from "@/components/ui/button";
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AppSidebarProps {
  chats: V0Chat[];
  currentChat: V0Chat | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  loading: boolean;
}

export default function AppSidebar({ 
  chats, 
  currentChat, 
  onSelectChat, 
  onNewChat, 
  loading 
}: AppSidebarProps) {
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
    <Sidebar>
      <SidebarHeader>
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
        
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <SidebarInput
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>
            Quick Start
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onNewChat}>
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>New Component</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FolderIcon className="w-4 h-4" />
                  <span>Templates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Starred Chats */}
        {starredChats.length > 0 && (
          <SidebarGroup>
            <Collapsible open={isStarredExpanded} onOpenChange={setIsStarredExpanded}>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    {isStarredExpanded ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    )}
                    <StarIcon className="w-4 h-4" />
                    <span>Starred</span>
                  </div>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {starredChats.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton
                          onClick={() => onSelectChat(chat.id)}
                          isActive={currentChat?.id === chat.id}
                          disabled={loading}
                        >
                          <MessageCircleIcon className="w-4 h-4" />
                          <span className="truncate">{chat.title || chat.id.slice(0, 8)}</span>
                          {chat.favorite && (
                            <StarIcon className="w-3 h-3 ml-auto" />
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* Recent Chats */}
        <SidebarGroup>
          <Collapsible open={isRecentExpanded} onOpenChange={setIsRecentExpanded}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-2">
                  {isRecentExpanded ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
                  <ClockIcon className="w-4 h-4" />
                  <span>Recent</span>
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentChats.length === 0 ? (
                    <div className="px-2 py-4 text-xs text-muted-foreground">
                      No recent chats
                    </div>
                  ) : (
                    recentChats.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton
                          onClick={() => onSelectChat(chat.id)}
                          isActive={currentChat?.id === chat.id}
                          disabled={loading}
                        >
                          <MessageCircleIcon className="w-4 h-4" />
                          <span className="truncate">{chat.title || chat.id.slice(0, 8)}</span>
                          {chat.favorite && (
                            <StarIcon className="w-3 h-3 ml-auto" />
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
