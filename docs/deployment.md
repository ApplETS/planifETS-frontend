# Deployment Workflows

The `CD` workflow publishes an immutable `main-<sha>` image for each push to `main`. To deploy, run the workflow manually from the tested commit and select `dev`, `staging` or `prod`; it publishes both an immutable environment SHA tag and the mutable tag watched by ArgoCD:

| Environment | Mutable tag | API URL |
| --- | --- | --- |
| Development | `dev` | `https://planifets.dev.cedille.club/api` |
| Staging | `staging` | `https://planifets.staging.cedille.club/api` |
| Production | `latest` | `https://planifets.clubapplets.ca/api` |

Create matching GitHub Environments before enabling the workflow. Restrict staging and production to `main`, and require reviewers for production. The public analytics identifiers are read from the existing repository secrets.

Unlike the backend, the frontend currently embeds `NEXT_PUBLIC_*` values during the Next.js build. It therefore creates a separate image digest for each environment. Promote the same commit through dev, staging and production; do not retag a dev frontend image for production.
