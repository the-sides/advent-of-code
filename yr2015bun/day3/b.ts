const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const houses: { [key: string]: number } = {};
let sx = 0;
let sy = 0;
let rx = 0;
let ry = 0;
const sactions: { [key: string]: () => void } = {
    '<': () => { --sx },
    '>': () => { ++sx },
    '^': () => { ++sy },
    'v': () => { --sy },
};
const ractions: { [key: string]: () => void } = {
    '<': () => { --rx },
    '>': () => { ++rx },
    '^': () => { ++ry },
    'v': () => { --ry },
};

[...input]
    .forEach((h: string, ind: number) => {
        let coord;
        if (ind % 2 === 1) {
            ractions[h]()
            coord = `${rx},${ry}`
        }
        else {
            sactions[h]()
            coord = `${sx},${sy}`
        }

        if (houses[coord]) {
            houses[coord]++
        } else {
            houses[coord] = 1;
        }
    });

console.log('Distinct houses:', Object.keys(houses).length);