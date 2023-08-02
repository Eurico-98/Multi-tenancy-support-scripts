#!/bin/bash

# run inside /queries folder

queryNumber=1
for variantNumber in {1..440}
do
    ./qgen $queryNumber -s $variantNumber >> Throughput_test_query_set.sql
    queryNumber=$((queryNumber + 1))
    if [ $queryNumber -gt 22 ]; then
        queryNumber=1
    fi
done