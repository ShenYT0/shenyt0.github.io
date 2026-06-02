import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import type { SupportedLang } from '../types';

const languages: { code: SupportedLang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
];

export function Navbar() {
  const { lang, setLanguage } = useI18n();
  const location = useLocation();
  const showLangSwitcher = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">Yuntian's Website</Link>
        <div className="nav-right">
          <Link to="/tools" className="nav-link">Tools</Link>
          <a
            href="https://sites.google.com/view/ytsblog/"
            target="_blank"
            className="nav-link blog-link"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <div id="themeToggle" className="theme-switch active" title="Toggle theme" />
          {showLangSwitcher && (
            <div className="lang-switcher">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  className={`lang-btn ${lang === code ? 'active' : ''}`}
                  onClick={() => setLanguage(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
