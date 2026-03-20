import { useState, useMemo } from "react";
import { useLang } from "../i18n/index.jsx";
import { useTopics } from "../hooks/useTopics";
import LearningTopicCard from "../components/LearningTopicCard";

export default function LearningPage() {
  const { t } = useLang();
  const { topics } = useTopics();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topics.map(topic => ({ ...topic, filteredSubtopics: null, forceExpand: false }));

    const results = [];
    for (const topic of topics) {
      const titleMatch = topic.title.toLowerCase().includes(q);
      const matchedSubs = topic.subtopics.filter(s => s.title.toLowerCase().includes(q));

      if (titleMatch) {
        // Show full topic, expand it
        results.push({ ...topic, filteredSubtopics: null, forceExpand: true });
      } else if (matchedSubs.length > 0) {
        // Show only matching subtopics, expanded
        results.push({ ...topic, filteredSubtopics: matchedSubs, forceExpand: true });
      }
    }
    return results;
  }, [query, topics]);

  return (
    <section id="learning-paths" style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: "2rem", paddingRight: "2rem", maxWidth: 1280, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
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

        {/* handler-paths.jpg */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <img src="/handler-paths.jpg" alt="Handler Paths"
            style={{ width: "100%", maxWidth: 480, height: "auto", objectFit: "contain", borderRadius: 16, opacity: 0.9 }} />
        </div>
      </div>

      {/* Search bar */}
      <SearchBar query={query} setQuery={setQuery} placeholder={t.learning.searchPlaceholder} />

      {/* Cards */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
          {filtered.map((topic, i) => (
            <LearningTopicCard
              key={topic.id}
              topic={topic}
              index={i}
              filteredSubtopics={topic.filteredSubtopics}
              forceExpand={topic.forceExpand}
            />
          ))}
        </div>
      ) : (
        <NoResults query={query} />
      )}
    </section>
  );
}

function SearchBar({ query, setQuery, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ maxWidth: 560, margin: "0 auto 40px", position: "relative" }}>
      {/* Search icon */}
      <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: focused ? "#0A84FF" : "#8B949E", transition: "color 0.2s" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder || "Search courses..."}
        style={{
          width: "100%", padding: "14px 44px 14px 46px",
          background: "rgba(18,24,43,0.88)",
          border: `1px solid ${focused ? "#0A84FF" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 12, outline: "none",
          fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
          color: "#E6EDF3",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 3px rgba(10,132,255,0.15)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={() => setQuery("")}
          style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.07)", border: "none", borderRadius: "50%",
            width: 22, height: 22, cursor: "pointer", color: "#8B949E",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem",
          }}
        >✕</button>
      )}
    </div>
  );
}

function NoResults({ query }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0", color: "#8B949E" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>⬡</div>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem", color: "#E6EDF3", marginBottom: 8 }}>
        No results for "{query}"
      </p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>
        Try searching for a topic or module name.
      </p>
    </div>
  );
}