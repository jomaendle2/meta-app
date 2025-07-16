# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code style and catch errors

## Project Architecture

This is a Next.js 15 application with App Router that implements a v0 chat interface for generating React components. The application uses TypeScript, Tailwind CSS, and integrates with the v0-sdk.

### Key Architecture Components

**Frontend Structure:**
- `src/app/` - Next.js App Router pages (layout.tsx, page.tsx, globals.css)
- `src/components/` - React components organized by feature
  - `Chat/` - Main chat interface components (Chat.tsx, ChatInput.tsx, ChatMessages.tsx, ChatPreview.tsx)
  - `ui/` - Reusable UI components using Radix UI and shadcn/ui patterns
- `src/features/v0chat/` - Business logic for v0 chat functionality
  - `api.ts` - v0-sdk integration and API calls
  - `useV0Chat.ts` - React hook for chat state management
  - `types.ts` - TypeScript type definitions

**Backend Structure:**
- `src/pages/api/` - Next.js API routes (Pages Router for API)
  - `v0chat.ts` - Creates new v0 chats
  - `v0chats.ts` - Retrieves existing chats

### Key Dependencies

- **v0-sdk** - Core integration with v0 for React component generation
- **kibo-ui** - UI component library for AI interfaces
- **jotai** - State management (imported but usage not clear from initial analysis)
- **Radix UI** - Headless UI components for accessibility
- **Tailwind CSS** - Utility-first CSS framework
- **Shiki** - Code syntax highlighting

### Data Flow

1. User interacts with `Chat.tsx` component
2. `useV0Chat.ts` hook manages state and API calls
3. Messages sent to `/api/v0chat` endpoint
4. API calls `createV0Chat()` from `features/v0chat/api.ts`
5. v0-sdk creates chat and returns response
6. Response flows back through hook to update UI

### UI Component Patterns

The codebase follows shadcn/ui patterns with:
- Radix UI primitives for accessibility
- Tailwind for styling
- Component variants using class-variance-authority
- Consistent component structure in `src/components/ui/`

### Chat Interface Features

- Sidebar with previous chats list
- Main chat area with message history
- Input field for new messages
- Live preview of generated components
- Error handling and loading states