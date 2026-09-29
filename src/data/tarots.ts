export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  image: string;
}

export const CARD_BACK_IMAGE = '/Tarots/Back.png';

/** Major Arcana — files are `/public/Tarots/Major/<index>_<Name>.png`. */
const MAJOR_NAMES = [
  'Fool',
  'Magician',
  'Priestess',
  'Empress',
  'Emperor',
  'Hierophant',
  'Lovers',
  'Chariot',
  'Justice',
  'Hermit',
  'Fortune',
  'Strength',
  'Hanged Man',
  'Death',
  'Temperance',
  'Devil',
  'Tower',
  'Star',
  'Moon',
  'Sun',
  'Judgement',
  'World',
];

const MINOR_SUITS = ['Coins', 'Cups', 'Swords', 'Wands'] as const;

const MINOR_RANKS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Page',
  'Knight',
  'Queen',
  'King',
] as const;

export const majorArcana: TarotCard[] = MAJOR_NAMES.map((name, index) => ({
  id: `major-${index}`,
  name,
  arcana: 'major',
  image: `/Tarots/Major/${index}_${name.replace(/ /g, '_')}.png`,
}));

export const minorArcana: TarotCard[] = MINOR_SUITS.flatMap((suit) =>
  MINOR_RANKS.map((rank) => ({
    id: `minor-${suit}-${rank}`,
    name: `${rank} of ${suit}`,
    arcana: 'minor' as const,
    image: `/Tarots/Minor/${suit}/${rank}_of_${suit}.png`,
  })),
);

export function buildDeck(includeMinor: boolean): TarotCard[] {
  return includeMinor ? [...majorArcana, ...minorArcana] : [...majorArcana];
}

/** Fisher–Yates shuffle; returns a new array. */
export function shuffleDeck(cards: TarotCard[]): TarotCard[] {
  const next = [...cards];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}