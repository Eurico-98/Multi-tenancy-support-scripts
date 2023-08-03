
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
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (21, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (18, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (19, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (12, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1000);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (19, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (12, 1001);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (10, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (6, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1002);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (10, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1003);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (23, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (15, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (18, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (19, 1004);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (21, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (18, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (15, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (6, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (9, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (25, 1005);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (22, 1006);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (9, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (5, 1007);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (12, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (4, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (11, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (10, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (14, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (6, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (15, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (9, 1008);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (8, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (25, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (22, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (20, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (3, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (17, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (24, 1009);
INSERT INTO tenant_groups (t_tenant_id, g_group_id) VALUES (10, 1009);

    
    
-- Updating commands for group_1000
-- Tenant_3
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 3 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 3 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 3 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 3 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 5 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 5 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 5 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 5 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_21
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 21 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 21 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 21 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 21 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 21 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 21 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 20 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 20 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 20 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 20 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_18
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 18 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 18 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 18 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 18 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 18 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 18 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_11
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 11 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 11 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 11 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 11 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_19
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 19 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 19 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 19 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 19 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 19 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 19 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_12
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 12 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 12 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 12 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 12 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 12 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 12 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1000 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 111228);
UPDATE orders SET tenant_id = 1000 WHERE tenant_id = 4 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1000);
UPDATE partsupp SET tenant_id = 1000 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1000);
UPDATE customer SET tenant_id = 1000 WHERE tenant_id = 4 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1000);
UPDATE part SET tenant_id = 1000 WHERE tenant_id = 4 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1000);
UPDATE supplier SET tenant_id = 1000 WHERE tenant_id = 4 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1000);
    
    
-- Updating commands for group_1001
-- Tenant_19
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 19 LIMIT 8600);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 19 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 19 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 19 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 19 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 19 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
-- Tenant_3
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 8600);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 3 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 3 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 3 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 3 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
-- Tenant_11
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 8600);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 11 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 11 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 11 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 11 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 8600);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 24 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 24 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 24 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 24 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
-- Tenant_12
UPDATE lineitem SET tenant_id = 1001 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 12 LIMIT 8600);
UPDATE orders SET tenant_id = 1001 WHERE tenant_id = 12 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1001);
UPDATE partsupp SET tenant_id = 1001 WHERE tenant_id = 12 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1001);
UPDATE customer SET tenant_id = 1001 WHERE tenant_id = 12 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1001);
UPDATE part SET tenant_id = 1001 WHERE tenant_id = 12 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1001);
UPDATE supplier SET tenant_id = 1001 WHERE tenant_id = 12 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1001);
    
    
-- Updating commands for group_1002
-- Tenant_10
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 10 LIMIT 730626);
UPDATE orders SET tenant_id = 1002 WHERE tenant_id = 10 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1002);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 10 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 10 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1002);
UPDATE part SET tenant_id = 1002 WHERE tenant_id = 10 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1002);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 10 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1002);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 730626);
UPDATE orders SET tenant_id = 1002 WHERE tenant_id = 20 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1002);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 20 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1002);
UPDATE part SET tenant_id = 1002 WHERE tenant_id = 20 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1002);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 20 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1002);
-- Tenant_6
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 6 LIMIT 730626);
UPDATE orders SET tenant_id = 1002 WHERE tenant_id = 6 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1002);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 6 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 6 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1002);
UPDATE part SET tenant_id = 1002 WHERE tenant_id = 6 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1002);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 6 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1002);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1002 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 730626);
UPDATE orders SET tenant_id = 1002 WHERE tenant_id = 4 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1002);
UPDATE partsupp SET tenant_id = 1002 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1002);
UPDATE customer SET tenant_id = 1002 WHERE tenant_id = 4 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1002);
UPDATE part SET tenant_id = 1002 WHERE tenant_id = 4 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1002);
UPDATE supplier SET tenant_id = 1002 WHERE tenant_id = 4 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1002);
    
    
-- Updating commands for group_1003
-- Tenant_10
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 10 LIMIT 292210);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 10 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 10 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 10 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 10 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 10 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_3
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 292210);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 3 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 3 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 3 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 3 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 292210);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 20 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 20 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 20 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 20 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
-- Tenant_8
UPDATE lineitem SET tenant_id = 1003 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 292210);
UPDATE orders SET tenant_id = 1003 WHERE tenant_id = 8 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1003);
UPDATE partsupp SET tenant_id = 1003 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1003);
UPDATE customer SET tenant_id = 1003 WHERE tenant_id = 8 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1003);
UPDATE part SET tenant_id = 1003 WHERE tenant_id = 8 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1003);
UPDATE supplier SET tenant_id = 1003 WHERE tenant_id = 8 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1003);
    
    
-- Updating commands for group_1004
-- Tenant_11
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 11 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 11 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 11 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 11 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_23
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 23 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 23 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 23 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 23 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 23 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 23 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_8
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 8 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 8 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 8 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 8 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_15
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 15 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 15 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 15 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 15 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 15 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 15 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 5 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 5 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 5 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 5 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 20 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 20 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 20 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 20 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_18
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 18 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 18 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 18 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 18 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 18 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 18 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
-- Tenant_19
UPDATE lineitem SET tenant_id = 1004 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 19 LIMIT 436304);
UPDATE orders SET tenant_id = 1004 WHERE tenant_id = 19 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1004);
UPDATE partsupp SET tenant_id = 1004 WHERE tenant_id = 19 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1004);
UPDATE customer SET tenant_id = 1004 WHERE tenant_id = 19 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1004);
UPDATE part SET tenant_id = 1004 WHERE tenant_id = 19 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1004);
UPDATE supplier SET tenant_id = 1004 WHERE tenant_id = 19 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1004);
    
    
-- Updating commands for group_1005
-- Tenant_21
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 21 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 21 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 21 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 21 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 21 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 21 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_18
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 18 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 18 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 18 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 18 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 18 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 18 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_3
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 3 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 3 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 3 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 3 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_15
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 15 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 15 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 15 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 15 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 15 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 15 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_8
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 8 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 8 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 8 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 8 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_6
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 6 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 6 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 6 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 6 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 6 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 6 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 4 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 4 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 4 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 4 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 5 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 5 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 5 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 5 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_9
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 9 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 9 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 9 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 9 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 9 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 9 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
-- Tenant_25
UPDATE lineitem SET tenant_id = 1005 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 25 LIMIT 213363);
UPDATE orders SET tenant_id = 1005 WHERE tenant_id = 25 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1005);
UPDATE partsupp SET tenant_id = 1005 WHERE tenant_id = 25 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1005);
UPDATE customer SET tenant_id = 1005 WHERE tenant_id = 25 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1005);
UPDATE part SET tenant_id = 1005 WHERE tenant_id = 25 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1005);
UPDATE supplier SET tenant_id = 1005 WHERE tenant_id = 25 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1005);
    
    
-- Updating commands for group_1006
-- Tenant_8
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 776897);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 8 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 8 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 8 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 8 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
-- Tenant_22
UPDATE lineitem SET tenant_id = 1006 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 22 LIMIT 776897);
UPDATE orders SET tenant_id = 1006 WHERE tenant_id = 22 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1006);
UPDATE partsupp SET tenant_id = 1006 WHERE tenant_id = 22 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1006);
UPDATE customer SET tenant_id = 1006 WHERE tenant_id = 22 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1006);
UPDATE part SET tenant_id = 1006 WHERE tenant_id = 22 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1006);
UPDATE supplier SET tenant_id = 1006 WHERE tenant_id = 22 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1006);
    
    
-- Updating commands for group_1007
-- Tenant_9
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 9 LIMIT 1695583);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 9 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 9 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 9 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 9 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 9 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
-- Tenant_5
UPDATE lineitem SET tenant_id = 1007 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 5 LIMIT 1695583);
UPDATE orders SET tenant_id = 1007 WHERE tenant_id = 5 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1007);
UPDATE partsupp SET tenant_id = 1007 WHERE tenant_id = 5 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1007);
UPDATE customer SET tenant_id = 1007 WHERE tenant_id = 5 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1007);
UPDATE part SET tenant_id = 1007 WHERE tenant_id = 5 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1007);
UPDATE supplier SET tenant_id = 1007 WHERE tenant_id = 5 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1007);
    
    
-- Updating commands for group_1008
-- Tenant_12
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 12 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 12 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 12 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 12 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 12 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 12 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_4
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 4 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 4 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 4 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 4 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 4 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 4 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_11
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 11 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 11 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 11 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 11 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 11 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 11 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_10
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 10 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 10 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 10 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 10 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 10 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 10 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 24 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 24 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 24 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 24 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_3
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 3 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 3 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 3 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 3 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_14
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 14 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 14 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 14 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 14 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 14 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 14 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_6
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 6 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 6 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 6 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 6 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 6 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 6 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_15
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 15 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 15 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 15 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 15 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 15 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 15 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
-- Tenant_9
UPDATE lineitem SET tenant_id = 1008 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 9 LIMIT 190165);
UPDATE orders SET tenant_id = 1008 WHERE tenant_id = 9 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1008);
UPDATE partsupp SET tenant_id = 1008 WHERE tenant_id = 9 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1008);
UPDATE customer SET tenant_id = 1008 WHERE tenant_id = 9 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1008);
UPDATE part SET tenant_id = 1008 WHERE tenant_id = 9 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1008);
UPDATE supplier SET tenant_id = 1008 WHERE tenant_id = 9 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1008);
    
    
-- Updating commands for group_1009
-- Tenant_8
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 8 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 8 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 8 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 8 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 8 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 8 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_25
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 25 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 25 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 25 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 25 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 25 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 25 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_22
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 22 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 22 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 22 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 22 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 22 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 22 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_20
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 20 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 20 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 20 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 20 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 20 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 20 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_3
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 3 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 3 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 3 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 3 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 3 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 3 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_17
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 17 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 17 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 17 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 17 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 17 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 17 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_24
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 24 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 24 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 24 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 24 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 24 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 24 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);
-- Tenant_10
UPDATE lineitem SET tenant_id = 1009 WHERE ctid IN (SELECT ctid FROM lineitem WHERE tenant_id = 10 LIMIT 305385);
UPDATE orders SET tenant_id = 1009 WHERE tenant_id = 10 AND o_orderkey IN (SELECT l_orderkey FROM lineitem WHERE tenant_id = 1009);
UPDATE partsupp SET tenant_id = 1009 WHERE tenant_id = 10 AND (ps_partkey, ps_suppkey) IN (SELECT l_partkey, l_suppkey FROM lineitem WHERE tenant_id = 1009);
UPDATE customer SET tenant_id = 1009 WHERE tenant_id = 10 AND c_custkey IN (SELECT o_custkey FROM orders WHERE tenant_id = 1009);
UPDATE part SET tenant_id = 1009 WHERE tenant_id = 10 AND p_partkey IN (SELECT ps_partkey FROM partsupp WHERE tenant_id = 1009);
UPDATE supplier SET tenant_id = 1009 WHERE tenant_id = 10 AND s_suppkey IN (SELECT ps_suppkey FROM partsupp WHERE tenant_id = 1009);