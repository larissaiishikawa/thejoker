import { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { JokeList } from '../JokeList/JokeList';
import styles from './Favorites.module.css';

export function Favorites() {
  const { favorites, clearAllFavorites } = useFavorites();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearAll = () => {
    setShowConfirm(true);
  };

  const confirmClearAll = () => {
    clearAllFavorites();
    setShowConfirm(false);
  };

  const cancelClearAll = () => {
    setShowConfirm(false);
  };

  return (
    <section className={styles.favoritesSection}>
      <div className={styles.favoritesHeader}>
        <h2>Piadas Favoritas</h2>
        {favorites.length > 0 && (
          <button 
            className={styles.clearButton}
            onClick={handleClearAll}
            aria-label="Limpar todos os favoritos"
          >
            Limpar Favoritos
          </button>
        )}
      </div>

      {showConfirm && (
        <div className={styles.confirmDialog}>
          <p>Tem certeza que deseja remover todas as piadas favoritas?</p>
          <div className={styles.confirmActions}>
            <button onClick={confirmClearAll} className={styles.confirmButton}>
              Sim, limpar tudo
            </button>
            <button onClick={cancelClearAll} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {favorites.length > 0 ? (
        <JokeList jokes={favorites} error={null} loading={false} />
      ) : (
        <div className={styles.emptyFavorites}>
          <p>Você ainda não adicionou nenhuma piada aos favoritos</p>
          <p>Clique no coração em uma piada para adicioná-la aqui</p>
        </div>
      )}
    </section>
  );
}