import Link from "next/link";

export default function NewsCard({ date, title, desc, link = "#", category }) {
  // Select a pleasant gradient based on the category for variety
  const getGradient = (cat) => {
    switch (cat) {
      case "Riset":
        return "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)";
      case "Kegiatan":
        return "linear-gradient(135deg, #d97706 0%, #b45309 100%)";
      default:
        return "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)";
    }
  };

  return (
    <div className="card">
      <div className="card-img-wrapper" style={{ background: getGradient(category), display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ fontSize: "40px", color: "rgba(255, 255, 255, 0.25)", fontWeight: "800", fontFamily: "var(--font-display)" }}>
          {category}
        </div>
        <span style={categoryBadgeStyle}>{category}</span>
      </div>
      <div className="card-content">
        <span className="card-date">{date}</span>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
        <Link href={link} className="card-link">
          Selengkapnya
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

const categoryBadgeStyle = {
  position: "absolute",
  top: "16px",
  left: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  color: "var(--text-primary)",
  padding: "4px 12px",
  borderRadius: "9999px",
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};
