const path = import.meta.dir + '/input.txt';
const file = Bun.file(path);
const input = await file.text();
/**
 * The ribbon required to wrap a present is the shortest distance 
 * around its sides, or the smallest perimeter of any one face. 
 * Each present also requires a bow made out of ribbon as well; 
 * the feet of ribbon required for the perfect bow is equal to 
 * the cubic feet of volume of the present. Don't ask how they 
 * tie the bow, though; they'll never tell.

 * For example:

 * A present with dimensions 2x3x4 requires 2+2+3+3 = 10 feet of ribbon 
 * to wrap the present plus 2*3*4 = 24 feet of ribbon for the bow, for a total of 34 feet.
 * A present with dimensions 1x1x10 requires 1+1+1+1 = 4 feet of ribbon 
 * to wrap the present plus 1*1*10 = 10 feet of ribbon for the bow, for a total of 14 feet.
 * How many total feet of ribbon should they order?
 */

const res = input
    .split('\n')
    .reduce((sum, crnt) => {
        const [l, w, h] = crnt.split('x').map(Number);
        const smallestFace = [l,w,h].sort((a, b) => a-b).slice(0,2);
        const area = smallestFace.reduce((a, c) => (2 * c) + a, 0);
        const vol = l * w * h;
        return sum + area + vol;
    }, 0);

console.log(res)