import { useLang } from "../i18n/index.jsx";
import { useTopics } from "../hooks/useTopics";
import LearningTopicCard from "../components/LearningTopicCard";

export default function LearningPage() {
  const { t } = useLang();
  const { topics } = useTopics();

  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: "2rem", paddingRight: "2rem", maxWidth: 1280, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 20,
          background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.2)", marginBottom: 26,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0A84FF", boxShadow: "0 0 8px #0A84FF", display: "inline-block", animation: "dotPulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#0A84FF", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {t.learning.badge}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#E6EDF3",
          margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>
          {t.learning.title}{" "}
          <span style={{ background: "linear-gradient(135deg, #0A84FF, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t.learning.titleHighlight}
          </span>
        </h1>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "#8B949E", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
          {t.learning.subtitle}
        </p>

        {/* handler-paths.jpg image */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <img
            src="/handler-paths.jpg"
            alt="Handler Paths"
            style={{ width: "100%", maxWidth: 480, height: "auto", objectFit: "contain", borderRadius: 16, opacity: 0.9 }}
          />
        </div>
      </div>

      {/* Cards */}
      <div id="learning-paths" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
        {topics.map((topic, i) => (
          <LearningTopicCard key={topic.id} topic={topic} index={i} />
        ))}
      </div>
    </section>
  );
}
