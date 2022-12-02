// Import statement?
use std::fs;
use std::str;
// use std::env;

// mod day1;

// Set namespace for sayHi usage. Local definition?
// use day1::sayHi;

fn main() {
    let contents: String =
        fs::read_to_string("input.txt").expect("Should have been able to read the file");

    // let group_separator = vec![13, 10, 13, 10];
    // let groups = contents.split(str::from_utf8(&group_separator).unwrap()).collect::<Vec<&str>>();
    let groups: Vec<&str> = contents.split("\r\n\r\n").collect::<Vec<&str>>();
    // let output = groups[0];
    // println!("{:?}", contents.as_bytes());

    groups.into_iter().for_each(|elf| {
        let foods: Vec<i32> = elf.split("\r\n").map(|food| {
            return food.parse::<i32>().unwrap();
        }).collect::<Vec<i32>>();
        println!("{:?}", foods);
    });

    // println!("{:?}", groups[1].split("\r\n").collect::<Vec<&str>>());
}
