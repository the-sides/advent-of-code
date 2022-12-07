import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const frequency: any = {};

for (const char of input) {
  console.log(char);
  if (frequency[char]) {
    frequency[char] += 1;
  } else {
    frequency[char] = 1;
  }
}

const windowSize = 4;
for (let i = windowSize - 1; i < input.length; i++) {
  // const char = input[i];
  let a = i - (windowSize - 1);
  let window = [...input].slice(a, i + 1);
  if ([...new Set(window)].length !== windowSize) continue;
  else {
    console.log("index:", i, "letters processed:", i + 1);
    break;
  }
}

// console.log(frequency)
