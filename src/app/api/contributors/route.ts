import { NextResponse } from 'next/server';

type GitHubContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

const repositories = ['planifETS-frontend', 'planifETS-backend'] as const;

async function fetchContributors(repository: string) {
  const contributors: GitHubContributor[] = [];
  let url: string | null
    = `https://api.github.com/repos/ApplETS/${repository}/contributors?per_page=100`;

  while (url) {
    const response: Response = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`GitHub contributors request failed: ${response.status}`);
    }

    contributors.push(...((await response.json()) as GitHubContributor[]));
    url = response.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
  }

  return contributors;
}

export async function GET() {
  let repoContributors: GitHubContributor[][];
  try {
    repoContributors = await Promise.all(repositories.map(fetchContributors));
  } catch {
    return NextResponse.json({ error: 'Unable to load contributors' }, { status: 502 });
  }

  const contributors = new Map<string, GitHubContributor>();
  for (const repositoryContributors of repoContributors) {
    for (const contributor of repositoryContributors) {
      const existing = contributors.get(contributor.login);
      contributors.set(contributor.login, {
        ...contributor,
        contributions: contributor.contributions + (existing?.contributions ?? 0),
      });
    }
  }

  return NextResponse.json(
    [...contributors.values()].sort(
      (a, b) => b.contributions - a.contributions || a.login.localeCompare(b.login),
    ),
  );
}
