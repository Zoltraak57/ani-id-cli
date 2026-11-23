# ani-id-cli

CLI shell untuk mencari, streaming, dan mengunduh anime subtitle Indonesia
dari [otakudesu.blog](https://otakudesu.blog). Alurnya mengikuti `ani-cli`:
cari judul → pilih anime → pilih episode → putar, lalu lanjut ke episode
berikutnya.

## Fitur

- Pencarian judul langsung dari Otakudesu.
- Daftar episode urut dari yang paling awal, termasuk episode desimal (8.5).
- Streaming ke `mpv` (default) atau `vlc`.
- Unduh episode lewat `yt-dlp` (fallback `curl`).
- Pilih kualitas `best`, `720p`, `480p`, atau `360p` (best-effort, lihat
  catatan di bawah).
- Riwayat tontonan dan lanjut dari episode berikutnya (`-c`).
- Rentang episode: `-e 5-7`, `-e "5 6"`, `-e -1` (terakhir).

## Demo


![Demo ani-id-cli](demo/ani-id-cli.webp)

## Dependensi

Wajib:

- `curl`, `sed`, `grep`, `awk`
- `fzf` (atau `rofi`/`dmenu`)
- `mpv` (atau `vlc`)

Untuk unduh:

- `yt-dlp` (disarankan) atau `curl`

Contoh instalasi di Debian/Ubuntu:

```sh
sudo apt install curl fzf mpv yt-dlp
```

Arch:

```sh
sudo pacman -S curl fzf mpv yt-dlp
```

Termux:

```sh
pkg install curl fzf mpv yt-dlp
```

## Instalasi

```sh
git clone https://github.com/Zoltraak57/ani-id-cli.git ani-id-cli
cd ani-id-cli
chmod +x ani-id-cli
install -Dm755 ani-id-cli ~/.local/bin/ani-id-cli
```

Pastikan `~/.local/bin` ada di `PATH`.

## Penggunaan

```sh
ani-id-cli one piece
ani-id-cli -q 720p -e 5-7 "ao ashi season 2"
ani-id-cli -d -e 1 "kimi no na wa"
ani-id-cli -c
ani-id-cli --debug -e 1 "ao ashi season 2"
```

Tanda kutip di awal/akhir judul otomatis dihapus, jadi `"Horimiya"` dan
`Horimiya` sama-sama bisa. Query juga di-trim dari spasi berlebih.

### Opsi

| Opsi | Keterangan |
| --- | --- |
| `-q, --quality <best\|720p\|480p\|360p>` | Kualitas video (default `best`) |
| `-e, -r, --episode, --range <spec>` | Nomor, rentang (`5-7`), atau daftar (`"5 6"`) episode |
| `-d, --download` | Unduh, jangan putar |
| `-c, --continue` | Lanjut dari riwayat |
| `-S, --select-nth <n>` | Pilih hasil pencarian/riwayat ke-n tanpa menu |
| `--debug` | Cetak URL video lalu keluar |
| `--vlc` | Pakai `vlc`, bukan `mpv` |
| `--no-detach` | Player tetap di foreground |
| `-h, --help` | Bantuan |
| `-V, --version` | Versi |

Setelah memutar episode, tersedia menu `next`, `replay`, `previous`,
`select`, `change_quality`, dan `quit`.

### Environment

| Variabel | Default | Keterangan |
| --- | --- | --- |
| `ANI_ID_BASE` | `https://otakudesu.blog` | Domain sumber |
| `ANI_ID_PLAYER` | `mpv` lalu `vlc` | Player |
| `ANI_ID_QUALITY` | `best` | Kualitas default |
| `ANI_ID_DOWNLOAD_DIR` | `.` | Folder unduhan |
| `ANI_ID_HIST_DIR` | `~/.local/state/ani-id-cli` | Folder riwayat |
| `ANI_ID_MENU` | `fzf` | Program menu |
| `ANI_ID_CURL` | `curl` | Binary curl |

## Catatan kualitas

Otakudesu menyediakan mirror 360p/480p/720p. Mirror `odcdn` kadang tetap
menyajikan file 720p walaupun labelnya 480p; CLI akan memberi peringatan
bila kualitas yang didapat tidak cocok. Mirror `vidhide` dan `mega` belum
diresolve karena memakai player pihak ketiga.

Sebelum diputar, URL video dicek dulu. Kalau sumbernya mati (misalnya 403),
CLI mencoba mirror lain dan memilih yang benar-benar bisa diputar.

## Catatan playback

Beberapa sumber (terutama `googlevideo`) menolak request tanpa User-Agent
browser. Karena itu CLI mengirim User-Agent dan Referer yang sama ke `mpv`,
`vlc`, `yt-dlp`, dan `curl`, serta mematikan hook yt-dlp bawaan `mpv`
(`--ytdl=no`). Tanpa ini, `mpv` bisa terbuka lalu langsung gagal memutar.

## Testing

```sh
sh tests/run.sh
```

Tes tidak menyentuh jaringan; semua parser diuji dengan fixture HTML di
`tests/fixtures`.

## Disclaimer

Proyek ini hanya alat bantu klien. Tidak ada video yang di-host di sini.
Seluruh konten berasal dari otakudesu.blog dan pihak ketiga; gunakan dengan
bijak dan patuhi hukum yang berlaku di wilayah Anda.
