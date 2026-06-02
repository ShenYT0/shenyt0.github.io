import { useI18n } from '../hooks/useI18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2026 Yuntian Shen. {t('footer.text')}</p>
      </div>
    </footer>
  );
}