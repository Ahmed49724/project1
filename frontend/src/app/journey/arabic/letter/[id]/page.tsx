"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FULL_DB, getLetterRule } from "@/data/db";
import { useAppContext } from "@/context/AppContext";
import { speakAr } from "@/lib/speech";
import { MotorsSection }    from "@/components/LetterSections/MotorsSection";
import { XOWordGame }       from "@/components/LetterSections/XOWordGame";
import { MissingWordGame }  from "@/components/LetterSections/MissingWordGame";
import { SpinWheelGame }    from "@/components/LetterSections/SpinWheelGame";
import { MemoryGame }       from "@/components/LetterSections/MemoryGame";
import { SpeedReadGame }    from "@/components/LetterSections/SpeedReadGame";
import { LetterDetective }   from "@/components/LetterSections/LetterDetective";

type LetterKey = keyof typeof FULL_DB;

const SECTIONS = [
  { id: "hero",    title: "الاستكشاف",     icon: "fa-eye"          },
  { id: "motors",  title: "الحركات",       icon: "fa-music"        },
  { id: "shapes",  title: "أشكال الحرف",   icon: "fa-shapes"       },
  { id: "detective", title: "المحقق",      icon: "fa-search"       },
  { id: "xo2",     title: "المقاطع",       icon: "fa-puzzle-piece" },
  { id: "xo3",     title: "الكلمات",       icon: "fa-spell-check"  },
  { id: "missing", title: "الكلمة الناقصة", icon: "fa-question"    },
  { id: "spin",    title: "العجلة",        icon: "fa-rotate"       },
  { id: "memory",  title: "الذاكرة",       icon: "fa-brain"        },
  { id: "speed",   title: "السرعة",        icon: "fa-bolt"         },
  { id: "story",   title: "قصة الحرف",     icon: "fa-book-open"    },
  { id: "split",   title: "التركيب",       icon: "fa-link"         },
];

const SHAPE_LABELS = ["في البداية", "في الوسط", "في النهاية", "منفصل"];

export default function LetterScreen() {
  const params = useParams();
  const router = useRouter();
  const { addStars } = useAppContext();

  const letterId = decodeURIComponent(params.id as string);
  const letterData = FULL_DB[letterId as LetterKey];
  const rule = letterData ? getLetterRule(letterId) : null;

  const [activeSection, setActiveSection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const next = !isFullscreen;
    setIsFullscreen(next);
    if (next) {
      document.documentElement.classList.add("has-phaser-fs");
    } else {
      document.documentElement.classList.remove("has-phaser-fs");
    }
  };


  if (!letterData) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔍</div>
        <h2 style={{ fontFamily: "var(--font-noto-naskh), sans-serif", marginBottom: "20px" }}>
          عذراً، هذا الحرف غير موجود
        </h2>
        <button onClick={() => router.push("/journey/arabic")} className="btn-primary">العودة للخريطة</button>
      </div>
    );
  }

  const goNext = () => {
    addStars(10);
    if (activeSection < SECTIONS.length - 1) {
      setActiveSection((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("🎉 أحسنت! أتممت رحلة الحرف بنجاح!");
      router.push("/journey/arabic");
    }
  };

  const progress = (activeSection / SECTIONS.length) * 100;

  // Common props for all section components
  const sectionProps = { letterId, letterData: letterData as never, onComplete: goNext };

  return (
    <div id="letter-screen" style={{ display: "block" }}>
      <div className="letter-layout">

        {/* ── Sidebar ─────────────────────────────── */}
        <div className="letter-sidebar">
          {SECTIONS.map((sec, idx) => (
            <div key={sec.id}
              className={`ls-nav-item ${activeSection === idx ? "active" : ""} ${activeSection > idx ? "completed" : ""}`}
              onClick={() => { if (idx <= activeSection) setActiveSection(idx); }}
              style={{ cursor: idx <= activeSection ? "pointer" : "default" }}>
              <div className="ls-icon">
                {activeSection > idx
                  ? <i className="fas fa-check-circle" style={{ color: "#10b981" }} />
                  : <i className={`fas ${sec.icon}`} />}
              </div>
              <div className="ls-text">{sec.title}</div>
            </div>
          ))}
        </div>

        {/* ── Main ─────────────────────────────────── */}
        <div className="letter-main">
            <div className="letter-top-bar">
              <div className="lt-title">
                رحلة الحرف: <span style={{ color: "var(--primary,#185FA5)", fontSize: "1.4em" }}>{letterId}</span>
              </div>
              <div className="lt-progress">
                <div className="lt-progress-track">
                  <div className="lt-progress-fill" style={{ width: `${progress}%`, transition: "width 0.4s ease" }} />
                </div>
              </div>
              <button className="fs-toggle-btn" onClick={toggleFullscreen} title="Fullscreen Mode / وضع ملء الشاشة">
                <i className="fas fa-expand-arrows-alt fs-icon-expand" />
                <i className="fas fa-compress fs-icon-compress" />
              </button>
            </div>

          <div className="letter-content-area">
            <div className={`step-section ${isFullscreen ? "fs-section-active" : ""}`}>
              <div className="fs-content-wrapper">

            {/* ══ 1: HERO ══ */}
            {activeSection === 0 && (
              <div className="section-content">
                <div className="hero-box letter-hero animate-up">
                  <div className="hero-badge">🧬 جينات الحرف — Letter DNA</div>
                  <div className="hero-root" onClick={() => speakAr(letterId)} title="اضغط للاستماع" style={{ cursor: "pointer" }}>
                    {letterId}
                  </div>
                  <div style={{ fontFamily: "sans-serif", fontSize: "0.9rem", opacity: 0.7, marginBottom: "16px" }}>اضغط للاستماع 👆</div>
                  <div className="dna-traits letter-traits">
                    <div className="trait-box sound-trait" onClick={() => speakAr(letterId)} style={{ cursor: "pointer" }}>
                      <div className="trait-box-icon">🔊</div>
                      <div className="trait-box-label">Sound / الصوت</div>
                      <div className="trait-box-val" dangerouslySetInnerHTML={{ __html: letterData.jollyRawSound }} />
                    </div>
                    <div className="trait-box action-trait">
                      <div className="trait-box-icon">🏃‍♂️</div>
                      <div className="trait-box-label">Action / الحركة</div>
                      <div className="trait-box-val">{letterData.jollyAction}</div>
                    </div>
                    <div className="trait-box story-trait" style={{ gridColumn: "1 / -1" }}>
                      <div className="trait-box-icon">{letterData.storyIcon}</div>
                      <div className="trait-box-label">Story / القصة</div>
                      <div className="trait-box-val">{letterData.jollyStory}</div>
                    </div>
                  </div>
                </div>
                {rule && (
                  <div style={{ margin: "24px auto", maxWidth: "520px", background: `${rule.color}18`, border: `2px solid ${rule.color}`, borderRadius: "16px", padding: "20px", textAlign: "center" }}>
                    <i className={`fas ${rule.icon}`} style={{ color: rule.color, fontSize: "1.8rem", marginBottom: "8px", display: "block" }} />
                    <div style={{ fontWeight: 900, color: rule.color, fontFamily: "var(--font-tajawal),sans-serif", marginBottom: "6px" }}>{rule.name}</div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontFamily: "sans-serif", lineHeight: 1.6 }}>{rule.desc}</div>
                  </div>
                )}
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                  <button className="btn-primary" onClick={goNext}>التالي <i className="fas fa-arrow-left" /></button>
                </div>
              </div>
            )}

            {/* ══ 2: MOTORS ══ */}
            {activeSection === 1 && <MotorsSection {...sectionProps} />}

            {/* ══ 3: SHAPES ══ */}
            {activeSection === 2 && (
              <div className="section-content">
                <div className="section-heading" style={{ textAlign: "center", marginBottom: "24px" }}>
                  <span className="section-badge">3</span> أشكال الحرف — Letter Shapes
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px", maxWidth: "560px", margin: "0 auto 32px" }}>
                  {letterData.shapes.map((shape, i) => (
                    <div key={i} onClick={() => speakAr(letterId)}
                      style={{ background: "var(--surface2,#f0fdf4)", border: "2px solid var(--border,#e5e7eb)", borderRadius: "20px", padding: "28px 16px", textAlign: "center", cursor: "pointer", transition: "transform 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                      <div style={{ fontFamily: "var(--font-noto-naskh),serif", fontSize: "3.5rem", color: "var(--primary,#185FA5)", marginBottom: "10px", lineHeight: 1 }}>{shape}</div>
                      <div style={{ fontFamily: "var(--font-noto-naskh),sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 700 }}>{SHAPE_LABELS[i]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center" }}>
                  <button className="btn-primary" onClick={goNext}>التالي <i className="fas fa-arrow-left" /></button>
                </div>
              </div>
            )}

            {/* ══ 4: DETECTIVE ══ */}
            {activeSection === 3 && <LetterDetective {...sectionProps} />}

            {/* ══ 5: XO 2-letter (cardWords) ══ */}
            {activeSection === 4 && (
              <XOWordGame words={letterData.cardWords} title="المقاطع — Syllables XO" badge="5" onComplete={goNext} />
            )}

            {/* ══ 6: XO 3-letter (xoWords) ══ */}
            {activeSection === 5 && (
              <XOWordGame words={letterData.xoWords} title="الكلمات — Words XO" badge="6" onComplete={goNext} />
            )}

            {/* ══ 7: MISSING WORD ══ */}
            {activeSection === 6 && <MissingWordGame {...sectionProps} />}

            {/* ══ 8: SPIN WHEEL ══ */}
            {activeSection === 7 && <SpinWheelGame {...sectionProps} />}

            {/* ══ 9: MEMORY ══ */}
            {activeSection === 8 && <MemoryGame {...sectionProps} />}

            {/* ══ 10: SPEED READ ══ */}
            {activeSection === 9 && <SpeedReadGame {...sectionProps} />}

            {/* ══ 11: ARABIC STORY ══ */}
            {activeSection === 10 && (
              <div className="section-content" style={{ textAlign: "center" }}>
                <div className="section-heading" style={{ marginBottom: "24px" }}><span className="section-badge">11</span> قصة الحرف</div>
                <div style={{ fontSize: "5rem", marginBottom: "16px" }}>{letterData.storyIcon}</div>
                <div style={{ fontFamily: "var(--font-noto-naskh),serif", fontSize: "1.8rem", lineHeight: 2, color: "var(--text,#1f2937)", maxWidth: "600px", margin: "0 auto 24px", background: "var(--surface2,#f0fdf4)", border: "2px solid var(--border,#e5e7eb)", borderRadius: "20px", padding: "28px", direction: "rtl" }}>
                  {letterData.storyText}
                </div>
                <button className="btn-secondary" onClick={() => speakAr(letterData.storyText)} style={{ marginBottom: "16px" }}>
                  <i className="fas fa-volume-high" /> استمع
                </button>
                <div style={{ marginTop: "16px" }}>
                  <button className="btn-primary" onClick={goNext}>التالي <i className="fas fa-arrow-left" /></button>
                </div>
              </div>
            )}

            {/* ══ 12: SPLIT WORDS XO ══ */}
            {activeSection === 11 && (
              <XOWordGame words={letterData.splitWords} title="التركيب — Connected Words XO" badge="12" onComplete={goNext} />
            )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
