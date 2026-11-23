# ani-id-cli — Design

## Intent

A small shell CLI that searches, streams, and downloads anime from
`otakudesu.blog`, with the same interaction model as `ani-cli`: search,
pick a title, pick an episode, play, then move to the next episode.

## Why

The user already uses `ani-cli` and wants the same workflow for Indonesian
subtitled anime on Otakudesu. The site exposes plain HTML and a direct MP4
URL, so a shell script is enough.

## Goals

- Search Otakudesu by title and pick a result interactively.
- List episodes for a title, newest last, and pick one or a range.
- Play the episode in `mpv` (fallback `vlc`), or download it.
- Choose quality (best/720p/480p/360p) using the site's mirror endpoints.
- Remember progress and continue from history.
- Work on Linux/macOS/Android Termux with POSIX `sh` and common tools.

## Non-goals

- No batch download UI.
- No login, comments, schedule, or genre browsing.
- No built-in player and no bundled media.
- No guarantee against site changes; parsers are isolated and tested with
  fixtures so they are easy to update.

## Constraints

- POSIX `sh` only (no bash arrays, no `local` reliance).
- Dependencies: `curl`, `sed`, `grep`, `awk`; menu `fzf`; player `mpv` or
  `vlc`; `yt-dlp` or `ffmpeg` for download.
- Never hardcode the domain in more than one place (`ANI_ID_BASE`).
- The stream host wants `https://otakudesu.blog/` as referer.
- The site can change its markup at any time; every parser lives in its own
  function and has a fixture test.

## Approaches considered

1. **Port ani-cli's architecture to Otakudesu (chosen).** POSIX sh, HTML
   scraped with `sed`/`grep`, `fzf` menu, `mpv` player. Matches the request
   ("shell based", "like ani-cli"), no new runtime, easy to read and patch.
2. **Python or Go scraper that shells out to mpv.** Cleaner parsing and
   better error handling, but adds a runtime dependency and is not the
   shell-based tool that was asked for.
3. **Third-party Otakudesu API.** Less scraping, but the public APIs are
   unofficial, frequently offline, and add a single point of failure.

Approach 1 wins because the site's markup is simple, the direct MP4 makes
playback trivial, and it mirrors the tool the user already knows.

## How it works

1. `GET {base}/?s=<query>&post_type=anime` → parse `ul.chivsrc` links.
2. `GET <anime-url>` → parse the episode list (`div.episodelist` →
   `li a[href*="/episode/"]`), extract the episode number from the title,
   sort ascending.
3. `GET <episode-url>` → parse the primary `iframe` inside
   `div.player-embed`.
4. `GET <embed-url>` → parse `const videoURL = "..."` (or the `playerjs`
   `file:"..."` fallback).
5. Play with `mpv --referrer=... --force-media-title=...`, or download with
   `yt-dlp` (fallback `curl`).
6. For a non-best quality, POST to `admin-ajax.php` with the mirror
   `data-content` fields and a nonce, decode the returned base64 HTML, then
   repeat steps 4–5.
7. History stores `anime_url<TAB>title<TAB>episode`; `--continue` lists
   those and resumes at the next episode.

## Interface

```
ani-id-cli [options] [query]
  -q, --quality <best|720p|480p|360p>
  -e, --episode, -r, --range <n|n-m|n m>
  -d, --download
  -c, --continue
  -S, --select-nth <n>
      --debug            print resolved links, do not play
      --vlc              use vlc instead of mpv
      --no-detach        keep the player in the foreground
  -h, --help
  -V, --version
```

Environment: `ANI_ID_BASE`, `ANI_ID_PLAYER`, `ANI_ID_QUALITY`,
`ANI_ID_DOWNLOAD_DIR`, `ANI_ID_HIST_DIR`, `ANI_ID_MENU`.

After playback: `next`, `replay`, `previous`, `select`, `change_quality`,
`quit`.

## Files

- `ani-id-cli` — the executable script.
- `tests/run.sh` — test runner; sources the script with
  `ANI_ID_CLI_LIB=1`.
- `tests/fixtures/*.html` — trimmed real markup used by parser tests.
- `README.md` — install, usage, dependencies, disclaimer.

## Decisions left to the builder

- Exact sed expressions and fixture trimming.
- Whether the episode list is sorted numerically with `sort -n`.
- Message wording and colors.
