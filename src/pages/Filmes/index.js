import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilms() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "d7d89328032b3e4d02777a8ab713e7b3",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Erro ao carregar filme");
          // Redirecionar para a página de erro aqui
        });
    }
    loadFilms();

    return () => {
      // Executar a limpeza do useEffect aqui para evitar memory leaks
      // Por exemplo, cancelar requests assíncronas ou limpar estados
    };
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando Detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>
    </div>
  );
}

export default Filme;