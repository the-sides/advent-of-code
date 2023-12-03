const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const matrix = input.split('\n')
    .reduce((accu: string[], line: string) => {
        accu.push(line);
        return accu;
    }, []);

console.log(matrix)

const isSymbol = (x: number, y: number) => {
    const c = matrix?.[y]?.[x] ?? null;
    if (c === null) return false;
    if (c === '.') return false
    // Is number
    if (Number.isInteger(Number(c))) return false;
    return true;
}

const touchingSymbol = (x: number, y: number) => {
    // All 8 sides around
    const convert = (x0: number, y0: number) => isSymbol(x0 + x, y0 + y);
    return convert(-1, -1) || convert(0, -1) || convert(1, -1) ||
        convert(-1, 0) || convert(1, 0) ||
        convert(-1, 1) || convert(0, 1) || convert(1, 1)
}

const sum = matrix.reduce((sum: number, line: string, y: number) => {
    let lineSum = 0;
    let buildingNumberStr = '';
    // Sets true if symbol found while building number
    let passes = false;
    const process = () => {
        if (buildingNumberStr.length > 0) {
            console.log('processing', Number(buildingNumberStr), passes)
            if (passes) lineSum += Number(buildingNumberStr)
            buildingNumberStr = '';
            passes = false;
        }
    }
    // Iterate through the lines characters
    for (let x = 0; x < line.length; x++) {
        const c = line[x];
        const num = Number(c);


        if (Number.isInteger(num)) {
            buildingNumberStr += c;
            // Check surrounding of just this c to see if it touches symbol and passes
            if (touchingSymbol(x, y)) passes = true;
        }
        // At symbol
        else {
            // If buildNumber was built, process and clear
            process()

        }
        // If we reach the end of the line, process whatever may have been built
    }
    if (buildingNumberStr.length > 0) process();
    return sum + lineSum;
}, 0)

const attempts: any = [7966, 'here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 539433
else console.log('New Sum:', sum)