"use client";

import { useState } from "react";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import NewsCard from "@/components/NewsCard";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate API Submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormSubmitted(false);
    }, 5000);
  };

  const newsItems = [
    {
      date: "12 Juli 2026",
      category: "Kegiatan",
      title: "Silaturahmi Nasional (Silaknas) MASEI 2026 Bahas Integrasi Ziswaf",
      desc: "Silaknas tahun ini mempertemukan ratusan sarjana ekonomi Islam di Jakarta guna merumuskan formulasi integrasi zakat, infak, sedekah, dan wakaf dalam pembangunan nasional."
    },
    {
      date: "05 Juli 2026",
      category: "Riset",
      title: "Penerbitan Policy Brief Kurikulum Keuangan Syariah Global",
      desc: "MASEI merilis rekomendasi kebijakan baru mengenai penyelarasan kompetensi lulusan program studi ekonomi syariah agar sesuai dengan kebutuhan pesat industri keuangan syariah global."
    },
    {
      date: "28 Juni 2026",
      category: "Kegiatan",
      title: "MASEI Corner: Peluang FinTech Syariah dalam Pemberdayaan UMKM",
      desc: "Diskusi panel rutin edisi Juni menyoroti bagaimana teknologi finansial syariah dapat menjadi katalisator bagi akselerasi pertumbuhan usaha mikro, kecil, dan menengah."
    }
  ];

  const programs = [
    {
      icon: "🎓",
      title: "Islamic Economic Education Summit (IEES)",
      desc: "Forum tahunan berskala nasional untuk menyelaraskan arah kurikulum pendidikan tinggi Ekonomi Islam dengan kompetensi industri modern."
    },
    {
      icon: "📊",
      title: "MASEI Research Grants & PRIME Conference",
      desc: "Pemberian dana hibah penelitian strategis dan wadah publikasi ilmiah internasional untuk mempercepat inovasi produk ekonomi syariah."
    },
    {
      icon: "💡",
      title: "Kajian Kebijakan Zakat & Wakaf Produktif",
      desc: "Kelompok kerja khusus yang bertugas melakukan analisis regulasi dan formulasi strategi pengelolaan dana sosial keagamaan syariah."
    }
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Program Utama Section */}
      <section className="home-section" style={{ background: "white" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Program Utama</span>
            <h2 className="section-title">Inisiatif MASEI Untuk Bangsa</h2>
            <p className="section-description">
              Merancang dan menjalankan agenda strategis untuk memajukan kajian akademis serta implementasi praktis ekonomi Islam di Indonesia.
            </p>
          </div>

          <div style={programGridStyle}>
            {programs.map((prog, idx) => (
              <div key={idx} style={programCardStyle} className="card-hover-class">
                <div style={programIconStyle}>{prog.icon}</div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>{prog.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita & Artikel Section */}
      <section id="berita" className="home-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Pemberitaan</span>
            <h2 className="section-title">Kabar & Rilis Kegiatan</h2>
            <p className="section-description">
              Ikuti perkembangan terbaru mengenai publikasi riset, kegiatan pengurus pusat, serta siaran pers resmi dari MASEI.
            </p>
          </div>

          <div className="card-grid">
            {newsItems.map((news, idx) => (
              <NewsCard
                key={idx}
                date={news.date}
                category={news.category}
                title={news.title}
                desc={news.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Join Section */}
      <section style={ctaSectionStyle}>
        <div className="container" style={ctaContainerStyle}>
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "16px", fontFamily: "var(--font-display)" }}>
              Gabung Sebagai Anggota MASEI
            </h2>
            <p style={{ fontSize: "16px", opacity: 0.9, lineHeight: "1.6" }}>
              Jadilah bagian dari ikatan sarjana ekonomi Islam terbesar. Berkontribusilah dalam merumuskan kebijakan, 
              melakukan riset mutakhir, serta memperluas jaringan profesional Anda.
            </p>
          </div>
          <div>
            <Link href="/menjadi-anggota" className="btn btn-secondary" style={{ fontSize: "16px", padding: "14px 36px" }}>
              Mulai Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="home-section" style={{ background: "white" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Hubungi Kami</span>
            <h2 className="section-title">Kirimkan Pertanyaan Anda</h2>
            <p className="section-description">
              Punya pertanyaan mengenai keanggotaan, kerja sama riset, atau program MASEI? Kirimkan pesan melalui formulir di bawah ini.
            </p>
          </div>

          <div style={contactWrapperStyle}>
            {/* Info Cards */}
            <div style={contactInfoStyle}>
              <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Sekretariat Pusat MASEI</h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "28px" }}>
                Gedung Dhanapala Lantai 2, Kementerian Keuangan RI, <br />
                Jl. Dr. Wahidin Raya No. 1, Senen, Jakarta Pusat, DKI Jakarta 10710
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={infoRowStyle}>
                  <span style={infoIconStyle}>📞</span>
                  <div>
                    <strong style={{ display: "block", fontSize: "14px" }}>Telepon</strong>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>(021) 384 0059</span>
                  </div>
                </div>
                <div style={infoRowStyle}>
                  <span style={infoIconStyle}>✉️</span>
                  <div>
                    <strong style={{ display: "block", fontSize: "14px" }}>Surel (Email)</strong>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>sekretariat@masei.id</span>
                  </div>
                </div>
                <div style={infoRowStyle}>
                  <span style={infoIconStyle}>💬</span>
                  <div>
                    <strong style={{ display: "block", fontSize: "14px" }}>WhatsApp Center</strong>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>+62 851 6324 0059</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={contactFormContainerStyle}>
              {formSubmitted ? (
                <div style={successMessageStyle}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "var(--primary)" }}>Pesan Berhasil Terkirim!</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                    Terima kasih telah menghubungi kami. Tim Sekretariat MASEI akan segera merespons pesan Anda melalui email yang terdaftar.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={formRowStyle}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label" htmlFor="name">Nama Lengkap</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="form-input" 
                        placeholder="Contoh: Dr. Ahmad Fauzi" 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label" htmlFor="email">Alamat Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="form-input" 
                        placeholder="ahmad@example.com" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subjek</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      className="form-input" 
                      placeholder="Pertanyaan Keanggotaan / Publikasi Jurnal / dst" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Pesan Anda</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      className="form-input" 
                      rows="5" 
                      placeholder="Tuliskan detail pertanyaan atau masukan Anda di sini..." 
                      style={{ resize: "vertical" }}
                      required 
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Custom CSS-in-JS style configurations for complex local layouts
const programGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "32px",
  marginTop: "16px"
};

const programCardStyle = {
  background: "var(--bg-secondary)",
  border: "1px solid var(--border-color)",
  borderRadius: "16px",
  padding: "36px",
  transition: "all 0.3s ease",
  cursor: "default"
};

const programIconStyle = {
  fontSize: "44px",
  marginBottom: "24px",
  display: "inline-block"
};

const ctaSectionStyle = {
  background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
  color: "white",
  padding: "64px 0"
};

const ctaContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "32px"
};

const contactWrapperStyle = {
  display: "flex",
  gap: "48px",
  flexWrap: "wrap",
  marginTop: "16px"
};

const contactInfoStyle = {
  flex: 1,
  minWidth: "300px",
  background: "var(--bg-secondary)",
  borderRadius: "16px",
  padding: "40px",
  border: "1px solid var(--border-color)"
};

const contactFormContainerStyle = {
  flex: 2,
  minWidth: "350px"
};

const infoRowStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center"
};

const infoIconStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  backgroundColor: "white",
  border: "1px solid var(--border-color)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "var(--shadow-sm)"
};

const formRowStyle = {
  display: "flex",
  gap: "24px",
  flexWrap: "wrap"
};

const successMessageStyle = {
  backgroundColor: "var(--primary-light)",
  border: "2px dashed var(--primary)",
  borderRadius: "16px",
  padding: "48px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  boxShadow: "var(--shadow-sm)"
};
