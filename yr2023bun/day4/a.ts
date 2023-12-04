const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const sum = input.split('\n')
    .reduce((accu: number, line: string) => {
        const [game, numLine] = line.split(':').map(s => s.trim());
        const [winners, mine] = numLine.split('|').map(s => s.trim());
        const winNums = winners.split(' ').map(s => Number(s.trim())).filter(n => n !== 0)
        console.log('wins', winNums)
        const mineNums = mine.split(' ').map(s => Number(s.trim())).filter(n => n !== 0)
        console.log('mins', mineNums)
        const points = mineNums.reduce((gameSum: number, mn: number) => {
            if(winNums.includes(mn)) {
                if(gameSum === 0) return 1;
                else return gameSum * 2;
            }
            else return gameSum;
        }, 0)
        console.log('won', points)
        return accu + points;
    }, 0);


const attempts: any = [854, 'here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 21213
else console.log('New Sum:', sum)