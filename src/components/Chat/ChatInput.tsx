"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ChatInput({
  onSend,
  loading,
}: {
  onSend: (msg: string) => void;
  loading: boolean;
}) {
  const [input, setInput] = useState("");
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
          onSend(input);
          setInput("");
        }
      }}
      className="flex gap-2 w-full"
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe the React component you want..."
        disabled={loading}
      />
      <Button type="submit" disabled={loading || !input.trim()}>
        {loading ? "..." : "Send"}
      </Button>
    </form>
  );
}
