from supabase import create_client

from src.models import Job


def insert_job(job: Job):
    from src.main import settings

    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    return client.table("jobs").insert(job.model_dump(mode="json")).execute()


def list_jobs_from_db() -> list[dict]:
    from src.main import settings

    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    res = client.table("jobs").select("*").execute()
    return res.data if res.data else []
