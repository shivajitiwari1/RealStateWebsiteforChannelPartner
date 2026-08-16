export const metadata = {
  title: "Under Maintenance | PropTech NCR",
  description: "PropTech NCR is undergoing scheduled maintenance. We'll be back shortly.",
};

export default function MaintenancePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f6ff 0%, #ffffff 60%, #e0ebff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%           { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes shimmer-bar {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gear-big {
          animation: spin-cw 7s linear infinite;
          transform-origin: 152px 62px;
        }
        .gear-small {
          animation: spin-ccw 3.5s linear infinite;
          transform-origin: 186px 94px;
        }
        .svg-float {
          animation: float-up-down 3.5s ease-in-out infinite;
        }
        .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #3B6CB5; }
        .dot1 { animation: dot-bounce 1.5s ease-in-out infinite; }
        .dot2 { animation: dot-bounce 1.5s ease-in-out 0.2s infinite; }
        .dot3 { animation: dot-bounce 1.5s ease-in-out 0.4s infinite; }
        .shimmer-bar {
          height: 6px;
          width: 220px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #e0ebff 25%, #3B6CB5 50%, #e0ebff 75%);
          background-size: 400px 100%;
          animation: shimmer-bar 1.8s ease-in-out infinite;
        }
        .content-wrap {
          animation: fade-in-up 0.8s ease-out forwards;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>

      <div className="content-wrap">
        {/* Brand */}
        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#3B6CB5",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          PropTech NCR
        </p>

        {/* Animated SVG illustration */}
        <div className="svg-float" style={{ marginBottom: "2rem" }}>
          <svg
            width="240"
            height="210"
            viewBox="0 0 240 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow */}
            <ellipse cx="120" cy="205" rx="80" ry="5" fill="#3B6CB520" />

            {/* House body */}
            <rect x="30" y="100" width="160" height="100" fill="#e0ebff" rx="6" />

            {/* Roof */}
            <polygon points="14,100 120,18 226,100" fill="#3B6CB5" />
            <polygon points="14,100 120,18 226,100" fill="none" stroke="#2a55a0" strokeWidth="2" />

            {/* Roof ridge cap */}
            <circle cx="120" cy="18" r="5" fill="#2a55a0" />

            {/* Door */}
            <rect x="88" y="146" width="44" height="54" fill="#3B6CB5" rx="5" />
            <circle cx="127" cy="174" r="3.5" fill="#f0f6ff" />
            {/* Door arch */}
            <path d="M88 155 Q110 138 132 155" stroke="#2a55a0" strokeWidth="2" fill="none" />

            {/* Left window */}
            <rect x="40" y="115" width="40" height="34" fill="white" rx="5" />
            <line x1="60" y1="115" x2="60" y2="149" stroke="#e0ebff" strokeWidth="2" />
            <line x1="40" y1="132" x2="80" y2="132" stroke="#e0ebff" strokeWidth="2" />

            {/* Right window */}
            <rect x="160" y="115" width="40" height="34" fill="white" rx="5" />
            <line x1="180" y1="115" x2="180" y2="149" stroke="#e0ebff" strokeWidth="2" />
            <line x1="160" y1="132" x2="200" y2="132" stroke="#e0ebff" strokeWidth="2" />

            {/* Ground line */}
            <rect x="10" y="200" width="220" height="4" fill="#e0ebff" rx="2" />

            {/* Big gear */}
            <g className="gear-big">
              {/* Outer teeth ring */}
              <circle cx="152" cy="62" r="34" fill="none" stroke="#3B6CB5" strokeWidth="12" strokeDasharray="10 6" />
              {/* Hub */}
              <circle cx="152" cy="62" r="16" fill="#3B6CB5" />
              {/* Center hole */}
              <circle cx="152" cy="62" r="8" fill="white" />
              {/* Cross lines */}
              <line x1="152" y1="46" x2="152" y2="78" stroke="white" strokeWidth="2.5" />
              <line x1="136" y1="62" x2="168" y2="62" stroke="white" strokeWidth="2.5" />
            </g>

            {/* Small gear */}
            <g className="gear-small">
              <circle cx="186" cy="94" r="20" fill="none" stroke="#555566" strokeWidth="8" strokeDasharray="7 5" />
              <circle cx="186" cy="94" r="9" fill="#555566" />
              <circle cx="186" cy="94" r="4.5" fill="white" />
            </g>

            {/* Wrench */}
            <g transform="translate(118, 10) rotate(40)">
              <rect x="-4" y="-22" width="8" height="36" fill="#f59e0b" rx="3" />
              <rect x="-10" y="-26" width="20" height="10" fill="#f59e0b" rx="3" />
              <rect x="-8" y="-32" width="6" height="8" fill="#f59e0b" rx="2" />
              <rect x="2" y="-32" width="6" height="8" fill="#f59e0b" rx="2" />
            </g>

            {/* Helmet on roof */}
            <rect x="102" y="30" width="36" height="14" fill="#f59e0b" rx="7 7 0 0" />
            <rect x="98" y="40" width="44" height="5" fill="#d97706" rx="2" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          We&apos;re Upgrading for You
        </h1>

        {/* Subtext */}
        <p
          style={{
            color: "#555566",
            fontSize: "1rem",
            lineHeight: 1.7,
            maxWidth: "420px",
            marginBottom: "1.8rem",
          }}
        >
          PropTech NCR is currently undergoing scheduled maintenance to bring
          you a better property search experience. We&apos;ll be back shortly.
        </p>

        {/* Shimmer progress bar */}
        <div className="shimmer-bar" style={{ marginBottom: "1.8rem" }} />

        {/* Animated dots */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "2.5rem" }}>
          <span className="dot dot1" />
          <span className="dot dot2" />
          <span className="dot dot3" />
        </div>

        {/* WhatsApp CTA */}
        <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
          Need help? Reach us directly:
        </p>
        <a
          href="https://wa.me/919999649937?text=Hi%2C%20I%27m%20trying%20to%20reach%20PropTech%20NCR%20during%20maintenance."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#25D366",
            color: "white",
            padding: "0.75rem 1.75rem",
            borderRadius: "0.75rem",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.15s",
            boxShadow: "0 4px 14px #25D36640",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#1fb855";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#25D366";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>

        {/* Footer note */}
        <p style={{ marginTop: "3rem", fontSize: "0.75rem", color: "#bbb" }}>
          © {new Date().getFullYear()} PropTech NCR · All rights reserved
        </p>
      </div>
    </main>
  );
}
