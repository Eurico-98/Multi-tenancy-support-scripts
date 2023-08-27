
-- Create the table GROUPS
CREATE TABLE GROUPS (
    g_group_id INTEGER PRIMARY KEY,
    g_Name VARCHAR(255)
);

-- Create a many-to-many relationship between TENANTS and GROUPS
CREATE TABLE tenant_groups (
    t_tenant_id INTEGER REFERENCES TENANTS (t_tenant_id),
    g_group_id INTEGER REFERENCES GROUPS (g_group_id),
    PRIMARY KEY (t_tenant_id, g_group_id)
);

-- Populate the GROUPS table
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1000, 'group_1000');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1001, 'group_1001');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1002, 'group_1002');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1003, 'group_1003');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1004, 'group_1004');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1005, 'group_1005');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1006, 'group_1006');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1007, 'group_1007');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1008, 'group_1008');
INSERT INTO GROUPS (g_group_id, g_Name) VALUES (1009, 'group_1009');

-- Insert entries in table tenant_groups to link tenants in groups
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (18, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (14, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (18, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (22, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (7, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (21, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (7, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (17, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (9, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (12, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (21, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (1, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (13, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (2, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (21, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (6, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (25, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (17, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (18, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (14, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (2, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (14, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (10, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (2, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (2, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (7, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (25, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (6, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (19, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (21, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (25, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (12, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (15, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (18, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (13, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (22, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (1, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (15, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1009);

    
    
-- Updating commands for group_1000
-- Tenant_8
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 391522);
UPDATE orders SET tenant_id   = 1000 WHERE tenant_id = 8 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1000 LIMIT 309105);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000 LIMIT 164856);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 8 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1000 LIMIT 30910);
UPDATE part SET tenant_id     = 1000 WHERE tenant_id = 8 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1000 LIMIT 41214);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 8 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1000 LIMIT 2060);
-- Tenant_18
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 18 LIMIT 391522);
UPDATE orders SET tenant_id   = 1000 WHERE tenant_id = 18 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1000 LIMIT 309105);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 18 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000 LIMIT 164856);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 18 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1000 LIMIT 30910);
UPDATE part SET tenant_id     = 1000 WHERE tenant_id = 18 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1000 LIMIT 41214);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 18 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1000 LIMIT 2060);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 391522);
UPDATE orders SET tenant_id   = 1000 WHERE tenant_id = 5 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1000 LIMIT 309105);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000 LIMIT 164856);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 5 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1000 LIMIT 30910);
UPDATE part SET tenant_id     = 1000 WHERE tenant_id = 5 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1000 LIMIT 41214);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 5 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1000 LIMIT 2060);
    
    
-- Updating commands for group_1001
-- Tenant_14
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 14 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 14 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 14 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 14 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 14 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 14 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
-- Tenant_18
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 18 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 18 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 18 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 18 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 18 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 18 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 20 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 20 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 20 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 20 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
-- Tenant_22
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 22 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 22 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 22 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 22 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 22 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 22 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
-- Tenant_7
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 7 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 7 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 7 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 7 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 7 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 7 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
-- Tenant_21
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 21 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 21 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 21 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 21 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 21 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 21 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 23 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 23 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 23 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 23 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 238319);
UPDATE orders SET tenant_id   = 1001 WHERE tenant_id = 24 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1001 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001 LIMIT 61821);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 24 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1001 LIMIT 11591);
UPDATE part SET tenant_id     = 1001 WHERE tenant_id = 24 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 15455);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 24 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1001 LIMIT 772);
    
    
-- Updating commands for group_1002
-- Tenant_7
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 7 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 7 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 7 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 7 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 7 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 7 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 5 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 5 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 5 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 5 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_17
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 17 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 17 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 17 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 17 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 17 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 17 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_9
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 9 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 9 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 9 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 9 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 9 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 9 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_12
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 12 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 12 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 12 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 12 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 12 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 12 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_21
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 21 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 21 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 21 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 21 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 21 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 21 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_1
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 1 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 1 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 1 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 1 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 1 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 1 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_13
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 13 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 13 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 13 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 13 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 13 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 13 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 23 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 23 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 23 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 23 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
-- Tenant_8
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 137263);
UPDATE orders SET tenant_id   = 1002 WHERE tenant_id = 8 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1002 LIMIT 92731);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002 LIMIT 49456);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 8 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1002 LIMIT 9273);
UPDATE part SET tenant_id     = 1002 WHERE tenant_id = 8 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 12364);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 8 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1002 LIMIT 618);
    
    
-- Updating commands for group_1003
-- Tenant_2
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 2 LIMIT 1826579);
UPDATE orders SET tenant_id   = 1003 WHERE tenant_id = 2 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1003 LIMIT 463657);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 2 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003 LIMIT 247284);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 2 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1003 LIMIT 46365);
UPDATE part SET tenant_id     = 1003 WHERE tenant_id = 2 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1003 LIMIT 61821);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 2 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1003 LIMIT 3091);
-- Tenant_11
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 1826579);
UPDATE orders SET tenant_id   = 1003 WHERE tenant_id = 11 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1003 LIMIT 463657);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003 LIMIT 247284);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 11 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1003 LIMIT 46365);
UPDATE part SET tenant_id     = 1003 WHERE tenant_id = 11 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1003 LIMIT 61821);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 11 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1003 LIMIT 3091);
    
    
-- Updating commands for group_1004
-- Tenant_5
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 77064);
UPDATE orders SET tenant_id   = 1004 WHERE tenant_id = 5 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1004 LIMIT 185463);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004 LIMIT 98913);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 5 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1004 LIMIT 18546);
UPDATE part SET tenant_id     = 1004 WHERE tenant_id = 5 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 24728);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 5 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 1236);
-- Tenant_21
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 21 LIMIT 77064);
UPDATE orders SET tenant_id   = 1004 WHERE tenant_id = 21 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1004 LIMIT 185463);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 21 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004 LIMIT 98913);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 21 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1004 LIMIT 18546);
UPDATE part SET tenant_id     = 1004 WHERE tenant_id = 21 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 24728);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 21 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 1236);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 77064);
UPDATE orders SET tenant_id   = 1004 WHERE tenant_id = 24 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1004 LIMIT 185463);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004 LIMIT 98913);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 24 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1004 LIMIT 18546);
UPDATE part SET tenant_id     = 1004 WHERE tenant_id = 24 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 24728);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 24 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 1236);
-- Tenant_6
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 6 LIMIT 77064);
UPDATE orders SET tenant_id   = 1004 WHERE tenant_id = 6 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1004 LIMIT 185463);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 6 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004 LIMIT 98913);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 6 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1004 LIMIT 18546);
UPDATE part SET tenant_id     = 1004 WHERE tenant_id = 6 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 24728);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 6 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 1236);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 77064);
UPDATE orders SET tenant_id   = 1004 WHERE tenant_id = 4 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1004 LIMIT 185463);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004 LIMIT 98913);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 4 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1004 LIMIT 18546);
UPDATE part SET tenant_id     = 1004 WHERE tenant_id = 4 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 24728);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 4 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1004 LIMIT 1236);
    
    
-- Updating commands for group_1005
-- Tenant_24
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 24 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 24 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 24 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 24 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 23 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 23 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 23 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 23 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
-- Tenant_25
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 25 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 25 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 25 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 25 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 25 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 25 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
-- Tenant_17
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 17 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 17 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 17 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 17 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 17 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 17 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 5 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 5 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 5 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 5 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
-- Tenant_18
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 18 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 18 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 18 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 18 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 18 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 18 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
-- Tenant_14
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 14 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 14 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 14 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 14 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 14 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 14 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
-- Tenant_2
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 2 LIMIT 198585);
UPDATE orders SET tenant_id   = 1005 WHERE tenant_id = 2 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1005 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 2 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005 LIMIT 61821);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 2 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1005 LIMIT 11591);
UPDATE part SET tenant_id     = 1005 WHERE tenant_id = 2 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 15455);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 2 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1005 LIMIT 772);
    
    
-- Updating commands for group_1006
-- Tenant_14
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 14 LIMIT 501901);
UPDATE orders SET tenant_id   = 1006 WHERE tenant_id = 14 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1006 LIMIT 132473);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 14 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006 LIMIT 70652);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 14 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1006 LIMIT 13247);
UPDATE part SET tenant_id     = 1006 WHERE tenant_id = 14 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 17663);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 14 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 883);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 501901);
UPDATE orders SET tenant_id   = 1006 WHERE tenant_id = 24 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1006 LIMIT 132473);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006 LIMIT 70652);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 24 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1006 LIMIT 13247);
UPDATE part SET tenant_id     = 1006 WHERE tenant_id = 24 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 17663);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 24 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 883);
-- Tenant_10
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 10 LIMIT 501901);
UPDATE orders SET tenant_id   = 1006 WHERE tenant_id = 10 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1006 LIMIT 132473);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 10 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006 LIMIT 70652);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 10 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1006 LIMIT 13247);
UPDATE part SET tenant_id     = 1006 WHERE tenant_id = 10 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 17663);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 10 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 883);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 501901);
UPDATE orders SET tenant_id   = 1006 WHERE tenant_id = 20 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1006 LIMIT 132473);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006 LIMIT 70652);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 20 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1006 LIMIT 13247);
UPDATE part SET tenant_id     = 1006 WHERE tenant_id = 20 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 17663);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 20 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 883);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 501901);
UPDATE orders SET tenant_id   = 1006 WHERE tenant_id = 4 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1006 LIMIT 132473);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006 LIMIT 70652);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 4 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1006 LIMIT 13247);
UPDATE part SET tenant_id     = 1006 WHERE tenant_id = 4 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 17663);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 4 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 883);
-- Tenant_2
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 2 LIMIT 501901);
UPDATE orders SET tenant_id   = 1006 WHERE tenant_id = 2 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1006 LIMIT 132473);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 2 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006 LIMIT 70652);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 2 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1006 LIMIT 13247);
UPDATE part SET tenant_id     = 1006 WHERE tenant_id = 2 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 17663);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 2 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 883);
-- Tenant_3
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 501901);
UPDATE orders SET tenant_id   = 1006 WHERE tenant_id = 3 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1006 LIMIT 132473);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006 LIMIT 70652);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 3 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1006 LIMIT 13247);
UPDATE part SET tenant_id     = 1006 WHERE tenant_id = 3 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 17663);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 3 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1006 LIMIT 883);
    
    
-- Updating commands for group_1007
-- Tenant_2
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 2 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 2 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 2 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 2 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 2 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 2 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
-- Tenant_7
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 7 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 7 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 7 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 7 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 7 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 7 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 4 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 4 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 4 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 4 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
-- Tenant_11
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 11 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 11 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 11 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 11 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 23 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 23 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 23 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 23 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
-- Tenant_8
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 8 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 8 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 8 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 8 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
-- Tenant_25
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 25 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 25 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 25 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 25 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 25 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 25 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
-- Tenant_6
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 6 LIMIT 347157);
UPDATE orders SET tenant_id   = 1007 WHERE tenant_id = 6 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1007 LIMIT 115914);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 6 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007 LIMIT 61821);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 6 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1007 LIMIT 11591);
UPDATE part SET tenant_id     = 1007 WHERE tenant_id = 6 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 15455);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 6 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1007 LIMIT 772);
    
    
-- Updating commands for group_1008
-- Tenant_3
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 3 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 3 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 3 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 3 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_19
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 19 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 19 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 19 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 19 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 19 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 19 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_21
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 21 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 21 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 21 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 21 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 21 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 21 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_25
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 25 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 25 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 25 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 25 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 25 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 25 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_12
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 12 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 12 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 12 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 12 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 12 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 12 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_11
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 11 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 11 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 11 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 11 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_15
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 15 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 15 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 15 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 15 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 15 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 15 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_18
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 18 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 18 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 18 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 18 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 18 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 18 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
-- Tenant_13
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 13 LIMIT 397130);
UPDATE orders SET tenant_id   = 1008 WHERE tenant_id = 13 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1008 LIMIT 103035);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 13 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008 LIMIT 54952);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 13 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1008 LIMIT 10303);
UPDATE part SET tenant_id     = 1008 WHERE tenant_id = 13 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 13738);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 13 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1008 LIMIT 686);
    
    
-- Updating commands for group_1009
-- Tenant_22
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 22 LIMIT 688410);
UPDATE orders SET tenant_id   = 1009 WHERE tenant_id = 22 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1009 LIMIT 231828);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 22 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009 LIMIT 123642);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 22 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1009 LIMIT 23182);
UPDATE part SET tenant_id     = 1009 WHERE tenant_id = 22 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 30910);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 22 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 1545);
-- Tenant_1
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 1 LIMIT 688410);
UPDATE orders SET tenant_id   = 1009 WHERE tenant_id = 1 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1009 LIMIT 231828);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 1 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009 LIMIT 123642);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 1 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1009 LIMIT 23182);
UPDATE part SET tenant_id     = 1009 WHERE tenant_id = 1 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 30910);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 1 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 1545);
-- Tenant_15
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 15 LIMIT 688410);
UPDATE orders SET tenant_id   = 1009 WHERE tenant_id = 15 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1009 LIMIT 231828);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 15 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009 LIMIT 123642);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 15 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1009 LIMIT 23182);
UPDATE part SET tenant_id     = 1009 WHERE tenant_id = 15 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 30910);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 15 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 1545);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 688410);
UPDATE orders SET tenant_id   = 1009 WHERE tenant_id = 24 AND o_orderkey               IN (SELECT l_orderkey FROM lineitem           WHERE tenant_id = 1009 LIMIT 231828);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009 LIMIT 123642);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 24 AND c_custkey                IN (SELECT o_custkey FROM orders              WHERE tenant_id = 1009 LIMIT 23182);
UPDATE part SET tenant_id     = 1009 WHERE tenant_id = 24 AND p_partkey                IN (SELECT ps_partkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 30910);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 24 AND s_suppkey                IN (SELECT ps_suppkey FROM partsupp           WHERE tenant_id = 1009 LIMIT 1545);