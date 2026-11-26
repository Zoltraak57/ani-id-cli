#!/bin/sh
# Build ani-id-cli_<version>_all.deb into dist/.
# Uses dpkg-deb when available, otherwise builds the ar archive by hand.
set -eu

version="${1:-}"
case "$version" in
    "" | */*)
        echo "usage: $0 <version>" >&2
        exit 1
        ;;
esac

root="$(CDPATH= cd -- "$(dirname "$0")/../.." && pwd)"
stage="$(mktemp -d)"
trap 'rm -rf "$stage"' EXIT

install -Dm755 "$root/ani-id-cli" "$stage/usr/bin/ani-id-cli"
install -Dm644 "$root/README.md" "$stage/usr/share/doc/ani-id-cli/README.md"
install -Dm644 "$root/LICENSE" "$stage/usr/share/doc/ani-id-cli/LICENSE"
mkdir -p "$stage/DEBIAN"

cat >"$stage/DEBIAN/control" <<EOF
Package: ani-id-cli
Version: $version
Section: utils
Priority: optional
Architecture: all
Depends: curl, fzf, mpv
Recommends: yt-dlp
Maintainer: Zoltraak57 <zola.maulana2025@gmail.com>
Homepage: https://github.com/Zoltraak57/ani-id-cli
Description: CLI shell untuk mencari, streaming, dan mengunduh anime subtitle Indonesia
 Alurnya mengikuti ani-cli: cari judul, pilih anime, pilih episode, lalu putar.
EOF

(
    cd "$stage"
    find . -path ./DEBIAN -prune -o -type f -print |
        sed 's|^\./||' |
        while IFS= read -r file; do
            md5sum "$file"
        done
) >"$stage/DEBIAN/md5sums"

mkdir -p "$root/dist"
out="$root/dist/ani-id-cli_${version}_all.deb"
rm -f "$out"

if command -v dpkg-deb >/dev/null 2>&1; then
    dpkg-deb --build --root-owner-group "$stage" "$out" >/dev/null
else
    work="$(mktemp -d)"
    trap 'rm -rf "$stage" "$work"' EXIT
    tar -czf "$work/control.tar.gz" --owner=0 --group=0 --numeric-owner -C "$stage/DEBIAN" .
    tar -czf "$work/data.tar.gz" --owner=0 --group=0 --numeric-owner \
        --exclude=./DEBIAN -C "$stage" .
    printf '2.0\n' >"$work/debian-binary"
    (
        cd "$work"
        ar r "$out" debian-binary control.tar.gz data.tar.gz >/dev/null
    )
fi

printf '%s\n' "$out"
