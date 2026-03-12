import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./i18n";
import GridBackground from "./components/GridBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LearningPage from "./pages/LearningPage";
import CommunityPage from "./pages/CommunityPage";
import AboutPage from "./pages/AboutPage";
import SocialPage from "./pages/SocialPage";
import { ProgressProvider, useProgress } from "./hooks/useProgress.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <ProgressProvider>   {/* ← agrega este wrapper */}
          <div style={{ minHeight: "100vh", position: "relative" }}>
            <GridBackground />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/"          element={<LearningPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/about"     element={<AboutPage />} />
                  <Route path="/social"    element={<SocialPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </ProgressProvider>   {/* ← cierra aquí */}
      </LangProvider>
    </BrowserRouter>
  );
}
