const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const lines = data.split('\n').map(s => s.trim());
const sol = 'XMAS';
let sum = 0;

const dirs = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0], 
    [-1,  1], [0,  1], [1,  1]
]


lines.forEach((line, y) => {
    [...line].forEach((char, x) => {
        if(char !== 'X') return;

        dirs.forEach((dir) => {
            const found = [...sol].every((charSol, si) => {
                if(si === 0) return true;
                const [xDir, yDir] = dir;
                const xSus = (xDir * si) + x;
                const ySus = (yDir * si) + y;
                const susChar = lines[ySus]?.[xSus] ?? '';
                if(susChar === charSol) return true;
                else return false;
            })
            if(found) sum++;
        })

    })
})

console.log({sum})