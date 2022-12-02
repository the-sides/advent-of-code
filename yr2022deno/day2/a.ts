import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const games = input.split("\r\n");
console.log(games);

let points = 0;

const gamePoints = {
  "X": {
    "A": 3,
    "B": 0,
    "C": 6,
  },
  "Y": {
    "A": 6,
    "B": 3,
    "C": 0,
  },
  "Z": {
    "A": 0,
    "B": 6,
    "C": 3,
  },
};

points = games.reduce((accu, line) => {
  const [elf, me] = line.split(" ");
  if (me === "X") accu += 1;
  if (me === "Y") accu += 2;
  if (me === "Z") accu += 3;

  accu += gamePoints[me][elf];
  
  return accu;
}, 0);

console.log(points);
