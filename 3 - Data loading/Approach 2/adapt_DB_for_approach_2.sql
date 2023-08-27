
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

        
        
-- --------------------------------------------- tenant_2 Disable constrains
ALTER TABLE tenant_2.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_2.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_2.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_2.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_2.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_2.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_2.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_2.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_2.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_2.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_2.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_2.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_2.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_2.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_2.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_2.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_2.region SET r_regionkey = r_regionkey + 6101215;

UPDATE tenant_2.part SET p_partkey = p_partkey + 6101215;

UPDATE tenant_2.nation SET n_regionkey = n_regionkey + 6101215, n_nationkey = n_nationkey + 6101215;

UPDATE tenant_2.supplier SET s_nationkey = s_nationkey + 6101215, s_suppkey = s_suppkey + 6101215;

UPDATE tenant_2.customer SET c_nationkey = c_nationkey + 6101215, c_custkey = c_custkey + 6101215;

UPDATE tenant_2.partsupp SET ps_suppkey = ps_suppkey + 6101215, ps_partkey = ps_partkey + 6101215;

UPDATE tenant_2.orders SET o_custkey = o_custkey + 6101215, o_orderkey = o_orderkey + 6101215;

UPDATE tenant_2.lineitem SET l_orderkey = l_orderkey + 6101215, l_partkey = l_partkey + 6101215, l_suppkey = l_suppkey + 6101215;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_2.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_2.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_2.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_2.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_2.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_2.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_2.part SET tenant_id = 2;
UPDATE tenant_2.supplier SET tenant_id = 2;
UPDATE tenant_2.customer SET tenant_id = 2;
UPDATE tenant_2.partsupp SET tenant_id = 2;
UPDATE tenant_2.orders SET tenant_id = 2;
UPDATE tenant_2.lineitem SET tenant_id = 2;
        
        
        
-- --------------------------------------------- tenant_3 Disable constrains
ALTER TABLE tenant_3.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_3.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_3.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_3.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_3.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_3.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_3.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_3.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_3.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_3.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_3.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_3.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_3.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_3.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_3.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_3.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_3.region SET r_regionkey = r_regionkey + 12202430;

UPDATE tenant_3.part SET p_partkey = p_partkey + 12202430;

UPDATE tenant_3.nation SET n_regionkey = n_regionkey + 12202430, n_nationkey = n_nationkey + 12202430;

UPDATE tenant_3.supplier SET s_nationkey = s_nationkey + 12202430, s_suppkey = s_suppkey + 12202430;

UPDATE tenant_3.customer SET c_nationkey = c_nationkey + 12202430, c_custkey = c_custkey + 12202430;

UPDATE tenant_3.partsupp SET ps_suppkey = ps_suppkey + 12202430, ps_partkey = ps_partkey + 12202430;

UPDATE tenant_3.orders SET o_custkey = o_custkey + 12202430, o_orderkey = o_orderkey + 12202430;

UPDATE tenant_3.lineitem SET l_orderkey = l_orderkey + 12202430, l_partkey = l_partkey + 12202430, l_suppkey = l_suppkey + 12202430;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_3.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_3.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_3.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_3.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_3.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_3.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_3.part SET tenant_id = 3;
UPDATE tenant_3.supplier SET tenant_id = 3;
UPDATE tenant_3.customer SET tenant_id = 3;
UPDATE tenant_3.partsupp SET tenant_id = 3;
UPDATE tenant_3.orders SET tenant_id = 3;
UPDATE tenant_3.lineitem SET tenant_id = 3;
        
        
        
-- --------------------------------------------- tenant_4 Disable constrains
ALTER TABLE tenant_4.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_4.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_4.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_4.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_4.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_4.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_4.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_4.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_4.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_4.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_4.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_4.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_4.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_4.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_4.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_4.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_4.region SET r_regionkey = r_regionkey + 18303645;

UPDATE tenant_4.part SET p_partkey = p_partkey + 18303645;

UPDATE tenant_4.nation SET n_regionkey = n_regionkey + 18303645, n_nationkey = n_nationkey + 18303645;

UPDATE tenant_4.supplier SET s_nationkey = s_nationkey + 18303645, s_suppkey = s_suppkey + 18303645;

UPDATE tenant_4.customer SET c_nationkey = c_nationkey + 18303645, c_custkey = c_custkey + 18303645;

UPDATE tenant_4.partsupp SET ps_suppkey = ps_suppkey + 18303645, ps_partkey = ps_partkey + 18303645;

UPDATE tenant_4.orders SET o_custkey = o_custkey + 18303645, o_orderkey = o_orderkey + 18303645;

UPDATE tenant_4.lineitem SET l_orderkey = l_orderkey + 18303645, l_partkey = l_partkey + 18303645, l_suppkey = l_suppkey + 18303645;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_4.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_4.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_4.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_4.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_4.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_4.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_4.part SET tenant_id = 4;
UPDATE tenant_4.supplier SET tenant_id = 4;
UPDATE tenant_4.customer SET tenant_id = 4;
UPDATE tenant_4.partsupp SET tenant_id = 4;
UPDATE tenant_4.orders SET tenant_id = 4;
UPDATE tenant_4.lineitem SET tenant_id = 4;
        
        
        
-- --------------------------------------------- tenant_5 Disable constrains
ALTER TABLE tenant_5.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_5.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_5.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_5.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_5.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_5.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_5.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_5.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_5.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_5.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_5.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_5.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_5.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_5.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_5.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_5.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_5.region SET r_regionkey = r_regionkey + 24404860;

UPDATE tenant_5.part SET p_partkey = p_partkey + 24404860;

UPDATE tenant_5.nation SET n_regionkey = n_regionkey + 24404860, n_nationkey = n_nationkey + 24404860;

UPDATE tenant_5.supplier SET s_nationkey = s_nationkey + 24404860, s_suppkey = s_suppkey + 24404860;

UPDATE tenant_5.customer SET c_nationkey = c_nationkey + 24404860, c_custkey = c_custkey + 24404860;

UPDATE tenant_5.partsupp SET ps_suppkey = ps_suppkey + 24404860, ps_partkey = ps_partkey + 24404860;

UPDATE tenant_5.orders SET o_custkey = o_custkey + 24404860, o_orderkey = o_orderkey + 24404860;

UPDATE tenant_5.lineitem SET l_orderkey = l_orderkey + 24404860, l_partkey = l_partkey + 24404860, l_suppkey = l_suppkey + 24404860;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_5.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_5.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_5.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_5.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_5.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_5.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_5.part SET tenant_id = 5;
UPDATE tenant_5.supplier SET tenant_id = 5;
UPDATE tenant_5.customer SET tenant_id = 5;
UPDATE tenant_5.partsupp SET tenant_id = 5;
UPDATE tenant_5.orders SET tenant_id = 5;
UPDATE tenant_5.lineitem SET tenant_id = 5;
        
        
        
-- --------------------------------------------- tenant_6 Disable constrains
ALTER TABLE tenant_6.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_6.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_6.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_6.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_6.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_6.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_6.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_6.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_6.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_6.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_6.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_6.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_6.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_6.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_6.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_6.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_6.region SET r_regionkey = r_regionkey + 27642333;

UPDATE tenant_6.part SET p_partkey = p_partkey + 27642333;

UPDATE tenant_6.nation SET n_regionkey = n_regionkey + 27642333, n_nationkey = n_nationkey + 27642333;

UPDATE tenant_6.supplier SET s_nationkey = s_nationkey + 27642333, s_suppkey = s_suppkey + 27642333;

UPDATE tenant_6.customer SET c_nationkey = c_nationkey + 27642333, c_custkey = c_custkey + 27642333;

UPDATE tenant_6.partsupp SET ps_suppkey = ps_suppkey + 27642333, ps_partkey = ps_partkey + 27642333;

UPDATE tenant_6.orders SET o_custkey = o_custkey + 27642333, o_orderkey = o_orderkey + 27642333;

UPDATE tenant_6.lineitem SET l_orderkey = l_orderkey + 27642333, l_partkey = l_partkey + 27642333, l_suppkey = l_suppkey + 27642333;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_6.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_6.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_6.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_6.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_6.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_6.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_6.part SET tenant_id = 6;
UPDATE tenant_6.supplier SET tenant_id = 6;
UPDATE tenant_6.customer SET tenant_id = 6;
UPDATE tenant_6.partsupp SET tenant_id = 6;
UPDATE tenant_6.orders SET tenant_id = 6;
UPDATE tenant_6.lineitem SET tenant_id = 6;
        
        
        
-- --------------------------------------------- tenant_7 Disable constrains
ALTER TABLE tenant_7.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_7.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_7.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_7.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_7.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_7.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_7.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_7.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_7.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_7.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_7.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_7.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_7.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_7.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_7.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_7.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_7.region SET r_regionkey = r_regionkey + 33743548;

UPDATE tenant_7.part SET p_partkey = p_partkey + 33743548;

UPDATE tenant_7.nation SET n_regionkey = n_regionkey + 33743548, n_nationkey = n_nationkey + 33743548;

UPDATE tenant_7.supplier SET s_nationkey = s_nationkey + 33743548, s_suppkey = s_suppkey + 33743548;

UPDATE tenant_7.customer SET c_nationkey = c_nationkey + 33743548, c_custkey = c_custkey + 33743548;

UPDATE tenant_7.partsupp SET ps_suppkey = ps_suppkey + 33743548, ps_partkey = ps_partkey + 33743548;

UPDATE tenant_7.orders SET o_custkey = o_custkey + 33743548, o_orderkey = o_orderkey + 33743548;

UPDATE tenant_7.lineitem SET l_orderkey = l_orderkey + 33743548, l_partkey = l_partkey + 33743548, l_suppkey = l_suppkey + 33743548;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_7.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_7.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_7.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_7.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_7.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_7.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_7.part SET tenant_id = 7;
UPDATE tenant_7.supplier SET tenant_id = 7;
UPDATE tenant_7.customer SET tenant_id = 7;
UPDATE tenant_7.partsupp SET tenant_id = 7;
UPDATE tenant_7.orders SET tenant_id = 7;
UPDATE tenant_7.lineitem SET tenant_id = 7;
        
        
        
-- --------------------------------------------- tenant_8 Disable constrains
ALTER TABLE tenant_8.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_8.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_8.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_8.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_8.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_8.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_8.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_8.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_8.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_8.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_8.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_8.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_8.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_8.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_8.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_8.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_8.region SET r_regionkey = r_regionkey + 37917988;

UPDATE tenant_8.part SET p_partkey = p_partkey + 37917988;

UPDATE tenant_8.nation SET n_regionkey = n_regionkey + 37917988, n_nationkey = n_nationkey + 37917988;

UPDATE tenant_8.supplier SET s_nationkey = s_nationkey + 37917988, s_suppkey = s_suppkey + 37917988;

UPDATE tenant_8.customer SET c_nationkey = c_nationkey + 37917988, c_custkey = c_custkey + 37917988;

UPDATE tenant_8.partsupp SET ps_suppkey = ps_suppkey + 37917988, ps_partkey = ps_partkey + 37917988;

UPDATE tenant_8.orders SET o_custkey = o_custkey + 37917988, o_orderkey = o_orderkey + 37917988;

UPDATE tenant_8.lineitem SET l_orderkey = l_orderkey + 37917988, l_partkey = l_partkey + 37917988, l_suppkey = l_suppkey + 37917988;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_8.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_8.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_8.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_8.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_8.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_8.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_8.part SET tenant_id = 8;
UPDATE tenant_8.supplier SET tenant_id = 8;
UPDATE tenant_8.customer SET tenant_id = 8;
UPDATE tenant_8.partsupp SET tenant_id = 8;
UPDATE tenant_8.orders SET tenant_id = 8;
UPDATE tenant_8.lineitem SET tenant_id = 8;
        
        
        
-- --------------------------------------------- tenant_9 Disable constrains
ALTER TABLE tenant_9.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_9.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_9.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_9.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_9.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_9.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_9.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_9.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_9.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_9.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_9.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_9.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_9.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_9.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_9.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_9.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_9.region SET r_regionkey = r_regionkey + 41720976;

UPDATE tenant_9.part SET p_partkey = p_partkey + 41720976;

UPDATE tenant_9.nation SET n_regionkey = n_regionkey + 41720976, n_nationkey = n_nationkey + 41720976;

UPDATE tenant_9.supplier SET s_nationkey = s_nationkey + 41720976, s_suppkey = s_suppkey + 41720976;

UPDATE tenant_9.customer SET c_nationkey = c_nationkey + 41720976, c_custkey = c_custkey + 41720976;

UPDATE tenant_9.partsupp SET ps_suppkey = ps_suppkey + 41720976, ps_partkey = ps_partkey + 41720976;

UPDATE tenant_9.orders SET o_custkey = o_custkey + 41720976, o_orderkey = o_orderkey + 41720976;

UPDATE tenant_9.lineitem SET l_orderkey = l_orderkey + 41720976, l_partkey = l_partkey + 41720976, l_suppkey = l_suppkey + 41720976;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_9.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_9.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_9.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_9.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_9.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_9.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_9.part SET tenant_id = 9;
UPDATE tenant_9.supplier SET tenant_id = 9;
UPDATE tenant_9.customer SET tenant_id = 9;
UPDATE tenant_9.partsupp SET tenant_id = 9;
UPDATE tenant_9.orders SET tenant_id = 9;
UPDATE tenant_9.lineitem SET tenant_id = 9;
        
        
        
-- --------------------------------------------- tenant_10 Disable constrains
ALTER TABLE tenant_10.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_10.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_10.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_10.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_10.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_10.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_10.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_10.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_10.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_10.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_10.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_10.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_10.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_10.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_10.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_10.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_10.region SET r_regionkey = r_regionkey + 45745590;

UPDATE tenant_10.part SET p_partkey = p_partkey + 45745590;

UPDATE tenant_10.nation SET n_regionkey = n_regionkey + 45745590, n_nationkey = n_nationkey + 45745590;

UPDATE tenant_10.supplier SET s_nationkey = s_nationkey + 45745590, s_suppkey = s_suppkey + 45745590;

UPDATE tenant_10.customer SET c_nationkey = c_nationkey + 45745590, c_custkey = c_custkey + 45745590;

UPDATE tenant_10.partsupp SET ps_suppkey = ps_suppkey + 45745590, ps_partkey = ps_partkey + 45745590;

UPDATE tenant_10.orders SET o_custkey = o_custkey + 45745590, o_orderkey = o_orderkey + 45745590;

UPDATE tenant_10.lineitem SET l_orderkey = l_orderkey + 45745590, l_partkey = l_partkey + 45745590, l_suppkey = l_suppkey + 45745590;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_10.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_10.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_10.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_10.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_10.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_10.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_10.part SET tenant_id = 10;
UPDATE tenant_10.supplier SET tenant_id = 10;
UPDATE tenant_10.customer SET tenant_id = 10;
UPDATE tenant_10.partsupp SET tenant_id = 10;
UPDATE tenant_10.orders SET tenant_id = 10;
UPDATE tenant_10.lineitem SET tenant_id = 10;
        
        
        
-- --------------------------------------------- tenant_11 Disable constrains
ALTER TABLE tenant_11.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_11.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_11.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_11.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_11.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_11.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_11.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_11.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_11.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_11.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_11.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_11.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_11.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_11.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_11.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_11.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_11.region SET r_regionkey = r_regionkey + 49265766;

UPDATE tenant_11.part SET p_partkey = p_partkey + 49265766;

UPDATE tenant_11.nation SET n_regionkey = n_regionkey + 49265766, n_nationkey = n_nationkey + 49265766;

UPDATE tenant_11.supplier SET s_nationkey = s_nationkey + 49265766, s_suppkey = s_suppkey + 49265766;

UPDATE tenant_11.customer SET c_nationkey = c_nationkey + 49265766, c_custkey = c_custkey + 49265766;

UPDATE tenant_11.partsupp SET ps_suppkey = ps_suppkey + 49265766, ps_partkey = ps_partkey + 49265766;

UPDATE tenant_11.orders SET o_custkey = o_custkey + 49265766, o_orderkey = o_orderkey + 49265766;

UPDATE tenant_11.lineitem SET l_orderkey = l_orderkey + 49265766, l_partkey = l_partkey + 49265766, l_suppkey = l_suppkey + 49265766;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_11.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_11.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_11.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_11.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_11.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_11.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_11.part SET tenant_id = 11;
UPDATE tenant_11.supplier SET tenant_id = 11;
UPDATE tenant_11.customer SET tenant_id = 11;
UPDATE tenant_11.partsupp SET tenant_id = 11;
UPDATE tenant_11.orders SET tenant_id = 11;
UPDATE tenant_11.lineitem SET tenant_id = 11;
        
        
        
-- --------------------------------------------- tenant_12 Disable constrains
ALTER TABLE tenant_12.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_12.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_12.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_12.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_12.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_12.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_12.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_12.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_12.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_12.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_12.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_12.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_12.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_12.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_12.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_12.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_12.region SET r_regionkey = r_regionkey + 52563601;

UPDATE tenant_12.part SET p_partkey = p_partkey + 52563601;

UPDATE tenant_12.nation SET n_regionkey = n_regionkey + 52563601, n_nationkey = n_nationkey + 52563601;

UPDATE tenant_12.supplier SET s_nationkey = s_nationkey + 52563601, s_suppkey = s_suppkey + 52563601;

UPDATE tenant_12.customer SET c_nationkey = c_nationkey + 52563601, c_custkey = c_custkey + 52563601;

UPDATE tenant_12.partsupp SET ps_suppkey = ps_suppkey + 52563601, ps_partkey = ps_partkey + 52563601;

UPDATE tenant_12.orders SET o_custkey = o_custkey + 52563601, o_orderkey = o_orderkey + 52563601;

UPDATE tenant_12.lineitem SET l_orderkey = l_orderkey + 52563601, l_partkey = l_partkey + 52563601, l_suppkey = l_suppkey + 52563601;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_12.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_12.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_12.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_12.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_12.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_12.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_12.part SET tenant_id = 12;
UPDATE tenant_12.supplier SET tenant_id = 12;
UPDATE tenant_12.customer SET tenant_id = 12;
UPDATE tenant_12.partsupp SET tenant_id = 12;
UPDATE tenant_12.orders SET tenant_id = 12;
UPDATE tenant_12.lineitem SET tenant_id = 12;
        
        
        
-- --------------------------------------------- tenant_13 Disable constrains
ALTER TABLE tenant_13.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_13.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_13.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_13.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_13.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_13.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_13.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_13.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_13.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_13.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_13.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_13.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_13.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_13.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_13.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_13.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_13.region SET r_regionkey = r_regionkey + 55753341;

UPDATE tenant_13.part SET p_partkey = p_partkey + 55753341;

UPDATE tenant_13.nation SET n_regionkey = n_regionkey + 55753341, n_nationkey = n_nationkey + 55753341;

UPDATE tenant_13.supplier SET s_nationkey = s_nationkey + 55753341, s_suppkey = s_suppkey + 55753341;

UPDATE tenant_13.customer SET c_nationkey = c_nationkey + 55753341, c_custkey = c_custkey + 55753341;

UPDATE tenant_13.partsupp SET ps_suppkey = ps_suppkey + 55753341, ps_partkey = ps_partkey + 55753341;

UPDATE tenant_13.orders SET o_custkey = o_custkey + 55753341, o_orderkey = o_orderkey + 55753341;

UPDATE tenant_13.lineitem SET l_orderkey = l_orderkey + 55753341, l_partkey = l_partkey + 55753341, l_suppkey = l_suppkey + 55753341;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_13.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_13.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_13.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_13.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_13.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_13.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_13.part SET tenant_id = 13;
UPDATE tenant_13.supplier SET tenant_id = 13;
UPDATE tenant_13.customer SET tenant_id = 13;
UPDATE tenant_13.partsupp SET tenant_id = 13;
UPDATE tenant_13.orders SET tenant_id = 13;
UPDATE tenant_13.lineitem SET tenant_id = 13;
        
        
        
-- --------------------------------------------- tenant_14 Disable constrains
ALTER TABLE tenant_14.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_14.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_14.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_14.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_14.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_14.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_14.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_14.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_14.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_14.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_14.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_14.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_14.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_14.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_14.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_14.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_14.region SET r_regionkey = r_regionkey + 58900956;

UPDATE tenant_14.part SET p_partkey = p_partkey + 58900956;

UPDATE tenant_14.nation SET n_regionkey = n_regionkey + 58900956, n_nationkey = n_nationkey + 58900956;

UPDATE tenant_14.supplier SET s_nationkey = s_nationkey + 58900956, s_suppkey = s_suppkey + 58900956;

UPDATE tenant_14.customer SET c_nationkey = c_nationkey + 58900956, c_custkey = c_custkey + 58900956;

UPDATE tenant_14.partsupp SET ps_suppkey = ps_suppkey + 58900956, ps_partkey = ps_partkey + 58900956;

UPDATE tenant_14.orders SET o_custkey = o_custkey + 58900956, o_orderkey = o_orderkey + 58900956;

UPDATE tenant_14.lineitem SET l_orderkey = l_orderkey + 58900956, l_partkey = l_partkey + 58900956, l_suppkey = l_suppkey + 58900956;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_14.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_14.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_14.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_14.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_14.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_14.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_14.part SET tenant_id = 14;
UPDATE tenant_14.supplier SET tenant_id = 14;
UPDATE tenant_14.customer SET tenant_id = 14;
UPDATE tenant_14.partsupp SET tenant_id = 14;
UPDATE tenant_14.orders SET tenant_id = 14;
UPDATE tenant_14.lineitem SET tenant_id = 14;
        
        
        
-- --------------------------------------------- tenant_15 Disable constrains
ALTER TABLE tenant_15.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_15.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_15.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_15.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_15.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_15.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_15.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_15.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_15.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_15.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_15.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_15.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_15.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_15.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_15.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_15.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_15.region SET r_regionkey = r_regionkey + 62048571;

UPDATE tenant_15.part SET p_partkey = p_partkey + 62048571;

UPDATE tenant_15.nation SET n_regionkey = n_regionkey + 62048571, n_nationkey = n_nationkey + 62048571;

UPDATE tenant_15.supplier SET s_nationkey = s_nationkey + 62048571, s_suppkey = s_suppkey + 62048571;

UPDATE tenant_15.customer SET c_nationkey = c_nationkey + 62048571, c_custkey = c_custkey + 62048571;

UPDATE tenant_15.partsupp SET ps_suppkey = ps_suppkey + 62048571, ps_partkey = ps_partkey + 62048571;

UPDATE tenant_15.orders SET o_custkey = o_custkey + 62048571, o_orderkey = o_orderkey + 62048571;

UPDATE tenant_15.lineitem SET l_orderkey = l_orderkey + 62048571, l_partkey = l_partkey + 62048571, l_suppkey = l_suppkey + 62048571;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_15.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_15.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_15.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_15.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_15.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_15.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_15.part SET tenant_id = 15;
UPDATE tenant_15.supplier SET tenant_id = 15;
UPDATE tenant_15.customer SET tenant_id = 15;
UPDATE tenant_15.partsupp SET tenant_id = 15;
UPDATE tenant_15.orders SET tenant_id = 15;
UPDATE tenant_15.lineitem SET tenant_id = 15;
        
        
        
-- --------------------------------------------- tenant_16 Disable constrains
ALTER TABLE tenant_16.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_16.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_16.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_16.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_16.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_16.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_16.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_16.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_16.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_16.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_16.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_16.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_16.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_16.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_16.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_16.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_16.region SET r_regionkey = r_regionkey + 65148242;

UPDATE tenant_16.part SET p_partkey = p_partkey + 65148242;

UPDATE tenant_16.nation SET n_regionkey = n_regionkey + 65148242, n_nationkey = n_nationkey + 65148242;

UPDATE tenant_16.supplier SET s_nationkey = s_nationkey + 65148242, s_suppkey = s_suppkey + 65148242;

UPDATE tenant_16.customer SET c_nationkey = c_nationkey + 65148242, c_custkey = c_custkey + 65148242;

UPDATE tenant_16.partsupp SET ps_suppkey = ps_suppkey + 65148242, ps_partkey = ps_partkey + 65148242;

UPDATE tenant_16.orders SET o_custkey = o_custkey + 65148242, o_orderkey = o_orderkey + 65148242;

UPDATE tenant_16.lineitem SET l_orderkey = l_orderkey + 65148242, l_partkey = l_partkey + 65148242, l_suppkey = l_suppkey + 65148242;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_16.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_16.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_16.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_16.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_16.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_16.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_16.part SET tenant_id = 16;
UPDATE tenant_16.supplier SET tenant_id = 16;
UPDATE tenant_16.customer SET tenant_id = 16;
UPDATE tenant_16.partsupp SET tenant_id = 16;
UPDATE tenant_16.orders SET tenant_id = 16;
UPDATE tenant_16.lineitem SET tenant_id = 16;
        
        
        
-- --------------------------------------------- tenant_17 Disable constrains
ALTER TABLE tenant_17.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_17.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_17.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_17.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_17.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_17.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_17.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_17.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_17.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_17.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_17.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_17.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_17.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_17.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_17.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_17.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_17.region SET r_regionkey = r_regionkey + 71249457;

UPDATE tenant_17.part SET p_partkey = p_partkey + 71249457;

UPDATE tenant_17.nation SET n_regionkey = n_regionkey + 71249457, n_nationkey = n_nationkey + 71249457;

UPDATE tenant_17.supplier SET s_nationkey = s_nationkey + 71249457, s_suppkey = s_suppkey + 71249457;

UPDATE tenant_17.customer SET c_nationkey = c_nationkey + 71249457, c_custkey = c_custkey + 71249457;

UPDATE tenant_17.partsupp SET ps_suppkey = ps_suppkey + 71249457, ps_partkey = ps_partkey + 71249457;

UPDATE tenant_17.orders SET o_custkey = o_custkey + 71249457, o_orderkey = o_orderkey + 71249457;

UPDATE tenant_17.lineitem SET l_orderkey = l_orderkey + 71249457, l_partkey = l_partkey + 71249457, l_suppkey = l_suppkey + 71249457;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_17.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_17.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_17.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_17.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_17.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_17.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_17.part SET tenant_id = 17;
UPDATE tenant_17.supplier SET tenant_id = 17;
UPDATE tenant_17.customer SET tenant_id = 17;
UPDATE tenant_17.partsupp SET tenant_id = 17;
UPDATE tenant_17.orders SET tenant_id = 17;
UPDATE tenant_17.lineitem SET tenant_id = 17;
        
        
        
-- --------------------------------------------- tenant_18 Disable constrains
ALTER TABLE tenant_18.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_18.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_18.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_18.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_18.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_18.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_18.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_18.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_18.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_18.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_18.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_18.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_18.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_18.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_18.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_18.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_18.region SET r_regionkey = r_regionkey + 77350672;

UPDATE tenant_18.part SET p_partkey = p_partkey + 77350672;

UPDATE tenant_18.nation SET n_regionkey = n_regionkey + 77350672, n_nationkey = n_nationkey + 77350672;

UPDATE tenant_18.supplier SET s_nationkey = s_nationkey + 77350672, s_suppkey = s_suppkey + 77350672;

UPDATE tenant_18.customer SET c_nationkey = c_nationkey + 77350672, c_custkey = c_custkey + 77350672;

UPDATE tenant_18.partsupp SET ps_suppkey = ps_suppkey + 77350672, ps_partkey = ps_partkey + 77350672;

UPDATE tenant_18.orders SET o_custkey = o_custkey + 77350672, o_orderkey = o_orderkey + 77350672;

UPDATE tenant_18.lineitem SET l_orderkey = l_orderkey + 77350672, l_partkey = l_partkey + 77350672, l_suppkey = l_suppkey + 77350672;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_18.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_18.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_18.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_18.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_18.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_18.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_18.part SET tenant_id = 18;
UPDATE tenant_18.supplier SET tenant_id = 18;
UPDATE tenant_18.customer SET tenant_id = 18;
UPDATE tenant_18.partsupp SET tenant_id = 18;
UPDATE tenant_18.orders SET tenant_id = 18;
UPDATE tenant_18.lineitem SET tenant_id = 18;
        
        
        
-- --------------------------------------------- tenant_19 Disable constrains
ALTER TABLE tenant_19.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_19.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_19.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_19.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_19.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_19.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_19.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_19.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_19.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_19.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_19.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_19.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_19.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_19.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_19.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_19.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_19.region SET r_regionkey = r_regionkey + 83451887;

UPDATE tenant_19.part SET p_partkey = p_partkey + 83451887;

UPDATE tenant_19.nation SET n_regionkey = n_regionkey + 83451887, n_nationkey = n_nationkey + 83451887;

UPDATE tenant_19.supplier SET s_nationkey = s_nationkey + 83451887, s_suppkey = s_suppkey + 83451887;

UPDATE tenant_19.customer SET c_nationkey = c_nationkey + 83451887, c_custkey = c_custkey + 83451887;

UPDATE tenant_19.partsupp SET ps_suppkey = ps_suppkey + 83451887, ps_partkey = ps_partkey + 83451887;

UPDATE tenant_19.orders SET o_custkey = o_custkey + 83451887, o_orderkey = o_orderkey + 83451887;

UPDATE tenant_19.lineitem SET l_orderkey = l_orderkey + 83451887, l_partkey = l_partkey + 83451887, l_suppkey = l_suppkey + 83451887;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_19.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_19.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_19.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_19.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_19.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_19.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_19.part SET tenant_id = 19;
UPDATE tenant_19.supplier SET tenant_id = 19;
UPDATE tenant_19.customer SET tenant_id = 19;
UPDATE tenant_19.partsupp SET tenant_id = 19;
UPDATE tenant_19.orders SET tenant_id = 19;
UPDATE tenant_19.lineitem SET tenant_id = 19;
        
        
        
-- --------------------------------------------- tenant_20 Disable constrains
ALTER TABLE tenant_20.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_20.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_20.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_20.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_20.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_20.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_20.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_20.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_20.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_20.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_20.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_20.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_20.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_20.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_20.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_20.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_20.region SET r_regionkey = r_regionkey + 89553102;

UPDATE tenant_20.part SET p_partkey = p_partkey + 89553102;

UPDATE tenant_20.nation SET n_regionkey = n_regionkey + 89553102, n_nationkey = n_nationkey + 89553102;

UPDATE tenant_20.supplier SET s_nationkey = s_nationkey + 89553102, s_suppkey = s_suppkey + 89553102;

UPDATE tenant_20.customer SET c_nationkey = c_nationkey + 89553102, c_custkey = c_custkey + 89553102;

UPDATE tenant_20.partsupp SET ps_suppkey = ps_suppkey + 89553102, ps_partkey = ps_partkey + 89553102;

UPDATE tenant_20.orders SET o_custkey = o_custkey + 89553102, o_orderkey = o_orderkey + 89553102;

UPDATE tenant_20.lineitem SET l_orderkey = l_orderkey + 89553102, l_partkey = l_partkey + 89553102, l_suppkey = l_suppkey + 89553102;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_20.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_20.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_20.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_20.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_20.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_20.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_20.part SET tenant_id = 20;
UPDATE tenant_20.supplier SET tenant_id = 20;
UPDATE tenant_20.customer SET tenant_id = 20;
UPDATE tenant_20.partsupp SET tenant_id = 20;
UPDATE tenant_20.orders SET tenant_id = 20;
UPDATE tenant_20.lineitem SET tenant_id = 20;
        
        
        
-- --------------------------------------------- tenant_21 Disable constrains
ALTER TABLE tenant_21.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_21.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_21.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_21.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_21.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_21.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_21.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_21.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_21.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_21.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_21.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_21.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_21.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_21.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_21.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_21.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_21.region SET r_regionkey = r_regionkey + 95654317;

UPDATE tenant_21.part SET p_partkey = p_partkey + 95654317;

UPDATE tenant_21.nation SET n_regionkey = n_regionkey + 95654317, n_nationkey = n_nationkey + 95654317;

UPDATE tenant_21.supplier SET s_nationkey = s_nationkey + 95654317, s_suppkey = s_suppkey + 95654317;

UPDATE tenant_21.customer SET c_nationkey = c_nationkey + 95654317, c_custkey = c_custkey + 95654317;

UPDATE tenant_21.partsupp SET ps_suppkey = ps_suppkey + 95654317, ps_partkey = ps_partkey + 95654317;

UPDATE tenant_21.orders SET o_custkey = o_custkey + 95654317, o_orderkey = o_orderkey + 95654317;

UPDATE tenant_21.lineitem SET l_orderkey = l_orderkey + 95654317, l_partkey = l_partkey + 95654317, l_suppkey = l_suppkey + 95654317;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_21.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_21.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_21.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_21.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_21.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_21.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_21.part SET tenant_id = 21;
UPDATE tenant_21.supplier SET tenant_id = 21;
UPDATE tenant_21.customer SET tenant_id = 21;
UPDATE tenant_21.partsupp SET tenant_id = 21;
UPDATE tenant_21.orders SET tenant_id = 21;
UPDATE tenant_21.lineitem SET tenant_id = 21;
        
        
        
-- --------------------------------------------- tenant_22 Disable constrains
ALTER TABLE tenant_22.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_22.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_22.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_22.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_22.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_22.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_22.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_22.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_22.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_22.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_22.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_22.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_22.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_22.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_22.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_22.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_22.region SET r_regionkey = r_regionkey + 101755532;

UPDATE tenant_22.part SET p_partkey = p_partkey + 101755532;

UPDATE tenant_22.nation SET n_regionkey = n_regionkey + 101755532, n_nationkey = n_nationkey + 101755532;

UPDATE tenant_22.supplier SET s_nationkey = s_nationkey + 101755532, s_suppkey = s_suppkey + 101755532;

UPDATE tenant_22.customer SET c_nationkey = c_nationkey + 101755532, c_custkey = c_custkey + 101755532;

UPDATE tenant_22.partsupp SET ps_suppkey = ps_suppkey + 101755532, ps_partkey = ps_partkey + 101755532;

UPDATE tenant_22.orders SET o_custkey = o_custkey + 101755532, o_orderkey = o_orderkey + 101755532;

UPDATE tenant_22.lineitem SET l_orderkey = l_orderkey + 101755532, l_partkey = l_partkey + 101755532, l_suppkey = l_suppkey + 101755532;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_22.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_22.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_22.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_22.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_22.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_22.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_22.part SET tenant_id = 22;
UPDATE tenant_22.supplier SET tenant_id = 22;
UPDATE tenant_22.customer SET tenant_id = 22;
UPDATE tenant_22.partsupp SET tenant_id = 22;
UPDATE tenant_22.orders SET tenant_id = 22;
UPDATE tenant_22.lineitem SET tenant_id = 22;
        
        
        
-- --------------------------------------------- tenant_23 Disable constrains
ALTER TABLE tenant_23.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_23.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_23.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_23.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_23.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_23.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_23.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_23.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_23.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_23.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_23.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_23.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_23.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_23.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_23.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_23.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_23.region SET r_regionkey = r_regionkey + 107856747;

UPDATE tenant_23.part SET p_partkey = p_partkey + 107856747;

UPDATE tenant_23.nation SET n_regionkey = n_regionkey + 107856747, n_nationkey = n_nationkey + 107856747;

UPDATE tenant_23.supplier SET s_nationkey = s_nationkey + 107856747, s_suppkey = s_suppkey + 107856747;

UPDATE tenant_23.customer SET c_nationkey = c_nationkey + 107856747, c_custkey = c_custkey + 107856747;

UPDATE tenant_23.partsupp SET ps_suppkey = ps_suppkey + 107856747, ps_partkey = ps_partkey + 107856747;

UPDATE tenant_23.orders SET o_custkey = o_custkey + 107856747, o_orderkey = o_orderkey + 107856747;

UPDATE tenant_23.lineitem SET l_orderkey = l_orderkey + 107856747, l_partkey = l_partkey + 107856747, l_suppkey = l_suppkey + 107856747;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_23.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_23.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_23.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_23.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_23.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_23.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_23.part SET tenant_id = 23;
UPDATE tenant_23.supplier SET tenant_id = 23;
UPDATE tenant_23.customer SET tenant_id = 23;
UPDATE tenant_23.partsupp SET tenant_id = 23;
UPDATE tenant_23.orders SET tenant_id = 23;
UPDATE tenant_23.lineitem SET tenant_id = 23;
        
        
        
-- --------------------------------------------- tenant_24 Disable constrains
ALTER TABLE tenant_24.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_24.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_24.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_24.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_24.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_24.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_24.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_24.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_24.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_24.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_24.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_24.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_24.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_24.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_24.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_24.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_24.region SET r_regionkey = r_regionkey + 113957962;

UPDATE tenant_24.part SET p_partkey = p_partkey + 113957962;

UPDATE tenant_24.nation SET n_regionkey = n_regionkey + 113957962, n_nationkey = n_nationkey + 113957962;

UPDATE tenant_24.supplier SET s_nationkey = s_nationkey + 113957962, s_suppkey = s_suppkey + 113957962;

UPDATE tenant_24.customer SET c_nationkey = c_nationkey + 113957962, c_custkey = c_custkey + 113957962;

UPDATE tenant_24.partsupp SET ps_suppkey = ps_suppkey + 113957962, ps_partkey = ps_partkey + 113957962;

UPDATE tenant_24.orders SET o_custkey = o_custkey + 113957962, o_orderkey = o_orderkey + 113957962;

UPDATE tenant_24.lineitem SET l_orderkey = l_orderkey + 113957962, l_partkey = l_partkey + 113957962, l_suppkey = l_suppkey + 113957962;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_24.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_24.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_24.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_24.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_24.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_24.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_24.part SET tenant_id = 24;
UPDATE tenant_24.supplier SET tenant_id = 24;
UPDATE tenant_24.customer SET tenant_id = 24;
UPDATE tenant_24.partsupp SET tenant_id = 24;
UPDATE tenant_24.orders SET tenant_id = 24;
UPDATE tenant_24.lineitem SET tenant_id = 24;
        
        
        
-- --------------------------------------------- tenant_25 Disable constrains
ALTER TABLE tenant_25.nation DROP CONSTRAINT nation_n_regionkey_fkey;
ALTER TABLE tenant_25.supplier DROP CONSTRAINT supplier_s_nationkey_fkey;
ALTER TABLE tenant_25.customer DROP CONSTRAINT customer_c_nationkey_fkey;
ALTER TABLE tenant_25.partsupp DROP CONSTRAINT partsupp_ps_suppkey_fkey;
ALTER TABLE tenant_25.partsupp DROP CONSTRAINT partsupp_ps_partkey_fkey;
ALTER TABLE tenant_25.orders DROP CONSTRAINT orders_o_custkey_fkey;
ALTER TABLE tenant_25.lineitem DROP CONSTRAINT lineitem_l_orderkey_fkey;
ALTER TABLE tenant_25.lineitem DROP CONSTRAINT lineitem_l_partkey_l_suppkey_fkey;            

ALTER TABLE tenant_25.region DROP CONSTRAINT region_pkey;
ALTER TABLE tenant_25.nation DROP CONSTRAINT nation_pkey;
ALTER TABLE tenant_25.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE tenant_25.supplier DROP CONSTRAINT supplier_pkey;
ALTER TABLE tenant_25.part DROP CONSTRAINT part_pkey;
ALTER TABLE tenant_25.partsupp DROP CONSTRAINT partsupp_pkey;
ALTER TABLE tenant_25.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE tenant_25.lineitem DROP CONSTRAINT lineitem_pkey;
        
-- Update keys
UPDATE tenant_25.region SET r_regionkey = r_regionkey + 120059177;

UPDATE tenant_25.part SET p_partkey = p_partkey + 120059177;

UPDATE tenant_25.nation SET n_regionkey = n_regionkey + 120059177, n_nationkey = n_nationkey + 120059177;

UPDATE tenant_25.supplier SET s_nationkey = s_nationkey + 120059177, s_suppkey = s_suppkey + 120059177;

UPDATE tenant_25.customer SET c_nationkey = c_nationkey + 120059177, c_custkey = c_custkey + 120059177;

UPDATE tenant_25.partsupp SET ps_suppkey = ps_suppkey + 120059177, ps_partkey = ps_partkey + 120059177;

UPDATE tenant_25.orders SET o_custkey = o_custkey + 120059177, o_orderkey = o_orderkey + 120059177;

UPDATE tenant_25.lineitem SET l_orderkey = l_orderkey + 120059177, l_partkey = l_partkey + 120059177, l_suppkey = l_suppkey + 120059177;

-- Add tenant_id column and populate it with the corresponding tenant ID
ALTER TABLE tenant_25.part ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_25.supplier ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_25.customer ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_25.partsupp ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_25.orders ADD COLUMN tenant_id INTEGER;
ALTER TABLE tenant_25.lineitem ADD COLUMN tenant_id INTEGER;
UPDATE tenant_25.part SET tenant_id = 25;
UPDATE tenant_25.supplier SET tenant_id = 25;
UPDATE tenant_25.customer SET tenant_id = 25;
UPDATE tenant_25.partsupp SET tenant_id = 25;
UPDATE tenant_25.orders SET tenant_id = 25;
UPDATE tenant_25.lineitem SET tenant_id = 25;
        
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



INSERT INTO region SELECT * FROM tenant_1.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_2.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_3.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_4.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_5.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_6.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_7.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_8.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_9.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_10.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_11.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_12.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_13.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_14.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_15.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_16.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_17.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_18.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_19.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_20.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_21.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_22.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_23.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_24.region LIMIT 6;
INSERT INTO region SELECT * FROM tenant_25.region LIMIT 6;
                
-- ---------------------------------------------------------------- finnished copying table region to public schema                      




INSERT INTO part SELECT * FROM tenant_1.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_2.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_3.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_4.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_5.part LIMIT 104600;
INSERT INTO part SELECT * FROM tenant_6.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_7.part LIMIT 135800;
INSERT INTO part SELECT * FROM tenant_8.part LIMIT 123400;
INSERT INTO part SELECT * FROM tenant_9.part LIMIT 130800;
INSERT INTO part SELECT * FROM tenant_10.part LIMIT 114000;
INSERT INTO part SELECT * FROM tenant_11.part LIMIT 106600;
INSERT INTO part SELECT * FROM tenant_12.part LIMIT 103000;
INSERT INTO part SELECT * FROM tenant_13.part LIMIT 101600;
INSERT INTO part SELECT * FROM tenant_14.part LIMIT 101600;
INSERT INTO part SELECT * FROM tenant_15.part LIMIT 100000;
INSERT INTO part SELECT * FROM tenant_16.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_17.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_18.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_19.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_20.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_21.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_22.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_23.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_24.part LIMIT 200000;
INSERT INTO part SELECT * FROM tenant_25.part LIMIT 200000;
           
-- ---------------------------------------------------------------- finnished copying table part to public schema                      




INSERT INTO nation SELECT * FROM tenant_1.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_2.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_3.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_4.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_5.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_6.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_7.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_8.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_9.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_10.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_11.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_12.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_13.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_14.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_15.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_16.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_17.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_18.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_19.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_20.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_21.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_22.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_23.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_24.nation LIMIT 25;
INSERT INTO nation SELECT * FROM tenant_25.nation LIMIT 25;
              
-- ---------------------------------------------------------------- finnished copying table nation to public schema                      




INSERT INTO supplier SELECT * FROM tenant_1.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_2.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_3.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_4.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_5.supplier LIMIT 5230;
INSERT INTO supplier SELECT * FROM tenant_6.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_7.supplier LIMIT 6790;
INSERT INTO supplier SELECT * FROM tenant_8.supplier LIMIT 6170;
INSERT INTO supplier SELECT * FROM tenant_9.supplier LIMIT 6540;
INSERT INTO supplier SELECT * FROM tenant_10.supplier LIMIT 5700;
INSERT INTO supplier SELECT * FROM tenant_11.supplier LIMIT 5330;
INSERT INTO supplier SELECT * FROM tenant_12.supplier LIMIT 5150;
INSERT INTO supplier SELECT * FROM tenant_13.supplier LIMIT 5080;
INSERT INTO supplier SELECT * FROM tenant_14.supplier LIMIT 5080;
INSERT INTO supplier SELECT * FROM tenant_15.supplier LIMIT 5000;
INSERT INTO supplier SELECT * FROM tenant_16.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_17.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_18.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_19.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_20.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_21.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_22.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_23.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_24.supplier LIMIT 10000;
INSERT INTO supplier SELECT * FROM tenant_25.supplier LIMIT 10000;
   
-- ---------------------------------------------------------------- finnished copying table supplier to public schema                      




INSERT INTO customer SELECT * FROM tenant_1.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_2.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_3.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_4.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_5.customer LIMIT 78450;
INSERT INTO customer SELECT * FROM tenant_6.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_7.customer LIMIT 101850;
INSERT INTO customer SELECT * FROM tenant_8.customer LIMIT 92550;
INSERT INTO customer SELECT * FROM tenant_9.customer LIMIT 98100;
INSERT INTO customer SELECT * FROM tenant_10.customer LIMIT 85500;
INSERT INTO customer SELECT * FROM tenant_11.customer LIMIT 79950;
INSERT INTO customer SELECT * FROM tenant_12.customer LIMIT 77250;
INSERT INTO customer SELECT * FROM tenant_13.customer LIMIT 76200;
INSERT INTO customer SELECT * FROM tenant_14.customer LIMIT 76200;
INSERT INTO customer SELECT * FROM tenant_15.customer LIMIT 75000;
INSERT INTO customer SELECT * FROM tenant_16.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_17.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_18.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_19.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_20.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_21.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_22.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_23.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_24.customer LIMIT 150000;
INSERT INTO customer SELECT * FROM tenant_25.customer LIMIT 150000;
                    
-- ---------------------------------------------------------------- finnished copying table customer to public schema                      




INSERT INTO partsupp SELECT * FROM tenant_1.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_2.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_3.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_4.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_5.partsupp LIMIT 418400;
INSERT INTO partsupp SELECT * FROM tenant_6.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_7.partsupp LIMIT 543200;
INSERT INTO partsupp SELECT * FROM tenant_8.partsupp LIMIT 493600;
INSERT INTO partsupp SELECT * FROM tenant_9.partsupp LIMIT 523200;
INSERT INTO partsupp SELECT * FROM tenant_10.partsupp LIMIT 456000;
INSERT INTO partsupp SELECT * FROM tenant_11.partsupp LIMIT 426400;
INSERT INTO partsupp SELECT * FROM tenant_12.partsupp LIMIT 412000;
INSERT INTO partsupp SELECT * FROM tenant_13.partsupp LIMIT 406400;
INSERT INTO partsupp SELECT * FROM tenant_14.partsupp LIMIT 406400;
INSERT INTO partsupp SELECT * FROM tenant_15.partsupp LIMIT 400000;
INSERT INTO partsupp SELECT * FROM tenant_16.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_17.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_18.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_19.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_20.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_21.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_22.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_23.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_24.partsupp LIMIT 800000;
INSERT INTO partsupp SELECT * FROM tenant_25.partsupp LIMIT 800000;
                     
-- ---------------------------------------------------------------- finnished copying table partsupp to public schema                      




INSERT INTO orders SELECT * FROM tenant_1.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_2.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_3.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_4.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_5.orders LIMIT 784500;
INSERT INTO orders SELECT * FROM tenant_6.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_7.orders LIMIT 1018500;
INSERT INTO orders SELECT * FROM tenant_8.orders LIMIT 925500;
INSERT INTO orders SELECT * FROM tenant_9.orders LIMIT 981000;
INSERT INTO orders SELECT * FROM tenant_10.orders LIMIT 855000;
INSERT INTO orders SELECT * FROM tenant_11.orders LIMIT 799500;
INSERT INTO orders SELECT * FROM tenant_12.orders LIMIT 772500;
INSERT INTO orders SELECT * FROM tenant_13.orders LIMIT 762000;
INSERT INTO orders SELECT * FROM tenant_14.orders LIMIT 762000;
INSERT INTO orders SELECT * FROM tenant_15.orders LIMIT 750000;
INSERT INTO orders SELECT * FROM tenant_16.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_17.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_18.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_19.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_20.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_21.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_22.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_23.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_24.orders LIMIT 1500000;
INSERT INTO orders SELECT * FROM tenant_25.orders LIMIT 1500000;
                   
-- ---------------------------------------------------------------- finnished copying table orders to public schema                      




INSERT INTO lineitem SELECT * FROM tenant_1.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_2.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_3.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_4.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_5.lineitem LIMIT 3137473;
INSERT INTO lineitem SELECT * FROM tenant_6.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_7.lineitem LIMIT 4074440;
INSERT INTO lineitem SELECT * FROM tenant_8.lineitem LIMIT 3702988;
INSERT INTO lineitem SELECT * FROM tenant_9.lineitem LIMIT 3924614;
INSERT INTO lineitem SELECT * FROM tenant_10.lineitem LIMIT 3420176;
INSERT INTO lineitem SELECT * FROM tenant_11.lineitem LIMIT 3197835;
INSERT INTO lineitem SELECT * FROM tenant_12.lineitem LIMIT 3089740;
INSERT INTO lineitem SELECT * FROM tenant_13.lineitem LIMIT 3047615;
INSERT INTO lineitem SELECT * FROM tenant_14.lineitem LIMIT 3047615;
INSERT INTO lineitem SELECT * FROM tenant_15.lineitem LIMIT 2999671;
INSERT INTO lineitem SELECT * FROM tenant_16.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_17.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_18.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_19.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_20.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_21.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_22.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_23.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_24.lineitem LIMIT 6001215;
INSERT INTO lineitem SELECT * FROM tenant_25.lineitem LIMIT 6001215;
                   
-- ---------------------------------------------------------------- finnished copying table lineitem to public schema                      




-- Create the Tenants table
CREATE TABLE Tenants (
    t_tenant_id INTEGER PRIMARY KEY,
    t_Name VARCHAR(50) NOT NULL
);
INSERT INTO Tenants (t_tenant_id, t_Name) VALUES 

(1, 'tenant_1'),
(2, 'tenant_2'),
(3, 'tenant_3'),
(4, 'tenant_4'),
(5, 'tenant_5'),
(6, 'tenant_6'),
(7, 'tenant_7'),
(8, 'tenant_8'),
(9, 'tenant_9'),
(10, 'tenant_10'),
(11, 'tenant_11'),
(12, 'tenant_12'),
(13, 'tenant_13'),
(14, 'tenant_14'),
(15, 'tenant_15'),
(16, 'tenant_16'),
(17, 'tenant_17'),
(18, 'tenant_18'),
(19, 'tenant_19'),
(20, 'tenant_20'),
(21, 'tenant_21'),
(22, 'tenant_22'),
(23, 'tenant_23'),
(24, 'tenant_24'),
(25, 'tenant_25');
