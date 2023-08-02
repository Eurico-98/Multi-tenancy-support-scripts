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

tenants = [f'{i}' for i in range(1, 51)]

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


lines_to_update_for_each_group = {}

# get number of lines to update in each table
# row counts from previous script - avoid redoing same calculation
# "lineitem" table row count 513636306
for group in tenant_groups.keys(): 
    num_lines_to_update = random.randint(1, int(0.03 * 513636306))
    lines_to_update_for_each_group[group] = num_lines_to_update


# Write commands to update tenant_id column
for group_id, lines_to_update in lines_to_update_for_each_group.items():
    
    # divide the total rows to update by the tenants in the current group
    divided_lines = int(lines_to_update / len(tenant_groups[group_id]))
    
    sql_script += f"""
    
    
-- Updating commands for group_{group_id}"""
    
    # Update tenant_id in other tables based on Lineitem relationships
    for tenant_id in tenant_groups[group_id]:
        
        # Update tenant_id in the Lineitem table
        sql_script += f"""
-- Tenant_{tenant_id}
UPDATE lineitem SET tenant_id = {group_id} WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = {int(tenant_id)} LIMIT {divided_lines});
UPDATE orders SET tenant_id = {group_id} WHERE tenant_id = {int(tenant_id)} AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = {group_id});
UPDATE partsupp SET tenant_id = {group_id} WHERE tenant_id = {int(tenant_id)} AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = {group_id});
UPDATE customer SET tenant_id = {group_id} WHERE tenant_id = {int(tenant_id)} AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = {group_id});
UPDATE part SET tenant_id = {group_id} WHERE tenant_id = {int(tenant_id)} AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = {group_id});
UPDATE supplier SET tenant_id = {group_id} WHERE tenant_id = {int(tenant_id)} AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = {group_id});"""
        
        
# Save the SQL script to a file
with open("adapt_DB_for_approach_3.sql", "w") as file:
    file.write(sql_script)
