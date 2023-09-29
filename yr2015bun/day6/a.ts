const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

// const actions: {[key: string]: (next: ) => void} = {
//     'toggle' : () => {},
//     'turn' : () => {},
// };

// const direction: {[key: string]: () => void} = {
//     'on': () => {},
//     'off': () => {},
// };
enum ACTION {
    on,
    off,
    toggle
};

const grid: Boolean[][] = [... new Array(10).fill([...new Array(10).fill(false)])];
grid[0][0] = true;
grid[0][9] = true;
grid[1][8] = true;

// Does not work, use this

const makeGrid = () => {
    let arr: Boolean[][] = [];
    let rows = 4;
    let columns = 3;

    // creating two-dimensional array
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = false;
        }
    }

    return arr
}

const change = (action: ACTION) => {

}
console.log(grid)

input
    .split('\n')
    .forEach((line: string) => {
        const words = line.split(' ');
        // if (words[0] === 'turn') 
    });
