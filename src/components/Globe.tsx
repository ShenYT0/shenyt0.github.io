import { useEffect, useRef, useCallback } from 'react';
import { greetings } from '../data/greetings';
import earthImg from '../assets/space04_earth.png';

const CELL_SIZE = 45;
const GREETING_SPAWN_INTERVAL_MS = 700;

function getCellKey(x: number, y: number): string {
  const col = Math.floor(x / CELL_SIZE);
  const row = Math.floor(y / CELL_SIZE);
  return `${col},${row}`;
}

export function Globe() {
  const globeRef = useRef<HTMLDivElement>(null);
  const occupiedCellsRef = useRef<Set<string>>(new Set());

  const isPositionOccupied = useCallback((x: number, y: number): boolean => {
    const key = getCellKey(x, y);
    const [col, row] = key.split(',').map(Number);
    for (let dc = -1; dc <= 1; dc++) {
      for (let dr = -1; dr <= 1; dr++) {
        if (occupiedCellsRef.current.has(`${col + dc},${row + dr}`)) {
          return true;
        }
      }
    }
    return false;
  }, []);

  /** Weighted random selection: greetings with higher weight appear more often */
  const pickWeightedGreeting = useCallback(() => {
    const totalWeight = greetings.reduce((sum, g) => sum + (g.weight ?? 1), 0);
    let r = Math.random() * totalWeight;
    for (const g of greetings) {
      r -= g.weight ?? 1;
      if (r <= 0) return g;
    }
    return greetings[greetings.length - 1];
  }, []);

  const spawnGreeting = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const entry = pickWeightedGreeting();
    const globeSize = globe.offsetWidth || 300;
    const centerX = globeSize / 2;
    const centerY = globeSize / 2;
    const maxR = globeSize / 2 - 20;

    let x = 0;
    let y = 0;
    let found = false;

    for (let attempt = 0; attempt < 50; attempt++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 0.7 + 0.1;
      const px = centerX + Math.cos(angle) * radius * maxR;
      const py = centerY + Math.sin(angle) * radius * maxR;
      if (!isPositionOccupied(px, py)) {
        x = px;
        y = py;
        found = true;
        break;
      }
    }

    if (!found) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 0.7 + 0.1;
      x = centerX + Math.cos(angle) * radius * maxR;
      y = centerY + Math.sin(angle) * radius * maxR;
    }

    const cellKey = getCellKey(x, y);
    occupiedCellsRef.current.add(cellKey);

    const el = document.createElement('span');
    el.className = 'greeting-float';
    el.textContent = entry.text;
    el.style.color = entry.color;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const duration = 3 + Math.random() * 3;
    el.style.animationDuration = `${duration}s`;
    const fontSize = 0.8 + Math.random() * 0.6;
    el.style.fontSize = `${fontSize}rem`;

    globe.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.remove();
      occupiedCellsRef.current.delete(cellKey);
    }, duration * 1000);
  }, [isPositionOccupied]);

  useEffect(() => {
    const interval = setInterval(spawnGreeting, GREETING_SPAWN_INTERVAL_MS);
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnGreeting, i * 100);
    }
    return () => clearInterval(interval);
  }, [spawnGreeting]);

  return (
    <div className="globe" id="globe" ref={globeRef}>
      <img className="globe-earth" src={earthImg} alt="" />
    </div>
  );
}