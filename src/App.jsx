import { useState } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { JokeList } from './components/JokeList/JokeList';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { useFetchJokes } from './hooks/useFetchJokes';
import './App.css';

function JokeApp() {
  const { jokes, loading, error, fetchJokes } = useFetchJokes();
  const [hasSearched, setHasSearched] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();

  const handleSubmit = (data) => {
    const params = {
      categories: data.categories,
      amount: data.amount || 5,
      blacklistFlags: data.blacklistFlags || [],
      language: data.language || 'pt'
    };
    fetchJokes(params);
    setHasSearched(true);
    setShowFavorites(false);
  };

  const toggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>O Piadista</h1>
        <p className="subtitle">Gerador de piadas aleatórias em Português</p>
      </header>

      <main className="main">
        <section className="searchSection">
          <h2>Encontre Piadas</h2>
          <SearchForm onSubmit={handleSubmit} />
        </section>
        
        <section className="tabsSection">
          <div className="tabs">
            <button 
              className={`tab ${!showFavorites ? 'activeTab' : ''}`}
              onClick={() => setShowFavorites(false)}
            >
              Resultados da Busca
            </button>
            <button 
              className={`tab ${showFavorites ? 'activeTab' : ''}`}
              onClick={() => setShowFavorites(true)}
            >
              Favoritos ({favorites.length})
            </button>
          </div>
        </section>
        
        {!showFavorites ? (
          <section className="resultsSection">
            {hasSearched ? (
              <>
                <h2>Resultado</h2>
                <JokeList jokes={jokes} error={error} loading={loading} />
              </>
            ) : (
              <div className="initialMessage">
                <p>Use o formulário acima para buscar piadas</p>
              </div>
            )}
          </section>
        ) : (
          <section className="favoritesSection">
            <h2>Piadas Favoritas</h2>
            {favorites.length > 0 ? (
              <JokeList jokes={favorites} error={null} loading={false} />
            ) : (
              <div className="emptyFavorites">
                <p>Você ainda não adicionou nenhuma piada aos favoritos</p>
                <p>Clique no coração em uma piada para adicioná-la aqui</p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Desenvolvido com React e <a href="https://v2.jokeapi.dev/" target="_blank" rel="noopener noreferrer">JokeAPI v2</a></p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <JokeApp />
    </FavoritesProvider>
  );
}

export default App;
