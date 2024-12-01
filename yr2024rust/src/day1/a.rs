use std::fs;

pub fn solve() {
    let contents: String =
        fs::read_to_string("src/day1/input.txt").expect("Should have been able to read the file");

    let words: Vec<&str> = contents.split(", ").collect();
    
}
