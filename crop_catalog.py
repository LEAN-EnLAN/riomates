from PIL import Image
import os

images = [
    ("/tmp/pi-clipboard-f9183af3-72b1-4b45-94a6-80db787b2d8d.png", "torpedo-crudo-virola-lacre.png"),
    ("/tmp/pi-clipboard-669661c2-47b5-45fb-821a-8f4c84a7e0cb.png", "torpedo-criollo-crudo.png"),
    ("/tmp/pi-clipboard-c07f770d-0f11-4a76-9e4e-eff5c891480e.png", "criollo-base-cosida.png"),
    ("/tmp/pi-clipboard-a36ce3c4-205b-4a1b-a656-f4f619e7f6b0.png", "imperial-crudo-base-alpaca.png"),
    ("/tmp/pi-clipboard-2a2d7ae6-f4fd-4892-a4dc-8f4ef0803976.png", "imperial-algarrobo-virola.png"),
    ("/tmp/pi-clipboard-8c37591a-0480-4242-9504-d98579ebd437.png", "bombillon-alpaca-cincelado.png"),
]

out_dir = "public/images/products/catalog"
os.makedirs(out_dir, exist_ok=True)

for in_path, out_name in images:
    if os.path.exists(in_path):
        img = Image.open(in_path)
        # Crop the top 314 pixels which contains the photos
        # w is 930, we take the full width and top 314 height
        w, h = img.size
        cropped = img.crop((0, 0, w, 314))
        cropped.save(os.path.join(out_dir, out_name))
        print(f"Saved {out_name}")
