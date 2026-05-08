"use client";
import React, { useState } from "react";
import { overlayStyle, cardStyle, headerStyle, closeBtn } from "./QuranPuzzle";
import { speakAr } from "@/lib/speech";

const PRONOUNS = [
  { ar: "أنا", en: "I (masc.)", forms: ["أنا", "أنا"] },
  { ar: "أنتَ", en: "You (masc.)", forms: ["أنتَ"] },
  { ar: "أنتِ", en: "You (fem.)", forms: ["أنتِ"] },
  { ar: "هو", en: "He", forms: ["هو"] },
  { ar: "هي", en: "She", forms: ["هي"] },
  { ar: "نحن", en: "We", forms: ["نحن"] },
  { ar: "أنتم", en: "You (plural)", forms: ["أنتم"] },
  { ar: "هم", en: "They (masc.)", forms: ["هم"] },
  { ar: "هن", en: "They (fem.)", forms: ["هن"] },
];

const DEMONSTRATIVES = [
  { ar: "هذا", en: "This (masc.)" }, { ar: "هذه", en: "This (fem.)" },
  { ar: "ذاك", en: "That (masc.)" }, { ar: "تلك", en: "That (fem.)" },
  { ar: "هؤلاء", en: "These (pl.)" }, { ar: "أولئك", en: "Those (pl.)" },
];

const QUESTION_WORDS = [
  { ar: "مَنْ؟", en: "Who?" }, { ar: "مَا؟ / مَاذَا؟", en: "What?" },
  { ar: "أَيْنَ؟", en: "Where?" }, { ar: "مَتَى؟", en: "When?" },
  { ar: "لِمَاذَا؟ / لِمَ؟", en: "Why?" }, { ar: "كَيْفَ؟", en: "How?" },
  { ar: "كَمْ؟", en: "How many/much?" }, { ar: "أَيُّ؟", en: "Which?" },
  { ar: "هَلْ؟ / أَ؟", en: "Yes/No question?" },
];

const PREPOSITIONS = [
  { ar: "في", en: "in" }, { ar: "على", en: "on" }, { ar: "إلى", en: "to" },
  { ar: "من", en: "from" }, { ar: "مع", en: "with" }, { ar: "عن", en: "about/from" },
  { ar: "بـ", en: "by/with" }, { ar: "لـ", en: "for/to" }, { ar: "كـ", en: "like/as" },
  { ar: "حتى", en: "until/even" }, { ar: "منذ", en: "since" }, { ar: "قبل", en: "before" },
  { ar: "بعد", en: "after" }, { ar: "بين", en: "between" }, { ar: "فوق", en: "above" },
  { ar: "تحت", en: "under" },
];

const TABS = ["الضمائر", "أسماء الإشارة", "أدوات الاستفهام", "حروف الجر", "الشدة والتنوين"];

function WordChip({ ar, en }: { ar: string; en: string }) {
  return (
    <div onClick={() => speakAr(ar)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "12px 16px", background: "#f0fdf4", border: "2px solid #d1fae5", borderRadius: "14px", cursor: "pointer", minWidth: "80px", transition: "transform 0.15s" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      <span style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.5rem", color: "#065f46", direction: "rtl" }}>{ar}</span>
      <span style={{ fontSize: "0.72rem", color: "#6b7280", fontFamily: "sans-serif", textAlign: "center" }}>{en}</span>
    </div>
  );
}

export function GrammarRules({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState(0);

  return (
    <div style={overlayStyle}>
      <div style={{ ...cardStyle, maxWidth: "800px" }}>
        <div style={headerStyle}>
          <h2 style={{ fontFamily: "var(--font-tajawal), sans-serif", color: "#185FA5", margin: 0 }}>
            📚 القواعد النحوية — Grammar Reference
          </h2>
          <button onClick={onClose} style={closeBtn}>✕ إغلاق</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              style={{ padding: "8px 14px", borderRadius: "10px", border: "none", background: tab === i ? "#185FA5" : "#f3f4f6", color: tab === i ? "#fff" : "#374151", cursor: "pointer", fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 700, fontSize: "0.85rem" }}>
              {t}
            </button>
          ))}
        </div>

        <p style={{ fontSize: "0.8rem", color: "#9ca3af", fontFamily: "sans-serif", marginBottom: "16px" }}>اضغط أي كلمة للاستماع إليها 🔊</p>

        {tab === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
            {PRONOUNS.map((p) => <WordChip key={p.ar} ar={p.ar} en={p.en} />)}
          </div>
        )}

        {tab === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
            {DEMONSTRATIVES.map((d) => <WordChip key={d.ar} ar={d.ar} en={d.en} />)}
          </div>
        )}

        {tab === 2 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
            {QUESTION_WORDS.map((q) => <WordChip key={q.ar} ar={q.ar} en={q.en} />)}
          </div>
        )}

        {tab === 3 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px" }}>
            {PREPOSITIONS.map((p) => <WordChip key={p.ar} ar={p.ar} en={p.en} />)}
          </div>
        )}

        {tab === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Visual engine metaphor card */}
            <div style={{ border: "2px solid #f59e0b", borderRadius: "16px", padding: "20px" }}>
              <div style={{ fontWeight: 900, color: "#f59e0b", fontFamily: "var(--font-tajawal), sans-serif", marginBottom: "14px", fontSize: "1.05rem" }}>
                ⚡ Shadda &amp; Tanween Rule — قاعدة الشدة والتنوين
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ background: "#fef3c7", borderRadius: "14px", padding: "16px", border: "2px solid #f59e0b", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>⚙️ ≠ ⚙️</div>
                  <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem", fontWeight: 700, color: "#92400e", marginBottom: "6px" }}>بَّ = بْ + بَ</div>
                  <div style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 900, fontSize: "0.9rem", color: "#78350f" }}>
                    موتوران مختلفان → شدة ّ<br />
                    <em style={{ fontWeight: 400, fontSize: "0.8rem" }}>Different engines → Shadda</em>
                  </div>
                </div>
                <div style={{ background: "#e0f2fe", borderRadius: "14px", padding: "16px", border: "2px solid #0ea5e9", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>⚙️ = ⚙️</div>
                  <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem", fontWeight: 700, color: "#075985", marginBottom: "6px" }}>كِتَابٌ = كِتَابُ + نْ</div>
                  <div style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 900, fontSize: "0.9rem", color: "#0c4a6e" }}>
                    موتوران متشابهان → تنوين ٌ<br />
                    <em style={{ fontWeight: 400, fontSize: "0.8rem" }}>Same engines → Tanween</em>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed rule cards with examples */}
            {[{
              title: "الشدة (Shadda) — ّ",
              desc: "When a consonant is doubled, we write it once with a shadda (ّ) above it.",
              examples: [{ ar: "مَدَّ", en: "He stretched" }, { ar: "رَدَّ", en: "He replied" }, { ar: "شَكَّ", en: "He doubted" }],
              color: "#f59e0b",
            }, {
              title: "التنوين (Tanween) — ً ٍ ٌ",
              desc: "Indefinite nouns get a double vowel sound at the end: ً (an), ٍ (in), ٌ (un).",
              examples: [{ ar: "كِتَابٌ", en: "a book" }, { ar: "وَلَدٌ", en: "a boy" }, { ar: "بَيْتًا", en: "a house (acc.)" }],
              color: "#10b981",
            }].map((rule) => (
              <div key={rule.title} style={{ background: `${rule.color}12`, border: `2px solid ${rule.color}`, borderRadius: "16px", padding: "20px" }}>
                <div style={{ fontWeight: 900, color: rule.color, fontFamily: "var(--font-tajawal), sans-serif", marginBottom: "8px", fontSize: "1.05rem" }}>{rule.title}</div>
                <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.9rem", marginBottom: "14px", lineHeight: 1.6 }}>{rule.desc}</div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {rule.examples.map((ex) => <WordChip key={ex.ar} ar={ex.ar} en={ex.en} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
