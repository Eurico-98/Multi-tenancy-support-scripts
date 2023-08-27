input_file = 'A3-Throuput-test-query-set.csv'
output_file = 'output_queries.txt'
lines_to_copy = 21
skip_lines = 360

with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
    copy_count = 0
    for line in infile:
        if copy_count < lines_to_copy:
            outfile.write(line)
            copy_count += 1
        elif copy_count == lines_to_copy + skip_lines:
            copy_count = 0
        else:
            copy_count += 1
