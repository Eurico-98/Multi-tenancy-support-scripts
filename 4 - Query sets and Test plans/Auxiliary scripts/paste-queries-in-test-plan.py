def find_replace_query(jmx_file, tenant, query_number, new_query):
    with open(jmx_file, 'r') as f:
        lines = f.readlines()

    found_line = None
    for i, line in enumerate(lines):
        if f'testname="{tenant} - Q{query_number}"' in line:
            found_line = i
            break

    if found_line is not None:
        query_line = None
        for i in range(found_line, len(lines)):
            if '<stringProp name="query">' in lines[i]:
                query_line = i
                break

        if query_line is not None:
            lines[query_line] = f'            <stringProp name="query">{new_query}\n'

            with open(jmx_file, 'w') as f:
                f.writelines(lines)


csv_file = 'A3-Throuput-test-query-set.csv'
jmx_file = 'A3-Throughput-Test-1.jmx'

with open(csv_file, 'r') as f:
    queries = f.readlines()
    
line_to_query_mapping = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10,
    11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 18, 18: 19,
    19: 21, 20: 22
}

for tenant in range(1, 26):
    for line_number in line_to_query_mapping:
        query_number = line_to_query_mapping[line_number]
        line_index = (tenant - 1) * 20 + line_number - 1
        if line_index < len(queries):
            query = queries[line_index].strip()
            find_replace_query(jmx_file, f'T{tenant}', query_number, query)
