import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { monoFamily } from "../fonts";
import { Reveal } from "../components/Reveal";
import { Cursor, Typed } from "../components/Typed";
import { Prompt, Terminal, TLine } from "../components/Terminal";
import { Body, Chip, Headline, Kicker } from "../components/Text";

const DownloadBar: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [56, 168], [0.08, 0.94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cells = 22;
  const filled = Math.round(progress * cells);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <span style={{ color: colors.cyan }}>
        {"█".repeat(filled)}
        <span style={{ color: "#1e293b" }}>{"░".repeat(cells - filled)}</span>
      </span>
      <span style={{ color: "#e2e8f0", fontSize: 21 }}>
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
};

const SpeedLine: React.FC = () => {
  const frame = useCurrentFrame();
  const speed = (18 + Math.sin(frame / 9) * 4 + (frame % 7) * 0.35).toFixed(1);
  return (
    <TLine style={{ marginTop: 4, fontSize: 18, color: "#475569" }}>
      {speed} MB/s <span style={{ margin: "0 10px" }}>·</span> sisa{" "}
      {Math.max(1, Math.round(11 - frame / 16))} detik
      <span style={{ margin: "0 10px" }}>·</span> yt-dlp
    </TLine>
  );
};

export const Download: React.FC = () => {
  return (
    <AbsoluteFill>
      <Terminal
        style={{ left: 100, top: 252, width: 1092, height: 570 }}
        footer={
          <>
            <span>yt-dlp · 720p</span>
            <span>03 / 04</span>
          </>
        }
      >
        <TLine>
          <Prompt>
            <Typed
              text='ani-id-cli -d -q 720p "horimiya"'
              startFrame={2}
              charsPerFrame={3}
            />
          </Prompt>
          <Cursor startFrame={2} color={colors.cyan} />
        </TLine>

        <Reveal delay={22} y={8} duration={10}>
          <TLine style={{ marginTop: 8, color: colors.green }}>
            ✓ Horimiya E07 · 720p
          </TLine>
        </Reveal>

        <Reveal delay={40} y={8} duration={10}>
          <TLine style={{ marginTop: 12, color: "#94a3b8" }}>
            <span style={{ color: "#475569" }}>→</span>
            <span style={{ marginLeft: 12 }}>
              ./Horimiya_E07_720p.mp4
            </span>
          </TLine>
        </Reveal>

        <Reveal delay={52} y={10} duration={12}>
          <TLine style={{ marginTop: 22 }}>
            <DownloadBar />
          </TLine>
          <SpeedLine />
        </Reveal>

        <Reveal delay={66} y={8} duration={10}>
          <TLine style={{ marginTop: 14, fontSize: 18, color: colors.green }}>
            ✓ mirror odcdn · kualitas cocok
          </TLine>
        </Reveal>

        <Reveal delay={16} y={8} duration={10}>
          <TLine
            style={{
              marginTop: 30,
              paddingTop: 18,
              borderTop: "1px solid rgba(148,163,184,0.12)",
              fontSize: 17,
              color: "#475569",
              gap: 22,
            }}
          >
            <span>yt-dlp</span>
            <span>fallback: curl</span>
            <span>folder: .</span>
          </TLine>
        </Reveal>
      </Terminal>

      <div style={{ position: "absolute", left: 1272, top: 262, width: 552 }}>
        <Reveal delay={10} y={18}>
          <Kicker index="03" label="Unduh" />
        </Reveal>
        <Reveal delay={18} y={22}>
          <Headline style={{ marginTop: 24 }}>
            Pilih kualitas.
            <br />
            Unduh offline.
          </Headline>
        </Reveal>
        <Reveal delay={32} y={18}>
          <Body style={{ marginTop: 24 }}>
            <span style={{ fontFamily: monoFamily, color: "#cbd5e1" }}>
              best
            </span>
            , 720p, 480p, atau 360p. Unduhan lewat yt-dlp, dengan fallback
            curl.
          </Body>
        </Reveal>
        <Reveal delay={50} y={16}>
          <div style={{ display: "flex", gap: 10, marginTop: 30 }}>
            <Chip>best</Chip>
            <Chip filled>720p</Chip>
            <Chip>480p</Chip>
            <Chip>360p</Chip>
          </div>
        </Reveal>
        <Reveal delay={66} y={14}>
          <div
            style={{
              marginTop: 30,
              padding: "16px 20px",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.18)",
              background: "rgba(15, 23, 42, 0.55)",
              fontFamily: monoFamily,
              fontSize: 17,
              color: "#7c8ba1",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: colors.cyan }}>▣</span>
            Horimiya_E07_720p.mp4
            <span style={{ marginLeft: "auto", color: "#475569" }}>212 MB</span>
          </div>
        </Reveal>
      </div>
    </AbsoluteFill>
  );
};
