const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

// Needs to be re-written to define input 
// gates, since values won't be completely determined
// For wires when they first come up. 
// The entire circuit needs to be mapped out 
// before values are evaluted at each wire.
const wires: { [key: string]: number } = {};

const derive = (x: string) => {
    if (Number.isNaN(Number(x))) {
        return wires[x];
    } else {
        return new Uint16Array([Number(x)])[0]
    }
}

input
    .split('\n')
    .forEach((line: string) => {
        const [input, output] = line.split('->').map(s => s.trim());
        const inputs = input.split(' ')
        if (inputs.length === 1) {
            wires[output] = derive(inputs[0]);
        }
        if (inputs[0] === 'NOT') {
            const a = derive(inputs[1]);
            wires[output] = ~a & 0xFFFF;
        } else {
            const [a0, op, b0] = inputs;
            const a = derive(a0);
            const b = derive(b0);

            if (op === 'AND') {
                console.log(a, b, a & b)
                wires[output] = a & b;
            }
            if (op === 'OR') {
                wires[output] = a | b;
            }
            if (op === 'LSHIFT') {
                wires[output] = a << b;
            }
            if (op === 'RSHIFT') {
                wires[output] = a >> b;
            }
        }
    });

console.log(wires)