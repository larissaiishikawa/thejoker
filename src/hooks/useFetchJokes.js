import { useState } from "react";

const PRE_LOADED_JOKES = [
  {
    id: 1,
    category: "Programming",
    type: "twopart",
    setup: "Por que os programadores preferem o frio?",
    delivery: "Porque tem zero bugs.",
    lang: "pt",
  },
  {
    id: 2,
    category: "Misc",
    type: "twopart",
    setup: "O que o pato disse para a pata?",
    delivery: "Vem quá!",
    lang: "pt",
  },
  {
    id: 3,
    category: "Misc",
    type: "single",
    joke: "Por que a plantinha não podia tomar sol? Porque ela estava com a raiz presa!",
    lang: "pt",
  },
];

// Piadas de fallback por idioma para quando não houver piadas disponíveis nas categorias solicitadas
const FALLBACK_JOKES = {
  pt: [
    {
      id: 100,
      category: "Programming",
      type: "twopart",
      setup: "Por que os programadores não gostam da natureza?",
      delivery: "Tem muitos bugs.",
      lang: "pt",
    },
    {
      id: 101,
      category: "Misc",
      type: "twopart",
      setup: "O que o zero disse para o oito?",
      delivery: "Que cinto bonito!",
      lang: "pt",
    },
  ],
  es: [
    {
      id: 200,
      category: "Programming",
      type: "twopart",
      setup: "¿Por qué los programadores prefieren el invierno?",
      delivery: "Porque hay cero bugs.",
      lang: "es",
    },
    {
      id: 201,
      category: "Misc",
      type: "single",
      joke: "¿Qué le dice un pez a otro? Nada.",
      lang: "es",
    },
  ],
  fr: [
    {
      id: 300,
      category: "Programming",
      type: "twopart",
      setup: "Pourquoi les développeurs n'aiment pas la nature?",
      delivery: "Il y a trop de bugs.",
      lang: "fr",
    },
  ],
  de: [
    {
      id: 400,
      category: "Programming",
      type: "twopart",
      setup: "Warum mögen Programmierer keine Natur?",
      delivery: "Zu viele Bugs.",
      lang: "de",
    },
  ],
};

export function useFetchJokes() {
  const [jokes, setJokes] = useState(PRE_LOADED_JOKES);
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

      // Adicionando safe-mode para garantir piadas mais tranquilas
      let url = `https://v2.jokeapi.dev/joke/${categoriesParam}?amount=${amount}&safe-mode`;

      if (language) {
        url += `&lang=${language}`;
      }

      // Add search term if provided
      if (keyword && keyword.trim() !== "") {
        url += `&contains=${encodeURIComponent(keyword)}`;
        setSearchTerm(keyword);
      }

      console.log("Requesting jokes with URL:", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        // Caso especial para "No matching joke found" - usar piadas de fallback
        if (
          data.message === "No matching joke found" ||
          data.message.includes(
            "No jokes found matching the provided filter(s)"
          )
        ) {
          console.log("No jokes found in API, using fallback jokes");

          // Se temos piadas de fallback para este idioma, use-as
          if (FALLBACK_JOKES[language]) {
            setJokes(FALLBACK_JOKES[language]);
            setError(null);
            console.log("Using fallback jokes for language:", language);
          } else if (FALLBACK_JOKES["en"]) {
            // Se não temos piadas no idioma solicitado, tente em inglês
            setJokes(FALLBACK_JOKES["en"]);
            setError(
              `Não encontramos piadas em "${language}" para esta categoria. Mostrando alternativas.`
            );
          } else {
            // Último recurso: use as piadas pré-carregadas
            setJokes(PRE_LOADED_JOKES);
            setError(
              `Não encontramos piadas para esta combinação de filtros. Mostrando piadas populares.`
            );
          }
        } else {
          // Outros erros da API
          let errorMessage = data.message || "Failed to fetch jokes";

          // Enhanced error messages
          if (data.causedBy && Array.isArray(data.causedBy)) {
            errorMessage += `: ${data.causedBy.join(", ")}`;
          }

          setError(errorMessage);
          setJokes([]);
        }
      } else {
        // Processar resposta bem-sucedida
        if (Array.isArray(data.jokes) && data.jokes.length > 0) {
          setJokes(data.jokes);
          console.log("Setting jokes array:", data.jokes);
        } else if (data.type) {
          // Resposta de piada única
          setJokes([data]);
          console.log("Setting single joke:", data);
        } else {
          // Resposta inesperada, mas não é um erro
          console.log("Unexpected response format:", data);
          setJokes([]);
          setError("Formato de resposta inesperado da API");
        }
      }
    } catch (err) {
      console.error("Error fetching jokes:", err);
      setError(`Erro ao buscar piadas: ${err.message}`);

      // Em caso de erro, use piadas pré-carregadas
      setJokes(PRE_LOADED_JOKES);
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

    // Filtrar as piadas já carregadas que contêm a palavra-chave
    const filteredJokes = jokes.filter((joke) => {
      if (joke.joke) {
        // Piadas de uma linha
        return joke.joke.toLowerCase().includes(lowercasedKeyword);
      } else if (joke.setup && joke.delivery) {
        // Piadas de duas partes (setup e punchline)
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
