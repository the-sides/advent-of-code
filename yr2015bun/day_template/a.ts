const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const actions: {[key: string]: () => void} = {
    '<' : () => {},
    '>' : () => {},
    '^' : () => {},
    'v' : () => {},
};

[...input]
    .forEach((c:string) => {

    });
