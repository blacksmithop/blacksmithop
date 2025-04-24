import { Github, Linkedin, BookOpen, Code, Phone } from "lucide-react";
import { siCodewars, siStackoverflow } from "simple-icons";
import { ThemeToggle } from "./ThemeToggle";

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
            <a
              href="https://github.com/blacksmithop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav--km/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://medium.com/@angstycoder101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <BookOpen className="w-5 h-5" />
            </a>
            <a
              href="https://stackoverflow.com/users/11323371/insertcheesyline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d={siStackoverflow.path} />
              </svg>
            </a>
            <a
              href="https://www.codewars.com/users/blacksmithop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d={siCodewars.path} />
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};