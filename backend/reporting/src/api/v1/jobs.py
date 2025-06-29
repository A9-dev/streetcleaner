from decimal import Decimal
from math import asin, cos, radians, sin, sqrt

from fastapi import APIRouter, File, Form, Query, UploadFile
from loguru import logger

from src.models import GPSLocation, Job, JobStatus
from src.services import (
    insert_job,
    list_jobs_from_db,
    update_job_status,
    upload_to_supabase,
)

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
        reporter_id=reporter_id,
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


@router.get("/jobs")
async def list_jobs(
    lat: float | None = Query(None),
    lon: float | None = Query(None),
    radius_km: float = Query(0.5),
):
    """
    List all jobs, optionally filtering by location within a specified radius.
    If lat and lon are provided, only jobs within the radius from that point will be returned

    Args:
        lat (float | None): Latitude to filter jobs by.
        lon (float | None): Longitude to filter jobs by.
        radius_km (float): Radius in kilometers to filter jobs by. Default is 0.5 km.
    Returns:
        list[dict]: List of jobs, each represented as a dictionary.
    """
    jobs = list_jobs_from_db()

    def within_radius(job):
        job_lat = float(job["location"]["lat"])
        job_lon = float(job["location"]["lon"])
        dlat = radians(job_lat - lat)
        dlon = radians(job_lon - lon)
        a = (
            sin(dlat / 2) ** 2
            + cos(radians(lat)) * cos(radians(job_lat)) * sin(dlon / 2) ** 2
        )
        return (6371 * 2 * asin(sqrt(a))) <= radius_km

    if lat is not None and lon is not None:
        jobs = [j for j in jobs if within_radius(j)]

    return jobs


@router.post("/resolve")
async def resolve_job(
    job_id: str = Form(...),
    resolver_id: str = Form(...),
    proof_image: UploadFile = File(...),
):
    from src.main import settings

    image_url: str = await upload_to_supabase(
        proof_image.file,
        supabase_url=settings.supabase_url,
        supabase_key=settings.supabase_anon_key,
        bucket_name=settings.supabase_bucket,
    )

    update_job_status(job_id, resolver_id, image_url)
    return {"status": "success"}
