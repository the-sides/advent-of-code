import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const elfs = input.split("\r\n\r\n");
const calories = elfs.map((elf) =>
  elf.split("\r\n").reduce((accu, food) => {
    return Number(accu + Number(food));
  }, 0)
);
calories.sort((a, b) => a - b);

console.log(
  (calories.at(-1) ?? 0) + (calories.at(-2) ?? 0) + (calories.at(-3) ?? 0),
);
