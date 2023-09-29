const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

/**
 * --- Part Two ---
Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
For example:

qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
How many strings are nice under these new rules?
 */


// This one is honestly crazy
// Attempts: 82, 68

const pairs = (str: String) => {
    let last = '';
    const pairs: String[] = [];
    for (let i = 0; i < str.length - 1; i++) {
        const set = str[i] + str[i + 1]
        // Doesn't count
        if (last === set) {
            last = '';
            continue;
        }

        if (pairs.includes(set)) return true;
        pairs.push(set)
        last = set;
    }
    return false;
}
const hill = (str: String, verbose = false) => {
    for (let i = 1; i < str.length - 1; i++) {
        const left = str[i - 1];
        const right = str[i + 1];
        if (left === right) {
            if (verbose) console.log(left, right)
            return true;
        }
    }
    return false;
}

const res = input
    .split('\n')
    .reduce((sum, crnt) => {
        if (hill(crnt) && pairs(crnt)) {
            console.log(crnt, 'passed')
            return sum + 1;
        }
        else {
            console.log(crnt, 'failed', { hill: hill(crnt, true), pairs: pairs(crnt) })
            return sum;
        }
    }, 0);

console.log(res)
