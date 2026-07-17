"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function MemberPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberId = searchParams.get("memberId");

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!memberId) {
      setError("ID Anggota tidak ditemukan di URL. Silakan registrasi terlebih dahulu.");
      setLoading(false);
      return;
    }

    const fetchMemberData = async () => {
      try {
        const response = await fetch(`/api/members/list?memberId=${memberId}`);
        const data = await response.json();

        if (response.ok) {
          setMember(data.member);
        } else {
          setError(data.message || "Gagal memuat profil anggota.");
        }
      } catch (err) {
        setError("Terjadi kesalahan jaringan.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [memberId]);

  const handleLogout = () => {
    router.push("/menjadi-anggota");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: "16px" }}>
        <div style={spinnerStyle}></div>
        <p style={{ color: "var(--text-secondary)", fontWeight: "500" }}>Memproses Data Anggota...</p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="container" style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center" }}>
        <div style={{ fontSize: "54px", marginBottom: "20px" }}>⚠️</div>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#b91c1c", marginBottom: "16px" }}>
          Akses Portal Ditolak
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "32px" }}>
          {error || "Kami tidak dapat memuat data anggota untuk sesi ini."}
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/menjadi-anggota" className="btn btn-primary">
            Daftar Anggota Baru
          </Link>
          <Link href="/" className="btn btn-outline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-container">
      {/* Sidebar Navigation */}
      <aside className="portal-sidebar">
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={avatarPlaceholderStyle}>{member.fullName.charAt(0)}</div>
          <h4 style={{ fontSize: "16px", fontWeight: "700", marginTop: "12px", color: "var(--text-primary)" }}>
            {member.fullName.split(",")[0]}
          </h4>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Anggota Aktif</span>
        </div>

        <ul className="portal-nav">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`portal-nav-link ${activeTab === "dashboard" ? "active" : ""}`}
              style={{ width: "100%", textAlign: "left" }}
            >
              📊 Dasbor Utama
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("profile")}
              className={`portal-nav-link ${activeTab === "profile" ? "active" : ""}`}
              style={{ width: "100%", textAlign: "left" }}
            >
              👤 Profil Lengkap
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="portal-nav-link"
              style={{ width: "100%", textAlign: "left", color: "#b91c1c" }}
            >
              🚪 Keluar Sesi
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Panel Content */}
      <main className="portal-main">
        {activeTab === "dashboard" && (
          <div>
            <div style={congratsCardStyle}>
              <h2 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "8px" }}>Selamat Bergabung! 🎉</h2>
              <p style={{ opacity: 0.9, fontSize: "14px", lineHeight: "1.6" }}>
                Pendaftaran Anda di **Majelis Sarjana Ekonomi Islam (MASEI)** telah terverifikasi secara otomatis. 
                Kartu Tanda Anggota (KTA) digital Anda kini telah aktif dan siap digunakan.
              </p>
            </div>

            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "flex-start" }}>
              {/* KTA Digital */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "var(--text-secondary)" }}>
                  Kartu Anggota Digital (KTA)
                </h3>
                
                {/* Physical Card Mock */}
                <div className="member-card-preview">
                  <div className="member-card-pattern" style={cardPatternOverlay}></div>
                  <div className="member-card-header">
                    <div>
                      <span className="member-card-logo">MASEI</span>
                      <div style={{ fontSize: "7px", letterSpacing: "0.2px", opacity: 0.8, textTransform: "uppercase" }}>
                        Majelis Sarjana Ekonomi Islam
                      </div>
                    </div>
                    <span className="member-card-status">Member</span>
                  </div>
                  <div style={{ marginBottom: "32px" }}>
                    <div className="member-card-name">{member.fullName}</div>
                    <div className="member-card-id">{member.memberId}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div className="member-card-title">Afiliasi Akademis</div>
                      <div style={{ fontSize: "12px", fontWeight: "500" }}>{member.university}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="member-card-title">Bergabung</div>
                      <div style={{ fontSize: "12px", fontWeight: "500" }}>
                        {new Date(member.joinedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => window.print()} 
                  className="btn btn-outline" 
                  style={{ display: "flex", gap: "8px", fontSize: "13px", padding: "10px 20px" }}
                >
                  🖨️ Cetak / Simpan PDF
                </button>
              </div>

              {/* Quick Info Grid */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "var(--text-secondary)" }}>
                  Ringkasan Akun
                </h3>
                <div style={infoGridWrapperStyle}>
                  <div style={infoCardStyle}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Gelar Akademis</span>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)", marginTop: "4px" }}>{member.education} - {member.major}</div>
                  </div>
                  <div style={infoCardStyle}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Profesi</span>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)", marginTop: "4px" }}>{member.occupation}</div>
                  </div>
                  <div style={infoCardStyle}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Lembaga / Instansi</span>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--primary)", marginTop: "4px" }}>{member.company}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "32px", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
              Profil Anggota Lengkap
            </h2>
            
            <div style={profileSectionGrid}>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Nama Lengkap & Gelar</span>
                <span style={profileValueStyle}>{member.fullName}</span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Nomor Anggota (ID)</span>
                <span style={profileValueStyle}>{member.memberId}</span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>NIK KTP (Disamarkan)</span>
                <span style={profileValueStyle}>
                  {member.nik.substring(0, 4) + "********" + member.nik.substring(12)}
                </span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Tempat, Tanggal Lahir</span>
                <span style={profileValueStyle}>
                  {member.birthPlace}, {new Date(member.birthDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Jenis Kelamin</span>
                <span style={profileValueStyle}>{member.gender}</span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Alamat Email</span>
                <span style={profileValueStyle}>{member.email}</span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>No. HP (WhatsApp)</span>
                <span style={profileValueStyle}>{member.phone}</span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Pendidikan Terakhir</span>
                <span style={profileValueStyle}>{member.education} ({member.major})</span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Institusi Pendidikan</span>
                <span style={profileValueStyle}>{member.university} (Lulus {member.graduationYear})</span>
              </div>
              <div style={profileItemStyle}>
                <span style={profileLabelStyle}>Pekerjaan & Jabatan</span>
                <span style={profileValueStyle}>{member.position} di {member.company}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MemberPortal() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: "16px" }}>
        <div style={spinnerStyle}></div>
        <p style={{ color: "var(--text-secondary)", fontWeight: "500" }}>Memuat Portal Anggota...</p>
      </div>
    }>
      <MemberPortalContent />
    </Suspense>
  );
}

// Inline Styles for Dashboard Portal
const spinnerStyle = {
  width: "48px",
  height: "48px",
  border: "4px solid var(--primary-border)",
  borderTop: "4px solid var(--primary)",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};

const avatarPlaceholderStyle = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  backgroundColor: "var(--primary-light)",
  color: "var(--primary)",
  fontSize: "32px",
  fontWeight: "800",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto"
};

const congratsCardStyle = {
  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  color: "white",
  borderRadius: "16px",
  padding: "24px 32px",
  marginBottom: "40px",
  boxShadow: "var(--shadow-md)"
};

const cardPatternOverlay = {
  backgroundImage: "radial-gradient(circle at 100% 150%, rgba(255, 255, 255, 0.15) 24%, transparent 24%), radial-gradient(circle at 0% 150%, rgba(255, 255, 255, 0.15) 24%, transparent 24%)",
  backgroundSize: "20px 20px"
};

const infoGridWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px"
};

const infoCardStyle = {
  background: "white",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "var(--shadow-sm)"
};

const profileSectionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
  background: "white",
  border: "1px solid var(--border-color)",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "var(--shadow-sm)"
};

const profileItemStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  borderBottom: "1px solid var(--bg-secondary)",
  paddingBottom: "12px"
};

const profileLabelStyle = {
  fontSize: "12px",
  color: "var(--text-muted)",
  fontWeight: "600",
  textTransform: "uppercase"
};

const profileValueStyle = {
  fontSize: "15px",
  fontWeight: "700",
  color: "var(--text-primary)"
};
