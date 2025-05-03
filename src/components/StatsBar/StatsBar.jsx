import { useMemo } from 'react';
import styles from './StatsBar.module.css';

export function StatsBar({ jokes }) {
  const stats = useMemo(() => {    const categories = {};
    
    let singleJokes = 0;
    let twoPartJokes = 0;
    
    jokes.forEach(joke => {
      if (categories[joke.category]) {
        categories[joke.category]++;
      } else {
        categories[joke.category] = 1;
      }
      
      if (joke.type === 'single') {
        singleJokes++;
      } else {
        twoPartJokes++;
      }
    });
    
    return {
      total: jokes.length,
      categories,
      singleJokes,
      twoPartJokes
    };
  }, [jokes]);
  
  return (
    <div className={styles.statsBar}>
      <div className={styles.statsItem}>
        <span className={styles.statsLabel}>Total:</span>
        <span className={styles.statsValue}>{stats.total} piadas</span>
      </div>
      
      <div className={styles.statsItem}>
        <span className={styles.statsLabel}>Tipo:</span>
        <span className={styles.statsValue}>{stats.singleJokes} diretas / {stats.twoPartJokes} pergunta-resposta</span>
      </div>
      
      <div className={styles.statsItem}>
        <span className={styles.statsLabel}>Categorias:</span>
        <span className={styles.statsValue}>
          {Object.keys(stats.categories).map(category => (
            <span key={category} className={styles.category}>
              {category}: {stats.categories[category]}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}