"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { FULL_DB, getLetterRule } from "@/data/db";
import { SECTIONS, SHAPE_LABELS, type StageType } from "@/data/letterSectionData";
import type { LetterEntry, SectionProps } from "@/types/letter";
import { useAppContext } from "@/context/AppContext";
import { speakAr } from "@/lib/speech";
import { MotorsSection }    from "@/components/LetterSections/MotorsSection";
import { XOWordGame }       from "@/components/LetterSections/XOWordGame";
import { MissingWordGame }  from "@/components/LetterSections/MissingWordGame";
import { SpinWheelGame }    from "@/components/LetterSections/SpinWheelGame";
import { MemoryGame }       from "@/components/LetterSections/MemoryGame";
import { SpeedReadGame }    from "@/components/LetterSections/SpeedReadGame";
import { LetterDetective }   from "@/components/LetterSections/LetterDetective";
import { ColorMixerGame }   from "@/components/Games/ColorMixerGame";

type LetterKey = keyof typeof FULL_DB;

export default function LetterScreen() {
  const params = useParams();
  const router = useRouter();
  const { addStars } = useAppContext();

  const letterId = decodeURIComponent(params.id as string);
  const letterData = FULL_DB[letterId as LetterKey];
  const rule = letterData ? getLetterRule(letterId) : null;

  const [activeSection, setActiveSection] = useState(0);
  const [currentStage, setCurrentStage] = useState<StageType>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fullscreen Scaling Logic
  useEffect(() => {
    if (!isFullscreen) {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = "";
        wrapperRef.current.style.width = "";
      }
      return;
    }

    const handleResize = () => {
      if (!wrapperRef.current) return;
      const winW = window.innerWidth - 40; // 20px padding on each side
      const winH = window.innerHeight - 40;
      const naturalW = 1000;
      const naturalH = 700;

      const scale = Math.min(winW / naturalW, winH / naturalH, 1.5); // Max scale 1.5
      wrapperRef.current.style.width = `${naturalW}px`;
      wrapperRef.current.style.transform = `scale(${scale})`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen, activeSection]);

  const toggleFullscreen = () => {
    const next = !isFullscreen;
    setIsFullscreen(next);
    if (next) {
      document.documentElement.classList.add("has-phaser-fs");
    } else {
      document.documentElement.classList.remove("has-phaser-fs");
    }
  };

  const playTone = (frequency: number, type: OscillatorType, duration: number, volume: number) => {
    if (typeof window === "undefined") return;

    const AudioContextCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = volume;

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
    oscillator.onended = () => ctx.close();
  };

  const playBeep = () => {
    playTone(300, "square", 0.15, 0.1);
  };

  const playRawSound = () => {
    playTone(350, "sawtooth", 0.2, 0.1);
    window.setTimeout(() => playTone(350, "sawtooth", 0.2, 0.1), 300);
    window.setTimeout(() => playTone(350, "sawtooth", 0.2, 0.1), 600);
  };

  const playHeroLetter = () => {
    playBeep();
    speakAr(letterId);
  };

  const handleSoundCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    playRawSound();
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
    
    const sectionsInCurrentStage = SECTIONS.filter(s => s.stage === currentStage);
    const currentSectionIndex = SECTIONS.findIndex(s => s.id === SECTIONS[activeSection].id);
    const isLastSectionInStage = activeSection === SECTIONS.length - 1 || 
                                  SECTIONS[activeSection + 1]?.stage !== currentStage;

    if (isLastSectionInStage && currentStage < 3) {
      // Show level up celebration
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    } else if (isLastSectionInStage && currentStage === 3) {
      // Completed all stages
      alert("🎉 أحسنت! أتممت رحلة الحرف بنجاح!");
      router.push("/journey/arabic");
    } else {
      setActiveSection((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLevelUp = () => {
    addStars(50);
    if (currentStage < 3) {
      setCurrentStage((p) => (p + 1) as StageType);
      const nextStageFirstSection = SECTIONS.findIndex(s => s.stage === currentStage + 1);
      setActiveSection(nextStageFirstSection);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredSections = SECTIONS.filter(s => s.stage <= currentStage);
  const visibleSections = SECTIONS.filter(s => s.stage === currentStage);

  const progress = (filteredSections.findIndex(s => s.id === SECTIONS[activeSection]?.id) + 1 / filteredSections.length) * 100;

  // Common props for all section components
  const sectionProps: SectionProps = { letterId, letterData: letterData as LetterEntry, onComplete: goNext };

  const currentSectionStage = SECTIONS[activeSection]?.stage || 1;
  const isLastSectionInStage = currentSectionStage < 3 && 
                               (activeSection === SECTIONS.length - 1 || 
                                SECTIONS[activeSection + 1]?.stage !== currentSectionStage);

  const stageTitle = currentStage === 1 ? "المرحلة الأولى" : 
                     currentStage === 2 ? "المرحلة الثانية" : 
                     "المرحلة الثالثة";

  return (
    <div id="letter-screen" style={{ display: "block" }}>
      <div className="letter-layout">

        {/* ── Sidebar ─────────────────────────────── */}
        <div className="letter-sidebar">
          {SECTIONS.filter(s => s.stage <= currentStage).map((sec, idx) => {
            const actualIndex = SECTIONS.findIndex(s => s.id === sec.id);
            return (
              <div key={sec.id}
                className={`ls-nav-item ${activeSection === actualIndex ? "active" : ""} ${activeSection > actualIndex ? "completed" : ""}`}
                onClick={() => { if (actualIndex <= activeSection) setActiveSection(actualIndex); }}
                style={{ cursor: actualIndex <= activeSection ? "pointer" : "default" }}>
                <div className="ls-icon">
                  {activeSection > actualIndex
                    ? <i className="fas fa-check-circle" style={{ color: "#10b981" }} />
                    : <i className={`fas ${sec.icon}`} />}
                </div>
                <div className="ls-text">{sec.title}</div>
              </div>
            );
          })}
        </div>

        {/* ── Main ─────────────────────────────────── */}
        <div className="letter-main">
            <div className="letter-top-bar">
              <div className="lt-title">
                رحلة الحرف: <span style={{ color: "var(--primary,#185FA5)", fontSize: "1.4em" }}>{letterId}</span>
                <span style={{ fontSize: "0.85em", marginRight: "12px", opacity: 0.7 }}>({stageTitle})</span>
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
              <div className="fs-content-wrapper" ref={wrapperRef}>

            {/* ══ CELEBRATION OVERLAY ══ */}
            {showCelebration && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                animation: "fadeIn 0.3s ease"
              }}>
                <div style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px",
                  textAlign: "center",
                  animation: "bounce 0.6s ease"
                }}>
                  <div style={{ fontSize: "5rem", marginBottom: "20px" }}>🎉</div>
                  <h2 style={{ fontSize: "2rem", color: "#185FA5", marginBottom: "20px", fontFamily: "var(--font-tajawal)" }}>
                    أحسنت! لقد أكملت المرحلة!
                  </h2>
                  <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "20px" }}>+50 نقطة!</p>
                  <button 
                    onClick={handleLevelUp}
                    style={{
                      background: "linear-gradient(135deg, #185FA5, #0e3a6f)",
                      color: "white",
                      border: "none",
                      padding: "12px 32px",
                      fontSize: "1.1rem",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-tajawal)",
                      fontWeight: "bold"
                    }}>
                    Level Up! ⬆️
                  </button>
                </div>
              </div>
            )}

            {/* ══ 1: HERO ══ */}
            {activeSection === 0 && (
              <div className="section-content">
                <div className="hero-box letter-hero animate-up" data-theme="vibrant" data-section="dna">
                  <div className="hero-badge">🧬 VIBRANT DNA — جينات الحرف</div>

                  <div className="hero-root" id="ui-hero-letter" onClick={playHeroLetter}>
                    {letterId}
                  </div>
                  <div className="hero-tap-hint">👆 Tap to listen</div>

                  <div
                    className="sound-card"
                    onClick={playRawSound}
                    onKeyDown={handleSoundCardKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-label="Play letter sound"
                  >
                    <div className="sound-card-head">
                      <span className="sound-card-icon">🔊</span>
                      <span className="sound-card-label">Sound · الـنُّـطْـق</span>
                    </div>
                    <div className="sound-card-val" id="ui-jolly-sound" dangerouslySetInnerHTML={{ __html: letterData.jollyRawSound }} />
                    <div className="sound-card-hint">اضغط للاستماع</div>
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

            {/* ══ 8: SPLIT WORDS — Connected Words ══ */}
            {activeSection === 7 && (
              <XOWordGame words={letterData.splitWords} title="التركيب — Connected Words XO" badge="8" onComplete={goNext} />
            )}

            {/* ══ 9: SPIN WHEEL ══ */}
            {activeSection === 8 && <SpinWheelGame {...sectionProps} />}

            {/* ══ 10: COLOR MIXER GAME ══ */}
            {activeSection === 9 && (
              <div className="section-content">
                <ColorMixerGame onComplete={goNext} />
              </div>
            )}

            {/* ══ 11: TRICKY CUPS ══ */}
            {activeSection === 10 && (
              <div className="section-content" style={{ textAlign: "center" }}>
                <div className="section-heading" style={{ marginBottom: "24px" }}>
                  <span className="section-badge">🥤</span> Tricky Cups — اتبع الكلمة!
                </div>
                <div style={{ fontSize: "5rem", marginBottom: "24px" }}>🥤🥤🥤</div>
                <p style={{ fontSize: "1.2rem", marginBottom: "32px", color: "var(--text-muted)" }}>
                  قريباً: لعبة تتبع الكلمة المخفية تحت الأكواب!
                </p>
                <button className="btn-primary" onClick={goNext}>التالي <i className="fas fa-arrow-left" /></button>
              </div>
            )}

            {/* ══ 12: MEMORY ══ */}
            {activeSection === 11 && <MemoryGame {...sectionProps} />}

            {/* ══ 13: SPEED READ ══ */}
            {activeSection === 12 && <SpeedReadGame {...sectionProps} />}

            {/* ══ 14: ARABIC STORY ══ */}
            {activeSection === 13 && (
              <div className="section-content" style={{ textAlign: "center" }}>
                <div className="section-heading" style={{ marginBottom: "24px" }}><span className="section-badge">📖</span> قصة الحرف</div>
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

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
