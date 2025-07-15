export type V0ChatMessage = {
  id: string;
  object: "message";
  content: string;
  createdAt: string;
  type: string;
};

export type V0Chat = {
  id: string;
  object: "chat";
  url: string;
  demo?: string;
  shareable: boolean;
  privacy?: string;
  title?: string;
  updatedAt?: string;
  favorite: boolean;
  authorId: string;
  latestVersion?: {
    id: string;
    status: string;
  };
  messages: V0ChatMessage[];
};

export interface V0ChatResponse {
  chat: V0Chat;
}
