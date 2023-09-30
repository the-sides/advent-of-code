const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();
const DIM = 1000
// Attempts: 122402117(high, honestly dumb mistake), 

const makeGrid = (dim = DIM) => {
    let arr: number[][] = [];

    // creating two-dimensional array
    for (let i = 0; i < dim; i++) {
        arr[i] = [];
        for (let j = 0; j < dim; j++) {
            arr[i][j] = 0;
        }
    }

    return arr
}

const countGrid = (dim = DIM) => {
    let sum = 0;

    // creating two-dimensional array
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            sum += grid[i][j];
        }
    }

    return sum
}

const grid: number[][] = makeGrid()


const change = (action: string, from: number[], to: number[]) => {
    // Use CONST 

    for (let i = from[0]; i <= to[0]; i++) {
        for (let j = from[1]; j <= to[1]; j++) {
            let flip: number = 0;
            if (action === 'on') flip = 1
            if (action === 'off') flip = -1
            if (action === 'toggle') flip = 2

            grid[i][j] += flip
            if (grid[i][j] < 0) grid[i][j] = 0;

        }
    }

}



input
    .split('\n')
    .forEach((line: string) => {
        const words: any[] = line.split(' ');

        const from = words.at(-3).split(',').map(Number)
        const to = words.at(-1).split(',').map(Number)

        if (words[0] === 'turn') {
            change(words[1], from, to);
        } else
            change(words[0], from, to);
    });

console.log(countGrid())