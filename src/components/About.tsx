import { Download } from "lucide-react";
import { TechStack } from "../types";
import profileImage from '@assets/images/profileImage.jpg'

const techStack: TechStack[] = [
  { name: "TypeScript", icon: "🔷" },
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "💛" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "💚" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "📚" },
  { name: "AWS", icon: "☁️" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Redis", icon: "🔴" },
  { name: "GraphQL", icon: "📊" },
  { name: "REST", icon: "🔌" },
];


export const About = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="about-heading"
      id="about"
    >
      <div className="text-center max-w-3xl mx-auto">
        <div className="w-32 h-32 mx-auto mb-6">
          <img
            src="www.abhinavkm.com/profileImage"
            onError={(e) => {
            e.currentTarget.src = profileImage;
          }}
            alt="Abhinav KM"
            className="rounded-full w-full h-full object-cover shadow-lg"
          />
        </div>
        <h1
          id="about-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Abhinav KM
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Python developer passionate about writing maintainable code.
        </p>
        <a
          href="/path-to-your-resume.pdf"
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out mb-8"
          download
        >
          <Download className="w-5 h-5 mr-2" />
          Resume
        </a>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Technologies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-2">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};