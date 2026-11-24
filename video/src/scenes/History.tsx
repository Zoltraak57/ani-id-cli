import { AbsoluteFill } from "remotion";
import { colors } from "../theme";
import { monoFamily } from "../fonts";
import { Reveal } from "../components/Reveal";
import { Cursor, Typed } from "../components/Typed";
import { Prompt, Terminal, TLine } from "../components/Terminal";
import { Body, Chip, Headline, Kicker } from "../components/Text";

const HistoryRow: React.FC<{
  ep: string;
  label: string;
  state: "watched" | "next";
}> = ({ ep, label, state }) => {
  const next = state === "next";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "8px 12px",
        borderRadius: 8,
        background: next ? "rgba(34, 211, 238, 0.12)" : "transparent",
        border: next
          ? "1px solid rgba(34, 211, 238, 0.35)"
          : "1px solid transparent",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: next ? colors.cyan : colors.green,
          opacity: next ? 1 : 0.7,
        }}
      />
      <span style={{ fontFamily: monoFamily, fontSize: 19, color: "#cbd5e1" }}>
        E{ep}
      </span>
      <span style={{ fontSize: 17, color: "#64748b" }}>{label}</span>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: monoFamily,
          fontSize: 15,
          color: next ? colors.cyan : "#475569",
        }}
      >
        {next ? "berikutnya" : "selesai"}
      </span>
    </div>
  );
};

export const History: React.FC = () => {
  return (
    <AbsoluteFill>
      <Terminal
        style={{ left: 100, top: 252, width: 1092, height: 570 }}
        footer={
          <>
            <span>~/.local/state/ani-id-cli</span>
            <span>04 / 04</span>
          </>
        }
      >
        <TLine>
          <Prompt>
            <Typed text="ani-id-cli -c" startFrame={2} charsPerFrame={3} />
          </Prompt>
          <Cursor startFrame={2} color={colors.cyan} />
        </TLine>

        <Reveal delay={22} y={8} duration={10}>
          <TLine style={{ marginTop: 8, color: "#94a3b8" }}>
            <span style={{ color: "#475569" }}>riwayat</span>
            <span style={{ marginLeft: 14 }}>Horimiya · E07</span>
          </TLine>
        </Reveal>

        <Reveal delay={38} y={8} duration={10}>
          <TLine style={{ marginTop: 4, color: colors.cyanSoft }}>
            <span style={{ color: colors.green, marginRight: 12 }}>▶</span>
            Melanjutkan E08
          </TLine>
        </Reveal>

        <Reveal delay={58} y={8} duration={10}>
          <TLine style={{ marginTop: 30 }}>
            <Prompt>
              <Typed
                text='ani-id-cli -e 5-7 "horimiya"'
                startFrame={60}
                charsPerFrame={3}
              />
            </Prompt>
            <Cursor startFrame={60} color={colors.cyan} />
          </TLine>
        </Reveal>

        <Reveal delay={92} y={8} duration={12}>
          <TLine style={{ marginTop: 8, color: "#94a3b8" }}>
            <span style={{ color: colors.green, marginRight: 12 }}>▶</span>
            Memutar E05, E06, E07
          </TLine>
        </Reveal>

        <Reveal delay={104} y={8} duration={12}>
          <TLine style={{ marginTop: 40, fontSize: 17, color: "#475569" }}>
            menu: next · replay · previous · change_quality · quit
          </TLine>
        </Reveal>
      </Terminal>

      <div style={{ position: "absolute", left: 1272, top: 250, width: 552 }}>
        <Reveal delay={8} y={18}>
          <Kicker index="04" label="Lanjutkan" />
        </Reveal>
        <Reveal delay={16} y={22}>
          <Headline size={60} style={{ marginTop: 24 }}>
            Lanjut dari
            <br />
            episode terakhir.
          </Headline>
        </Reveal>
        <Reveal delay={30} y={18}>
          <Body style={{ marginTop: 22 }}>
            Riwayat tersimpan otomatis. Mau maraton? Pakai rentang episode.
          </Body>
        </Reveal>
        <Reveal delay={44} y={16}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
            <Chip filled>-c</Chip>
            <Chip>-e 5-7</Chip>
            <Chip>-e &quot;5 6&quot;</Chip>
            <Chip>-e -1</Chip>
          </div>
        </Reveal>
        <Reveal delay={58} y={14}>
          <div
            style={{
              marginTop: 26,
              padding: 12,
              borderRadius: 14,
              border: "1px solid rgba(148,163,184,0.16)",
              background: "rgba(10, 18, 32, 0.6)",
            }}
          >
            <HistoryRow ep="06" label="Horimiya" state="watched" />
            <HistoryRow ep="07" label="Horimiya" state="watched" />
            <HistoryRow ep="08" label="Horimiya" state="next" />
          </div>
        </Reveal>
      </div>
    </AbsoluteFill>
  );
};
