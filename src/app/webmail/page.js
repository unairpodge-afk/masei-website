"use client";

import Link from "next/link";

export default function WebmailHubPage() {
  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "85vh", padding: "60px 20px", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <img src="/logo.png" alt="MASEI Logo" style={{ height: "64px", margin: "0 auto 16px" }} />
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
            Portal Akses & Webmail MASEI
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginTop: "8px" }}>
            Pilih jenis layanan yang ingin Anda akses di bawah ini.
          </p>
        </div>

        {/* Access Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          
          {/* Card 1: Webmail Pengurus */}
          <div style={cardStyle}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>✉️</div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>
              Webmail Pengurus
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6", flex: 1, marginBottom: "24px" }}>
              Akses kotak masuk email resmi organisasi (seperti <code>support@masei.or.id</code>, <code>admin@masei.or.id</code>, dll).
            </p>
            <a
              href="https://www.masei.or.id/webmail"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", textDecoration: "none", textAlign: "center", fontWeight: "600" }}
            >
              🚀 Buka Webmail (Roundcube)
            </a>
          </div>

          {/* Card 2: Portal Anggota */}
          <div style={cardStyle}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🪪</div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>
              Portal Anggota (KTA)
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6", flex: 1, marginBottom: "24px" }}>
              Portal login khusus seluruh anggota terdaftar MASEI untuk cek status verifikasi dan cetak KTA Digital.
            </p>
            <Link
              href="/member-portal"
              className="btn btn-secondary"
              style={{ width: "100%", padding: "12px", textDecoration: "none", textAlign: "center", fontWeight: "600" }}
            >
              🔑 Masuk Portal Anggota
            </Link>
          </div>

          {/* Card 3: Dashboard Admin */}
          <div style={cardStyle}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚙️</div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>
              Admin Panel
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6", flex: 1, marginBottom: "24px" }}>
              Panel khusus administrator untuk menyetujui, menolak, dan memverifikasi berkas pendaftaran anggota baru.
            </p>
            <Link
              href="/admin"
              className="btn btn-outline"
              style={{ width: "100%", padding: "12px", textDecoration: "none", textAlign: "center", fontWeight: "600" }}
            >
              🔒 Masuk Admin Panel
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "32px 24px",
  boxShadow: "var(--shadow-md)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s, box-shadow 0.2s",
  border: "1px solid var(--border-color)"
};
