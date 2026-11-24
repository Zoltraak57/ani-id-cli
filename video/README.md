# Promo video ani-id-cli

Video promosi 30 detik untuk `ani-id-cli`, dibuat dengan Remotion.

- Komposisi: `Promo`
- Resolusi: 1920×1080, 30 fps, 900 frame
- Gaya: terminal + motion graphics, latar navy dengan aksen cyan

## Preview

```console
npm run dev
```

Buka `http://localhost:3000` lalu pilih komposisi `Promo`.

## Render

```console
npx remotion render Promo out/ani-id-cli-promo.mp4 \
  --concurrency=2 --x264-preset=veryfast --crf=18 \
  --audio-codec=aac --audio-bitrate=192k
```

## Struktur

- `src/Promo.tsx` — timeline utama (`TransitionSeries`), musik, dan SFX
- `src/scenes/` — enam adegan: Hook, Search, Play, Download, History, Outro
- `src/components/` — background, jendela terminal, poster, teks, typewriter
- `src/theme.ts` — warna dan gradient
- `src/fonts.ts` — Inter dan JetBrains Mono dari Google Fonts
- `public/soundtrack.mp3` — musik latar (disintesis lokal)
- `public/sfx/` — whoosh dan ding dari `remotion.media`

## Aset

Musik latar dibuat khusus untuk video ini dengan sintesis numpy, jadi tidak ada
isu lisensi. SFX `whoosh.wav` dan `ding.wav` berasal dari aset publik Remotion.
