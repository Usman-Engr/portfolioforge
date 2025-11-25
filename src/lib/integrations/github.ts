import { Octokit } from '@octokit/rest';

export interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    topics: string[];
    stargazers_count: number;
    created_at: string;
    updated_at: string;
}

export interface GitHubProject {
    title: string;
    description: string;
    link: string;
    technologies: string[];
    stars: number;
}

export async function fetchGitHubRepos(username: string, token?: string): Promise<GitHubRepo[]> {
    try {
        const octokit = new Octokit({
            auth: token,
        });

        const { data } = await octokit.repos.listForUser({
            username,
            sort: 'updated',
            per_page: 100,
        });

        return data as GitHubRepo[];
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        throw new Error('Failed to fetch GitHub repositories');
    }
}

export function convertReposToProjects(repos: GitHubRepo[], limit: number = 10): GitHubProject[] {
    return repos
        .filter(repo => !repo.name.includes('config') && !repo.name.includes('dotfiles'))
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, limit)
        .map(repo => ({
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: repo.description || 'No description provided',
            link: repo.html_url,
            technologies: [
                repo.language,
                ...repo.topics
            ].filter(Boolean) as string[],
            stars: repo.stargazers_count,
        }));
}

export async function importGitHubProjects(username: string, token?: string): Promise<GitHubProject[]> {
    const repos = await fetchGitHubRepos(username, token);
    return convertReposToProjects(repos);
}
