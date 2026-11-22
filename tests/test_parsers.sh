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
