import os
import random

# Write commands to create the table GROUPS
sql_script = """
-- Create the table GROUPS
CREATE TABLE GROUPS (
    g_group_id INTEGER PRIMARY KEY,
    g_Name VARCHAR(255)
);
"""

# Write commands to create a many-to-many relationship between TENANTS and GROUPS
sql_script += """
-- Create a many-to-many relationship between TENANTS and GROUPS
CREATE TABLE tenant_groups (
    t_tenant_id INTEGER REFERENCES TENANTS (t_tenant_id),
    g_group_id INTEGER REFERENCES GROUPS (g_group_id),
    PRIMARY KEY (t_tenant_id, g_group_id)
);
"""

# Create tenant_groups dictionary for Step 4
tenant_groups = {}

tenants = [f'{i}' for i in range(1, 26)]

# Create 10 groups with random tenants
for group_id in range(1000, 1010):
    num_tenants = random.randint(2, 10)
    tenants_in_group = random.sample(tenants, num_tenants)
    tenant_groups[group_id] = tenants_in_group

# Write commands to populate the GROUPS table
sql_script += """
-- Populate the GROUPS table
"""
for group_id, tenant_ids in tenant_groups.items():
    group_name = f"group_{group_id}"
    sql_script += f"INSERT INTO GROUPS (g_group_id, g_Name) VALUES ({group_id}, '{group_name}');\n"


# Insert entries in table tenant_groups to link tenants in groups
sql_script += """
-- Insert entries in table tenant_groups to link tenants in groups
"""
for group_id, tenant_ids in tenant_groups.items():
    for tenant_id in tenant_ids:
        sql_script += f"INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES ({int(tenant_id)}, {group_id});\n"


# row counts from previous script - avoid redoing same calculation
#line_counts_part     = 4121400
#line_counts_customer = 3091050
#line_counts_partsupp = 16485600
#line_counts_supplier = 206070
#line_counts_orders   = 30910500
#line_counts_lineitem = 123660392

# for each group for each table select a LIMIT of lines to update that is 1% of the total lines in that table
lines_to_update_in_part     = 4121400  * 0.03
lines_to_update_in_customer = 3091050  * 0.03
lines_to_update_in_partsupp = 16485600 * 0.03
lines_to_update_in_supplier = 206070   * 0.03
lines_to_update_in_orders   = 30910500 * 0.03

# for each group
for group in tenant_groups.keys(): 
    
    # select a random number of lines to update in the lineitem table between 1 and 3% of the total lines
    lines_to_update_in_lineitem = random.randint(1, int(0.03 * 123660392))
    
    total_tenants = len(tenant_groups[group])
    
    # divide the total rows to update by the tenants in the current group
    divided_lines_lineitem = int(lines_to_update_in_lineitem / total_tenants)
    divided_lines_part     = int(lines_to_update_in_part     / total_tenants)
    divided_lines_customer = int(lines_to_update_in_customer / total_tenants)
    divided_lines_partsupp = int(lines_to_update_in_partsupp / total_tenants)
    divided_lines_supplier = int(lines_to_update_in_supplier / total_tenants)
    divided_lines_orders   = int(lines_to_update_in_orders   / total_tenants)
    
    sql_script += f"""
    
    
-- Updating commands for group_{group}"""
    
    # Update tenant_id in other tables based on Lineitem relationships
    for tenant_id in tenant_groups[group]:
        
        # Update tenant_id in the Lineitem table
        sql_script += f"""
-- Tenant_{tenant_id}
UPDATE lineitem SET tenant_id = {group} WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = {int(tenant_id)} LIMIT {divided_lines_lineitem});
UPDATE orders SET tenant_id   = {group} WHERE tenant_id = {int(tenant_id)} AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = {group} LIMIT {divided_lines_orders});
UPDATE partsupp SET tenant_id = {group} WHERE tenant_id = {int(tenant_id)} AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = {group} LIMIT {divided_lines_partsupp});
UPDATE customer SET tenant_id = {group} WHERE tenant_id = {int(tenant_id)} AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = {group} LIMIT {divided_lines_customer});
UPDATE part SET tenant_id     = {group} WHERE tenant_id = {int(tenant_id)} AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = {group} LIMIT {divided_lines_part});
UPDATE supplier SET tenant_id = {group} WHERE tenant_id = {int(tenant_id)} AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = {group} LIMIT {divided_lines_supplier});"""
        
        
# Save the SQL script to a file
with open("adapt_DB_for_approach_3.sql", "w") as file:
    file.write(sql_script)
