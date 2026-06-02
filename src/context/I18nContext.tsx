import { createContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import { type SupportedLang } from '../types';
import { translations } from '../data/translations';

function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export interface I18nContextValue {
  lang: SupportedLang;
  t: (key: string) => string;
  setLanguage: (lang: SupportedLang) => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem('preferred-lang') as SupportedLang | null;
    return saved ?? 'en';
  });

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(translations[lang], key);
      return value ?? key;
    },
    [lang]
  );

  const setLanguage = useCallback((newLang: SupportedLang) => {
    setLang(newLang);
    localStorage.setItem('preferred-lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  const value = useMemo(() => ({ lang, t, setLanguage }), [lang, t, setLanguage]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}