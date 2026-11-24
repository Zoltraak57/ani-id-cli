import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { monoFamily } from "../fonts";
import { Reveal } from "../components/Reveal";
import { Cursor, Typed } from "../components/Typed";
import {
  Prompt,
  SelectRow,
  Spin,
  Terminal,
  TLine,
} from "../components/Terminal";
import { Body, Chip, Headline, Kicker } from "../components/Text";

const SearchStatus: React.FC = () => {
  const frame = useCurrentFrame();
  const done = frame >= 52;
  const dots = ".".repeat((Math.floor(frame / 7) % 3) + 1);

  if (done) {
    return (
      <span style={{ color: colors.green }}>
        ✓ 3 hasil ditemukan
      </span>
    );
  }

  return (
    <span style={{ color: "#7c8ba1" }}>
      <Spin at={26} /> Mencari &quot;horimiya&quot; di Otakudesu{dots}
    </span>
  );
};

export const Search: React.FC = () => {
  return (
    <AbsoluteFill>
      <Terminal
        style={{ left: 100, top: 252, width: 1092, height: 570 }}
        footer={
          <>
            <span>otakudesu.blog</span>
            <span>01 / 04</span>
          </>
        }
      >
        <TLine>
          <Prompt>
            <Typed text='ani-id-cli "horimiya"' startFrame={4} charsPerFrame={2} />
          </Prompt>
          <Cursor startFrame={4} color={colors.cyan} />
        </TLine>

        <Reveal delay={26} y={10} duration={12}>
          <TLine style={{ marginTop: 8 }}>
            <SearchStatus />
          </TLine>
        </Reveal>

        <Reveal delay={52} y={12} duration={14}>
          <div style={{ marginTop: 14, color: "#64748b", fontSize: 19 }}>
            Pilih anime:
          </div>
          <SelectRow
            active
            label="Horimiya"
            suffix={
              <span style={{ marginLeft: "auto", color: "#475569", fontSize: 17 }}>
                13 eps
              </span>
            }
          />
          <SelectRow
            label="Horimiya: Piece"
            suffix={
              <span style={{ marginLeft: "auto", color: "#475569", fontSize: 17 }}>
                13 eps
              </span>
            }
          />
          <SelectRow
            label="Horimiya (Movie)"
            suffix={
              <span style={{ marginLeft: "auto", color: "#475569", fontSize: 17 }}>
                2023
              </span>
            }
          />
        </Reveal>

        <Reveal delay={92} y={10} duration={14}>
          <TLine
            style={{
              marginTop: 22,
              fontSize: 18,
              color: "#475569",
              gap: 26,
            }}
          >
            <span>↑ ↓ navigasi</span>
            <span>⏎ pilih</span>
            <span>esc batal</span>
          </TLine>
        </Reveal>
      </Terminal>

      <div style={{ position: "absolute", left: 1272, top: 268, width: 552 }}>
        <Reveal delay={12} y={18}>
          <Kicker index="01" label="Cari" />
        </Reveal>
        <Reveal delay={20} y={22}>
          <Headline size={60} style={{ marginTop: 24 }}>
            Cari judul.
            <br />
            Langsung ketemu.
          </Headline>
        </Reveal>
        <Reveal delay={34} y={18}>
          <Body style={{ marginTop: 26, width: 520 }}>
            Hasil pencarian dari Otakudesu langsung masuk menu pilihan. Tanpa
            iklan, tanpa tab baru.
          </Body>
        </Reveal>
        <Reveal delay={50} y={16}>
          <div
            style={{
              marginTop: 34,
              fontFamily: monoFamily,
              fontSize: 15,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: colors.dim,
            }}
          >
            Contoh pencarian
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
            <Chip>&quot;horimiya&quot;</Chip>
            <Chip>&quot;one piece&quot;</Chip>
            <Chip>&quot;ao ashi&quot;</Chip>
          </div>
        </Reveal>
      </div>
    </AbsoluteFill>
  );
};
