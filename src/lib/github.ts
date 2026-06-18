const REPO = 'lima3w/padduck';
const BASE = 'https://api.github.com';

export interface GitHubStats {
  latestRelease: string | null;
  commitCount: string | null;
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const [releaseRes, commitsRes] = await Promise.allSettled([
    fetch(`${BASE}/repos/${REPO}/releases/latest`, { headers }),
    fetch(`${BASE}/repos/${REPO}/commits?per_page=1&sha=main`, { headers }),
  ]);

  let latestRelease: string | null = null;
  if (releaseRes.status === 'fulfilled' && releaseRes.value.ok) {
    const data = await releaseRes.value.json() as { tag_name?: string };
    latestRelease = data.tag_name ?? null;
  }

  let commitCount: string | null = null;
  if (commitsRes.status === 'fulfilled' && commitsRes.value.ok) {
    const link = commitsRes.value.headers.get('link') ?? '';
    const match = link.match(/[?&]page=(\d+)>; rel="last"/);
    if (match) {
      commitCount = parseInt(match[1], 10).toLocaleString();
    }
  }

  return { latestRelease, commitCount };
}
