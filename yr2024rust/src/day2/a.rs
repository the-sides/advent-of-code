use std::fs;

pub fn solve() {
    let contents: String =
        fs::read_to_string("src/day2/input.txt").expect("Should have been able to read the file");

    let lines: Vec<&str> = contents.split("\n").collect();
    let mut sum = 0;
    for line in lines {
        let levels: Vec<i32> = line
            .split_whitespace()
            .filter_map(|s| s.parse::<i32>().ok())
            .collect();

        println!("{:?}", levels);

        if(levels[0] == levels[1]) {
            println!("Fail: {:?} same level", level);
            continue;
        }

        let mut prev = levels[0];
        let mut goingUp = levels[0] < levels[1];
        for level in levels[1..].into_iter() {
            if(goingUp && level < prev) {
                if(level - 2 > prev)
            }

        }
    }

    println!("Sum: {sum}");
}
