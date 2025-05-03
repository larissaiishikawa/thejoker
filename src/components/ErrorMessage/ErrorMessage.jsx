import styles from './ErrorMessage.module.css';

export function ErrorMessage({ message }) {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorIcon}>⚠️</div>
      <p className={styles.errorText}>
        {message || "Ops! Não foi possível carregar piadas. Tente novamente mais tarde."}
      </p>
    </div>
  );
}