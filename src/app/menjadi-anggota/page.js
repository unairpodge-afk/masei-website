"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    birthPlace: "",
    birthDate: "",
    gender: "Laki-laki",
    email: "",
    phone: "",
    education: "S1",
    university: "",
    major: "",
    graduationYear: "",
    occupation: "Akademisi",
    company: "",
    position: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    // Basic validation per step
    if (step === 1) {
      if (!formData.fullName || !formData.nik || !formData.email || !formData.phone) {
        setError("Mohon lengkapi semua kolom wajib di Step 1.");
        return;
      }
    } else if (step === 2) {
      if (!formData.university || !formData.major || !formData.graduationYear) {
        setError("Mohon lengkapi semua kolom wajib di Step 2.");
        return;
      }
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/members/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to member portal with the new member ID
        router.push(`/member-portal?memberId=${data.member.memberId}`);
      } else {
        setError(data.message || "Pendaftaran gagal. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100vh", padding: "40px 0" }}>
      <div className="reg-container">
        
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
            Registrasi Anggota MASEI
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "8px" }}>
            Lengkapi formulir pendaftaran di bawah ini untuk menjadi anggota resmi Majelis Sarjana Ekonomi Islam.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="reg-steps">
          <div className="reg-step-line" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          
          <div className={`reg-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
            <div className="step-num">1</div>
            <span className="step-label">Identitas</span>
          </div>
          
          <div className={`reg-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
            <div className="step-num">2</div>
            <span className="step-label">Akademis</span>
          </div>
          
          <div className={`reg-step ${step >= 3 ? "active" : ""}`}>
            <div className="step-num">3</div>
            <span className="step-label">Pekerjaan</span>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div style={errorBoxStyle}>
            <strong>⚠️ Perhatian:</strong> {error}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Identitas Pribadi */}
          {step === 1 && (
            <div>
              <h2 className="form-section-title">Langkah 1: Identitas Pribadi</h2>
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label className="form-label">Nama Lengkap & Gelar *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Contoh: Dr. Ahmad Fauzi, S.E.I., M.E."
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nomor Induk Kependudukan (NIK/KTP) *</label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="16 digit NIK KTP Anda"
                    maxLength="16"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Jenis Kelamin *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-input form-select"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tempat Lahir *</label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Kota Tempat Lahir"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tanggal Lahir *</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Alamat Email Aktif *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nomor Handphone (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Contoh: 08123456789"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Latar Belakang Akademis */}
          {step === 2 && (
            <div>
              <h2 className="form-section-title">Langkah 2: Latar Belakang Akademis</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Pendidikan Terakhir *</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="form-input form-select"
                  >
                    <option value="S1">Sarjana (S1)</option>
                    <option value="S2">Magister (S2)</option>
                    <option value="S3">Doktor (S3)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tahun Kelulusan *</label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Contoh: 2024"
                    required
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Nama Universitas / Kampus *</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Contoh: Universitas Indonesia"
                    required
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Program Studi / Jurusan *</label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Contoh: Ekonomi Syariah / Perbankan Islam"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Latar Belakang Pekerjaan */}
          {step === 3 && (
            <div>
              <h2 className="form-section-title">Langkah 3: Latar Belakang Pekerjaan</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Profesi / Pekerjaan Saat Ini *</label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="form-input form-select"
                  >
                    <option value="Akademisi">Akademisi / Dosen</option>
                    <option value="Praktisi">Praktisi Lembaga Keuangan</option>
                    <option value="Peneliti">Peneliti / Analis</option>
                    <option value="PNS">Pegawai Negeri Sipil (PNS)</option>
                    <option value="Mahasiswa">Mahasiswa Lanjutan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Nama Instansi / Perusahaan *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Contoh: UIN Syarif Hidayatullah / Bank Syariah Indonesia"
                    required
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Jabatan Saat Ini *</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Contoh: Dosen Lektor / Relationship Manager"
                    required
                  />
                </div>
                
                {/* Simulated Document Upload */}
                <div className="form-group col-span-2">
                  <label className="form-label">Unggah Salinan Ijazah / KTP (Simulasi) *</label>
                  <div style={uploadPlaceholderStyle}>
                    <span style={{ fontSize: "28px" }}>📄</span>
                    <div style={{ marginTop: "8px", fontSize: "13px", fontWeight: "600" }}>Pilih berkas untuk diunggah</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Format PDF / JPG, Maksimal 5MB (Sistem akan menyimulasikan unggahan secara instan)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Navigation Actions */}
          <div className="form-actions">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="btn btn-outline" style={{ display: "flex", gap: "8px" }}>
                ← Kembali
              </button>
            ) : (
              <div></div> // Empty spacing spacer
            )}

            {step < 3 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary" style={{ display: "flex", gap: "8px" }}>
                Lanjutkan →
              </button>
            ) : (
              <button type="submit" disabled={loading} className="btn btn-secondary" style={{ display: "flex", gap: "8px" }}>
                {loading ? "Menyimpan Data..." : "Kirim Pendaftaran ✓"}
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}

// Internal style objects
const errorBoxStyle = {
  backgroundColor: "#fef2f2",
  border: "1px solid #fee2e2",
  borderRadius: "8px",
  color: "#991b1b",
  padding: "16px",
  marginBottom: "32px",
  fontSize: "14px"
};

const uploadPlaceholderStyle = {
  border: "2px dashed var(--border-color)",
  borderRadius: "8px",
  padding: "32px",
  textAlign: "center",
  backgroundColor: "var(--bg-secondary)",
  cursor: "pointer",
  transition: "all 0.3s ease"
};
