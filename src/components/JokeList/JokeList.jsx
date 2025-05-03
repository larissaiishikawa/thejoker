import { useMemo } from 'react';
import { JokeCard } from '../JokeCard/JokeCard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loading } from '../Loading/Loading';
import styles from './JokeList.module.css';

export function JokeList({ jokes, error, loading }) {
  const memoizedJokes = useMemo(() => jokes, [jokes]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message="Ops! Não foi possível carregar piadas. Tente novamente mais tarde." />;
  }

  if (memoizedJokes.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nenhuma piada encontrada. Tente ajustar seus filtros.</p>
      </div>
    );
  }

  return (
    <div className={styles.jokeList}>
      {memoizedJokes.map((joke) => (
        <JokeCard key={joke.id} joke={joke} />
      ))}
    </div>
  );
}