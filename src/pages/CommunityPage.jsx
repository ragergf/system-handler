import { useLang } from "../i18n/index.jsx";

export default function CommunityPage() {
  const { t } = useLang();
  const c = t.community;

  return (
    <div style={{ paddingTop: 110, paddingBottom: 80, paddingLeft: "2rem", paddingRight: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Badge */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 20,
            background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.22)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", boxShadow: "0 0 8px #00E5FF", display: "inline-block", animation: "dotPulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#00E5FF", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {c.badge}
            </span>
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: "clamp(2rem, 4vw, 3rem)", color: "#E6EDF3",
          margin: "0 0 40px", letterSpacing: "-0.03em", lineHeight: 1.15,
        }}>
          {c.title}{" "}
          <span style={{ background: "linear-gradient(135deg, #00E5FF, #0A84FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {c.titleHighlight}
          </span>
        </h1>

        {/* Content card */}
        <div style={{
          background: "rgba(18,24,43,0.85)", borderRadius: 16,
          border: "1px solid rgba(0,229,255,0.15)",
          padding: "40px 44px",
          boxShadow: "0 0 48px rgba(0,229,255,0.06), 0 12px 48px rgba(0,0,0,0.4)",
        }}>
          <P>{c.intro}</P>
          <P>{c.goal}</P>
          <P>{c.free}</P>

          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "#E6EDF3", margin: "28px 0 14px" }}>
            {c.whoTitle}
          </p>
          <ul style={{ paddingLeft: 0, margin: "0 0 24px", listStyle: "none" }}>
            {c.who.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span style={{ color: "#00E5FF", marginTop: 2, flexShrink: 0 }}>▸</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#8B949E", lineHeight: 1.65 }}>{item}</span>
              </li>
            ))}
          </ul>

          <P highlight>{c.welcome}</P>
          <P>{c.grows}</P>

          {/* CTA */}
          <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(0,229,255,0.12)", textAlign: "center" }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
              fontSize: "1.4rem", letterSpacing: "0.04em",
              background: "linear-gradient(135deg, #0A84FF, #00E5FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {c.cta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function P({ children, highlight }) {
  return (
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.96rem",
      color: highlight ? "#E6EDF3" : "#8B949E",
      lineHeight: 1.78, marginBottom: 18,
      fontWeight: highlight ? 600 : 400,
    }}>
      {children}
    </p>
  );
}
