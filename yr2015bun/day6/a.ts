const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();
const DIM = 1000

// const actions: {[key: string]: (next: ) => void} = {
//     'toggle' : () => {},
//     'turn' : () => {},
// };

// const direction: {[key: string]: () => void} = {
//     'on': () => {},
//     'off': () => {},
// };

const makeGrid = (dim = DIM) => {
    let arr: Boolean[][] = [];

    // creating two-dimensional array
    for (let i = 0; i < dim; i++) {
        arr[i] = [];
        for (let j = 0; j < dim; j++) {
            arr[i][j] = false;
        }
    }

    return arr
}

const countGrid = (dim = DIM) => {
    let sum = 0;

    // creating two-dimensional array
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            if (grid[i][j]) sum++;
        }
    }

    return sum
}

const grid: Boolean[][] = makeGrid()


const change = (action: string, from: number[], to: number[]) => {
    // Use CONST 

    for (let i = from[0]; i <= to[0]; i++) {
        for (let j = from[1]; j <= to[1]; j++) {
            const flip = action === 'toggle' ?
                !grid[i][j] :
                action === 'on';
            grid[i][j] = flip
                
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


        // if (words[0] === 'turn') 
    });

console.log(countGrid())