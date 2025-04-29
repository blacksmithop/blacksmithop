import { ProfileData, Project, ContactForm, ApiResponse, TechStackItem } from './types';

// Base URL from Vite environment variable with fallback
const BASE_URL = 'https://api.abhinavkm.com';

// Utility function for delaying retries
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error ${response.status}: ${response.statusText}`
    );
  }
  const apiResponse: ApiResponse = await response.json();
  if (!apiResponse.success) {
    throw new Error(apiResponse.message || 'API request failed');
  }
  return apiResponse.data as T;
};

const fetchWithRetry = async <T>(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      return await handleResponse<T>(response);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown fetch error');
      if (attempt < maxRetries) {
        const delayMs = baseDelay * Math.pow(2, attempt); // Exponential backoff: 1s, 2s, 4s
        await delay(delayMs);
      }
    }
  }

  throw lastError || new Error('Max retries reached');
};

export const fetchProfileData = async (): Promise<ProfileData> => {
  try {
    // Fetch image, resume, and tech stack concurrently
    const [imageResponse, resumeResponse, techStackResponse] = await Promise.all([
      fetchWithRetry<string>(`${BASE_URL}/image`),
      fetchWithRetry<string>(`${BASE_URL}/resume`),
      fetchWithRetry<TechStackItem[]>(`${BASE_URL}/tech-stack`)
    ]);

    // Static description (not in API, per schema)
    const description = "Python developer passionate about writing maintainable code.";

    return {
      profileImage: imageResponse || '',
      description,
      resumeUrl: resumeResponse || '',
      skills: techStackResponse || []
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch profile data');
  }
};

export const fetchGithubRepos = async (count: number = 10): Promise<Project[]> => {
  try {
    const repos = await fetchWithRetry<any[]>(`${BASE_URL}/github-repos?count=${count}`);
    
    // Map API response to Project type, sort by stars, and take top 'count'
    const projects: Project[] = repos
      .map(repo => ({
        name: repo.name,
        description: repo.description || 'No description available',
        stars: repo.stargazers_count,
        url: repo.html_url,
        homepage: repo.homepage || undefined,
        language: repo.language || 'Unknown'
      }))
      .sort((a, b) => b.stars - a.stars) // Sort by stars descending
      .slice(0, count); // Take top 'count' projects

    return projects;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch GitHub repos');
  }
};

export const submitContactForm = async (formData: ContactForm): Promise<void> => {
  try {
    await fetchWithRetry<void>(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to submit contact form');
  }
};