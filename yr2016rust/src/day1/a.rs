use std::fs;



pub fn solve() {
    let contents: String =
        fs::read_to_string("src/day1/input.txt").expect("Should have been able to read the file");

    let words: Vec<&str> = contents.split(", ").collect();
    // ['N', 'E', 'S', 'W']
    let dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)];

    let mut current_dir_ind = 0;
    let mut sums = [0, 0];
    for word in &words {
        // println!("{}", word)
        let mag: i32 = word[1..].parse().expect("This should be a number");
        if word.as_bytes()[0] == b'R' {
            current_dir_ind = (current_dir_ind + 1) % 4;
        }
        if word.as_bytes()[0] == b'L' {
            if current_dir_ind == 0 {
                current_dir_ind = 3;
            }
            else {
                current_dir_ind -= 1; 
            }
        }

        println!("Going {:?} for {}  -  from {:?}", dirs[current_dir_ind], mag, sums);
        sums[0] += dirs[current_dir_ind].0 * mag;
        sums[1] += dirs[current_dir_ind].1 * mag;

    }

    println!("{:?}", words);
    println!("Sum: {:?}", sums[0].abs() + sums[1].abs());
}
