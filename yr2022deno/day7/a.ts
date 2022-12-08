import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const tree: any = {
  '/': {
    children: {},
    size: 0,
  }
};

// tree["/"].children["brhvclj"].children = {
//   "file": { size: 123 },
//   "dir1": {
//     children: {
//       "dir1a": { children: [], size: 1234 },
//       "dir1b": { children: [], size: 412 },
//     },
//   },
// };

const cwd: string[] = [];
const lines = input.split("\n");
// console.log(lines.length);

const getCrntParent = () => {

  if (cwd.length < 2) return;

  const parent = cwd.reduce((parentDir, dir) => {
    // console.log(dir,)
    return parentDir?.[dir]?.children ?? parentDir;
  }, tree);


  if (!parent[cwd.at(-1)]) {
    parent[cwd.at(-1)] = {
      children: {},
      size: 0
    }
  }

  return parent;
}

const getCurrentContainer = () => {

  return cwd.reduce((parentDir, dir) => {
    if (!parentDir[dir].children) { throw new Error('lookup chain broke') }
    return parentDir[dir].children;
  }, tree);
}

const getCurrentParent = () => {

  return cwd.reduce((parentDir, dir, ind) => {
    if (!parentDir[dir].children) { throw new Error('lookup chain broke') }
    return ind === cwd.length - 1 ? parentDir[dir] : parentDir[dir].children;
  }, tree);
}

const foundDir = (newDirName) => {
  // ['/']

  const children = getCurrentContainer();

  if (!children[newDirName]) {
    children[newDirName] = {
      children: {},
      size: 0,
    }
  } else {
    console.log('Already made', children)
  }
}

// Will check for crnt and init if undefined
const initCrntDir = () => getCrntParent();


const trackFile = (line: string) => {
  const crntDir = cwd.at(-1);
  getCrntParent();
  const [a, b] = line.split(" ");

  // File Types
  //   Directory
  if (a === "dir") {
    // map it
    foundDir(b)
  }
  // File
  else {
    const size = Number(a);
    getCurrentContainer()[b] = { size }

    // Might have to be changed to consider sub directories. 
    getCurrentParent().size += size;
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
  console.log('/' + cwd.slice(1, cwd.length).join("/"));
};

const command = (line: string) => {
  if (line.includes("$ cd")) {
    const dir = line.split("$ cd ")[1];
    move(dir);
  } else if (line.includes("$ ls")) {
    // initDirectory()
    // initCrntDir();
  } else {
    console.error("Unrecognized command", line);
    throw new Error("Unrecognized command");
  }
};

// Ignore the first cd /, assume we are already at root
for (const line of lines) {
  // Break command into types
  // Command
  if (line[0] === "$") {
    command(line);
  } // Output
  else {
    // only output is listing
    // look at current working directory
    // start defining tree
    trackFile(line)
  }
}

console.log(tree['/'].children['lcz'])