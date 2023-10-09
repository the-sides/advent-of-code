const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

type inputConfig = {
    op: string;
    a: string;
    b?: string;
}

const wires = input
    .split('\n')
    .reduce((wires: any, line: string) => {
        const [input, output] = line.split('->').map(s => s.trim());
        const inputs = input.split(' ');
        if (inputs.length === 1) {
            wires[output] = {
                op: 'SET',
                a: inputs[0]
            }
        }
        else if (inputs[0] === 'NOT') {
            wires[output] = {
                op: 'NOT',
                a: inputs[1]
            }
        } else {
            const [a, op, b] = inputs;
            wires[output] = {
                op,
                a,
                b
            }
        }
        return wires;
    }, {});

const memo: { [key: string]: any } = {};

const derive = (x: string) => {
    if (Number.isNaN(Number(x))) {
        return read(x);
    } else {
        return new Uint16Array([Number(x)])[0];
    }
}

function read(reg: string): number {
    if (memo[reg] !== undefined) {
        return memo[reg];
    }
    const { op, a: a0, b: b0 } = wires[reg];
    if (op === 'SET') {
        memo[reg] = derive(a0);
    }
    else if (op === 'NOT') {
        memo[reg] = ~derive(a0) & 0xFFFF;
    }
    else {
        const av = derive(a0);
        const bv = derive(b0);
        if (op === 'AND') {
            memo[reg] = av & bv;
        }
        if (op === 'OR') {
            memo[reg] = av | bv;
        }
        if (op === 'LSHIFT') {
            memo[reg] = av << bv;
        }
        if (op === 'RSHIFT') {
            memo[reg] = av >> bv;
        }
    }
    return memo[reg];
}

const ans = read('a');

// Reset memoization object
Object.keys(memo).forEach((key: string) => {
    memo[key] = undefined;
});

// Override wire b with the signal from wire a
wires['b'] = {
    op: 'SET',
    a: ans.toString()
};

// Reset other wires (if necessary, based on your puzzle input)

// Find the new signal on wire a
const newSignal = read('a');

console.log(newSignal);

