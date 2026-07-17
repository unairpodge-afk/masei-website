"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      badge: "Wadah Sarjana Ekonomi Syariah",
      title: "Majelis Sarjana Ekonomi Islam (MASEI)",
      desc: "Wujud komitmen nyata kami sebagai wadah para intelektual dalam berkontribusi, meneliti, dan mengembangkan Ekonomi Islam di Indonesia.",
      btnText: "Tentang Kami",
      btnLink: "/tentang/profil",
      gradient: "linear-gradient(135deg, rgba(15, 118, 110, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)",
      patternSeed: "pattern-1"
    },
    {
      badge: "Peluang Kolaborasi & Jejaring",
      title: "Pendaftaran Anggota Baru MASEI 2026",
      desc: "Mari bergabung bersama ribuan sarjana dan praktisi ekonomi Islam se-Indonesia untuk memperkuat ekosistem riset dan industri syariah.",
      btnText: "Informasi Pendaftaran",
      btnLink: "/menjadi-anggota",
      gradient: "linear-gradient(135deg, rgba(217, 119, 6, 0.9) 0%, rgba(15, 118, 110, 0.95) 100%)",
      patternSeed: "pattern-2"
    },
    {
      badge: "Prestasi & Pengakuan",
      title: "Apresiasi Riset & Kontribusi Strategis",
      desc: "MASEI menerima penghargaan nasional atas kontribusi pemikiran dan riset kebijakan dalam memperkuat regulasi ekonomi syariah di Indonesia.",
      btnText: "Baca Selengkapnya",
      btnLink: "/#berita",
      gradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(13, 148, 136, 0.9) 100%)",
      patternSeed: "pattern-3"
    }
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-carousel">
      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="carousel-slide" style={{ background: slide.gradient }}>
            {/* Ambient Lighting / Premium Background Decorative Circles */}
            <div style={circle1Style}></div>
            <div style={circle2Style}></div>
            
            <div className="container">
              <div className="slide-content">
                <span className="slide-badge">{slide.badge}</span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.desc}</p>
                <Link href={slide.btnLink} className="btn btn-secondary">
                  {slide.btnText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="carousel-controls">
        <button className="control-btn" onClick={handlePrev} aria-label="Previous Slide">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`indicator ${idx === current ? "active" : ""}`}
              onClick={() => setCurrent(idx)}
            ></div>
          ))}
        </div>

        <button className="control-btn" onClick={handleNext} aria-label="Next Slide">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// Styling for ambient floating light spots
const circle1Style = {
  position: "absolute",
  top: "10%",
  right: "10%",
  width: "350px",
  height: "350px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0) 70%)",
  filter: "blur(40px)",
  pointerEvents: "none",
  zIndex: 1
};

const circle2Style = {
  position: "absolute",
  bottom: "10%",
  left: "5%",
  width: "450px",
  height: "450px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, rgba(217, 119, 6, 0) 70%)",
  filter: "blur(50px)",
  pointerEvents: "none",
  zIndex: 1
};
