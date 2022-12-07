import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

interface file {
  name: string;
  size: number;
}
interface directory {
  children: ;
  size: number;
}


const tree: directory[];

tree["/"]["brhvclj"] = {
  "file": { size: 123 },
  "dir1": {
    children: {
      "dir1a": { children: [], size: 1234 },
      "dir1b": { children: [], size: 412 },
    },
  },
};

const cwd: string[] = [];
const lines = input.split("\r\n");
// console.log(lines.length);

const parseListOutput = (line: string) => {
  // Do nothing?
  const dirName = cwd.at(-1);
  const [a, b] = line.split(" ");
  if (a === "dir") {
    // map it
  } else {
    const size = Number(a);
  }
};

const move = (dest: string) => {
  // Deeper or meta (..)
  if (dest === "..") {
    // Backtrace
    cwd.pop();
  } else {
    cwd.push(dest);
  }
  console.log("/" + cwd.join("/"));
};

const command = (line: string) => {
  if (line.includes("$ cd")) {
    const dir = line.split("$ cd ")[1];
    move(dir);
  } else if (line.includes("$ ls")) {
    // Populate tree
    // Document items
    // Track directories
  } else {
    console.error("Unrecognized command", line);
    throw new Error("Unrecognized command");
  }
};

// Ignore the first cd /, assume we are already at root
for (const line of lines.slice(1)) {
  // Break command into types
  // Command
  if (line[0] === "$") {
    command(line);
  } // Output
  else {
    // only output is listing
    // look at current working directory
    // start defining tree
  }
}
