const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");



export function solve() {
    const lines: string[][] = data.split('\n').map(s => s.trim()).map(s => s.split(''));


    let guard: [number, number] = lines.reduce((accu, line, y) => {
        if (accu[0] !== -1) return accu;
        const spot = line.indexOf('^')
        if (spot === -1) return accu;
        else return [y, spot]
    }, [-1, -1])

    let dir = 0;
    let sum = 1;

    const guardPiece = ['^', '>', 'V', '<'];

    const rotate = () => dir = (dir + 1) % 4;
    const move = [
        // Up
        () => {
            console.log('Guard', guard)
            const newY = guard[0] - 1;
            if (newY < 0) { console.log('Game Over', { sum }); Deno.exit(); }
            if (lines[newY][guard[1]] === '#') {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[newY][guard[1]] === '.') sum++;
            lines[newY][guard[1]] = guardPiece[dir]
            lines[guard[0]][guard[1]] = 'X'
            guard = [newY, guard[1]]
        },
        // Right
        () => {
            console.log('Guard', guard)
            const newX = guard[1] + 1;
            if (newX >= lines[0].length) { console.log('Game Over', { sum }); Deno.exit(); }
            if (lines[guard[0]][newX] === '#') {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[guard[0]][newX] === '.') sum++;
            lines[guard[0]][newX] = guardPiece[dir]
            lines[guard[0]][guard[1]] = 'X'
            guard = [guard[0], newX]
        },
        // Down
        () => {
            console.log('Guard', guard)
            const newY = guard[0] + 1;
            if (newY >= lines.length) { console.log('Game Over', { sum }); Deno.exit(); }
            if (lines[newY][guard[1]] === '#') {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[newY][guard[1]] === '.') sum++;
            lines[newY][guard[1]] = guardPiece[dir]
            lines[guard[0]][guard[1]] = 'X'
            guard = [newY, guard[1]]
        },
        // Left
        () => {
            console.log('Guard', guard)
            const newX = guard[1] - 1;
            if (newX < 0) { console.log('Game Over', { sum }); Deno.exit(); }
            if (lines[guard[0]][newX] === '#') {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[guard[0]][newX] === '.') sum++;
            lines[guard[0]][newX] = guardPiece[dir]
            lines[guard[0]][guard[1]] = 'X'
            guard = [guard[0], newX]
        }
    ]

    return {
        next: () => {
            move[dir]?.();
            move[dir]?.();
            move[dir]?.();
            return lines.map(line => line.join(''));
        }
    }
}

// Too High
// 5551, 5552, 5553, 5554