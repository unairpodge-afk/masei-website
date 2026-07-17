"use client";

import { useState } from "react";
import Link from "next/link";

export default function JournalPage() {
  // Authentication State
  const [user, setUser] = useState(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  // OJS Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(1);
  const [submissions, setSubmissions] = useState([]);
  
  // OJS Form Fields State
  const [section, setSection] = useState("Articles");
  const [checklist, setChecklist] = useState({
    notPublished: false,
    formatOk: false,
    styleOk: false,
    copyrightAgreed: false
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [metadata, setMetadata] = useState({
    title: "",
    abstract: "",
    keywords: "",
    coAuthors: ""
  });

  // Simulated Google Sign-In Flow
  const handleGoogleLoginClick = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      setLoadingLogin(false);
      setShowGoogleModal(true);
    }, 1200);
  };

  const selectGoogleAccount = (name, email) => {
    setShowGoogleModal(false);
    setUser({ name, email });
  };

  const handleLogout = () => {
    setUser(null);
    setIsSubmitting(false);
    setSubmissionStep(1);
  };

  // OJS Wizard Navigation
  const handleChecklistChange = (name) => {
    setChecklist((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    return checklist.notPublished && checklist.formatOk && checklist.styleOk && checklist.copyrightAgreed;
  };

  const simulateFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 20;
        });
      }, 300);
    }
  };

  const handleOjsSubmit = () => {
    // Generate Random Submission ID
    const submissionId = `MSJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSubmission = {
      id: submissionId,
      title: metadata.title,
      section,
      status: "Dalam Penelaahan (Under Review)",
      submittedAt: new Date().toISOString()
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    setSubmissionStep(5);
  };

  const resetOjsForm = () => {
    setSubmissionStep(1);
    setIsSubmitting(false);
    setUploadedFile(null);
    setUploadProgress(0);
    setMetadata({ title: "", abstract: "", keywords: "", coAuthors: "" });
    setChecklist({ notPublished: false, formatOk: false, styleOk: false, copyrightAgreed: false });
  };

  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "90vh", padding: "64px 0" }}>
      <div className="container">
        
        {/* NOT LOGGED IN: Google Auth Screen */}
        {!user ? (
          <div style={loginCardStyle}>
            <div style={loginHeaderStyle}>
              <div style={ojsLogoStyle}>OJS</div>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
                MASEI Journal Portal
              </h1>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "8px" }}>
                Open Journal Systems (OJS) - Penyerahan & Penelaahan Artikel Ilmiah
              </p>
            </div>

            <div style={loginBodyStyle}>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", textAlign: "center", lineHeight: "1.6", marginBottom: "32px" }}>
                Untuk melakukan penyerahan naskah jurnal (manuscript submission) atau meninjau status penelaahan editor, 
                silakan masuk menggunakan akun Google institusi atau pribadi Anda.
              </p>

              <button 
                onClick={handleGoogleLoginClick} 
                disabled={loadingLogin} 
                style={googleBtnStyle}
              >
                {loadingLogin ? (
                  <>
                    <span style={spinnerSmallStyle}></span>
                    Menghubungkan...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.6001 10.2273C19.6001 9.51818 19.5365 8.84091 19.4183 8.19091H10.0001V12.0455H15.3819C15.1501 13.2955 14.4456 14.3545 13.3865 15.0636V17.5636H16.6183C18.5092 15.8227 19.6001 13.2591 19.6001 10.2273Z" fill="#4285F4"/>
                      <path d="M10.0001 20C12.7001 20 14.9637 19.1045 16.6183 17.5636L13.3865 15.0636C12.491 15.6636 11.3456 16.0227 10.0001 16.0227C7.38647 16.0227 5.17284 14.2636 4.38193 11.8909H1.05469V14.4727C2.70469 17.75 6.0865 20 10.0001 20Z" fill="#34A853"/>
                      <path d="M4.38193 11.8909C4.18193 11.2909 4.06829 10.6545 4.06829 10C4.06829 9.34545 4.18193 8.70909 4.38193 8.10909V5.52727H1.05469C0.381958 6.87273 0 8.39091 0 10C0 11.6091 0.381958 13.1273 1.05469 14.4727L4.38193 11.8909Z" fill="#FBBC05"/>
                      <path d="M10.0001 3.97727C11.4683 3.97727 12.791 4.48182 13.8274 5.46818L16.691 2.60455C14.9546 0.990909 12.691 0 10.0001 0C6.0865 0 2.70469 2.25 1.05469 5.52727L4.38193 8.10909C5.17284 5.73636 7.38647 3.97727 10.0001 3.97727Z" fill="#EA4335"/>
                    </svg>
                    Masuk dengan Google
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* LOGGED IN: OJS submission dashboard */
          <div style={panelContainerStyle}>
            {/* Dashboard Header */}
            <div style={panelHeaderStyle}>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
                  Dasbor Penulis Jurnal MASEI
                </h1>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Login: <strong>{user.name}</strong> ({user.email})
                </p>
              </div>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "8px 16px", fontSize: "13px" }}>
                Keluar Portal
              </button>
            </div>

            {/* OJS Submission Wizard In-Progress */}
            {isSubmitting ? (
              <div style={wizardContainerStyle}>
                {/* Wizard steps progress bar */}
                <div className="reg-steps" style={{ marginBottom: "36px" }}>
                  <div className="reg-step-line" style={{ width: `${((submissionStep - 1) / 4) * 100}%` }}></div>
                  <div className={`reg-step ${submissionStep >= 1 ? "active" : ""} ${submissionStep > 1 ? "completed" : ""}`}>
                    <div className="step-num">1</div>
                    <span className="step-label">Mulai</span>
                  </div>
                  <div className={`reg-step ${submissionStep >= 2 ? "active" : ""} ${submissionStep > 2 ? "completed" : ""}`}>
                    <div className="step-num">2</div>
                    <span className="step-label">Unggah</span>
                  </div>
                  <div className={`reg-step ${submissionStep >= 3 ? "active" : ""} ${submissionStep > 3 ? "completed" : ""}`}>
                    <div className="step-num">3</div>
                    <span className="step-label">Metadata</span>
                  </div>
                  <div className={`reg-step ${submissionStep >= 4 ? "active" : ""} ${submissionStep > 4 ? "completed" : ""}`}>
                    <div className="step-num">4</div>
                    <span className="step-label">Konfirmasi</span>
                  </div>
                  <div className={`reg-step ${submissionStep >= 5 ? "active" : ""}`}>
                    <div className="step-num">5</div>
                    <span className="step-label">Selesai</span>
                  </div>
                </div>

                {/* STEP 1: Start Submission */}
                {submissionStep === 1 && (
                  <div>
                    <h3 style={stepTitleStyle}>Langkah 1: Persyaratan Penyerahan Naskah</h3>
                    
                    <div className="form-group" style={{ marginBottom: "24px" }}>
                      <label className="form-label">Pilih Rubrik Jurnal *</label>
                      <select 
                        value={section} 
                        onChange={(e) => setSection(e.target.value)} 
                        className="form-input form-select"
                      >
                        <option value="Articles">Articles (Kajian Ilmiah Orisinal)</option>
                        <option value="Policy Briefs">Policy Briefs (Kertas Kebijakan)</option>
                        <option value="Book Reviews">Book Reviews (Resensi Buku)</option>
                      </select>
                    </div>

                    <div style={checklistBlockStyle}>
                      <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px" }}>Daftar Cek Penyerahan (Mohon centang seluruhnya):</h4>
                      <label style={checkboxLabelStyle}>
                        <input 
                          type="checkbox" 
                          checked={checklist.notPublished} 
                          onChange={() => handleChecklistChange("notPublished")} 
                          style={{ marginRight: "12px" }}
                        />
                        Naskah ini bersifat orisinal, belum pernah diterbitkan sebelumnya, dan tidak sedang dalam proses review di jurnal lain.
                      </label>
                      <label style={checkboxLabelStyle}>
                        <input 
                          type="checkbox" 
                          checked={checklist.formatOk} 
                          onChange={() => handleChecklistChange("formatOk")} 
                          style={{ marginRight: "12px" }}
                        />
                        File naskah diketik dalam format berkas dokumen Microsoft Word (.doc / .docx) atau RTF.
                      </label>
                      <label style={checkboxLabelStyle}>
                        <input 
                          type="checkbox" 
                          checked={checklist.styleOk} 
                          onChange={() => handleChecklistChange("styleOk")} 
                          style={{ marginRight: "12px" }}
                        />
                        Teks, tabel, bibliografi, dan sitasi telah mematuhi pedoman selingkung penulisan jurnal MASEI.
                      </label>
                      <label style={checkboxLabelStyle}>
                        <input 
                          type="checkbox" 
                          checked={checklist.copyrightAgreed} 
                          onChange={() => handleChecklistChange("copyrightAgreed")} 
                          style={{ marginRight: "12px" }}
                        />
                        Saya setuju untuk menyerahkan hak lisensi publikasi artikel ilmiah ini kepada MASEI OJS apabila diterbitkan.
                      </label>
                    </div>

                    <div style={wizardActionsStyle}>
                      <button onClick={() => setIsSubmitting(false)} className="btn btn-outline">Batal</button>
                      <button 
                        onClick={() => setSubmissionStep(2)} 
                        disabled={!validateStep1()} 
                        className="btn btn-primary"
                      >
                        Lanjutkan →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Upload Document */}
                {submissionStep === 2 && (
                  <div>
                    <h3 style={stepTitleStyle}>Langkah 2: Unggah Naskah Dokumen</h3>
                    
                    <div style={{ marginBottom: "28px" }}>
                      <label className="form-label" style={{ marginBottom: "10px", display: "block" }}>Unggah Berkas Naskah Utama (Tanpa Identitas Penulis / Blind Review) *</label>
                      
                      <div style={fileUploadBoxStyle}>
                        <input 
                          type="file" 
                          id="file-input" 
                          onChange={simulateFileUpload} 
                          style={{ display: "none" }}
                          accept=".doc,.docx,.pdf"
                        />
                        <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                          <span style={{ fontSize: "40px" }}>💾</span>
                          <div style={{ marginTop: "12px", fontWeight: "600", fontSize: "14px" }}>
                            {uploadedFile ? `Terpilih: ${uploadedFile}` : "Pilih File Naskah (.docx / .doc)"}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                            Berkas tidak boleh mencantumkan nama penulis untuk menjaga objektivitas blind review.
                          </div>
                        </label>
                      </div>

                      {uploadedFile && (
                        <div style={{ marginTop: "20px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>
                            <span>Proses Unggah</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div style={progressBarContainer}>
                            <div style={{ ...progressBarFill, width: `${uploadProgress}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={wizardActionsStyle}>
                      <button onClick={() => setSubmissionStep(1)} className="btn btn-outline">← Kembali</button>
                      <button 
                        onClick={() => setSubmissionStep(3)} 
                        disabled={!uploadedFile || uploadProgress < 100} 
                        className="btn btn-primary"
                      >
                        Lanjutkan →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Enter Metadata */}
                {submissionStep === 3 && (
                  <div>
                    <h3 style={stepTitleStyle}>Langkah 3: Masukkan Metadata Naskah</h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
                      <div className="form-group">
                        <label className="form-label">Judul Artikel Lengkap (Bahasa Indonesia / Inggris) *</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={metadata.title} 
                          onChange={handleMetadataChange} 
                          className="form-input" 
                          placeholder="Masukkan judul lengkap naskah Anda" 
                          required 
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Abstrak (Maksimal 250 kata) *</label>
                        <textarea 
                          name="abstract" 
                          value={metadata.abstract} 
                          onChange={handleMetadataChange} 
                          className="form-input" 
                          rows="6" 
                          placeholder="Masukkan abstrak naskah yang berisi latar belakang, metode, hasil, dan kesimpulan..." 
                          required
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Kata Kunci (Keywords, pisahkan dengan koma) *</label>
                        <input 
                          type="text" 
                          name="keywords" 
                          value={metadata.keywords} 
                          onChange={handleMetadataChange} 
                          className="form-input" 
                          placeholder="ekonomi syariah, instrumen ziswaf, literasi keuangan" 
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Ko-Penulis (Jika ada co-authors, masukkan Nama & Institusi)</label>
                        <input 
                          type="text" 
                          name="coAuthors" 
                          value={metadata.coAuthors} 
                          onChange={handleMetadataChange} 
                          className="form-input" 
                          placeholder="Contoh: Dr. Budi Santoso (UI), Farah Nabila (Airlangga)" 
                        />
                      </div>
                    </div>

                    <div style={wizardActionsStyle}>
                      <button onClick={() => setSubmissionStep(2)} className="btn btn-outline">← Kembali</button>
                      <button 
                        onClick={() => setSubmissionStep(4)} 
                        disabled={!metadata.title || !metadata.abstract || !metadata.keywords} 
                        className="btn btn-primary"
                      >
                        Lanjutkan →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Confirm Submission */}
                {submissionStep === 4 && (
                  <div>
                    <h3 style={stepTitleStyle}>Langkah 4: Konfirmasi Penyerahan</h3>
                    
                    <div style={reviewBlockStyle}>
                      <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--primary)", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Detail Ringkasan Naskah</h4>
                      
                      <div style={reviewRowStyle}>
                        <strong>Rubrik Jurnal:</strong>
                        <span>{section}</span>
                      </div>
                      <div style={reviewRowStyle}>
                        <strong>File Naskah:</strong>
                        <span style={{ color: "var(--primary)", fontWeight: "600" }}>📄 {uploadedFile}</span>
                      </div>
                      <div style={reviewRowStyle}>
                        <strong>Judul Naskah:</strong>
                        <span style={{ fontWeight: "700" }}>{metadata.title}</span>
                      </div>
                      <div style={reviewRowStyle}>
                        <strong>Abstrak:</strong>
                        <span style={{ color: "var(--text-secondary)", fontSize: "13.5px", lineHeight: "1.5", textAlign: "justify" }}>{metadata.abstract}</span>
                      </div>
                      <div style={reviewRowStyle}>
                        <strong>Kata Kunci:</strong>
                        <span>{metadata.keywords}</span>
                      </div>
                      {metadata.coAuthors && (
                        <div style={reviewRowStyle}>
                          <strong>Ko-Penulis:</strong>
                          <span>{metadata.coAuthors}</span>
                        </div>
                      )}
                    </div>

                    <div style={wizardActionsStyle}>
                      <button onClick={() => setSubmissionStep(3)} className="btn btn-outline">← Kembali</button>
                      <button onClick={handleOjsSubmit} className="btn btn-secondary">Kirim Naskah Sekarang ✓</button>
                    </div>
                  </div>
                )}

                {/* STEP 5: Complete */}
                {submissionStep === 5 && (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ fontSize: "54px", marginBottom: "16px" }}>🎉</div>
                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary)", marginBottom: "12px" }}>
                      Penyerahan Naskah Sukses!
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", maxWidth: "550px", margin: "0 auto 32px auto" }}>
                      Naskah artikel Anda telah terdaftar di sistem MASEI OJS. Editor kami akan melakukan peninjauan awal (initial screening) 
                      sebelum diteruskan ke tim penelaah sejawat (peer-reviewers).
                    </p>
                    <button onClick={resetOjsForm} className="btn btn-primary">Kembali ke Dasbor Utama</button>
                  </div>
                )}

              </div>
            ) : (
              /* OJS Dashboard Main View (Submissions List) */
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>Naskah Penyerahan Anda</h3>
                  <button onClick={() => setIsSubmitting(true)} className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
                    + Kirim Naskah Baru
                  </button>
                </div>

                {submissions.length === 0 ? (
                  <div style={emptyStateStyle}>
                    <span style={{ fontSize: "40px" }}>📝</span>
                    <h4 style={{ fontSize: "16px", fontWeight: "700", marginTop: "12px", color: "var(--text-secondary)" }}>Belum Ada Riwayat Penyerahan</h4>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                      Anda belum mengirimkan artikel ilmiah ke jurnal MASEI. Mulai pengiriman dengan mengklik tombol di atas.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {submissions.map((sub, idx) => (
                      <div key={idx} style={subItemCardStyle}>
                        <div>
                          <span style={subIdBadgeStyle}>{sub.id}</span>
                          <span style={subSectionBadgeStyle}>{sub.section}</span>
                          <h4 style={{ fontSize: "16px", fontWeight: "700", marginTop: "12px", lineHeight: "1.4" }}>
                            {sub.title}
                          </h4>
                          <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginTop: "8px" }}>
                            Diserahkan pada: {new Date(sub.submittedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={subStatusStyle}>{sub.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* simulated GOOGLE AUTH POPUP MODAL */}
      {showGoogleModal && (
        <div style={modalBackdropStyle}>
          <div style={modalCardStyle}>
            <div style={modalHeaderStyle}>
              {/* Google Mini Logo */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span style={{ fontSize: "16px", fontWeight: "600", color: "#3c4043" }}>Sign in with Google</span>
            </div>
            
            <p style={{ fontSize: "13px", color: "#5f6368", margin: "16px 0 24px 0", textAlign: "center" }}>
              Pilih akun untuk melanjutkan ke **masei.id**
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Account 1 */}
              <div 
                onClick={() => selectGoogleAccount("Arva Athallah Susanto", "arva@example.com")} 
                style={accountRowStyle}
              >
                <div style={avatarCircleStyle}>A</div>
                <div style={{ textAlign: "left" }}>
                  <strong style={{ display: "block", fontSize: "14px", color: "#3c4043" }}>Arva Athallah Susanto</strong>
                  <span style={{ fontSize: "12px", color: "#5f6368" }}>arva@example.com</span>
                </div>
              </div>

              {/* Account 2 */}
              <div 
                onClick={() => selectGoogleAccount("Arva Coder", "arvacoder.masei@gmail.com")} 
                style={accountRowStyle}
              >
                <div style={{ ...avatarCircleStyle, backgroundColor: "#e2e8f0", color: "#475569" }}>AC</div>
                <div style={{ textAlign: "left" }}>
                  <strong style={{ display: "block", fontSize: "14px", color: "#3c4043" }}>Arva Coder</strong>
                  <span style={{ fontSize: "12px", color: "#5f6368" }}>arvacoder.masei@gmail.com</span>
                </div>
              </div>

              {/* Use another account option */}
              <div 
                onClick={() => selectGoogleAccount("Guest User", "guest.scholar@masei.id")} 
                style={{ ...accountRowStyle, borderTop: "1px solid #e8eaed", marginTop: "8px" }}
              >
                <div style={{ ...avatarCircleStyle, backgroundColor: "#f1f3f4", color: "#5f6368", fontSize: "18px" }}>👤</div>
                <div style={{ textAlign: "left" }}>
                  <strong style={{ display: "block", fontSize: "14px", color: "#1a73e8" }}>Gunakan akun tamu</strong>
                  <span style={{ fontSize: "12px", color: "#5f6368" }}>guest.scholar@masei.id</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowGoogleModal(false)} 
              style={modalCloseBtnStyle}
            >
              Batal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Styling objects for OJS submit journal page
const loginCardStyle = {
  maxWidth: "500px",
  margin: "40px auto",
  background: "white",
  border: "1px solid var(--border-color)",
  borderRadius: "16px",
  boxShadow: "var(--shadow-premium)",
  overflow: "hidden"
};

const loginHeaderStyle = {
  backgroundColor: "var(--primary-light)",
  padding: "40px 32px 32px 32px",
  textAlign: "center",
  borderBottom: "1px solid var(--primary-border)"
};

const ojsLogoStyle = {
  width: "56px",
  height: "56px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
  color: "white",
  fontWeight: "800",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px auto",
  boxShadow: "var(--shadow-md)"
};

const loginBodyStyle = {
  padding: "36px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const googleBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  width: "100%",
  padding: "14px 24px",
  borderRadius: "8px",
  border: "1px solid #dadce0",
  backgroundColor: "white",
  color: "#3c4043",
  fontWeight: "600",
  fontSize: "15px",
  boxShadow: "var(--shadow-sm)",
  cursor: "pointer",
  transition: "background-color 0.2s, box-shadow 0.2s"
};

const spinnerSmallStyle = {
  width: "16px",
  height: "16px",
  border: "2px solid #e2e8f0",
  borderTop: "2px solid var(--primary)",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};

const panelContainerStyle = {
  background: "white",
  border: "1px solid var(--border-color)",
  borderRadius: "16px",
  padding: "48px",
  boxShadow: "var(--shadow-premium)"
};

const panelHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid var(--border-color)",
  paddingBottom: "24px",
  marginBottom: "36px"
};

const wizardContainerStyle = {
  background: "var(--bg-secondary)",
  borderRadius: "12px",
  border: "1px solid var(--border-color)",
  padding: "36px"
};

const stepTitleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "var(--primary)",
  marginBottom: "24px"
};

const checklistBlockStyle = {
  background: "white",
  border: "1px solid var(--border-color)",
  borderRadius: "8px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  marginBottom: "28px"
};

const checkboxLabelStyle = {
  display: "flex",
  alignItems: "flex-start",
  fontSize: "13.5px",
  lineHeight: "1.5",
  color: "var(--text-secondary)",
  cursor: "pointer"
};

const fileUploadBoxStyle = {
  border: "2px dashed var(--primary-border)",
  borderRadius: "8px",
  padding: "32px",
  textAlign: "center",
  backgroundColor: "white",
  transition: "all 0.3s ease"
};

const progressBarContainer = {
  width: "100%",
  height: "8px",
  backgroundColor: "var(--border-color)",
  borderRadius: "4px",
  overflow: "hidden"
};

const progressBarFill = {
  height: "100%",
  backgroundColor: "var(--primary)",
  transition: "width 0.3s ease"
};

const reviewBlockStyle = {
  background: "white",
  border: "1px solid var(--border-color)",
  borderRadius: "8px",
  padding: "28px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginBottom: "28px"
};

const reviewRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "14px",
  borderBottom: "1px solid var(--bg-secondary)",
  paddingBottom: "12px"
};

const wizardActionsStyle = {
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid var(--border-color)",
  paddingTop: "24px",
  marginTop: "12px"
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "56px 24px",
  border: "2px dashed var(--border-color)",
  borderRadius: "12px",
  backgroundColor: "var(--bg-secondary)"
};

const subItemCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "var(--bg-secondary)",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "var(--shadow-sm)",
  flexWrap: "wrap",
  gap: "16px"
};

const subIdBadgeStyle = {
  fontSize: "11px",
  fontFamily: "monospace",
  backgroundColor: "var(--bg-dark)",
  color: "white",
  padding: "4px 8px",
  borderRadius: "4px",
  fontWeight: "600"
};

const subSectionBadgeStyle = {
  fontSize: "11px",
  backgroundColor: "var(--primary-light)",
  color: "var(--primary)",
  padding: "4px 8px",
  borderRadius: "4px",
  fontWeight: "700",
  marginLeft: "8px"
};

const subStatusStyle = {
  fontSize: "12px",
  fontWeight: "700",
  backgroundColor: "var(--secondary-light)",
  color: "var(--secondary-hover)",
  padding: "6px 12px",
  borderRadius: "9999px"
};

// Google OAuth Modal Styles
const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
  backdropFilter: "blur(4px)"
};

const modalCardStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  width: "360px",
  padding: "24px 32px 32px 32px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  textAlign: "center",
  fontFamily: "sans-serif" // Standard clean Google font style
};

const modalHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  marginBottom: "16px"
};

const accountRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s"
};

const avatarCircleStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "var(--primary)",
  color: "white",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalCloseBtnStyle = {
  marginTop: "24px",
  color: "#5f6368",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer"
};
