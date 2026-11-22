# Parser tests. Sourced by tests/run.sh; fixtures are in tests/fixtures.

_expected_search="https://otakudesu.blog/anime/borot-sub-indo/	Boruto: Naruto Next Generations Subtitle Indonesia
https://otakudesu.blog/anime/kimi-no-na-wa-sub-indo/	Kimi no Na wa 'Sub Indo' & Movie"
assert_eq "$_expected_search" "$(parse_search <fixtures/search.html)" "parse_search prints url<TAB>title with entities decoded"
