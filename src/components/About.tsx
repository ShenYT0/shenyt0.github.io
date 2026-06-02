import { useI18n } from '../hooks/useI18n';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function About() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section id="about" className={`section ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3>{t('about.location.title')}</h3>
            <p>{t('about.location.text')}</p>
          </div>
          <div className="about-card">
            <div className="about-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>{t('about.education.title')}</h3>
            <p>{t('about.education.text')}</p>
          </div>
          <div className="about-card">
            <div className="about-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>{t('about.languages.title')}</h3>
            <ul className="lang-list">
              <li><span className="lang-name">{t('about.languages.zh')}</span> <span className="lang-level">{t('about.languages.zhLevel')}</span></li>
              <li><span className="lang-name">{t('about.languages.en')}</span> <span className="lang-level">{t('about.languages.enLevel')}</span></li>
              <li><span className="lang-name">{t('about.languages.fr')}</span> <span className="lang-level">{t('about.languages.frLevel')}</span></li>
              <li><span className="lang-name">{t('about.languages.ja')}</span> <span className="lang-level">{t('about.languages.jaLevel')}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}