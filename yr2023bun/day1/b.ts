// Because coding on windows is disgusting
// const path = import.meta.dir + '/input.txt';
// const file = Bun.file(path);
// const input = await file.text();
import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
    fromFileUrl(import.meta.resolve("./input.txt")),
);

const replaceWithNumber = (line: string) => {
    const toWord: string[] = ['aaaaaaaaaaaaaaaaaaaaa', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    // xtwone3four should be 24 instead of 14, so we'll slowly build the current line to limit our search to early characters.    
    const remainingChars = [...line];
    return remainingChars.reduce((buildingLine: string, newChar: string) => {
        buildingLine += newChar;
        // With a single character added, look and replace any number words
        buildingLine = toWord.reduce((newLine: string, word: string, ind: number) => {
            return newLine.replace(word, String(ind) + word.slice(1) )
        }, buildingLine)
        return buildingLine;
    }, '')
}

const sum = input.split('\n')
    .reduce((sum: number, line: string) => {
        const regex = /\d/g;
        console.log('before', line)
        line = replaceWithNumber(line)
        console.log('after', line)
        const numbers = line.match(regex)
        if (!numbers?.[0] || !numbers?.at(-1)) {
            throw new Error('Number not found in line: ' + line);
        }
        console.log('using', String(numbers[0]) + String(numbers.at(-1)))
        return sum + Number(String(numbers[0]) + String(numbers.at(-1)));
    }, 0);

const attempts = [54145, 54558, 'here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner New Sum: 54578
else console.log('New Sum:', sum)