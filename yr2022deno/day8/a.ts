import { fromFileUrl } from "path";
const input = (await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
)).replaceAll("\r", "");

const grid: number[][] = [];

// Setup grid
for (const [ind, line] of input.split("\n").entries()) {
  console.log(line[0], ind);
  grid[ind] = [];
  for (const [charInd, char] of [...line].entries()) {
    grid[ind][charInd] = Number(char);
  }
}

const b = {
  x: grid[0].length - 0,
  y: grid.length - 0,
};

const checkToEdge = (cx: number, cy: number) => {
  // All trees in one of 4 directions must be less than crnt to pass
  const mustBeat = grid[cy][cx];
  let x = 0, y = 0;
  let visible = true;
  const reset = () => {
    visible = true;
    x = cx;
    y = cy;
  };

  // Up
  reset();
  while (--y >= 0) {
    if (grid[y][x] >= mustBeat) {
      visible = false;
    }
  }
  if (visible) return true;

  // Down
  // this one was off originally? why not right?
  reset();
  while (++y < b.y) {
    if (grid[y][x] >= mustBeat) {
      visible = false;
    }
  }
  if (visible) return true;

  // Left
  reset();
  while (--x >= 0) {
    if (grid[y][x] >= mustBeat) {
      visible = false;
    }
  }
  if (visible) return true;

  // Right
  reset();
  while (++x <= b.x) {
    if (grid[y][x] >= mustBeat) {
      visible = false;
    }
  }
  if (visible) return true;

  return false;
};

let visibleTrees = 0;
for (let y = 0; y < grid.length; y++) {
  const xRow = grid[y];
  for (let x = 0; x < xRow.length; x++) {
    checkToEdge(x, y) && visibleTrees++;
  }
}

console.log(grid);
console.log({ visibleTrees });
