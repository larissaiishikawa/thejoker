import { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './JokeCard.module.css';

export function JokeCard({ joke }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.id === joke.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(joke.id);
    } else {
      addToFavorites(joke);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} 
      onClick={handleCardClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <h3>{joke.type === 'single' ? 'Piada' : 'Pergunta'}</h3>
          <p>{joke.type === 'single' ? joke.joke : joke.setup}</p>
          <button 
            className={styles.favoriteButton}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <div className={styles.clickHint}>Clique para {joke.type === 'single' ? 'virar' : 'ver a resposta'}</div>
        </div>
        <div className={styles.cardBack}>
          {joke.type === 'twopart' && (
            <>
              <h3>Resposta</h3>
              <p>{joke.delivery}</p>
            </>
          )}
          {joke.type === 'single' && (
            <>
              <h3>Piada</h3>
              <p>{joke.joke}</p>
            </>
          )}
          <button 
            className={styles.favoriteButton}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <div className={styles.clickHint}>Clique para voltar</div>
        </div>
      </div>
    </div>
  );
}