#!/bin/sh
# Test runner: sources the CLI with ANI_ID_CLI_LIB=1, then runs tests/test_*.sh.
set -u

cd "$(dirname "$0")" || exit 1
ANI_ID_CLI_LIB=1 . ../ani-id-cli || exit 1

tests=0
failures=0

assert_eq() {
    # $1 expected, $2 actual, $3 message
    tests=$((tests + 1))
    if [ "$1" = "$2" ]; then
        printf 'ok - %s\n' "$3"
    else
        failures=$((failures + 1))
        printf 'not ok - %s\n  expected: [%s]\n  actual:   [%s]\n' "$3" "$1" "$2" >&2
    fi
}

assert_contains() {
    # $1 needle, $2 haystack, $3 message
    tests=$((tests + 1))
    case "$2" in
        *"$1"*) printf 'ok - %s\n' "$3" ;;
        *)
            failures=$((failures + 1))
            printf 'not ok - %s\n  missing: [%s]\n  in:      [%s]\n' "$3" "$1" "$2" >&2
            ;;
    esac
}

for _test_file in test_*.sh; do
    [ -f "$_test_file" ] || continue
    # shellcheck disable=SC1090
    . "./$_test_file"
done

printf '\n%s tests, %s failures\n' "$tests" "$failures"
[ "$failures" -eq 0 ]
