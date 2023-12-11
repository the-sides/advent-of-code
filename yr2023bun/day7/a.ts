// Because coding on windows is disgusting
// const path = import.meta.dir + '/input.txt';
// const file = Bun.file(path);
// const input = await file.text();
import { fromFileUrl } from "path";
const input = await Deno.readTextFile(
    fromFileUrl(import.meta.resolve("./input.txt")),
);

interface result {
    best: string;
    pass: boolean;
}
const genCardMap = (hand: string[]) => {
    return hand.reduce((accu: any, card: string) => {
        if (accu[card]) accu[card] += 1;
        else accu[card] = 1;
        return accu;
    }, {})
}

const cardsToHigh: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const cards: string[] = cardsToHigh.toReversed()

// const hands: (cardMap: any) => result[] = [
//     // Five of a kind
//     (hand) => {
//         const pass = hand.toSpliced(1).every(card => card === hand[0]);
//         return { best: hand[0], pass }
//     },
//     // Four of a kind
//     // (hand: string[]) => {

//     //     return { best: hand[0], pass }
//     // }
// ]
const hands = input.split('\r\n')
    .map((line: string) => {
        console.log(line.split(' '))
        const [hand, gamble] = line.split(' ')
        // console.log()
        const freq = genCardMap([...hand])
        const uniques = Object.keys(freq).length;
        // 5 of kind
        if (uniques === 1) {

            return {
                rank: 1,
                hand,
                gamble
            }
        }
        // 4 of a kind or full house
        if (uniques === 2) {
            if (Object.values(freq).includes(4))
                return {
                    rank: 2,
                    hand,
                    gamble
                }
            else return {
                rank: 3,
                hand,
                gamble
            }
        }
        if (uniques === 3) {
            // Three of a kind
            if (Object.values(freq).includes(3)) return {
                rank: 4,
                hand,
                gamble
            }
            // Two of a kind
            else return {
                rank: 5,
                hand,
                gamble
            }
        }
        if (uniques === 4)
            // One pair
            return {
                rank: 6,
                hand,
                gamble
            }
        else
            // High Card
            return {
                rank: 7,
                hand,
                gamble
            }
    });

const ranks = hands.sort((a, b) => {
    let rv = a.rank - b.rank
    if(rv !== 0) return rv 
    let i = -1
    while(rv === 0 && ++i < 5){
        const aRank = cards.indexOf(a.hand[i])
        const bRank = cards.indexOf(b.hand[i])
        rv = aRank - bRank
    }
    return rv;
}).reverse()
console.log(ranks)
const sum = ranks.reduce((sum: number, crnt: any, rank: number) => {
    return sum + (Number(crnt.gamble) * (rank + 1));
}, 0)
const attempts: any = [249847926, 250153574, 'here', 250347426];
if (attempts.includes(sum)) {
    console.log('You got old attempt', sum)
}
// Winner: 250347426
else console.log('New Sum:', sum)