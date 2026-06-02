import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ToolsHome } from './components/tools/ToolsHome';
import { RegexTester } from './components/tools/RegexTester';
import { I18nProvider } from './context/I18nContext';
import { useTheme } from './hooks/useTheme';
import './styles.css';

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}

export default function App() {
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const handleClick = () => toggleTheme();
    themeToggle.addEventListener('click', handleClick);
    return () => themeToggle.removeEventListener('click', handleClick);
  }, [toggleTheme]);

  return (
    <HashRouter>
      <I18nProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsHome />} />
          <Route path="/tools/regex-tester" element={<RegexTester />} />
        </Routes>
        <Footer />
      </I18nProvider>
    </HashRouter>
  );
}