# extract_img.py
import fitz
import os

pdf_path = "Pham Thi Van Anh_Portfolio.pdf"
out_dir = "extracted_images"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pix.save(f"{out_dir}/page_{i+1:02d}.png")

print(f"Saved {len(doc)} pages to {out_dir}")