import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const sacks = input.split("\n");

const sum = sacks.reduce(
  (sum, sack) => {
    const h1 = sack.slice(0, sack.length / 2);
    const h2 = sack.slice(sack.length / 2, sack.length);
    let itemFound = "";
    [...h1].forEach((char) => {
      if ([...h2].includes(char)) {
        itemFound = char;
      }
    });

    const charCode = itemFound.charCodeAt(0);
    if(charCode >= 97 && charCode <= 122) {
      return sum + charCode - 96;
    }
    else if (charCode >= 65 && charCode <= 90) {
        return sum + charCode - 64 + 26;
    }
    return sum;
  },
  0,
);
console.log(sum);

// const typeMap = sacks.reduce((accu, crnt) => {
//   const half = Math.ceil(crnt.length / 2);

//   let [area1, area2] = [[...crnt].slice(0, half), [...crnt].slice(half, crnt.length)];
//   console.log(area1.join(""), area2.join(""), area1[0]);
//   for (let i = 0; i < area1.length-1; i++) {
//     if ([...area2].includes(area1[i])) {
//       // If the item is found in the array
//       // then remove it so the side the has the least amount
//       // will represent how many
//       // pairs of a type exist. which is what I think I need to count
//       area2 = [...area2.join("").replace(area1[i], "")];
//       const existing = accu.get(area1[i]) ?? 0;
//       console.log("found", area1[i], existing);

//       // console.log()
//       accu.set(area1[i], existing + 1);
//       // break
//     }
//   }
//   return accu;
// }, new Map());

// const priorities: any = {};
// let priorityPoint = 1;
// for (let i = 97; i <= 122; i++) {
//   priorities[String.fromCharCode(i)] = priorityPoint++;
// }
// for (let i = 65; i <= 90; i++) {
//   priorities[String.fromCharCode(i)] = priorityPoint++;
// }

// console.log(
//   [...typeMap.keys()].reduce(
//     (accu, crnt) => accu + (priorities[crnt] * typeMap.get(crnt)),
//     0,
//   ),
// );

// // console.log(typeMap);
// // console.log(priorities);
