import sys


# to extract all the query 15 from the throuput query set
def copy_lines_with_pattern(input_file, output_file, patterns):
    lines_to_copy = []
    lines_to_keep = []
    with open(input_file, 'r') as f_in:
        for line in f_in:
            if any(line.strip().startswith(pattern) for pattern in patterns):
                lines_to_copy.append(line)
            else:
                lines_to_keep.append(line)

    with open(output_file, 'w') as f_out:
        f_out.writelines(lines_to_copy)

    with open(input_file, 'w') as f_in:
        f_in.writelines(lines_to_keep)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python script.py input_file output_file pattern1 pattern2 pattern3 ...")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    patterns = sys.argv[3:]

    copy_lines_with_pattern(input_file, output_file, patterns)
    print("Matching lines copied to a separate output file, and removed from the input file, successfully.")


# remove any repeated queries from the resulting file


# python extract_query_15.py Throuput-test-query-set.sql query_15.sql "create view revenue0" "select s_suppkey, s_name, s_address, s_phone, total_revenue from" "drop view revenue0;"