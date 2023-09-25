const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const houses: {[key: string]: number} = {};
let x = 0;
let y = 0;
const actions: {[key: string]: () => void} = {
    '<' : () => {--x},
    '>' : () => {++x},
    '^' : () => {++y},
    'v' : () => {--y},
};

[...input]
    .forEach((h:string) => {
        actions[h]();
        const coord = `${x},${y}`
        if (houses[coord]){
            houses[coord]++
        } else {
            houses[coord] = 1;
        }
    });

console.log('Distinct houses:', Object.keys(houses).length);