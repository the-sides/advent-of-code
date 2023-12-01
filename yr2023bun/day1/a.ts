// Because coding on windows is disgusting
// const path = import.meta.dir + '/input.txt';
// const file = Bun.file(path);
// const input = await file.text();
import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const sum = input.split('\n')
  .reduce((sum: number, line: string) => {
    const regex = /\d/g;
    const numbers = line.match(regex)
    if (!numbers?.[0] || !numbers?.at(-1)) {
      throw new Error('Number not found in line: ' + line);
    }
    return sum + Number(String(numbers[0]) + String(numbers.at(-1)));
  }, 0);

console.log('sum', sum)