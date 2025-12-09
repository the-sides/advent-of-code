import { solve } from "./b.ts";

let { next, max } = solve();


let y = 0;
let x = 0;
let loops = 0;
while (true) {
    const {lines, guard, finished, looped, obstruction} = next();

    if(finished || looped) {
        if(looped) loops++;
        if(x === max.x){ x = 0; y++}
        if(y === max.y){
            console.log("Loops Possible:", loops)
            Deno.exit()
        }
        next = solve([y, x++]).next
    }
}