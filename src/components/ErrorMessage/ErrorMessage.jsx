import styles from './ErrorMessage.module.css';

export function ErrorMessage({ message, onDismiss = null }) {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorContent}>
        <p className={styles.errorText}>
          {message || "Oops! We couldn't load jokes. Please try again later."}
        </p>
        {onDismiss && (
          <button 
            className={styles.dismissButton} 
            onClick={onDismiss}
            aria-label="Dismiss error message"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}