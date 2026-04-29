"use client";
import React, { useState, useCallback } from "react";
import { speakAr } from "@/lib/speech";

interface LessonWord {
  word: string;
  meaning?: string;
  meaningEn?: string;
  breakdown?: string;
}

interface Exercise {
  prompt: string;
  promptEn: string;
  options: string[];
  correct: number;
}

interface ReadingStageLessonProps {
  icon: string;
  title: string;
  titleEn: string;
  introSymbol: string;
  introTitle: string;
  introTitleEn: string;
  introDesc: string;
  introDescEn: string;
  introRule: string;
  introRuleEn: string;
  accentColor: string;
  lessons: {
    id: string;
    title: string;
    titleEn: string;
    color?: string;
    examples: LessonWord[];
    exercises: Exercise[];
  }[];
}

type Phase = "intro" | "learn" | "exercise" | "results";

export function ReadingStageLesson({
  icon, title, titleEn, introSymbol, introTitle, introTitleEn,
  introDesc, introDescEn, introRule, introRuleEn, accentColor, lessons,
}: ReadingStageLessonProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const lesson = lessons[lessonIdx];
  const exercise = lesson?.exercises[exIdx];

  const handlePick = useCallback((idx: number) => {
    if (answer !== null) return;
    setAnswer(idx);
    setTotalAnswered((t) => t + 1);
    if (idx === exercise.correct) setScore((s) => s + 1);
  }, [answer, exercise]);

  const nextExercise = useCallback(() => {
    if (exIdx + 1 < lesson.exercises.length) {
      setExIdx((i) => i + 1);
      setAnswer(null);
    } else if (lessonIdx + 1 < lessons.length) {
      setLessonIdx((i) => i + 1);
      setExIdx(0);
      setAnswer(null);
      setPhase("learn");
    } else {
      setPhase("results");
    }
  }, [exIdx, lesson, lessonIdx, lessons.length]);

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{icon}</div>
          <h2 style={{ fontFamily: "var(--font-tajawal), sans-serif", color: accentColor, margin: "0 0 4px", fontSize: "2rem" }}>{introTitle}</h2>
          <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.9rem" }}>{introTitleEn}</div>
        </div>

        {/* Symbol display */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div onClick={() => speakAr(introSymbol.replace(/[^\u0600-\u06FF]/g, ""), 0.6)}
            style={{ display: "inline-block", fontFamily: "var(--font-noto-naskh), serif", fontSize: "5rem", color: accentColor, cursor: "pointer", background: `${accentColor}10`, border: `3px solid ${accentColor}`, borderRadius: "24px", padding: "16px 40px", lineHeight: 1.3 }}>
            {introSymbol}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px" }}>اضغط للاستماع — Tap to listen 🔊</div>
        </div>

        {/* Description */}
        <div style={{ background: `${accentColor}08`, border: `2px solid ${accentColor}40`, borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.1rem", color: "var(--text)", direction: "rtl", lineHeight: 1.8, margin: "0 0 8px" }}>{introDesc}</p>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>{introDescEn}</p>
        </div>

        {/* Rule */}
        <div style={{ background: "#fefce8", border: "2px solid #fbbf24", borderRadius: "16px", padding: "16px", textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "0.8rem", color: "#92400e", fontWeight: 700, marginBottom: "4px" }}>📐 القاعدة — Rule</div>
          <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.1rem", color: "#78350f", direction: "rtl" }}>{introRule}</div>
          <div style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "#92400e", marginTop: "4px" }}>{introRuleEn}</div>
        </div>

        {/* Lesson cards */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "24px" }}>
          {lessons.map((l, i) => (
            <div key={l.id} style={{ background: `${l.color || accentColor}10`, border: `2px solid ${l.color || accentColor}`, borderRadius: "14px", padding: "12px 18px", textAlign: "center", minWidth: "140px" }}>
              <div style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 700, color: l.color || accentColor, fontSize: "0.9rem" }}>{l.title}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{l.titleEn}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>{l.examples.length} كلمات • {l.exercises.length} تمارين</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="btn-primary" onClick={() => setPhase("learn")} style={{ background: accentColor }}>
            ابدأ التعلم — Start Learning <i className="fas fa-arrow-left" />
          </button>
        </div>
      </div>
    );
  }

  // ── LEARN ──
  if (phase === "learn") {
    const lColor = lesson.color || accentColor;
    return (
      <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "8px" }}>
            الدرس {lessonIdx + 1} / {lessons.length}
          </div>
          <h3 style={{ fontFamily: "var(--font-tajawal), sans-serif", color: lColor, margin: "0 0 4px", fontSize: "1.4rem" }}>{lesson.title}</h3>
          <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.8rem" }}>{lesson.titleEn}</div>
        </div>

        {/* Progress */}
        <div style={{ maxWidth: "300px", margin: "0 auto 24px", background: "var(--border, #e5e7eb)", borderRadius: "100px", height: "6px" }}>
          <div style={{ width: `${((lessonIdx) / lessons.length) * 100}%`, height: "100%", background: lColor, borderRadius: "100px", transition: "width 0.4s" }} />
        </div>

        {/* Word cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {lesson.examples.map((ex, i) => (
            <div key={i} onClick={() => speakAr(ex.word, 0.7)}
              style={{ background: `${lColor}08`, border: `2px solid ${lColor}30`, borderRadius: "16px", padding: "16px 12px", textAlign: "center", cursor: "pointer", transition: "transform 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
              <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.8rem", color: lColor, direction: "rtl", marginBottom: "6px" }}>{ex.word}</div>
              {ex.meaning && <div style={{ fontSize: "0.8rem", color: "var(--text)", fontFamily: "var(--font-noto-naskh), sans-serif" }}>{ex.meaning}</div>}
              {ex.meaningEn && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "sans-serif" }}>{ex.meaningEn}</div>}
              {ex.breakdown && <div style={{ fontSize: "0.65rem", color: lColor, fontFamily: "monospace", marginTop: "4px" }}>{ex.breakdown}</div>}
              <div style={{ fontSize: "0.9rem", marginTop: "4px" }}>🔊</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="btn-primary" onClick={() => { setExIdx(0); setAnswer(null); setPhase("exercise"); }} style={{ background: lColor }}>
            ابدأ التمارين — Start Exercises <i className="fas fa-arrow-left" />
          </button>
        </div>
      </div>
    );
  }

  // ── EXERCISE ──
  if (phase === "exercise" && exercise) {
    const lColor = lesson.color || accentColor;
    const isCorrect = answer === exercise.correct;
    return (
      <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "16px" }}>
          📝 تمرين {exIdx + 1} / {lesson.exercises.length} — {lesson.title}
        </div>

        <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.3rem", color: "var(--text)", direction: "rtl", marginBottom: "8px", lineHeight: 1.8 }}>{exercise.prompt}</div>
        <div style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "24px" }}>{exercise.promptEn}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", maxWidth: "400px", margin: "0 auto 24px" }}>
          {exercise.options.map((opt, i) => {
            let bg = "var(--surface, #fff)";
            let border = "2px solid var(--border, #e5e7eb)";
            if (answer !== null) {
              if (i === exercise.correct) { bg = "#d1fae5"; border = "2.5px solid #10b981"; }
              else if (i === answer) { bg = "#fee2e2"; border = "2.5px solid #ef4444"; }
            }
            return (
              <button key={i} onClick={() => { handlePick(i); speakAr(opt, 0.7); }}
                style={{ background: bg, border, borderRadius: "14px", padding: "16px", cursor: answer !== null ? "default" : "pointer", fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.3rem", direction: "rtl", fontWeight: 700, transition: "all 0.2s" }}>
                {opt}
              </button>
            );
          })}
        </div>

        {answer !== null && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "12px" }}>{isCorrect ? "✅ ممتاز! — Excellent!" : "❌ الإجابة الصحيحة — Correct answer:"}</div>
            {!isCorrect && (
              <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.4rem", color: "#065f46" }}>{exercise.options[exercise.correct]}</div>
            )}
            <button className="btn-primary" onClick={nextExercise} style={{ marginTop: "16px", background: lColor }}>
              التالي — Next <i className="fas fa-arrow-left" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS ──
  const pct = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 100;
  return (
    <div style={{ padding: "40px 24px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "5rem", marginBottom: "12px" }}>{pct >= 80 ? "🌟" : pct >= 50 ? "👍" : "💪"}</div>
      <h2 style={{ fontFamily: "var(--font-tajawal), sans-serif", color: accentColor, marginBottom: "8px" }}>
        {pct >= 80 ? "ممتاز!" : pct >= 50 ? "جيد جداً!" : "حاول مرة أخرى!"}
      </h2>
      <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.9rem", marginBottom: "20px" }}>
        {pct >= 80 ? "Excellent!" : pct >= 50 ? "Great job!" : "Keep practicing!"}
      </div>
      <div style={{ fontSize: "2.5rem", fontWeight: 900, color: accentColor, marginBottom: "8px" }}>{score}/{totalAnswered}</div>
      <div style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "28px" }}>{pct}%</div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button className="btn-secondary" onClick={() => { setPhase("intro"); setLessonIdx(0); setExIdx(0); setAnswer(null); setScore(0); setTotalAnswered(0); }}>
          <i className="fas fa-rotate-right" /> إعادة — Retry
        </button>
      </div>
    </div>
  );
}
