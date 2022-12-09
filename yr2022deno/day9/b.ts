import { fromFileUrl } from "path";
const input = (await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
)).replaceAll("\r", "");

const lines = input.split("\n");

const tail = { x: 0, y: 0 };
const head = { x: 0, y: 0 };
const tailRecord = ["0,0"];

const recordTailPos = () => {
  const pos = `${tail.x},${tail.y}`;
  tailRecord.push(pos);
};

const isTouching = (): boolean => {
  const dx = tail.x - head.x;
  const dy = tail.y - head.y;

  if (dx > 1 || dx < -1) return false;
  if (dy > 1 || dy < -1) return false;

  return true;
};

// deno-lint-ignore no-explicit-any
const actions: any = {
  "U": () => head.y += 1,
  "R": () => head.x += 1,
  "D": () => head.y -= 1,
  "L": () => head.x -= 1,
};

for (const line of lines) {
  const [dir, _unit] = line.split(" ");
  let unit = Number(_unit);
  let prevHead = { ...head };

  while (unit > 0) {
    actions[dir]();
    if (!isTouching()) {
      tail.x = prevHead.x;
      tail.y = prevHead.y;
      recordTailPos();
    }
    unit--;
    prevHead = { ...head };
  }
}

console.log({ tailRecord, uniqueSpots: [...new Set(tailRecord)].length });
