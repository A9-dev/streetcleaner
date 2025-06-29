-- src/schemas/jobs.sql

create extension if not exists "uuid-ossp";

create table if not exists jobs (
    id uuid primary key default uuid_generate_v4(),
    job_type text not null,
    description text not null,
    image text not null,
    location jsonb not null,
    status text not null default 'open',
    reporter_id text not null,
    resolver_id text, -- user who resolved it
    proof_image text, -- image proving the job is resolved
    validators text[], -- user ids who verified the resolution
    staked_users text[] default '{}', -- optional list of users who staked on this job
    created_at timestamp default now()
);
