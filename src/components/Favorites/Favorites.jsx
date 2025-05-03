import { useFavorites } from '../../context/FavoritesContext';
import { JokeList } from '../JokeList/JokeList';
import styles from './Favorites.module.css';

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className={styles.favoritesSection}>
      <h2>Piadas Favoritas</h2>
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