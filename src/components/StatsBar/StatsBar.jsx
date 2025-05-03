import { useMemo } from 'react';
import styles from './StatsBar.module.css';

export function StatsBar({ jokes }) {
  const stats = useMemo(() => {
    if (!jokes || jokes.length === 0) {
      return {
        total: 0,
        categories: {},
        singleJokes: 0,
        twoPartJokes: 0
      };
    }

    const result = {
      total: jokes.length,
      categories: {},
      singleJokes: 0,
      twoPartJokes: 0
    };

    jokes.forEach(joke => {
      if (!result.categories[joke.category]) {
        result.categories[joke.category] = 0;
      }
      result.categories[joke.category]++;

      if (joke.type === 'single') {
        result.singleJokes++;
      } else if (joke.type === 'twopart') {
        result.twoPartJokes++;
      }
    });

    return result;
  }, [jokes]);

  const getCategoryTranslation = (category) => {
    const translations = {
      'Programming': 'Programação',
      'Misc': 'Diversos',
      'Dark': 'Humor Negro',
      'Pun': 'Trocadilhos',
      'Spooky': 'Assustador',
      'Christmas': 'Natal',
      'Any': 'Qualquer'
    };
    return translations[category] || category;
  };

  if (stats.total === 0) {
    return null;
  }

  return (
    <div className={styles.statsContainer}>
      <h3>Estatísticas</h3>
      <div className={styles.statGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total de piadas:</span>
          <span className={styles.statValue}>{stats.total}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Piadas simples:</span>
          <span className={styles.statValue}>{stats.singleJokes}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Pergunta e resposta:</span>
          <span className={styles.statValue}>{stats.twoPartJokes}</span>
        </div>
      </div>

      <h4>Categorias:</h4>
      <div className={styles.categoryList}>
        {Object.entries(stats.categories).map(([category, count]) => (
          <div key={category} className={styles.categoryBadge}>
            {getCategoryTranslation(category)} ({count})
          </div>
        ))}
      </div>
    </div>
  );
}