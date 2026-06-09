-- DDL derived from packages/database/prisma/schema.prisma
-- Run `npx prisma migrate dev --name init` in packages/database to generate
-- the canonical migration. This file keeps sqlc in sync with Prisma's output.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Global Identity
CREATE TABLE "User" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nik         TEXT NOT NULL UNIQUE,
    email       TEXT UNIQUE,
    phone       TEXT UNIQUE,
    full_name   TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Multi-entity hierarchy
CREATE TABLE "Tenant" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'trial',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "Company" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    tax_id      TEXT
);
CREATE INDEX idx_company_tenant ON "Company"(tenant_id);

CREATE TABLE "Branch" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id  UUID NOT NULL REFERENCES "Company"(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    region      TEXT
);
CREATE INDEX idx_branch_company ON "Branch"(company_id);

CREATE TABLE "TenantMember" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    tenant_id   UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    branch_id   UUID REFERENCES "Branch"(id) ON DELETE CASCADE,
    role        TEXT NOT NULL,
    UNIQUE(user_id, branch_id)
);
CREATE INDEX idx_member_tenant_user ON "TenantMember"(tenant_id, user_id);

-- 3. Dynamic Apps (Meta-Schema Platform)
CREATE TABLE "AppBlueprint" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    schema_def  JSONB NOT NULL DEFAULT '{}',
    ui_layout   JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_blueprint_tenant ON "AppBlueprint"(tenant_id);

CREATE TABLE "AppRecord" (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blueprint_id  UUID NOT NULL REFERENCES "AppBlueprint"(id) ON DELETE CASCADE,
    branch_id     UUID NOT NULL REFERENCES "Branch"(id) ON DELETE CASCADE,
    created_by    UUID NOT NULL REFERENCES "User"(id),
    data          JSONB NOT NULL DEFAULT '{}',
    search_vector TSVECTOR,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_record_branch_blueprint ON "AppRecord"(branch_id, blueprint_id);
CREATE INDEX idx_record_search ON "AppRecord" USING GIN(search_vector);

-- 4. Chat
CREATE TABLE "ChatChannel" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    branch_id   UUID NOT NULL REFERENCES "Branch"(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    type        TEXT NOT NULL
);
CREATE INDEX idx_channel_branch ON "ChatChannel"(branch_id);

CREATE TABLE "ChatMessage" (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id        UUID NOT NULL REFERENCES "ChatChannel"(id) ON DELETE CASCADE,
    sender_id         UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    content           TEXT NOT NULL,
    is_system_event   BOOLEAN NOT NULL DEFAULT false,
    linked_record_id  UUID REFERENCES "AppRecord"(id) ON DELETE SET NULL,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_message_channel_time ON "ChatMessage"(channel_id, created_at);

-- 5. Pulse (CQRS Activity Feed)
CREATE TABLE "PulseEvent" (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES "Tenant"(id) ON DELETE CASCADE,
    branch_id   UUID,
    actor_type  TEXT NOT NULL,
    actor_id    UUID,
    actor_name  TEXT NOT NULL,
    event_topic TEXT NOT NULL,
    description TEXT NOT NULL,
    target_name TEXT NOT NULL,
    target_url  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_pulse_tenant_time ON "PulseEvent"(tenant_id, created_at DESC);
