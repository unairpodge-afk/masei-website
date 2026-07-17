"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const handleDropdownClick = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const navItems = [
    {
      title: "Tentang",
      type: "dropdown",
      items: [
        { label: "Profil MASEI", href: "/tentang/profil" },
        { label: "Visi & Misi", href: "/tentang/profil#visi-misi" },
        { label: "Struktur Organisasi", href: "/tentang/profil#struktur" }
      ]
    },
    {
      title: "Publikasi",
      type: "dropdown",
      items: [
        { label: "Jurnal Ekonomi Islam", href: "/journal" },
        { label: "Policy Brief", href: "#" }
      ]
    },
    { title: "Berita & Kegiatan", href: "/#berita", type: "link" },
    { title: "Hubungi Kami", href: "/#kontak", type: "link" }
  ];

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link href="/" className="logo-link">
          <div className="logo-icon">M</div>
          <div className="logo-text">
            <span className="logo-title">MASEI.id</span>
            <span className="logo-subtitle">Majelis Sarjana Ekonomi Islam</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ul className="nav-menu">
            {navItems.map((item, idx) => (
              <li key={idx} className="nav-item">
                {item.type === "dropdown" ? (
                  <>
                    <button
                      className={`nav-link ${activeDropdown === idx ? "active" : ""}`}
                      onClick={() => handleDropdownClick(idx)}
                      aria-haspopup="true"
                    >
                      {item.title}
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="dropdown-menu">
                      {item.items.map((sub, sIdx) => (
                        <Link key={sIdx} href={sub.href} className="dropdown-link">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={`nav-link ${pathname === item.href ? "active" : ""}`}>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="nav-cta-wrapper" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/menjadi-anggota" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
              Gabung Anggota
            </Link>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="mobile-drawer" style={mobileDrawerStyle}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
            {navItems.map((item, idx) => (
              <li key={idx}>
                {item.type === "dropdown" ? (
                  <div>
                    <div
                      style={mobileDropdownToggleStyle}
                      onClick={() => handleDropdownClick(idx)}
                    >
                      {item.title}
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: activeDropdown === idx ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {activeDropdown === idx && (
                      <div style={mobileDropdownContentStyle}>
                        {item.items.map((sub, sIdx) => (
                          <Link key={sIdx} href={sub.href} onClick={() => setIsOpen(false)} style={mobileDropdownLinkStyle}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} onClick={() => setIsOpen(false)} style={mobileNavLinkStyle}>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
            <li style={{ marginTop: "16px" }}>
              <Link href="/menjadi-anggota" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: "100%" }}>
                Gabung Anggota
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

// Inline Styles for Mobile Menu Drawer
const mobileDrawerStyle = {
  position: "absolute",
  top: "80px",
  left: 0,
  width: "100%",
  backgroundColor: "white",
  borderBottom: "1px solid var(--border-color)",
  boxShadow: "var(--shadow-lg)",
  padding: "24px",
  zIndex: 999
};

const mobileDropdownToggleStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0",
  fontSize: "16px",
  fontWeight: "600",
  color: "var(--text-primary)",
  cursor: "pointer"
};

const mobileDropdownContentStyle = {
  paddingLeft: "16px",
  borderLeft: "2px solid var(--primary-border)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "8px",
  marginBottom: "12px"
};

const mobileDropdownLinkStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "var(--text-secondary)",
  display: "block",
  padding: "6px 0"
};

const mobileNavLinkStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "var(--text-primary)",
  display: "block",
  padding: "10px 0"
};
