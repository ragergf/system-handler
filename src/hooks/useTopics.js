import { useMemo } from "react";
import { TOPICS } from "../data/topics";
import { useLang } from "../i18n/index.jsx";

// ─── useTopics ────────────────────────────────────────────────────────────────
// Phase 1: merges static topics.js with active language translations
// Phase 2: replace internals with API/DB fetch — components stay untouched
// ─────────────────────────────────────────────────────────────────────────────
export function useTopics() {
  const { t } = useLang();

  const topics = useMemo(() => {
    return TOPICS.map((topic, i) => {
      const tr = t.topics[i];
      return {
        ...topic,
        title: tr.title,
        description: tr.description,
        subtopics: tr.subtopics.map((sub) => ({
          title: sub.title,
          youtube: sub.youtube,
          tiktok: sub.tiktok,
          github: sub.github,
        })),
      };
    });
  }, [t]);

  return { topics, loading: false };
}
