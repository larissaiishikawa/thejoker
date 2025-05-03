import { useState, useEffect } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { JokeList } from './components/JokeList/JokeList';
import { Favorites } from './components/Favorites/Favorites';
import { StatsBar } from './components/StatsBar/StatsBar';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useFetchJokes } from './hooks/useFetchJokes';
import './App.css';

// Versão da aplicação
const APP_VERSION = "1.0.0";

function JokeApp() {
  const { jokes, loading, error, fetchJokes } = useFetchJokes();
  const [hasSearched, setHasSearched] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();
  const { toggleTheme } = useTheme();

  // Adiciona teclas de atalho para funcionalidades principais
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Alt + T: Alternar tema
      if (event.altKey && event.key === 't') {
        toggleTheme();
      }
      
      // Alt + F: Mostrar favoritos
      if (event.altKey && event.key === 'f') {
        setShowFavorites(true);
      }
      
      // Alt + R: Mostrar resultados
      if (event.altKey && event.key === 'r') {
        setShowFavorites(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Tooltip para informar sobre os atalhos de teclado
    console.info(
      'Atalhos de teclado disponíveis:\n' +
      'Alt + T: Alternar tema\n' +
      'Alt + F: Mostrar favoritos\n' +
      'Alt + R: Mostrar resultados'
    );
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleTheme]);

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
              title="Mostrar resultados (Alt+R)"
            >
              Resultados da Busca
            </button>
            <button 
              className={`tab ${showFavorites ? 'activeTab' : ''}`}
              onClick={() => setShowFavorites(true)}
              title="Mostrar favoritos (Alt+F)"
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
                {!loading && !error && jokes.length > 0 && (
                  <StatsBar jokes={jokes} />
                )}
                <JokeList jokes={jokes} error={error} loading={loading} />
              </>
            ) : (
              <div className="initialMessage">
                <p>Use o formulário acima para buscar piadas</p>
              </div>
            )}
          </section>
        ) : (
          <Favorites />
        )}
      </main>

      <ThemeToggle />

      <footer className="footer">
        <p>Desenvolvido com React e <a href="https://v2.jokeapi.dev/" target="_blank" rel="noopener noreferrer">JokeAPI v2</a></p>
        <p className="version">Versão {APP_VERSION}</p>
        <div className="shortcuts">
          <button 
            className="shortcutInfo"
            onClick={() => alert('Atalhos disponíveis:\n• Alt+T: Alternar tema\n• Alt+F: Mostrar favoritos\n• Alt+R: Mostrar resultados')}
          >
            Atalhos de teclado
          </button>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <JokeApp />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
