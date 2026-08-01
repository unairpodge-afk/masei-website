import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Logo & About */}
          <div className="footer-col" style={{ gridColumn: "span 2" }}>
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/logo.png" alt="MASEI Logo" style={{ height: "56px", width: "auto", objectFit: "contain" }} />
              <div>
                <div className="footer-logo-text">MASEI</div>
                <div className="footer-logo-sub">Majelis Sarjana Ekonomi Islam</div>
              </div>
            </div>
            <p className="footer-desc" style={{ maxWidth: "400px" }}>
              Wadah bagi akademisi, peneliti, praktisi, dan sarjana Ekonomi Islam untuk berkolaborasi, 
              melakukan kajian strategis, serta memajukan ekosistem keuangan dan ekonomi syariah di Indonesia.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Tautan</h4>
            <ul className="footer-links">
              <li>
                <Link href="/tentang/profil" className="footer-link">
                  Profil MASEI
                </Link>
              </li>
              <li>
                <Link href="/tentang/profil#visi-misi" className="footer-link">
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/#berita" className="footer-link">
                  Kegiatan & Berita
                </Link>
              </li>
              <li>
                <Link href="/menjadi-anggota" className="footer-link">
                  Menjadi Member
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="footer-col" style={{ gridColumn: "span 1" }}>
            <h4 className="footer-title">Hubungi Kami</h4>
            <div className="footer-info">
              <div className="footer-info-item">
                <span className="footer-info-icon">📍</span>
                <span>
                  Surabaya, Indonesia
                </span>
              </div>
              <div className="footer-info-item">
                <span className="footer-info-icon">✉️</span>
                <span>support@masei.or.id</span>
              </div>
              <div className="footer-info-item">
                <span className="footer-info-icon">💬</span>
                <span>WhatsApp: +62 851 6324 0059</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 MASEI - Majelis Sarjana Ekonomi Islam Indonesia. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link href="#" className="footer-bottom-link">FAQ</Link>
            <Link href="#" className="footer-bottom-link">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
