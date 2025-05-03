import { useState, useCallback } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './JokeCard.module.css';

export function JokeCard({ joke }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
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

  const handleShare = useCallback((e) => {
    e.stopPropagation();
    
    const jokeText = joke.type === 'single' 
      ? joke.joke 
      : `${joke.setup} - ${joke.delivery}`;
      
    if (navigator.share) {
      navigator.share({
        title: 'Uma piada de O Piadista',
        text: jokeText
      })
      .catch(() => {
        // Se a share API falhar, usamos a abordagem de copiar para o clipboard
        copyToClipboard(jokeText);
      });
    } else {
      // Navegador não suporta a Web Share API
      copyToClipboard(jokeText);
    }
  }, [joke]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setShareMessage('Piada copiada!');
        setTimeout(() => setShareMessage(''), 2000);
      })
      .catch(() => {
        setShareMessage('Erro ao copiar');
        setTimeout(() => setShareMessage(''), 2000);
      });
  };

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
          <div className={styles.cardActions}>
            <button 
              className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button 
              className={styles.shareButton}
              onClick={handleShare}
              aria-label="Compartilhar piada"
            >
              📤
            </button>
          </div>
          {shareMessage && (
            <div className={styles.shareMessage}>{shareMessage}</div>
          )}
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
          <div className={styles.cardActions}>
            <button 
              className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button 
              className={styles.shareButton}
              onClick={handleShare}
              aria-label="Compartilhar piada"
            >
              📤
            </button>
          </div>
          {shareMessage && (
            <div className={styles.shareMessage}>{shareMessage}</div>
          )}
          <div className={styles.clickHint}>Clique para voltar</div>
        </div>
      </div>
    </div>
  );
}