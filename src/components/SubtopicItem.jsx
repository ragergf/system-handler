import { useState } from "react";
import { useProgress } from "../hooks/useProgress.jsx";

function YouTubeIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
      <path d="M21.8 8.001a2.75 2.75 0 0 0-1.935-1.946C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.865.455A2.75 2.75 0 0 0 2.2 8.001 28.8 28.8 0 0 0 1.75 12a28.8 28.8 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.935 1.946C5.8 18.4 12 18.4 12 18.4s6.2 0 7.865-.455a2.75 2.75 0 0 0 1.935-1.946A28.8 28.8 0 0 0 22.25 12a28.8 28.8 0 0 0-.45-3.999zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

function TikTokIcon({ color }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.75V17a5.92 5.92 0 1 1-5.92-5.92c.34 0 .68.03 1 .09V14.5a2.58 2.58 0 1 0 1.83 2.47V2h3.26a4.85 4.85 0 0 0 3.6 4.69z" />
    </svg>
  );
}

function GitHubIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function Checkbox({ checked, onToggle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={checked ? "Mark as incomplete" : "Mark as complete"}
      style={{
        width: 20, height: 20, borderRadius: 5, flexShrink: 0, cursor: "pointer",
        border: `1.5px solid ${checked ? "#0A84FF" : hovered ? "rgba(10,132,255,0.5)" : "rgba(255,255,255,0.18)"}`,
        background: checked ? "linear-gradient(135deg, #0A84FF, #00E5FF)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease",
        boxShadow: checked ? "0 0 10px rgba(10,132,255,0.45)" : "none",
      }}
    >
      {checked && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function SubtopicItem({ subtopic, index, topicId }) {
  const { markComplete, toggleComplete, isComplete } = useProgress();
  const checked = isComplete(topicId, index);
  const [rowHovered, setRowHovered] = useState(false);
  const [ytH, setYtH] = useState(false);
  const [ttH, setTtH] = useState(false);
  const [ghH, setGhH] = useState(false);

  // Auto-mark complete when any link is clicked
  const handleLinkClick = () => {
    if (!checked) markComplete(topicId, index);
  };

  return (
    <div
      style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 12,
        padding: "11px 15px", borderRadius: 8,
        background: checked
          ? "rgba(10,132,255,0.07)"
          : rowHovered ? "rgba(10,132,255,0.05)" : "rgba(10,132,255,0.02)",
        border: `1px solid ${checked ? "rgba(10,132,255,0.3)" : rowHovered ? "rgba(10,132,255,0.15)" : "rgba(10,132,255,0.08)"}`,
        marginBottom: 7,
        animation: "fadeSlideIn 0.3s ease both",
        animationDelay: `${index * 0.055}s`,
        transition: "background 0.2s, border-color 0.2s",
      }}
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
    >
      {/* Left: checkbox + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1 }}>
        <Checkbox checked={checked} onToggle={() => toggleComplete(topicId, index)} />
        <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.875rem",
            color: checked ? "#8B949E" : "#E6EDF3",
            textDecoration: checked ? "line-through" : "none",
            transition: "color 0.2s, text-decoration 0.2s",
            lineHeight: 1.4,
          }}>
          {subtopic.title}
        </span>
      </div>

      {/* Right: link buttons — only render if link exists */}
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        {subtopic.youtube && (
          <a href={subtopic.youtube} target="_blank" rel="noopener noreferrer"
            onClick={handleLinkClick}
            style={{
              display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6,
              background: ytH ? "rgba(255,60,60,0.14)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${ytH ? "rgba(255,80,80,0.4)" : "rgba(255,255,255,0.08)"}`,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={() => setYtH(true)} onMouseLeave={() => setYtH(false)}
          >
            <YouTubeIcon color={ytH ? "#ff5555" : "#8B949E"} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: ytH ? "#ff6666" : "#8B949E", transition: "color 0.2s" }}>YT</span>
          </a>
        )}
        {subtopic.tiktok && (
          <a href={subtopic.tiktok} target="_blank" rel="noopener noreferrer"
            onClick={handleLinkClick}
            style={{
              display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6,
              background: ttH ? "rgba(0,229,255,0.10)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${ttH ? "rgba(0,229,255,0.35)" : "rgba(255,255,255,0.08)"}`,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={() => setTtH(true)} onMouseLeave={() => setTtH(false)}
          >
            <TikTokIcon color={ttH ? "#00E5FF" : "#8B949E"} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: ttH ? "#00E5FF" : "#8B949E", transition: "color 0.2s" }}>TK</span>
          </a>
        )}
        {subtopic.github && (
          <a href={subtopic.github} target="_blank" rel="noopener noreferrer"
            onClick={handleLinkClick}
            style={{
              display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6,
              background: ghH ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${ghH ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)"}`,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={() => setGhH(true)} onMouseLeave={() => setGhH(false)}
          >
            <GitHubIcon color={ghH ? "#ffffff" : "#8B949E"} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: ghH ? "#fff" : "#8B949E", transition: "color 0.2s" }}>GH</span>
          </a>
        )}
      </div>
    </div>
  );
}
