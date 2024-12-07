const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const lines = data.split('\n').map(s => s.trim());
const rules: {[key: string]: string[]} = {

}

let transition = -1;
lines.forEach((line, l) => {
    if (transition !== -1) return;
    const ruleSplit = line.split('|');
    if(ruleSplit.length === 1) {
        transition = l;
        return;
    }
    const [x, y] = line.split('|')
    console.log(x,y)
    rules[x] = [...(rules[x] ?? []), y]
})

const sum = lines.slice(transition + 1).reduce((accu, line) => {

    const subjects = line.split(',')

    const ordered = subjects.toSorted((a, b) => {
        const aFirst = (rules[a] ?? []).includes(b)
        const bFirst = (rules[b] ?? []).includes(a)
        if(aFirst === bFirst) return 0;
        return Number(bFirst) - Number(aFirst)
    })

    // console.log(ordered.join(','))
    // Only count correctly ordered lines
    if (ordered.join(',') === line) return accu;

    const middleOne = ordered[Math.floor((ordered.length/2))];
    return accu + Number(middleOne);
}, 0)

console.log({sum})