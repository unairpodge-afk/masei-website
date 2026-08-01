"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auto login if token exists in session storage
  useEffect(() => {
    const savedToken = sessionStorage.getItem("masei_admin_token");
    if (savedToken) {
      fetchMembers(savedToken);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) return;
    fetchMembers(password);
  };

  const fetchMembers = async (token) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/members", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setIsLoggedIn(true);
        setMembers(data.members || []);
        sessionStorage.setItem("masei_admin_token", token);
      } else {
        setError(data.message || "Kata sandi salah.");
        setIsLoggedIn(false);
        sessionStorage.removeItem("masei_admin_token");
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("masei_admin_token");
    setIsLoggedIn(false);
    setPassword("");
    setMembers([]);
  };

  const handleVerifyMember = async (memberId, status) => {
    const savedToken = sessionStorage.getItem("masei_admin_token") || password;
    try {
      const response = await fetch("/api/admin/members/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`
        },
        body: JSON.stringify({ memberId, status })
      });
      const data = await response.json();
      if (response.ok) {
        setMembers((prev) =>
          prev.map((m) => (m.memberId === memberId ? { ...m, status } : m))
        );
      } else {
        alert(data.message || "Gagal memperbarui status verifikasi.");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "var(--shadow-lg)", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div style={{ marginBottom: "24px" }}>
            <img src="/logo.png" alt="MASEI Logo" style={{ height: "64px", margin: "0 auto" }} />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "var(--primary)" }}>Admin Panel</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
            Silakan masukkan kata sandi admin untuk mengakses data.
          </p>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input 
              type="password" 
              placeholder="Kata Sandi Admin" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", width: "100%" }}
              required
            />
            {error && <div style={{ color: "red", fontSize: "13px", textAlign: "left" }}>{error}</div>}
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: "12px", width: "100%", fontWeight: "600" }}
              disabled={loading}
            >
              {loading ? "Memeriksa..." : "Masuk"}
            </button>
          </form>
          <div style={{ marginTop: "24px" }}>
            <Link href="/" style={{ fontSize: "13px", color: "var(--primary)", textDecoration: "none" }}>← Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-secondary)", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", background: "white", borderRadius: "12px", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        
        {/* Header Admin */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--primary-light)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img src="/logo.png" alt="MASEI Logo" style={{ height: "40px" }} />
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: "var(--primary)", margin: 0 }}>Dashboard Admin MASEI</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "8px 16px", fontSize: "13px", background: "white" }}>
            Keluar (Logout)
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "32px 24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "var(--text-primary)" }}>
            Daftar Anggota Terdaftar ({members.length})
          </h2>
          
          <div style={{ overflowX: "auto", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13.5px" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "2px solid var(--border-color)" }}>
                  <th style={thStyle}>ID Anggota</th>
                  <th style={thStyle}>Nama Lengkap</th>
                  <th style={thStyle}>NIK KTP</th>
                  <th style={thStyle}>Kontak (Email / WA)</th>
                  <th style={thStyle}>Pendidikan</th>
                  <th style={thStyle}>Dokumen</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Tanggal Daftar</th>
                  <th style={thStyle}>Aksi Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
                      Belum ada anggota yang mendaftar.
                    </td>
                  </tr>
                ) : (
                  members.map((m, idx) => {
                    const currentStatus = m.status || "APPROVED"; // fallback to APPROVED for old data
                    return (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={tdStyle}><span style={{ fontFamily: "monospace", fontWeight: "600", color: "var(--primary)" }}>{m.memberId}</span></td>
                        <td style={tdStyle}><strong>{m.fullName}</strong></td>
                        <td style={tdStyle}><span style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>{m.nik}</span></td>
                        <td style={tdStyle}>
                          <div style={{ marginBottom: "4px" }}>✉️ {m.email}</div>
                          <div>📞 {m.phone}</div>
                        </td>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: "600" }}>{m.education} - {m.major}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{m.university} ({m.graduationYear})</div>
                        </td>
                        <td style={tdStyle}>
                          {m.certificateFileName ? (
                            <div style={{ fontSize: "12px", background: "var(--bg-secondary)", padding: "4px 8px", borderRadius: "4px", display: "inline-block", wordBreak: "break-all" }}>
                              📄 {m.certificateFileName}
                            </div>
                          ) : (
                            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>-</span>
                          )}
                        </td>
                        <td style={tdStyle}>
                          {currentStatus === "PENDING" && (
                            <span style={{ backgroundColor: "#fef3c7", color: "#d97706", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                              ⏳ Pending
                            </span>
                          )}
                          {currentStatus === "APPROVED" && (
                            <span style={{ backgroundColor: "#d1fae5", color: "#059669", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                              ✅ Disetujui
                            </span>
                          )}
                          {currentStatus === "REJECTED" && (
                            <span style={{ backgroundColor: "#fee2e2", color: "#dc2626", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                              ❌ Ditolak
                            </span>
                          )}
                        </td>
                        <td style={tdStyle}>{new Date(m.joinedAt).toLocaleDateString("id-ID")}</td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: "6px" }}>
                            {currentStatus !== "APPROVED" && (
                              <button
                                onClick={() => handleVerifyMember(m.memberId, "APPROVED")}
                                style={{ backgroundColor: "#059669", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                              >
                                Setujui
                              </button>
                            )}
                            {currentStatus !== "REJECTED" && (
                              <button
                                onClick={() => handleVerifyMember(m.memberId, "REJECTED")}
                                style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                              >
                                Tolak
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

const thStyle = {
  padding: "16px",
  fontWeight: "600",
  color: "var(--text-primary)"
};

const tdStyle = {
  padding: "16px",
  color: "var(--text-secondary)",
  verticalAlign: "top"
};
