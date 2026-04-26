"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithStudentCode, user, isAuthLoading, studentName } = useAppContext();

  const [mode, setMode] = useState<"student" | "parent">("student");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!isAuthLoading) {
      const savedCode = localStorage.getItem("jamea_student_code");
      const savedName = localStorage.getItem("jamea_student_name");
      if (user || savedCode || (savedName && savedName !== "—")) {
        router.replace("/dashboard");
      }
    }
  }, [isAuthLoading, user, router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول");
      setLoading(false);
    }
  };

  const handleCodeLogin = async () => {
    if (!code.trim()) {
      setError(mode === "student" ? "أدخل كود الطالب" : "أدخل اسمك");
      return;
    }
    setLoading(true);
    setError("");
    const ok = await signInWithStudentCode(code.trim());
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("الكود غير صحيح. تحقق من الكود مع ولي الأمر.");
      setLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.spinner} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Decorative background orbs */}
      <div style={{ ...styles.orb, top: "-120px", right: "-120px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)" }} />
      <div style={{ ...styles.orb, bottom: "-80px", left: "-80px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(6,95,70,0.4) 0%, transparent 70%)" }} />
      <div style={{ ...styles.orb, top: "40%", left: "10%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" }} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <img src="/logo-optimized.png" alt="Jamea Logo" style={styles.logo} />
        </div>

        {/* Title */}
        <div style={styles.title}>JAMEA PLATFORM</div>
        <div style={styles.subtitle}>
          {mode === "student" ? "بوابة الطالب — Student Portal" : "بوابة ولي الأمر — Parent Portal"}
        </div>

        {/* Mode Toggle */}
        <div style={styles.modeToggle}>
          <button
            style={{ ...styles.modeBtn, ...(mode === "student" ? styles.modeBtnActive : {}) }}
            onClick={() => { setMode("student"); setError(""); }}
          >
            <i className="fas fa-child" /> طالب
          </button>
          <button
            style={{ ...styles.modeBtn, ...(mode === "parent" ? styles.modeBtnActive : {}) }}
            onClick={() => { setMode("parent"); setError(""); }}
          >
            <i className="fas fa-user-shield" /> ولي أمر
          </button>
        </div>

        {/* Google Button */}
        <button style={styles.googleBtn} onClick={handleGoogleLogin} disabled={loading}>
          {loading ? (
            <span style={styles.btnSpinner} />
          ) : (
            <i className="fab fa-google" style={{ marginLeft: "8px" }} />
          )}
          {mode === "parent" ? "تسجيل الدخول بـ Google" : "ولي الأمر: دخول بـ Google"}
        </button>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>أو</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Code / Name Input */}
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCodeLogin()}
          placeholder={mode === "student" ? "كود الطالب (مثال: AHMED2024)" : "اسم ولي الأمر"}
          style={styles.input}
          dir="ltr"
          autoComplete="off"
        />

        {error && <div style={styles.errorMsg}><i className="fas fa-exclamation-circle" /> {error}</div>}

        <button style={styles.primaryBtn} onClick={handleCodeLogin} disabled={loading}>
          {loading ? <span style={styles.btnSpinner} /> : <i className="fas fa-rocket" style={{ marginLeft: "8px" }} />}
          {mode === "student" ? "ابدأ التعلم" : "دخول"}
        </button>

        {/* Language toggle */}
        <button style={styles.langBtn} onClick={() => {}}>
          <i className="fas fa-language" /> عربي / English
        </button>

        <div style={styles.footer}>
          Jamea Educational Platform — منصة جامع التعليمية
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "var(--font-tajawal), Tajawal, sans-serif",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "28px",
    padding: "48px 40px 36px",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 32px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
  },
  logoWrap: {
    width: "80px",
    height: "80px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  logo: { width: "100%", height: "100%", objectFit: "cover" },
  title: {
    fontSize: "1.8rem",
    fontWeight: 900,
    color: "#d4af37",
    letterSpacing: "0.08em",
    textShadow: "0 2px 12px rgba(212,175,55,0.4)",
    fontFamily: "var(--font-tajawal), Tajawal, sans-serif",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.65)",
    textAlign: "center",
    fontFamily: "var(--font-noto-naskh), sans-serif",
  },
  modeToggle: {
    display: "flex",
    background: "rgba(0,0,0,0.2)",
    borderRadius: "12px",
    padding: "4px",
    gap: "4px",
    width: "100%",
  },
  modeBtn: {
    flex: 1,
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontFamily: "var(--font-tajawal), sans-serif",
    fontWeight: 700,
    fontSize: "0.9rem",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  modeBtnActive: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  googleBtn: {
    width: "100%",
    padding: "14px 20px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.2s",
    fontFamily: "var(--font-tajawal), sans-serif",
  },
  divider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(255,255,255,0.2)",
  },
  dividerText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: "0.85rem",
    fontFamily: "var(--font-noto-naskh), sans-serif",
  },
  input: {
    width: "100%",
    padding: "14px 18px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "monospace",
    letterSpacing: "0.05em",
  },
  errorMsg: {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px",
    color: "#fca5a5",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-noto-naskh), sans-serif",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px 20px",
    background: "linear-gradient(135deg, #059669, #047857)",
    border: "none",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: 900,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 20px rgba(5,150,105,0.4)",
    transition: "all 0.2s",
    fontFamily: "var(--font-tajawal), sans-serif",
  },
  langBtn: {
    background: "transparent",
    border: "1px solid rgba(212,175,55,0.4)",
    color: "#d4af37",
    padding: "8px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontFamily: "var(--font-tajawal), sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  footer: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    marginTop: "4px",
  },
  loadingWrap: {
    minHeight: "100vh",
    background: "#064e3b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255,255,255,0.2)",
    borderTop: "4px solid #d4af37",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  btnSpinner: {
    display: "inline-block",
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};
