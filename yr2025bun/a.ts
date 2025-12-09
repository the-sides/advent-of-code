const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const lines = input.split('\r\n')

console.log(lines)
let knob = 50;
let zeroes = 0;
lines.forEach((line) => {
    const dir = line[0]
    const dirM = dir === 'R' ? 1 : -1
    const mag = Number(line.substring(1)) % 100;

    if (dir === 'R') {
        knob = (knob + mag) % 100
    }
    if (dir === 'L') {
        knob = (knob - mag) % 100
        if (knob <= 0) {
            knob = (100 + knob) % 100
        }
    }

    if (knob === 0)
        zeroes++
    
    console.log("%d %s %s", knob, line, zeroes)
})