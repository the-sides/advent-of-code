const data = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

// Takes about 20 secs to run
export function solve(obstruction = [0,0]) {
    const lines: string[][] = data.split('\n').map(s => s.trim()).map(s => s.split(''));

    lines[obstruction[0]][obstruction[1]] = 'O'

    let guard: [number, number] = lines.reduce((accu, line, y) => {
        if (accu[0] !== -1) return accu;
        const spot = line.indexOf('^')
        if (spot === -1) return accu;
        else return [y, spot]
    }, [-1, -1])

    let dir = 0;
    let sum = 1;
    let finished = false;
    let looped = false;
    const seen: {[key: string]: number} = {};

    const guardPiece = ['^', '>', 'V', '<'];
    

    const rotate = () => dir = (dir + 1) % 4;
    const move = [
        // Up
        () => {
            const newY = guard[0] - 1;
            if (newY < 0) { console.log('Game Over', { sum }); finished = true; return;}
            if (['O', '#'].includes(lines[newY][guard[1]])) {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[newY][guard[1]] === '.') sum++;
            if (lines[newY][guard[1]] === '|') { console.log('Loop hit', { sum }); looped = true; return;}
            lines[newY][guard[1]] = guardPiece[dir]
            lines[guard[0]][guard[1]] = '|'
            guard = [newY, guard[1]]
            seen[`${guard[0]}-${guard[1]}`] = (seen?.[`${guard[0]}-${guard[1]}`] ?? 0) + 1;
            if(seen[`${guard[0]}-${guard[1]}`] > 1000) { console.log('Loop detected', { sum }); looped = true; return;}
        },
        // Right
        () => {
            const newX = guard[1] + 1;
            if (newX >= lines[0].length) { console.log('Game Over', { sum }); finished = true; return;}
            if (['O', '#'].includes(lines[guard[0]][newX])) {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[guard[0]][newX] === '.') sum++;
            if (lines[guard[0]][newX] === '_') { console.log('Loop hit', { sum }); looped = true; return;}
            lines[guard[0]][newX] = guardPiece[dir]
            lines[guard[0]][guard[1]] = '_'
            guard = [guard[0], newX]
            seen[`${guard[0]}-${guard[1]}`] = (seen?.[`${guard[0]}-${guard[1]}`] ?? 0) + 1;
            if(seen[`${guard[0]}-${guard[1]}`] > 1000) { console.log('Loop detected', { sum }); looped = true; return;}
        },
        // Down
        () => {
            const newY = guard[0] + 1;
            if (newY >= lines.length ) { console.log('Game Over', { sum }); finished = true; return;}
            if (['O', '#'].includes(lines[newY][guard[1]])) {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[newY][guard[1]] === '.') sum++;
            if (lines[newY][guard[1]] === 'l') { console.log('Loop hit', { sum }); looped = true; return;}
            lines[newY][guard[1]] = guardPiece[dir]
            lines[guard[0]][guard[1]] = 'l'
            guard = [newY, guard[1]]
            seen[`${guard[0]}-${guard[1]}`] = (seen?.[`${guard[0]}-${guard[1]}`] ?? 0) + 1;
            if(seen[`${guard[0]}-${guard[1]}`] > 1000) { console.log('Loop detected', { sum }); looped = true; return;}
        },
        // Left
        () => {
            const newX = guard[1] - 1;
            if (newX < 0) { console.log('Game Over', { sum }); finished = true; }
            if (['O', '#'].includes(lines[guard[0]][newX])) {
                rotate();
                lines[guard[0]][guard[1]] = guardPiece[dir];
                return;
            }
            if (lines[guard[0]][newX] === '.') sum++;
            if (lines[guard[0]][newX] === '-') { console.log('Loop hit', { sum }); looped = true; return;}
            lines[guard[0]][newX] = guardPiece[dir]
            lines[guard[0]][guard[1]] = '-'
            guard = [guard[0], newX]
            seen[`${guard[0]}-${guard[1]}`] = (seen?.[`${guard[0]}-${guard[1]}`] ?? 0) + 1;
            if(seen[`${guard[0]}-${guard[1]}`] > 1000) { console.log('Loop detected', { sum }); looped = true; return;}
        }
    ]

    return {
        max: {
            y: lines.length, 
            x: lines[0].length,
        },
        next: () => {
            let i = 0;
            do {
                move[dir]?.();
            } while (!looped && !finished && i++ < 1600)
            
            return { lines: lines.map(line => line.join('')).join('\n'), guard, finished, looped, obstruction};
        }
    }
}

// Too High
// 5551, 5552, 5553, 5554