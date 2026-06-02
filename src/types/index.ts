export interface TranslationSet {
  hero: {
    greeting: string;
    subtitle: string;
    description: string;
    contactBtn: string;
    projectsBtn: string;
    scroll: string;
  };
  about: {
    title: string;
    location: { title: string; text: string };
    education: { title: string; text: string };
    languages: {
      title: string;
      zh: string; zhLevel: string;
      en: string; enLevel: string;
      fr: string; frLevel: string;
      ja: string; jaLevel: string;
    };
  };
  education: {
    title: string;
    inalco: { title: string; desc: string };
    uga: { title: string; desc: string };
    upjv: { title: string; desc: string };
  };
  projects: {
    title: string;
    pdfrag: { desc: string };
    jobscanner: { badge: string; desc: string };
  };
  experience: {
    title: string;
    hakatachoten: { title: string };
  };
  contact: {
    title: string;
    text: string;
  };
  footer: { text: string };
}

export type SupportedLang = 'en' | 'fr' | 'zh' | 'ja';

export interface GreetingEntry {
  text: string;
  color: string;
  weight?: number;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  badge?: string;
}