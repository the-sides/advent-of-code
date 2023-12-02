const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const sum = input.split('\n')
    .reduce((sum: number, line: string) => {
        let [_game, results] = line.split(':');
        const pulls = results.split(';').map(p => p.trim());

        // A single game
        const gameMinimums = pulls.reduce((colorMaxes: any, pull: string) => {
            const pairs = pull.split(',');

            colorMaxes = pairs.reduce((colorMax: any, pair: string) => {
                const [qntStr, color] = pair.trim().split(' ')
                const qnt = Number(qntStr);
                if (colorMax[color] < qnt) {
                    return { ...colorMax, [color]: qnt }
                }
                return colorMax;
            }, colorMaxes)

            return colorMaxes;
        }, { blue: 0, green: 0, red: 0 })

        return sum + gameMinimums.blue * gameMinimums.red * gameMinimums.green;
    }, 0);


const attempts: any = ['here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 59795
else console.log('New Sum:', sum)