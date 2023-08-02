# Define the maximum orderkey values for each tenant
max_orderkeys = {
    1: 36000000,
    2: 6000000,
    3: 30000000,
    4: 42000000,
    5: 24000000,
    6: 24000000,
    7: 6000000,
    8: 24000000,
    9: 6000000,
    10: 6000000,
    11: 3137988,
    12: 6000000,
    13: 4073988,
    14: 3701988,
    15: 3924000,
    16: 3420000,
    17: 3197988,
    18: 3089988,
    19: 3048000,
    20: 3048000,
    21: 3000000,
    22: 6000000,
    23: 6000000,
    24: 6000000,
    25: 6000000,
    26: 6000000,
    27: 6000000,
    28: 6000000,
    29: 6000000,
    30: 6000000,
    31: 6000000,
    32: 6000000,
    33: 6000000,
    34: 6000000,
    35: 12000000,
    36: 12000000,
    37: 12000000,
    38: 12000000,
    39: 12000000,
    40: 72000000,
    41: 6000000,
    42: 6000000,
    43: 6000000,
    44: 6000000,
    45: 6000000,
    46: 6000000,
    47: 6000000,
    48: 6000000,
    49: 6000000,
    50: 6000000,
}

# SQL template for the INSERT and DELETE commands
insert_template = "INSERT INTO orders (o_orderkey, o_custkey, o_orderstatus, o_totalprice, o_orderdate, o_orderpriority, o_clerk, o_shippriority, o_comment, id) VALUES ({orderkey}, 4576, F, 102385.58, 1996-10-15, 5-LOW, Clerk#000000153, 0, ly! requests solve qui, {id});"
delete_template = "DELETE FROM orders WHERE o_orderkey = {orderkey};"

# Generate and print the SQL commands for each tenant
for tenant, max_orderkey in max_orderkeys.items():
    orderkey = max_orderkey + 50000
    print(insert_template.format(orderkey=orderkey, id=tenant))
    print(delete_template.format(orderkey=orderkey))
