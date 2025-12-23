"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getAccessToken } from "../../utils/tokenStorage";

let socket: Socket;

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function ChatClient() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    console.log(" My access token:: " + getAccessToken());
    socket = io(`${SOCKET_URL}`, {
      transports: ["websocket"],
      auth: {
        token: getAccessToken(),
      },
    });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("chat:message", (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("chat:history", (data: ChatMessage[]) => {
      setMessages(data);
    });


    return () => {
      socket.disconnect();
    };
  }, []); useEffect(() => {
    console.log("Something")
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("chat:message", { message });
    setMessage("");
  };

  return (
    <div className="flex min-h-100 h-auto flex-col p-4">
      <h1 className="mb-4 text-xl font-bold">Socket.IO Chat</h1>

      <div className="flex-1 overflow-y-auto rounded border p-3">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}</strong>: {msg.message}
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
