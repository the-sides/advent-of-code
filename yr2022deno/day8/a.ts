import { fromFileUrl } from "path";
const input = (await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
)).replaceAll('\r', '');


const grid: string[][] = [];

for (const line of input.split('\n')) {
  console.log(line);
}


// console.log(frequency)
