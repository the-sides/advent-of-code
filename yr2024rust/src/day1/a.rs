use std::fs;

pub fn solve() {
    let contents: String =
        fs::read_to_string("src/day1/input.txt").expect("Should have been able to read the file");

    let words: Vec<&str> = contents.split("\n").collect();
    let mut left: Vec<i32> = Vec::new();
    let mut right: Vec<i32> = Vec::new();
    for line in &words {
        let parts: Vec<&str> = line.split_whitespace().collect();
        let (l, r) = (parts[0], parts[1]);
        println!("{l}-{r}");

        let l_num: i32 = l.parse().expect("Should be number");
        let r_num: i32 = r.parse().expect("Should be number");
        left.push(l_num);
        right.push(r_num);
    }

    left.sort();
    right.sort();

    let mut sum = 0;

    for (i, left) in left.into_iter().enumerate() {
        sum += (left-right[i]).abs();
    } 

    println!("Sum: {sum}");
}
