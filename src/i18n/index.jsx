import { createContext, useContext, useState } from "react";
import en from "./en";
import es from "./es";

const translations = { en, es };

function detectLanguage() {
  const browser = navigator.language || navigator.userLanguage || "en";
  return browser.toLowerCase().startsWith("es") ? "es" : "en";
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);
  const toggle = () => setLang((prev) => (prev === "en" ? "es" : "en"));
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
