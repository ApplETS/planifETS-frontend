# Deployment Workflows

Each push to `main` builds three immutable frontend images from the same commit. Each build uses the variables from its matching GitHub Environment, so values embedded by Next.js can differ without rebuilding during deployment.

| Environment | Immutable tag        | Mutable tag watched by ArgoCD |
| ----------- | -------------------- | ----------------------------- |
| Development | `main-<sha>-dev`     | `dev`                         |
| Staging     | `main-<sha>-staging` | `staging`                     |
| Production  | `main-<sha>-prod`    | `latest`                      |

Configure `NEXT_PUBLIC_CHATBOT_ENABLED` and `NEXT_PUBLIC_CHATBOT_SSE_ENABLED` in each GitHub Environment. Both default to `false` when absent. `NEXT_PUBLIC_API_BASE_URL` can also be configured per environment; it defaults to the production API URL for backward compatibility. Public analytics identifiers continue to use the existing secrets.

To deploy, run the workflow manually, select the target environment, and optionally provide the base immutable tag such as `main-a1b2c3d`. The workflow selects that environment's variant and retags it without rebuilding. For example, promoting `main-a1b2c3d` to staging retags `main-a1b2c3d-staging` as `staging`.

Promotion moves the same source commit between environments, but not the same image digest: each environment variant contains different compiled configuration. The immutable tags remain available for audit and rollback.
