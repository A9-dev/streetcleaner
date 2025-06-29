from decimal import Decimal

from fastapi import APIRouter, Form, UploadFile
from loguru import logger

from src.models import GPSLocation, Job, JobStatus
from src.services import insert_job, upload_to_supabase

router = APIRouter()


@router.post("/report")
async def create_job(
    image: UploadFile,
    job_type: str = Form(...),
    description: str = Form(...),
    lat: Decimal = Form(...),
    lon: Decimal = Form(...),
    reporter_id: str = Form(...),
):
    """
    Create a new report with provided information, including:
    - Image
    - Job type
    - Location
    """
    from src.main import settings

    image_url: str = await upload_to_supabase(
        image.file,
        supabase_url=settings.supabase_url,
        supabase_key=settings.supabase_anon_key,
        bucket_name=settings.supabase_bucket,
    )

    job = Job(
        job_type=job_type,
        description=description,
        image=image_url,
        location=GPSLocation(lat=lat, lon=lon),
        status=JobStatus.OPEN,
        staked_users=[],
    )

    logger.info(f"Creating job: {job}")
    response = insert_job(job=job)

    logger.info(f"Job created successfully: {response.model_dump(mode='json')}")
