import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Star, Github } from 'lucide-react';
import { Project } from '../types';

// Simulated GitHub API response
const mockGithubRepos: Project[] = [
  {
    name: "portfolio-website",
    description: "Personal portfolio website built with React, TypeScript, and TailwindCSS. Features dark mode, responsive design, and API integration.",
    stars: 24,
    url: "https://github.com/yourusername/portfolio-website",
    homepage: "https://yourdomain.com",
    language: "TypeScript"
  },
  {
    name: "task-management-api",
    description: "RESTful API for task management built with Node.js and Express. Includes authentication, task organization, and real-time updates.",
    stars: 18,
    url: "https://github.com/yourusername/task-management-api",
    language: "JavaScript"
  },
  {
    name: "weather-dashboard",
    description: "Real-time weather dashboard using OpenWeather API. Features location search, 5-day forecast, and weather alerts.",
    stars: 32,
    url: "https://github.com/yourusername/weather-dashboard",
    homepage: "https://weather.yourdomain.com",
    language: "TypeScript"
  },
  {
    name: "e-commerce-platform",
    description: "Full-stack e-commerce platform with product management, cart functionality, and secure payment processing.",
    stars: 45,
    url: "https://github.com/yourusername/e-commerce-platform",
    homepage: "https://shop.yourdomain.com",
    language: "TypeScript"
  },
  {
    name: "realtime-chat-app",
    description: "WebSocket-based chat application with private messaging, group chats, and file sharing capabilities.",
    stars: 29,
    url: "https://github.com/yourusername/realtime-chat-app",
    language: "JavaScript"
  },
  {
    name: "ai-image-generator",
    description: "AI-powered image generation tool using stable diffusion. Create unique artwork from text descriptions.",
    stars: 56,
    url: "https://github.com/yourusername/ai-image-generator",
    homepage: "https://ai-art.yourdomain.com",
    language: "Python"
  }
];

export const Projects = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In production, replace with actual API call
        // const response = await fetch('https://api.github.com/users/yourusername/repos');
        // if (!response.ok) throw new Error('Failed to fetch projects');
        // return response.json();
        return mockGithubRepos;
      } catch (error) {
        console.error('Error fetching projects:', error);
        return mockGithubRepos;
      }
    },
    initialData: mockGithubRepos,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.name}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.name.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{project.stars}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {project.language}
                  </span>
                  <div className="flex space-x-3">
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                        title="Visit live site"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                      title="View source code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};