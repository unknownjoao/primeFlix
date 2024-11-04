import { React, useEffect, useState } from "react";
import api from "../../services/api.js";
import { Link } from "react-router-dom";
import "./home.css";
// URL DA API:  movie/now_playing?api_key=d7d89328032b3e4d02777a8ab713e7b3

function Home() {
  const [filmes, setFilmes] = useState([]); // Criando um estado para armazenar os filmes
  const [loading, setLoading] = useState([true]);
  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "d7d89328032b3e4d02777a8ab713e7b3",
          language: "pt-BR",
          page: 1,
        },
      });

      // console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0, 10)); // Pega os 10 primeiros filmes e armazena no estado filmes
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="loading">Carregando Filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
