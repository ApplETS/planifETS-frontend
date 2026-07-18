# <p align="center">PlanifETS Frontend</p>

<p align="center">
  <img src="https://github.com/ApplETS/planifETS-frontend/actions/workflows/ci.yml/badge.svg" alt="CI Status" style="height: 20px; margin-right: 5px;">
  <img src="https://github.com/ApplETS/planifETS-frontend/actions/workflows/cd.yml/badge.svg" alt="CD Status" style="height: 20px; margin-right: 5px;">
</p>

> _Session planner for students at the École de technologie supérieure_

This frontend provides an interface for academic session planning at ÉTS. With real-time updates, students can easily organize and optimize their academic paths.

You can find the backend repo [here](https://github.com/ApplETS/planifETS-backend).

---

## 🚀 Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/docs/writing-tests)

---

## 🛠️ Onboarding

For local setup instructions, see [docs/onboarding.md](docs/onboarding.md).

Project documentation and team context are also available in the [docs](docs/).

## Deployment

The `CD` workflow publishes an immutable `main-<sha>` image for each push to `main`. To deploy, run the workflow manually from the tested commit and select `dev`, `staging` or `prod`; it publishes both an immutable environment SHA tag and the mutable tag watched by ArgoCD:

| Environment | Mutable tag | API URL |
| --- | --- | --- |
| Development | `dev` | `https://planifets.dev.cedille.club/api` |
| Staging | `staging` | `https://planifets.staging.cedille.club/api` |
| Production | `latest` | `https://planifets.clubapplets.ca/api` |

Create matching GitHub Environments before enabling the workflow. Restrict staging and production to `main`, and require reviewers for production. The public analytics identifiers are read from the existing repository secrets.

Unlike the backend, the frontend currently embeds `NEXT_PUBLIC_*` values during the Next.js build. It therefore creates a separate image digest for each environment. Promote the same commit through dev, staging and production; do not retag a dev frontend image for production.

## ⚖️ License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/ApplETS/planifETS-frontend/blob/main/LICENSE) file for more information.
