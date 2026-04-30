import type { StageData } from "@/data/stageData";

interface StageQuestionToolsProps {
  stageData: StageData;
}

export default function StageQuestionTools({ stageData }: StageQuestionToolsProps) {
  return (
    <section className="section-content">
      <div className="section-heading">
        <span className="section-badge">❓</span> أدوات الأسئلة
      </div>
      <p style={{ color: "var(--text-muted)", marginBottom: "18px", lineHeight: 1.8 }}>
        أدوات دائمة تساعدك تفكيرياً على التركيز في الهدف من كل مرحلة.
      </p>

      <div className="stage-tools-grid">
        {stageData.questionTools.map((tool) => (
          <div key={tool.label} className="stage-tool-card">
            <div className="stage-tool-icon">{tool.icon}</div>
            <h3>{tool.label}</h3>
            <p style={{ color: "var(--text-muted)", margin: "10px 0" }}>{tool.description}</p>
            <div className="stage-tool-prompt">{tool.prompt}</div>
            <div className="stage-tool-tip">{tool.tip}</div>
            <button type="button" className="btn-secondary" style={{ marginTop: "14px" }}>
              استخدم الأداة
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
