import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLang } from "../i18n/index.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, []);

  const links = [
    { to: "/",          label: t.nav.learning },
    { to: "/community", label: t.nav.community },
    { to: "/about",     label: t.nav.about },
    { to: "/social",    label: t.nav.social },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(11,15,26,0.96)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(10,132,255,0.14)" : "1px solid transparent",
        transition: "all 0.35s ease",
        padding: "0 1.5rem",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            <div style={{ height: 48, width: 180, overflow: "hidden", display: "flex", alignItems: "center" }}>
              <img
                src="/logo.png"
                alt="System Handler"
                style={{ height: 170, width: "auto", marginLeft: -35, marginTop: 0, objectFit: "contain", transition: "height 0.35s ease" }}
              />
            </div>
          </NavLink>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: "1.8rem", alignItems: "center", "@media(max-width:768px)": { display: "none" } }}
            className="desktop-nav">
            {links.map(({ to, label }) => (
              <RouterNavLink key={to} to={to} label={label} />
            ))}
            <LangToggle lang={lang} toggle={toggle} />
            <StartButton label={t.nav.startLearning} />
          </div>

          {/* Mobile right: lang toggle + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="mobile-nav">
            <LangToggle lang={lang} toggle={toggle} />
            <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div style={{
            borderTop: "1px solid rgba(10,132,255,0.1)",
            padding: "16px 0 20px",
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            {links.map(({ to, label }) => (
              <MobileNavLink key={to} to={to} label={label} onClick={() => setMenuOpen(false)} />
            ))}
            <div style={{ padding: "12px 16px 0" }}>
              <StartButton label={t.nav.startLearning} fullWidth onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        )}
      </nav>

      {/* Inline responsive styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav  { display: none  !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: flex  !important; }
        }
      `}</style>
    </>
  );
}

function RouterNavLink({ to, label }) {
  return (
    <NavLink to={to} style={({ isActive }) => ({
      fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.85rem",
      color: isActive ? "#0A84FF" : "#8B949E",
      textDecoration: "none", letterSpacing: "0.03em",
      borderBottom: isActive ? "1px solid #0A84FF" : "1px solid transparent",
      paddingBottom: 2, transition: "color 0.2s",
    })}>
      {label}
    </NavLink>
  );
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} style={({ isActive }) => ({
      fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "1rem",
      color: isActive ? "#0A84FF" : "#E6EDF3",
      textDecoration: "none", padding: "12px 16px",
      borderRadius: 8, display: "block",
      background: isActive ? "rgba(10,132,255,0.08)" : "transparent",
      transition: "background 0.2s, color 0.2s",
    })}>
      {label}
    </NavLink>
  );
}

function HamburgerButton({ open, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "rgba(10,132,255,0.06)",
      border: "1px solid rgba(10,132,255,0.2)",
      borderRadius: 8, width: 38, height: 38,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 5, cursor: "pointer", padding: 0,
    }}>
      <span style={{
        width: 18, height: 1.5, background: "#E6EDF3", borderRadius: 2, display: "block",
        transform: open ? "rotate(45deg) translateY(6.5px)" : "none",
        transition: "transform 0.25s ease",
      }} />
      <span style={{
        width: 18, height: 1.5, background: "#E6EDF3", borderRadius: 2, display: "block",
        opacity: open ? 0 : 1, transition: "opacity 0.2s ease",
      }} />
      <span style={{
        width: 18, height: 1.5, background: "#E6EDF3", borderRadius: 2, display: "block",
        transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none",
        transition: "transform 0.25s ease",
      }} />
    </button>
  );
}

function LangToggle({ lang, toggle }) {
  const isEN = lang === "en";
  return (
    <button onClick={toggle} title={isEN ? "Cambiar a Español" : "Switch to English"}
      style={{
        display: "flex", alignItems: "center",
        background: "rgba(10,132,255,0.06)",
        border: "1px solid rgba(10,132,255,0.2)",
        borderRadius: 8, padding: 0, cursor: "pointer", overflow: "hidden",
      }}>
      {["EN", "ES"].map((l, i) => (
        <span key={l}>
          {i === 1 && <span style={{ width: 1, height: 16, background: "rgba(10,132,255,0.2)", display: "inline-block", verticalAlign: "middle" }} />}
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.75rem",
            padding: "6px 10px", letterSpacing: "0.06em", display: "inline-block",
            background: (l === "EN" ? isEN : !isEN) ? "linear-gradient(135deg, #0A84FF, #00E5FF)" : "transparent",
            color: (l === "EN" ? isEN : !isEN) ? "#fff" : "#8B949E",
            transition: "all 0.25s ease",
          }}>{l}</span>
        </span>
      ))}
    </button>
  );
}

function StartButton({ label, fullWidth, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onNavigate) onNavigate(); // ← cierra el menú
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("learning-paths");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <button onClick={handleClick}
      style={{
        background: "linear-gradient(135deg, #0A84FF, #00E5FF)",
        border: "none", borderRadius: 8,
        padding: "8px 20px", width: fullWidth ? "100%" : "auto",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600, fontSize: "0.82rem", color: "#fff",
        cursor: "pointer", letterSpacing: "0.04em",
        boxShadow: hovered ? "0 0 28px rgba(10,132,255,0.65)" : "0 0 16px rgba(10,132,255,0.35)",
        transition: "box-shadow 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  );
}