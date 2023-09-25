const path = import.meta.dir + '/input.txt'; 
const file = Bun.file(path);
const input = [...await file.text()];

const res = input.reduce((accu, crnt) => crnt === '(' ? ++accu : --accu, 0);

console.log(res)