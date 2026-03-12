import { useLang } from "../i18n/index.jsx";

export default function AboutPage() {
  const { t } = useLang();
  const a = t.about;

  return (
    <div style={{ paddingTop: 110, paddingBottom: 80, paddingLeft: "2rem", paddingRight: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Badge */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 20,
            background: "rgba(122,92,255,0.08)", border: "1px solid rgba(122,92,255,0.22)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7A5CFF", boxShadow: "0 0 8px #7A5CFF", display: "inline-block", animation: "dotPulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#7A5CFF", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {a.badge}
            </span>
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: "clamp(2rem, 4vw, 3rem)", color: "#E6EDF3",
          margin: "0 0 40px", letterSpacing: "-0.03em", lineHeight: 1.15,
        }}>
          {a.title}{" "}
          <span style={{ background: "linear-gradient(135deg, #0A84FF, #7A5CFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {a.titleHighlight}
          </span>
        </h1>

        {/* Content card */}
        <div style={{
          background: "rgba(18,24,43,0.85)", borderRadius: 16,
          border: "1px solid rgba(122,92,255,0.15)",
          padding: "40px 44px",
          boxShadow: "0 0 48px rgba(122,92,255,0.06), 0 12px 48px rgba(0,0,0,0.4)",
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.96rem", color: "#8B949E", lineHeight: 1.78, marginBottom: 8 }}>
            {a.mission}
          </p>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem",
            background: "linear-gradient(135deg, #0A84FF, #7A5CFF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 24, lineHeight: 1.4,
          }}>
            {a.missionHighlight}
          </p>

          <P>{a.body}</P>

          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.96rem", color: "#E6EDF3", margin: "4px 0 24px" }}>
            {a.exists}
          </p>

          <P>{a.throughTitle}</P>
          <ul style={{ paddingLeft: 0, margin: "0 0 28px", listStyle: "none" }}>
            {a.topics.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span style={{ color: "#7A5CFF", marginTop: 2, flexShrink: 0 }}>▸</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#8B949E", lineHeight: 1.65 }}>{item}</span>
              </li>
            ))}
          </ul>

          <div style={{ background: "rgba(10,132,255,0.05)", border: "1px solid rgba(10,132,255,0.12)", borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
            <P>{a.free1}</P>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.96rem", color: "#8B949E", lineHeight: 1.78, margin: 0 }}>{a.free2}</p>
          </div>

          <P>{a.believe}</P>
          <P>{a.open}</P>

          {/* Closing */}
          <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(122,92,255,0.12)", textAlign: "center" }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
              fontSize: "1.2rem", letterSpacing: "0.02em",
              background: "linear-gradient(135deg, #0A84FF, #7A5CFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {a.closing}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function P({ children }) {
  return (
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.96rem", color: "#8B949E", lineHeight: 1.78, marginBottom: 18 }}>
      {children}
    </p>
  );
}
