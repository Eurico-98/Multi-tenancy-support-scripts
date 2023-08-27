input_file = 'A3-Throuput-test-Q15.csv'
output_file = 'output_queries15.txt'
queries_to_copy = 25

queries_by_tenant = {}
unique_queries = []

# Read and process the input file
with open(input_file, 'r') as infile:
    for line in infile:
        tenant = line.split()[0]  # Extract the tenant schema name
        query = line[len(tenant):].strip()  # Extract the query after the tenant name
        
        if tenant not in queries_by_tenant:
            queries_by_tenant[tenant] = []
        
        if query not in unique_queries:
            queries_by_tenant[tenant].append(query)
            unique_queries.append(query)

# Write selected queries to the output file
with open(output_file, 'w') as outfile:
    copied_count = 0
    for tenant, queries in queries_by_tenant.items():
        for query in queries:
            outfile.write(f'{tenant} {query}\n')
            copied_count += 1
            if copied_count >= queries_to_copy:
                break
        if copied_count >= queries_to_copy:
            break
