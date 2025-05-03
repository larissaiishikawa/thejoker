import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (joke) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.id === joke.id);
      if (exists) return prevFavorites;
      return [...prevFavorites, joke];
    });
  };

  const removeFromFavorites = (jokeId) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter((joke) => joke.id !== jokeId)
    );
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}