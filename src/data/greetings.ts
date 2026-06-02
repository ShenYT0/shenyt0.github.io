import { GreetingEntry } from '../types';

/** Weight for how often a greeting appears relative to others */
const WEIGHTS = {
  en: 2,
  fr: 2,
  zh: 2,
  ja: 2,
  /** Default weight for all other greetings */
  other: 1,
} as const;

export const greetings: GreetingEntry[] = [
  { text: 'Hello', color: '#60a5fa', weight: WEIGHTS.en },
  { text: 'Bonjour', color: '#f87171', weight: WEIGHTS.fr },
  { text: '你好', color: '#fbbf24', weight: WEIGHTS.zh },
  { text: 'こんにちは', color: '#f472b6', weight: WEIGHTS.ja },
  { text: 'Hola', color: '#34d399', weight: WEIGHTS.other },
  { text: 'Ciao', color: '#a78bfa', weight: WEIGHTS.other },
  { text: 'Hallo', color: '#fb923c', weight: WEIGHTS.other },
  { text: 'Olá', color: '#2dd4bf', weight: WEIGHTS.other },
  { text: 'مرحبا', color: '#e879f9', weight: WEIGHTS.other },
  { text: 'Привет', color: '#67e8f9', weight: WEIGHTS.other },
  { text: 'Sawubona', color: '#4ade80', weight: WEIGHTS.other },
  { text: '안녕하세요', color: '#818cf8', weight: WEIGHTS.other },
  { text: 'Xin chào', color: '#22c55e', weight: WEIGHTS.other },
  { text: 'नमस्ते', color: '#f97316', weight: WEIGHTS.other },
  { text: 'Selamat pagi', color: '#06b6d4', weight: WEIGHTS.other },
  { text: 'Hej', color: '#84cc16', weight: WEIGHTS.other },
  { text: 'Merhaba', color: '#ec4899', weight: WEIGHTS.other },
  { text: 'Γεια σας', color: '#8b5cf6', weight: WEIGHTS.other },
];
