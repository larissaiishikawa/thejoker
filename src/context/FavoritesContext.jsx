import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();
const LOCAL_STORAGE_KEY = 'opiadista_favorites';

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage', error);
    }
  }, [favorites]);

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