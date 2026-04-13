from PIL import Image
import os
import glob
import re

out_dir = "public/images/products/catalog"

for file in glob.glob(f"{out_dir}/*.png"):
    if "-left" in file or "-right" in file:
        continue
    img = Image.open(file)
    w, h = img.size
    
    # Split
    left = img.crop((0, 0, w//2, h))
    right = img.crop((w//2, 0, w, h))
    
    base_name = file.replace(".png", "")
    left.save(f"{base_name}-left.png")
    right.save(f"{base_name}-right.png")
    
    print(f"Split {file}")

