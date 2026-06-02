import { useState, useCallback, useEffect } from 'react';

type Theme = 'light' | 'dark';

function getThemeByTime(): Theme {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const manual = localStorage.getItem('manual-theme') as Theme | null;
    if (manual) return manual;
    return getThemeByTime();
  });
  const [isManual, setIsManual] = useState(() => !!localStorage.getItem('manual-theme'));

  const setTheme = useCallback((newTheme: Theme, manual = false) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (manual) {
      localStorage.setItem('manual-theme', newTheme);
      setIsManual(true);
    } else {
      localStorage.removeItem('manual-theme');
      setIsManual(false);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      setTheme(next, true);
      return next;
    });
  }, [setTheme]);

  // Auto-check theme every minute when not manual
  useEffect(() => {
    const interval = setInterval(() => {
      const manualTheme = localStorage.getItem('manual-theme');
      if (!manualTheme) {
        const timeTheme = getThemeByTime();
        setTheme(timeTheme);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [setTheme]);

  return { theme, toggleTheme, isManual };
}