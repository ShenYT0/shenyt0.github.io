import { useI18n } from '../hooks/useI18n';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Contact() {
  const { t } = useI18n();
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section id="contact" className={`section ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="contact-content">
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="contact-text">{t('contact.text')}</p>
          <div className="contact-links">
            <a href="mailto:shenyuntian0@gmail.com" className="contact-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              shenyuntian0@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}