const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = [...await file.text()];

const res = input.reduce((accu, crnt, ind) => {

    const floor = crnt === '(' ? ++accu : --accu;
    if (floor === -1)
        console.log('Reached basement', ind + 1);
    return floor;
}, 0);

console.log(res)