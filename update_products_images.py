import re

with open('src/data/products.ts', 'r') as f:
    content = f.read()

# Replace .png with -left.png", "/images/products/catalog/X-right.png
def replacer(match):
    img = match.group(0)
    if "-left.png" not in img:
        base = img.replace(".png", "")
        return f'{base}-left.png", "{base.replace("images: [\\n      \\"", "")}-right.png'
    return img

content = re.sub(
    r'"/images/products/catalog/.*?\.png"',
    lambda m: m.group(0).replace('.png"', '-left.png", "' + m.group(0).replace('"', '').replace('.png', '-right.png') + '"'),
    content
)

with open('src/data/products.ts', 'w') as f:
    f.write(content)

print("Updated products.ts with left and right images.")
