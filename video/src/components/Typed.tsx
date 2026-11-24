import { useCurrentFrame } from "remotion";

type Props = {
  text: string;
  startFrame: number;
  charsPerFrame?: number;
  style?: React.CSSProperties;
};

export const Typed: React.FC<Props> = ({
  text,
  startFrame,
  charsPerFrame = 1.4,
  style,
}) => {
  const frame = useCurrentFrame();
  const visible = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - startFrame) * charsPerFrame)),
  );

  return <span style={style}>{text.slice(0, visible)}</span>;
};

export const Cursor: React.FC<{
  startFrame?: number;
  color?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}> = ({
  startFrame = 0,
  color = "#22d3ee",
  width = 12,
  height = 26,
  style,
}) => {
  const frame = useCurrentFrame();
  const on = frame < startFrame || Math.floor((frame - startFrame) / 16) % 2 === 0;

  return (
    <span
      style={{
        display: "inline-block",
        width,
        height,
        marginLeft: 6,
        borderRadius: 2,
        backgroundColor: color,
        opacity: on ? 1 : 0,
        ...style,
      }}
    />
  );
};
