"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import lottie, { type AnimationItem } from "lottie-web";
import { speakAr } from "@/lib/speech";

const PRONOUNS = [
  { ar: "أَنَا",  en: "I",    icon: "🙋‍♂️" },
  { ar: "هُوَ",  en: "He",   icon: "👨"   },
  { ar: "هِيَ",  en: "She",  icon: "👩"   },
  { ar: "نَحْنُ", en: "We",  icon: "👨‍👩‍👧‍👦" },
  { ar: "هُمْ",  en: "They", icon: "👐"  },
];

const VERBS = [
  { ar: "يَأْكُلُ",  en: "Eats",      lottie: "eating.json",   icon: "🍽" },
  { ar: "يَشْرَبُ",  en: "Drinks",    lottie: "drinking.json", icon: "🥤" },
  { ar: "يَذْهَبُ",  en: "Goes",      lottie: "going.json",    icon: "🚶" },
  { ar: "يَجْلِسُ",  en: "Sits",      lottie: "sit.json",      icon: "🪑" },
  { ar: "يَقْرَأُ",  en: "Reads",     lottie: "reading.json",  icon: "📖" },
  { ar: "يَكْتُبُ",  en: "Writes",    lottie: "writing.json",  icon: "✏️" },
  { ar: "يَسْمَعُ",  en: "Hears",     lottie: "hearing.json",  icon: "👂" },
  { ar: "يَعْبُدُ",  en: "Worships",  lottie: "worship.json",  icon: "🤲" },
  { ar: "يُفَكِّرُ", en: "Thinks",   lottie: "think.json",    icon: "💭" },
  { ar: "يَعْرِفُ",  en: "Knows",     lottie: "knowing.json",  icon: "💡" },
  { ar: "يُحِبُّ",   en: "Loves",    lottie: "love.json",     icon: "❤️" },
  { ar: "يَخْلُقُ",  en: "Creates",   lottie: "create.json",   icon: "🌟" },
  { ar: "يَنَامُ",   en: "Sleeps",   lottie: "sleep.json",    icon: "😴" },
  { ar: "يَقِفُ",   en: "Stands",    lottie: "stand.json",    icon: "🧍" },
  { ar: "يَقُولُ",  en: "Says",      lottie: "saying.json",   icon: "💬" },
  { ar: "يَرَى",    en: "Sees",      lottie: "see.json",      icon: "👁" },
  { ar: "يَأْتِي",  en: "Comes",     lottie: "come.json",     icon: "🤗" },
  { ar: "يَخْرُجُ", en: "Goes out",  lottie: "go out.json",   icon: "🚪" },
  { ar: "يَدْخُلُ", en: "Enters",    lottie: "get in.json",   icon: "🏠" },
  { ar: "يَفْعَلُ", en: "Does",      lottie: "doing.json",    icon: "💪" },
];

function LottiePlayer({ path, key: _key }: { path: string; key: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Destroy previous animation
    animRef.current?.destroy();

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path,
    });

    return () => { animRef.current?.destroy(); };
  }, [path]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

export default function VerbLabPage() {
  const router = useRouter();
  const [selectedPronoun, setSelectedPronoun] = useState(0);
  const [selectedVerb, setSelectedVerb] = useState<number | null>(null);
  const [lottieError, setLottieError] = useState<Record<number, boolean>>({});

  const pronoun = PRONOUNS[selectedPronoun];
  const verb = selectedVerb !== null ? VERBS[selectedVerb] : null;
  const sentence = verb ? `${pronoun.ar} ${verb.ar}` : null;

  const selectVerb = useCallback((i: number) => {
    setSelectedVerb(i);
    speakAr(VERBS[i].ar);
  }, []);

  const selectPronoun = useCallback((i: number) => {
    setSelectedPronoun(i);
    speakAr(PRONOUNS[i].ar);
  }, []);

  const lottieKey = verb ? `${selectedVerb}-${verb.lottie}` : "";

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "80px 20px 60px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🧪</div>
        <h1 style={{ fontFamily: "var(--font-tajawal), sans-serif", fontSize: "2.4rem", color: "var(--primary, #185FA5)", margin: "0 0 8px" }}>
          مختبر الأفعال
        </h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "1rem" }}>
          The Verb Lab — Choose a pronoun + verb to build a sentence
        </p>
      </div>

      {/* Sentence display + Lottie */}
      <div style={{ display: "grid", gridTemplateColumns: verb ? "1fr 1fr" : "1fr", gap: "24px", marginBottom: "36px", alignItems: "center" }}>
        {/* Sentence card */}
        <div onClick={() => sentence && speakAr(sentence)}
          style={{ background: "var(--surface2, #f0fdf4)", border: "3px solid var(--primary, #185FA5)", borderRadius: "24px", padding: "32px 24px", textAlign: "center", cursor: sentence ? "pointer" : "default", minHeight: "140px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {sentence ? (
            <>
              <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2.8rem", color: "var(--primary, #185FA5)", direction: "rtl", lineHeight: 1.8, marginBottom: "8px" }}>
                {sentence}
              </div>
              <div style={{ fontSize: "1.1rem", color: "var(--text-muted)", fontFamily: "sans-serif" }}>
                {pronoun.en} {verb?.en?.toLowerCase()}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: "8px", fontFamily: "sans-serif" }}>🔊 اضغط للاستماع</div>
            </>
          ) : (
            <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-noto-naskh), sans-serif", fontSize: "1.1rem" }}>
              اختر ضميراً وفعلاً لبناء جملة 👇
            </div>
          )}
        </div>

        {/* Lottie animation */}
        {verb && (
          <div style={{ background: "#f0f9ff", borderRadius: "24px", border: "2px solid #bfdbfe", height: "220px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
            {lottieError[selectedVerb!] ? (
              <div style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "sans-serif" }}>
                <div style={{ fontSize: "4rem" }}>{verb.icon}</div>
                <div style={{ fontSize: "0.8rem", marginTop: "8px" }}>{verb.en}</div>
              </div>
            ) : (
              <div style={{ width: "100%", height: "100%" }}
                onError={() => setLottieError((e) => ({ ...e, [selectedVerb!]: true }))}>
                <LottiePlayer key={lottieKey} path={`/lottie/${verb.lottie}`} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pronoun selector */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontFamily: "var(--font-noto-naskh), sans-serif", marginBottom: "14px", fontSize: "1.15rem" }}>الضمائر — Pronouns</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {PRONOUNS.map((p, i) => (
            <button key={i} onClick={() => selectPronoun(i)}
              style={{ padding: "14px 20px", borderRadius: "16px", border: selectedPronoun === i ? "3px solid var(--primary,#185FA5)" : "2px solid var(--border,#e5e7eb)", background: selectedPronoun === i ? "var(--primary,#185FA5)" : "var(--surface,#fff)", color: selectedPronoun === i ? "#fff" : "var(--text,#1f2937)", cursor: "pointer", fontFamily: "var(--font-noto-naskh),serif", fontSize: "1.3rem", fontWeight: 700, transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", minWidth: "90px" }}>
              <span style={{ fontSize: "1.6rem" }}>{p.icon}</span>
              <span>{p.ar}</span>
              <span style={{ fontSize: "0.75rem", opacity: 0.85, fontFamily: "sans-serif" }}>{p.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Verb grid */}
      <div>
        <h3 style={{ fontFamily: "var(--font-noto-naskh), sans-serif", marginBottom: "14px", fontSize: "1.15rem" }}>الأفعال — Verbs</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px" }}>
          {VERBS.map((v, i) => (
            <button key={i} onClick={() => selectVerb(i)}
              style={{ padding: "14px 8px", borderRadius: "16px", border: selectedVerb === i ? "3px solid #10b981" : "2px solid var(--border,#e5e7eb)", background: selectedVerb === i ? "#d1fae5" : "var(--surface,#fff)", cursor: "pointer", fontFamily: "var(--font-noto-naskh),serif", fontSize: "1.1rem", fontWeight: 700, transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "1.8rem" }}>{v.icon}</span>
              <span style={{ direction: "rtl" }}>{v.ar}</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "sans-serif" }}>{v.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {selectedVerb !== null && (
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <button className="btn-secondary" onClick={() => setSelectedVerb(null)}>
            <i className="fas fa-rotate-left" /> مسح الاختيار
          </button>
        </div>
      )}
    </div>
  );
}
