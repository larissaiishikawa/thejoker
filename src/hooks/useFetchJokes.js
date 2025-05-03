import { useState } from 'react';

export function useFetchJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJokes = async (params) => {
    setLoading(true);
    setError(null);

    const { categories, amount, blacklistFlags, language } = params;
    
    try {
      const categoriesParam = categories.length > 0 ? categories.join(',') : 'Any';
      const blacklistParam = blacklistFlags.length > 0 ? blacklistFlags.join(',') : '';
      
      const url = `https://v2.jokeapi.dev/joke/${categoriesParam}?amount=${amount}${blacklistParam ? `&blacklistFlags=${blacklistParam}` : ''}${language ? `&lang=${language}` : ''}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        setError(data.message || 'Error fetching jokes');
        setJokes([]);
      } else {
        if (Array.isArray(data.jokes)) {
          setJokes(data.jokes);
        } else if (data.type) {
          // Single joke response
          setJokes([data]);
        } else {
          setJokes([]);
        }
      }
    } catch (err) {
      setError('Failed to fetch jokes');
      setJokes([]);
    } finally {
      setLoading(false);
    }
  };

  return { jokes, loading, error, fetchJokes };
}