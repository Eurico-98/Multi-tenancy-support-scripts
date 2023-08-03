import os
import shutil
import os

# specify the directory you want to start from
base_dir = './'

# specify the directory you want to copy from
source_dir = './dbgen'

# specify the files you want to copy
files_to_copy = ['dbgen', 'dists.dss']

for i in range(1, 26):
    dir_name = os.path.join(base_dir, f'tenant_{i}')
    os.makedirs(dir_name, exist_ok=True)
    
    # copy specified files
    for file in files_to_copy:
        shutil.copy2(os.path.join(source_dir, file), os.path.join(dir_name, file))


print("Directories and files copied successfully.")
