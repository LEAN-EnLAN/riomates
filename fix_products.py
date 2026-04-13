with open('src/data/products.ts', 'r') as f:
    text = f.read()

names = [
    "torpedo-crudo-virola-lacre",
    "torpedo-criollo-crudo",
    "imperial-crudo-base-alpaca",
    "criollo-base-cosida",
    "imperial-algarrobo-virola",
    "bombillon-alpaca-cincelado"
]

for n in names:
    old = f'"/images/products/catalog/{n}.png"'
    new = f'"/images/products/catalog/{n}-left.png",\n      "/images/products/catalog/{n}-right.png"'
    text = text.replace(old, new)

with open('src/data/products.ts', 'w') as f:
    f.write(text)

print("Fixed images in products.ts")
