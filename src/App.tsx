import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/ContactForm';
import { Navbar } from './components/Navbar';
import { ProfileProvider } from './context/ProfileContext';


function App() {
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <main className="pt-16">
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </ProfileProvider>
  );
}

export default App;