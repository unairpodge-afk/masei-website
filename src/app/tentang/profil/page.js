export default function ProfilPage() {
  const departments = [
    { name: "Dewan Pembina", role: "Memberikan arahan strategis dan kepatuhan visi organisasi." },
    { name: "Dewan Pakar", role: "Menelaah dan memvalidasi kajian serta hasil penelitian ilmiah." },
    { name: "Bidang Riset & Publikasi Ilmiah", role: "Mengelola dana hibah riset, penulisan policy brief, dan penerbitan Jurnal Ekonomi Islam." },
    { name: "Bidang Keanggotaan & Pemberdayaan Sarjana", role: "Mengurus registrasi, database anggota, sertifikasi profesi, dan program peningkatan kompetensi." },
    { name: "Bidang Kerja Sama & Hubungan Internasional", role: "Membangun kemitraan strategis dengan institusi keuangan syariah global, kampus, dan regulator." }
  ];

  return (
    <div style={{ paddingBottom: "96px" }}>
      {/* Page Hero Header */}
      <div style={pageHeaderStyle}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <span style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--secondary-light)" }}>Tentang Kami</span>
          <h1 style={{ fontSize: "44px", fontWeight: "800", marginTop: "8px", fontFamily: "var(--font-display)" }}>Profil MASEI</h1>
          <p style={{ fontSize: "16px", marginTop: "12px", opacity: 0.9, maxWidth: "600px" }}>
            Mengenal lebih dekat Majelis Sarjana Ekonomi Islam (MASEI) Indonesia, visi besar kami, dan kepengurusan organisasi.
          </p>
        </div>
        <div style={headerOverlayStyle}></div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ marginTop: "64px" }}>
        
        {/* Profil Section */}
        <section style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div style={{ flex: "2", minWidth: "350px" }}>
              <h2 style={sectionTitleStyle}>Sekilas MASEI</h2>
              <p style={paragraphStyle}>
                Majelis Sarjana Ekonomi Islam (MASEI) adalah organisasi profesi independen nirlaba yang menghimpun 
                para akademisi, peneliti, praktisi, dan alumni sarjana di bidang ekonomi, bisnis, dan keuangan Islam di Indonesia. 
                Didirikan untuk menjadi wadah pemikiran (think tank) strategis yang berkontribusi secara nyata bagi pengembangan 
                teori ilmiah dan penerapan praktis ekonomi syariah.
              </p>
              <p style={paragraphStyle}>
                Seiring dengan visi Indonesia menjadi pusat ekonomi syariah dunia, MASEI hadir untuk menjembatani jurang 
                pemisah antara dunia akademis dan kebutuhan industri keuangan syariah. Melalui kolaborasi riset, penyusunan 
                kebijakan (policy papers), dan sertifikasi kompetensi profesi sarjana, kami bertekad menciptakan SDM unggul 
                yang amanah, kompeten, dan profesional.
              </p>
            </div>
            
            <div style={{ flex: "1", minWidth: "280px", background: "white", padding: "32px", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--primary)", marginBottom: "20px", borderBottom: "2px solid var(--primary-border)", paddingBottom: "8px" }}>Detail Organisasi</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px" }}>
                <li>
                  <strong>Nama Resmi:</strong> <br />
                  <span style={{ color: "var(--text-secondary)" }}>Majelis Sarjana Ekonomi Islam (MASEI)</span>
                </li>
                <li>
                  <strong>Tahun Berdiri:</strong> <br />
                  <span style={{ color: "var(--text-secondary)" }}>2026</span>
                </li>
                <li>
                  <strong>Kategori Anggota:</strong> <br />
                  <span style={{ color: "var(--text-secondary)" }}>Akademisi, Praktisi, Peneliti, Alumni S1/S2/S3 Ekonomi Islam</span>
                </li>
                <li>
                  <strong>Sifat Organisasi:</strong> <br />
                  <span style={{ color: "var(--text-secondary)" }}>Akademik, Profesional, Independen, Non-Partisan</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Visi & Misi Section */}
        <section id="visi-misi" style={{ marginBottom: "80px", scrollMarginTop: "100px" }}>
          <div style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)", color: "white", borderRadius: "24px", padding: "56px", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", gap: "56px", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: "280px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--secondary-light)" }}>Arah Pergerakan</span>
                <h2 style={{ fontSize: "36px", fontWeight: "800", marginTop: "8px", marginBottom: "20px", color: "white", fontFamily: "var(--font-display)" }}>Visi Kami</h2>
                <p style={{ fontSize: "18px", lineHeight: "1.6", fontWeight: "500", opacity: 0.95 }}>
                  "Menjadi organisasi sarjana ekonomi Islam terdepan di tingkat dunia dalam memajukan pemikiran, riset, 
                  dan implementasi sistem ekonomi syariah yang maslahah dan kontributif bagi kemakmuran umat secara berkelanjutan."
                </p>
              </div>

              <div style={{ flex: "1", minWidth: "300px" }}>
                <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "24px", color: "white", fontFamily: "var(--font-display)" }}>Misi Kami</h2>
                <ol style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "20px", fontSize: "15px", lineHeight: "1.6" }}>
                  <li>
                    Menyelenggarakan riset berkala dan perumusan kertas kebijakan (policy papers) dalam memecahkan isu keuangan sosial syariah dan industri halal.
                  </li>
                  <li>
                    Meningkatkan kualitas kurikulum dan program pendidikan tinggi ekonomi syariah agar relevan dengan kebutuhan global dan digital.
                  </li>
                  <li>
                    Mengembangkan ekosistem sertifikasi profesi sarjana ekonomi Islam untuk mempercepat ketersediaan talenta profesional berkualitas.
                  </li>
                  <li>
                    Mendorong kolaborasi lintas sektor antara regulator (Bank Indonesia, OJK, Kemenkeu), universitas, asosiasi industri, dan pelaku UMKM syariah.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Struktur Organisasi Section */}
        <section id="struktur" style={{ scrollMarginTop: "100px" }}>
          <div className="section-header" style={{ marginBottom: "40px" }}>
            <span className="section-badge">Manajemen Organisasi</span>
            <h2 className="section-title">Struktur Organisasi</h2>
            <p className="section-description">
              Struktur fungsional pengurus pusat MASEI dalam mendukung kelancaran program kerja dan penelitian strategis.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {departments.map((dept, idx) => (
              <div key={idx} style={deptCardStyle}>
                <div style={deptNumStyle}>0{idx + 1}</div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px", color: "var(--text-primary)" }}>{dept.name}</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.5" }}>{dept.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// Inline Styles for Profil Page
const pageHeaderStyle = {
  background: "linear-gradient(135deg, var(--primary) 0%, var(--bg-dark) 100%)",
  color: "white",
  padding: "80px 0",
  position: "relative",
  overflow: "hidden"
};

const headerOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle at 80% 20%, rgba(217, 119, 6, 0.15) 0%, rgba(0,0,0,0) 60%)",
  zIndex: 1,
  pointerEvents: "none"
};

const sectionTitleStyle = {
  fontSize: "30px",
  fontWeight: "800",
  marginBottom: "24px",
  position: "relative",
  display: "inline-block"
};

const paragraphStyle = {
  fontSize: "15px",
  color: "var(--text-secondary)",
  lineHeight: "1.8",
  marginBottom: "20px",
  textAlign: "justify"
};

const deptCardStyle = {
  display: "flex",
  gap: "24px",
  background: "white",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  padding: "24px",
  alignItems: "center",
  boxShadow: "var(--shadow-sm)",
  transition: "all 0.3s ease"
};

const deptNumStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "8px",
  backgroundColor: "var(--primary-light)",
  color: "var(--primary)",
  display: "flex",
  alignItems: "center",
  fontSize: "18px",
  fontWeight: "800",
  flexShrink: 0,
  // Fix centering
  justifyContent: "center"
};
