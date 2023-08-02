
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
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (39, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (25, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (34, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (48, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (41, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (48, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (32, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (33, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (27, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (43, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (14, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (41, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (17, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (2, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (1, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (50, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (9, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (6, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (13, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (21, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (47, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (19, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (31, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (34, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (13, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (45, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (17, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (36, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (42, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (40, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (7, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (32, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (30, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (1, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (19, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (50, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (1, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (35, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (31, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (41, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (28, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (35, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (47, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (34, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (10, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1009);

    
    
-- Updating commands for group_1000
-- Tenant_39
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 39 LIMIT 270459);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 39 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 39 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 39 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 39 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 39 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 270459);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 5 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 5 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 5 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 5 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
    
    
-- Updating commands for group_1001
-- Tenant_25
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 25 LIMIT 1951964);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 25 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 25 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 25 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 25 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 25 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
-- Tenant_34
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 34 LIMIT 1951964);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 34 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 34 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 34 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 34 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 34 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
-- Tenant_48
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 48 LIMIT 1951964);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 48 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 48 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 48 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 48 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 48 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
-- Tenant_41
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 41 LIMIT 1951964);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 41 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 41 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 41 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 41 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 41 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
    
    
-- Updating commands for group_1002
-- Tenant_48
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 48 LIMIT 822090);
UPDATE orders SET tenant_id = 1002 WHERE tenant_id = 48 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1002);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 48 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 48 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1002);
UPDATE part SET tenant_id = 1002 WHERE tenant_id = 48 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1002);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 48 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1002);
-- Tenant_32
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 32 LIMIT 822090);
UPDATE orders SET tenant_id = 1002 WHERE tenant_id = 32 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1002);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 32 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 32 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1002);
UPDATE part SET tenant_id = 1002 WHERE tenant_id = 32 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1002);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 32 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1002);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 822090);
UPDATE orders SET tenant_id = 1002 WHERE tenant_id = 24 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1002);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 24 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1002);
UPDATE part SET tenant_id = 1002 WHERE tenant_id = 24 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1002);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 24 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1002);
    
    
-- Updating commands for group_1003
-- Tenant_11
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 43505);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 11 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 11 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 11 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 11 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 43505);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 23 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 23 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 23 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 23 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 43505);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 20 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 20 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 20 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 20 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_33
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 33 LIMIT 43505);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 33 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 33 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 33 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 33 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 33 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_27
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 27 LIMIT 43505);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 27 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 27 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 27 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 27 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 27 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_43
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 43 LIMIT 43505);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 43 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 43 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 43 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 43 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 43 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
    
    
-- Updating commands for group_1004
-- Tenant_24
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 24 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 24 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 24 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 24 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_14
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 14 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 14 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 14 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 14 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 14 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 14 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_41
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 41 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 41 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 41 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 41 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 41 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 41 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_17
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 17 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 17 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 17 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 17 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 17 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 17 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_2
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 2 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 2 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 2 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 2 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 2 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 2 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_1
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 1 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 1 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 1 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 1 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 1 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 1 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_50
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 50 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 50 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 50 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 50 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 50 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 50 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 23 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 23 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 23 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 23 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_9
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 9 LIMIT 42044);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 9 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 9 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 9 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 9 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 9 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
    
    
-- Updating commands for group_1005
-- Tenant_24
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 1165223);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 24 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 24 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 24 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 24 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_6
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 6 LIMIT 1165223);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 6 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 6 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 6 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 6 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 6 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_13
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 13 LIMIT 1165223);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 13 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 13 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 13 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 13 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 13 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_21
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 21 LIMIT 1165223);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 21 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 21 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 21 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 21 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 21 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
    
    
-- Updating commands for group_1006
-- Tenant_47
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 47 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 47 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 47 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 47 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 47 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 47 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_19
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 19 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 19 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 19 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 19 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 19 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 19 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_31
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 31 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 31 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 31 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 31 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 31 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 31 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_34
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 34 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 34 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 34 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 34 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 34 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 34 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_13
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 13 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 13 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 13 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 13 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 13 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 13 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_45
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 45 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 45 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 45 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 45 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 45 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 45 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_17
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 17 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 17 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 17 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 17 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 17 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 17 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_36
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 36 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 36 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 36 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 36 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 36 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 36 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_42
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 42 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 42 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 42 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 42 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 42 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 42 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 863381);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 4 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 4 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 4 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 4 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
    
    
-- Updating commands for group_1007
-- Tenant_40
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 40 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 40 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 40 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 40 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 40 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 40 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_7
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 7 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 7 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 7 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 7 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 7 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 7 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_32
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 32 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 32 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 32 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 32 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 32 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 32 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_30
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 30 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 30 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 30 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 30 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 30 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 30 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_1
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 1 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 1 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 1 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 1 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 1 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 1 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_19
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 19 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 19 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 19 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 19 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 19 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 19 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_50
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 50 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 50 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 50 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 50 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 50 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 50 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_11
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 11 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 11 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 11 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 11 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 1261783);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 23 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 23 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 23 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 23 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
    
    
-- Updating commands for group_1008
-- Tenant_1
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 1 LIMIT 2049948);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 1 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 1 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 1 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 1 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 1 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 2049948);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 5 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 5 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 5 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 5 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_35
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 35 LIMIT 2049948);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 35 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 35 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 35 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 35 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 35 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 2049948);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 20 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 20 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 20 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 20 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_31
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 31 LIMIT 2049948);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 31 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 31 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 31 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 31 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 31 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_41
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 41 LIMIT 2049948);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 41 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 41 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 41 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 41 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 41 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_28
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 28 LIMIT 2049948);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 28 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 28 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 28 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 28 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 28 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
    
    
-- Updating commands for group_1009
-- Tenant_35
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 35 LIMIT 2152510);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 35 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 35 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 35 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 35 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 35 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_8
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 2152510);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 8 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 8 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 8 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 8 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_47
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 47 LIMIT 2152510);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 47 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 47 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 47 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 47 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 47 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_34
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 34 LIMIT 2152510);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 34 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 34 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 34 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 34 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 34 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_10
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 10 LIMIT 2152510);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 10 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 10 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 10 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 10 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 10 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 2152510);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 5 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 5 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 5 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 5 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);