import { useState } from "react";
import { useLang } from "../i18n/index.jsx";
import { useProgress } from "../hooks/useProgress.jsx";
import SubtopicItem from "./SubtopicItem";

export default function LearningTopicCard({ topic, index, filteredSubtopics, forceExpand  }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { t } = useLang();
  const { getTopicProgress } = useProgress();

  const total = topic.subtopics.length;
  const done = getTopicProgress(topic.id, total);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isCompleted = done === total && total > 0;
  const isActive = expanded || hovered;
  const isExpanded = forceExpand || expanded;
  const subtopicsToShow = filteredSubtopics || topic.subtopics;

  return (
    <div
      style={{
        background: "rgba(18,24,43,0.88)",
        border: `1px solid ${isCompleted ? "rgba(40,200,80,0.4)" : isActive ? topic.glowColor + "50" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16, overflow: "hidden",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        boxShadow: isCompleted
          ? "0 0 40px rgba(40,200,80,0.12), 0 8px 40px rgba(0,0,0,0.4)"
          : isActive ? `0 0 48px ${topic.glowColor}1A, 0 12px 48px rgba(0,0,0,0.55)` : "0 4px 28px rgba(0,0,0,0.3)",
        animation: "fadeSlideUp 0.55s ease both",
        animationDelay: `${index * 0.12}s`,
        backdropFilter: "blur(14px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div onClick={() => !forceExpand && setExpanded(!expanded)} style={{ padding: "28px 28px 0", cursor: forceExpand ? "default" : "pointer", userSelect: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          {/* Icon */}
          <div style={{
            width: 50, height: 50, borderRadius: 13,
            background: `${topic.glowColor}14`, border: `1px solid ${topic.glowColor}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.5rem", color: topic.glowColor,
            boxShadow: `0 0 22px ${topic.glowColor}28`, flexShrink: 0,
          }}>
            {topic.icon}
          </div>

          {/* Right: completed badge + chevron */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isCompleted && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 20,
                background: "rgba(40,200,80,0.12)", border: "1px solid rgba(40,200,80,0.3)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.68rem", fontWeight: 700,
                color: "#28C840", letterSpacing: "0.08em",
              }}>
                ✓ {t.learning.completed}
              </span>
            )}
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(10,132,255,0.07)", border: "1px solid rgba(10,132,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#0A84FF", fontSize: "0.8rem",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.35s ease", flexShrink: 0,
            }}>▾</div>
          </div>
        </div>

        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: "1.22rem",
          color: "#E6EDF3", margin: "0 0 8px", letterSpacing: "-0.015em",
        }}>
          {topic.title}
        </h3>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.855rem", color: "#8B949E", margin: 0, lineHeight: 1.65,
        }}>
          {topic.description}
        </p>

        {/* Progress bar */}
        <div style={{ marginTop: 18, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#8B949E" }}>
              {t.learning.progress}
            </span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 700,
              color: isCompleted ? "#28C840" : topic.glowColor,
            }}>
              {done}/{total} {t.learning.modules}
            </span>
          </div>
          {/* Track */}
          <div style={{
            height: 4, borderRadius: 4,
            background: "rgba(255,255,255,0.07)", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: 4,
              width: `${pct}%`,
              background: isCompleted
                ? "linear-gradient(90deg, #28C840, #00E5FF)"
                : `linear-gradient(90deg, ${topic.glowColor}, #00E5FF)`,
              transition: "width 0.4s ease",
              boxShadow: `0 0 8px ${isCompleted ? "rgba(40,200,80,0.5)" : topic.glowColor + "80"}`,
            }} />
          </div>
        </div>
      </div>

      {/* Subtopics */}
      {isExpanded && (
        <div style={{ padding: "0 28px 24px", borderTop: "1px solid rgba(255,255,255,0.055)" }}>
          <div style={{ height: 16 }} />
          {subtopicsToShow.map((sub) => (
            <SubtopicItem key={sub.title} subtopic={sub} index={topic.subtopics.indexOf(sub)} topicId={topic.id} />
          ))}
        </div>
      )}
    </div>
  );
}
