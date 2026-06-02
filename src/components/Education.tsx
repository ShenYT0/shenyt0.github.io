import { useI18n } from '../hooks/useI18n';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Education() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section id="education" className={`section section-alt ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">{t('education.title')}</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-date">2023 - 2025</div>
              <h3 className="timeline-title">{t('education.inalco.title')}</h3>
              <p className="timeline-institution">Institut national des langues et civilisations orientales (Inalco)</p>
              <p className="timeline-desc">{t('education.inalco.desc')}</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-date">2022 - 2023</div>
              <h3 className="timeline-title">{t('education.uga.title')}</h3>
              <p className="timeline-institution">Université Grenoble Alpes</p>
              <p className="timeline-desc">{t('education.uga.desc')}</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-date">2019 - 2021</div>
              <h3 className="timeline-title">{t('education.upjv.title')}</h3>
              <p className="timeline-institution">Université de Picardie Jules Verne (UPJV) IUT Amiens</p>
              <p className="timeline-desc">{t('education.upjv.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}