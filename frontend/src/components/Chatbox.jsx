import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";
import Message from "./Message";

const SUGGESTIONS = [
  "Tell me about SSN College",
  "VIT Vellore fees & placements",
  "Best engineering colleges in Chennai",
  "SRM cutoff for CSE 2024",
  "Compare IIT vs NIT",
  "Hostel facilities at PSG Tech",
];

function formatTime(date) {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const query = (text || input).trim();
    if (!query) return;

    const userMsg = { role: "user", text: query, time: formatTime(new Date()) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    inputRef.current?.focus();

    try {
      const reply = await sendMessage(query);
      const botMsg = { role: "bot", text: reply, time: formatTime(new Date()) };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Sorry, I couldn't connect to the server. Please check your connection and try again.",
          time: formatTime(new Date()),
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Chat window */}
      <div className="chat-window">
        {messages.length === 0 && !loading ? (
          <div className="welcome-screen">
            <div className="welcome-icon">🎓</div>
            <h2>How can I help you today?</h2>
            <p>
              Ask me anything about colleges, admissions, fees, cutoffs, placements,
              and more — I'm here to guide you!
            </p>
            <div className="suggestion-chips">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="chip"
                  onClick={() => handleSend(s)}
                  id={`chip-${s.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`message-wrapper ${msg.role}`}
            >
              <div className="message-row">
                <div className={`avatar ${msg.role}`}>
                  {msg.role === "bot" ? "🤖" : "👤"}
                </div>
                <Message role={msg.role} text={msg.text} />
              </div>
              <span className="message-meta">{msg.time}</span>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {loading && (
          <div className="typing-indicator">
            <div className="avatar bot">🤖</div>
            <div className="typing-bubble">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="input-area">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about any college, course, fees, cutoff…"
            disabled={loading}
            autoComplete="off"
          />
        </div>
        <button
          id="send-button"
          className="send-btn"
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
