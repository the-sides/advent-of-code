# Preston Beaty
# Advent Day 7
# Dec 7th, 2022

import os
import re

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

input_file = open(os.path.join(dir, 'input.txt'), "r")
input = input_file.readlines()

total = 0
line_count = 0
folder_sizes = []
size_tracker = 0

#read each line
for line in input:
    split_input = line.split()

    if len(split_input) == 3:
        #if you cd into a dir
        if (split_input[0] == '$' and split_input[1] == 'cd' and split_input[2] != '..'):
            folder_sizes.append(0)
        #if you back out of a dir
        else:
            if folder_sizes[len(folder_sizes)-1] <= 100000:
                size_tracker += folder_sizes.pop()

    else:
        #If the line is an ls command or a dir listing ine skip
        if (split_input[0] == 'dir' or split_input[1] == 'ls'):
            continue
        #Hit a file with an actual size
        elif (split_input[0].isnumeric()):
            for i in range(len(folder_sizes)):
                folder_sizes[i] += int(split_input[0])

print("Size of folders less than 100,000:", size_tracker)