# secrets-demo

Demo repository for the Google Developers Group session: **Secrets Management with Google Secret Manager**.

## Structure

```
secrets-demo/
├── bad-server/         # Secrets hardcoded directly in source code
├── good-server/        # Secrets read from environment variables
├── bad-docker/         # Dockerfile with no .dockerignore (.env gets copied into image)
├── good-docker/        # Dockerfile with .dockerignore (.env excluded from image)
└── .github/workflows/
    ├── trivy-scan.yml          # Builds bad-docker image, fails if secrets found in filesystem
    ├── deploy-gha-secrets.yml  # Deploys to Cloud Run injecting secrets from GHA secrets
    └── deploy-gsm.yml          # Deploys to Cloud Run referencing secrets from GSM
```

## GHA secrets required

| Secret | Used by |
|--------|---------|
| `GCP_PROJECT_ID` | All deploy workflows |
| `GCP_REGION` | All deploy workflows |
| `IMAGE_NAME` | All deploy workflows |
| `WORKLOAD_IDENTITY_PROVIDER` | All deploy workflows |
| `SERVICE_ACCOUNT` | All deploy workflows |
| `DB_PASSWORD` | `deploy-gha-secrets.yml` only |
| `STRIPE_KEY` | `deploy-gha-secrets.yml` only |

## GSM secrets required (create these manually)

| Secret name in GSM | Injected as env var |
|--------------------|---------------------|
| `db-password` | `DB_PASSWORD` |
| `stripe-key` | `STRIPE_KEY` |
