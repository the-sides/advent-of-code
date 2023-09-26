# Year 2015: Throwback powered by Bun
In anticipation for 2015 and a desire to code more, I'm going back to the first year of the advent and doing some puzzles. Also using this as a chance to play with Bun more. 

### Solution History Tracker
It would be nice to write more utilities to use in all my puzzels.
Something to track every attempt's answer and save them to a file. 
Then at the end of a code attempt, the generated solution could be compared to past attempts that were proven wrong and reject it immediately. 
On that note, attempt values would have to be logged based on whether or not it was submitted and proved wrong. 
I might get a value during testing, gets logs, write more, submit a different attempt that's wrong, then my first attempt that could have been right is rejected before it can be submittion tested by better code that gives the same value. 
Perhaps a edge case considering the complexity of solutions, but
always a consideration. 


### CLI App for Puzzle Management
I would like to build a cool CLI app for adding new days, as well as interacting and managing them. Also in effort to learn Bun more and build new/different apps. 

While I try to build the CLI App, I wanted to do this with Ink and React, but there is a problem with running an Ink dependency with Bun, so I had to comment out some code to run the `robot.txs`, helpful to know when I keep working on that if I re-install else where. 
Path to this file is...
`yr2015bun/node_modules/patch-console/dist/index.js`
![Image](./static/patch-console-error-with-bun.png)