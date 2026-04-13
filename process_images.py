from PIL import Image

img_path = "/tmp/pi-clipboard-f9183af3-72b1-4b45-94a6-80db787b2d8d.png"
img = Image.open(img_path)
w, h = img.size

# Check middle vertical line
middle_x = w // 2
is_line = True
for y in range(0, 314):
    px = img.getpixel((middle_x, y))
    # Checking for dark/black line
    if sum(px[:3]) > 100:
        is_line = False
        break

print(f"Is there a dark line in the middle? {is_line}")
print(f"Middle pixel at y=100: {img.getpixel((middle_x, 100))}")
