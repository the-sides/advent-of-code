const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const res = input
    .split('\n')
    .reduce((sum, crnt) => {
        const [l, w, h] = crnt.split('x').map(Number);
        const areaOfSmallest = [l,w,h].sort((a, b) => a-b).slice(0,2).reduce((a, c) => a * c, 1);
        return sum + ((2 * l * w) + (2 * w * h) + (2 * h * l) + areaOfSmallest);
    }, 0);;

console.log(res)