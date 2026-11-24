import { colors } from "../theme";
import { interFamily, monoFamily } from "../fonts";

export const Kicker: React.FC<{
  index?: string;
  label: string;
  color?: string;
}> = ({ index, label, color = colors.cyan }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontFamily: monoFamily,
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color,
    }}
  >
    {index ? (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: 6,
          border: `1px solid ${color}55`,
          background: `${color}14`,
          letterSpacing: "0.16em",
        }}
      >
        {index}
      </span>
    ) : null}
    <span>{label}</span>
  </div>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 68, color = "#f1f5f9", style }) => (
  <div
    style={{
      fontFamily: interFamily,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.06,
      letterSpacing: "-0.025em",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 25, style }) => (
  <div
    style={{
      fontFamily: interFamily,
      fontSize: size,
      fontWeight: 400,
      lineHeight: 1.55,
      color: colors.muted,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{
  children: React.ReactNode;
  color?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}> = ({ children, color = colors.cyan, filled = false, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 16px",
      borderRadius: 10,
      fontFamily: monoFamily,
      fontSize: 18,
      color: filled ? "#03121a" : color,
      background: filled ? color : `${color}12`,
      border: `1px solid ${color}${filled ? "" : "44"}`,
      boxShadow: filled ? `0 8px 30px ${color}55` : "none",
      ...style,
    }}
  >
    {children}
  </div>
);
