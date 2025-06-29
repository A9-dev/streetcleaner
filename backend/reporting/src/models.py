from decimal import Decimal
from enum import Enum
from typing import Annotated

from pydantic import BaseModel, Field, HttpUrl


class GPSLocation(BaseModel):
    lat: Annotated[
        Decimal, Field(ge=-90, le=90, description="Latitude between -90 and 90")
    ]
    lon: Annotated[
        Decimal, Field(ge=-180, le=180, description="Longitude between -180 and 180")
    ]


class JobStatus(Enum):
    OPEN = "open"
    CLAIMED = "claimed"  # Stretch goal
    RESOLVED = "resolved"
    VERIFIED = "verified"  # Stretch goal


class Job(BaseModel):
    reporter_id: str
    job_type: str
    description: str
    image: HttpUrl
    location: GPSLocation
    status: JobStatus
    resolver_id: str | None = None
    proof_image: HttpUrl | None = None
    validators: list[str] | None = None
    staked_users: list[str] = []
