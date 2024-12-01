// use rand::Rng;
// use std::cmp::Ordering;
// use std::io;

fn first_word(s: &String) -> &str{
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    // s.len()
    &s[..]
}

pub fn play() {
    // let val: u32 = ;
    let s = String::from("Hello, world!");


    println!("Here's your value {}", first_word(&s));

    return;

    // let secret_number = rand::thread_rng().gen_range(1..=100);

    // println!("The secret number is: {secret_number}");

    // loop {
    //     println!("Please input your guess.");

    //     let mut guess: String = String::new();

    //     io::stdin()
    //         .read_line(&mut guess)
    //         .expect("Failed to read line");

    //     let guess: u32 = match guess.trim().parse() {
    //         Ok(num) => num,
    //         Err(err) => {
    //             println!("Invalid input: {err}");
    //             continue;
    //         }
    //     };

    //     println!("You guessed: {guess}");

    //     match guess.cmp(&secret_number) {
    //         Ordering::Less => println!("Too small!"),
    //         Ordering::Greater => println!("Too big!"),
    //         Ordering::Equal => {
    //             println!("You win!");
    //             break;
    //         }
    //     }
    // }
}
