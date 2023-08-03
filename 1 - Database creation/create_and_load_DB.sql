DO
$$
    DECLARE
        tenant_name text;
    BEGIN
        FOR i IN 1..25 LOOP
            tenant_name := 'tenant_' || i;

            EXECUTE format('CREATE SCHEMA %I;', tenant_name);

            EXECUTE format('CREATE TABLE %I.NATION(
                            N_NATIONKEY INTEGER  NOT NULL,
                            N_NAME      CHAR(25) NOT NULL,
                            N_REGIONKEY INTEGER  NOT NULL,
                            N_COMMENT   VARCHAR(152)
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table NATION for %', tenant_name;

            EXECUTE format('CREATE TABLE %I.REGION(
                            R_REGIONKEY INTEGER  NOT NULL,
                            R_NAME      CHAR(25) NOT NULL,
                            R_COMMENT   VARCHAR(152)
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table REGION for %', tenant_name;

            EXECUTE format('CREATE TABLE %I.PART(
                            P_PARTKEY     INTEGER        NOT NULL,
                            P_NAME        VARCHAR(55)    NOT NULL,
                            P_MFGR        CHAR(25)       NOT NULL,
                            P_BRAND       CHAR(10)       NOT NULL,
                            P_TYPE        VARCHAR(25)    NOT NULL,
                            P_SIZE        INTEGER        NOT NULL,
                            P_CONTAINER   CHAR(10)       NOT NULL,
                            P_RETAILPRICE DECIMAL(15, 2) NOT NULL,
                            P_COMMENT     VARCHAR(23)    NOT NULL
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table PART for %', tenant_name;

            EXECUTE format('CREATE TABLE %I.SUPPLIER(
                            S_SUPPKEY   INTEGER        NOT NULL,
                            S_NAME      CHAR(25)       NOT NULL,
                            S_ADDRESS   VARCHAR(40)    NOT NULL,
                            S_NATIONKEY INTEGER        NOT NULL,
                            S_PHONE     CHAR(15)       NOT NULL,
                            S_ACCTBAL   DECIMAL(15, 2) NOT NULL,
                            S_COMMENT   VARCHAR(101)   NOT NULL
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table SUPPLIER for %', tenant_name;

            EXECUTE format('CREATE TABLE %I.PARTSUPP(
                            PS_PARTKEY    INTEGER        NOT NULL,
                            PS_SUPPKEY    INTEGER        NOT NULL,
                            PS_AVAILQTY   INTEGER        NOT NULL,
                            PS_SUPPLYCOST DECIMAL(15, 2) NOT NULL,
                            PS_COMMENT    VARCHAR(199)   NOT NULL
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table PARTSUPP for %', tenant_name;

            EXECUTE format('CREATE TABLE %I.CUSTOMER(
                            C_CUSTKEY    INTEGER        NOT NULL,
                            C_NAME       VARCHAR(25)    NOT NULL,
                            C_ADDRESS    VARCHAR(40)    NOT NULL,
                            C_NATIONKEY  INTEGER        NOT NULL,
                            C_PHONE      CHAR(15)       NOT NULL,
                            C_ACCTBAL    DECIMAL(15, 2) NOT NULL,
                            C_MKTSEGMENT CHAR(10)       NOT NULL,
                            C_COMMENT    VARCHAR(117)   NOT NULL
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table CUSTOMER for %', tenant_name;

            EXECUTE format('CREATE TABLE %I.ORDERS(
                            O_ORDERKEY      INTEGER        NOT NULL,
                            O_CUSTKEY       INTEGER        NOT NULL,
                            O_ORDERSTATUS   CHAR(1)        NOT NULL,
                            O_TOTALPRICE    DECIMAL(15, 2) NOT NULL,
                            O_ORDERDATE     DATE           NOT NULL,
                            O_ORDERPRIORITY CHAR(15)       NOT NULL,
                            O_CLERK         CHAR(15)       NOT NULL,
                            O_SHIPPRIORITY  INTEGER        NOT NULL,
                            O_COMMENT       VARCHAR(79)    NOT NULL
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table ORDERS for %', tenant_name;

            EXECUTE format('CREATE TABLE %I.LINEITEM(
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
                            L_COMMENT       VARCHAR(44)    NOT NULL
                        );', tenant_name);

            RAISE NOTICE '--------------------------------------------------- created table LINEITEM for %', tenant_name;

            EXECUTE format('ALTER TABLE %I.REGION ADD PRIMARY KEY (R_REGIONKEY);', tenant_name);
            EXECUTE format('ALTER TABLE %I.NATION ADD PRIMARY KEY (N_NATIONKEY);', tenant_name);
            EXECUTE format('ALTER TABLE %I.CUSTOMER ADD PRIMARY KEY (C_CUSTKEY);', tenant_name);
            EXECUTE format('ALTER TABLE %I.SUPPLIER ADD PRIMARY KEY (S_SUPPKEY);', tenant_name);
            EXECUTE format('ALTER TABLE %I.PART ADD PRIMARY KEY (P_PARTKEY);', tenant_name);
            EXECUTE format('ALTER TABLE %I.PARTSUPP ADD PRIMARY KEY (PS_PARTKEY, PS_SUPPKEY);', tenant_name);
            EXECUTE format('ALTER TABLE %I.ORDERS ADD PRIMARY KEY (O_ORDERKEY);', tenant_name);
            EXECUTE format('ALTER TABLE %I.LINEITEM ADD PRIMARY KEY (L_ORDERKEY, L_LINENUMBER);', tenant_name);


            EXECUTE format('ALTER TABLE %I.NATION ADD FOREIGN KEY (N_REGIONKEY) REFERENCES %I.REGION(R_REGIONKEY);', tenant_name, tenant_name);
            EXECUTE format('ALTER TABLE %I.SUPPLIER ADD FOREIGN KEY (S_NATIONKEY) REFERENCES %I.NATION(N_NATIONKEY);', tenant_name, tenant_name);
            EXECUTE format('ALTER TABLE %I.CUSTOMER ADD FOREIGN KEY (C_NATIONKEY) REFERENCES %I.NATION(N_NATIONKEY);', tenant_name, tenant_name);
            EXECUTE format('ALTER TABLE %I.PARTSUPP ADD FOREIGN KEY (PS_SUPPKEY) REFERENCES %I.SUPPLIER(S_SUPPKEY);', tenant_name, tenant_name);
            EXECUTE format('ALTER TABLE %I.PARTSUPP ADD FOREIGN KEY (PS_PARTKEY) REFERENCES %I.PART(P_PARTKEY);', tenant_name, tenant_name);
            EXECUTE format('ALTER TABLE %I.ORDERS ADD FOREIGN KEY (O_CUSTKEY) REFERENCES %I.CUSTOMER(C_CUSTKEY);', tenant_name, tenant_name);
            EXECUTE format('ALTER TABLE %I.LINEITEM ADD FOREIGN KEY (L_ORDERKEY) REFERENCES %I.ORDERS(O_ORDERKEY);', tenant_name, tenant_name);
            EXECUTE format('ALTER TABLE %I.LINEITEM ADD FOREIGN KEY (L_PARTKEY,L_SUPPKEY) REFERENCES %I.PARTSUPP(PS_PARTKEY,PS_SUPPKEY);', tenant_name, tenant_name);

            RAISE NOTICE '--------------------------------------------------- Tenant % created successfully.', tenant_name;

            END LOOP;
    END
$$;
COPY tenant_1.region FROM '/home/postgres/table_files/tenant_1/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_1';
END $$;

COPY tenant_1.nation FROM '/home/postgres/table_files/tenant_1/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_1';
END $$;

COPY tenant_1.customer FROM '/home/postgres/table_files/tenant_1/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_1';
END $$;

COPY tenant_1.orders FROM '/home/postgres/table_files/tenant_1/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_1';
END $$;

COPY tenant_1.part FROM '/home/postgres/table_files/tenant_1/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_1';
END $$;

COPY tenant_1.supplier FROM '/home/postgres/table_files/tenant_1/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_1';
END $$;

COPY tenant_1.partsupp FROM '/home/postgres/table_files/tenant_1/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_1';
END $$;

COPY tenant_1.lineitem FROM '/home/postgres/table_files/tenant_1/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_1';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_1';
END $$;


COPY tenant_2.region FROM '/home/postgres/table_files/tenant_2/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_2';
END $$;

COPY tenant_2.nation FROM '/home/postgres/table_files/tenant_2/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_2';
END $$;

COPY tenant_2.customer FROM '/home/postgres/table_files/tenant_2/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_2';
END $$;

COPY tenant_2.orders FROM '/home/postgres/table_files/tenant_2/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_2';
END $$;

COPY tenant_2.part FROM '/home/postgres/table_files/tenant_2/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_2';
END $$;

COPY tenant_2.supplier FROM '/home/postgres/table_files/tenant_2/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_2';
END $$;

COPY tenant_2.partsupp FROM '/home/postgres/table_files/tenant_2/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_2';
END $$;

COPY tenant_2.lineitem FROM '/home/postgres/table_files/tenant_2/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_2';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_2';
END $$;


COPY tenant_3.region FROM '/home/postgres/table_files/tenant_3/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_3';
END $$;

COPY tenant_3.nation FROM '/home/postgres/table_files/tenant_3/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_3';
END $$;

COPY tenant_3.customer FROM '/home/postgres/table_files/tenant_3/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_3';
END $$;

COPY tenant_3.orders FROM '/home/postgres/table_files/tenant_3/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_3';
END $$;

COPY tenant_3.part FROM '/home/postgres/table_files/tenant_3/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_3';
END $$;

COPY tenant_3.supplier FROM '/home/postgres/table_files/tenant_3/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_3';
END $$;

COPY tenant_3.partsupp FROM '/home/postgres/table_files/tenant_3/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_3';
END $$;

COPY tenant_3.lineitem FROM '/home/postgres/table_files/tenant_3/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_3';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_3';
END $$;


COPY tenant_4.region FROM '/home/postgres/table_files/tenant_4/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_4';
END $$;

COPY tenant_4.nation FROM '/home/postgres/table_files/tenant_4/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_4';
END $$;

COPY tenant_4.customer FROM '/home/postgres/table_files/tenant_4/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_4';
END $$;

COPY tenant_4.orders FROM '/home/postgres/table_files/tenant_4/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_4';
END $$;

COPY tenant_4.part FROM '/home/postgres/table_files/tenant_4/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_4';
END $$;

COPY tenant_4.supplier FROM '/home/postgres/table_files/tenant_4/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_4';
END $$;

COPY tenant_4.partsupp FROM '/home/postgres/table_files/tenant_4/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_4';
END $$;

COPY tenant_4.lineitem FROM '/home/postgres/table_files/tenant_4/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_4';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_4';
END $$;


COPY tenant_5.region FROM '/home/postgres/table_files/tenant_5/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_5';
END $$;

COPY tenant_5.nation FROM '/home/postgres/table_files/tenant_5/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_5';
END $$;

COPY tenant_5.customer FROM '/home/postgres/table_files/tenant_5/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_5';
END $$;

COPY tenant_5.orders FROM '/home/postgres/table_files/tenant_5/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_5';
END $$;

COPY tenant_5.part FROM '/home/postgres/table_files/tenant_5/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_5';
END $$;

COPY tenant_5.supplier FROM '/home/postgres/table_files/tenant_5/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_5';
END $$;

COPY tenant_5.partsupp FROM '/home/postgres/table_files/tenant_5/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_5';
END $$;

COPY tenant_5.lineitem FROM '/home/postgres/table_files/tenant_5/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_5';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_5';
END $$;


COPY tenant_6.region FROM '/home/postgres/table_files/tenant_6/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_6';
END $$;

COPY tenant_6.nation FROM '/home/postgres/table_files/tenant_6/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_6';
END $$;

COPY tenant_6.customer FROM '/home/postgres/table_files/tenant_6/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_6';
END $$;

COPY tenant_6.orders FROM '/home/postgres/table_files/tenant_6/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_6';
END $$;

COPY tenant_6.part FROM '/home/postgres/table_files/tenant_6/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_6';
END $$;

COPY tenant_6.supplier FROM '/home/postgres/table_files/tenant_6/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_6';
END $$;

COPY tenant_6.partsupp FROM '/home/postgres/table_files/tenant_6/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_6';
END $$;

COPY tenant_6.lineitem FROM '/home/postgres/table_files/tenant_6/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_6';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_6';
END $$;


COPY tenant_7.region FROM '/home/postgres/table_files/tenant_7/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_7';
END $$;

COPY tenant_7.nation FROM '/home/postgres/table_files/tenant_7/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_7';
END $$;

COPY tenant_7.customer FROM '/home/postgres/table_files/tenant_7/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_7';
END $$;

COPY tenant_7.orders FROM '/home/postgres/table_files/tenant_7/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_7';
END $$;

COPY tenant_7.part FROM '/home/postgres/table_files/tenant_7/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_7';
END $$;

COPY tenant_7.supplier FROM '/home/postgres/table_files/tenant_7/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_7';
END $$;

COPY tenant_7.partsupp FROM '/home/postgres/table_files/tenant_7/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_7';
END $$;

COPY tenant_7.lineitem FROM '/home/postgres/table_files/tenant_7/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_7';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_7';
END $$;


COPY tenant_8.region FROM '/home/postgres/table_files/tenant_8/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_8';
END $$;

COPY tenant_8.nation FROM '/home/postgres/table_files/tenant_8/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_8';
END $$;

COPY tenant_8.customer FROM '/home/postgres/table_files/tenant_8/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_8';
END $$;

COPY tenant_8.orders FROM '/home/postgres/table_files/tenant_8/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_8';
END $$;

COPY tenant_8.part FROM '/home/postgres/table_files/tenant_8/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_8';
END $$;

COPY tenant_8.supplier FROM '/home/postgres/table_files/tenant_8/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_8';
END $$;

COPY tenant_8.partsupp FROM '/home/postgres/table_files/tenant_8/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_8';
END $$;

COPY tenant_8.lineitem FROM '/home/postgres/table_files/tenant_8/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_8';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_8';
END $$;


COPY tenant_9.region FROM '/home/postgres/table_files/tenant_9/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_9';
END $$;

COPY tenant_9.nation FROM '/home/postgres/table_files/tenant_9/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_9';
END $$;

COPY tenant_9.customer FROM '/home/postgres/table_files/tenant_9/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_9';
END $$;

COPY tenant_9.orders FROM '/home/postgres/table_files/tenant_9/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_9';
END $$;

COPY tenant_9.part FROM '/home/postgres/table_files/tenant_9/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_9';
END $$;

COPY tenant_9.supplier FROM '/home/postgres/table_files/tenant_9/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_9';
END $$;

COPY tenant_9.partsupp FROM '/home/postgres/table_files/tenant_9/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_9';
END $$;

COPY tenant_9.lineitem FROM '/home/postgres/table_files/tenant_9/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_9';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_9';
END $$;


COPY tenant_10.region FROM '/home/postgres/table_files/tenant_10/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_10';
END $$;

COPY tenant_10.nation FROM '/home/postgres/table_files/tenant_10/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_10';
END $$;

COPY tenant_10.customer FROM '/home/postgres/table_files/tenant_10/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_10';
END $$;

COPY tenant_10.orders FROM '/home/postgres/table_files/tenant_10/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_10';
END $$;

COPY tenant_10.part FROM '/home/postgres/table_files/tenant_10/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_10';
END $$;

COPY tenant_10.supplier FROM '/home/postgres/table_files/tenant_10/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_10';
END $$;

COPY tenant_10.partsupp FROM '/home/postgres/table_files/tenant_10/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_10';
END $$;

COPY tenant_10.lineitem FROM '/home/postgres/table_files/tenant_10/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_10';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_10';
END $$;


COPY tenant_11.region FROM '/home/postgres/table_files/tenant_11/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_11';
END $$;

COPY tenant_11.nation FROM '/home/postgres/table_files/tenant_11/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_11';
END $$;

COPY tenant_11.customer FROM '/home/postgres/table_files/tenant_11/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_11';
END $$;

COPY tenant_11.orders FROM '/home/postgres/table_files/tenant_11/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_11';
END $$;

COPY tenant_11.part FROM '/home/postgres/table_files/tenant_11/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_11';
END $$;

COPY tenant_11.supplier FROM '/home/postgres/table_files/tenant_11/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_11';
END $$;

COPY tenant_11.partsupp FROM '/home/postgres/table_files/tenant_11/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_11';
END $$;

COPY tenant_11.lineitem FROM '/home/postgres/table_files/tenant_11/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_11';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_11';
END $$;


COPY tenant_12.region FROM '/home/postgres/table_files/tenant_12/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_12';
END $$;

COPY tenant_12.nation FROM '/home/postgres/table_files/tenant_12/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_12';
END $$;

COPY tenant_12.customer FROM '/home/postgres/table_files/tenant_12/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_12';
END $$;

COPY tenant_12.orders FROM '/home/postgres/table_files/tenant_12/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_12';
END $$;

COPY tenant_12.part FROM '/home/postgres/table_files/tenant_12/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_12';
END $$;

COPY tenant_12.supplier FROM '/home/postgres/table_files/tenant_12/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_12';
END $$;

COPY tenant_12.partsupp FROM '/home/postgres/table_files/tenant_12/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_12';
END $$;

COPY tenant_12.lineitem FROM '/home/postgres/table_files/tenant_12/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_12';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_12';
END $$;


COPY tenant_13.region FROM '/home/postgres/table_files/tenant_13/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_13';
END $$;

COPY tenant_13.nation FROM '/home/postgres/table_files/tenant_13/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_13';
END $$;

COPY tenant_13.customer FROM '/home/postgres/table_files/tenant_13/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_13';
END $$;

COPY tenant_13.orders FROM '/home/postgres/table_files/tenant_13/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_13';
END $$;

COPY tenant_13.part FROM '/home/postgres/table_files/tenant_13/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_13';
END $$;

COPY tenant_13.supplier FROM '/home/postgres/table_files/tenant_13/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_13';
END $$;

COPY tenant_13.partsupp FROM '/home/postgres/table_files/tenant_13/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_13';
END $$;

COPY tenant_13.lineitem FROM '/home/postgres/table_files/tenant_13/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_13';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_13';
END $$;


COPY tenant_14.region FROM '/home/postgres/table_files/tenant_14/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_14';
END $$;

COPY tenant_14.nation FROM '/home/postgres/table_files/tenant_14/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_14';
END $$;

COPY tenant_14.customer FROM '/home/postgres/table_files/tenant_14/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_14';
END $$;

COPY tenant_14.orders FROM '/home/postgres/table_files/tenant_14/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_14';
END $$;

COPY tenant_14.part FROM '/home/postgres/table_files/tenant_14/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_14';
END $$;

COPY tenant_14.supplier FROM '/home/postgres/table_files/tenant_14/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_14';
END $$;

COPY tenant_14.partsupp FROM '/home/postgres/table_files/tenant_14/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_14';
END $$;

COPY tenant_14.lineitem FROM '/home/postgres/table_files/tenant_14/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_14';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_14';
END $$;


COPY tenant_15.region FROM '/home/postgres/table_files/tenant_15/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_15';
END $$;

COPY tenant_15.nation FROM '/home/postgres/table_files/tenant_15/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_15';
END $$;

COPY tenant_15.customer FROM '/home/postgres/table_files/tenant_15/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_15';
END $$;

COPY tenant_15.orders FROM '/home/postgres/table_files/tenant_15/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_15';
END $$;

COPY tenant_15.part FROM '/home/postgres/table_files/tenant_15/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_15';
END $$;

COPY tenant_15.supplier FROM '/home/postgres/table_files/tenant_15/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_15';
END $$;

COPY tenant_15.partsupp FROM '/home/postgres/table_files/tenant_15/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_15';
END $$;

COPY tenant_15.lineitem FROM '/home/postgres/table_files/tenant_15/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_15';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_15';
END $$;


COPY tenant_16.region FROM '/home/postgres/table_files/tenant_16/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_16';
END $$;

COPY tenant_16.nation FROM '/home/postgres/table_files/tenant_16/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_16';
END $$;

COPY tenant_16.customer FROM '/home/postgres/table_files/tenant_16/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_16';
END $$;

COPY tenant_16.orders FROM '/home/postgres/table_files/tenant_16/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_16';
END $$;

COPY tenant_16.part FROM '/home/postgres/table_files/tenant_16/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_16';
END $$;

COPY tenant_16.supplier FROM '/home/postgres/table_files/tenant_16/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_16';
END $$;

COPY tenant_16.partsupp FROM '/home/postgres/table_files/tenant_16/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_16';
END $$;

COPY tenant_16.lineitem FROM '/home/postgres/table_files/tenant_16/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_16';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_16';
END $$;


COPY tenant_17.region FROM '/home/postgres/table_files/tenant_17/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_17';
END $$;

COPY tenant_17.nation FROM '/home/postgres/table_files/tenant_17/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_17';
END $$;

COPY tenant_17.customer FROM '/home/postgres/table_files/tenant_17/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_17';
END $$;

COPY tenant_17.orders FROM '/home/postgres/table_files/tenant_17/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_17';
END $$;

COPY tenant_17.part FROM '/home/postgres/table_files/tenant_17/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_17';
END $$;

COPY tenant_17.supplier FROM '/home/postgres/table_files/tenant_17/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_17';
END $$;

COPY tenant_17.partsupp FROM '/home/postgres/table_files/tenant_17/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_17';
END $$;

COPY tenant_17.lineitem FROM '/home/postgres/table_files/tenant_17/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_17';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_17';
END $$;


COPY tenant_18.region FROM '/home/postgres/table_files/tenant_18/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_18';
END $$;

COPY tenant_18.nation FROM '/home/postgres/table_files/tenant_18/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_18';
END $$;

COPY tenant_18.customer FROM '/home/postgres/table_files/tenant_18/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_18';
END $$;

COPY tenant_18.orders FROM '/home/postgres/table_files/tenant_18/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_18';
END $$;

COPY tenant_18.part FROM '/home/postgres/table_files/tenant_18/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_18';
END $$;

COPY tenant_18.supplier FROM '/home/postgres/table_files/tenant_18/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_18';
END $$;

COPY tenant_18.partsupp FROM '/home/postgres/table_files/tenant_18/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_18';
END $$;

COPY tenant_18.lineitem FROM '/home/postgres/table_files/tenant_18/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_18';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_18';
END $$;


COPY tenant_19.region FROM '/home/postgres/table_files/tenant_19/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_19';
END $$;

COPY tenant_19.nation FROM '/home/postgres/table_files/tenant_19/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_19';
END $$;

COPY tenant_19.customer FROM '/home/postgres/table_files/tenant_19/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_19';
END $$;

COPY tenant_19.orders FROM '/home/postgres/table_files/tenant_19/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_19';
END $$;

COPY tenant_19.part FROM '/home/postgres/table_files/tenant_19/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_19';
END $$;

COPY tenant_19.supplier FROM '/home/postgres/table_files/tenant_19/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_19';
END $$;

COPY tenant_19.partsupp FROM '/home/postgres/table_files/tenant_19/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_19';
END $$;

COPY tenant_19.lineitem FROM '/home/postgres/table_files/tenant_19/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_19';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_19';
END $$;


COPY tenant_20.region FROM '/home/postgres/table_files/tenant_20/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_20';
END $$;

COPY tenant_20.nation FROM '/home/postgres/table_files/tenant_20/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_20';
END $$;

COPY tenant_20.customer FROM '/home/postgres/table_files/tenant_20/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_20';
END $$;

COPY tenant_20.orders FROM '/home/postgres/table_files/tenant_20/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_20';
END $$;

COPY tenant_20.part FROM '/home/postgres/table_files/tenant_20/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_20';
END $$;

COPY tenant_20.supplier FROM '/home/postgres/table_files/tenant_20/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_20';
END $$;

COPY tenant_20.partsupp FROM '/home/postgres/table_files/tenant_20/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_20';
END $$;

COPY tenant_20.lineitem FROM '/home/postgres/table_files/tenant_20/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_20';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_20';
END $$;


COPY tenant_21.region FROM '/home/postgres/table_files/tenant_21/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_21';
END $$;

COPY tenant_21.nation FROM '/home/postgres/table_files/tenant_21/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_21';
END $$;

COPY tenant_21.customer FROM '/home/postgres/table_files/tenant_21/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_21';
END $$;

COPY tenant_21.orders FROM '/home/postgres/table_files/tenant_21/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_21';
END $$;

COPY tenant_21.part FROM '/home/postgres/table_files/tenant_21/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_21';
END $$;

COPY tenant_21.supplier FROM '/home/postgres/table_files/tenant_21/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_21';
END $$;

COPY tenant_21.partsupp FROM '/home/postgres/table_files/tenant_21/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_21';
END $$;

COPY tenant_21.lineitem FROM '/home/postgres/table_files/tenant_21/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_21';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_21';
END $$;


COPY tenant_22.region FROM '/home/postgres/table_files/tenant_22/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_22';
END $$;

COPY tenant_22.nation FROM '/home/postgres/table_files/tenant_22/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_22';
END $$;

COPY tenant_22.customer FROM '/home/postgres/table_files/tenant_22/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_22';
END $$;

COPY tenant_22.orders FROM '/home/postgres/table_files/tenant_22/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_22';
END $$;

COPY tenant_22.part FROM '/home/postgres/table_files/tenant_22/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_22';
END $$;

COPY tenant_22.supplier FROM '/home/postgres/table_files/tenant_22/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_22';
END $$;

COPY tenant_22.partsupp FROM '/home/postgres/table_files/tenant_22/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_22';
END $$;

COPY tenant_22.lineitem FROM '/home/postgres/table_files/tenant_22/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_22';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_22';
END $$;


COPY tenant_23.region FROM '/home/postgres/table_files/tenant_23/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_23';
END $$;

COPY tenant_23.nation FROM '/home/postgres/table_files/tenant_23/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_23';
END $$;

COPY tenant_23.customer FROM '/home/postgres/table_files/tenant_23/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_23';
END $$;

COPY tenant_23.orders FROM '/home/postgres/table_files/tenant_23/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_23';
END $$;

COPY tenant_23.part FROM '/home/postgres/table_files/tenant_23/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_23';
END $$;

COPY tenant_23.supplier FROM '/home/postgres/table_files/tenant_23/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_23';
END $$;

COPY tenant_23.partsupp FROM '/home/postgres/table_files/tenant_23/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_23';
END $$;

COPY tenant_23.lineitem FROM '/home/postgres/table_files/tenant_23/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_23';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_23';
END $$;


COPY tenant_24.region FROM '/home/postgres/table_files/tenant_24/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_24';
END $$;

COPY tenant_24.nation FROM '/home/postgres/table_files/tenant_24/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_24';
END $$;

COPY tenant_24.customer FROM '/home/postgres/table_files/tenant_24/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_24';
END $$;

COPY tenant_24.orders FROM '/home/postgres/table_files/tenant_24/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_24';
END $$;

COPY tenant_24.part FROM '/home/postgres/table_files/tenant_24/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_24';
END $$;

COPY tenant_24.supplier FROM '/home/postgres/table_files/tenant_24/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_24';
END $$;

COPY tenant_24.partsupp FROM '/home/postgres/table_files/tenant_24/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_24';
END $$;

COPY tenant_24.lineitem FROM '/home/postgres/table_files/tenant_24/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_24';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_24';
END $$;


COPY tenant_25.region FROM '/home/postgres/table_files/tenant_25/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_25';
END $$;

COPY tenant_25.nation FROM '/home/postgres/table_files/tenant_25/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_25';
END $$;

COPY tenant_25.customer FROM '/home/postgres/table_files/tenant_25/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_25';
END $$;

COPY tenant_25.orders FROM '/home/postgres/table_files/tenant_25/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_25';
END $$;

COPY tenant_25.part FROM '/home/postgres/table_files/tenant_25/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_25';
END $$;

COPY tenant_25.supplier FROM '/home/postgres/table_files/tenant_25/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_25';
END $$;

COPY tenant_25.partsupp FROM '/home/postgres/table_files/tenant_25/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_25';
END $$;

COPY tenant_25.lineitem FROM '/home/postgres/table_files/tenant_25/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_25';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_25';
END $$;
