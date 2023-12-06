const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();


const times = input.split('\n')[0].split(' ').filter(s => s !== '').slice(1).map(Number)
const dist = input.split('\n')[1].split(' ').filter(s => s !== '').slice(1).map(Number)
console.log(times, dist)

let sum = 1;
let winners = 0;
times.forEach((time:number, ind: number) => {
    for (let speed = 0; speed < time; speed++) {
        const myDist = speed * (time - speed )
        if(myDist > dist[ind]) winners++
    }
    sum *= winners;
    winners = 0;
});

const attempts: any = ['here'];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 281600 
else console.log('New Sum:', sum)