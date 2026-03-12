import { useState } from "react";
import { useLang } from "../i18n/index.jsx";

function YouTubeIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.935-1.946C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.865.455A2.75 2.75 0 0 0 2.2 8.001 28.8 28.8 0 0 0 1.75 12a28.8 28.8 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.935 1.946C5.8 18.4 12 18.4 12 18.4s6.2 0 7.865-.455a2.75 2.75 0 0 0 1.935-1.946A28.8 28.8 0 0 0 22.25 12a28.8 28.8 0 0 0-.45-3.999zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>;
}
function TikTokIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.75V17a5.92 5.92 0 1 1-5.92-5.92c.34 0 .68.03 1 .09V14.5a2.58 2.58 0 1 0 1.83 2.47V2h3.26a4.85 4.85 0 0 0 3.6 4.69z"/></svg>;
}
function FacebookIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.932-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>;
}
function GitHubIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z"/></svg>;
}
function LinkedInIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}

const ICONS = { YouTube: YouTubeIcon, TikTok: TikTokIcon, Facebook: FacebookIcon, GitHub: GitHubIcon, LinkedIn: LinkedInIcon };

function SocialCard({ channel, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[channel.name];
  const isComingSoon = channel.url === "#";

  return (
    <a
      href={isComingSoon ? undefined : channel.url}
      target={isComingSoon ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{
        display: "block", textDecoration: "none",
        background: "rgba(18,24,43,0.88)",
        border: `1px solid ${hovered && !isComingSoon ? channel.color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16, padding: "32px 28px",
        cursor: isComingSoon ? "default" : "pointer",
        transition: "all 0.3s ease",
        boxShadow: hovered && !isComingSoon ? `0 0 40px ${channel.color}18, 0 8px 32px rgba(0,0,0,0.4)` : "0 4px 24px rgba(0,0,0,0.3)",
        animation: "fadeSlideUp 0.5s ease both",
        animationDelay: `${index * 0.1}s`,
        backdropFilter: "blur(14px)",
        opacity: isComingSoon ? 0.55 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, flexShrink: 0,
          background: `${channel.color}14`, border: `1px solid ${channel.color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: channel.color,
          boxShadow: hovered ? `0 0 20px ${channel.color}30` : "none",
          transition: "box-shadow 0.3s",
        }}>
          <Icon />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#E6EDF3", margin: 0 }}>
              {channel.name}
            </h3>
            {isComingSoon && (
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600,
                color: "#8B949E", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 7px",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>Soon</span>
            )}
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", color: channel.color, margin: "0 0 10px", fontWeight: 600 }}>
            {channel.handle}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#8B949E", margin: 0, lineHeight: 1.6 }}>
            {channel.description}
          </p>
        </div>
        {!isComingSoon && (
          <div style={{ color: "#8B949E", fontSize: "1rem", alignSelf: "center", transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none" }}>→</div>
        )}
      </div>
    </a>
  );
}

export default function SocialPage() {
  const { t } = useLang();
  const s = t.social;

  return (
    <div style={{ paddingTop: 110, paddingBottom: 80, paddingLeft: "2rem", paddingRight: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Badge */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 20,
            background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.2)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0A84FF", boxShadow: "0 0 8px #0A84FF", display: "inline-block", animation: "dotPulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#0A84FF", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {s.badge}
            </span>
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#E6EDF3", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
          {s.title}{" "}
          <span style={{ background: "linear-gradient(135deg, #0A84FF, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {s.titleHighlight}
          </span>
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#8B949E", margin: "0 0 48px", lineHeight: 1.7 }}>
          {s.subtitle}
        </p>

        {/* Channel cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {s.channels.map((channel, i) => (
            <SocialCard key={channel.name} channel={channel} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
