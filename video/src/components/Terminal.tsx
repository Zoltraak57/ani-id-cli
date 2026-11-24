import { useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { monoFamily as mono } from "../fonts";

type TerminalProps = {
  title?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  accent?: string;
  footer?: React.ReactNode;
};

export const Terminal: React.FC<TerminalProps> = ({
  title = "zola@arch — ani-id-cli",
  style,
  children,
  accent = "rgba(34, 211, 238, 0.22)",
  footer,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: 20,
        border: `1px solid ${accent}`,
        background:
          "linear-gradient(165deg, rgba(12, 20, 36, 0.97), rgba(5, 9, 18, 0.98))",
        boxShadow:
          "0 50px 140px rgba(0, 0, 0, 0.65), 0 0 90px rgba(34, 211, 238, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          height: 54,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
          background: "rgba(15, 23, 42, 0.55)",
        }}
      >
        <div style={{ display: "flex", gap: 9 }}>
          <Dot color="#f87171" />
          <Dot color="#fbbf24" />
          <Dot color="#34d399" />
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: mono,
            fontSize: 17,
            color: colors.dim,
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div
        style={{
          padding: "26px 34px 30px",
          fontFamily: mono,
          fontSize: 22,
          lineHeight: 1.62,
          color: "#cbd5e1",
          whiteSpace: "pre",
        }}
      >
        {children}
      </div>
      {footer ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderTop: "1px solid rgba(148, 163, 184, 0.10)",
            background: "rgba(15, 23, 42, 0.32)",
            fontFamily: mono,
            fontSize: 14,
            letterSpacing: "0.08em",
            color: "#475569",
          }}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 13,
      height: 13,
      borderRadius: "50%",
      backgroundColor: color,
      opacity: 0.85,
    }}
  />
);

export const TLine: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 0,
      minHeight: 36,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Prompt: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <span style={{ color: colors.green, marginRight: 14 }}>$</span>
    <span style={{ color: "#f1f5f9" }}>{children}</span>
  </>
);

export const SelectRow: React.FC<{
  label: string;
  active?: boolean;
  width?: number;
  suffix?: React.ReactNode;
}> = ({ label, active = false, width, suffix }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      width: width ?? "100%",
      padding: "2px 12px",
      marginLeft: -12,
      borderRadius: 8,
      background: active ? "rgba(34, 211, 238, 0.16)" : "transparent",
      boxShadow: active ? "inset 2px 0 0 #22d3ee" : "none",
    }}
  >
    <span
      style={{
        width: 26,
        color: active ? colors.cyan : colors.dim,
        opacity: active ? 1 : 0.7,
      }}
    >
      {active ? "❯" : " "}
    </span>
    <span style={{ color: active ? "#f8fafc" : "#94a3b8" }}>{label}</span>
    {suffix}
  </div>
);

export const Spin: React.FC<{ at?: number }> = ({ at = 0 }) => {
  const frame = useCurrentFrame();
  const glyphs = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  return (
    <span style={{ color: colors.cyan }}>
      {glyphs[Math.floor((frame - at) / 4) % glyphs.length]}
    </span>
  );
};

export const terminalFont = mono;
