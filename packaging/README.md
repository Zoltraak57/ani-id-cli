# Packaging

## AUR

`aur/` berisi `PKGBUILD` dan `.SRCINFO` untuk paket `ani-id-cli`.

Publish pertama kali:

1. Buat akun di https://aur.archlinux.org dan tambahkan SSH key.
2. Clone repo paketnya:

   ```sh
   git clone ssh://aur@aur.archlinux.org/ani-id-cli.git
   ```

3. Salin `PKGBUILD` dan `.SRCINFO` ke repo itu.
4. Commit lalu push.

Untuk rilis berikutnya, naikkan `pkgver`/`pkgrel`, lalu:

```sh
cd packaging/aur
makepkg --printsrcinfo > .SRCINFO
```

Build lokal:

```sh
cd packaging/aur
makepkg -f
```

## Debian / Ubuntu

Build `.deb`:

```sh
sh packaging/debian/build-deb.sh 0.2.0
```

Hasilnya di `dist/ani-id-cli_0.2.0_all.deb`. Skrip memakai `dpkg-deb` kalau
tersedia; kalau tidak, arsip `.deb` dibangun dengan `ar` + `tar`.

Workflow `.github/workflows/release.yml` otomatis menjalankan tes dan
mengunggah `.deb` ke GitHub Release setiap kali release dipublikasikan.
