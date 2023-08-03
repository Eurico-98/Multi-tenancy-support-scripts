#!/bin/bash

# total data size in MB
total_data_size=30000
min_size=500
max_size=2000
num_tenants=25
remaining_size=$total_data_size

# assign random sizes to tenants
for ((i=25; i<=$num_tenants; i++))
do

    if [ $i -eq $num_tenants ]  # for the last tenant assign the remaining size
    then
        size=$remaining_size
    else


        size=$(shuf -i $min_size-$max_size -n 1) # Generate random number between min_size and max_size

        # Check that remaining size will not be less than the number of remaining tenants * min_size after this assignment
        while [ $((remaining_size - size)) -lt $((min_size * (num_tenants - i))) ]
        do
    
            size=$(shuf -i $min_size-$max_size -n 1) # Generate new random number
    
        done
    fi

    remaining_size=$((remaining_size - size))

    # calculate scale factor (rounding up)
    scale_factor=$(echo "scale=3; $size / 1000" | bc)

    echo "Generating data for tenant_$i with size $size MB (scale factor $scale_factor)..."

    # run dbgen in the specific directory
    (cd "ten_$i" && ./dbgen -s "$scale_factor")
done
