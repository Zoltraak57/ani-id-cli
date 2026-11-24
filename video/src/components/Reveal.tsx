import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  style?: React.CSSProperties;
};

export const Reveal: React.FC<Props> = ({
  children,
  delay = 0,
  duration = 18,
  y = 24,
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
