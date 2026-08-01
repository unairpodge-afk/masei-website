"use client";

import { useState } from "react";
import Link from "next/link";

export default function RoundcubeWebmailPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={containerStyle}>
      <div style={loginCardStyle}>
        
        {/* Roundcube Logo Sphere Icon */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
            <path d="M50 15L80 32V68L50 85L20 68V32L50 15Z" fill="#38BDF8" />
            <path d="M50 15L80 32L50 49L20 32L50 15Z" fill="#7DD3FC" />
            <path d="M50 49V85L20 68V32L50 49Z" fill="#0284C7" />
            <circle cx="50" cy="28" r="14" fill="#E2E8F0" />
          </svg>
        </div>

        {/* Login Form redirecting directly to cPanel Roundcube Port 2096 */}
        <form action="https://216.198.79.1:2096/login/" method="POST" target="_blank" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input type="hidden" name="goto_uri" value="/" />
          
          {/* Username Field */}
          <div style={inputWrapperStyle}>
            <span style={iconStyle}>👤</span>
            <input
              type="text"
              name="user"
              placeholder="Username (e.g. support@masei.or.id)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputFieldStyle}
              required
            />
          </div>

          {/* Password Field */}
          <div style={inputWrapperStyle}>
            <span style={iconStyle}>🔒</span>
            <input
              type="password"
              name="pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputFieldStyle}
              required
            />
          </div>

          {/* LOGIN Button matching exact Roundcube style */}
          <button type="submit" style={loginBtnStyle}>
            LOGIN
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>Roundcube Webmail</span>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
          <Link href="/" style={{ fontSize: "12px", color: "#0284c7", textDecoration: "none" }}>
            ← Kembali ke Beranda MASEI
          </Link>
        </div>

      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8fafc",
  padding: "20px"
};

const loginCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
  border: "1px solid #e2e8f0",
  padding: "40px 32px",
  width: "100%",
  maxWidth: "380px"
};

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: "4px",
  overflow: "hidden"
};

const iconStyle = {
  padding: "10px 12px",
  backgroundColor: "#f1f5f9",
  borderRight: "1px solid #cbd5e1",
  fontSize: "14px",
  color: "#64748b"
};

const inputFieldStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  padding: "10px 12px",
  fontSize: "14px",
  color: "#1e293b",
  backgroundColor: "transparent"
};

const loginBtnStyle = {
  backgroundColor: "#38bdf8",
  color: "#ffffff",
  border: "none",
  borderRadius: "4px",
  padding: "12px",
  fontSize: "15px",
  fontWeight: "700",
  letterSpacing: "0.5px",
  cursor: "pointer",
  marginTop: "6px",
  transition: "background-color 0.2s"
};
