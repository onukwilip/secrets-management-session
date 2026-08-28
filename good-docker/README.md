# good-docker

This Dockerfile uses a `.dockerignore` to exclude the `.env` file from the image build context. Secrets are injected at runtime as environment variables, not baked into the image.

## GitHub Actions secrets: okay for pipeline credentials, not for app secrets

GHA secrets are fine for credentials the pipeline itself needs to run (e.g. `GCP_PROJECT_ID`, `WORKLOAD_IDENTITY_PROVIDER`, `SERVICE_ACCOUNT`). For application secrets (database passwords, API keys, etc.), use a dedicated secret manager instead.

### Cons of managing app secrets in GHA secrets

- **No versioning.** There is no history of what a secret was set to, or when it changed. If something breaks after a rotation, you cannot roll back.

- **No fine-grained access control.** By default, every workflow in the repository can read every repository secret. You cannot say "only the deploy workflow can access `DB_PASSWORD`."

- **No audit trail.** GHA does not log which workflow accessed which secret, or when. There is no way to answer "who used this credential and at what time."

- **No automatic rotation.** Secrets sit at the value you set them to indefinitely. Rotation is a fully manual process with no reminders, no enforcement, and no rollback.

- **Secrets are scoped to GitHub.** If you deploy to multiple environments or multiple platforms, you have to duplicate the secret in each place separately. A secret manager gives you one source of truth.

- **No expiry or lifecycle management.** A secret set once stays forever until someone manually deletes it. There is no TTL or expiration policy.

> Keep GHA secrets for: `WORKLOAD_IDENTITY_PROVIDER`, `SERVICE_ACCOUNT`, `GCP_PROJECT_ID`, `GCP_REGION`, `IMAGE_NAME`.
> Move everything else (DB passwords, API keys, tokens) to Google Secret Manager.
