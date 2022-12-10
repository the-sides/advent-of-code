import { fromFileUrl } from "path";
const input = (await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
)).replaceAll("\r", "");

const lines = input.split("\n");
