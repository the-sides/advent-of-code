const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const sum = input.split('\n')
    .reduce((accu: number, line: string) => {
        return accu + line.length
    }, 0);


const attempts: any = ['here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 
else console.log('New Sum:', sum)