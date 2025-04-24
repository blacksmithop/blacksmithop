import { useState } from "react";
import { Github, Linkedin, BookOpen, Code, Phone } from "lucide-react";
import { siCodewars, siStackoverflow } from "simple-icons";
import { ThemeToggle } from "./ThemeToggle";

// Define the type for the social stat card mapping
interface SocialStatCardMapping {
  [key: string]: string;
}

// Define the mapping of social platforms to their stat card URLs with type
const socialStatCardMapping: SocialStatCardMapping = {
  github: "https://github-readme-stats.vercel.app/api?username=blacksmithop&show_icons=true&theme=dark",
  stackoverflow: "https://stackoverflow-card.vercel.app/?userID=11323371&theme=stackoverflow-dark",
  codewars: "https://github.r2v.ch/codewars?user=blacksmithop",
};

// Define the props type for the SocialLink component
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  platform: string;
}

// Reusable SocialLink component with hover functionality and typed props
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, platform }) => {
  const [isHovered, setIsHovered] = useState(false);
  const statCardUrl = socialStatCardMapping[platform]; // Now TypeScript knows the type

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        {icon}
      </a>
      {isHovered && statCardUrl && (
        <div className="absolute top-12 right-0 bg-gray-800 text-white rounded-lg shadow-lg p-4 w-80 z-50">
          <div className="flex items-center space-x-3">
            <img
              src={statCardUrl}
              alt={`${platform} Stat Card`}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="#about"
              onClick={scrollToSection('about')}
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </a>
            <div className="hidden md:flex items-center ml-10 space-x-8">
              <a
                href="#projects"
                onClick={scrollToSection('projects')}
                className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Code className="w-4 h-4 mr-2" />
                Projects
              </a>
              <a
                href="#contact"
                onClick={scrollToSection('contact')}
                className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SocialLink
              href="https://github.com/blacksmithop"
              icon={<Github className="w-5 h-5" />}
              platform="github"
            />
            <SocialLink
              href="https://www.linkedin.com/in/abhinav--km/"
              icon={<Linkedin className="w-5 h-5" />}
              platform="linkedin"
            />
            <SocialLink
              href="https://medium.com/@angstycoder101"
              icon={<BookOpen className="w-5 h-5" />}
              platform="medium"
            />
            <SocialLink
              href="https://stackoverflow.com/users/11323371/insertcheesyline"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d={siStackoverflow.path} />
                </svg>
              }
              platform="stackoverflow"
            />
            <SocialLink
              href="https://www.codewars.com/users/blacksmithop"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d={siCodewars.path} />
                </svg>
              }
              platform="codewars"
            />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};