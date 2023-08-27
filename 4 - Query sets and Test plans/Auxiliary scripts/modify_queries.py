def process_queries(input_file, num_tenants, output_file):
    # Read the contents of the SQL file into a temporary variable
    with open(input_file, 'r') as f:
        sql_content = f.read()

    # Create a list to store all modified queries
    all_modified_queries = []

    group_id = 1000

    # Iterate through each tenant
    for tenant_id in range(1, num_tenants + 1):
        
        
        if tenant_id > 50:
            # Replace 'where' with 'where tenant_id = X and' for the current tenant
            modified_sql_content = sql_content.replace('where', f'where tenant_id = {group_id} and')
            group_id += 1
        
        else:
            # Replace 'where' with 'where tenant_id = X and' for the current tenant
            modified_sql_content = sql_content.replace('where', f'where tenant_id = {tenant_id} and')

        # Append the modified content to the list
        all_modified_queries.append(modified_sql_content)

    # Join all the modified queries into a single string
    all_queries_string = '\n'.join(all_modified_queries)

    # Write all the modified queries to a single output file
    with open(output_file, 'w') as f_out:
        f_out.write(all_queries_string)

if __name__ == "__main__":
    input_file_path = 'A3-Throuput-test-query-set.sql'
    num_tenants = 60
    output_file_path = 'output_queries.sql'

    process_queries(input_file_path, num_tenants, output_file_path)
