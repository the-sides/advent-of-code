const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const outputP = import.meta.dir + '/output.txt';
const output = Bun.file(outputP);
const input = await file.text();
const lines = input.split('\r\n')
    const writer = output.writer()

console.log(lines)
let knob = 50;
let zeroes = 0;
lines.forEach((line) => {
    const dir = line[0]
    const dirM = dir === 'R' ? 1 : -1
    const mag = Number(line.substring(1));
    const loops = Math.floor(mag / 100)
    const rel = mag % 100

    if (dir === 'R') {
        knob = (knob + rel) % 100
    }
    if (dir === 'L') {
        knob = (knob - rel) % 100
        if (knob <= 0) {
            knob = (100 + knob) % 100
        }
    }

    if (knob === 0)
        zeroes++

    zeroes += loops
    console.log("%d %s %s", knob, line, zeroes)
    writer.write(`${knob} ${line} ${zeroes}\r\n`)

})
writer.end()