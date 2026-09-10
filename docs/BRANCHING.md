# Oatmeal Farm Network frontend — Git train

This repo follows the Oatmeal AI three-environment train. Do not rename these branches.

```text
feature/*  →  PR  →  GCP/frontend-staging  →  PR  →  GCP/frontend-testing  →  PR  →  main
                         staging Cloud Run              testing Cloud Run              production
```

| Branch | Cloud Run | Workflow |
|--------|-----------|----------|
| `GCP/frontend-staging` | `oatmeal-frontend-staging` | `deploy-staging.yml` |
| `GCP/frontend-testing` | `oatmeal-frontend-testing` | `deploy-testing.yml` |
| `main` | production (`PROD_FRONTEND_SERVICE_NAME` or `oatmeal-frontend-prod`) | `deploy-prod.yml` |

Allowed PRs only:

1. Work branch → `GCP/frontend-staging`
2. `GCP/frontend-staging` → `GCP/frontend-testing`
3. `GCP/frontend-testing` → `main`

Cut work branches from **current staging**, not from `main`. Do not dump staging into `main` to skip testing.

CI runs on PRs into all three bases. Testing and production deploys stay fail-closed until `TESTING_*` / `PROD_*` exist.

See [FRONTEND_STAGING_DEPLOY.md](./FRONTEND_STAGING_DEPLOY.md).
