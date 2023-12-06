const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();


const times = input.split('\n')[0].split(' ').filter(s => s !== '').slice(1).map(Number)
const dists = input.split('\n')[1].split(' ').filter(s => s !== '').slice(1).map(Number)
console.log(times, dists)

let sum = 1;
let winners = 0;
const time = Number(times.map(String).join(''))
const dist = Number(dists.map(String).join(''))
console.log(time, dist)
for (let speed = 0; speed < time; speed++) {
    const myDist = speed * (time - speed )
    if(myDist > dist) winners++
}
sum *= winners;
winners = 0;

const attempts: any = ['here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 33875953
else console.log('New Sum:', sum)