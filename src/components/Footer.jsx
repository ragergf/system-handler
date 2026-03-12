import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLang } from "../i18n/index.jsx";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer style={{ borderTop: "1px solid rgba(10,132,255,0.1)", padding: "48px 2rem 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Logo centrado */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
          <div style={{ height: 70, width: 320, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src="/logo.png"
              alt="System Handler"
              style={{
                height: 260,
                width: "auto",
                marginLeft: -55,
                marginTop: 0,
                objectFit: "contain",
              }}
            />
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.88rem",
            color: "#8B949E",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: 360,
            marginTop: 12,
          }}>
            {t.footer.tagline}
          </p>
        </div>

        {/* Nav links centrados */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { label: t.nav.learning,   to: "/" },
            { label: t.nav.community,  to: "/community" },
            { label: t.nav.about,      to: "/about" },
            { label: t.nav.social,     to: "/social" },
          ].map(({ label, to }) => (
            <FooterLink key={to} label={label} to={to} />
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.055)",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#3D4554" }}>
            {t.footer.copy}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#3D4554" }}>
            v2.0.0 — system.active
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, to }) {
  const [hovered, setHovered] = useState(false);
  return (
    <NavLink to={to} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", color: hovered ? "#0A84FF" : "#8B949E", textDecoration: "none", transition: "color 0.2s" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {label}
    </NavLink>
  );
}
