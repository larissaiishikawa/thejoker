import { useState } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { JokeList } from './components/JokeList/JokeList';
import { FavoritesProvider } from './context/FavoritesContext';
import { useFetchJokes } from './hooks/useFetchJokes';
import './App.css';

function App() {
  const { jokes, loading, error, fetchJokes } = useFetchJokes();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (data) => {
    const params = {
      categories: data.categories,
      amount: data.amount || 5,
      blacklistFlags: data.blacklistFlags || [],
      language: data.language || 'pt'
    };
    fetchJokes(params);
    setHasSearched(true);
  };

  return (
    <FavoritesProvider>
      <div className="container">
        <header className="header">
          <h1>O Piadista</h1>
          <p className="subtitle">Gerador de piadas aleatórias em Português</p>
        </header>

        <main className="main">
          <h2>Encontre Piadas</h2>
          <SearchForm onSubmit={handleSubmit} />
          
          {hasSearched && (
            <>
              <h2>Resultado</h2>
              <JokeList jokes={jokes} error={error} loading={loading} />
            </>
          )}
        </main>

        <footer className="footer">
          <p>Desenvolvido com React e <a href="https://v2.jokeapi.dev/" target="_blank" rel="noopener noreferrer">JokeAPI v2</a></p>
        </footer>
      </div>
    </FavoritesProvider>
  );
}

export default App;
