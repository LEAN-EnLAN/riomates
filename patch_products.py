import re

with open('src/data/products.ts', 'r') as f:
    content = f.read()

# Update images array for each product
content = re.sub(
    r'slug: "torpedo-crudo",\s*name: "Torpedo Crudo",[\s\S]*?images: \[[\s\S]*?\],',
    lambda m: m.group(0).replace('"/images/products/mate-cuero-oscuro-solo.jpeg"', '"/images/products/catalog/torpedo-crudo-virola-lacre.png"'),
    content
)

content = re.sub(
    r'slug: "torpedo-criollo",\s*name: "Torpedo Criollo",[\s\S]*?images: \[[\s\S]*?\],',
    lambda m: m.group(0).replace('"/images/products/mate-encuentro-bombilla.jpeg"', '"/images/products/catalog/torpedo-criollo-crudo.png"'),
    content
)

content = re.sub(
    r'slug: "imperial-crudo",\s*name: "Imperial Crudo",[\s\S]*?images: \[[\s\S]*?\],',
    lambda m: m.group(0).replace('"/images/products/mate-parana-patas-doradas.jpeg"', '"/images/products/catalog/imperial-crudo-base-alpaca.png"'),
    content
)

content = re.sub(
    r'slug: "criollo",\s*name: "Criollo",[\s\S]*?images: \[[\s\S]*?\],',
    lambda m: m.group(0).replace('"/images/products/mate-madera-silver.jpeg"', '"/images/products/catalog/criollo-base-cosida.png"'),
    content
)

content = re.sub(
    r'slug: "imperial-algarrobo",\s*name: "Imperial de Algarrobo",[\s\S]*?images: \[[\s\S]*?\],',
    lambda m: m.group(0).replace('"/images/products/mates-madera-duo.jpeg"', '"/images/products/catalog/imperial-algarrobo-virola.png"'),
    content
)

# Also check prices just to be sure
# torpedo-crudo: 50000 -> correct
# torpedo-criollo: 55000 -> correct
# imperial-crudo: 50000 -> correct
# criollo: 22000 -> correct
# imperial-algarrobo: 22000 -> correct

# Add the bombillón to the end of the array before "];"
bombillon = """  {
    slug: "bombillon-alpaca",
    name: "Bombillón de Alpaca",
    edition: "Cincelado con Pico y Aro de Bronce",
    price: 27000,
    shortDescription:
      "Bombillón de alpaca cincelado a mano, con pico y aro de bronce. El compañero perfecto para tus mates RioMates.",
    fullDescription:
      "El Bombillón de Alpaca es la pieza complementaria ideal para nuestros mates. Cincelado a mano, con pico y aro de bronce, combina la resistencia de la alpaca con la elegancia del bronce.",
    storyTitle: "El compañero perfecto",
    story: `Un buen mate necesita una buena bombilla. El Bombillón de Alpaca nació para acompañar nuestras piezas más exclusivas.
    
Cada bombillón es cincelado a mano, dándole una textura única que además facilita el agarre. El pico de bronce no solo es un detalle estético, sino que aporta durabilidad y confort al tomar.`,
    craftSections: [
      {
        title: "Alpaca maciza",
        text: "Fabricado en alpaca de alta calidad, garantizando durabilidad y resistencia al uso diario.",
      },
      {
        title: "Cincelado a mano",
        text: "El cuerpo es cincelado artesanalmente, creando una textura que lo hace único y mejora el agarre.",
      },
    ],
    ritualGuide: [
      {
        step: "01",
        title: "Limpieza profunda",
        description: "Herví la bombilla periódicamente con agua y bicarbonato para mantenerla impecable.",
      },
      {
        step: "02",
        title: "Posicionamiento",
        description: "Una vez colocada en el mate, no la muevas para no lavar la yerba.",
      },
      {
        step: "03",
        title: "Disfrutá",
        description: "El flujo perfecto para cada sorbo.",
      },
    ],
    details: [
      { label: "Tipo", value: "Bombillón" },
      { label: "Material", value: "Alpaca, pico y aro de bronce" },
      { label: "Origen", value: "Rosario, Santa Fe" },
      { label: "Cuidado", value: "Limpiar regularmente, hervir mensualmente." },
      { label: "Entrega", value: "Rosario: 24-48hs. Interior: 5-7 días." },
    ],
    images: [
      "/images/products/catalog/bombillon-alpaca-cincelado.png",
    ],
    whatsappMessage: "Hola! Me interesa el Bombillón de Alpaca — Cincelado con Pico y Aro de Bronce",
  },
"""

content = content.replace("];", bombillon + "];")

with open('src/data/products.ts', 'w') as f:
    f.write(content)

print("Patched products.ts")
