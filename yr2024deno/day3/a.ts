const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const line = data.split('\n').map(s => s.trim()).join('');

let sum = 0;

const isNum = (c: string) => !Number.isNaN(Number(c));

// let walkerPos = 0;
let walkerState = 0;
let recNum1 = '';
let recNum2 = '';
const walkerChecks = [
    (c: string) => c === 'm', // 0
    (c: string) => c === 'u', // 1
    (c: string) => c === 'l', // 2
    (c: string) => c === '(', // 3
    (c: string) => c === ',', // 4
    (c: string) => c === ')', // 5
    (_: string) => false,
    (_: string) => false,
    (_: string) => true,
    (_: string) => true,
]

const reset = (code: number = 0) => {
    if(walkerState > 3) console.error('code:', code)
    walkerState = 0;
    recNum1 = '';
    recNum2 = '';
}

const spaces: (x: number) => string = (x) => { if (x > 0) { return ' ' + spaces(x - 1) } else return ''; }

for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const numFound = isNum(char)
    const check = walkerChecks[walkerState](char)
    // console.log(line)
    // console.log(`${spaces(i)}^:s-${walkerState}`)

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