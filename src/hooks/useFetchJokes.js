import { useState } from "react";

const PRE_LOADED_JOKES = [];
const FALLBACK_JOKES = { pt: [], es: [], fr: [], de: [], en: [] };

export function useFetchJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJokes = async (params) => {
    setLoading(true);
    setError(null);
    setSearchResults([]);
    setSearchTerm("");

    const { categories, amount, language, keyword } = params;

    try {
      const categoriesParam =
        categories.length > 0 ? categories.join(",") : "Any";

      let url = `https://v2.jokeapi.dev/joke/${categoriesParam}?amount=${amount}&safe-mode`;

      if (language) {
        url += `&lang=${language}`;
      }

      if (keyword && keyword.trim() !== "") {
        url += `&contains=${encodeURIComponent(keyword)}`;
        setSearchTerm(keyword);
      }

      console.log("Requesting jokes with URL:", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        if (
          data.message === "No matching joke found" ||
          data.message.includes(
            "No jokes found matching the provided filter(s)"
          )
        ) {
          setError(
            `Não encontramos piadas para esta combinação de filtros. Por favor, tente outros critérios de busca.`
          );
          setJokes([]);
        } else {
          let errorMessage = data.message || "Failed to fetch jokes";

          if (data.causedBy && Array.isArray(data.causedBy)) {
            errorMessage += `: ${data.causedBy.join(", ")}`;
          }

          setError(errorMessage);
          setJokes([]);
        }
      } else {
        if (Array.isArray(data.jokes) && data.jokes.length > 0) {
          setJokes(data.jokes);
          console.log("Setting jokes array:", data.jokes);
        } else if (data.type) {
          setJokes([data]);
          console.log("Setting single joke:", data);
        } else {
          console.log("Unexpected response format:", data);
          setJokes([]);
          setError("Formato de resposta inesperado da API");
        }
      }
    } catch (err) {
      console.error("Error fetching jokes:", err);
      setError(`Erro ao buscar piadas: ${err.message}`);
      setJokes([]);
    } finally {
      setLoading(false);
    }
  };

  const searchJokesByKeyword = (keyword) => {
    if (!keyword || keyword.trim() === "") {
      setSearchResults([]);
      setSearchTerm("");
      return;
    }

    setSearchTerm(keyword);
    const lowercasedKeyword = keyword.toLowerCase();

    const filteredJokes = jokes.filter((joke) => {
      if (joke.joke) {
        return joke.joke.toLowerCase().includes(lowercasedKeyword);
      } else if (joke.setup && joke.delivery) {
        return (
          joke.setup.toLowerCase().includes(lowercasedKeyword) ||
          joke.delivery.toLowerCase().includes(lowercasedKeyword)
        );
      }
      return false;
    });

    setSearchResults(filteredJokes);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    jokes,
    loading,
    error,
    fetchJokes,
    searchJokesByKeyword,
    searchResults,
    searchTerm,
    clearError,
  };
}
