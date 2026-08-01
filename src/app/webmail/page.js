"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebmailPortalPage() {
  const [activeTab, setActiveTab] = useState("zoho");

  return (
    <div style={containerStyle}>
      <div style={loginCardStyle}>
        
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img src="/logo.png" alt="MASEI Logo" style={{ height: "48px", margin: "0 auto 12px" }} />
          <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>Webmail MASEI</h1>
          <p style={{ fontSize: "12.5px", color: "#64748b", marginTop: "4px" }}>
            Pilih server layanan email resmi organisasi Anda
          </p>
        </div>

        {/* Server Switcher Tabs */}
        <div style={tabContainerStyle}>
          <button
            onClick={() => setActiveTab("zoho")}
            style={{
              ...tabBtnStyle,
              backgroundColor: activeTab === "zoho" ? "#0284c7" : "transparent",
              color: activeTab === "zoho" ? "white" : "#64748b"
            }}
          >
            ✉️ Zoho Mail
          </button>
          <button
            onClick={() => setActiveTab("roundcube")}
            style={{
              ...tabBtnStyle,
              backgroundColor: activeTab === "roundcube" ? "#0284c7" : "transparent",
              color: activeTab === "roundcube" ? "white" : "#64748b"
            }}
          >
            📦 Roundcube (cPanel)
          </button>
        </div>

        {/* TAB 1: ZOHO MAIL LOGIN */}
        {activeTab === "zoho" && (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🌐</div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>
              Zoho Webmail Login
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5", marginBottom: "20px" }}>
              Masuk ke kotak pesan email resmi organisasi (seperti <code>support@masei.or.id</code>) melalui server resmi Zoho Mail.
            </p>
            <a
              href="https://mail.zoho.com"
              target="_blank"
              rel="noopener noreferrer"
              style={actionBtnStyle}
            >
              🚀 Buka Webmail Zoho (mail.zoho.com)
            </a>
          </div>
        )}

        {/* TAB 2: ROUNDCUBE CPANEL LOGIN */}
        {activeTab === "roundcube" && (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>
              Roundcube cPanel Webmail
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5", marginBottom: "20px" }}>
              Masuk ke server Webmail Roundcube cPanel hosting melalui Port 2096.
            </p>
            <a
              href="https://masei.or.id:2096"
              target="_blank"
              rel="noopener noreferrer"
              style={actionBtnStyle}
            >
              🚀 Buka Roundcube Webmail (Port 2096)
            </a>
          </div>
        )}

        {/* Footer Link */}
        <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
          <Link href="/" style={{ fontSize: "12.5px", color: "#0284c7", textDecoration: "none", fontWeight: "600" }}>
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
  borderRadius: "12px",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
  border: "1px solid #e2e8f0",
  padding: "36px 28px",
  width: "100%",
  maxWidth: "420px"
};

const tabContainerStyle = {
  display: "flex",
  backgroundColor: "#f1f5f9",
  borderRadius: "8px",
  padding: "4px",
  marginBottom: "20px"
};

const tabBtnStyle = {
  flex: 1,
  padding: "8px 12px",
  fontSize: "13px",
  fontWeight: "600",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s"
};

const actionBtnStyle = {
  display: "block",
  backgroundColor: "#0284c7",
  color: "#ffffff",
  padding: "12px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center"
};
