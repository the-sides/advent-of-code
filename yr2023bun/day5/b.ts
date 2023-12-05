const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const initSeeds = input.split('\n')[0].split(': ')[1].split(' ').map(Number);
// const initSeeds = [79, 14, 55, 13]
console.log(initSeeds)
const locations: number[] = []
for (let i = 0; i < initSeeds.length; i += 2) {
    console.log('seed group', (i+2) / 2, 'of', initSeeds.length/2)
    let from = initSeeds[i];
    let upTo = initSeeds[i + 1];
    while (upTo--) {
        locations.push(mapSeed(from))
        from++;
    }
}

function mapSeed(initSeed: number) {
    // Once a seed fits into a range, flag it so it doesn't get mapped again
    let mapped = false;
    // Seed evolves down map into location
    return input.split('\n').slice(2).reduce((seedPos: number, line: string) => {
        if (line === '') { return seedPos; };
        if (line.includes(' map:')) {
            // Map again as we've gotten to a new area
            mapped = false;
            return seedPos;
        }
        // Don't remap if on the same collection
        if (mapped) return seedPos;
        const [dest, start, offset] = line.split(' ').map(Number)
        if (seedPos >= start && seedPos < start + offset) {
            const diff = seedPos - start;
            seedPos = dest + diff;
            mapped = true;
        }
        // Return same value if 
        return seedPos;
        // if(line === '') break;
    }, initSeed);
}



// console.log(locations.toSorted((a, b) => a - b))
const leastLoc = locations.toSorted((a, b) => a - b)[0]
const attempts: any = ['here'];
if (attempts.includes(leastLoc)) {
    console.log('You got old attempt', leastLoc)
}
// Winner: 
else console.log('New locations:', leastLoc)