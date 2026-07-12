# Frontend Staging Deployment

**Repo:** [Oatmeal-Farm-Network/oatmealfarmnetwork](https://github.com/Oatmeal-Farm-Network/oatmealfarmnetwork)  
**GCP project:** `oatmeal-farm-staging`  
**Region:** `us-central1`  
**Branch:** `GCP/frontend-staging`  
**Workflow:** `.github/workflows/deploy-staging.yml`  
**Last updated:** July 2026

---

## What this deploys

| Item | Value |
|------|--------|
| Cloud Run service | `oatmeal-frontend-staging` |
| Image | `us-central1-docker.pkg.dev/oatmeal-farm-staging/oatmeal-farm-registry/frontend:<short-sha>` |
| Runtime SA | `frontend-sa@oatmeal-farm-staging.iam.gserviceaccount.com` |
| API target | Staging backend (baked in at build via `VITE_API_URL`) |

---

## How CD works

```text
push to GCP/frontend-staging
        │
        ├─ docs/README only? ──► skip
        │
        ▼
GitHub Actions: Deploy Frontend Staging
        │
        ├─ WIF auth (STAGING_GCP_* secrets)
        ├─ docker build with staging VITE_* build-args
        ├─ push → Artifact Registry
        └─ gcloud run deploy oatmeal-frontend-staging
```

**Triggers:** push to `GCP/frontend-staging` (non-docs) + `workflow_dispatch`.

---

## Staging API wiring

Vite embeds env at **build time**. Staging CD passes:

| Build arg | Default |
|-----------|---------|
| `VITE_API_URL` | `https://oatmeal-backend-staging-1087130530284.us-central1.run.app` |
| `VITE_SAIGE_API_URL` | `https://oatmeal-saige-staging-lrviw4iujq-uc.a.run.app` |
| `VITE_CROP_API_URL` | staging backend `/cm` |
| `VITE_NEWS_API_URL` | staging backend |
| `VITE_CONTACT_RECIPIENT_EMAIL` | placeholder / var |
| `VITE_OTF_API_URL` | empty unless var set |

Override defaults with GitHub **Actions variables** on this repo: `STAGING_BACKEND_URL`, `STAGING_SAIGE_URL`, etc.

Do **not** rely on `.env.production` for staging — those URLs are production.

Backend CORS must allow this frontend origin (done on `GCP/backend-staging`).

---

## GitHub secrets (this frontend repo)

Configure the same staging WIF secrets used by the backend repo:

| Secret | Purpose |
|--------|---------|
| `STAGING_GCP_PROJECT_ID` | `oatmeal-farm-staging` |
| `STAGING_GCP_SERVICE_ACCOUNT` | Deployer SA email |
| `STAGING_GCP_WORKLOAD_IDENTITY_PROVIDER` | WIF provider resource name |

The deployer SA needs permission to push Artifact Registry images and deploy `oatmeal-frontend-staging` in the staging project. WIF must trust this GitHub repo (`oatmealfarmnetwork`).

---

## Operator process

1. Merge frontend work into **`GCP/frontend-staging`** (not `main` for staging deploys).
2. Wait for **Deploy Frontend Staging** in Actions.
3. Confirm:

```bash
gcloud run services describe oatmeal-frontend-staging \
  --project=oatmeal-farm-staging --region=us-central1 \
  --format='yaml(status.url,spec.template.spec.containers[0].image)'
```

4. In the browser, verify Network calls go to the **staging** backend host (not prod).

---

## Related

- Backend staging: backend repo `docs/staging/BACKEND_STAGING_DEPLOY.md`
- Backend CORS / `FRONTEND_URL`: backend `GCP/backend-staging`
- Saige staging: backend repo `docs/staging/SAIGE_STAGING_DEPLOY.md`
