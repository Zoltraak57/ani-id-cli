import { colors } from "../theme";
import { interFamily, monoFamily } from "../fonts";

type Props = {
  width?: number;
  title?: string;
  episode?: string;
  quality?: string;
  progress?: number;
  style?: React.CSSProperties;
};

export const PosterCard: React.FC<Props> = ({
  width = 480,
  title = "Horimiya",
  episode = "Eps 07",
  quality = "720p",
  progress = 0.34,
  style,
}) => {
  const height = width * 0.5625;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(148, 163, 184, 0.22)",
        boxShadow:
          "0 40px 90px rgba(0, 0, 0, 0.6), 0 0 70px rgba(56, 189, 248, 0.12)",
        background: colors.bgSoft,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 28% 22%, rgba(34, 211, 238, 0.55), transparent 58%), radial-gradient(circle at 78% 72%, rgba(129, 140, 248, 0.55), transparent 58%), radial-gradient(circle at 62% 18%, rgba(244, 114, 182, 0.35), transparent 48%), linear-gradient(160deg, #101a30, #05080f)",
        }}
      />

      <svg
        viewBox="0 0 480 270"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <circle cx="360" cy="92" r="52" fill="rgba(255,255,255,0.10)" />
        <circle
          cx="360"
          cy="92"
          r="72"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
        />
        <circle
          cx="360"
          cy="92"
          r="94"
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="1.5"
        />
        <path
          d="M0 208 C 70 186, 120 216, 190 196 S 320 164, 480 192 L480 270 L0 270 Z"
          fill="rgba(3, 7, 18, 0.55)"
        />
        <path
          d="M0 226 C 90 208, 150 236, 240 218 S 380 194, 480 216 L480 270 L0 270 Z"
          fill="rgba(2, 5, 12, 0.8)"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderRadius: 999,
          background: "rgba(2, 6, 16, 0.55)",
          border: "1px solid rgba(255,255,255,0.14)",
          fontFamily: monoFamily,
          fontSize: 13,
          color: "#e2e8f0",
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ color: colors.green }}>●</span> mpv
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: width * 0.15,
            height: width * 0.15,
            borderRadius: "50%",
            background: "rgba(248, 250, 252, 0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              marginLeft: width * 0.012,
              borderTop: `${width * 0.037}px solid transparent`,
              borderBottom: `${width * 0.037}px solid transparent`,
              borderLeft: `${width * 0.062}px solid #0b1220`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 48%, rgba(2, 5, 12, 0.86) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          bottom: 20,
          fontFamily: interFamily,
        }}
      >
        <div
          style={{
            fontSize: width * 0.052,
            fontWeight: 700,
            color: "#f8fafc",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: monoFamily,
            fontSize: width * 0.032,
            color: "#a5b4c9",
            marginTop: 4,
          }}
        >
          {episode} · {quality}
        </div>
        <div
          style={{
            marginTop: 12,
            height: 4,
            borderRadius: 999,
            background: "rgba(255,255,255,0.18)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${colors.cyan}, ${colors.indigo})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
