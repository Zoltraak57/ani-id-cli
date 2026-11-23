# Logic tests: episode ranges and history. Sourced by tests/run.sh.

_eps="1
2
3
4
5"

assert_eq "5" "$(expand_range 5 "$_eps")" "expand_range single episode"
assert_eq "3
4
5" "$(expand_range 3-5 "$_eps")" "expand_range closed range"
assert_eq "2
3" "$(expand_range "2 3" "$_eps")" "expand_range space separated list"
assert_eq "5" "$(expand_range -1 "$_eps")" "expand_range -1 means last"
assert_eq "1" "$(expand_range 0 "$_eps")" "expand_range 0 means first"

_tmp_hist=$(mktemp -d)
hist_dir="$_tmp_hist"
histfile="$_tmp_hist/history"
history_set "https://otakudesu.blog/anime/x/" "X" "2"
assert_eq "2" "$(history_get "https://otakudesu.blog/anime/x/")" "history_get returns the stored episode"
history_set "https://otakudesu.blog/anime/x/" "X" "3"
assert_eq "3" "$(history_get "https://otakudesu.blog/anime/x/")" "history_set replaces an existing row"
assert_eq "1" "$(wc -l <"$histfile" | tr -d '[:space:]')" "history_set keeps one row per anime"
rm -rf "$_tmp_hist"

assert_eq "Ao_Ashi_S2_Episode_1" "$(sanitize_filename 'Ao/Ashi:S2*Episode?1')" "sanitize_filename replaces unsafe characters"
assert_eq "1" "$( (fetch 'http://127.0.0.1:9/' >/dev/null 2>&1); echo $? )" "fetch returns non-zero on connection error"
assert_eq "1" "$( (video_ok 'http://127.0.0.1:9/x' >/dev/null 2>&1); echo $? )" "video_ok rejects an unreachable URL"
assert_eq "0" "$(quality_matches 'https://cdn.example/x_720p.mp4' '720p'; echo $?)" "quality_matches finds the requested quality in the URL"
assert_eq "1" "$(quality_matches 'https://cdn.example/x_720p.mp4' '480p'; echo $?)" "quality_matches rejects a different quality"
assert_eq "0" "$(quality_matches 'https://rr.example/videoplayback?id=1' '480p'; echo $?)" "quality_matches trusts URLs without a quality token"

assert_eq "https://otakudesu.blog" "$(ANI_ID_BASE='https://otakudesu.blog/' ANI_ID_CLI_LIB=1 sh -c '. ../ani-id-cli; printf "%s" "$base_url"')" "base_url drops a trailing slash"

assert_eq "3" "$(next_after 2 "$_eps")" "next_after returns the next episode"
assert_eq "5" "$(next_after 5 "$_eps")" "next_after keeps the last episode instead of wrapping"
assert_eq "1" "$(next_after 99 "$_eps")" "next_after falls back to the first episode when the stored one is gone"

assert_eq "Horimiya" "$(normalize_query '"Horimiya"')" "normalize_query strips double quotes"
assert_eq "Horimiya" "$(normalize_query "'Horimiya'")" "normalize_query strips single quotes"
assert_eq "Kimi no Na wa" "$(normalize_query '  Kimi no Na wa  ')" "normalize_query trims surrounding spaces"
