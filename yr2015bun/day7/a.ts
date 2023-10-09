const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

// Needs to be re-written to define input 
// gates, since values won't be completely determined
// For wires when they first come up. 
// The entire circuit needs to be mapped out 
// before values are evaluted at each wire.
type inputConfig = {
    op: string;
    a: string;
    b?: string;
}
// const wires: { [key: string]: inputConfig } = {};


// Setup wires
const wires = input
    .split('\n')
    .reduce((wires: any, line: string) => {
        const [input, output] = line.split('->').map(s => s.trim());
        const inputs = input.split(' ');
        if (inputs.length === 1) {
            wires = {
                ...wires,
                [output]: {
                    op: 'SET',
                    a: inputs[0]
                }
            }
            // console.log([output], wires[output])
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

// Pass electricity
// console.log(wires, wires.a)


const derive = (x: string) => {
    if (Number.isNaN(Number(x))) {
        return read(x);
    } else {
        return new Uint16Array([Number(x)])[0]
    }
}

const seen: {[key: string]: number} = Object.keys(wires).reduce((accu, crnt) => ({...accu, [crnt]: 0}), {});

function read(reg: string): number {
    const { op, a: a0, b: b0 } = wires[reg];
    seen[reg]++
    console.log('reg', reg, seen[reg]++)
    if (op === 'SET') {
        return derive(a0);
    }
    if (op === 'NOT') {
        return ~derive(a0) & 0xFFFF;
    }
    if (typeof b0 === 'undefined') {
        console.error('This should have never happened', reg, op);
        return 0;
    };

    const av = derive(a0);
    const bv = derive(b0);

    if (op === 'AND') {
        return av & bv;
    }
    if (op === 'OR') {
        return av | bv;
    }
    if (op === 'LSHIFT') {
        return av << bv;
    }
    if (op === 'RSHIFT') {
        return av >> bv;
    }
    console.error('Operation not found')
    return 0;
}

const ans = read('a')

console.log(ans)