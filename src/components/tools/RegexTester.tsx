import { useState, useMemo, useCallback } from 'react';

type Flag = 'g' | 'i' | 'm' | 's' | 'u' | 'y';

const ALL_FLAGS: { key: Flag; label: string }[] = [
  { key: 'g', label: 'global' },
  { key: 'i', label: 'ignore case' },
  { key: 'm', label: 'multiline' },
  { key: 's', label: 'dotall' },
  { key: 'u', label: 'unicode' },
  { key: 'y', label: 'sticky' },
];

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState<Set<Flag>>(new Set(['g']));
  const [replacement, setReplacement] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleFlag = useCallback((flag: Flag) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) {
        next.delete(flag);
      } else {
        next.add(flag);
      }
      return next;
    });
  }, []);

  const regex = useMemo(() => {
    setError(null);
    if (!pattern) return null;
    try {
      const flagStr = Array.from(flags).join('');
      return new RegExp(pattern, flagStr);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      return null;
    }
  }, [pattern, flags]);

  const matches = useMemo(() => {
    if (!regex || !testString) return [];
    const results: { text: string; index: number; length: number }[] = [];
    const global = flags.has('g');
    const re = global ? new RegExp(regex.source, regex.flags) : regex;

    if (global) {
      let match: RegExpExecArray | null;
      while ((match = re.exec(testString)) !== null) {
        results.push({ text: match[0], index: match.index, length: match[0].length });
        if (match.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      const match = re.exec(testString);
      if (match) {
        results.push({ text: match[0], index: match.index, length: match[0].length });
      }
    }
    return results;
  }, [regex, testString, flags]);

  const replaceResult = useMemo(() => {
    if (!regex || !testString || replacement === undefined) return null;
    try {
      return testString.replace(regex, replacement);
    } catch {
      return null;
    }
  }, [regex, testString, replacement]);

  const highlightedText = useMemo(() => {
    if (!testString) return null;
    if (matches.length === 0) {
      return <span className="regex-text">{testString}</span>;
    }

    const parts: React.ReactNode[] = [];
    let lastEnd = 0;

    matches.forEach((m, i) => {
      if (m.index > lastEnd) {
        parts.push(
          <span key={`t-${i}`} className="regex-text">{testString.slice(lastEnd, m.index)}</span>
        );
      }
      parts.push(
        <mark key={`m-${i}`} className="regex-match">
          {testString.slice(m.index, m.index + m.length)}
        </mark>
      );
      lastEnd = m.index + m.length;
    });

    if (lastEnd < testString.length) {
      parts.push(
        <span key="last" className="regex-text">{testString.slice(lastEnd)}</span>
      );
    }

    return <div className="regex-highlight-box">{parts}</div>;
  }, [testString, matches]);

  return (
    <div className="tools-page">
      <div className="container">
        <h1 className="section-title">Regex Tester</h1>
        <p className="tools-subtitle">Test and debug regular expressions in real-time.</p>

        <div className="regex-layout">
          <div className="regex-inputs">
            <div className="regex-field">
              <label htmlFor="regex-pattern">Regular Expression</label>
              <input
                id="regex-pattern"
                className="regex-input mono"
                type="text"
                placeholder="/pattern/flags"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              {error && <p className="regex-error">{error}</p>}
            </div>

            <div className="regex-flags">
              <label>Flags</label>
              <div className="regex-flags-group">
                {ALL_FLAGS.map(({ key, label }) => (
                  <button
                    key={key}
                    className={`regex-flag-btn ${flags.has(key) ? 'active' : ''}`}
                    onClick={() => toggleFlag(key)}
                    title={label}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="regex-field">
              <label htmlFor="regex-test">Test String</label>
              <textarea
                id="regex-test"
                className="regex-textarea mono"
                rows={6}
                placeholder="Enter test string here..."
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
              />
            </div>

            <div className="regex-field">
              <label htmlFor="regex-replace">Replacement (optional)</label>
              <input
                id="regex-replace"
                className="regex-input mono"
                type="text"
                placeholder="$1 - $& etc."
                value={replacement}
                onChange={(e) => setReplacement(e.target.value)}
              />
            </div>
          </div>

          <div className="regex-results">
            <div className="regex-result-section">
              <h3>Matches ({matches.length})</h3>
              {highlightedText}
              {matches.length > 0 && (
                <div className="regex-match-list">
                  {matches.map((m, i) => (
                    <div key={i} className="regex-match-item">
                      <span className="regex-match-idx">#{i + 1}</span>
                      <span className="regex-match-val mono">"{m.text}"</span>
                      <span className="regex-match-pos">@{m.index}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {replacement && replaceResult !== null && (
              <div className="regex-result-section">
                <h3>Replaced</h3>
                <div className="regex-highlight-box mono">{replaceResult}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}