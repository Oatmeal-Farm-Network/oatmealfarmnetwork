# Oatmeal Farm Network frontend — Git train

This repo follows the Oatmeal AI three-environment train. Do not rename these branches.

```text
feature/*  →  PR  →  GCP/frontend-staging  →  PR  →  GCP/frontend-testing  →  PR  →  main
                         staging Cloud Run              testing Cloud Run              production
```

| Branch | Cloud Run | GCP project | Workflow |
|--------|-----------|-------------|----------|
| `GCP/frontend-staging` | `oatmeal-frontend-staging` | `oatmeal-farm-staging` | `deploy-staging.yml` |
| `GCP/frontend-testing` | `oatmeal-frontend-testing` | `oatmeal-farm-staging` | `deploy-testing.yml` |
| `main` | **`oatmealfarmnetwork`** | `animated-flare-421518` (Oatmeal AI) | `deploy-prod.yml` |

Do **not** deploy OFN to `oatmeal-frontend-prod` (does not exist) or `oatmeal-main`. Official OFN prod is `oatmealfarmnetwork` only.

Allowed PRs only:

1. Work branch → `GCP/frontend-staging`
2. `GCP/frontend-staging` → `GCP/frontend-testing`
3. `GCP/frontend-testing` → `main`

Cut work branches from **current staging**, not from `main`. Do not dump staging into `main` to skip testing.

CI runs on PRs into all three bases. Merge to `main` deploys `oatmealfarmnetwork` in Oatmeal AI. Testing stays fail-closed until `TESTING_*` exist. Prod WIF secrets (`PROD_GCP_WORKLOAD_IDENTITY_PROVIDER`, `PROD_GCP_SERVICE_ACCOUNT`) must be set on this repo.

See [FRONTEND_STAGING_DEPLOY.md](./FRONTEND_STAGING_DEPLOY.md).
