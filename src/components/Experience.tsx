import { useI18n } from '../hooks/useI18n';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Experience() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section id="experience" className={`section section-alt ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">{t('experience.title')}</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-date">2025.12 - 2026.07</div>
              <h3 className="timeline-title">{t('experience.hakatachoten.title')}</h3>
              <p className="timeline-institution">Hakata Choten Opera</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}