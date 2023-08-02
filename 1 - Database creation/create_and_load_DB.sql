DO
$$
    DECLARE
        tenant_name text;
    BEGIN
        FOR i IN 1..5 LOOP
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


COPY tenant_26.region FROM '/home/postgres/table_files/tenant_26/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_26';
END $$;

COPY tenant_26.nation FROM '/home/postgres/table_files/tenant_26/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_26';
END $$;

COPY tenant_26.customer FROM '/home/postgres/table_files/tenant_26/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_26';
END $$;

COPY tenant_26.orders FROM '/home/postgres/table_files/tenant_26/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_26';
END $$;

COPY tenant_26.part FROM '/home/postgres/table_files/tenant_26/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_26';
END $$;

COPY tenant_26.supplier FROM '/home/postgres/table_files/tenant_26/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_26';
END $$;

COPY tenant_26.partsupp FROM '/home/postgres/table_files/tenant_26/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_26';
END $$;

COPY tenant_26.lineitem FROM '/home/postgres/table_files/tenant_26/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_26';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_26';
END $$;


COPY tenant_27.region FROM '/home/postgres/table_files/tenant_27/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_27';
END $$;

COPY tenant_27.nation FROM '/home/postgres/table_files/tenant_27/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_27';
END $$;

COPY tenant_27.customer FROM '/home/postgres/table_files/tenant_27/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_27';
END $$;

COPY tenant_27.orders FROM '/home/postgres/table_files/tenant_27/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_27';
END $$;

COPY tenant_27.part FROM '/home/postgres/table_files/tenant_27/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_27';
END $$;

COPY tenant_27.supplier FROM '/home/postgres/table_files/tenant_27/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_27';
END $$;

COPY tenant_27.partsupp FROM '/home/postgres/table_files/tenant_27/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_27';
END $$;

COPY tenant_27.lineitem FROM '/home/postgres/table_files/tenant_27/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_27';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_27';
END $$;


COPY tenant_28.region FROM '/home/postgres/table_files/tenant_28/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_28';
END $$;

COPY tenant_28.nation FROM '/home/postgres/table_files/tenant_28/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_28';
END $$;

COPY tenant_28.customer FROM '/home/postgres/table_files/tenant_28/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_28';
END $$;

COPY tenant_28.orders FROM '/home/postgres/table_files/tenant_28/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_28';
END $$;

COPY tenant_28.part FROM '/home/postgres/table_files/tenant_28/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_28';
END $$;

COPY tenant_28.supplier FROM '/home/postgres/table_files/tenant_28/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_28';
END $$;

COPY tenant_28.partsupp FROM '/home/postgres/table_files/tenant_28/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_28';
END $$;

COPY tenant_28.lineitem FROM '/home/postgres/table_files/tenant_28/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_28';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_28';
END $$;


COPY tenant_29.region FROM '/home/postgres/table_files/tenant_29/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_29';
END $$;

COPY tenant_29.nation FROM '/home/postgres/table_files/tenant_29/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_29';
END $$;

COPY tenant_29.customer FROM '/home/postgres/table_files/tenant_29/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_29';
END $$;

COPY tenant_29.orders FROM '/home/postgres/table_files/tenant_29/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_29';
END $$;

COPY tenant_29.part FROM '/home/postgres/table_files/tenant_29/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_29';
END $$;

COPY tenant_29.supplier FROM '/home/postgres/table_files/tenant_29/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_29';
END $$;

COPY tenant_29.partsupp FROM '/home/postgres/table_files/tenant_29/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_29';
END $$;

COPY tenant_29.lineitem FROM '/home/postgres/table_files/tenant_29/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_29';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_29';
END $$;


COPY tenant_30.region FROM '/home/postgres/table_files/tenant_30/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_30';
END $$;

COPY tenant_30.nation FROM '/home/postgres/table_files/tenant_30/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_30';
END $$;

COPY tenant_30.customer FROM '/home/postgres/table_files/tenant_30/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_30';
END $$;

COPY tenant_30.orders FROM '/home/postgres/table_files/tenant_30/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_30';
END $$;

COPY tenant_30.part FROM '/home/postgres/table_files/tenant_30/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_30';
END $$;

COPY tenant_30.supplier FROM '/home/postgres/table_files/tenant_30/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_30';
END $$;

COPY tenant_30.partsupp FROM '/home/postgres/table_files/tenant_30/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_30';
END $$;

COPY tenant_30.lineitem FROM '/home/postgres/table_files/tenant_30/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_30';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_30';
END $$;


COPY tenant_31.region FROM '/home/postgres/table_files/tenant_31/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_31';
END $$;

COPY tenant_31.nation FROM '/home/postgres/table_files/tenant_31/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_31';
END $$;

COPY tenant_31.customer FROM '/home/postgres/table_files/tenant_31/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_31';
END $$;

COPY tenant_31.orders FROM '/home/postgres/table_files/tenant_31/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_31';
END $$;

COPY tenant_31.part FROM '/home/postgres/table_files/tenant_31/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_31';
END $$;

COPY tenant_31.supplier FROM '/home/postgres/table_files/tenant_31/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_31';
END $$;

COPY tenant_31.partsupp FROM '/home/postgres/table_files/tenant_31/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_31';
END $$;

COPY tenant_31.lineitem FROM '/home/postgres/table_files/tenant_31/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_31';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_31';
END $$;


COPY tenant_32.region FROM '/home/postgres/table_files/tenant_32/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_32';
END $$;

COPY tenant_32.nation FROM '/home/postgres/table_files/tenant_32/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_32';
END $$;

COPY tenant_32.customer FROM '/home/postgres/table_files/tenant_32/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_32';
END $$;

COPY tenant_32.orders FROM '/home/postgres/table_files/tenant_32/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_32';
END $$;

COPY tenant_32.part FROM '/home/postgres/table_files/tenant_32/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_32';
END $$;

COPY tenant_32.supplier FROM '/home/postgres/table_files/tenant_32/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_32';
END $$;

COPY tenant_32.partsupp FROM '/home/postgres/table_files/tenant_32/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_32';
END $$;

COPY tenant_32.lineitem FROM '/home/postgres/table_files/tenant_32/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_32';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_32';
END $$;


COPY tenant_33.region FROM '/home/postgres/table_files/tenant_33/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_33';
END $$;

COPY tenant_33.nation FROM '/home/postgres/table_files/tenant_33/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_33';
END $$;

COPY tenant_33.customer FROM '/home/postgres/table_files/tenant_33/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_33';
END $$;

COPY tenant_33.orders FROM '/home/postgres/table_files/tenant_33/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_33';
END $$;

COPY tenant_33.part FROM '/home/postgres/table_files/tenant_33/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_33';
END $$;

COPY tenant_33.supplier FROM '/home/postgres/table_files/tenant_33/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_33';
END $$;

COPY tenant_33.partsupp FROM '/home/postgres/table_files/tenant_33/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_33';
END $$;

COPY tenant_33.lineitem FROM '/home/postgres/table_files/tenant_33/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_33';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_33';
END $$;


COPY tenant_34.region FROM '/home/postgres/table_files/tenant_34/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_34';
END $$;

COPY tenant_34.nation FROM '/home/postgres/table_files/tenant_34/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_34';
END $$;

COPY tenant_34.customer FROM '/home/postgres/table_files/tenant_34/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_34';
END $$;

COPY tenant_34.orders FROM '/home/postgres/table_files/tenant_34/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_34';
END $$;

COPY tenant_34.part FROM '/home/postgres/table_files/tenant_34/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_34';
END $$;

COPY tenant_34.supplier FROM '/home/postgres/table_files/tenant_34/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_34';
END $$;

COPY tenant_34.partsupp FROM '/home/postgres/table_files/tenant_34/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_34';
END $$;

COPY tenant_34.lineitem FROM '/home/postgres/table_files/tenant_34/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_34';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_34';
END $$;


COPY tenant_35.region FROM '/home/postgres/table_files/tenant_35/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_35';
END $$;

COPY tenant_35.nation FROM '/home/postgres/table_files/tenant_35/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_35';
END $$;

COPY tenant_35.customer FROM '/home/postgres/table_files/tenant_35/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_35';
END $$;

COPY tenant_35.orders FROM '/home/postgres/table_files/tenant_35/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_35';
END $$;

COPY tenant_35.part FROM '/home/postgres/table_files/tenant_35/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_35';
END $$;

COPY tenant_35.supplier FROM '/home/postgres/table_files/tenant_35/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_35';
END $$;

COPY tenant_35.partsupp FROM '/home/postgres/table_files/tenant_35/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_35';
END $$;

COPY tenant_35.lineitem FROM '/home/postgres/table_files/tenant_35/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_35';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_35';
END $$;


COPY tenant_36.region FROM '/home/postgres/table_files/tenant_36/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_36';
END $$;

COPY tenant_36.nation FROM '/home/postgres/table_files/tenant_36/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_36';
END $$;

COPY tenant_36.customer FROM '/home/postgres/table_files/tenant_36/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_36';
END $$;

COPY tenant_36.orders FROM '/home/postgres/table_files/tenant_36/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_36';
END $$;

COPY tenant_36.part FROM '/home/postgres/table_files/tenant_36/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_36';
END $$;

COPY tenant_36.supplier FROM '/home/postgres/table_files/tenant_36/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_36';
END $$;

COPY tenant_36.partsupp FROM '/home/postgres/table_files/tenant_36/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_36';
END $$;

COPY tenant_36.lineitem FROM '/home/postgres/table_files/tenant_36/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_36';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_36';
END $$;


COPY tenant_37.region FROM '/home/postgres/table_files/tenant_37/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_37';
END $$;

COPY tenant_37.nation FROM '/home/postgres/table_files/tenant_37/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_37';
END $$;

COPY tenant_37.customer FROM '/home/postgres/table_files/tenant_37/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_37';
END $$;

COPY tenant_37.orders FROM '/home/postgres/table_files/tenant_37/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_37';
END $$;

COPY tenant_37.part FROM '/home/postgres/table_files/tenant_37/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_37';
END $$;

COPY tenant_37.supplier FROM '/home/postgres/table_files/tenant_37/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_37';
END $$;

COPY tenant_37.partsupp FROM '/home/postgres/table_files/tenant_37/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_37';
END $$;

COPY tenant_37.lineitem FROM '/home/postgres/table_files/tenant_37/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_37';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_37';
END $$;


COPY tenant_38.region FROM '/home/postgres/table_files/tenant_38/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_38';
END $$;

COPY tenant_38.nation FROM '/home/postgres/table_files/tenant_38/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_38';
END $$;

COPY tenant_38.customer FROM '/home/postgres/table_files/tenant_38/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_38';
END $$;

COPY tenant_38.orders FROM '/home/postgres/table_files/tenant_38/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_38';
END $$;

COPY tenant_38.part FROM '/home/postgres/table_files/tenant_38/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_38';
END $$;

COPY tenant_38.supplier FROM '/home/postgres/table_files/tenant_38/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_38';
END $$;

COPY tenant_38.partsupp FROM '/home/postgres/table_files/tenant_38/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_38';
END $$;

COPY tenant_38.lineitem FROM '/home/postgres/table_files/tenant_38/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_38';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_38';
END $$;


COPY tenant_39.region FROM '/home/postgres/table_files/tenant_39/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_39';
END $$;

COPY tenant_39.nation FROM '/home/postgres/table_files/tenant_39/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_39';
END $$;

COPY tenant_39.customer FROM '/home/postgres/table_files/tenant_39/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_39';
END $$;

COPY tenant_39.orders FROM '/home/postgres/table_files/tenant_39/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_39';
END $$;

COPY tenant_39.part FROM '/home/postgres/table_files/tenant_39/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_39';
END $$;

COPY tenant_39.supplier FROM '/home/postgres/table_files/tenant_39/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_39';
END $$;

COPY tenant_39.partsupp FROM '/home/postgres/table_files/tenant_39/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_39';
END $$;

COPY tenant_39.lineitem FROM '/home/postgres/table_files/tenant_39/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_39';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_39';
END $$;


COPY tenant_40.region FROM '/home/postgres/table_files/tenant_40/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_40';
END $$;

COPY tenant_40.nation FROM '/home/postgres/table_files/tenant_40/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_40';
END $$;

COPY tenant_40.customer FROM '/home/postgres/table_files/tenant_40/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_40';
END $$;

COPY tenant_40.orders FROM '/home/postgres/table_files/tenant_40/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_40';
END $$;

COPY tenant_40.part FROM '/home/postgres/table_files/tenant_40/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_40';
END $$;

COPY tenant_40.supplier FROM '/home/postgres/table_files/tenant_40/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_40';
END $$;

COPY tenant_40.partsupp FROM '/home/postgres/table_files/tenant_40/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_40';
END $$;

COPY tenant_40.lineitem FROM '/home/postgres/table_files/tenant_40/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_40';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_40';
END $$;


COPY tenant_41.region FROM '/home/postgres/table_files/tenant_41/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_41';
END $$;

COPY tenant_41.nation FROM '/home/postgres/table_files/tenant_41/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_41';
END $$;

COPY tenant_41.customer FROM '/home/postgres/table_files/tenant_41/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_41';
END $$;

COPY tenant_41.orders FROM '/home/postgres/table_files/tenant_41/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_41';
END $$;

COPY tenant_41.part FROM '/home/postgres/table_files/tenant_41/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_41';
END $$;

COPY tenant_41.supplier FROM '/home/postgres/table_files/tenant_41/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_41';
END $$;

COPY tenant_41.partsupp FROM '/home/postgres/table_files/tenant_41/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_41';
END $$;

COPY tenant_41.lineitem FROM '/home/postgres/table_files/tenant_41/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_41';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_41';
END $$;


COPY tenant_42.region FROM '/home/postgres/table_files/tenant_42/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_42';
END $$;

COPY tenant_42.nation FROM '/home/postgres/table_files/tenant_42/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_42';
END $$;

COPY tenant_42.customer FROM '/home/postgres/table_files/tenant_42/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_42';
END $$;

COPY tenant_42.orders FROM '/home/postgres/table_files/tenant_42/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_42';
END $$;

COPY tenant_42.part FROM '/home/postgres/table_files/tenant_42/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_42';
END $$;

COPY tenant_42.supplier FROM '/home/postgres/table_files/tenant_42/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_42';
END $$;

COPY tenant_42.partsupp FROM '/home/postgres/table_files/tenant_42/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_42';
END $$;

COPY tenant_42.lineitem FROM '/home/postgres/table_files/tenant_42/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_42';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_42';
END $$;


COPY tenant_43.region FROM '/home/postgres/table_files/tenant_43/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_43';
END $$;

COPY tenant_43.nation FROM '/home/postgres/table_files/tenant_43/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_43';
END $$;

COPY tenant_43.customer FROM '/home/postgres/table_files/tenant_43/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_43';
END $$;

COPY tenant_43.orders FROM '/home/postgres/table_files/tenant_43/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_43';
END $$;

COPY tenant_43.part FROM '/home/postgres/table_files/tenant_43/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_43';
END $$;

COPY tenant_43.supplier FROM '/home/postgres/table_files/tenant_43/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_43';
END $$;

COPY tenant_43.partsupp FROM '/home/postgres/table_files/tenant_43/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_43';
END $$;

COPY tenant_43.lineitem FROM '/home/postgres/table_files/tenant_43/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_43';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_43';
END $$;


COPY tenant_44.region FROM '/home/postgres/table_files/tenant_44/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_44';
END $$;

COPY tenant_44.nation FROM '/home/postgres/table_files/tenant_44/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_44';
END $$;

COPY tenant_44.customer FROM '/home/postgres/table_files/tenant_44/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_44';
END $$;

COPY tenant_44.orders FROM '/home/postgres/table_files/tenant_44/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_44';
END $$;

COPY tenant_44.part FROM '/home/postgres/table_files/tenant_44/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_44';
END $$;

COPY tenant_44.supplier FROM '/home/postgres/table_files/tenant_44/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_44';
END $$;

COPY tenant_44.partsupp FROM '/home/postgres/table_files/tenant_44/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_44';
END $$;

COPY tenant_44.lineitem FROM '/home/postgres/table_files/tenant_44/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_44';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_44';
END $$;


COPY tenant_45.region FROM '/home/postgres/table_files/tenant_45/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_45';
END $$;

COPY tenant_45.nation FROM '/home/postgres/table_files/tenant_45/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_45';
END $$;

COPY tenant_45.customer FROM '/home/postgres/table_files/tenant_45/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_45';
END $$;

COPY tenant_45.orders FROM '/home/postgres/table_files/tenant_45/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_45';
END $$;

COPY tenant_45.part FROM '/home/postgres/table_files/tenant_45/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_45';
END $$;

COPY tenant_45.supplier FROM '/home/postgres/table_files/tenant_45/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_45';
END $$;

COPY tenant_45.partsupp FROM '/home/postgres/table_files/tenant_45/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_45';
END $$;

COPY tenant_45.lineitem FROM '/home/postgres/table_files/tenant_45/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_45';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_45';
END $$;


COPY tenant_46.region FROM '/home/postgres/table_files/tenant_46/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_46';
END $$;

COPY tenant_46.nation FROM '/home/postgres/table_files/tenant_46/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_46';
END $$;

COPY tenant_46.customer FROM '/home/postgres/table_files/tenant_46/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_46';
END $$;

COPY tenant_46.orders FROM '/home/postgres/table_files/tenant_46/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_46';
END $$;

COPY tenant_46.part FROM '/home/postgres/table_files/tenant_46/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_46';
END $$;

COPY tenant_46.supplier FROM '/home/postgres/table_files/tenant_46/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_46';
END $$;

COPY tenant_46.partsupp FROM '/home/postgres/table_files/tenant_46/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_46';
END $$;

COPY tenant_46.lineitem FROM '/home/postgres/table_files/tenant_46/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_46';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_46';
END $$;


COPY tenant_47.region FROM '/home/postgres/table_files/tenant_47/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_47';
END $$;

COPY tenant_47.nation FROM '/home/postgres/table_files/tenant_47/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_47';
END $$;

COPY tenant_47.customer FROM '/home/postgres/table_files/tenant_47/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_47';
END $$;

COPY tenant_47.orders FROM '/home/postgres/table_files/tenant_47/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_47';
END $$;

COPY tenant_47.part FROM '/home/postgres/table_files/tenant_47/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_47';
END $$;

COPY tenant_47.supplier FROM '/home/postgres/table_files/tenant_47/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_47';
END $$;

COPY tenant_47.partsupp FROM '/home/postgres/table_files/tenant_47/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_47';
END $$;

COPY tenant_47.lineitem FROM '/home/postgres/table_files/tenant_47/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_47';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_47';
END $$;


COPY tenant_48.region FROM '/home/postgres/table_files/tenant_48/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_48';
END $$;

COPY tenant_48.nation FROM '/home/postgres/table_files/tenant_48/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_48';
END $$;

COPY tenant_48.customer FROM '/home/postgres/table_files/tenant_48/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_48';
END $$;

COPY tenant_48.orders FROM '/home/postgres/table_files/tenant_48/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_48';
END $$;

COPY tenant_48.part FROM '/home/postgres/table_files/tenant_48/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_48';
END $$;

COPY tenant_48.supplier FROM '/home/postgres/table_files/tenant_48/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_48';
END $$;

COPY tenant_48.partsupp FROM '/home/postgres/table_files/tenant_48/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_48';
END $$;

COPY tenant_48.lineitem FROM '/home/postgres/table_files/tenant_48/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_48';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_48';
END $$;


COPY tenant_49.region FROM '/home/postgres/table_files/tenant_49/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_49';
END $$;

COPY tenant_49.nation FROM '/home/postgres/table_files/tenant_49/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_49';
END $$;

COPY tenant_49.customer FROM '/home/postgres/table_files/tenant_49/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_49';
END $$;

COPY tenant_49.orders FROM '/home/postgres/table_files/tenant_49/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_49';
END $$;

COPY tenant_49.part FROM '/home/postgres/table_files/tenant_49/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_49';
END $$;

COPY tenant_49.supplier FROM '/home/postgres/table_files/tenant_49/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_49';
END $$;

COPY tenant_49.partsupp FROM '/home/postgres/table_files/tenant_49/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_49';
END $$;

COPY tenant_49.lineitem FROM '/home/postgres/table_files/tenant_49/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_49';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_49';
END $$;


COPY tenant_50.region FROM '/home/postgres/table_files/tenant_50/region.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying region to tenant_50';
END $$;

COPY tenant_50.nation FROM '/home/postgres/table_files/tenant_50/nation.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying nation to tenant_50';
END $$;

COPY tenant_50.customer FROM '/home/postgres/table_files/tenant_50/customer.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying customer to tenant_50';
END $$;

COPY tenant_50.orders FROM '/home/postgres/table_files/tenant_50/orders.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying orders to tenant_50';
END $$;

COPY tenant_50.part FROM '/home/postgres/table_files/tenant_50/part.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying part to tenant_50';
END $$;

COPY tenant_50.supplier FROM '/home/postgres/table_files/tenant_50/supplier.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying supplier to tenant_50';
END $$;

COPY tenant_50.partsupp FROM '/home/postgres/table_files/tenant_50/partsupp.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying partsupp to tenant_50';
END $$;

COPY tenant_50.lineitem FROM '/home/postgres/table_files/tenant_50/lineitem.tbl' WITH DELIMITER '|';
DO $$ BEGIN
    RAISE NOTICE 'Finished copying lineitem to tenant_50';
END $$;


DO $$ BEGIN
    RAISE NOTICE '####################################### COMPLETED tenant_50';
END $$;