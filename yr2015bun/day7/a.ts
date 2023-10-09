const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();



input
    .split('\n')
    .forEach((line:string) => {

    });
