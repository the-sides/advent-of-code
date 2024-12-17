const data = Deno.readTextFileSync(import.meta.dirname + "/sample.txt");

const lines = data.split('\n').map(l => l.trim())

lines.forEach(line => {
    const [testValRaw, numsRaw] = line.split(':')
    const testVal = Number(testValRaw);
    const nums: number[] = numsRaw.trim().split(' ').map(Number)
    console.log(testVal, nums)
    // false = +, true = *
    const operands = nums.slice(1).map(_ => false)

    const compute = (sum: number, ops: boolean[], ind: number): number => {
        // const atEnd = ops.every((op: boolean) => op)

        const product = nums.reduce((accu, num, j) => {
            if(ops[j]) {
                return accu + num
            } else return accu * num
        }, 0);

        const isValid = testVal === product
        isValid && console.log('Found', nums, [...ops])

        if(ind === ops.length) return sum + Number(isValid);

        // Set up branches
        ops[ind] = true
        const addBranch = compute(sum, ops, ind + 1)
        ops[ind] = false
        const multBranch = compute(sum, ops, ind + 1)
        
        return sum + Number(addBranch) + Number(multBranch);
    }

    const sum = compute(0, operands, 0)
    console.log(sum)
})