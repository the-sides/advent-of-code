import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const lines = input.split("\r\n").filter((line) => "" !== line);
const board = lines.filter((line) => !line.includes("move"));
const moves = lines.filter((line) => line.includes("move"));
const moveUnits : number[][] = moves.map((move) => [...move.matchAll(/\d+/g)]?.map(Number) ?? []);
const lanes : string[][] = [...Array(9)].map(() => ([]))



board.forEach((line) => {
  [...line].forEach((char, i) => {
    if (![" ", "[", "]"].includes(char) && !char.match(/\d+/g)?.length) {
      const slot = (i + 3) / 4;
      try {
        // console.log('push', char, 'at', slot-1)
        lanes[slot-1] = [char, ...lanes[slot-1]]
      }
      catch {
        console.error(lanes, slot, char)
      }
    }
  });
});

// console.log([...lanes])
// lanes[0].pop()
// console.log([...lanes])

console.log('start', lanes)

moveUnits.forEach(([qnt,from,to]) => {
  // console.log(qnt,from,to)
  let toMove: string[] = [];
  for (let i = 0; i < qnt; i++) {
    const last = lanes[from-1].pop() ?? '';
    if(last !== '') toMove = [last, ...toMove];
    else console.error('value wasn\'t popped', qnt,from,to)
  }
  lanes[to-1].push(...toMove)
})

console.log(lanes.map(lane => lane.pop()).join(''));
