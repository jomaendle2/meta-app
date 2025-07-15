import { V0Chat } from "@/features/v0chat/types";
import { Alert } from "../ui/alert";
import { Card, CardContent } from "../ui/card";

export default function ChatPreview({ chat }: { chat: V0Chat | null }) {
  if (!chat) return null;
  return (
    <Card className="w-full mt-4">
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>
            <a
              href={chat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              View Chat
            </a>
          </div>
          {chat.demo ? (
            <>
              <div>
                <a
                  href={chat.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-green-600"
                >
                  Preview Demo
                </a>
              </div>
              <iframe
                src={chat.demo}
                width="100%"
                height="600px"
                className="mt-2 border"
              />
            </>
          ) : (
            <Alert variant="default">No demo available for this chat.</Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
