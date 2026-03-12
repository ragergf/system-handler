import { useState, useCallback } from "react";

const STORAGE_KEY = "sh_progress";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const result = {};
    for (const [key, val] of Object.entries(parsed)) {
      result[key] = new Set(val);
    }
    return result;
  } catch {
    return {};
  }
}

function saveToStorage(data) {
  try {
    const serializable = {};
    for (const [key, val] of Object.entries(data)) {
      serializable[key] = [...val];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch {
    console.warn("[SH] localStorage unavailable");
  }
}

// ─── useProgress ──────────────────────────────────────────────────────────────
// Phase 1: persists to localStorage
// Phase 2: replace internals with API/DB calls — components stay untouched
// ─────────────────────────────────────────────────────────────────────────────
export function useProgress() {
  const [progress, setProgress] = useState(loadFromStorage);

  const _update = useCallback((updated) => {
    saveToStorage(updated);
    setProgress({ ...updated });
  }, []);

  // Called automatically when user clicks any link
  const markComplete = useCallback((topicId, index) => {
    setProgress((prev) => {
      const next = { ...prev };
      const set = new Set(next[topicId] || []);
      set.add(index);
      next[topicId] = set;
      saveToStorage(next);
      return next;
    });
  }, []);

  // Manual toggle from checkbox click
  const toggleComplete = useCallback((topicId, index) => {
    setProgress((prev) => {
      const next = { ...prev };
      const set = new Set(next[topicId] || []);
      set.has(index) ? set.delete(index) : set.add(index);
      next[topicId] = set;
      saveToStorage(next);
      return next;
    });
  }, []);

  const isComplete = useCallback((topicId, index) => {
    return progress[topicId]?.has(index) ?? false;
  }, [progress]);

  const getTopicProgress = useCallback((topicId, total) => {
    return progress[topicId]?.size ?? 0;
  }, [progress]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({});
  }, []);

  return { markComplete, toggleComplete, isComplete, getTopicProgress, resetProgress };
}
