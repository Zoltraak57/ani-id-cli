# Termux/Android support. Sourced by tests/run.sh.

assert_eq "android_mpv" "$(android_player_for "")" "android_player_for defaults to mpv on Android"
assert_eq "android_mpv" "$(android_player_for mpv)" "android_player_for maps mpv to the Android app"
assert_eq "android_vlc" "$(android_player_for vlc)" "android_player_for maps vlc to the Android app"
assert_eq "debug" "$(android_player_for debug)" "android_player_for leaves debug alone"
assert_eq "download" "$(android_player_for download)" "android_player_for leaves download alone"

_old_referer=$referer
_old_agent=$user_agent
referer="https://otakudesu.blog/"
user_agent="TestAgent/1.0"
_tmp_conf=$(mktemp -d)
android_mpv_config_write "$_tmp_conf"
assert_eq "referrer=https://otakudesu.blog/
user-agent=TestAgent/1.0" "$(cat "$_tmp_conf/mpv.config.mp4")" "android_mpv_config_write writes referrer and user-agent"
rm -rf "$_tmp_conf"
referer=$_old_referer
user_agent=$_old_agent

assert_eq "0" "$(ANI_ID_CLI_LIB=1 TERMUX_VERSION=0.118 sh -c '. ../ani-id-cli; is_android; echo $?')" "is_android detects Termux"
assert_eq "1" "$(ANI_ID_CLI_LIB=1 env -u TERMUX_VERSION -u PREFIX -u ANDROID_ROOT sh -c '. ../ani-id-cli; is_android; echo $?')" "is_android is false on a normal Linux host"

# The launch wrappers hand the stream URL and app component to am.
_tmp_am=$(mktemp -d)
printf '#!/bin/sh\nprintf "%%s\\n" "$*" >> "$AM_LOG"\n' >"$_tmp_am/am"
chmod +x "$_tmp_am/am"
_old_path=$PATH
_old_mpv_dir=${ANI_ID_MPV_CONFIG_DIR:-}
export AM_LOG="$_tmp_am/log"
export ANI_ID_MPV_CONFIG_DIR="$_tmp_am/mpv"
PATH="$_tmp_am:$PATH"
_video="https://cdn.example/v.mp4"
anime_title="X"
ep_no="1"
player_extra_flags=""
android_mpv_play
wait
assert_contains "is.xyz.mpv/.MPVActivity" "$(cat "$AM_LOG")" "android_mpv_play opens the mpv APK"
assert_contains "referrer=$referer" "$(cat "$ANI_ID_MPV_CONFIG_DIR/mpv.config.mp4")" "android_mpv_play writes the referrer config"
android_vlc_play
wait
assert_contains "org.videolan.vlc" "$(cat "$AM_LOG")" "android_vlc_play opens the VLC APK"
PATH=$_old_path
if [ -n "$_old_mpv_dir" ]; then
    ANI_ID_MPV_CONFIG_DIR=$_old_mpv_dir
else
    unset ANI_ID_MPV_CONFIG_DIR
fi
unset AM_LOG
rm -rf "$_tmp_am"
