"use client";

import { useState, useRef, useEffect } from "react";

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Assalamu'alaikum! Selamat datang di MASEI AI Assistant. Ada yang bisa saya bantu terkait keanggotaan MASEI, panduan jurnal OJS, atau perhitungan zakat?",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: "user",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply || "Maaf, saya tidak dapat memahami respons tersebut.",
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          provider: data.provider // Track which LLM answered (e.g. Groq, OpenAI, Gemini)
        }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Maaf, server sedang mengalami kendala koneksi atau limit API. Silakan coba beberapa saat lagi.",
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`chatbot-toggle-btn ${isOpen ? "active" : ""}`}
        aria-label="Toggle AI Chatbot"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="chatbot-avatar">🤖</div>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "700", margin: 0, color: "white" }}>
                  MASEI AI Assistant
                </h4>
                <span style={{ fontSize: "10px", color: "#a7f3d0", fontWeight: "600", display: "block" }}>
                  ● Online • Multi-LLM Active
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-bubble-container ${msg.sender === "user" ? "user" : "ai"}`}
              >
                <div className={`chat-bubble ${msg.sender === "user" ? "user" : "ai"}`}>
                  <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.5" }}>{msg.text}</p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", gap: "10px" }}>
                    {msg.provider && (
                      <span style={{ fontSize: "8px", opacity: 0.6, fontStyle: "italic" }}>
                        via {msg.provider}
                      </span>
                    )}
                    <span style={{ fontSize: "8px", opacity: 0.6, marginLeft: "auto" }}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-container ai">
                <div className="chat-bubble ai typing-indicator-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form onSubmit={handleSendMessage} className="chatbot-footer">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanyakan sesuatu..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send-btn">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
