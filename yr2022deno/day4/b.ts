import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const pairs = input.split("\r\n");

const sum = pairs.reduce((sum, pair) => {
  const [a, b] = pair.split(",");
  const [a1, a2] = a.split("-").map(Number);
  const [b1, b2] = b.split("-").map(Number);

  // A is within
  if (
    (b1 <= a2 && a2 <= b2) ||
    (b1 <= a1 && a1 <= b2)
  ) {
    console.log("a inside", a1, a2, b1, b2);
    return sum + 1;

  // B is within
  } else if (
    (a1 <= b1 && b1 <= a2) ||
    (a1 <= b2 && b2 <= a2)
  ) {
    console.log("b inside", a1, a2, b1, b2);
    return sum + 1;
  }
  return sum;
}, 0);

console.log(sum);
