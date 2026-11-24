import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { PosterCard } from "../components/PosterCard";
import { Reveal } from "../components/Reveal";
import { Cursor, Typed } from "../components/Typed";
import { Prompt, SelectRow, Terminal, TLine } from "../components/Terminal";
import { Body, Headline, Kicker } from "../components/Text";

const episodes = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
];

const EpisodeGrid: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
    <div style={{ display: "flex", gap: 8 }}>
      {episodes.slice(0, 7).map((ep) => (
        <EpisodeCell key={ep} ep={ep} />
      ))}
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {episodes.slice(7).map((ep) => (
        <EpisodeCell key={ep} ep={ep} />
      ))}
    </div>
  </div>
);

const EpisodeCell: React.FC<{ ep: string }> = ({ ep }) => {
  const active = ep === "07";
  return (
    <div
      style={{
        width: 58,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        border: active
          ? "1px solid rgba(34, 211, 238, 0.7)"
          : "1px solid rgba(148, 163, 184, 0.16)",
        background: active ? "rgba(34, 211, 238, 0.18)" : "transparent",
        color: active ? "#f8fafc" : "#64748b",
        fontSize: 19,
        boxShadow: active ? "0 0 26px rgba(34,211,238,0.25)" : "none",
      }}
    >
      {ep}
    </div>
  );
};

const PlayingCard: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [20, 178], [0.18, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", left: 1272, top: 564 }}>
      <PosterCard width={552} progress={progress} episode="Eps 07" />
    </div>
  );
};

export const Play: React.FC = () => {
  return (
    <AbsoluteFill>
      <Terminal
        style={{ left: 100, top: 252, width: 1092, height: 570 }}
        footer={
          <>
            <span>mpv · 720p</span>
            <span>02 / 04</span>
          </>
        }
      >
        <TLine>
          <Prompt>
            <Typed text='ani-id-cli "horimiya"' startFrame={2} charsPerFrame={3} />
          </Prompt>
          <Cursor startFrame={2} color={colors.cyan} />
        </TLine>

        <Reveal delay={18} y={8} duration={10}>
          <TLine style={{ marginTop: 6, color: colors.green }}>
            ✓ 3 hasil ditemukan
          </TLine>
        </Reveal>

        <Reveal delay={36} y={10} duration={12}>
          <div style={{ marginTop: 12, color: "#64748b", fontSize: 19 }}>
            Pilih anime:
          </div>
          <SelectRow active label="Horimiya" />
          <SelectRow label="Horimiya: Piece" />
        </Reveal>

        <Reveal delay={62} y={10} duration={12}>
          <div style={{ marginTop: 12, color: "#64748b", fontSize: 19 }}>
            Episode:
          </div>
          <EpisodeGrid />
        </Reveal>

        <Reveal delay={120} y={10} duration={14}>
          <TLine style={{ marginTop: 18, color: colors.cyanSoft }}>
            <span style={{ color: colors.green, marginRight: 12 }}>▶</span>
            Memutar E07 di mpv
            <span style={{ color: "#475569", marginLeft: 12 }}>· 720p</span>
          </TLine>
        </Reveal>
      </Terminal>

      <div style={{ position: "absolute", left: 1272, top: 250, width: 552 }}>
        <Reveal delay={10} y={18}>
          <Kicker index="02" label="Putar" />
        </Reveal>
        <Reveal delay={18} y={22}>
          <Headline style={{ marginTop: 24 }}>
            Pilih episode.
            <br />
            mpv jalan.
          </Headline>
        </Reveal>
        <Reveal delay={32} y={18}>
          <Body style={{ marginTop: 24 }}>
            Player favoritmu langsung terbuka. Tanpa buffering di browser,
            tanpa iklan.
          </Body>
        </Reveal>
      </div>

      <PlayingCard />
    </AbsoluteFill>
  );
};
