import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}