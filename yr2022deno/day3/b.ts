import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
  fromFileUrl(import.meta.resolve("./input.txt")),
);

const sacks = input.split("\n");
let sum = 0;

for (let i = 0; i < sacks.length; i = i + 3) {
  const sack = sacks[i];
  const sack2 = sacks[i + 1];
  const sack3 = sacks[i + 2];
  let itemsFound: string[] = [];
  [...sack].forEach((char) => {
    if ([...sack2].includes(char)) {
      itemsFound.push(char);
    }
  });

  itemsFound = itemsFound.filter((item) => [...sack3].includes(item));


  if(!itemsFound[0]) {
    console.log('nothing in common')
  } else {
    console.log('groups', itemsFound);
    
  }

  const charCode = itemsFound[0].charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) {
    sum = sum + charCode - 96;
  } else if (charCode >= 65 && charCode <= 90) {
    sum = sum + charCode - 64 + 26;
  }
}

console.log(sum);
