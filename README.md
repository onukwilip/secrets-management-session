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
| `SERVICE_ACCOUNT` | All deploy workflows (WIF auth/impersonation identity for the GitHub Actions runner) |
| `CLOUD_RUN_SERVICE_ACCOUNT` | All deploy workflows (runtime identity the deployed Cloud Run service runs as, instead of the default Compute SA) |
| `DB_PASSWORD` | `deploy-gha-secrets.yml` only |
| `STRIPE_KEY` | `deploy-gha-secrets.yml` only |

## GSM secrets required (create these manually)

| Secret name in GSM | Injected as env var |
|--------------------|---------------------|
| `db-password` | `DB_PASSWORD` |
| `stripe-key` | `STRIPE_KEY` |

## Steps to use Secrets Manager with Google Cloud Run

- Enable Secrets Manager API
- Create the Secrets in Google Secret Manager
- Create a Separate Service Account for the Cloud Run Service
- Grant Secret Accessor Permission on the secrets to the Cloud Run Service Account (in production, you create a special Service Account for the Cloud Run Service, instead of using the default SA...instead of granting the general default SA access to the secrets)
- Link the Secrets to the Cloud Run Service
