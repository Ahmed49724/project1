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
    <div id="home-screen" style={{ display: "block", paddingTop: "20px" }}>
      <div className="home-header">
        <div className="home-logo">
          <img src="/logo-optimized.png" alt="Jamea Logo" width="300" height="232" decoding="async" />
        </div>
        <div className="home-title">JAMEA Platform</div>
        <div className="progress-strip" style={{ maxWidth: "600px", margin: "20px auto" }}>
          <div className="label" data-i18n="overall_progress">Overall Progress</div>
          <div className="progress-bar-wrap"><div id="home-progress-fill" /></div>
          <div className="pct" id="home-progress-pct">0%</div>
        </div>
        <button
          type="button"
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
          <i className="fas fa-language" />{" "}
          <span id="lang-btn-text" data-i18n="lang_toggle">عربي / English</span>
        </button>
      </div>

      <div className="learning-journey">
        <div className="journey-phase" data-i18n="phase_1_title">
          <i className="fas fa-rocket"></i> المرحلة الأولى: تعلم القراءة
        </div>
        <div className="journey-line" />
        <div className="journey-nodes">
          <div
            className={`j-node ${activeNode === "alphabet" ? "active" : ""}`}
            onClick={() => setActiveNode("alphabet")}
          >
            <div className="j-node-num">1</div>
            <div className="j-node-label" data-i18n="node_alphabet">الحروف</div>
          </div>
          <div
            className={`j-node ${activeNode === "sukoon" ? "active" : ""}`}
            onClick={() => setActiveNode("sukoon")}
          >
            <div className="j-node-num">2</div>
            <div className="j-node-label" data-i18n="node_sukoon">السكون</div>
          </div>
          <div
            className={`j-node ${activeNode === "madd" ? "active" : ""}`}
            onClick={() => setActiveNode("madd")}
          >
            <div className="j-node-num">3</div>
            <div className="j-node-label" data-i18n="node_madd">المدود</div>
          </div>
          <div
            className={`j-node ${activeNode === "shadda" ? "active" : ""}`}
            onClick={() => setActiveNode("shadda")}
          >
            <div className="j-node-num">4</div>
            <div className="j-node-label" data-i18n="node_shadda">الشدة</div>
          </div>
          <div
            className={`j-node ${activeNode === "tanween" ? "active" : ""}`}
            onClick={() => setActiveNode("tanween")}
          >
            <div className="j-node-num">5</div>
            <div className="j-node-label" data-i18n="node_tanween">التنوين</div>
          </div>
        </div>

        <div className="dynamic-content-box">
          <div id="content-alphabet" className="map-content-section" style={{ display: activeNode === "alphabet" ? "block" : "none" }}>
            <div className="alphabet-grid" id="alphabetGrid" style={{ direction: "rtl" }}>
              {ARABIC_LETTERS.map((letter) => (
                <button key={letter} type="button" className="letter-card" onClick={() => handleLetterClick(letter)}>
                  <div className="letter-shape">{letter}</div>
                </button>
              ))}
            </div>
          </div>
          <div id="content-sukoon" className="map-content-section" style={{ display: activeNode === "sukoon" ? "block" : "none" }}>
            <div className="level-two-grid" id="levelSukoonGrid" style={{ direction: "ltr" }}>
              <p>{STAGE_DATA.sukoon.description}</p>
              <button className="btn-primary" onClick={() => router.push("/journey/arabic/sukoon")}>ابدأ السكون</button>
            </div>
          </div>
          <div id="content-madd" className="map-content-section" style={{ display: activeNode === "madd" ? "block" : "none" }}>
            <div className="level-two-grid" id="levelMaddGrid" style={{ direction: "ltr" }}>
              <p>{STAGE_DATA.madd.description}</p>
              <button className="btn-primary" onClick={() => router.push("/journey/arabic/madd")}>ابدأ المدود</button>
            </div>
          </div>
          <div id="content-shadda" className="map-content-section" style={{ display: activeNode === "shadda" ? "block" : "none" }}>
            <div className="level-two-grid" id="levelShaddaGrid" style={{ direction: "ltr" }}>
              <p>{STAGE_DATA.shadda.description}</p>
              <button className="btn-primary" onClick={() => router.push("/journey/arabic/shadda")}>ابدأ الشدة</button>
            </div>
          </div>
          <div id="content-tanween" className="map-content-section" style={{ display: activeNode === "tanween" ? "block" : "none" }}>
            <div className="level-two-grid" id="levelTanweenGrid" style={{ direction: "ltr" }}>
              <p>{STAGE_DATA.tanween.description}</p>
              <button className="btn-primary" onClick={() => router.push("/journey/arabic/tanween")}>ابدأ التنوين</button>
            </div>
          </div>
        </div>

        <div className="journey-line dashed" />
        <button
          type="button"
          className="journey-phase phase-link"
          onClick={() => router.push("/journey/arabic/verb-lab")}
          aria-label="فتح المستوى الثاني: مختبر الأفعال"
        >
          <i className="fas fa-brain" aria-hidden="true" />
          <span data-i18n="phase_2_title">المستوى الثاني: مختبر الأفعال</span>
        </button>
        <div className="phase-subtitle" data-i18n="phase_2_desc">الأفعال، الضمائر، الأزمنة، وبناء الجمل</div>
        <div className="journey-line dashed" style={{ height: "30px" }} />
        <div className="journey-phase locked" data-i18n="phase_3_title">
          <i className="fas fa-lock"></i> المستوى الثالث: التحدث والتراكيب
        </div>
        <div className="phase-subtitle" data-i18n="phase_3_desc">المحادثة والمصطلحات الشائعة</div>
      </div>
    </div>
  );
}
