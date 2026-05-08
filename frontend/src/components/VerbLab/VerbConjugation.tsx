"use client";
import React, { useState } from "react";
import { VERB_CONJUGATIONS, TENSE_TABS, PRONOUN_LABELS, type VerbEntry } from "@/data/verbLabData";
import { speakAr } from "@/lib/speech";

export function VerbConjugation() {
  const [verbIdx, setVerbIdx] = useState(0);
  const [tense, setTense] = useState<"present" | "past" | "command">("present");
  const verb = VERB_CONJUGATIONS[verbIdx];
  const forms = verb[tense];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "8px" }}>{verb.icon}</div>
        <h3 style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem", color: "var(--primary, #185FA5)", margin: "0 0 4px" }}>{verb.ar}</h3>
        <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.9rem" }}>{verb.en}</div>
      </div>

      {/* Verb selector */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
        {VERB_CONJUGATIONS.map((v, i) => (
          <button key={i} onClick={() => { setVerbIdx(i); speakAr(v.ar); }}
            style={{ padding: "6px 10px", borderRadius: "10px", border: verbIdx === i ? "2px solid var(--primary, #185FA5)" : "1px solid var(--border, #e5e7eb)", background: verbIdx === i ? "var(--primary, #185FA5)" : "var(--surface, #fff)", color: verbIdx === i ? "#fff" : "var(--text)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "sans-serif" }}>
            {v.icon}
          </button>
        ))}
      </div>

      {/* Tense tabs */}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
        {TENSE_TABS.map((t) => (
          <button key={t.key} onClick={() => setTense(t.key)}
            style={{ padding: "10px 20px", borderRadius: "12px", border: "none", background: tense === t.key ? t.color : "#f3f4f6", color: tense === t.key ? "#fff" : "#374151", cursor: "pointer", fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
            {t.label} <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>({t.labelEn})</span>
          </button>
        ))}
      </div>

      {/* Conjugation table */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
        {Object.entries(forms).map(([pronoun, form]) => {
          const tenseColor = TENSE_TABS.find((t) => t.key === tense)?.color || "#3b82f6";
          return (
            <div key={pronoun} onClick={() => speakAr(`${pronoun} ${form}`, 0.7)}
              style={{ background: `${tenseColor}08`, border: `2px solid ${tenseColor}30`, borderRadius: "16px", padding: "16px", textAlign: "center", cursor: "pointer", transition: "transform 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
              <div style={{ fontSize: "0.75rem", color: tenseColor, fontWeight: 700, marginBottom: "4px" }}>
                {pronoun} <span style={{ color: "var(--text-muted)" }}>({PRONOUN_LABELS[pronoun] || pronoun})</span>
              </div>
              <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.5rem", color: "var(--text)", direction: "rtl" }}>{form}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>🔊</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
