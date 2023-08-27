import os
from itertools import islice
import random

# Get tenant directories
tenants = [f'tenant_{i}' for i in range(1, 26)]



################################### GET TOTAL LINES IN EACH ONE OF THE LINEITEM TABLES ###################################

# Dictionary to hold the total number of lines for each tenant's table
line_counts_lineitem = {tenant: 0 for tenant in tenants}

# Traverse each tenant's table folder
for tenant in tenants:
    
    with open(f'./{tenant}/lineitem.tbl', 'r') as file:
        lines = file.readlines()
        line_count = len(lines)

    # Update the total line count for the current tenant
    line_counts_lineitem[tenant] = line_count
    print(f'{tenant} - Lineitem Row Count: {line_count}')

"""line_counts_lineitem = {
        'tenant_1': 6001215,
        'tenant_2': 6001215,
        'tenant_3': 6001215,
        'tenant_4': 6001215,
        'tenant_5': 3137473,
        'tenant_6': 6001215,
        'tenant_7': 4074440,
        'tenant_8': 3702988,
        'tenant_9': 3924614,
        'tenant_10': 3420176,
        'tenant_11': 3197835,
        'tenant_12': 3089740,
        'tenant_13': 3047615,
        'tenant_14': 3047615,
        'tenant_15': 2999671,
        'tenant_16': 6001215,
        'tenant_17': 6001215,
        'tenant_18': 6001215,
        'tenant_19': 6001215,
        'tenant_20': 6001215,
        'tenant_21': 6001215,
        'tenant_22': 6001215,
        'tenant_23': 6001215,
        'tenant_24': 6001215,
        'tenant_25': 6001215
}
"""
#####################################################################################################





################################### generate sql script to update keys ##############################

primary_keys = {'region': 'r_regionkey', 
                'nation': 'n_nationkey',
                'part': 'p_partkey', 
                'supplier': 's_suppkey',
                'customer': 'c_custkey', 
                'partsupp': ['ps_partkey', 'ps_suppkey'],
                'orders': 'o_orderkey',
                'lineitem': ['l_orderkey', 'l_linenumber']}


# General increment variable - initialize it with biggest total line count from the tenant with the most data
# the 100000 value added is to account for the jumps in key value ganaration that dbgen does - it is not a linear generatio
# of values therefore it is required to increment the increment_ver in some extra amount to avoid equal keys
increment_var = line_counts_lineitem['tenant_1'] + 100000

print(f'increment_var starts at: {increment_var}')

# Open output file
with open('adapt_DB_for_approach_2.sql', 'w') as output_file:
    
    # add tenant_id column to first tenant
    sql_add_tenant_col = """
-- add tenant_id column to first tenant
ALTER TABLE tenant_1.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_1.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_1.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_1.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_1.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_1.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_1.part SET tenant_id = 1;
UPDATE tenant_1.supplier SET tenant_id = 1;
UPDATE tenant_1.customer SET tenant_id = 1;
UPDATE tenant_1.partsupp SET tenant_id = 1;
UPDATE tenant_1.orders SET tenant_id = 1;
UPDATE tenant_1.lineitem SET tenant_id = 1;

-- --------------------------------------------- tenant_1 Disable constrains
ALTER TABLE tenant_1.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_1.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_1.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_1.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_1.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_1.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_1.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_1.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_1.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_1.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_1.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_1.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_1.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_1.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_1.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_1.lineitem DROP CONSTRAINT lineitem_pkey;
"""
    output_file.write(sql_add_tenant_col)


    for tenant in islice(line_counts_lineitem.keys(), 1, None):
        
        disable_constrains = """
        
        
-- --------------------------------------------- {0} Disable constrains
ALTER TABLE {0}.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE {0}.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE {0}.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE {0}.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE {0}.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE {0}.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE {0}.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE {0}.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE {0}.region DROP CONSTRAINT region_pkey;
ALTER TABLE {0}.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE {0}.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE {0}.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE {0}.part DROP CONSTRAINT part_pkey;
ALTER TABLE {0}.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE {0}.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE {0}.lineitem DROP CONSTRAINT lineitem_pkey;
        """
        
        disable_constrains = disable_constrains.format(tenant)
        output_file.write(disable_constrains)            
        
        
        # order of update:
        # 1 increment primary keys from tables without foreing keys: region and part
        # 2 star updating tables with foreing keys going from the outter tables in the snowflake schema to the inner tables:
        # 3 first update foreing keys than primary keys
        # order is as follows:
        sql_script = """
-- Update keys
UPDATE {0}.region SET r_regionkey = r_regionkey + {1};

UPDATE {0}.part SET p_partkey = p_partkey + {1};

UPDATE {0}.nation SET n_regionkey = n_regionkey + {1}, n_nationkey = n_nationkey + {1};

UPDATE {0}.supplier SET s_nationkey = s_nationkey + {1}, s_suppkey = s_suppkey + {1};

UPDATE {0}.customer SET c_nationkey = c_nationkey + {1}, c_custkey = c_custkey + {1};

UPDATE {0}.partsupp SET ps_suppkey = ps_suppkey + {1}, ps_partkey = ps_partkey + {1};

UPDATE {0}.orders SET o_custkey = o_custkey + {1}, o_orderkey = o_orderkey + {1};

UPDATE {0}.lineitem SET l_orderkey = l_orderkey + {1}, l_partkey = l_partkey + {1}, l_suppkey = l_suppkey + {1};
"""
        sql_script = sql_script.format(tenant, increment_var)
        output_file.write(sql_script)
        
        
        # Add tenant_id column to the tables (excluding PART, NATION, and REGION)
        # Populate the tenant_id column with the corresponding tenant ID
        sql_add_tenant_col = """
-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE {0}.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE {0}.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE {0}.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE {0}.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE {0}.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE {0}.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE {0}.part SET tenant_id = {1};
UPDATE {0}.supplier SET tenant_id = {1};
UPDATE {0}.customer SET tenant_id = {1};
UPDATE {0}.partsupp SET tenant_id = {1};
UPDATE {0}.orders SET tenant_id = {1};
UPDATE {0}.lineitem SET tenant_id = {1};
        """
        sql_add_tenant_col = sql_add_tenant_col.format(tenant, int(tenant.split('_')[1]))  # Extract the tenant number
        output_file.write(sql_add_tenant_col)
        
        # the 100000 value added is to account for the jumps in key value ganaration that dbgen does - it is not a linear generatio
        # of values therefore it is required to increment the increment_ver in some extra amount to avoid equal keys
        increment_var += line_counts_lineitem[tenant] + 100000
    
    # add commands to create the tables in the public schema
    sql_public_schema_commands = """
-- Add commands to create the tables in the public schema
CREATE TABLE NATION(
    N_NATIONKEY INTEGER  NOT NULL,
    N_NAME      CHAR(25) NOT NULL,
    N_REGIONKEY INTEGER  NOT NULL,
    N_COMMENT   VARCHAR(152)
);

CREATE TABLE REGION(
    R_REGIONKEY INTEGER  NOT NULL,
    R_NAME      CHAR(25) NOT NULL,
    R_COMMENT   VARCHAR(152)
);

CREATE TABLE PART(
    P_PARTKEY     INTEGER        NOT NULL,
    P_NAME        VARCHAR(55)    NOT NULL,
    P_MFGR        CHAR(25)       NOT NULL,
    P_BRAND       CHAR(10)       NOT NULL,
    P_TYPE        VARCHAR(25)    NOT NULL,
    P_SIZE        INTEGER        NOT NULL,
    P_CONTAINER   CHAR(10)       NOT NULL,
    P_RETAILPRICE DECIMAL(15, 2) NOT NULL,
    P_COMMENT     VARCHAR(23)    NOT NULL,
    TENANT_ID     INTEGER        NOT NULL
);

CREATE TABLE SUPPLIER(
    S_SUPPKEY   INTEGER        NOT NULL,
    S_NAME      CHAR(25)       NOT NULL,
    S_ADDRESS   VARCHAR(40)    NOT NULL,
    S_NATIONKEY INTEGER        NOT NULL,
    S_PHONE     CHAR(15)       NOT NULL,
    S_ACCTBAL   DECIMAL(15, 2) NOT NULL,
    S_COMMENT   VARCHAR(101)   NOT NULL,
    TENANT_ID   INTEGER        NOT NULL
);

CREATE TABLE PARTSUPP(
    PS_PARTKEY    INTEGER        NOT NULL,
    PS_SUPPKEY    INTEGER        NOT NULL,
    PS_AVAILQTY   INTEGER        NOT NULL,
    PS_SUPPLYCOST DECIMAL(15, 2) NOT NULL,
    PS_COMMENT    VARCHAR(199)   NOT NULL,
    TENANT_ID     INTEGER        NOT NULL
);

CREATE TABLE CUSTOMER(
    C_CUSTKEY    INTEGER        NOT NULL,
    C_NAME       VARCHAR(25)    NOT NULL,
    C_ADDRESS    VARCHAR(40)    NOT NULL,
    C_NATIONKEY  INTEGER        NOT NULL,
    C_PHONE      CHAR(15)       NOT NULL,
    C_ACCTBAL    DECIMAL(15, 2) NOT NULL,
    C_MKTSEGMENT CHAR(10)       NOT NULL,
    C_COMMENT    VARCHAR(117)   NOT NULL,
    TENANT_ID    INTEGER        NOT NULL
);

CREATE TABLE ORDERS(
    O_ORDERKEY      INTEGER        NOT NULL,
    O_CUSTKEY       INTEGER        NOT NULL,
    O_ORDERSTATUS   CHAR(1)        NOT NULL,
    O_TOTALPRICE    DECIMAL(15, 2) NOT NULL,
    O_ORDERDATE     DATE           NOT NULL,
    O_ORDERPRIORITY CHAR(15)       NOT NULL,
    O_CLERK         CHAR(15)       NOT NULL,
    O_SHIPPRIORITY  INTEGER        NOT NULL,
    O_COMMENT       VARCHAR(79)    NOT NULL,
    TENANT_ID       INTEGER        NOT NULL
);

CREATE TABLE LINEITEM(
    L_ORDERKEY      INTEGER        NOT NULL,
    L_PARTKEY       INTEGER        NOT NULL,
    L_SUPPKEY       INTEGER        NOT NULL,
    L_LINENUMBER    INTEGER        NOT NULL,
    L_QUANTITY      DECIMAL(15, 2) NOT NULL,
    L_EXTENDEDPRICE DECIMAL(15, 2) NOT NULL,
    L_DISCOUNT      DECIMAL(15, 2) NOT NULL,
    L_TAX           DECIMAL(15, 2) NOT NULL,
    L_RETURNFLAG    CHAR(1)        NOT NULL,
    L_LINESTATUS    CHAR(1)        NOT NULL,
    L_SHIPDATE      DATE           NOT NULL,
    L_COMMITDATE    DATE           NOT NULL,
    L_RECEIPTDATE   DATE           NOT NULL,
    L_SHIPINSTRUCT  CHAR(25)       NOT NULL,
    L_SHIPMODE      CHAR(10)       NOT NULL,
    L_COMMENT       VARCHAR(44)    NOT NULL,
    TENANT_ID       INTEGER        NOT NULL
);

ALTER TABLE REGION ADD PRIMARY KEY (R_REGIONKEY);
ALTER TABLE NATION ADD PRIMARY KEY (N_NATIONKEY);
ALTER TABLE CUSTOMER ADD PRIMARY KEY (C_CUSTKEY);
ALTER TABLE SUPPLIER ADD PRIMARY KEY (S_SUPPKEY);
ALTER TABLE PART ADD PRIMARY KEY (P_PARTKEY);
ALTER TABLE PARTSUPP ADD PRIMARY KEY (PS_PARTKEY, PS_SUPPKEY);
ALTER TABLE ORDERS ADD PRIMARY KEY (O_ORDERKEY);
ALTER TABLE LINEITEM ADD PRIMARY KEY (L_ORDERKEY, L_LINENUMBER);

ALTER TABLE NATION ADD FOREIGN KEY (N_REGIONKEY) REFERENCES REGION(R_REGIONKEY);
ALTER TABLE SUPPLIER ADD FOREIGN KEY (S_NATIONKEY) REFERENCES NATION(N_NATIONKEY);
ALTER TABLE CUSTOMER ADD FOREIGN KEY (C_NATIONKEY) REFERENCES NATION(N_NATIONKEY);
ALTER TABLE PARTSUPP ADD FOREIGN KEY (PS_SUPPKEY) REFERENCES SUPPLIER(S_SUPPKEY);
ALTER TABLE PARTSUPP ADD FOREIGN KEY (PS_PARTKEY) REFERENCES PART(P_PARTKEY);
ALTER TABLE ORDERS ADD FOREIGN KEY (O_CUSTKEY) REFERENCES CUSTOMER(C_CUSTKEY);
ALTER TABLE LINEITEM ADD FOREIGN KEY (L_ORDERKEY) REFERENCES ORDERS(O_ORDERKEY);
ALTER TABLE LINEITEM ADD FOREIGN KEY (L_PARTKEY,L_SUPPKEY) REFERENCES PARTSUPP(PS_PARTKEY,PS_SUPPKEY);



"""
    output_file.write(sql_public_schema_commands)
    
    print(f'------------ Finnished writing commands to increment keys and add tenant ids') 
    # ---------------------------------------------------- commands to move data to public schema and delete tenant specific schemas 
    
    # Dictionary to hold the total number of lines for each tenant's table for the commands to 
    # migrate the data from the separate schemas to the public schema
    # reagion and nation dont need this because the number of lines is always 5 and 24 respectively
    line_counts_part = {tenant: 0 for tenant in tenants}
    line_counts_supplier = {tenant: 0 for tenant in tenants}
    line_counts_customer = {tenant: 0 for tenant in tenants}
    line_counts_partsupp = {tenant: 0 for tenant in tenants}
    line_counts_orders = {tenant: 0 for tenant in tenants}
 

    # Traverse each tenant's table folder to get line count of each table of each tenant
    print(f'------------ Starting other tables row count')
    for tenant in tenants:
            
         
        with open(f'./{tenant}/customer.tbl', 'r') as file:
            lines = file.readlines()
            line_counts_customer[tenant] = len(lines)
            print(f'{tenant} - customer Row Count: {len(lines)}')
        
        
        with open(f'./{tenant}/part.tbl', 'r') as file:
            lines = file.readlines()
            line_counts_part[tenant] = len(lines)
            print(f'{tenant} - part Row Count: {len(lines)}')
            
        
        with open(f'./{tenant}/partsupp.tbl', 'r') as file:
            lines = file.readlines()
            line_counts_partsupp[tenant] = len(lines)
            print(f'{tenant} - partsupp Row Count: {len(lines)}')
            

        with open(f'./{tenant}/supplier.tbl', 'r') as file:
            lines = file.readlines()
            line_counts_supplier[tenant] = len(lines)
            print(f'{tenant} - supplier Row Count: {len(lines)}')
            
        
        with open(f'./{tenant}/orders.tbl', 'r') as file:
            lines = file.readlines()
            line_counts_orders[tenant] = len(lines)
            print(f'{tenant} - orders Row Count: {len(lines)}')
            
    """line_counts_part = {
        'tenant_1': 200000,
        'tenant_2': 200000,
        'tenant_3': 200000,
        'tenant_4': 200000,
        'tenant_5': 104600,
        'tenant_6': 200000,
        'tenant_7': 135800,
        'tenant_8': 123400,
        'tenant_9': 130800,
        'tenant_10': 114000,
        'tenant_11': 106600,
        'tenant_12': 103000,
        'tenant_13': 101600,
        'tenant_14': 101600,
        'tenant_15': 100000,
        'tenant_16': 200000,
        'tenant_17': 200000,
        'tenant_18': 200000,
        'tenant_19': 200000,
        'tenant_20': 200000,
        'tenant_21': 200000,
        'tenant_22': 200000,
        'tenant_23': 200000,
        'tenant_24': 200000,
        'tenant_25': 200000
    }


    line_counts_customer = {
        'tenant_1': 150000,
        'tenant_2': 150000,
        'tenant_3': 150000,
        'tenant_4': 150000,
        'tenant_5': 78450,
        'tenant_6': 150000,
        'tenant_7': 101850,
        'tenant_8': 92550,
        'tenant_9': 98100,
        'tenant_10': 85500,
        'tenant_11': 79950,
        'tenant_12': 77250,
        'tenant_13': 76200,
        'tenant_14': 76200,
        'tenant_15': 75000,
        'tenant_16': 150000,
        'tenant_17': 150000,
        'tenant_18': 150000,
        'tenant_19': 150000,
        'tenant_20': 150000,
        'tenant_21': 150000,
        'tenant_22': 150000,
        'tenant_23': 150000,
        'tenant_24': 150000,
        'tenant_25': 150000
    }


    line_counts_partsupp = {
        'tenant_1': 800000,
        'tenant_2': 800000,
        'tenant_3': 800000,
        'tenant_4': 800000,
        'tenant_5': 418400,
        'tenant_6': 800000,
        'tenant_7': 543200,
        'tenant_8': 493600,
        'tenant_9': 523200,
        'tenant_10': 456000,
        'tenant_11': 426400,
        'tenant_12': 412000,
        'tenant_13': 406400,
        'tenant_14': 406400,
        'tenant_15': 400000,
        'tenant_16': 800000,
        'tenant_17': 800000,
        'tenant_18': 800000,
        'tenant_19': 800000,
        'tenant_20': 800000,
        'tenant_21': 800000,
        'tenant_22': 800000,
        'tenant_23': 800000,
        'tenant_24': 800000,
        'tenant_25': 800000
    }


    line_counts_supplier = {
        'tenant_1': 10000,
        'tenant_2': 10000,
        'tenant_3': 10000,
        'tenant_4': 10000,
        'tenant_5': 5230,
        'tenant_6': 10000,
        'tenant_7': 6790,
        'tenant_8': 6170,
        'tenant_9': 6540,
        'tenant_10': 5700,
        'tenant_11': 5330,
        'tenant_12': 5150,
        'tenant_13': 5080,
        'tenant_14': 5080,
        'tenant_15': 5000,
        'tenant_16': 10000,
        'tenant_17': 10000,
        'tenant_18': 10000,
        'tenant_19': 10000,
        'tenant_20': 10000,
        'tenant_21': 10000,
        'tenant_22': 10000,
        'tenant_23': 10000,
        'tenant_24': 10000,
        'tenant_25': 10000
    }


    line_counts_orders = {
        'tenant_1': 1500000,
        'tenant_2': 1500000,
        'tenant_3': 1500000,
        'tenant_4': 1500000,
        'tenant_5': 784500,
        'tenant_6': 1500000,
        'tenant_7': 1018500,
        'tenant_8': 925500,
        'tenant_9': 981000,
        'tenant_10': 855000,
        'tenant_11': 799500,
        'tenant_12': 772500,
        'tenant_13': 762000,
        'tenant_14': 762000,
        'tenant_15': 750000,
        'tenant_16': 1500000,
        'tenant_17': 1500000,
        'tenant_18': 1500000,
        'tenant_19': 1500000,
        'tenant_20': 1500000,
        'tenant_21': 1500000,
        'tenant_22': 1500000,
        'tenant_23': 1500000,
        'tenant_24': 1500000,
        'tenant_25': 1500000
    }
    """    

    # Copy and Delete Rows from Tables
    def copy_and_delete_rows(tenant, table, num_rows):
        
        sql_commands = """INSERT INTO {1} SELECT * FROM {0}.{1} LIMIT {2};
"""
        #DELETE FROM {0}.{1} WHERE ctid IN (SELECT ctid FROM {0}.{1} LIMIT {2});
        sql_commands = sql_commands.format(tenant, table, num_rows)
        output_file.write(sql_commands)


    # Create commands for table Region
    tables_region_and_nation_ten = [f'tenant_{i}' for i in range(1, 26)]
    for tenant in tables_region_and_nation_ten:
        copy_and_delete_rows(tenant, 'region', 6)
    output_file.write("""                
-- ---------------------------------------------------------------- finnished copying table region to public schema                      




""")

    # Create commands for table part
    for tenant in line_counts_part.keys():
        copy_and_delete_rows(tenant, 'part', line_counts_part[tenant]) 
    output_file.write("""           
-- ---------------------------------------------------------------- finnished copying table part to public schema                      




""")

    # Create commands for table nation
    for tenant in tables_region_and_nation_ten:
        copy_and_delete_rows(tenant, 'nation', 25)
    output_file.write("""              
-- ---------------------------------------------------------------- finnished copying table nation to public schema                      




""")

    # Create commands for table supplier
    for tenant in line_counts_supplier.keys():
        copy_and_delete_rows(tenant, 'supplier', line_counts_supplier[tenant])
    output_file.write("""   
-- ---------------------------------------------------------------- finnished copying table supplier to public schema                      




""")

    # Create commands for table customer
    for tenant in line_counts_customer.keys():
        copy_and_delete_rows(tenant, 'customer', line_counts_customer[tenant])
    output_file.write("""                    
-- ---------------------------------------------------------------- finnished copying table customer to public schema                      




""")

    # Create commands for table partsupp
    for tenant in line_counts_partsupp.keys():
        copy_and_delete_rows(tenant, 'partsupp', line_counts_partsupp[tenant])
    output_file.write("""                     
-- ---------------------------------------------------------------- finnished copying table partsupp to public schema                      




""")

    # Create commands for table orders
    for tenant in line_counts_orders.keys():
        copy_and_delete_rows(tenant, 'orders', line_counts_orders[tenant])
    output_file.write("""                   
-- ---------------------------------------------------------------- finnished copying table orders to public schema                      




""")

    # Create commands for table lineitem
    for tenant in line_counts_lineitem.keys():
        copy_and_delete_rows(tenant, 'lineitem', line_counts_lineitem[tenant])
    output_file.write("""                   
-- ---------------------------------------------------------------- finnished copying table lineitem to public schema                      




""")

    # Drop Tenant Schemas
    for tenant in tenants:
        drop_schema_sql = """DROP SCHEMA {0} CASCADE;
"""
        drop_schema_sql = drop_schema_sql.format(tenant)
        output_file.write(drop_schema_sql)
       
        # add tenant table 
    tenant_table = """-- Create the Tenants table
CREATE TABLE Tenants (
    t_tenant_id INTEGER PRIMARY KEY,
    t_Name VARCHAR(50) NOT NULL
);
INSERT INTO Tenants (t_tenant_id, t_Name) VALUES 

"""
    output_file.write(tenant_table)
    id = 1
    for tenant in [f'tenant_{i}' for i in range(1, 26)]:
        tenants = """({0}, '{1}'){2}
"""
        if tenant == 'tenant_25':
            tenants = tenants.format(id, tenant,";")
        else:
            tenants = tenants.format(id, tenant,",")
        id += 1
        
        output_file.write(tenants)

print("SQL script completed'.")
