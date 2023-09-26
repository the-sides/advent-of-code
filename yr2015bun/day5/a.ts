const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();
// Attempts: 236, 150, 147?, 238 (right)

// Ugghhhhh I wish regex wasn't hard
const containsVowels = (str: String) => {
    const vowels = 'aeiou';
    let seen = [...str].filter(c => vowels.includes(c));
    return seen.length > 2;
}
const doubleLetters = (str: String) => {
    for (let i = 1; i < str.length; i++) {
        if (str[i - 1] === str[i]) return true;
    }
    return false;
}
const noSeqLetters = (str: String) => {
    const forbiddenEnds = ['b', 'd', 'q', 'y']
    for (let i = 1; i < str.length; i++) {
        if (str.charCodeAt(i - 1) + 1 === str.charCodeAt(i)
            && forbiddenEnds.includes(str[i]))
            return false;
    }
    return true;
}

const res = input
    .split('\n')
    .reduce((sum, crnt) => {
        if (containsVowels(crnt) && doubleLetters(crnt) && noSeqLetters(crnt)) {
            console.log(crnt, 'passed')
            return sum + 1;
        }
        else {
            console.log(crnt, 'failed', { vow: containsVowels(crnt), dub: doubleLetters(crnt), seq: noSeqLetters(crnt) })
            return sum;
        }
    }, 0);

console.log(res)