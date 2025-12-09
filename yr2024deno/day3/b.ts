const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const line = data.split('\n').map(s => s.trim()).join('');

let sum = 0;

const isNum = (c: string) => !Number.isNaN(Number(c));

const spaces: (x: number) => string = (x) => { if (x > 0) { return ' ' + spaces(x - 1) } else return ''; }

const walkerChecks = [
    (c: string) => c === 'm', // 0
    (c: string) => c === 'u', // 1
    (c: string) => c === 'l', // 2
    (c: string) => c === '(', // 3
    (c: string) => c === ',', // 4
    (c: string) => c === ')', // 5
    (_: string) => false,
    (_: string) => false,
]


const gateDoChecks = [
    (c: string) => c === 'd', // 0
    (c: string) => c === 'o', // 1
    (c: string) => c === '(', // 2
    (c: string) => c === ')', // 3
    (_: string) => false,
    (_: string) => false,
]


const gateNoDoChecks = [
    (c: string) => c === 'd',  // 0
    (c: string) => c === 'o',  // 1
    (c: string) => c === 'n',  // 1
    (c: string) => c === `'`, // 3
    (c: string) => c === 't',  // 4
    (c: string) => c === '(',  // 5
    (c: string) => c === ')',  // 6
    (_: string) => false,
    (_: string) => false,
]

const allowances: boolean[] = [];
const debug = false;

function walkGates() {
    let state = 0;
    let allowed = true;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        allowances.push(allowed)
        debug && console.log(line)
        debug && console.log(`${spaces(i)}^:s-${state}${allowed ? 'o': 'x'}`)
        if(allowed) {
            const check = gateNoDoChecks[state](char)


            if(check && state === 6) {
                allowed = false
                state = 0;
                continue;
            }
            if(check){
                state++;
                continue;
            }
            state = 0;
        } else {
            const check = gateDoChecks[state](char)


            if(check && state === 3) {
                allowed = true
                state = 0;
                continue;
            }
            if(check){
                state++;
                continue;
            }
            state = 0;
        }
    }
}

function walkMults() {
    // let walkerPos = 0;
    let walkerState = 0;
    let recNum1 = '';
    let recNum2 = '';

    const reset = (code: number = 0) => {
        if (walkerState > 3) console.error('code:', code)
        walkerState = 0;
        recNum1 = '';
        recNum2 = '';
    }


    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const numFound = isNum(char)
        const check = walkerChecks[walkerState](char)
        const allowed = allowances[i]
        debug && console.log(line)
        debug && console.log(`${spaces(i)}^:s-${walkerState}${allowed ? 'o': 'x'} = ${sum}`)

        if(!allowed) continue;

        // Starting 'mul(
        if (check && walkerState <= 3) {
            walkerState++;
            continue;
        }

        // Finding num 1
        //   never started and you're seeing garbage
        if (walkerState === 4 && recNum1 === '' && !numFound) {
            reset(1);
            continue;
        }

        //   just started looking and found num

        if (walkerState === 4 && numFound) {
            recNum1 += char;
            continue;
        }

        //   been looking and found ,
        if (walkerState === 4 && recNum1 !== '' && check) {
            walkerState++;
            continue;
        }

        // Finding num 2
        //   never started and you're seeing garbage
        if (walkerState === 5 && !recNum2 && !numFound) {
            reset(2);
            continue;
        }

        //   just started looking and found num

        if (walkerState === 5 && numFound) {
            recNum2 += char;
            continue;
        }

        //   been looking and found )
        //   compute number
        if (walkerState === 5 && recNum2 !== '' && check) {

            const n1 = Number(recNum1)
            const n2 = Number(recNum2)
            const product = n1 * n2;
            sum += product;
            reset(9);
            continue;
        }


        // If nothing triggered, we got garbage, reset.
        reset(-1);
    }

    console.log({ sum })
}

walkGates();
walkMults();