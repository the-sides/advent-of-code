import { fromFileUrl } from "path";
const input = (await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
)).replaceAll("\r", "");

const lines = input.split("\n");

let register = 1
let ticks = 1;
let sum = 0;

const checkFor20th = () => {
  if ((ticks + 20) % 40 === 0) {
    sum += (register*ticks);
    console.log(`${register} * ${ticks} = ${register*ticks} | sum: ${sum}`);
  }
}

for (const cmd of lines) {
  if (cmd === 'noop') {
    ticks++
    checkFor20th();
    continue;
  };

  let [addx, unit] = cmd.split(' ');
  if (addx !== 'addx') throw new Error('3rd command??');
  unit = Number(unit)

  ticks++;
  checkFor20th();
  ticks++;
  register += unit;
  checkFor20th();

}