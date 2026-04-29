"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { READING_DATA } from "@/data/readingData";
import { SyllableExercise } from "@/components/ReadingStages/SyllableExercise";
import { WordReadExercise } from "@/components/ReadingStages/WordReadExercise";
import { SentenceBuilder } from "@/components/ReadingStages/SentenceBuilder";
import { useAppContext } from "@/context/AppContext";

export default function ReadingJourneyPage() {
  const router = useRouter();
  const { addStars } = useAppContext();
  const [activeLessonIdx, setActiveLessonIdx] = useState<number | null>(null);

  const handleComplete = () => {
    addStars(50);
    setActiveLessonIdx(null);
  };

  if (activeLessonIdx !== null) {
    const lesson = READING_DATA[activeLessonIdx];
    return (
      <div style={{ padding: "80px 20px" }}>
        <button className="btn-secondary" onClick={() => setActiveLessonIdx(null)} style={{ marginBottom: "20px" }}>
          <i className="fas fa-arrow-right" /> العودة — Back
        </button>
        
        {lesson.type === "syllables" && <SyllableExercise items={lesson.items} onComplete={handleComplete} />}
        {lesson.type === "words" && <WordReadExercise items={lesson.items} onComplete={handleComplete} />}
        {lesson.type === "sentences" && <SentenceBuilder items={lesson.items} onComplete={handleComplete} />}
      </div>
    );
  }

  return (
    <div id="home-screen" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
      <div className="home-header">
        <div className="home-logo">
          <img src="/logo-optimized.png" alt="Jamea Logo" decoding="async" />
        </div>
        <h1 style={{ fontFamily: "var(--font-tajawal)", color: "var(--primary)", fontSize: "2.5rem" }}>
          رحلة القراءة
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Reading Journey — From Syllables to Sentences
        </p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        <div className="learning-journey">
          <div className="journey-line"></div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "40px", position: "relative", zIndex: 2 }}>
            {READING_DATA.map((lesson, i) => (
              <div key={lesson.id} 
                onClick={() => setActiveLessonIdx(i)}
                style={{ 
                  background: "#fff", 
                  border: "2px solid var(--border)", 
                  borderRadius: "24px", 
                  padding: "24px", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
              >
                <div style={{ 
                  width: "60px", 
                  height: "60px", 
                  background: i % 2 === 0 ? "var(--primary)" : "var(--green)", 
                  color: "#fff", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 900
                }}>
                  {i + 1}
                </div>
                
                <div style={{ textAlign: "right", flex: 1 }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-tajawal)", color: "var(--text)" }}>{lesson.title}</h3>
                  <p style={{ margin: "4px 0 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>{lesson.titleEn}</p>
                </div>
                
                <div style={{ fontSize: "1.5rem", color: "var(--border)" }}>
                  <i className="fas fa-chevron-left" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <button className="btn-primary" onClick={() => router.push("/journey/arabic")}>
            العودة للخريطة الرئيسية — Main Map
          </button>
        </div>
      </div>
    </div>
  );
}
