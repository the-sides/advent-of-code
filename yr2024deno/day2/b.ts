const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const lines = data.split('\n')

function testReport(nums: number[]) {
    const goingUp = nums[0] < nums[1];
    let pass = true;
    if (nums.length === 1) { return true };
    if (nums[0] === nums[1]) return false;
    nums.slice(1).forEach((num, offset) => {
        if (!pass) return;
        const prev = nums[offset]
        if (goingUp) {
            pass = num > prev && num < prev + 4
        } else {
            pass = num < prev && num > prev - 4
        }
    })
    return pass;
}

function removeIndex<T>(arr: T[], index: number): T[] {
    return arr.slice(0, index).concat(arr.slice(index + 1));
}
let sum = 0;
lines.forEach((line) => {
    const numbers = line.split(' ').map(s => s.trim()).map(Number)
    console.log('  Super:', numbers.join(' '))
    if (testReport(numbers)) {
        console.log('Passed on it\'s own')
        sum++;
    } else {
        let passed = false;
        numbers.forEach((_n, ind) => {
            const subset = removeIndex(numbers, ind);
            const res = testReport(subset)
            console.log(`${res ? 'o' : 'x'} Subset:`, subset.join(' '))
            if (res) { passed = true; }
        })
        if(passed) {
            sum++; 
        }
    }
})

console.log({ sum })