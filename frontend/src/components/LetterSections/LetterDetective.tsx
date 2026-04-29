"use client";
import React, { useState, useCallback, useMemo } from "react";
import type { SectionProps } from "@/types/letter";
import { DETECTIVE_DATA } from "@/data/db";
import { speakAr } from "@/lib/speech";

type Phase = "intro" | "visual" | "sound" | "spy" | "results";

interface DetectiveEntry {
  type: "visual" | "sound";
  target: string;
  compareWith: string;
  dots?: { target: string; compare: string };
  weight?: { heavy: string; light: string };
  labels?: { light: string; heavy: string };
  spyPool?: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function LetterDetective({ letterId, letterData, onComplete }: SectionProps) {
  // Get detective data — support both array and single-object format
  const rawData = DETECTIVE_DATA[letterId as keyof typeof DETECTIVE_DATA];
  const entries = useMemo(() => {
    if (!rawData) return [] as DetectiveEntry[];
    const arr = Array.isArray(rawData) ? rawData : [rawData];
    return arr as unknown as DetectiveEntry[];
  }, [rawData]);

  const visualEntries = useMemo(() => entries.filter((e) => e.type === "visual"), [entries]);
  const soundEntries = useMemo(() => entries.filter((e) => e.type === "sound"), [entries]);

  // Spy pool from FULL_DB detective or build from entries
  const spyPool = useMemo(() => {
    if (letterData.detective?.spyPool) return shuffle(letterData.detective.spyPool);
    // Build a pool from visual entries
    const pool: string[] = [];
    for (let i = 0; i < 3; i++) pool.push(letterId);
    visualEntries.forEach((e) => { pool.push(e.compareWith); pool.push(e.compareWith); });
    if (pool.length < 6) {
      for (let i = pool.length; i < 6; i++) pool.push(letterId);
    }
    return shuffle(pool);
  }, [letterId, letterData.detective, visualEntries]);

  const [phase, setPhase] = useState<Phase>("intro");

  // Visual discrimination state
  const [viIdx, setViIdx] = useState(0);
  const [viAnswer, setViAnswer] = useState<string | null>(null);
  const [viScore, setViScore] = useState(0);

  // Sound discrimination state
  const [soIdx, setSoIdx] = useState(0);
  const [soAnswer, setSoAnswer] = useState<string | null>(null);
  const [soScore, setSoScore] = useState(0);

  // Spy mode state
  const [spyFound, setSpyFound] = useState<number[]>([]);
  const [spyWrong, setSpyWrong] = useState<number[]>([]);

  // Total score
  const totalQuestions = visualEntries.length + soundEntries.length + spyPool.filter((l) => l === letterId).length;
  const totalScore = viScore + soScore + spyFound.length;

  // ── Visual handlers ──
  const handleVisualPick = useCallback((picked: string) => {
    if (viAnswer) return;
    setViAnswer(picked);
    const entry = visualEntries[viIdx];
    if (picked === entry.target) {
      setViScore((s) => s + 1);
      speakAr(entry.target);
    }
  }, [viAnswer, viIdx, visualEntries]);

  const nextVisual = useCallback(() => {
    if (viIdx + 1 < visualEntries.length) {
      setViIdx((i) => i + 1);
      setViAnswer(null);
    } else {
      // Move to sound or spy
      if (soundEntries.length > 0) setPhase("sound");
      else setPhase("spy");
    }
  }, [viIdx, visualEntries.length, soundEntries.length]);

  // ── Sound handlers ──
  const handleSoundPick = useCallback((picked: string) => {
    if (soAnswer) return;
    setSoAnswer(picked);
    const entry = soundEntries[soIdx];
    if (picked === entry.target) {
      setSoScore((s) => s + 1);
      speakAr(entry.target);
    }
  }, [soAnswer, soIdx, soundEntries]);

  const nextSound = useCallback(() => {
    if (soIdx + 1 < soundEntries.length) {
      setSoIdx((i) => i + 1);
      setSoAnswer(null);
    } else {
      setPhase("spy");
    }
  }, [soIdx, soundEntries.length]);

  // ── Spy handlers ──
  const handleSpyTap = useCallback((idx: number) => {
    if (spyFound.includes(idx) || spyWrong.includes(idx)) return;
    if (spyPool[idx] === letterId) {
      setSpyFound((f) => [...f, idx]);
      speakAr(letterId);
    } else {
      setSpyWrong((w) => [...w, idx]);
    }
  }, [spyFound, spyWrong, spyPool, letterId]);

  const spyTargetCount = spyPool.filter((l) => l === letterId).length;
  const spyDone = spyFound.length === spyTargetCount;

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <div className="section-content" style={{ textAlign: "center" }}>
        <div className="section-heading" style={{ marginBottom: "16px" }}>
          <span className="section-badge">🕵️</span> المحقق — Letter Detective
        </div>
        <div style={{ fontSize: "5rem", marginBottom: "16px" }}>🔍</div>
        <p style={{ fontFamily: "var(--font-noto-naskh), sans-serif", fontSize: "1.2rem", color: "var(--text, #1f2937)", maxWidth: "500px", margin: "0 auto 12px", lineHeight: 1.8 }}>
          هل تستطيع أن تميّز الحرف <strong style={{ color: "var(--primary, #185FA5)", fontSize: "1.6rem" }}>{letterId}</strong> عن الحروف المشابهة؟
        </p>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 28px" }}>
          Can you tell the letter <strong>{letterId}</strong> apart from similar-looking and similar-sounding letters?
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginBottom: "28px" }}>
          {visualEntries.length > 0 && (
            <div style={infoBadge("#3b82f6")}>
              <span style={{ fontSize: "1.3rem" }}>👁️</span>
              <span>{visualEntries.length} تمييز بصري</span>
              <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>Visual</span>
            </div>
          )}
          {soundEntries.length > 0 && (
            <div style={infoBadge("#10b981")}>
              <span style={{ fontSize: "1.3rem" }}>👂</span>
              <span>{soundEntries.length} تمييز صوتي</span>
              <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>Sound</span>
            </div>
          )}
          <div style={infoBadge("#f59e0b")}>
            <span style={{ fontSize: "1.3rem" }}>🔎</span>
            <span>صيد الحروف</span>
            <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>Spy Mode</span>
          </div>
        </div>

        <button className="btn-primary" onClick={() => setPhase(visualEntries.length > 0 ? "visual" : soundEntries.length > 0 ? "sound" : "spy")}>
          ابدأ التحقيق! 🕵️ <i className="fas fa-arrow-left" />
        </button>
      </div>
    );
  }

  // ── VISUAL PHASE ──
  if (phase === "visual" && visualEntries.length > 0) {
    const entry = visualEntries[viIdx];
    const options = shuffle([entry.target, entry.compareWith]);
    const isCorrect = viAnswer === entry.target;
    const isWrong = viAnswer !== null && !isCorrect;

    return (
      <div className="section-content" style={{ textAlign: "center" }}>
        <div className="section-heading" style={{ marginBottom: "8px" }}>
          <span className="section-badge">👁️</span> التمييز البصري — Visual Discrimination
        </div>
        <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "24px" }}>
          Question {viIdx + 1} / {visualEntries.length} — أيهما هو الحرف <strong style={{ fontSize: "1.2rem" }}>{entry.target}</strong>؟
        </div>

        {/* Progress */}
        <div style={{ maxWidth: "300px", margin: "0 auto 24px", background: "var(--border, #e5e7eb)", borderRadius: "100px", height: "6px" }}>
          <div style={{ width: `${(viIdx / visualEntries.length) * 100}%`, height: "100%", background: "#3b82f6", borderRadius: "100px", transition: "width 0.4s" }} />
        </div>

        {/* Hint */}
        {entry.dots && (
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
            <div style={hintBox("#3b82f6")}>
              <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem" }}>{entry.target}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700 }}>{entry.dots.target}</div>
            </div>
            <div style={{ alignSelf: "center", fontSize: "1.5rem", color: "var(--text-muted)" }}>VS</div>
            <div style={hintBox("#ef4444")}>
              <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem" }}>{entry.compareWith}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700 }}>{entry.dots.compare}</div>
            </div>
          </div>
        )}

        {/* Choose the correct letter */}
        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "16px" }}>
          اختر الحرف الصحيح — Pick the correct letter:
        </div>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginBottom: "24px" }}>
          {options.map((opt) => {
            let bg = "var(--surface, #fff)";
            let border = "3px solid var(--border, #e5e7eb)";
            if (viAnswer) {
              if (opt === entry.target) { bg = "#d1fae5"; border = "3px solid #10b981"; }
              else if (opt === viAnswer) { bg = "#fee2e2"; border = "3px solid #ef4444"; }
            }
            return (
              <button key={opt} onClick={() => handleVisualPick(opt)}
                style={{ background: bg, border, borderRadius: "24px", width: "120px", height: "120px", cursor: viAnswer ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-noto-naskh), serif", fontSize: "4rem", color: "var(--text, #1f2937)", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                onMouseEnter={(e) => !viAnswer && (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {viAnswer && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{isCorrect ? "✅ ممتاز! — Excellent!" : "❌ حاول مرة أخرى — Try again"}</div>
            {isWrong && entry.dots && (
              <div style={{ color: "#065f46", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
                الفرق: <strong>{entry.target}</strong> → {entry.dots.target} | <strong>{entry.compareWith}</strong> → {entry.dots.compare}
              </div>
            )}
            <button className="btn-primary" onClick={nextVisual} style={{ marginTop: "16px" }}>
              {viIdx + 1 < visualEntries.length ? "التالي — Next" : "المرحلة التالية"} <i className="fas fa-arrow-left" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── SOUND PHASE ──
  if (phase === "sound" && soundEntries.length > 0) {
    const entry = soundEntries[soIdx];
    const options = shuffle([entry.target, entry.compareWith]);
    const isCorrect = soAnswer === entry.target;
    const isWrong = soAnswer !== null && !isCorrect;

    return (
      <div className="section-content" style={{ textAlign: "center" }}>
        <div className="section-heading" style={{ marginBottom: "8px" }}>
          <span className="section-badge">👂</span> التمييز الصوتي — Sound Discrimination
        </div>
        <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "24px" }}>
          Question {soIdx + 1} / {soundEntries.length} — اسمع واختر الحرف الصحيح
        </div>

        {/* Progress */}
        <div style={{ maxWidth: "300px", margin: "0 auto 24px", background: "var(--border, #e5e7eb)", borderRadius: "100px", height: "6px" }}>
          <div style={{ width: `${(soIdx / soundEntries.length) * 100}%`, height: "100%", background: "#10b981", borderRadius: "100px", transition: "width 0.4s" }} />
        </div>

        {/* Labels info */}
        {entry.labels && (
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ ...infoBadge("#8b5cf6"), minWidth: "120px" }}>
              <span style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.4rem" }}>{entry.target}</span>
              <span style={{ fontSize: "0.75rem" }}>{entry.labels.light}</span>
            </div>
            <div style={{ alignSelf: "center", color: "var(--text-muted)" }}>VS</div>
            <div style={{ ...infoBadge("#ec4899"), minWidth: "120px" }}>
              <span style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.4rem" }}>{entry.compareWith}</span>
              <span style={{ fontSize: "0.75rem" }}>{entry.labels.heavy}</span>
            </div>
          </div>
        )}

        {/* Listen button */}
        <button onClick={() => speakAr(entry.target + "َ", 0.6)}
          style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", border: "none", color: "#fff", borderRadius: "50%", width: "80px", height: "80px", fontSize: "2rem", cursor: "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.4)", marginBottom: "24px", transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
          🔊
        </button>
        <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "24px" }}>
          اضغط للاستماع — Tap to listen
        </div>

        {/* Choose */}
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginBottom: "24px" }}>
          {options.map((opt) => {
            let bg = "var(--surface, #fff)";
            let border = "3px solid var(--border, #e5e7eb)";
            if (soAnswer) {
              if (opt === entry.target) { bg = "#d1fae5"; border = "3px solid #10b981"; }
              else if (opt === soAnswer) { bg = "#fee2e2"; border = "3px solid #ef4444"; }
            }
            return (
              <button key={opt} onClick={() => { handleSoundPick(opt); speakAr(opt + "َ", 0.6); }}
                style={{ background: bg, border, borderRadius: "24px", width: "120px", height: "120px", cursor: soAnswer ? "default" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "var(--font-noto-naskh), serif", fontSize: "3.5rem", color: "var(--text, #1f2937)", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                onMouseEnter={(e) => !soAnswer && (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                {opt}
                <span style={{ fontSize: "0.7rem", fontFamily: "sans-serif", color: "var(--text-muted)" }}>🔊</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {soAnswer && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{isCorrect ? "✅ ممتاز! — Excellent!" : "❌ حاول مرة أخرى — Try again"}</div>
            {isWrong && entry.weight && (
              <div style={{ color: "#065f46", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
                <strong>{entry.weight.heavy}</strong> = مفخم (heavy) | <strong>{entry.weight.light}</strong> = مرقق (light)
              </div>
            )}
            <button className="btn-primary" onClick={nextSound} style={{ marginTop: "16px" }}>
              {soIdx + 1 < soundEntries.length ? "التالي — Next" : "مرحلة الصيد 🔎"} <i className="fas fa-arrow-left" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── SPY PHASE ──
  if (phase === "spy") {
    return (
      <div className="section-content" style={{ textAlign: "center" }}>
        <div className="section-heading" style={{ marginBottom: "8px" }}>
          <span className="section-badge">🔎</span> صيد الحروف — Letter Hunt
        </div>
        <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "8px" }}>
          اعثر على كل حرف <strong style={{ fontSize: "1.3rem", color: "var(--primary, #185FA5)" }}>{letterId}</strong> المختبئ!
        </div>
        <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.8rem", marginBottom: "24px" }}>
          Find all hidden <strong>{letterId}</strong> letters! ({spyFound.length}/{spyTargetCount})
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(spyPool.length, 3)}, 1fr)`, gap: "14px", maxWidth: "320px", margin: "0 auto 28px" }}>
          {spyPool.map((letter, i) => {
            const found = spyFound.includes(i);
            const wrong = spyWrong.includes(i);
            let bg = "var(--surface, #fff)";
            let border = "3px solid var(--border, #e5e7eb)";
            let color = "var(--text, #1f2937)";
            if (found) { bg = "#d1fae5"; border = "3px solid #10b981"; color = "#065f46"; }
            if (wrong) { bg = "#fee2e2"; border = "3px solid #ef4444"; color = "#dc2626"; }

            return (
              <button key={i} onClick={() => handleSpyTap(i)}
                style={{ background: bg, border, color, borderRadius: "20px", height: "90px", cursor: found || wrong ? "default" : "pointer", fontFamily: "var(--font-noto-naskh), serif", fontSize: "3rem", fontWeight: 700, transition: "all 0.2s", boxShadow: found ? "0 4px 16px rgba(16,185,129,0.3)" : "0 2px 8px rgba(0,0,0,0.05)", position: "relative" }}
                onMouseEnter={(e) => !found && !wrong && (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                {letter}
                {found && <span style={{ position: "absolute", top: "4px", right: "8px", fontSize: "1rem" }}>✅</span>}
                {wrong && <span style={{ position: "absolute", top: "4px", right: "8px", fontSize: "1rem" }}>❌</span>}
              </button>
            );
          })}
        </div>

        {spyDone && (
          <div style={{ padding: "20px", background: "#f0fdf4", borderRadius: "16px", marginBottom: "16px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🎉</div>
            <div style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 900, fontSize: "1.3rem" }}>
              أحسنت! وجدت كل الحروف! — Well done!
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          {spyDone && (
            <button className="btn-primary" onClick={() => setPhase("results")}>
              عرض النتيجة <i className="fas fa-arrow-left" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  if (phase === "results") {
    const pct = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 100;
    return (
      <div className="section-content" style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "5rem", marginBottom: "12px" }}>{pct >= 80 ? "🕵️‍♂️🌟" : pct >= 50 ? "🔍👍" : "💪🔎"}</div>
        <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-tajawal), sans-serif", color: "var(--primary, #185FA5)", marginBottom: "8px" }}>
          {pct >= 80 ? "محقق ممتاز!" : pct >= 50 ? "جيد جداً!" : "حاول مرة أخرى!"}
        </div>
        <div style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "20px" }}>
          {pct >= 80 ? "Excellent Detective!" : pct >= 50 ? "Great job!" : "Keep practicing!"}
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
          {visualEntries.length > 0 && (
            <div style={{ ...resultCard("#3b82f6") }}>
              <div>👁️ بصري</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 900 }}>{viScore}/{visualEntries.length}</div>
            </div>
          )}
          {soundEntries.length > 0 && (
            <div style={{ ...resultCard("#10b981") }}>
              <div>👂 صوتي</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 900 }}>{soScore}/{soundEntries.length}</div>
            </div>
          )}
          <div style={{ ...resultCard("#f59e0b") }}>
            <div>🔎 صيد</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 900 }}>{spyFound.length}/{spyTargetCount}</div>
          </div>
        </div>

        <div style={{ fontSize: "2.5rem", fontWeight: 900, color: pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444", marginBottom: "24px" }}>
          {pct}%
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button className="btn-secondary" onClick={() => {
            setPhase("intro"); setViIdx(0); setViAnswer(null); setViScore(0);
            setSoIdx(0); setSoAnswer(null); setSoScore(0);
            setSpyFound([]); setSpyWrong([]);
          }}>
            <i className="fas fa-rotate-right" /> إعادة — Retry
          </button>
          <button className="btn-primary" onClick={onComplete}>التالي <i className="fas fa-arrow-left" /></button>
        </div>
      </div>
    );
  }

  // Fallback — if no detective data, skip
  return (
    <div className="section-content" style={{ textAlign: "center", padding: "40px" }}>
      <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🕵️</div>
      <p style={{ color: "var(--text-muted)" }}>لا توجد بيانات محقق لهذا الحرف</p>
      <button className="btn-primary" onClick={onComplete} style={{ marginTop: "20px" }}>التالي <i className="fas fa-arrow-left" /></button>
    </div>
  );
}

// ── Style helpers ──
const infoBadge = (color: string): React.CSSProperties => ({
  background: `${color}12`, border: `2px solid ${color}`, borderRadius: "14px",
  padding: "12px 18px", display: "flex", flexDirection: "column", alignItems: "center",
  gap: "4px", fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 700, fontSize: "0.9rem", color,
});

const hintBox = (color: string): React.CSSProperties => ({
  background: `${color}10`, border: `2px solid ${color}`, borderRadius: "16px",
  padding: "16px 24px", display: "flex", flexDirection: "column", alignItems: "center",
  gap: "6px", color, fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 700,
});

const resultCard = (color: string): React.CSSProperties => ({
  background: `${color}12`, border: `2px solid ${color}`, borderRadius: "16px",
  padding: "16px 24px", color, fontFamily: "var(--font-tajawal), sans-serif",
  fontWeight: 700, fontSize: "0.9rem", minWidth: "100px",
});
