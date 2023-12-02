const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();


const max: any = {
    'red': 12,
    'green': 13,
    'blue': 14
}
const sum = input.split('\n')
    .reduce((sum: number, line: string) => {
        // console.log(line)
        let [game, results] = line.split(':');
        const id = Number(game.split(' ')[1]);
        console.log(id)
        const pulls = results.split(';').map(p => p.trim());
        const gamePasses = pulls.reduce((gamePass: boolean, pull:string) => {
            const pairs = pull.split(',');
            return gamePass && pairs.reduce((pass: boolean, pair:string) => {
                if(!pass) return pass;
                const [qntStr, color] = pair.trim().split(' ')
                const qnt = Number(qntStr);
                console.log(qnt, color)
                return qnt <= max[color];
            }, true)
        }, true)
        if(gamePasses) return sum + id;
        else return sum
    }, 0);

console.log('Sum', sum)