# extract_embedded_images.py
import fitz
import os

pdf_path = "Pham Thi Van Anh_Portfolio.pdf"
doc = fitz.open(pdf_path)
out_dir = "embedded_images"
os.makedirs(out_dir, exist_ok=True)

count = 0
for page_index in range(len(doc)):
    for img in doc.get_page_images(page_index):
        xref = img[0]
        base = doc.extract_image(xref)
        image_bytes = base["image"]
        ext = base["ext"]
        filename = f"{out_dir}/page{page_index+1}_{xref}.{ext}"
        with open(filename, "wb") as f:
            f.write(image_bytes)
        count += 1

print(f"Extracted {count} embedded images")