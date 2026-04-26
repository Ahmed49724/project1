"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthLoading, studentName, signOut } = useAppContext();

  // Guard: if not logged in, redirect to login
  useEffect(() => {
    if (!isAuthLoading) {
      const savedCode = localStorage.getItem("jamea_student_code");
      const savedName = localStorage.getItem("jamea_student_name");
      const hasSession = user || savedCode || (savedName && savedName !== "—");
      if (!hasSession) {
        router.replace("/");
      }
    }
  }, [isAuthLoading, user, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (isAuthLoading) return null;

  return (
    <div
      id="dashboard-screen"
      style={{
        minHeight: "100vh",
        padding: "80px 20px 40px",
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div className="home-logo">
        <img src="/logo-optimized.png" alt="Jamea Logo" decoding="async" />
      </div>

      {studentName && studentName !== "—" && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--surface2, #f0fdf4)",
          border: "1px solid var(--green, #047857)",
          borderRadius: "100px",
          padding: "6px 18px",
          marginBottom: "12px",
          color: "var(--green, #047857)",
          fontFamily: "var(--font-tajawal), sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
        }}>
          <i className="fas fa-user-circle" />
          أهلاً، {studentName}
        </div>
      )}

      <h1
        style={{
          fontFamily: "var(--font-tajawal)",
          fontSize: "2.8rem",
          color: "var(--green)",
          marginBottom: "10px",
        }}
      >
        اختر رحلتك
      </h1>
      <p
        style={{
          fontFamily: "var(--font-noto-naskh), sans-serif",
          color: "var(--text-muted)",
          fontSize: "1.1rem",
          marginBottom: "40px",
        }}
      >
        اختر مساراً لمواصلة التعلم
      </p>

      <div className="dashboard-grid">
        {/* Arabic Language */}
        <div
          className="dash-card"
          onClick={() => router.push("/journey/arabic")}
          style={{ cursor: "pointer" }}
        >
          <div className="dash-icon" style={{ color: "#185FA5", background: "#e6f1fb" }}>
            <i className="fas fa-language" />
          </div>
          <h2>اللغة العربية</h2>
          <p>الحروف والقراءة والقواعد النحوية</p>
        </div>

        {/* Holy Quran */}
        <div className="dash-card" style={{ opacity: 0.65, cursor: "not-allowed" }}>
          <div className="dash-icon" style={{ color: "#27ae60", background: "#eaf3de" }}>
            <i className="fas fa-quran" />
          </div>
          <h2>القرآن الكريم</h2>
          <p>القراءة والحفظ والتجويد</p>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
            قريباً
          </span>
        </div>

        {/* Islamic Studies */}
        <div className="dash-card" style={{ opacity: 0.65, cursor: "not-allowed" }}>
          <div className="dash-icon" style={{ color: "#d4af37", background: "#fdfaf6" }}>
            <i className="fas fa-mosque" />
          </div>
          <h2>الدراسات الإسلامية</h2>
          <p>العقيدة والفقه والسيرة والآداب</p>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
            قريباً
          </span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "48px",
          background: "transparent",
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: "10px",
          padding: "8px 20px",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontSize: "0.85rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-noto-naskh), sans-serif",
        }}
      >
        <i className="fas fa-right-from-bracket" />
        تسجيل الخروج
      </button>
    </div>
  );
}
