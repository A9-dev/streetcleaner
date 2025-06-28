"""Handles uploading of image files"""

import inspect
import mimetypes
import uuid
from typing import Protocol

import httpx
from loguru import logger


class AsyncReadable(Protocol):
    async def read(self) -> bytes: ...


async def upload_to_supabase(
    image: AsyncReadable,  # 🔁 was BinaryIO,
    *,
    filename: str | None = None,
    supabase_url: str,
    supabase_key: str,
    bucket_name: str,
) -> str:
    """
    Uploads an image file to Supabase storage and returns the public URL.

    Args:
        image (BinaryIO): The image file to upload.
        filename (str | None): Optional filename (auto-generated if not provided)
        supabase_url (str): Your Supabase project URL (no trailing slash)
        supabase_key (str): Supabase service role key
        bucket_name (str): The storage bucket to upload to

    Returns:
        str: The public URL of the uploaded image.
    """
    # Generate unique filename if not provided
    filename = filename or f"{uuid.uuid4()}.jpg"
    content_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"

    url = f"{supabase_url}/storage/v1/object/{bucket_name}/{filename}"
    headers = {
        "Authorization": f"Bearer {supabase_key}",
        "Content-Type": content_type,
        "x-upsert": "true",
    }

    logger.debug(f"Loading image content for upload: {filename}")
    read = image.read
    if inspect.iscoroutinefunction(read):
        content = await read()
    else:
        content = read()

    logger.debug(f"Uploading {filename} to Supabase storage at {url}")
    async with httpx.AsyncClient() as client:
        res = await client.post(url, headers=headers, content=content)
        res.raise_for_status()

    logger.success(f"Uploaded {filename} to Supabase storage")
    return f"{supabase_url}/storage/v1/object/public/{bucket_name}/{filename}"
