# Parser tests. Sourced by tests/run.sh; fixtures are in tests/fixtures.

_expected_search="https://otakudesu.blog/anime/borot-sub-indo/	Boruto: Naruto Next Generations Subtitle Indonesia
https://otakudesu.blog/anime/kimi-no-na-wa-sub-indo/	Kimi no Na wa 'Sub Indo' & Movie"
assert_eq "$_expected_search" "$(parse_search <fixtures/search.html)" "parse_search prints url<TAB>title with entities decoded"

_expected_episodes="1	https://otakudesu.blog/episode/asohia-s2-episode-1-sub-indo/
2	https://otakudesu.blog/episode/asohia-s2-episode-2-sub-indo/
8.5	https://otakudesu.blog/episode/asohia-s2-episode-8-5-sub-indo/
10	https://otakudesu.blog/episode/asohia-s2-episode-10-sub-indo/
1000	https://otakudesu.blog/episode/asohia-s2-episode-1000-sub-indo/"
assert_eq "$_expected_episodes" "$(parse_episodes <fixtures/anime.html)" "parse_episodes prints episode<TAB>url ascending, including decimals"
assert_eq "Ao Ashi Season 2 Episode 1 & Special Subtitle Indonesia" "$(parse_episode_title <fixtures/episode.html)" "parse_episode_title decodes entities"

assert_eq "https://desustream.net/dstream/odcdn/?id=TXdXSlhBdGVKMGNnWkQyZHF4NWR0akQ1S1JFdHdhWG5oV3UzL1ZsbW05Ymw3cm9xSzBsUkdTOVZNai9zalVubw==" "$(parse_embed_url <fixtures/episode.html)" "parse_embed_url ignores ad iframes"
assert_eq "https://cdn.odcloud.net/anime/Otakudesu.io_Aoshi.S2--01_720p.mp4" "$(parse_video_url <fixtures/embed.html)" "parse_video_url prefers videoURL over playerjs file"
assert_eq "https://archive.org/download/perempuan-dewasa-yang-sdwa/Otakudesu.io_Aoshi.S2--01_720p.mp4" "$(parse_video_url <fixtures/embed_playerjs.html)" "parse_video_url falls back to playerjs file"

_expected_mirrors="360p	vidhide	eyJpZCI6MjA2MTMzLCJpIjowLCJxIjoiMzYwcCJ9
360p	mega	eyJpZCI6MjA2MTMzLCJpIjoxLCJxIjoiMzYwcCJ9
480p	odcdn	eyJpZCI6MjA2MTMzLCJpIjowLCJxIjoiNDgwcCJ9
480p	vidhide	eyJpZCI6MjA2MTMzLCJpIjoxLCJxIjoiNDgwcCJ9
480p	mega	eyJpZCI6MjA2MTMzLCJpIjoyLCJxIjoiNDgwcCJ9
720p	odstream	eyJpZCI6MjA2MTMzLCJpIjowLCJxIjoiNzIwcCJ9
720p	ondesu	eyJpZCI6MjA2MTMzLCJpIjoxLCJxIjoiNzIwcCJ9
720p	vidhide	eyJpZCI6MjA2MTMzLCJpIjoyLCJxIjoiNzIwcCJ9
720p	mega	eyJpZCI6MjA2MTMzLCJpIjozLCJxIjoiNzIwcCJ9"
assert_eq "$_expected_mirrors" "$(parse_mirrors <fixtures/episode.html)" "parse_mirrors prints quality<TAB>server<TAB>data-content"

assert_eq "360p" "$(printf '{"id":206133,"i":0,"q":"360p"}' | json_field q)" "json_field reads a string value"
_b64_roundtrip=$(printf '{"a":1}' | base64 | tr -d '\n')
assert_eq '{"a":1}' "$(b64_decode "$_b64_roundtrip")" "b64_decode decodes base64"
