const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();

const initSeeds = input.split('\n')[0].split(': ')[1].split(' ').map(Number);
console.log(initSeeds)
let sum = 0;

const map: any = input.split('\n').slice(2).reduce((map: any[][], line: string) => {
    if (line.includes(' map:')) {
        map.push([])
    }
    const [dest, start, offset] = line.split(' ').map(Number)
    map.at(-1)?.push({
        dest, start, offset
    })
    return map;
}, []);
console.log(map)

const mapSeed = (initSeed: number) => {
    // Seed evolves down map into location
    return map.reduce((seedPos: number, mappingGroup: any) => {
        // Once a seed fits into a range, flag it so it doesn't get mapped again
        console.log(initSeed, seedPos)
        for (let i = 0; i < mappingGroup.length; i++) {
            const {dest, start, offset} = mappingGroup[i];  
            if (seedPos >= start && seedPos < start + offset) {
                const diff = seedPos - start;
                seedPos = dest + diff;
                return seedPos;
            }
        }
        return seedPos;
    }, initSeed);
}

const locations: number[] = initSeeds.reduce((seedLocs: number[], initSeed: number) => {
    // Move onto the next initial seed
    return [...seedLocs, mapSeed(initSeed)]
}, [])

console.log(locations.toSorted((a, b) => a-b))
const leastLoc = locations.toSorted((a, b) => a-b)[0]
const attempts: any = [1249872241, 'here'];
if (attempts.includes(leastLoc)) {
    console.log('You got old attempt', leastLoc)
}
// Winner: 
else console.log('New locations:', leastLoc)