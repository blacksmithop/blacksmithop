import { useQuery } from 'react-query';
import { TechStack } from '../types';

const defaultTechStack: TechStack[] = [
  { 
    name: 'TypeScript',
    icon: '🔷',
    section: 'Languages'
  },
  {
    name: 'Python',
    icon: '🐍',
    section: 'Languages'
  },
  {
    name: 'React',
    icon: '⚛️',
    section: 'Frameworks'
  },
  {
    name: 'Docker',
    icon: '🐳',
    section: 'DevOps'
  }
];

export const TechStackSection = () => {
  const { data = defaultTechStack } = useQuery<TechStack[]>(
    'techStack',
    async () => {
      const response = await fetch('/api/tech-stack');
      if (!response.ok) return defaultTechStack;
      return response.json();
    },
    {
      initialData: defaultTechStack,
    }
  );

  const sections = ['Languages', 'Frameworks', 'DevOps'];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800" id="tech-stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Tech Stack
        </h2>
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section}>
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                {section}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {data
                  .filter((tech) => tech.section === section)
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-4xl mb-3">{tech.icon}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};