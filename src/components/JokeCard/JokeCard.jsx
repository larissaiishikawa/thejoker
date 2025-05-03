import { useState, useCallback } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './JokeCard.module.css';

export function JokeCard({ joke }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.id === joke.id);

  const toggleFavorite = useCallback((e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(joke.id);
    } else {
      addToFavorites(joke);
    }
  }, [joke, isFavorite, addToFavorites, removeFromFavorites]);

  const handleCardClick = useCallback(() => {
    setIsFlipped(prevState => !prevState);
  }, []);

  return (
    <div 
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} 
      onClick={handleCardClick}
      aria-label={`Piada: ${joke.type === 'single' ? joke.joke : joke.setup}`}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.category}>{joke.category}</div>
          <h3>{joke.type === 'single' ? 'Piada' : 'Pergunta'}</h3>
          <p>{joke.type === 'single' ? joke.joke : joke.setup}</p>
          <button 
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <div className={styles.clickHint}>
            Clique para {joke.type === 'single' ? 'virar o cartão' : 'ver a resposta'}
          </div>
        </div>
        <div className={styles.cardBack}>
          {joke.type === 'twopart' && (
            <>
              <div className={styles.category}>{joke.category}</div>
              <h3>Resposta</h3>
              <p>{joke.delivery}</p>
            </>
          )}
          {joke.type === 'single' && (
            <>
              <div className={styles.category}>{joke.category}</div>
              <h3>Piada</h3>
              <p>{joke.joke}</p>
            </>
          )}
          <button 
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <div className={styles.clickHint}>Clique para voltar</div>
        </div>
      </div>
    </div>
  );
}