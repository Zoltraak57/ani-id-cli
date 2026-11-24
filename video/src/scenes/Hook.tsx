import { AbsoluteFill } from "remotion";
import { colors, gradientText } from "../theme";
import { interFamily, monoFamily } from "../fonts";
import { PosterCard } from "../components/PosterCard";
import { Reveal } from "../components/Reveal";
import { Cursor, Typed } from "../components/Typed";

export const Hook: React.FC = () => {
  return (
    <AbsoluteFill>
      <Reveal delay={2} y={14}>
        <div
          style={{
            position: "absolute",
            left: 150,
            top: 150,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "9px 18px",
            borderRadius: 999,
            border: "1px solid rgba(34, 211, 238, 0.35)",
            background: "rgba(34, 211, 238, 0.08)",
            fontFamily: monoFamily,
            fontSize: 16,
            letterSpacing: "0.22em",
            color: colors.cyanSoft,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: colors.green }}>●</span>
          Shell CLI · Open Source
        </div>
      </Reveal>

      <div style={{ position: "absolute", left: 150, top: 238 }}>
        <Reveal delay={8} y={30}>
          <div
            style={{
              fontFamily: interFamily,
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#f8fafc",
            }}
          >
            Nonton anime.
          </div>
        </Reveal>
        <Reveal delay={16} y={30}>
          <div
            style={{
              fontFamily: interFamily,
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              backgroundImage: gradientText,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Tanpa browser.
          </div>
        </Reveal>
      </div>

      <Reveal delay={30} y={20}>
        <div
          style={{
            position: "absolute",
            left: 156,
            top: 548,
            width: 860,
            fontFamily: interFamily,
            fontSize: 28,
            lineHeight: 1.5,
            color: colors.muted,
          }}
        >
          Cari, putar, dan unduh anime sub Indo — semuanya dari satu perintah
          di terminal.
        </div>
      </Reveal>

      <Reveal delay={44} y={26}>
        <div
          style={{
            position: "absolute",
            left: 150,
            top: 682,
            width: 950,
            height: 78,
            display: "flex",
            alignItems: "center",
            padding: "0 26px",
            borderRadius: 14,
            border: "1px solid rgba(34, 211, 238, 0.28)",
            background:
              "linear-gradient(160deg, rgba(11, 20, 36, 0.96), rgba(5, 10, 20, 0.96))",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(34,211,238,0.08)",
            fontFamily: monoFamily,
            fontSize: 27,
          }}
        >
          <span style={{ color: colors.green, marginRight: 16 }}>$</span>
          <Typed text='ani-id-cli "horimiya"' startFrame={58} charsPerFrame={1.5} />
          <Cursor startFrame={58} height={30} width={12} style={{ height: 30 }} />
          <span
            style={{
              marginLeft: "auto",
              fontFamily: monoFamily,
              fontSize: 15,
              letterSpacing: "0.14em",
              color: colors.dim,
              border: "1px solid rgba(148,163,184,0.25)",
              borderRadius: 7,
              padding: "5px 10px",
            }}
          >
            ENTER ↵
          </span>
        </div>
      </Reveal>

      <Reveal delay={62} y={14}>
        <div
          style={{
            position: "absolute",
            left: 152,
            top: 800,
            fontFamily: monoFamily,
            fontSize: 16,
            letterSpacing: "0.34em",
            color: colors.dim,
            textTransform: "uppercase",
          }}
        >
          Cari · Putar · Unduh
        </div>
      </Reveal>

      <div
        style={{
          position: "absolute",
          left: 1462,
          top: 214,
          opacity: 0.5,
          transform: "rotate(8deg)",
        }}
      >
        <PosterCard width={392} title="Horimiya: Piece" episode="Eps 12" />
      </div>

      <div
        style={{
          position: "absolute",
          left: 1252,
          top: 300,
          transform: "rotate(-5deg)",
        }}
      >
        <PosterCard width={472} progress={0.62} />
      </div>
    </AbsoluteFill>
  );
};
