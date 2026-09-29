import { useEffect, useMemo, useRef, useState } from 'react';
import { CARD_BACK_IMAGE, buildDeck, shuffleDeck, type TarotCard } from '../../data/tarots';
import './TarotsSimulator.css';

const MUSIC_URL = '/Tarots/全ての人の魂の詩.mp3';

const CARD_WIDTH = 108;
const CARD_HEIGHT = 156;
const FLIP_STAGGER_MS = 140;
const RETURN_MS = 340;
const SHUFFLE_MS = 700;

interface TableCard {
  uid: string;
  card: TarotCard;
  reversed: boolean;
  x: number;
  y: number;
  z: number;
  flipped: boolean;
  returning: boolean;
}

/**
 * Dedicated page template for the Tarots Simulator.
 * Self-contained: own layout classes, own stylesheet, fixed palette
 * (#6d9ac7 / #1269cc / #51eefc) that is independent of the global theme.
 */
export function TarotsSimulator() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // ----- Card table state -----
  const [includeMinor, setIncludeMinor] = useState(true); // 用户选择，重置后生效
  const [appliedIncludeMinor, setAppliedIncludeMinor] = useState(true);
  const [deck, setDeck] = useState<TarotCard[]>(() => shuffleDeck(buildDeck(true)));
  const [table, setTable] = useState<TableCard[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [draggingUid, setDraggingUid] = useState<string | null>(null);
  const [shuffling, setShuffling] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);

  const tableRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ uid: string; dx: number; dy: number } | null>(null);
  const zRef = useRef(0);
  const uidRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  // Unify navbar/footer colors to the fixed palette while this page is mounted.
  useEffect(() => {
    document.body.classList.add('tarots-active');
    return () => document.body.classList.remove('tarots-active');
  }, []);

  // Hide the global day/night switch while this page is mounted (the page uses
  // a fixed palette) — handled here, not in the shared Navbar, so the shared
  // template stays untouched.
  useEffect(() => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const originalDisplay = themeToggle.style.display;
    themeToggle.style.display = 'none';

    return () => {
      themeToggle.style.display = originalDisplay;
    };
  }, []);

  // Background music: auto-start on entry, stop & release on leave.
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Browsers may block autoplay with sound (e.g. Safari without a user
    // gesture) — in that case stay paused until the record is clicked.
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  // ----- Card table helpers -----
  const resultText = useMemo(
    () =>
      table
        .map((item, index) => `${index + 1}. ${item.card.name} ${item.reversed ? 'Reversed' : 'Upright'}`)
        .join('\n'),
    [table],
  );

  const clampToTable = (x: number, y: number) => {
    const el = tableRef.current;
    if (!el) return { x, y };
    const maxX = Math.max(0, el.clientWidth - CARD_WIDTH);
    const maxY = Math.max(0, el.clientHeight - CARD_HEIGHT);
    return { x: Math.min(Math.max(0, x), maxX), y: Math.min(Math.max(0, y), maxY) };
  };

  const deckOrigin = () => {
    const tableEl = tableRef.current;
    const deckEl = deckRef.current;
    if (!tableEl || !deckEl) return { x: 0, y: 0 };
    const tableRect = tableEl.getBoundingClientRect();
    const deckRect = deckEl.getBoundingClientRect();
    return clampToTable(deckRect.left - tableRect.left, deckRect.top - tableRect.top);
  };

  const animateShuffle = () => {
    setShuffling(true);
    timersRef.current.push(window.setTimeout(() => setShuffling(false), SHUFFLE_MS));
  };

  // Draw: press on the deck and pull a face-down card onto the table.
  const handleDeckPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (revealed || resetting || shuffling || deck.length === 0) return;
    const tableEl = tableRef.current;
    if (!tableEl) return;
    event.preventDefault();
    const rect = tableEl.getBoundingClientRect();
    const pos = clampToTable(
      event.clientX - rect.left - CARD_WIDTH / 2,
      event.clientY - rect.top - CARD_HEIGHT / 2,
    );
    const uid = `card-${(uidRef.current += 1)}`;
    zRef.current += 1;
    const drawn: TableCard = {
      uid,
      card: deck[0],
      reversed: Math.random() < 0.5,
      x: pos.x,
      y: pos.y,
      z: zRef.current,
      flipped: false,
      returning: false,
    };
    setTable((prev) => [...prev, drawn]);
    setDeck((prev) => prev.slice(1));
    dragRef.current = { uid, dx: CARD_WIDTH / 2, dy: CARD_HEIGHT / 2 };
    setDraggingUid(uid);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  // Move: pick up an already drawn card.
  const handleCardPointerDown = (event: React.PointerEvent<HTMLDivElement>, uid: string) => {
    if (revealed || resetting) return;
    const tableEl = tableRef.current;
    const item = table.find((c) => c.uid === uid);
    if (!tableEl || !item || item.returning) return;
    event.preventDefault();
    const rect = tableEl.getBoundingClientRect();
    dragRef.current = {
      uid,
      dx: event.clientX - rect.left - item.x,
      dy: event.clientY - rect.top - item.y,
    };
    zRef.current += 1;
    setTable((prev) => prev.map((c) => (c.uid === uid ? { ...c, z: zRef.current } : c)));
    setDraggingUid(uid);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleTablePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const tableEl = tableRef.current;
    if (!drag || !tableEl) return;
    const rect = tableEl.getBoundingClientRect();
    const pos = clampToTable(event.clientX - rect.left - drag.dx, event.clientY - rect.top - drag.dy);
    setTable((prev) => prev.map((c) => (c.uid === drag.uid ? { ...c, x: pos.x, y: pos.y } : c)));
  };

  const cancelDrag = () => {
    dragRef.current = null;
    setDraggingUid(null);
  };

  // Drop: releasing over the deck returns the card and re-shuffles the deck.
  const finishDrag = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    setDraggingUid(null);
    if (!drag) return;
    const tableEl = tableRef.current;
    const deckEl = deckRef.current;
    const item = table.find((c) => c.uid === drag.uid);
    if (!tableEl || !deckEl || !item) return;
    const tableRect = tableEl.getBoundingClientRect();
    const deckRect = deckEl.getBoundingClientRect();
    const centerX = tableRect.left + item.x + CARD_WIDTH / 2;
    const centerY = tableRect.top + item.y + CARD_HEIGHT / 2;
    const overDeck =
      centerX >= deckRect.left &&
      centerX <= deckRect.right &&
      centerY >= deckRect.top &&
      centerY <= deckRect.bottom;
    if (overDeck) returnCardToDeck(drag.uid);
  };

  const returnCardToDeck = (uid: string) => {
    const item = table.find((c) => c.uid === uid);
    if (!item || item.returning) return;
    const origin = deckOrigin();
    setTable((prev) =>
      prev.map((c) => (c.uid === uid ? { ...c, x: origin.x, y: origin.y, returning: true } : c)),
    );
    timersRef.current.push(
      window.setTimeout(() => {
        setTable((prev) => prev.filter((c) => c.uid !== uid));
        setDeck((prev) => shuffleDeck([...prev, item.card]));
        animateShuffle();
      }, RETURN_MS),
    );
  };

  const handleShuffle = () => {
    if (shuffling) return;
    setDeck((prev) => shuffleDeck(prev));
    animateShuffle();
  };

  // Flip every card on the table in draw order; the reading is locked afterwards.
  const handleFlip = () => {
    if (revealed || table.length === 0) return;
    setRevealed(true);
    setTable((prev) => prev.map((c) => (c.returning ? c : { ...c, flipped: true })));
  };

  const handleReset = () => {
    if (resetting) return;
    setResetting(true);
    setShowExport(false);
    setCopied(false);
    const hasCards = table.length > 0;
    if (hasCards) {
      const origin = deckOrigin();
      setTable((prev) => prev.map((c) => ({ ...c, x: origin.x, y: origin.y, returning: true })));
    }
    timersRef.current.push(
      window.setTimeout(
        () => {
          setTable([]);
          setDeck(shuffleDeck(buildDeck(includeMinor)));
          setAppliedIncludeMinor(includeMinor);
          setRevealed(false);
          setResetting(false);
          animateShuffle();
        },
        hasCards ? RETURN_MS + 120 : 0,
      ),
    );
  };

  const handleCopy = () => {
    if (!resultText || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(resultText)
      .then(() => {
        setCopied(true);
        timersRef.current.push(window.setTimeout(() => setCopied(false), 1600));
      })
      .catch(() => setCopied(false));
  };

  // Clear pending animation timers on unmount.
  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  return (
    <div className="tarots-page">
      <div className="tarots-page__inner">
        <h1 className="tarots-page__title">Tarots Simulator</h1>

        <div className="tarots-toolbar">
          <button type="button" className="tarots-btn" onClick={handleReset} disabled={resetting}>
            Reset
          </button>
          <button type="button" className="tarots-btn" onClick={handleShuffle} disabled={shuffling}>
            Shuffle
          </button>
          {!revealed && (
            <button
              type="button"
              className="tarots-btn tarots-btn--primary"
              onClick={handleFlip}
              disabled={table.length === 0 || resetting}
            >
              Flip
            </button>
          )}
          {revealed && (
            <button
              type="button"
              className="tarots-btn tarots-btn--primary"
              onClick={() => setShowExport((visible) => !visible)}
            >
              {showExport ? 'Hide Export' : 'Export'}
            </button>
          )}
          <label className="tarots-toggle">
            <input
              type="checkbox"
              checked={includeMinor}
              onChange={(event) => setIncludeMinor(event.target.checked)}
            />
            <span>
              Include Minor Arcana
              {includeMinor !== appliedIncludeMinor && (
                <em className="tarots-toggle__hint"> (applies after reset)</em>
              )}
            </span>
          </label>
        </div>

        <div
          className="tarots-table"
          ref={tableRef}
          onPointerMove={handleTablePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={cancelDrag}
        >
          <div
            ref={deckRef}
            className={`tarots-deck ${shuffling ? 'is-shuffling' : ''} ${
              deck.length === 0 ? 'is-empty' : ''
            } ${revealed ? 'is-locked' : ''}`}
            onPointerDown={handleDeckPointerDown}
            title="Drag a card off the deck to draw"
          >
            {deck.length > 0 && (
              <>
                <img
                  className="tarots-deck__layer tarots-deck__layer--3"
                  src={CARD_BACK_IMAGE}
                  alt=""
                  draggable={false}
                />
                <img
                  className="tarots-deck__layer tarots-deck__layer--2"
                  src={CARD_BACK_IMAGE}
                  alt=""
                  draggable={false}
                />
                <img
                  className="tarots-deck__layer tarots-deck__layer--1"
                  src={CARD_BACK_IMAGE}
                  alt=""
                  draggable={false}
                />
              </>
            )}
            <span className="tarots-deck__count">{deck.length}</span>
          </div>

          {table.map((item, index) => (
            <div
              key={item.uid}
              className={`tarot-card ${item.flipped ? 'is-flipped' : ''} ${
                draggingUid === item.uid ? 'is-dragging' : ''
              } ${item.returning ? 'is-returning' : ''} ${revealed ? 'is-locked' : ''}`}
              style={{ left: item.x, top: item.y, zIndex: item.z }}
              onPointerDown={(event) => handleCardPointerDown(event, item.uid)}
            >
              <div
                className="tarot-card__inner"
                style={{ transitionDelay: item.flipped ? `${index * FLIP_STAGGER_MS}ms` : '0ms' }}
              >
                <div className="tarot-card__face tarot-card__face--back">
                  <img src={CARD_BACK_IMAGE} alt="" draggable={false} />
                </div>
                <div
                  className={`tarot-card__face tarot-card__face--front ${
                    item.reversed ? 'is-reversed' : ''
                  }`}
                >
                  <img src={item.card.image} alt={item.card.name} draggable={false} />
                </div>
              </div>
            </div>
          ))}

          {table.length === 0 && !revealed && (
            <p className="tarots-table__hint">
              Drag a card off the deck to draw · drop it back on the deck to return it
            </p>
          )}
        </div>

        {revealed && showExport && (
          <div className="tarots-result">
            <textarea
              className="tarots-result__text"
              value={resultText}
              readOnly
              spellCheck={false}
              onFocus={(event) => event.currentTarget.select()}
            />
            <div className="tarots-result__actions">
              <button type="button" className="tarots-btn tarots-btn--primary" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <span className="tarots-result__meta">{table.length} card(s)</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating vinyl record player: spins while the music plays, click to toggle */}
      <button
        type="button"
        className={`tarots-vinyl ${playing ? 'is-playing' : ''}`}
        onClick={toggleMusic}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
        title={playing ? '暂停音乐' : '播放音乐'}
      >
        <span className="tarots-vinyl__disc" />
        <span className="tarots-vinyl__arm" />
        <span className="tarots-vinyl__chip">
          {playing ? (
            <span className="tarots-vinyl__pause" />
          ) : (
            <span className="tarots-vinyl__play" />
          )}
        </span>
      </button>
    </div>
  );
}