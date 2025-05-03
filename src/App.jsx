import { useState, useEffect } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { JokeList } from './components/JokeList/JokeList';
import { Favorites } from './components/Favorites/Favorites';
import { StatsBar } from './components/StatsBar/StatsBar';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useFetchJokes } from './hooks/useFetchJokes';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import './App.css';

const APP_VERSION = "1.0.0";

function JokeApp() {
  const { jokes, loading, error, fetchJokes, searchJokesByKeyword, searchResults, searchTerm } = useFetchJokes();
  const [hasSearched, setHasSearched] = useState(true); // Definindo como true para mostrar piadas pré-carregadas
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();
  const { toggleTheme } = useTheme();
  const [keywordSearch, setKeywordSearch] = useState('');

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
      language: data.language || 'pt',
      keyword: data.keyword || ''
    };
    fetchJokes(params);
    setHasSearched(true);
    setShowFavorites(false);
    setKeywordSearch('');
  };

  const handleKeywordSearch = (keyword) => {
    setKeywordSearch(keyword);
    searchJokesByKeyword(keyword);
  };

  // Determinar quais piadas exibir (todas, resultados de busca, ou mensagem inicial)
  const displayJokes = searchTerm || keywordSearch ? searchResults : jokes;

  return (
    <div className="container">
      <header className="header">
        <h1>O Piadista</h1>
        <p className="subtitle">Gerador de piadas aleatórias em Português</p>
      </header>

      <main className="main">
        <section className="searchSection">
          <h2>Encontre Piadas</h2>
          <SearchForm onSubmit={handleSubmit} onKeywordSearch={handleKeywordSearch} />
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
                
                {/* Barra de busca por palavra-chave */}
                <div className="keywordSearch">
                  <input
                    type="text"
                    placeholder="Filtrar piadas por palavra-chave (ex: carro)"
                    value={keywordSearch}
                    onChange={(e) => handleKeywordSearch(e.target.value)}
                    className="keywordInput"
                  />
                  {keywordSearch && (
                    <span className="searchResults">
                      Encontradas {searchResults.length} piada(s) com "{keywordSearch}"
                    </span>
                  )}
                </div>
                
                {error ? (
                  <ErrorMessage 
                    message={error} 
                    suggestion="Tente modificar os parâmetros de busca ou tente novamente mais tarde."
                  />
                ) : (
                  <>
                    {!loading && jokes.length > 0 && (
                      <StatsBar jokes={keywordSearch ? searchResults : jokes} />
                    )}
                    <JokeList jokes={displayJokes} error={error} loading={loading} />
                    
                    {!loading && jokes.length > 0 && searchResults.length === 0 && keywordSearch && (
                      <div className="noResults">
                        <p>Nenhuma piada encontrada com "{keywordSearch}".</p>
                      </div>
                    )}
                  </>
                )}
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
          <details>
            <summary>Atalhos de teclado</summary>
            <ul className="shortcutsList">
              <li>Alt + T: Alternar tema</li>
              <li>Alt + F: Mostrar favoritos</li>
              <li>Alt + R: Mostrar resultados</li>
            </ul>
          </details>
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
