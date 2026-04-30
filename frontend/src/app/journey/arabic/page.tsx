"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { ARABIC_LETTERS } from "@/data/db";
import { STAGE_DATA } from "@/data/stageData";

type MapNode = "alphabet" | "sukoon" | "madd" | "shadda" | "tanween";

export default function ArabicJourneyPage() {
  const router = useRouter();
  const { toggleLanguage } = useAppContext();
  const [activeNode, setActiveNode] = useState<MapNode>("alphabet");

  const handleLetterClick = (letter: string) => {
    router.push(`/journey/arabic/letter/${letter}`);
  };

  return (
    <div id="home-screen" style={{ paddingTop: "20px" }}>
      <div className="home-header">
        <div className="home-logo">
          <img src="/logo-optimized.png" alt="Jamea Logo" decoding="async" />
        </div>
        <div className="home-title">JAMEA Platform</div>
        
        <div className="progress-strip" style={{ maxWidth: "600px", margin: "20px auto" }}>
          <div className="label">Overall Progress</div>
          <div className="progress-bar-wrap">
            <div id="home-progress-fill" style={{ width: "0%" }}></div>
          </div>
          <div className="pct">0%</div>
        </div>
        
        <button
          className="btn-secondary"
          onClick={toggleLanguage}
          style={{
            margin: "15px auto",
            width: "fit-content",
            background: "var(--surface2)",
            border: "2px solid var(--gold)",
            color: "var(--gold)",
          }}
        >
          <i className="fas fa-language"></i> <span>عربي / English</span>
        </button>
      </div>

      <div className="learning-journey">
        <div className="journey-phase">
          <i className="fas fa-rocket"></i> المرحلة الأولى: تعلم القراءة
        </div>
        <div className="journey-line"></div>
        
        <div className="journey-nodes">
          <div
            className={`j-node ${activeNode === "alphabet" ? "active" : ""}`}
            onClick={() => setActiveNode("alphabet")}
          >
            <div className="j-node-num">1</div>
            <div className="j-node-label">الحروف</div>
          </div>
          <div
            className={`j-node ${activeNode === "sukoon" ? "active" : ""}`}
            onClick={() => setActiveNode("sukoon")}
          >
            <div className="j-node-num">2</div>
            <div className="j-node-label">السكون</div>
          </div>
          <div
            className={`j-node ${activeNode === "madd" ? "active" : ""}`}
            onClick={() => setActiveNode("madd")}
          >
            <div className="j-node-num">3</div>
            <div className="j-node-label">المدود</div>
          </div>
          <div
            className={`j-node ${activeNode === "shadda" ? "active" : ""}`}
            onClick={() => setActiveNode("shadda")}
          >
            <div className="j-node-num">4</div>
            <div className="j-node-label">الشدة</div>
          </div>
          <div
            className={`j-node ${activeNode === "tanween" ? "active" : ""}`}
            onClick={() => setActiveNode("tanween")}
          >
            <div className="j-node-num">5</div>
            <div className="j-node-label">التنوين</div>
          </div>
        </div>

        <div className="dynamic-content-box">
          {activeNode === "alphabet" && (
            <div className="map-content-section" style={{ display: "block" }}>
              <div className="alphabet-grid" style={{ direction: "rtl" }}>
                {ARABIC_LETTERS.map((letter) => (
                  <button
                    key={letter}
                    className="letter-card"
                    onClick={() => handleLetterClick(letter)}
                  >
                    <div className="letter-shape">{letter}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {activeNode === "sukoon" && (
            <div className="map-content-section" style={{ display: "block" }}>
              <div className="level-two-grid" style={{ direction: "ltr" }}>
                <p>{STAGE_DATA.sukoon.description}</p>
                <button className="btn-primary" onClick={() => router.push("/journey/arabic/sukoon")}>ابدأ السكون</button>
              </div>
            </div>
          )}
          
          {activeNode === "madd" && (
            <div className="map-content-section" style={{ display: "block" }}>
              <div className="level-two-grid" style={{ direction: "ltr" }}>
                <p>{STAGE_DATA.madd.description}</p>
                <button className="btn-primary" onClick={() => router.push("/journey/arabic/madd")}>ابدأ المدود</button>
              </div>
            </div>
          )}
          
          {activeNode === "shadda" && (
            <div className="map-content-section" style={{ display: "block" }}>
              <div className="level-two-grid" style={{ direction: "ltr" }}>
                <p>{STAGE_DATA.shadda.description}</p>
                <button className="btn-primary" onClick={() => router.push("/journey/arabic/shadda")}>ابدأ الشدة</button>
              </div>
            </div>
          )}
          
          {activeNode === "tanween" && (
            <div className="map-content-section" style={{ display: "block" }}>
              <div className="level-two-grid" style={{ direction: "ltr" }}>
                <p>{STAGE_DATA.tanween.description}</p>
                <button className="btn-primary" onClick={() => router.push("/journey/arabic/tanween")}>ابدأ التنوين</button>
              </div>
            </div>
          )}
        </div>

        <div className="journey-line dashed"></div>
        <button
          type="button"
          className="journey-phase phase-link"
          aria-label="فتح المستوى الثاني: مختبر الأفعال"
          onClick={() => router.push("/journey/arabic/verb-lab")}
        >
          <i className="fas fa-brain" aria-hidden="true"></i>
          <span>المستوى الثاني: مختبر الأفعال</span>
        </button>
        <div className="phase-subtitle">الأفعال، الضمائر، الأزمنة، وبناء الجمل</div>
        
        <div className="journey-line dashed" style={{ height: "30px" }}></div>
        <div className="journey-phase locked">
          <i className="fas fa-lock"></i> المستوى الثالث: التحدث والتراكيب
        </div>
        <div className="phase-subtitle">المحادثة والمصطلحات الشائعة</div>
      </div>
    </div>
  );
}
