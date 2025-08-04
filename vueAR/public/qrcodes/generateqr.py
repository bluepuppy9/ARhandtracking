import random
import string
import qrcode
from PIL import Image, ImageFilter
import os

# Create output folder
output_folder = "blurred_qr_codes"
os.makedirs(output_folder, exist_ok=True)

for i in range(10):
    # 🦴 Step 1: Generate 70 random alphanumeric characters
    random_data = ''.join(random.choices(string.ascii_letters + string.digits, k=30))

    # 🦴 Step 2: Create QR code (Version 1 is 21x21 incl. border)
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4
    )
    qr.add_data(random_data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

    # 🦴 Step 3: Resize to 2048x2048 for archival glory
    large_img = img.resize((2048, 2048), Image.NEAREST)

    # 🦴 Step 4: Resize to ~200x200 as commanded
    small_img = large_img.resize((200, 200), Image.NEAREST)

    # 🦴 Step 5: Blur with radius 1 to emulate the "image blurer" effect
    blurred_img = small_img.filter(ImageFilter.GaussianBlur(radius=1))

    # 🦴 Step 6: Save the blurred image
    blurred_img.save(f"{output_folder}/qr_200_{i+1:02d}x30.png")

    print(f"Generated QR code {i+1}/10")

# Generate 50 QR codes
for i in range(10):
    # 🦴 Step 1: Generate 70 random alphanumeric characters
    random_data = ''.join(random.choices(string.ascii_letters + string.digits, k=50))

    # 🦴 Step 2: Create QR code (Version 1 is 21x21 incl. border)
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4
    )
    qr.add_data(random_data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

    # 🦴 Step 3: Resize to 2048x2048 for archival glory
    large_img = img.resize((2048, 2048), Image.NEAREST)

    # 🦴 Step 4: Resize to ~200x200 as commanded
    small_img = large_img.resize((200, 200), Image.NEAREST)

    # 🦴 Step 5: Blur with radius 1 to emulate the "image blurer" effect
    blurred_img = small_img.filter(ImageFilter.GaussianBlur(radius=1))

    # 🦴 Step 6: Save the blurred image
    blurred_img.save(f"{output_folder}/qr_200_{i+1:02d}x50.png")

    print(f"Generated QR code {i+1}/10")

for i in range(10):
    # 🦴 Step 1: Generate 70 random alphanumeric characters
    random_data = ''.join(random.choices(string.ascii_letters + string.digits, k=70))

    # 🦴 Step 2: Create QR code (Version 1 is 21x21 incl. border)
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4
    )
    qr.add_data(random_data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

    # 🦴 Step 3: Resize to 2048x2048 for archival glory
    large_img = img.resize((2048, 2048), Image.NEAREST)

    # 🦴 Step 4: Resize to ~200x200 as commanded
    small_img = large_img.resize((200, 200), Image.NEAREST)

    # 🦴 Step 5: Blur with radius 1 to emulate the "image blurer" effect
    blurred_img = small_img.filter(ImageFilter.GaussianBlur(radius=1))

    # 🦴 Step 6: Save the blurred image
    blurred_img.save(f"{output_folder}/qr_200_{i+1:02d}x70.png")

    print(f"Generated QR code {i+1}/10")
for i in range(10):
    # 🦴 Step 1: Generate 70 random alphanumeric characters
    random_data = ''.join(random.choices(string.ascii_letters + string.digits, k=100))

    # 🦴 Step 2: Create QR code (Version 1 is 21x21 incl. border)
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4
    )
    qr.add_data(random_data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

    # 🦴 Step 3: Resize to 2048x2048 for archival glory
    large_img = img.resize((2048, 2048), Image.NEAREST)

    # 🦴 Step 4: Resize to ~200x200 as commanded
    small_img = large_img.resize((200, 200), Image.NEAREST)

    # 🦴 Step 5: Blur with radius 1 to emulate the "image blurer" effect
    blurred_img = small_img.filter(ImageFilter.GaussianBlur(radius=1))

    # 🦴 Step 6: Save the blurred image
    blurred_img.save(f"{output_folder}/qr_200_{i+1:02d}x100.png")

    print(f"Generated QR code {i+1}/10")

# 🦴 Final Toast
print(f"🍷 10 QR codes saved in '{output_folder}' folder with both 2048x2048 and 200x200 blurred versions.")