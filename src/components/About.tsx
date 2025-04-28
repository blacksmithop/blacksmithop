import { useContext } from 'react';
import { Download } from "lucide-react";
import { ProfileContext } from '../context/ProfileContext';
import { ProfileData, TechStackItem } from '../types';
import profileImage from '@assets/images/profileImage.jpg';

export const About = () => {
  const { profileData, isLoading, error } = useContext(ProfileContext);

  console.log(profileData, isLoading, error);

  const fallbackProfileData: Partial<ProfileData> = {
    profileImage: profileImage,
    description: "Python developer passionate about writing maintainable code.",
    resumeUrl: "/fallback-resume.pdf",
    skills: [
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
      { name: "REST", icon: "🔌" }
    ]
  };

  const data: ProfileData = {
    profileImage: error ? fallbackProfileData.profileImage! : profileData.profileImage,
    description: error ? fallbackProfileData.description! : profileData.description,
    resumeUrl: error ? fallbackProfileData.resumeUrl! : profileData.resumeUrl,
    skills: error ? fallbackProfileData.skills! : profileData.skills
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="about-heading"
      id="about"
    >
      <div className="text-center max-w-3xl mx-auto">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-6"></div>
          </div>
        ) : (
          <>
            <div className="w-32 h-32 mx-auto mb-6">
              <img
                src={data.profileImage}
                alt="Abhinav KM"
                className="rounded-full w-full h-full object-cover shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = profileImage;
                }}
              />
            </div>
            <h1
              id="about-heading"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Abhinav KM
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {data.description}
            </p>
            <a
              href={data.resumeUrl}
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
                {data.skills.map((skill: TechStackItem) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-grab"
                  >
                    <span className="text-2xl mb-2">{skill.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {error && (
          <p className="text-red-500 mt-4">
            Failed to load profile data. Showing fallback content.
          </p>
        )}
      </div>
    </section>
  );
};