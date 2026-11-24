import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const driftA = Math.sin(frame / 110) * 70;
  const driftB = Math.cos(frame / 95) * 90;
  const gridY = (frame * 0.16) % 80;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 22% 18%, rgba(14, 116, 144, 0.28), transparent 65%), radial-gradient(ellipse 60% 50% at 82% 78%, rgba(67, 56, 202, 0.24), transparent 65%)",
        }}
      />

      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: `0px ${gridY}px`,
          maskImage:
            "radial-gradient(ellipse 65% 60% at 50% 45%, black 10%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 60% at 50% 45%, black 10%, transparent 78%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          left: 220 + driftA,
          top: -260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.16), transparent 62%)",
          filter: "blur(30px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          right: 120 + driftB,
          bottom: -380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.16), transparent 62%)",
          filter: "blur(34px)",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 78% 72% at 50% 48%, transparent 38%, rgba(2, 5, 12, 0.82) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
