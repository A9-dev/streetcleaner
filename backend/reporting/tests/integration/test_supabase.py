import os
import pytest
import httpx
from pathlib import Path
from PIL import Image
from io import BytesIO

from src.services.storage import upload_to_supabase


class FakeUploadFile:
    def __init__(self, file_path: Path):
        self.file_path = file_path

    async def read(self):
        return self.file_path.read_bytes()


@pytest.mark.asyncio
async def test_upload_to_supabase_live():
    # --- Setup test image ---
    test_image_path = Path(__file__).parent / "test_image.jpg"

    if not test_image_path.exists():
        img = Image.new("RGB", (64, 64), color=(255, 0, 0))  # Red square
        buffer = BytesIO()
        img.save(buffer, format="JPEG")
        buffer.seek(0)
        test_image_path.write_bytes(buffer.read())

    assert test_image_path.exists(), "Image file was not created"
    assert test_image_path.stat().st_size > 100, "Image file too small or corrupt"

    upload_file = FakeUploadFile(test_image_path)

    # --- Upload ---
    public_url = await upload_to_supabase(
        upload_file,
        supabase_url=os.getenv("SUPABASE_URL", ""),
        supabase_key=os.getenv("SUPABASE_ANON_KEY", ""),
        bucket_name=os.getenv("SUPABASE_BUCKET", ""),
    )

    assert public_url.startswith("https://"), f"Bad URL: {public_url}"

    # --- Check accessibility ---
    response = httpx.get(public_url)
    assert response.status_code == 200, f"Image not accessible: {response.status_code}"
    assert response.headers["Content-Type"].startswith("image/"), (
        f"Unexpected content-type: {response.headers['Content-Type']}"
    )

    print("✅ Supabase upload test passed:", public_url)
