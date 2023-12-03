const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const matrix = input.split('\n')
    .reduce((accu: string[], line: string) => {
        accu.push(line);
        return accu;
    }, []);


const isSymbol = (x: number, y: number) => {
    const c = matrix?.[y]?.[x] ?? null;
    if (c === null) return false;
    if (c === '.') return false
    // Is number
    if (Number.isInteger(Number(c))) return false;
    return true;
}
const isNumber = (x: number, y: number) => {
    const c = matrix?.[y]?.[x] ?? null;
    if (c === null) return false;
    // Is number
    if (Number.isInteger(Number(c))) return true;
    return false;
}

const touchingNumber = (x: number, y: number) => {
    // All 8 sides around
    const convert = (x0: number, y0: number) => isSymbol(x0 + x, y0 + y);
    return convert(-1, -1) || convert(0, -1) || convert(1, -1) ||
        convert(-1, 0) || convert(1, 0) ||
        convert(-1, 1) || convert(0, 1) || convert(1, 1)
}

const sum = matrix.reduce((sum: number, line: string, y: number) => {
    let lineSum = 0;
    // Iterate through the lines characters
    for (let x = 0; x < line.length; x++) {
        const c = line[x];

        const numbersFound: number[] = []
        if (c === '*') {
            console.log('found at', x, y)
            for (let yi = y - 1; yi <= y + 1; yi++) {
                for (let xi = x - 1; xi <= x + 1; xi++) {
                    // Same character with gear
                    if(xi === x && yi === y) continue;

                    const c1 = matrix?.[yi]?.[xi] ?? null;
                    // console.log()
                    // Detect bounds and move on
                    if (!c1) continue;

                    // See if number is starting
                    if(Number.isInteger(Number(c1))) {
                        // If so, find beginning and end
                        let startInd = -1;
                        let i = xi;
                        console.log('looking around', xi, yi)
                        while(startInd === -1) {
                            if (i === 0) startInd = i;
                            if(!isNumber(--i, yi)) startInd = i + 1;
                        }
                        // We have start of number, find the end
                        let endInd = line.length;
                        i = xi
                        while(endInd === line.length) {
                            if (i === 0) endInd = i;
                            if(!isNumber(++i, yi)) endInd = i - 1;
                        }

                        // With both ends found, build number
                        let foundNum = '';
                        while(startInd !== endInd) {
                            foundNum += matrix[yi][startInd++]
                        }
                        foundNum += matrix[yi][endInd]
                        numbersFound.push(Number(foundNum))
                        // Set cursor to end to not re-find the same number
                        xi = endInd
                    }

                }
            }
        }
        if(numbersFound.length > 0) console.log(numbersFound)
        if(numbersFound.length === 2) lineSum += (numbersFound[0] * numbersFound[1]); 
    }
    return sum + lineSum;
}, 0)

const attempts: any = [5310, 531590, 'here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 75847567
else console.log('New Sum:', sum)