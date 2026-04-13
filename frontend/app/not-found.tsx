export default function NotFound() {
  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#C8102E", fontSize: "5rem", fontFamily: "serif", fontWeight: "bold", lineHeight: 1 }}>404</div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#0D0D0D", marginTop: "1rem" }}>
        Page Not Found
      </h1>
      <p style={{ color: "#6B6B6B", marginTop: "0.5rem" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <a href="/" style={{ marginTop: "2rem", color: "#C8102E", textDecoration: "none", fontWeight: "600" }}>
        ← Back to Home
      </a>
    </div>
  );
}
