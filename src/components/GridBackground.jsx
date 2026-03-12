export default function GridBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ background: "#0B0F1A", position: "absolute", inset: 0 }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.065 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0A84FF" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "65vw", height: "65vw", background: "radial-gradient(ellipse, rgba(10,132,255,0.13) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: "-25%", right: "-10%", width: "55vw", height: "55vw", background: "radial-gradient(ellipse, rgba(122,92,255,0.10) 0%, transparent 70%)" }} />
    </div>
  );
}
