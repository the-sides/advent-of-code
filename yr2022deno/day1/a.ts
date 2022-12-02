import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

console.log(input)

