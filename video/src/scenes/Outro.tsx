import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, gradientText } from "../theme";
import { interFamily, monoFamily } from "../fonts";
import { Reveal } from "../components/Reveal";
import { Cursor } from "../components/Typed";
import { Chip } from "../components/Text";

const GlowRing: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = 1 + Math.sin(frame / 26) * 0.03;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 348,
        width: 900,
        height: 900,
        marginLeft: -450,
        marginTop: -450,
        borderRadius: "50%",
        border: "1px solid rgba(56, 189, 248, 0.14)",
        boxShadow:
          "0 0 140px rgba(34, 211, 238, 0.10), inset 0 0 140px rgba(67, 56, 202, 0.10)",
        transform: `scale(${scale})`,
      }}
    />
  );
};

export const Outro: React.FC = () => {
  return (
    <AbsoluteFill>
      <GlowRing />

      <Reveal delay={4} y={14} style={{ position: "absolute", width: "100%", top: 248 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: monoFamily,
            fontSize: 16,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: colors.dim,
          }}
        >
          Search · Stream · Download
        </div>
      </Reveal>

      <Reveal delay={10} y={26} style={{ position: "absolute", width: "100%", top: 292 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            fontFamily: interFamily,
            fontSize: 148,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            backgroundImage: gradientText,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ani-id-cli
          <Cursor startFrame={0} color={colors.cyan} width={16} height={92} />
        </div>
      </Reveal>

      <Reveal delay={24} y={20} style={{ position: "absolute", width: "100%", top: 486 }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: interFamily,
            fontSize: 36,
            color: "#a8b6ca",
            letterSpacing: "-0.01em",
          }}
        >
          Anime sub Indo, langsung dari terminal.
        </div>
      </Reveal>

      <Reveal delay={36} y={22} style={{ position: "absolute", width: "100%", top: 576 }}>
        <div
          style={{
            width: 1180,
            margin: "0 auto",
            height: 84,
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            borderRadius: 16,
            border: "1px solid rgba(34, 211, 238, 0.3)",
            background:
              "linear-gradient(160deg, rgba(11, 20, 36, 0.96), rgba(5, 10, 20, 0.96))",
            boxShadow:
              "0 30px 90px rgba(0, 0, 0, 0.5), 0 0 60px rgba(34, 211, 238, 0.08)",
            fontFamily: monoFamily,
            fontSize: 25,
          }}
        >
          <span style={{ color: colors.green, marginRight: 16 }}>$</span>
          <span style={{ color: "#e2e8f0" }}>
            git clone https://github.com/Zoltraak57/ani-id-cli.git
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: monoFamily,
              fontSize: 14,
              letterSpacing: "0.16em",
              color: colors.cyanSoft,
              border: "1px solid rgba(34, 211, 238, 0.35)",
              borderRadius: 7,
              padding: "6px 12px",
            }}
          >
            COPY
          </span>
        </div>
      </Reveal>

      <Reveal delay={50} y={16} style={{ position: "absolute", width: "100%", top: 700 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
          <Chip filled color={colors.cyan}>
            ★ Star di GitHub
          </Chip>
          <Chip color={colors.indigo}>github.com/Zoltraak57/ani-id-cli</Chip>
        </div>
      </Reveal>

      <Reveal delay={64} y={14} style={{ position: "absolute", width: "100%", top: 786 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            fontFamily: monoFamily,
            fontSize: 17,
            color: "#475569",
          }}
        >
          <span>POSIX shell</span>
          <span>·</span>
          <span>35 tests</span>
          <span>·</span>
          <span>mpv · fzf · yt-dlp</span>
          <span>·</span>
          <span>open source</span>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
