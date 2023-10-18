const start = 'a'.charCodeAt(0);

function f (s: string){ 
    return [...s].reduce((accu, c) => {
        const inverse = ((c.charCodeAt(0) - start - 25) * -1) + start;
        return accu + String.fromCharCode(inverse);
    }, '')
}

console.log(f('abckzyx'))