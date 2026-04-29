"use client";
import React, { useState } from "react";
import { speakAr } from "@/lib/speech";
import { VERB_CONJUGATIONS } from "@/data/verbLabData";

interface Scene {
  text: string;
  textEn: string;
  verbId: number; // index in VERB_CONJUGATIONS
  pronoun: string;
}

const STORY_SCENES: Scene[] = [
  { text: "أَحْمَدُ يَذْهَبُ إِلَى المَدْرَسَةِ", textEn: "Ahmad goes to school", verbId: 2, pronoun: "هو" },
  { text: "فِي المَدْرَسَةِ، هُوَ يَقْرَأُ كِتَاباً", textEn: "At school, he reads a book", verbId: 4, pronoun: "هو" },
  { text: "ثُمَّ هُوَ يَكْتُبُ فِي الدَّفْتَرِ", textEn: "Then he writes in the notebook", verbId: 5, pronoun: "هو" },
  { text: "بَعْدَ ذَلِكَ، هُوَ يَأْكُلُ تُفَّاحَةً", textEn: "After that, he eats an apple", verbId: 0, pronoun: "هو" },
  { text: "وَفِي المَسَاءِ، هُوَ يَنَامُ سَعِيداً", textEn: "And in the evening, he sleeps happily", verbId: 12, pronoun: "هو" },
];

export function VerbStory() {
  const [idx, setIdx] = useState(0);
  const current = STORY_SCENES[idx];
  const verb = VERB_CONJUGATIONS[current.verbId];

  const handleNext = () => {
    if (idx + 1 < STORY_SCENES.length) {
      setIdx(idx + 1);
    } else {
      setIdx(0); // Loop back or show finish
    }
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <div className="section-heading" style={{ marginBottom: "32px" }}>
        <span className="section-badge">🎬</span> قصة الأفعال — Verb Story
      </div>

      <div style={{ 
        background: "#fff", 
        border: "2px solid var(--border)", 
        borderRadius: "32px", 
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        marginBottom: "32px"
      }}>
        <div style={{ fontSize: "6rem", marginBottom: "24px" }}>{verb.icon}</div>
        
        <div 
          onClick={() => speakAr(current.text)}
          style={{ 
            fontFamily: "var(--font-noto-naskh), serif", 
            fontSize: "2.5rem", 
            direction: "rtl", 
            lineHeight: 1.8,
            color: "var(--primary, #185FA5)",
            cursor: "pointer",
            marginBottom: "12px"
          }}
        >
          {current.text}
        </div>
        
        <div style={{ fontSize: "1.2rem", color: "var(--text-muted)", fontFamily: "sans-serif" }}>
          {current.textEn}
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <button className="btn-secondary" onClick={() => speakAr(current.text)}>
          <i className="fas fa-volume-high" /> استمع للقصة — Listen
        </button>
        <button className="btn-primary" onClick={handleNext}>
          {idx + 1 < STORY_SCENES.length ? "المشهد التالي — Next" : "إعادة القصة — Restart"} <i className="fas fa-arrow-left" />
        </button>
      </div>

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "8px" }}>
        {STORY_SCENES.map((_, i) => (
          <div key={i} style={{ 
            width: "12px", 
            height: "12px", 
            borderRadius: "50%", 
            background: idx === i ? "var(--primary)" : "var(--border)" 
          }} />
        ))}
      </div>
    </div>
  );
}
