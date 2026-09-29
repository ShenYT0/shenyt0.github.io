export interface ToolInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export const tools: ToolInfo[] = [
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test and debug regular expressions in real-time with match highlighting.',
    icon: '🔍',
    path: '/tools/regex-tester',
  },
  {
    id: 'tarots-simulator',
    title: 'Tarots Simulator',
    description: 'Draw and simulate tarot readings with Major and Minor Arcana.',
    icon: '🔮',
    path: '/tools/tarots-simulator',
  },
];