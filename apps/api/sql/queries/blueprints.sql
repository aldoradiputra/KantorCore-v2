-- name: GetBlueprints :many
SELECT id, name, schema_def, ui_layout
FROM "AppBlueprint"
WHERE tenant_id = $1
ORDER BY created_at DESC;

-- name: GetBlueprintByID :one
SELECT id, tenant_id, name, schema_def, ui_layout, created_at
FROM "AppBlueprint"
WHERE id = $1 AND tenant_id = $2;

-- name: CreateBlueprint :one
INSERT INTO "AppBlueprint" (tenant_id, name, schema_def, ui_layout)
VALUES ($1, $2, $3, $4)
RETURNING id, tenant_id, name, schema_def, ui_layout, created_at;

-- name: UpdateBlueprint :exec
UPDATE "AppBlueprint"
SET name = $3, schema_def = $4, ui_layout = $5
WHERE id = $1 AND tenant_id = $2;

-- name: DeleteBlueprint :exec
DELETE FROM "AppBlueprint"
WHERE id = $1 AND tenant_id = $2;
