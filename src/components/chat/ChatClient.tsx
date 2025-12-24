"use client";
import { io, Socket } from "socket.io-client";
import { getAccessToken } from "../../utils/tokenStorage";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: number;
  roomId: number;
  user: string;
  message: string;
  timestamp: string;
  role?: string;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function ChatClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeRoomId, setActiveRoomId] = useState(1);
  const socketRef = useRef<Socket | null>(null);
  const [chatError, setChatError] = useState<string | null>(null);
  const [hasRoomAccess, setHasRoomAccess] = useState(true);


  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketRef.current;
    if (!socket || !socket.connected || !message.trim()) return;

    socket.emit("chat:message", {
      roomId: activeRoomId,
      message,
    });

    setMessage("");
  };

  // Socket setup
  useEffect(() => {
    const token = getAccessToken();

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      setConnectionError(null);
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    socket.on("chat:message", (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("chat:history", ({ roomId, messages }) => {
      if (roomId === activeRoomId) {
        setMessages(messages);
        setChatError(null);
        setHasRoomAccess(true);
      }
    });

    socket.io.on("reconnect_error", () => {
      setConnectionError("Reconnecting...");
    });

    socket.io.on("reconnect_failed", () => {
      setConnectionError("Unable to reconnect");
    });

    socket.on("chat:error", ({ message }) => {
      setChatError(message);
      setHasRoomAccess(false);
    });


    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [activeRoomId]);


  // Online / offline handling
  useEffect(() => {
    const handleOnline = () => {
      socketRef.current?.connect();
      setIsConnected(true);
    };

    const handleOffline = () => {
      setIsConnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Room join (clear & explicit)
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) return;

    socket.emit("chat:join", { roomId: activeRoomId });
  }, [activeRoomId, isConnected]);

  // Scroll automatically on messages handler
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex min-h-100 h-auto max-h-100 flex-col p-4">
      <h1 className="mb-4 text-xl font-bold">Socket.IO Chat</h1>
      <div className="mb-4 text-sm">
        Status:{" "}
        <span className={isConnected ? "text-green-600" : "text-red-600"}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
        {connectionError && (
          <span className="ml-2 text-yellow-600">{connectionError}</span>
        )}
        {chatError && (
          <span className="ml-3 text-red-600 font-medium">
            {chatError}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto rounded border p-3">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}</strong>: {msg.message}
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>

            <div className="text-xs text-gray-500">
              {msg.role}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!hasRoomAccess}
          placeholder={
            hasRoomAccess
              ? "Type a message..."
              : "You do not have access to this room"
          }
          className="flex-1 rounded border px-3 py-2 disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={!hasRoomAccess}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>

      </form>
    </div>
  );
}
