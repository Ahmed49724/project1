"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StageHero from "@/components/StageSections/StageHero";
import StageMotorsSection from "@/components/StageSections/StageMotorsSection";
import StageDetectiveSection from "@/components/StageSections/StageDetectiveSection";
import StageQuestionTools from "@/components/StageSections/StageQuestionTools";
import StageMissingMarkGame from "@/components/StageSections/StageMissingMarkGame";
import { MemoryGame } from "@/components/LetterSections/MemoryGame";
import { SpeedReadGame } from "@/components/LetterSections/SpeedReadGame";
import { SpinWheelGame } from "@/components/LetterSections/SpinWheelGame";
import { XOWordGame } from "@/components/LetterSections/XOWordGame";
import { ColorMixerGame } from "@/components/Games/ColorMixerGame";
import type { StageData } from "@/data/stageData";

interface StageScreenProps {
  stageData: StageData;
  onComplete?: () => void;
}

const SECTION_ORDER = [
  { id: "hero", label: "DNA", icon: "🧬" },
  { id: "motors", label: "Motors", icon: "⚙️" },
  { id: "shapes", label: "Shapes", icon: "🔤" },
  { id: "detective", label: "Detective", icon: "🕵️‍♂️" },
  { id: "questions", label: "Questions", icon: "❓" },
  { id: "practice", label: "Practice", icon: "🟩" },
  { id: "review", label: "Review", icon: "🟦" },
  { id: "missing", label: "Missing", icon: "🧩" },
  { id: "spin", label: "Football", icon: "⚽" },
  { id: "colors", label: "Colors", icon: "🎨" },
  { id: "memory", label: "Memory", icon: "🧠" },
  { id: "speed", label: "Speed", icon: "⏱️" },
  { id: "story", label: "Story", icon: "📖" },
  { id: "build", label: "Build", icon: "🧱" },
  { id: "bonus", label: "Bonus", icon: "🏅" },
];

export default function StageScreen({ stageData, onComplete }: StageScreenProps) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionIndex = Math.min(activeSection, SECTION_ORDER.length - 1);

  const stageDescription = useMemo(() => {
    return stageData.examples.slice(0, 5).join(" · ");
  }, [stageData.examples]);

  const goNext = () => {
    if (activeSection < SECTION_ORDER.length - 1) {
      setActiveSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onComplete?.();
    }
  };

  return (
    <div id="stage-screen" style={{ padding: "32px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div className="stage-layout">
        <aside className="stage-sidebar">
          <div className="stage-sidebar-header">
            <div className="section-heading" style={{ marginBottom: "14px" }}>
              رحلة المرحلة
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>
              {stageData.title}
            </div>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
              {stageData.description}
            </p>
            <p style={{ marginTop: "16px", color: "var(--text-muted)" }}>
              {stageDescription}
            </p>
          </div>

          <div className="stage-nav-list">
            {SECTION_ORDER.map((section, idx) => {
              const completed = idx < activeSection;
              const isActive = idx === activeSection;
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`stage-nav-item ${isActive ? "active" : ""} ${completed ? "completed" : ""}`}
                  onClick={() => idx <= activeSection && setActiveSection(idx)}
                >
                  <span className="stage-nav-icon">{section.icon}</span>
                  <span className="stage-nav-text">{section.label}</span>
                </button>
              );
            })}
          </div>

          <Link href="/journey/arabic" className="btn-secondary stage-return-btn">
            العودة إلى الخريطة
          </Link>
        </aside>

        <main className="stage-main">
          <div className="stage-top-bar">
            <div className="stage-title">مسار {stageData.title}</div>
            <div className="stage-progress">
              <div className="stage-progress-track">
                <div
                  className="stage-progress-fill"
                  style={{ width: `${((sectionIndex + 1) / SECTION_ORDER.length) * 100}%`, background: stageData.color }}
                />
              </div>
            </div>
          </div>

          <div className="stage-content-area">
            {activeSection === 0 && <StageHero stageData={stageData} onNext={goNext} />}
            {activeSection === 1 && <StageMotorsSection stageData={stageData} onNext={goNext} />}
            {activeSection === 2 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">🔤</span> الأشكال والتراكيب
                </div>
                <p style={{ color: "var(--text-muted)", marginBottom: "18px" }}>
                  هذه الكلمات توضح كيف يظهر علامة المرحلة في سياق الكلمات.
                </p>
                <div className="stage-pattern-grid">
                  {stageData.examples.map((word) => (
                    <div key={word} className="stage-pattern-card">
                      {word}
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "28px" }}>
                  <button className="btn-primary" onClick={goNext}>
                    التالي <i className="fas fa-arrow-left" />
                  </button>
                </div>
              </section>
            )}
            {activeSection === 3 && <StageDetectiveSection stageData={stageData} />}
            {activeSection === 4 && <StageQuestionTools stageData={stageData} />}
            {activeSection === 5 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">🟩</span> التدريب الأول
                </div>
                <XOWordGame words={stageData.practiceWords} title="لعبة الحروف" badge="🟩" onComplete={() => setActiveSection(6)} />
              </section>
            )}
            {activeSection === 6 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">🟦</span> التدريب الثاني
                </div>
                <XOWordGame words={stageData.reviewWords} title="التدريب الثاني" badge="🟦" onComplete={() => setActiveSection(7)} />
              </section>
            )}
            {activeSection === 7 && <StageMissingMarkGame stageData={stageData} />}
            {activeSection === 8 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">⚽</span> كرة القدم — Word Spin
                </div>
                <SpinWheelGame letterData={stageData} onComplete={() => setActiveSection(9)} />
              </section>
            )}
            {activeSection === 9 && (
              <section className="section-content">
                <ColorMixerGame onComplete={goNext} />
              </section>
            )}
            {activeSection === 10 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">🧠</span> لعبة الذاكرة
                </div>
                <MemoryGame letterData={stageData} onComplete={() => setActiveSection(11)} />
              </section>
            )}
            {activeSection === 11 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">⏱️</span> قراءة سريعة
                </div>
                <SpeedReadGame letterData={stageData} onComplete={() => setActiveSection(12)} />
              </section>
            )}
            {activeSection === 12 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">📖</span> قصة المرحلة
                </div>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{stageData.storyText}</p>
                <div style={{ textAlign: "center", marginTop: "28px" }}>
                  <button className="btn-primary" onClick={goNext}>
                    التالي <i className="fas fa-arrow-left" />
                  </button>
                </div>
              </section>
            )}
            {activeSection === 13 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">🧱</span> تركيب الكلمات
                </div>
                <div className="stage-split-grid">
                  {stageData.splitWords.map((part) => (
                    <div key={part} className="stage-split-box">
                      {part}
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "28px" }}>
                  <button className="btn-primary" onClick={goNext}>
                    التالي <i className="fas fa-arrow-left" />
                  </button>
                </div>
              </section>
            )}
            {activeSection === 14 && (
              <section className="section-content">
                <div className="section-heading">
                  <span className="section-badge">🏅</span> تحدي المرحلة
                </div>
                <div className="stage-quiz-grid">
                  {stageData.quickQuiz.map((quiz, idx) => (
                    <div key={idx} className="stage-quiz-card">
                      <div className="stage-quiz-title">{idx + 1}. {quiz.prompt}</div>
                      <div className="stage-quiz-options">
                        {quiz.options.map((option, optionIndex) => (
                          <button key={optionIndex} className="btn-secondary" type="button">
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "28px" }}>
                  <button className="btn-primary" onClick={goNext}>
                    إتمام المرحلة <i className="fas fa-arrow-left" />
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
