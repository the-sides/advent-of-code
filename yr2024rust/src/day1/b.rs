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
        // println!("{l}-{r}");

        let l_num: i32 = l.parse().expect("Should be number");
        let r_num: i32 = r.parse().expect("Should be number");
        left.push(l_num);
        right.push(r_num);
    }

    
    let mut sum = 0;

    for val in left {
        let occurances: i32 = right.clone().into_iter()
            .filter(|&x| x == val)
            .collect::<Vec<i32>>()
            .len().try_into().unwrap();
        
        sum += val * occurances;
    } 

    println!("Sum: {sum}");
}
