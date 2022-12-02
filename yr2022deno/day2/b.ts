import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const games = input.split("\r\n");
console.log(games);

let points = 0;
// A rock B Paper C sci
const gamePoints = {
  "A": { // they rock
    "X": 3, // scis
    "Y": 1, // rock
    "Z": 2, // paper
  },
  "B": { // t paper
    "X": 1, 
    "Y": 2, // kill me
    "Z": 3, 
  },
  "C": { // t scie
    "X": 2, // paper
    "Y": 3, // sci
    "Z": 1, // rock
  },
};

points = games.reduce((accu, line) => {
  const [elf, me] = line.split(" ");
  if (me === "X") accu += 0;
  if (me === "Y") accu += 3;
  if (me === "Z") accu += 6;



  accu += gamePoints[elf][me];
  
  return accu;
}, 0);

console.log(points);
