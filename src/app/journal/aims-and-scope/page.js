import Link from "next/link";

export default function AimsAndScopePage() {
  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "white", borderRadius: "12px", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        
        <div style={{ backgroundColor: "var(--primary-light)", padding: "32px", borderBottom: "1px solid var(--primary-border)" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--primary)", margin: "0 0 8px 0" }}>Aims and Scope</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: 0 }}>
            Cakupan Tema dan Ruang Lingkup Publikasi Jurnal MASEI
          </p>
        </div>

        <div style={{ padding: "32px", lineHeight: "1.7", color: "var(--text-primary)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", color: "var(--primary)" }}>Ruang Lingkup Jurnal (Scope)</h2>
          <p style={{ marginBottom: "20px" }}>
            Jurnal MASEI memiliki fokus kajian yang spesifik dan mendalam. Kami menerbitkan artikel-artikel ilmiah berkualitas tinggi yang berkaitan erat dengan bidang-bidang berikut:
          </p>

          <ul style={{ paddingLeft: "24px", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><strong>Manajemen:</strong> Praktik manajemen modern, manajemen strategis, sumber daya manusia, dan tata kelola organisasi.</li>
            <li><strong>Akuntansi:</strong> Akuntansi konvensional dan syariah, audit, pelaporan keuangan, dan etika profesi akuntan.</li>
            <li><strong>Ekonomi:</strong> Teori ekonomi, ekonomi pembangunan, kebijakan publik, dan studi makro/mikro ekonomi.</li>
            <li><strong>Kajian Islam:</strong> Fiqih muamalah, pemikiran ekonomi tokoh Islam, sejarah peradaban ekonomi Islam, dan filantropi Islam (Ziswaf).</li>
            <li><strong>Teknologi:</strong> Financial Technology (Fintech), inovasi digital dalam bisnis, kecerdasan buatan dalam ekonomi, dan sistem informasi manajemen.</li>
            <li><strong>Ekonomi Islam:</strong> Perbankan syariah, asuransi syariah (takaful), pasar modal syariah, dan instrumen keuangan Islam lainnya.</li>
            <li><em>Dan kajian-kajian lain yang beririsan langsung dengan bidang-bidang di atas.</em></li>
          </ul>

          <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px", borderLeft: "4px solid var(--primary)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>Catatan Penting:</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Jurnal ini <strong>tidak</strong> menerima naskah dengan pendekatan multidisiplin yang berada di luar cakupan ilmu yang telah disebutkan (misalnya sains murni, kedokteran, atau teknik mesin yang tidak ada kaitannya dengan ekonomi atau manajemen).
            </p>
          </div>

          <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "16px" }}>
            <Link href="/journal" className="btn btn-primary">
              Menuju Portal Jurnal
            </Link>
            <Link href="/" className="btn btn-outline">
              Kembali ke Beranda
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
