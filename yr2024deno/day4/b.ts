const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const lines = data.split('\n').map(s => s.trim());
let sum = 0;

const dirs = [
    [-1, -1], [1, -1],


    [-1, 1], [1, 1]
]

const DEBUG = false;

lines.forEach((line, y) => {
    [...line].forEach((char, x) => {
        if (char !== 'A') return;

        const found = dirs.reduce((accu, dir) => {
            const [xDir, yDir] = dir;
            const xSus = xDir + x;
            const ySus = yDir + y;
            const susChar = lines[ySus]?.[xSus] ?? '';
            return accu + susChar;
        }, '')
        if (found.includes('SSMM') || found.includes('MMSS') || found.includes('MSMS') || found.includes('SMSM')) {
            DEBUG && console.log({found, x, y})
            sum++
        } else {
            DEBUG && console.log({bad: found, x, y})
        };

    })
})

console.log({ sum })
// 3659 too high
// 1835 perfect