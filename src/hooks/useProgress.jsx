import { createContext, useContext, useState, useCallback } from "react";

const ProgressContext = createContext(null);

const STORAGE_KEY = "sh_progress";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    //console.log("Loading from storage:", raw); // ← agrega esto
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const result = {};
    for (const [key, val] of Object.entries(parsed)) {
      result[key] = new Set(Array.isArray(val) ? val : []);
    }
    return result;
  } catch { return {}; }
}

function saveToStorage(data) {
  try {
    const serializable = {};
    for (const [key, val] of Object.entries(data)) {
      serializable[key] = Array.from(val);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch {}
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => loadFromStorage());

  const markComplete = useCallback((topicId, index) => {
    setProgress((prev) => {
      const set = new Set(prev[topicId] || []);
      set.add(index);
      const next = { ...prev, [topicId]: set };
      saveToStorage(next);
      return next;
    });
  }, []);

  const toggleComplete = useCallback((topicId, index) => {
    setProgress((prev) => {
      const set = new Set(prev[topicId] || []);
      set.has(index) ? set.delete(index) : set.add(index);
      const next = { ...prev, [topicId]: set };
      saveToStorage(next);
      return next;
    });
  }, []);

  const isComplete = useCallback((topicId, index) => {
    return progress[topicId]?.has(index) ?? false;
  }, [progress]);

  const getTopicProgress = useCallback((topicId) => {
    return progress[topicId]?.size ?? 0;
  }, [progress]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({});
  }, []);

  return (
    <ProgressContext.Provider value={{ markComplete, toggleComplete, isComplete, getTopicProgress, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}