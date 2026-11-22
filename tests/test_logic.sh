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
