const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const lines = data.split('\n')

let sum = 0;
lines.forEach((line) => {
    console.log(line)
    const numbers = line.split(' ').map(Number)
    if (numbers.length === 1) { sum += 1; return };
    if (numbers[0] === numbers[1]) return;
    const goingUp = numbers[0] < numbers[1];
    let pass = true;
    numbers.slice(1).forEach((num, offset) => {
        if(!pass) return;
        const prev = numbers[offset]
        if(goingUp) {
            pass = num > prev && num < prev + 4
        } else {
            pass = num < prev && num > prev - 4
        }
    })

    if(pass) sum += 1;
})

console.log({sum})