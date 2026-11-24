import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "./components/Background";
import { Hook } from "./scenes/Hook";
import { Search } from "./scenes/Search";
import { Play } from "./scenes/Play";
import { Download } from "./scenes/Download";
import { History } from "./scenes/History";
import { Outro } from "./scenes/Outro";
import { colors } from "./theme";
import { monoFamily } from "./fonts";

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />
);

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Background />
      <Audio src={staticFile("soundtrack.mp3")} volume={0.85} />
      {[133, 313, 478, 643, 763].map((frame) => (
        <Sequence key={frame} from={frame} durationInFrames={20} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
        </Sequence>
      ))}
      <Sequence from={765} durationInFrames={50} layout="none">
        <Audio src={staticFile("sfx/ding.wav")} volume={0.32} />
      </Sequence>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={150}>
          <Hook />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence name="Search" durationInFrames={195}>
          <Search />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence name="Play" durationInFrames={180}>
          <Play />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence name="Download" durationInFrames={180}>
          <Download />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence name="History" durationInFrames={135}>
          <History />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence name="Outro" durationInFrames={135}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: 120,
            bottom: 34,
            fontFamily: monoFamily,
            fontSize: 14,
            letterSpacing: "0.18em",
            color: "#3f4d61",
          }}
        >
          ANI-ID-CLI · v0.1.0
        </div>
        <div
          style={{
            position: "absolute",
            right: 120,
            bottom: 34,
            fontFamily: monoFamily,
            fontSize: 14,
            letterSpacing: "0.12em",
            color: "#3f4d61",
          }}
        >
          github.com/Zoltraak57/ani-id-cli
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
