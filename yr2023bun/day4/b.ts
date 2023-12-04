const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const copies = input.split('\n').map(v => 1);
let sum = input.split('\n')
    .reduce((accu: number, line: string, gameInd: number) => {
        const [game, numLine] = line.split(':').map(s => s.trim());
        const [winners, mine] = numLine.split('|').map(s => s.trim());
        const winNums = winners.split(' ').map(s => Number(s.trim())).filter(n => n !== 0)
        // console.log('wins', winNums)
        const mineNums = mine.split(' ').map(s => Number(s.trim())).filter(n => n !== 0)
        // console.log('mins', mineNums)
        for (let i = 0; i < copies[gameInd]; i++) {
            mineNums.reduce((gameSum: number, mn: number) => {
                if (winNums.includes(mn)) {
                    copies[gameInd + 1 + gameSum] += 1;
                    // console.log('up', gameInd + 1 + gameSum, copies[gameInd + 1 + gameSum])
                    return gameSum + 1;
                }
                else return gameSum;
            }, 0)
        }
        // console.log('won', points)
        return accu;
    }, 0);

sum = copies.reduce((acc: number, game: number) => {
    return acc + game
}, 0)
const attempts: any = [1046, 'here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 8549735
else console.log('New Sum:', sum)