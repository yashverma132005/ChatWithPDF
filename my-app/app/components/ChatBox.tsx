"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    // Save the current question before clearing the input
    const currentQuestion = question;

    const userMessage: Message = {
      role: "user",
      text: currentQuestion,
    };

    // Show the user's message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Clear the input immediately
    setQuestion("");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        role: "assistant",
        text: data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-8 space-y-5">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-zinc-500">
            Ask anything about your PDF
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-3 whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-black text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl bg-black px-5 py-3 text-white">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}

      <div className="border-t p-6">
        <div className="flex gap-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                askQuestion();
              }
            }}
            placeholder="Ask something..."
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="rounded-xl bg-black px-5 text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}